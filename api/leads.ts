import type { VercelRequest, VercelResponse } from "@vercel/node";
import { query } from "./_lib/db.js";
import { getBody, handleServerError, requireDatabase, sendError, str } from "./_lib/http.js";
import { sendEmail } from "./_lib/mailer.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /api/leads  — public contact / academy / job application submissions
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return sendError(res, 405, "Method not allowed");
  if (!requireDatabase(res)) return;

  try {
    const body = getBody(req);
    const lead = {
      name: str(body.name, 200),
      email: str(body.email, 320).toLowerCase(),
      company: str(body.company, 300) || null,
      service: str(body.service, 200) || "custom-software",
      budget: str(body.budget, 300) || null,
      message: str(body.message, 5000),
    };

    if (!lead.name || !lead.message || !EMAIL_RE.test(lead.email)) {
      return sendError(res, 400, "Please fill in your name, a valid email and a message.");
    }

    const rows = await query(
      `INSERT INTO leads (name, email, company, service, budget, message)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, created_at`,
      [lead.name, lead.email, lead.company, lead.service, lead.budget, lead.message],
    );

    // The inquiry is saved either way; the acknowledgement email is best effort.
    const isJob = lead.service.startsWith("job-application:");
    await sendEmail({
      type: isJob ? "job_application" : "contact",
      recipientEmail: lead.email,
      recipientName: lead.name,
      details: {
        service: lead.service,
        message: lead.message,
        role: isJob ? lead.service.replace(/^job-application:\s*/, "") : undefined,
      },
    });

    return res.status(201).json({ success: true, data: { ...lead, ...rows[0] } });
  } catch (err) {
    return handleServerError(res, err);
  }
}
