import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

// Read .env file manually
const envPath = path.resolve(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || "";
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
      process.env[key] = value.trim();
    }
  });
}

async function runMncTest() {
  const user = process.env.SMTP_USER || "connect@prowexa.com";
  const pass = (process.env.SMTP_PASS || "").replace(/\s+/g, "");

  console.log("------------------------------------------");
  console.log("Prowexa MNC Email Template Engine Test");
  console.log("SMTP User:", user);
  console.log("------------------------------------------");

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "465", 10),
    secure: true,
    auth: { user, pass },
  });

  const mncHrTemplate = `
    <!DOCTYPE html>
    <html>
      <body style="background-color: #f1f5f9; margin: 0; padding: 40px 10px; font-family: 'Segoe UI', Arial, sans-serif;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center">
              <table width="100%" max-width="640" border="0" cellspacing="0" cellpadding="0" style="max-width: 640px; background-color: #ffffff; border-radius: 16px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); overflow: hidden;">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); padding: 32px 40px;">
                    <table width="100%">
                      <tr>
                        <td align="left">
                          <span style="background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); width: 42px; height: 42px; border-radius: 12px; display: inline-block; text-align: center; line-height: 42px; color: #fff; font-weight: bold; font-size: 22px;">P</span>
                          <span style="color: #fff; font-weight: 700; font-size: 20px; vertical-align: middle; margin-left: 12px;">Prowexa Technologies</span>
                        </td>
                        <td align="right" style="color: #94a3b8; font-size: 12px; text-transform: uppercase;">Talent Acquisition</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- Body -->
                <tr>
                  <td style="padding: 32px 40px; color: #334155;">
                    <h2 style="color: #0f172a; font-size: 24px; font-weight: 700; margin-top: 0;">Job Application Acknowledgement</h2>
                    <p style="font-size: 15px; line-height: 1.6;">Dear <strong>Candidate</strong>,</p>
                    <p style="font-size: 15px; line-height: 1.6;">Thank you for applying for the <strong style="color: #a855f7;">Senior Full Stack Engineer</strong> role at Prowexa Technologies.</p>
                    <div style="background: #faf5ff; border: 1px solid #e9d5ff; padding: 20px; border-radius: 12px; margin: 24px 0;">
                      <div style="font-size: 12px; text-transform: uppercase; color: #9333ea; font-weight: 700;">Status: Under HR Review</div>
                      <p style="font-size: 13px; color: #6b21a8; margin: 6px 0 0 0;">Our engineering team is actively evaluating candidate portfolios. If your qualifications match our current hiring roadmap, our recruitment specialist will reach out to schedule an interview round.</p>
                    </div>
                    <!-- Signature -->
                    <div style="margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 24px;">
                      <table border="0">
                        <tr>
                          <td style="padding-right: 16px; border-right: 3px solid #9333ea;">
                            <div style="width: 48px; height: 48px; border-radius: 50%; background: #f3e8ff; text-align: center; line-height: 48px; font-weight: bold; color: #9333ea; font-size: 18px;">HR</div>
                          </td>
                          <td style="padding-left: 16px;">
                            <div style="font-weight: 700; color: #0f172a; font-size: 15px;">Team Talent Acquisition</div>
                            <div style="color: #64748b; font-size: 13px;">Human Resources & Hiring | Prowexa Technologies</div>
                            <div style="color: #9333ea; font-size: 13px; margin-top: 4px; font-weight: 600;">Prowexa Technologies Pvt. Ltd.</div>
                            <div style="color: #94a3b8; font-size: 12px;">📍 Balewadi, Pune, Maharashtra | 📧 hr@prowexa.com</div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td style="background: #f8fafc; padding: 24px 40px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9;">
                    © 2026 Prowexa Technologies Pvt. Ltd. All rights reserved.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  try {
    console.log("Sending MNC HR Candidate Email from hr@prowexa.com...");
    const info = await transporter.sendMail({
      from: `"Prowexa Talent Acquisition" <hr@prowexa.com>`,
      to: user,
      subject: "Application Received: Senior Full Stack Engineer | Prowexa Careers",
      html: mncHrTemplate,
    });
    console.log("MNC HR Email Sent Successfully! MessageId:", info.messageId);
  } catch (err) {
    console.error("Test failed:", err);
  }
}

runMncTest();
