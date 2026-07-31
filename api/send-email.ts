import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

interface EmailRequestBody {
  type: "contact" | "job_application" | "blog_approved" | "testimonial_approved" | "subscribe";
  recipientEmail: string;
  recipientName?: string;
  senderEmail?: string;
  senderName?: string;
  signatureName?: string;
  signatureDesignation?: string;
  details?: Record<string, any>;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const {
    type,
    recipientEmail,
    recipientName,
    senderEmail,
    senderName,
    signatureName,
    signatureDesignation,
    details = {},
  } = req.body as EmailRequestBody;

  if (!recipientEmail || !type) {
    return res.status(400).json({ error: "Missing recipientEmail or type." });
  }

  // Configure SMTP Transporter using Google Workspace SMTP
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
  const smtpUser = process.env.SMTP_USER || "connect@prowexa.com";
  const smtpPass = (process.env.SMTP_PASS || "").replace(/\s+/g, ""); // Google App Password

  if (!smtpPass) {
    console.warn("SMTP_PASS is not set. Email simulation mode active.");
    return res.status(200).json({
      success: true,
      simulated: true,
      message: "Email simulated successfully (Set SMTP_PASS in Vercel to send live emails).",
      details: { type, recipientEmail, recipientName },
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Determine Sender Alias based on Email Event
    const isJob = type === "job_application";
    const fromAddress = senderEmail || (isJob ? "hr@prowexa.com" : "connect@prowexa.com");
    const fromName = senderName || (isJob ? "Prowexa Talent Acquisition" : "Prowexa Technologies");
    const sigName = signatureName || (isJob ? "Team Talent Acquisition" : "Enterprise Client Solutions Team");
    const sigDesig = signatureDesignation || (isJob ? "Human Resources & Hiring" : "Software Engineering & Digital Transformation");

    // MNC HTML Template Helper Components
    const headerHtml = `
      <div style="background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); padding: 32px 40px; border-radius: 16px 16px 0 0; text-align: left;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="left">
              <div style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); width: 42px; height: 42px; border-radius: 12px; text-align: center; line-height: 42px; color: #ffffff; font-weight: bold; font-size: 22px; font-family: 'Segoe UI', Arial, sans-serif;">P</div>
              <span style="font-family: 'Segoe UI', Arial, sans-serif; color: #ffffff; font-weight: 700; font-size: 20px; vertical-align: middle; margin-left: 12px; letter-spacing: 0.5px;">Prowexa Technologies</span>
            </td>
            <td align="right" style="color: #94a3b8; font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">
              ${isJob ? "Talent Acquisition" : "Enterprise Solutions"}
            </td>
          </tr>
        </table>
      </div>
    `;

    const signatureHtml = `
      <div style="margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 24px;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td style="padding-right: 16px; border-right: 3px solid #6366f1;">
              <div style="width: 48px; height: 48px; border-radius: 50%; background: #f1f5f9; text-align: center; line-height: 48px; font-weight: bold; color: #6366f1; font-size: 18px; font-family: Arial, sans-serif;">
                ${isJob ? "HR" : "PT"}
              </div>
            </td>
            <td style="padding-left: 16px; font-family: 'Segoe UI', Arial, sans-serif;">
              <div style="font-weight: 700; color: #0f172a; font-size: 15px;">${sigName}</div>
              <div style="color: #64748b; font-size: 13px; margin-top: 2px;">${sigDesig}</div>
              <div style="color: #6366f1; font-size: 13px; margin-top: 4px; font-weight: 600;">Prowexa Technologies Pvt. Ltd.</div>
              <div style="color: #94a3b8; font-size: 12px; margin-top: 2px;">
                📍 Balewadi, Pune, Maharashtra - 411045 | 🌐 <a href="https://prowexa.com" style="color: #6366f1; text-decoration: none;">prowexa.com</a>
              </div>
            </td>
          </tr>
        </table>
      </div>
    `;

    const footerHtml = `
      <div style="background: #f8fafc; padding: 24px 40px; border-radius: 0 0 16px 16px; border-top: 1px solid #f1f5f9; text-align: center; font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; color: #94a3b8;">
        © 2026 Prowexa Technologies Pvt. Ltd. All rights reserved.<br />
        This is an automated system transactional message sent to ${recipientEmail}.
      </div>
    `;

    let subject = "Notification from Prowexa Technologies";
    let bodyHtml = "";

    switch (type) {
      case "contact":
        subject = `Thank you for reaching out to Prowexa Technologies, ${recipientName || "Client"}`;
        bodyHtml = `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; padding: 32px 40px; color: #334155; background: #ffffff;">
            <h2 style="color: #0f172a; font-size: 24px; font-weight: 700; margin-top: 0;">Project Inquiry Received</h2>
            <p style="font-size: 15px; line-height: 1.6;">Dear <strong>${recipientName || "Client"}</strong>,</p>
            <p style="font-size: 15px; line-height: 1.6;">Thank you for getting in touch with Prowexa Technologies. We have successfully logged your project request for <span style="color: #6366f1; font-weight: 600;">"${details.service || "Custom Software Engineering"}"</span>.</p>
            
            <div style="background: #f8fafc; border-left: 4px solid #6366f1; padding: 20px; border-radius: 8px; margin: 24px 0;">
              <div style="font-size: 12px; text-transform: uppercase; tracking: 1px; color: #64748b; font-weight: 700; margin-bottom: 8px;">Inquiry Breakdown</div>
              <div style="font-size: 14px; margin-bottom: 6px;"><strong>Requested Service:</strong> ${details.service || "N/A"}</div>
              <div style="font-size: 14px; margin-bottom: 6px;"><strong>Project Summary:</strong> ${details.message || "N/A"}</div>
            </div>

            <p style="font-size: 15px; line-height: 1.6;">Our Senior Solutions Architect will evaluate your requirements and schedule an initial technical consultation within 24 business hours.</p>

            ${signatureHtml}
          </div>
        `;
        break;

      case "job_application":
        subject = `Application Received: ${details.role || "Software Engineering"} | Prowexa Careers`;
        bodyHtml = `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; padding: 32px 40px; color: #334155; background: #ffffff;">
            <h2 style="color: #0f172a; font-size: 24px; font-weight: 700; margin-top: 0;">Job Application Acknowledgement</h2>
            <p style="font-size: 15px; line-height: 1.6;">Dear <strong>${recipientName || "Candidate"}</strong>,</p>
            <p style="font-size: 15px; line-height: 1.6;">Thank you for applying for the <strong style="color: #a855f7;">${details.role || "Software Position"}</strong> opportunity at Prowexa Technologies.</p>
            
            <div style="background: #faf5ff; border: 1px solid #e9d5ff; padding: 20px; border-radius: 12px; margin: 24px 0;">
              <div style="font-size: 12px; text-transform: uppercase; color: #9333ea; font-weight: 700; margin-bottom: 8px;">Application Status: Under HR Review</div>
              <p style="font-size: 13px; color: #6b21a8; margin: 0; line-height: 1.5;">Our engineering team is actively evaluating applicant portfolios. If your skills align with our current roadmap, our recruitment specialist will reach out to schedule an interview round.</p>
            </div>

            <p style="font-size: 15px; line-height: 1.6;">We appreciate your interest in building the future of software with Prowexa.</p>

            ${signatureHtml}
          </div>
        `;
        break;

      case "blog_approved":
        subject = `🎉 Approved: Your Article "${details.title}" is Live on Prowexa Blog!`;
        bodyHtml = `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; padding: 32px 40px; color: #334155; background: #ffffff;">
            <h2 style="color: #0f172a; font-size: 24px; font-weight: 700; margin-top: 0;">Blog Article Published! 🎉</h2>
            <p style="font-size: 15px; line-height: 1.6;">Hi <strong>${recipientName || "Author"}</strong>,</p>
            <p style="font-size: 15px; line-height: 1.6;">Great news! Your technical article titled <strong>"${details.title}"</strong> has been reviewed, approved, and officially published on Prowexa Engineering Blogs.</p>
            
            <div style="margin: 28px 0;">
              <a href="https://prowexa.com/blogs/${details.slug || ""}" style="background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); color: #ffffff; padding: 12px 28px; font-weight: 600; text-decoration: none; border-radius: 30px; display: inline-block; font-size: 14px; box-shadow: 0 4px 14px rgba(99, 102, 241, 0.3);">View Live Article</a>
            </div>

            ${signatureHtml}
          </div>
        `;
        break;

      case "testimonial_approved":
        subject = `🌟 Your Feedback is Live on Prowexa Technologies!`;
        bodyHtml = `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; padding: 32px 40px; color: #334155; background: #ffffff;">
            <h2 style="color: #0f172a; font-size: 24px; font-weight: 700; margin-top: 0;">Review Approved! 🌟</h2>
            <p style="font-size: 15px; line-height: 1.6;">Hi <strong>${recipientName || "Valued Contributor"}</strong>,</p>
            <p style="font-size: 15px; line-height: 1.6;">Thank you for sharing your experience! Your review has been approved and is now featured live on our Testimonials showcase.</p>
            
            ${signatureHtml}
          </div>
        `;
        break;

      case "subscribe":
        subject = `Welcome to Prowexa Tech Insights 🚀`;
        bodyHtml = `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; padding: 32px 40px; color: #334155; background: #ffffff;">
            <h2 style="color: #0f172a; font-size: 24px; font-weight: 700; margin-top: 0;">Welcome to Prowexa Engineering!</h2>
            <p style="font-size: 15px; line-height: 1.6;">Thank you for subscribing to Prowexa Tech Insights. You will receive curated software architecture breakdowns, React 19 guides, and AI engineering updates.</p>
            ${signatureHtml}
          </div>
        `;
        break;
    }

    const fullMncEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body style="background-color: #f1f5f9; margin: 0; padding: 40px 10px; font-family: 'Segoe UI', Arial, sans-serif;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center">
                <table width="100%" max-width="640" border="0" cellspacing="0" cellpadding="0" style="max-width: 640px; background-color: #ffffff; border-radius: 16px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05); overflow: hidden;">
                  <tr><td>${headerHtml}</td></tr>
                  <tr><td>${bodyHtml}</td></tr>
                  <tr><td>${footerHtml}</td></tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    // Send Main Email to Recipient
    await transporter.sendMail({
      from: `"${fromName}" <${fromAddress}>`,
      to: recipientEmail,
      subject,
      html: fullMncEmailHtml,
    });

    // Send Alert Email to Admin
    if (type === "contact" || type === "job_application") {
      await transporter.sendMail({
        from: `"Prowexa Website System" <${smtpUser}>`,
        to: smtpUser,
        subject: `[SYSTEM ALERT] New ${type.toUpperCase()}: ${recipientName}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h3>New ${type.toUpperCase()} Notification</h3>
            <p><strong>Name:</strong> ${recipientName}<br /><strong>Email:</strong> ${recipientEmail}<br /><strong>Service/Role:</strong> ${details.service || details.role || "N/A"}</p>
            <p><a href="https://prowexa.com/admin">View in Admin Portal</a></p>
          </div>
        `,
      });
    }

    return res.status(200).json({
      success: true,
      message: `MNC Email sent successfully from ${fromAddress}!`,
    });
  } catch (error: any) {
    console.error("Nodemailer MNC execution error:", error);
    return res.status(500).json({ error: "Failed to send email.", details: error?.message });
  }
}
