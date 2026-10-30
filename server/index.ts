// Production server for self-hosting (Docker): serves the built site from dist/ and the /api handlers.
import fs from "fs";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import admin from "../api/admin.js";
import auth from "../api/auth.js";
import content from "../api/content.js";
import health from "../api/health.js";
import leads from "../api/leads.js";
import sendEmail from "../api/send-email.js";
import { getPool, hasDatabase } from "../api/_lib/db.js";

type Handler = (req: VercelRequest, res: VercelResponse) => unknown;

const ROUTES: Record<string, Handler> = {
  admin,
  auth,
  content,
  health,
  leads,
  "send-email": sendEmail,
};

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(ROOT, process.env.DIST_DIR || "../dist");
const SCHEMA = path.resolve(ROOT, process.env.SCHEMA_FILE || "../db/schema.sql");
const PORT = Number(process.env.PORT || 3000);
const MAX_BODY = 1024 * 1024;

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".woff2": "font/woff2",
  ".mp4": "video/mp4",
};

// Same security headers the site sends on Vercel (see vercel.json).
const SECURITY_HEADERS: Record<string, string> = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains",
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: blob:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://stats.g.doubleclick.net; frame-ancestors 'none';",
};

function resolveStatic(urlPath: string): string | null {
  let decoded: string;
  try {
    decoded = decodeURIComponent(urlPath);
  } catch {
    return null;
  }
  const target = path.normalize(path.join(DIST, decoded));
  if (!target.startsWith(DIST)) return null; // path traversal guard
  const candidates = [target, path.join(target, "index.html"), `${target}.html`];
  for (const file of candidates) {
    if (fs.existsSync(file) && fs.statSync(file).isFile()) return file;
  }
  return null;
}

function serveStatic(req: http.IncomingMessage, res: http.ServerResponse, pathname: string) {
  // Unknown paths fall back to the SPA shell so client-side routes still load.
  const file = resolveStatic(pathname) || path.join(DIST, "index.html");
  const ext = path.extname(file).toLowerCase();
  res.setHeader("Content-Type", MIME[ext] || "application/octet-stream");
  res.setHeader(
    "Cache-Control",
    pathname.startsWith("/assets/") ? "public, max-age=31536000, immutable" : "public, max-age=0, must-revalidate",
  );
  if (req.method === "HEAD") return res.end();
  fs.createReadStream(file).pipe(res);
}

async function readBody(req: http.IncomingMessage): Promise<string> {
  let size = 0;
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    size += (chunk as Buffer).length;
    if (size > MAX_BODY) throw Object.assign(new Error("Payload too large"), { status: 413 });
    chunks.push(chunk as Buffer);
  }
  return Buffer.concat(chunks).toString("utf-8");
}

async function serveApi(req: http.IncomingMessage, res: http.ServerResponse, url: URL, handler: Handler) {
  const raw = req.method === "GET" || req.method === "HEAD" ? "" : await readBody(req);
  let body: unknown = raw || undefined;
  if (raw && (req.headers["content-type"] || "").includes("application/json")) {
    try {
      body = JSON.parse(raw);
    } catch {
      body = {};
    }
  }

  const vreq = Object.assign(req, { query: Object.fromEntries(url.searchParams), body }) as unknown as VercelRequest;
  const vres = Object.assign(res, {
    status(code: number) {
      res.statusCode = code;
      return vres;
    },
    json(data: unknown) {
      if (!res.getHeader("Content-Type")) res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.end(JSON.stringify(data));
      return vres;
    },
    send(data: unknown) {
      res.end(typeof data === "string" ? data : JSON.stringify(data));
      return vres;
    },
  }) as unknown as VercelResponse;

  await handler(vreq, vres);
}

const server = http.createServer(async (req, res) => {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) res.setHeader(key, value);
  const url = new URL(req.url || "/", "http://localhost");

  try {
    const apiMatch = url.pathname.match(/^\/api\/([a-z0-9-]+)\/?$/i);
    if (apiMatch) {
      const handler = ROUTES[apiMatch[1]];
      if (!handler) {
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        return res.end(JSON.stringify({ success: false, error: "Not found" }));
      }
      return await serveApi(req, res, url, handler);
    }
    if (req.method !== "GET" && req.method !== "HEAD") {
      res.statusCode = 405;
      return res.end();
    }
    serveStatic(req, res, url.pathname);
  } catch (err: any) {
    console.error("[server] request failed:", err?.message);
    if (!res.headersSent) {
      res.statusCode = err?.status || 500;
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.end(JSON.stringify({ success: false, error: err?.status === 413 ? "Payload too large" : "Server error" }));
    }
  }
});

// Apply db/schema.sql on boot (idempotent); retry while Postgres is still starting.
async function migrate() {
  if (!hasDatabase()) {
    console.warn("[server] DATABASE_URL not set; API routes will return 503.");
    return;
  }
  const sql = fs.readFileSync(SCHEMA, "utf-8");
  for (let attempt = 1; attempt <= 30; attempt++) {
    try {
      await getPool().query(sql);
      console.log("[server] database schema is up to date");
      return;
    } catch (err: any) {
      console.warn(`[server] database not ready (attempt ${attempt}): ${err?.message}`);
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
  throw new Error("Could not apply database schema");
}

await migrate();
server.listen(PORT, () => console.log(`[server] Prowexa listening on :${PORT}`));

for (const signal of ["SIGTERM", "SIGINT"]) {
  process.on(signal, () => {
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(0), 5000).unref();
  });
}
