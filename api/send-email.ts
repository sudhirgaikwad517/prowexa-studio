import type { VercelRequest, VercelResponse } from "@vercel/node";
import { requireAdmin } from "./_lib/auth.js";
import { getBody, handleServerError, requireDatabase, sendError, str } from "./_lib/http.js";
import { sendEmail, type EmailParams } from "./_lib/mailer.js";

const ADMIN_EMAIL_TYPES = ["contact", "job_application", "blog_approved", "testimonial_approved", "subscribe"];

// POST /api/send-email — admin only (approval notices and test emails).
// Visitor acknowledgements are sent by /api/leads; admin OTPs by /api/auth.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return sendError(res, 405, "Method not allowed. Use POST.");
  if (!requireDatabase(res)) return;

  try {
    if (!(await requireAdmin(req, res))) return;

    const body = getBody<EmailParams>(req);
    const recipientEmail = str(body.recipientEmail, 320);
    if (!recipientEmail || !ADMIN_EMAIL_TYPES.includes(body.type)) {
      return sendError(res, 400, "Missing recipientEmail or unsupported email type.");
    }

    const result = await sendEmail({ ...body, recipientEmail });
    if (!result.success) return sendError(res, result.simulated ? 503 : 502, result.error || "Failed to send email.");
    return res.status(200).json({ success: true, message: "Email sent." });
  } catch (err) {
    return handleServerError(res, err);
  }
}
