import crypto from "crypto";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { query } from "./_lib/db.js";
import { createSession, destroySession, getSessionEmail, isAdminEmail, sha256 } from "./_lib/auth.js";
import { getBody, handleServerError, requireDatabase, sendError, str } from "./_lib/http.js";
import { sendEmail } from "./_lib/mailer.js";

const OTP_MINUTES = 10;
const MAX_ATTEMPTS = 5;
const MAX_REQUESTS_PER_WINDOW = 3;

// GET  /api/auth                          -> { authenticated, email }
// POST /api/auth { action: "request", email }
// POST /api/auth { action: "verify", email, otp }
// POST /api/auth { action: "logout" }
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Cache-Control", "no-store");
  if (!requireDatabase(res)) return;

  try {
    if (req.method === "GET") {
      const email = await getSessionEmail(req);
      return res.status(200).json({ success: true, authenticated: Boolean(email), email });
    }

    if (req.method !== "POST") return sendError(res, 405, "Method not allowed");

    const body = getBody(req);
    const action = str(body.action, 20);
    const email = str(body.email, 320).toLowerCase();

    if (action === "logout") {
      await destroySession(req, res);
      return res.status(200).json({ success: true });
    }

    if (action === "request") {
      if (!email.includes("@")) return sendError(res, 400, "Please enter a valid email address.");

      // Same answer for unknown addresses so the admin list cannot be probed.
      const genericReply = { success: true, message: "If this email is authorised, a security OTP has been sent to it." };
      if (!isAdminEmail(email)) return res.status(200).json(genericReply);

      const recent = await query<{ count: string }>(
        `SELECT COUNT(*) AS count FROM admin_otps
         WHERE admin_email = $1 AND created_at > NOW() - make_interval(mins => $2)`,
        [email, OTP_MINUTES],
      );
      if (Number(recent[0]?.count || 0) >= MAX_REQUESTS_PER_WINDOW) {
        return sendError(res, 429, "Too many OTP requests. Please wait a few minutes and try again.");
      }

      const otp = crypto.randomInt(100000, 1000000).toString();
      await query("UPDATE admin_otps SET is_used = true WHERE admin_email = $1 AND is_used = false", [email]);
      const inserted = await query<{ id: string }>(
        `INSERT INTO admin_otps (admin_email, otp_hash, expires_at)
         VALUES ($1, $2, NOW() + make_interval(mins => $3)) RETURNING id`,
        [email, sha256(otp), OTP_MINUTES],
      );

      const sent = await sendEmail({
        type: "admin_otp",
        recipientEmail: email,
        recipientName: "Prowexa Admin",
        details: { otp },
      });
      if (!sent.success) {
        await query("DELETE FROM admin_otps WHERE id = $1", [inserted[0].id]);
        return sendError(res, 502, "Could not send the security OTP. Please try again shortly.");
      }
      return res.status(200).json(genericReply);
    }

    if (action === "verify") {
      const otp = str(body.otp, 10);
      if (!/^\d{6}$/.test(otp)) return sendError(res, 400, "Enter the 6-digit OTP from your email.");

      const rows = await query<{ id: string; otp_hash: string; attempts: number }>(
        `SELECT id, otp_hash, attempts FROM admin_otps
         WHERE admin_email = $1 AND is_used = false AND expires_at > NOW()
         ORDER BY created_at DESC LIMIT 1`,
        [email],
      );
      const record = rows[0];
      if (!record || !isAdminEmail(email)) {
        return sendError(res, 400, "OTP is invalid or has expired. Please request a new one.");
      }

      const matches = crypto.timingSafeEqual(Buffer.from(record.otp_hash), Buffer.from(sha256(otp)));
      if (!matches) {
        const attempts = record.attempts + 1;
        await query("UPDATE admin_otps SET attempts = $2, is_used = $3 WHERE id = $1", [
          record.id,
          attempts,
          attempts >= MAX_ATTEMPTS,
        ]);
        return sendError(
          res,
          400,
          attempts >= MAX_ATTEMPTS ? "Too many wrong attempts. Please request a new OTP." : "Invalid OTP code.",
        );
      }

      await query("UPDATE admin_otps SET is_used = true WHERE id = $1", [record.id]);
      await query("DELETE FROM admin_sessions WHERE expires_at < NOW()");
      await createSession(req, res, email);
      return res.status(200).json({ success: true, email, message: "Verified. Opening the admin dashboard..." });
    }

    return sendError(res, 400, "Unknown action");
  } catch (err) {
    return handleServerError(res, err);
  }
}
