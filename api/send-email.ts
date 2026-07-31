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
  logoUrl?: string;
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
    logoUrl,
    details = {},
  } = req.body as EmailRequestBody;

  if (!recipientEmail || !type) {
    return res.status(400).json({ error: "Missing recipientEmail or type." });
  }

  // Configure SMTP Transporter using Google Workspace SMTP
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
  const smtpUser = process.env.SMTP_USER || "connect@prowexa.com";
  const smtpPass = (process.env.SMTP_PASS || "").replace(/\s+/g, "");

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

    const isJob = type === "job_application";
    const fromAddress = senderEmail || (isJob ? "hr@prowexa.com" : "connect@prowexa.com");
    const fromName = senderName || (isJob ? "Prowexa Talent Acquisition" : "Prowexa Technologies");
    const sigName = signatureName || (isJob ? "Team Talent Acquisition" : "Enterprise Client Solutions Team");
    const sigDesig = signatureDesignation || (isJob ? "Human Resources & Hiring" : "Software Engineering & Digital Transformation");
    const currentLogo = logoUrl || "https://www.prowexa.com/assets/prowexa-logo.webp";

    // MNC HTML Template Helper Components with Prowexa Signature Purple Theme (#9333ea, #a855f7, #3b0764)
    const logoGraphic = currentLogo
      ? `<img src="${currentLogo}" alt="Prowexa Logo" style="height: 38px; max-width: 160px; object-fit: contain; vertical-align: middle;" />`
      : `<div style="display: inline-block; background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%); width: 42px; height: 42px; border-radius: 12px; text-align: center; line-height: 42px; color: #ffffff; font-weight: bold; font-size: 22px; font-family: 'Segoe UI', Arial, sans-serif;">P</div>`;

    const headerHtml = `
      <div style="background: linear-gradient(135deg, #1e1b4b 0%, #3b0764 50%, #4c1d95 100%); padding: 32px 40px; border-radius: 16px 16px 0 0; text-align: left; border-bottom: 2px solid #a855f7;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="left">
              ${logoGraphic}
              <span style="font-family: 'Segoe UI', Arial, sans-serif; color: #ffffff; font-weight: 700; font-size: 20px; vertical-align: middle; margin-left: 12px; letter-spacing: 0.5px;">Prowexa Technologies</span>
            </td>
            <td align="right" style="color: #c084fc; font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
              ${isJob ? "Talent Acquisition" : "Enterprise Solutions"}
            </td>
          </tr>
        </table>
      </div>
    `;

    const signatureHtml = `
      <div style="margin-top: 36px; border-top: 1px solid #f3e8ff; padding-top: 24px;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td style="padding-right: 16px; border-right: 3px solid #a855f7;">
              <div style="width: 48px; height: 48px; border-radius: 50%; background: #f3e8ff; text-align: center; line-height: 48px; font-weight: bold; color: #9333ea; font-size: 18px; font-family: Arial, sans-serif;">
                ${isJob ? "HR" : "PT"}
              </div>
            </td>
            <td style="padding-left: 16px; font-family: 'Segoe UI', Arial, sans-serif;">
              <div style="font-weight: 700; color: #0f172a; font-size: 15px;">${sigName}</div>
              <div style="color: #7e22ce; font-size: 13px; margin-top: 2px; font-weight: 500;">${sigDesig}</div>
              <div style="color: #9333ea; font-size: 13px; margin-top: 4px; font-weight: 700;">Prowexa Technologies Pvt. Ltd.</div>
              <div style="color: #94a3b8; font-size: 12px; margin-top: 2px;">
                📍 Balewadi, Pune, Maharashtra - 411045 | 🌐 <a href="https://prowexa.com" style="color: #9333ea; text-decoration: none; font-weight: 600;">prowexa.com</a>
              </div>
            </td>
          </tr>
        </table>
      </div>
    `;

    const footerHtml = `
      <div style="background: #faf5ff; padding: 24px 40px; border-radius: 0 0 16px 16px; border-top: 1px solid #f3e8ff; text-align: center; font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; color: #a855f7;">
        © 2026 Prowexa Technologies Pvt. Ltd. All rights reserved.<br />
        This is an automated system message sent to ${recipientEmail}.
      </div>
    `;

    let subject = "Notification from Prowexa Technologies";
    let bodyHtml = "";

    switch (type) {
      case "contact":
        subject = `Thank you for reaching out to Prowexa Technologies, ${recipientName || "Client"}`;
        bodyHtml = `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; padding: 32px 40px; color: #334155; background: #ffffff;">
            <h2 style="color: #581c87; font-size: 24px; font-weight: 700; margin-top: 0;">Project Inquiry Received</h2>
            <p style="font-size: 15px; line-height: 1.6;">Dear <strong>${recipientName || "Client"}</strong>,</p>
            <p style="font-size: 15px; line-height: 1.6;">Thank you for contacting Prowexa Technologies. We have logged your project inquiry for <span style="color: #9333ea; font-weight: 600;">"${details.service || "Custom Software Engineering"}"</span>.</p>
            
            <div style="background: #faf5ff; border-left: 4px solid #a855f7; padding: 20px; border-radius: 8px; margin: 24px 0;">
              <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #7e22ce; font-weight: 700; margin-bottom: 8px;">Inquiry Summary</div>
              <div style="font-size: 14px; margin-bottom: 6px;"><strong>Requested Service:</strong> ${details.service || "N/A"}</div>
              <div style="font-size: 14px; margin-bottom: 6px;"><strong>Message Details:</strong> ${details.message || "N/A"}</div>
            </div>

            <p style="font-size: 15px; line-height: 1.6;">Our Senior Engineering Solutions Architect will review your requirement and reach out within 24 business hours.</p>

            ${signatureHtml}
          </div>
        `;
        break;

      case "job_application":
        subject = `Application Received: ${details.role || "Software Engineering"} | Prowexa Careers`;
        bodyHtml = `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; padding: 32px 40px; color: #334155; background: #ffffff;">
            <h2 style="color: #581c87; font-size: 24px; font-weight: 700; margin-top: 0;">Job Application Acknowledgement</h2>
            <p style="font-size: 15px; line-height: 1.6;">Dear <strong>${recipientName || "Candidate"}</strong>,</p>
            <p style="font-size: 15px; line-height: 1.6;">Thank you for applying for the <strong style="color: #9333ea;">${details.role || "Software Engineering Position"}</strong> role at Prowexa Technologies.</p>
            
            <div style="background: #faf5ff; border: 1px solid #e9d5ff; padding: 20px; border-radius: 12px; margin: 24px 0;">
              <div style="font-size: 12px; text-transform: uppercase; color: #7e22ce; font-weight: 700; margin-bottom: 8px;">Application Status: Under HR Review</div>
              <p style="font-size: 13px; color: #6b21a8; margin: 0; line-height: 1.5;">Our talent acquisition team is actively evaluating applicant portfolios. If your qualifications match our current hiring roadmap, our recruiter will contact you to schedule an interview round.</p>
            </div>

            <p style="font-size: 15px; line-height: 1.6;">We appreciate your interest in building high-scale digital products with Prowexa.</p>

            ${signatureHtml}
          </div>
        `;
        break;

      case "blog_approved":
        subject = `🎉 Published: Your Article "${details.title}" is Live on Prowexa Blog!`;
        bodyHtml = `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; padding: 32px 40px; color: #334155; background: #ffffff;">
            <h2 style="color: #581c87; font-size: 24px; font-weight: 700; margin-top: 0;">Blog Article Published! 🎉</h2>
            <p style="font-size: 15px; line-height: 1.6;">Hi <strong>${recipientName || "Author"}</strong>,</p>
            <p style="font-size: 15px; line-height: 1.6;">Great news! Your technical article titled <strong>"${details.title}"</strong> has been approved and officially published on Prowexa Engineering Blogs.</p>
            
            <div style="margin: 28px 0;">
              <a href="https://prowexa.com/blogs/${details.slug || ""}" style="background: linear-gradient(135deg, #a855f7 0%, #7e22ce 100%); color: #ffffff; padding: 12px 28px; font-weight: 600; text-decoration: none; border-radius: 30px; display: inline-block; font-size: 14px; box-shadow: 0 4px 14px rgba(168, 85, 247, 0.4);">View Live Article</a>
            </div>

            ${signatureHtml}
          </div>
        `;
        break;

      case "testimonial_approved":
        subject = `🌟 Your Review is Featured on Prowexa Technologies!`;
        bodyHtml = `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; padding: 32px 40px; color: #334155; background: #ffffff;">
            <h2 style="color: #581c87; font-size: 24px; font-weight: 700; margin-top: 0;">Review Approved! 🌟</h2>
            <p style="font-size: 15px; line-height: 1.6;">Hi <strong>${recipientName || "Valued Contributor"}</strong>,</p>
            <p style="font-size: 15px; line-height: 1.6;">Thank you for sharing your experience! Your review has been approved and is featured live on our Testimonials page.</p>
            
            ${signatureHtml}
          </div>
        `;
        break;

      case "subscribe":
        subject = `Welcome to Prowexa Tech Insights 🚀`;
        bodyHtml = `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; padding: 32px 40px; color: #334155; background: #ffffff;">
            <h2 style="color: #581c87; font-size: 24px; font-weight: 700; margin-top: 0;">Welcome to Prowexa Engineering!</h2>
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
        <body style="background-color: #f3e8ff; margin: 0; padding: 40px 10px; font-family: 'Segoe UI', Arial, sans-serif;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center">
                <table width="100%" max-width="640" border="0" cellspacing="0" cellpadding="0" style="max-width: 640px; background-color: #ffffff; border-radius: 16px; box-shadow: 0 10px 25px -5px rgba(147, 51, 234, 0.15); overflow: hidden;">
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

    // Send Mail
    await transporter.sendMail({
      from: `"${fromName}" <${fromAddress}>`,
      to: recipientEmail,
      subject,
      html: fullMncEmailHtml,
    });

    return res.status(200).json({
      success: true,
      message: `Purple MNC Email sent successfully from ${fromAddress}!`,
    });
  } catch (error: any) {
    console.error("Nodemailer MNC execution error:", error);
    return res.status(500).json({ error: "Failed to send email.", details: error?.message });
  }
}
