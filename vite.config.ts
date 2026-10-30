import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";
import fs from "fs";
import type { IncomingMessage, ServerResponse } from "http";

// Serves the Vercel functions in /api during `npm run dev`, so local behaviour matches production.
function localApiPlugin(mode: string) {
  return {
    name: "local-api-plugin",
    configureServer(server: any) {
      Object.assign(process.env, loadEnv(mode, process.cwd(), ""));

      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
        const url = new URL(req.url || "/", "http://localhost");
        const match = url.pathname.match(/^\/api\/([a-z0-9-]+)\/?$/i);
        const file = match && path.resolve(__dirname, "api", `${match[1]}.ts`);
        if (!file || !fs.existsSync(file)) return next();

        let raw = "";
        for await (const chunk of req) raw += chunk;
        const vreq = Object.assign(req, {
          query: Object.fromEntries(url.searchParams),
          body: raw && (req.headers["content-type"] || "").includes("application/json") ? safeJson(raw) : raw || undefined,
        });
        const vres = Object.assign(res, {
          status(code: number) {
            res.statusCode = code;
            return vres;
          },
          json(data: unknown) {
            if (!res.getHeader("Content-Type")) res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(data));
            return vres;
          },
          send(data: unknown) {
            res.end(typeof data === "string" ? data : JSON.stringify(data));
            return vres;
          },
        });

        try {
          const mod = await server.ssrLoadModule(file);
          await mod.default(vreq, vres);
        } catch (err) {
          console.error(`[local api] /api/${match![1]} failed:`, err);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ success: false, error: "Local API error" }));
          }
        }
      });
    },
  };
}

function safeJson(raw: string) {
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export default defineConfig(({ mode }) => ({
  plugins: [
    localApiPlugin(mode),
    TanStackRouterVite(),
    tailwindcss(),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    target: "es2022",
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("@tanstack")
            ) {
              return "vendor-core";
            }
            if (id.includes("lucide-react") || id.includes("framer-motion")) {
              return "vendor-ui";
            }
          }
        },
      },
    },
  },
}));
