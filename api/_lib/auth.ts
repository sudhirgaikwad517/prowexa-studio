import crypto from "crypto";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { query } from "./db.js";
import { sendError } from "./http.js";

export const SESSION_COOKIE = "prowexa_admin";
const SESSION_HOURS = 12;

export function sha256(value: string) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

// Comma-separated ADMIN_EMAILS env var; only these addresses can sign in.
export function getAdminEmails() {
  return (process.env.ADMIN_EMAILS || "sudhirgaikwad517@gmail.com")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string) {
  return getAdminEmails().includes(email.trim().toLowerCase());
}

function readCookie(req: VercelRequest, name: string) {
  const header = req.headers.cookie || "";
  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return decodeURIComponent(rest.join("="));
  }
  return "";
}

function cookieAttributes(req: VercelRequest) {
  const isLocal = (req.headers.host || "").startsWith("localhost");
  return `Path=/; HttpOnly; SameSite=Strict${isLocal ? "" : "; Secure"}`;
}

export async function createSession(req: VercelRequest, res: VercelResponse, email: string) {
  const token = crypto.randomBytes(32).toString("hex");
  await query(
    `INSERT INTO admin_sessions (token_hash, admin_email, expires_at)
     VALUES ($1, $2, NOW() + make_interval(hours => $3))`,
    [sha256(token), email, SESSION_HOURS],
  );
  res.setHeader(
    "Set-Cookie",
    `${SESSION_COOKIE}=${token}; Max-Age=${SESSION_HOURS * 3600}; ${cookieAttributes(req)}`,
  );
}

export async function destroySession(req: VercelRequest, res: VercelResponse) {
  const token = readCookie(req, SESSION_COOKIE);
  if (token) await query("DELETE FROM admin_sessions WHERE token_hash = $1", [sha256(token)]);
  res.setHeader("Set-Cookie", `${SESSION_COOKIE}=; Max-Age=0; ${cookieAttributes(req)}`);
}

export async function getSessionEmail(req: VercelRequest): Promise<string | null> {
  const token = readCookie(req, SESSION_COOKIE);
  if (!token) return null;
  const rows = await query<{ admin_email: string }>(
    "SELECT admin_email FROM admin_sessions WHERE token_hash = $1 AND expires_at > NOW()",
    [sha256(token)],
  );
  const email = rows[0]?.admin_email;
  // An address removed from ADMIN_EMAILS loses access immediately.
  return email && isAdminEmail(email) ? email : null;
}

// Returns the admin email, or sends 401 and returns null.
export async function requireAdmin(req: VercelRequest, res: VercelResponse) {
  const email = await getSessionEmail(req);
  if (!email) {
    sendError(res, 401, "Admin session expired. Please sign in again.");
    return null;
  }
  return email;
}
