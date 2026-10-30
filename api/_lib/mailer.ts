import nodemailer from "nodemailer";

export type EmailType =
  | "contact"
  | "job_application"
  | "blog_approved"
  | "testimonial_approved"
  | "subscribe"
  | "admin_otp";

export interface EmailParams {
  type: EmailType;
  recipientEmail: string;
  recipientName?: string;
  senderEmail?: string;
  senderName?: string;
  signatureName?: string;
  signatureDesignation?: string;
  logoUrl?: string;
  details?: Record<string, any>;
}

export type EmailResult = { success: boolean; simulated?: boolean; error?: string };

// Escape every caller-supplied value before it goes into the HTML body.
function esc(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function safeUrl(value: unknown) {
  const url = String(value ?? "");
  return /^https:\/\//i.test(url) ? esc(url) : "";
}

export async function sendEmail(params: EmailParams): Promise<EmailResult> {
  const { type, recipientEmail, recipientName, details = {} } = params;

  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
  const smtpUser = process.env.SMTP_USER || "connect@prowexa.com";
  const smtpPass = (process.env.SMTP_PASS || "").replace(/\s+/g, "");

  if (!smtpPass) {
    console.warn("[mailer] SMTP_PASS is not set; email not sent:", type, recipientEmail);
    return { success: false, simulated: true, error: "SMTP is not configured (SMTP_PASS missing)." };
  }

  const isJob = type === "job_application";
  const fromAddress = params.senderEmail || (isJob ? "hr@prowexa.com" : "connect@prowexa.com");
  const fromName = params.senderName || (isJob ? "Prowexa Talent Acquisition" : "Prowexa Technologies");
  const sigName = esc(params.signatureName || (isJob ? "Team Talent Acquisition" : "Enterprise Client Solutions Team"));
  const sigDesig = esc(
    params.signatureDesignation || (isJob ? "Human Resources & Hiring" : "Software Engineering & Digital Transformation"),
  );
  const name = esc(recipientName);
  const logoUrl = safeUrl(params.logoUrl);

  const logoGraphic = logoUrl
    ? `<img src="${logoUrl}" alt="Prowexa Logo" style="height: 34px; max-width: 140px; object-fit: contain; vertical-align: middle;" />`
    : `<div style="display: inline-block; background: linear-gradient(135deg, #7e22ce 0%, #a855f7 100%); width: 36px; height: 36px; border-radius: 8px; text-align: center; line-height: 36px; color: #ffffff; font-weight: bold; font-size: 20px; font-family: 'Segoe UI', Arial, sans-serif; vertical-align: middle;">P</div>`;

  const headerHtml = `
    <div style="background: linear-gradient(135deg, #2e1065 0%, #4c1d95 100%); padding: 24px 24px; border-radius: 16px 16px 0 0; border-bottom: 3px solid #9333ea;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td align="left" style="vertical-align: middle;">
            ${logoGraphic}
            <span style="font-family: 'Segoe UI', Arial, sans-serif; color: #ffffff !important; font-weight: 700; font-size: 19px; vertical-align: middle; margin-left: 10px; letter-spacing: 0.5px;">Prowexa Technologies</span>
          </td>
          <td align="right" style="vertical-align: middle; white-space: nowrap;">
            <span style="color: #ffffff !important; font-family: 'Segoe UI', Arial, sans-serif; font-size: 11px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.8px; white-space: nowrap; background: rgba(255,255,255,0.15); padding: 4px 10px; border-radius: 20px;">
              ${type === "admin_otp" ? "Security Portal" : isJob ? "Talent Acquisition" : "Enterprise Solutions"}
            </span>
          </td>
        </tr>
      </table>
    </div>
  `;

  const signatureHtml = `
    <div style="margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 24px;">
      <div style="border-left: 4px solid #9333ea; padding-left: 16px;">
        <div style="font-size: 16px; font-weight: 700; color: #0f172a !important; font-family: 'Segoe UI', Arial, sans-serif;">${sigName}</div>
        <div style="font-size: 13px; color: #475569 !important; margin-top: 3px; font-family: 'Segoe UI', Arial, sans-serif;">${sigDesig}</div>
        <div style="font-size: 13px; color: #0f172a !important; font-weight: 700; margin-top: 4px; font-family: 'Segoe UI', Arial, sans-serif;">Prowexa Technologies Pvt. Ltd.</div>
        <div style="font-size: 12px; color: #64748b !important; margin-top: 6px; line-height: 1.6; font-family: 'Segoe UI', Arial, sans-serif;">
          📍 Balewadi, Pune, Maharashtra - 411045<br />
          📧 <a href="mailto:${esc(fromAddress)}" style="color: #0f172a !important; font-weight: 700; text-decoration: underline;">${esc(fromAddress)}</a> &nbsp;|&nbsp; 🌐 <a href="https://prowexa.com" style="color: #0f172a !important; font-weight: 700; text-decoration: underline;">prowexa.com</a>
        </div>
      </div>
    </div>
  `;

  const footerHtml = `
    <div style="background: #f8fafc; padding: 20px 24px; border-radius: 0 0 16px 16px; border-top: 1px solid #e2e8f0; text-align: center; font-family: 'Segoe UI', Arial, sans-serif; font-size: 11px; color: #64748b !important;">
      © 2026 Prowexa Technologies Pvt. Ltd. All rights reserved.<br />
      This is an automated system transactional message sent to ${esc(recipientEmail)}.
    </div>
  `;

  const wrap = (inner: string) =>
    `<div style="font-family: 'Segoe UI', Arial, sans-serif; padding: 32px 24px; color: #0f172a !important; background: #ffffff;">${inner}${signatureHtml}</div>`;
  const h1 = (text: string) =>
    `<h1 style="color: #0f172a !important; font-size: 22px; font-weight: 700; margin-top: 0; line-height: 1.3;">${text}</h1>`;
  const p = (html: string, color = "#334155") =>
    `<p style="font-size: 15px; line-height: 1.6; color: ${color} !important;">${html}</p>`;

  let subject = "Notification from Prowexa Technologies";
  let bodyHtml = "";

  switch (type) {
    case "admin_otp":
      subject = `🔐 Prowexa Admin Security OTP Code: ${String(details.otp || "")}`;
      bodyHtml = wrap(`
        ${h1("Admin Security Verification Code")}
        ${p("Hello <strong>Prowexa Administrator</strong>,", "#0f172a")}
        ${p("Use the following 6-digit One-Time Password (OTP) to unlock access to the Admin Management Dashboard:")}
        <div style="background: #f8fafc; border: 2px dashed #9333ea; padding: 20px; border-radius: 12px; margin: 24px 0; text-align: center;">
          <div style="font-size: 11px; text-transform: uppercase; color: #475569 !important; font-weight: 700; margin-bottom: 6px; letter-spacing: 1px;">Your Admin Verification OTP</div>
          <div style="font-size: 34px; font-weight: 800; color: #0f172a !important; letter-spacing: 8px; font-family: monospace;">${esc(details.otp)}</div>
        </div>
        <p style="font-size: 13px; line-height: 1.5; color: #64748b !important;">⏱️ This verification code is valid for <strong>10 minutes</strong>. Do not share this OTP with anyone. If you did not request it, you can ignore this email.</p>
      `);
      break;

    case "contact":
      subject = `Thank you for reaching out to Prowexa Technologies, ${String(recipientName || "Client")}`;
      bodyHtml = wrap(`
        ${h1("Project Inquiry Received")}
        ${p(`Dear <strong>${name || "Client"}</strong>,`, "#0f172a")}
        ${p(`Thank you for contacting Prowexa Technologies. We have logged your project request for <strong>"${esc(details.service || "Custom Software Engineering")}"</strong>.`)}
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #0f172a; padding: 18px; border-radius: 12px; margin: 20px 0;">
          <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; color: #0f172a !important; font-weight: 700; margin-bottom: 6px;">Inquiry Summary</div>
          <div style="font-size: 14px; color: #0f172a !important; margin-bottom: 6px;"><strong>Requested Service:</strong> ${esc(details.service || "N/A")}</div>
          <div style="font-size: 14px; color: #334155 !important; line-height: 1.5;"><strong>Message Details:</strong> ${esc(details.message || "N/A")}</div>
        </div>
        ${p("Our solutions team will review your requirement and reach out within one business day.")}
      `);
      break;

    case "job_application":
      subject = `Application Received: ${String(details.role || "Software Engineering")} | Prowexa Careers`;
      bodyHtml = wrap(`
        ${h1("Job Application Acknowledgement")}
        ${p(`Dear <strong>${name || "Candidate"}</strong>,`, "#0f172a")}
        ${p(`Thank you for applying for the <strong>${esc(details.role || "Software Engineering Position")}</strong> role at Prowexa Technologies.`)}
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #9333ea; padding: 18px; border-radius: 12px; margin: 20px 0;">
          <div style="font-size: 11px; text-transform: uppercase; color: #0f172a !important; font-weight: 700; margin-bottom: 6px; letter-spacing: 0.5px;">Status: Under HR Review</div>
          <p style="font-size: 13px; color: #334155 !important; margin: 0; line-height: 1.5;">Our talent acquisition team is reviewing applications. If your profile matches our current openings, our recruiter will contact you to schedule an interview.</p>
        </div>
        ${p("We appreciate your interest in building digital products with Prowexa.")}
      `);
      break;

    case "blog_approved":
      subject = `🎉 Published: Your Article "${String(details.title || "")}" is Live on Prowexa Blog!`;
      bodyHtml = wrap(`
        ${h1("Blog Article Published! 🎉")}
        ${p(`Hi <strong>${name || "Author"}</strong>,`, "#0f172a")}
        ${p(`Great news! Your article <strong>"${esc(details.title)}"</strong> has been approved and published on the Prowexa blog.`)}
        <div style="margin: 24px 0;">
          <a href="https://prowexa.com/blogs/${encodeURIComponent(String(details.slug || ""))}" style="background: #0f172a; color: #ffffff !important; padding: 12px 24px; font-weight: 700; text-decoration: none; border-radius: 30px; display: inline-block; font-size: 14px;">View Live Article</a>
        </div>
      `);
      break;

    case "testimonial_approved":
      subject = "🌟 Your Review is Featured on Prowexa Technologies!";
      bodyHtml = wrap(`
        ${h1("Review Approved! 🌟")}
        ${p(`Hi <strong>${name || "Valued Contributor"}</strong>,`, "#0f172a")}
        ${p("Thank you for sharing your experience! Your review has been approved and is featured on our Testimonials page.")}
      `);
      break;

    case "subscribe":
      subject = "Welcome to Prowexa Tech Insights 🚀";
      bodyHtml = wrap(`
        ${h1("Welcome to Prowexa Engineering!")}
        ${p("Thank you for subscribing to Prowexa Tech Insights. You will receive software architecture breakdowns, engineering guides and AI updates.")}
      `);
      break;
  }

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style="background-color: #f1f5f9; margin: 0; padding: 20px 8px; font-family: 'Segoe UI', Arial, sans-serif;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08); overflow: hidden;">
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

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });
    await transporter.sendMail({
      from: `"${fromName.replace(/"/g, "")}" <${fromAddress}>`,
      to: recipientEmail,
      subject: subject.replace(/[\r\n]+/g, " "),
      html,
    });
    return { success: true };
  } catch (err: any) {
    console.error("[mailer] send failed:", err?.message);
    return { success: false, error: "Failed to send email." };
  }
}
