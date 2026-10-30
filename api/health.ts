import type { VercelRequest, VercelResponse } from "@vercel/node";
import { hasDatabase, query } from "./_lib/db.js";

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader("Cache-Control", "no-store");
  let database = hasDatabase() ? "configured" : "not configured";
  if (hasDatabase()) {
    try {
      await query("SELECT 1");
      database = "connected";
    } catch {
      database = "unreachable";
    }
  }
  res.status(200).json({
    status: "ok",
    service: "Prowexa Technologies API",
    database,
    timestamp: new Date().toISOString(),
  });
}
