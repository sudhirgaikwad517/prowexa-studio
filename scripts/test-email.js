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

async function runTest() {
  console.log("Reading SMTP configurations from .env...");
  console.log("SMTP_HOST:", process.env.SMTP_HOST);
  console.log("SMTP_PORT:", process.env.SMTP_PORT);
  console.log("SMTP_USER:", process.env.SMTP_USER);
  console.log("SMTP_PASS:", process.env.SMTP_PASS ? "***** (App Password Loaded)" : "NOT SET");

  const user = process.env.SMTP_USER;
  const pass = (process.env.SMTP_PASS || "").replace(/\s+/g, "");

  if (!user || !pass) {
    console.error("Error: SMTP_USER or SMTP_PASS is missing in .env file.");
    process.exit(1);
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "465", 10),
    secure: true,
    auth: {
      user: user,
      pass: pass,
    },
  });

  try {
    console.log("Verifying connection to Google Workspace SMTP server...");
    await transporter.verify();
    console.log("SUCCESS: Connected to Google Workspace SMTP Server!");

    console.log(`Sending test email to ${user}...`);
    const info = await transporter.sendMail({
      from: `"Prowexa SMTP Test" <${user}>`,
      to: user,
      subject: "Prowexa Google Workspace SMTP Test Successful!",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; color: #333; max-width: 600px; border: 1px solid #e4e4e7; border-radius: 12px;">
          <h2 style="color: #6366f1; margin-top: 0;">Google Workspace SMTP Configuration Active! 🎉</h2>
          <p>This is an automated test email confirming that <strong>${user}</strong> is successfully connected to Google Workspace SMTP server.</p>
          <hr style="border: 0; border-top: 1px solid #e4e4e7; margin: 20px 0;" />
          <p style="font-size: 12px; color: #71717a;">Timestamp: ${new Date().toLocaleString()}</p>
        </div>
      `,
    });

    console.log("SUCCESS! Test email sent successfully. MessageId:", info.messageId);
  } catch (error) {
    console.error("SMTP Connection Test Failed:", error);
  }
}

runTest();
