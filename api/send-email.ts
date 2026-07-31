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
      message: "Email simulated successfully.",
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

    const logoGraphic = currentLogo
      ? `<img src="${currentLogo}" alt="Prowexa Logo" style="height: 32px; max-width: 140px; object-fit: contain; vertical-align: middle;" />`
      : `<div style="display: inline-block; background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%); width: 38px; height: 38px; border-radius: 10px; text-align: center; line-height: 38px; color: #ffffff; font-weight: bold; font-size: 20px; font-family: 'Segoe UI', Arial, sans-serif;">P</div>`;

    const headerHtml = `
      <div style="background: linear-gradient(135deg, #1e1b4b 0%, #3b0764 50%, #4c1d95 100%); padding: 24px 20px; border-radius: 16px 16px 0 0; border-bottom: 3px solid #a855f7;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="left" style="vertical-align: middle;">
              ${logoGraphic}
              <span style="font-family: 'Segoe UI', Arial, sans-serif; color: #ffffff; font-weight: 700; font-size: 17px; vertical-align: middle; margin-left: 10px; letter-spacing: 0.3px;">Prowexa</span>
            </td>
            <td align="right" style="vertical-align: middle;">
              <span style="background: rgba(168, 85, 247, 0.25); border: 1px solid rgba(192, 132, 252, 0.4); color: #e9d5ff; font-family: 'Segoe UI', Arial, sans-serif; font-size: 10px; text-transform: uppercase; padding: 4px 10px; border-radius: 20px; font-weight: 700; letter-spacing: 0.5px; whitespace: nowrap;">
                ${isJob ? "Talent Acquisition" : "Enterprise"}
              </span>
            </td>
          </tr>
        </table>
      </div>
    `;

    const signatureHtml = `
      <div style="margin-top: 32px; border-top: 1px solid #f3e8ff; padding-top: 24px;">
        <div style="border-left: 4px solid #a855f7; padding-left: 16px;">
          <div style="font-size: 16px; font-weight: 700; color: #0f172a; font-family: 'Segoe UI', Arial, sans-serif;">${sigName}</div>
          <div style="font-size: 13px; color: #64748b; margin-top: 3px; font-family: 'Segoe UI', Arial, sans-serif;">${sigDesig}</div>
          <div style="font-size: 13px; color: #9333ea; font-weight: 700; margin-top: 4px; font-family: 'Segoe UI', Arial, sans-serif;">Prowexa Technologies Pvt. Ltd.</div>
          <div style="font-size: 12px; color: #64748b; margin-top: 6px; line-height: 1.6; font-family: 'Segoe UI', Arial, sans-serif;">
            📍 Balewadi, Pune, Maharashtra - 411045<br />
            📧 <a href="mailto:${fromAddress}" style="color: #9333ea; font-weight: 600; text-decoration: none;">${fromAddress}</a> &nbsp;|&nbsp; 🌐 <a href="https://prowexa.com" style="color: #9333ea; font-weight: 600; text-decoration: none;">prowexa.com</a>
          </div>
        </div>
      </div>
    `;

    const footerHtml = `
      <div style="background: #faf5ff; padding: 20px 20px; border-radius: 0 0 16px 16px; border-top: 1px solid #f3e8ff; text-align: center; font-family: 'Segoe UI', Arial, sans-serif; font-size: 11px; color: #9333ea;">
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
          <div style="font-family: 'Segoe UI', Arial, sans-serif; padding: 28px 20px; color: #0f172a; background: #ffffff;">
            <h1 style="color: #4c1d95; font-size: 22px; font-weight: 700; margin-top: 0; line-height: 1.3;">Project Inquiry Received</h1>
            <p style="font-size: 15px; line-height: 1.6; color: #1e293b;">Dear <strong>${recipientName || "Client"}</strong>,</p>
            <p style="font-size: 15px; line-height: 1.6; color: #334155;">Thank you for contacting Prowexa Technologies. We have logged your project request for <span style="color: #9333ea; font-weight: 700;">"${details.service || "Custom Software Engineering"}"</span>.</p>
            
            <div style="background: #faf5ff; border: 1px solid #e9d5ff; border-left: 4px solid #a855f7; padding: 18px; border-radius: 12px; margin: 20px 0;">
              <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; color: #7e22ce; font-weight: 700; margin-bottom: 6px;">Inquiry Summary</div>
              <div style="font-size: 14px; color: #0f172a; margin-bottom: 6px;"><strong>Requested Service:</strong> ${details.service || "N/A"}</div>
              <div style="font-size: 14px; color: #334155; line-height: 1.5;"><strong>Message Details:</strong> ${details.message || "N/A"}</div>
            </div>

            <p style="font-size: 15px; line-height: 1.6; color: #334155;">Our Senior Engineering Solutions Architect will review your requirement and reach out within 24 business hours.</p>

            ${signatureHtml}
          </div>
        `;
        break;

      case "job_application":
        subject = `Application Received: ${details.role || "Software Engineering"} | Prowexa Careers`;
        bodyHtml = `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; padding: 28px 20px; color: #0f172a; background: #ffffff;">
            <h1 style="color: #4c1d95; font-size: 22px; font-weight: 700; margin-top: 0; line-height: 1.3;">Job Application Acknowledgement</h1>
            <p style="font-size: 15px; line-height: 1.6; color: #1e293b;">Dear <strong>${recipientName || "Candidate"}</strong>,</p>
            <p style="font-size: 15px; line-height: 1.6; color: #334155;">Thank you for applying for the <strong style="color: #9333ea;">${details.role || "Software Engineering Position"}</strong> role at Prowexa Technologies.</p>
            
            <div style="background: #faf5ff; border: 1px solid #e9d5ff; padding: 18px; border-radius: 12px; margin: 20px 0;">
              <div style="font-size: 11px; text-transform: uppercase; color: #7e22ce; font-weight: 700; margin-bottom: 6px; letter-spacing: 0.5px;">Status: Under HR Review</div>
              <p style="font-size: 13px; color: #581c87; margin: 0; line-height: 1.5;">Our talent acquisition team is actively evaluating applicant portfolios. If your qualifications match our current hiring roadmap, our recruiter will contact you to schedule an interview round.</p>
            </div>

            <p style="font-size: 15px; line-height: 1.6; color: #334155;">We appreciate your interest in building high-scale digital products with Prowexa.</p>

            ${signatureHtml}
          </div>
        `;
        break;

      case "blog_approved":
        subject = `🎉 Published: Your Article "${details.title}" is Live on Prowexa Blog!`;
        bodyHtml = `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; padding: 28px 20px; color: #0f172a; background: #ffffff;">
            <h1 style="color: #4c1d95; font-size: 22px; font-weight: 700; margin-top: 0; line-height: 1.3;">Blog Article Published! 🎉</h1>
            <p style="font-size: 15px; line-height: 1.6; color: #1e293b;">Hi <strong>${recipientName || "Author"}</strong>,</p>
            <p style="font-size: 15px; line-height: 1.6; color: #334155;">Great news! Your technical article titled <strong>"${details.title}"</strong> has been approved and officially published on Prowexa Engineering Blogs.</p>
            
            <div style="margin: 24px 0;">
              <a href="https://prowexa.com/blogs/${details.slug || ""}" style="background: linear-gradient(135deg, #a855f7 0%, #7e22ce 100%); color: #ffffff; padding: 12px 24px; font-weight: 700; text-decoration: none; border-radius: 30px; display: inline-block; font-size: 14px; box-shadow: 0 4px 14px rgba(168, 85, 247, 0.4);">View Live Article</a>
            </div>

            ${signatureHtml}
          </div>
        `;
        break;

      case "testimonial_approved":
        subject = `🌟 Your Review is Featured on Prowexa Technologies!`;
        bodyHtml = `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; padding: 28px 20px; color: #0f172a; background: #ffffff;">
            <h1 style="color: #4c1d95; font-size: 22px; font-weight: 700; margin-top: 0; line-height: 1.3;">Review Approved! 🌟</h1>
            <p style="font-size: 15px; line-height: 1.6; color: #1e293b;">Hi <strong>${recipientName || "Valued Contributor"}</strong>,</p>
            <p style="font-size: 15px; line-height: 1.6; color: #334155;">Thank you for sharing your experience! Your review has been approved and is featured live on our Testimonials page.</p>
            
            ${signatureHtml}
          </div>
        `;
        break;

      case "subscribe":
        subject = `Welcome to Prowexa Tech Insights 🚀`;
        bodyHtml = `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; padding: 28px 20px; color: #0f172a; background: #ffffff;">
            <h1 style="color: #4c1d95; font-size: 22px; font-weight: 700; margin-top: 0; line-height: 1.3;">Welcome to Prowexa Engineering!</h1>
            <p style="font-size: 15px; line-height: 1.6; color: #334155;">Thank you for subscribing to Prowexa Tech Insights. You will receive curated software architecture breakdowns, React 19 guides, and AI engineering updates.</p>
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
        <body style="background-color: #f3e8ff; margin: 0; padding: 16px 8px; font-family: 'Segoe UI', Arial, sans-serif;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; box-shadow: 0 10px 25px -5px rgba(147, 51, 234, 0.15); overflow: hidden;">
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
      message: `Mobile-perfect Purple MNC Email sent from ${fromAddress}!`,
    });
  } catch (error: any) {
    console.error("Nodemailer MNC execution error:", error);
    return res.status(500).json({ error: "Failed to send email.", details: error?.message });
  }
}
