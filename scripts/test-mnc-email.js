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
  const targetRecipient = "sudhirgaikwad517@gmail.com";

  console.log("------------------------------------------");
  console.log("Prowexa Admin OTP Security Test");
  console.log("SMTP User:", user);
  console.log("Target Admin Recipient:", targetRecipient);
  console.log("------------------------------------------");

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "465", 10),
    secure: true,
    auth: { user, pass },
  });

  const testOtpCode = Math.floor(100000 + Math.random() * 900000).toString();

  const otpHtml = `
    <!DOCTYPE html>
    <html>
      <body style="background-color: #f1f5f9; margin: 0; padding: 20px 8px; font-family: 'Segoe UI', Arial, sans-serif;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center">
              <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08); overflow: hidden;">
                <tr>
                  <td style="background: linear-gradient(135deg, #2e1065 0%, #4c1d95 100%); padding: 24px 24px; border-bottom: 3px solid #9333ea;">
                    <span style="color: #ffffff !important; font-weight: 700; font-size: 19px;">Prowexa Technologies</span>
                    <span style="color: #ffffff !important; float: right; font-size: 11px; text-transform: uppercase; font-weight: 700; background: rgba(255,255,255,0.15); padding: 4px 10px; border-radius: 20px;">Security Portal</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 32px 24px; color: #0f172a !important; background: #ffffff;">
                    <h1 style="color: #0f172a !important; font-size: 22px; font-weight: 700; margin-top: 0;">Admin Security Verification Code</h1>
                    <p style="font-size: 15px; color: #0f172a !important;">Hello <strong>Prowexa Administrator</strong>,</p>
                    <p style="font-size: 15px; color: #334155 !important;">Use the following 6-digit One-Time Password (OTP) to unlock access to the Executive Admin Management Dashboard:</p>
                    
                    <div style="background: #f8fafc; border: 2px dashed #9333ea; padding: 20px; border-radius: 12px; margin: 24px 0; text-align: center;">
                      <div style="font-size: 11px; text-transform: uppercase; color: #475569 !important; font-weight: 700; margin-bottom: 6px; letter-spacing: 1px;">Your Admin Verification OTP</div>
                      <div style="font-size: 34px; font-weight: 800; color: #0f172a !important; letter-spacing: 8px; font-family: monospace;">${testOtpCode}</div>
                    </div>

                    <p style="font-size: 13px; color: #64748b !important;">⏱️ This verification code is valid for <strong>10 minutes</strong>. Do not share this OTP with anyone.</p>
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
    console.log(`Sending Admin OTP Security Email to ${targetRecipient}...`);
    const info = await transporter.sendMail({
      from: `"Prowexa Technologies Security" <connect@prowexa.com>`,
      to: targetRecipient,
      subject: `🔐 Prowexa Admin Security OTP Code: ${testOtpCode}`,
      html: otpHtml,
    });
    console.log(`MNC OTP Email Sent Successfully to ${targetRecipient}! MessageId:`, info.messageId);
  } catch (err) {
    console.error("Test failed:", err);
  }
}

runMncTest();
