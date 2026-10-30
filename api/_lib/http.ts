import type { VercelRequest, VercelResponse } from "@vercel/node";
import { hasDatabase } from "./db.js";

export function sendError(res: VercelResponse, status: number, error: string) {
  return res.status(status).json({ success: false, error });
}

// Shared guard: every data route needs a configured database.
export function requireDatabase(res: VercelResponse) {
  if (!hasDatabase()) {
    sendError(res, 503, "Database is not configured. Set DATABASE_URL.");
    return false;
  }
  return true;
}

export function getBody<T = Record<string, unknown>>(req: VercelRequest): T {
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body) as T;
    } catch {
      return {} as T;
    }
  }
  return (req.body || {}) as T;
}

export function str(value: unknown, max = 5000): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function queryParam(req: VercelRequest, name: string): string {
  const value = req.query[name];
  return Array.isArray(value) ? value[0] || "" : value || "";
}

export function handleServerError(res: VercelResponse, err: unknown) {
  console.error("[api] error:", err);
  return sendError(res, 500, "Something went wrong. Please try again.");
}
