import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";
import fs from "fs";
import nodemailer from "nodemailer";

// Custom plugin to handle /api/send-email locally during npm run dev
function localApiPlugin(mode: string) {
  return {
    name: "local-api-plugin",
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.url && req.url.startsWith("/api/send-email")) {
          if (req.method !== "POST") {
            res.statusCode = 405;
            res.setHeader("Content-Type", "application/json");
            return res.end(JSON.stringify({ error: "Method not allowed. Use POST." }));
          }

          // Load .env variables
          const env = loadEnv(mode, process.cwd(), "");
          const smtpHost = env.SMTP_HOST || process.env.SMTP_HOST || "smtp.gmail.com";
          const smtpPort = parseInt(env.SMTP_PORT || process.env.SMTP_PORT || "465", 10);
          const smtpUser = env.SMTP_USER || process.env.SMTP_USER || "connect@prowexa.com";
          const smtpPass = (env.SMTP_PASS || process.env.SMTP_PASS || "").replace(/\s+/g, "");

          let bodyStr = "";
          req.on("data", (chunk: any) => {
            bodyStr += chunk.toString();
          });

          req.on("end", async () => {
            try {
              const body = JSON.parse(bodyStr || "{}");
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
              } = body;

              if (!recipientEmail || !type) {
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");
                return res.end(JSON.stringify({ error: "Missing recipientEmail or type." }));
              }

              if (!smtpPass) {
                console.warn("[Local API] SMTP_PASS not found in .env");
                res.setHeader("Content-Type", "application/json");
                return res.end(JSON.stringify({ success: true, simulated: true, message: "Simulation Mode: No SMTP_PASS in .env" }));
              }

              const transporter = nodemailer.createTransport({
                host: smtpHost,
                port: smtpPort,
                secure: smtpPort === 465,
                auth: { user: smtpUser, pass: smtpPass },
              });

              const isJob = type === "job_application";
              const fromAddress = senderEmail || (isJob ? "hr@prowexa.com" : "connect@prowexa.com");
              const fromName = senderName || (isJob ? "Prowexa Talent Acquisition" : "Prowexa Technologies");
              const sigName = signatureName || (isJob ? "Team Talent Acquisition" : "Enterprise Client Solutions Team");
              const sigDesig = signatureDesignation || (isJob ? "Human Resources & Hiring" : "Software Engineering & Digital Transformation");
              const currentLogo = logoUrl || "https://www.prowexa.com/assets/prowexa-logo.webp";

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
                  This is an automated system transactional message sent to ${recipientEmail}.
                </div>
              `;

              let subject = "Notification from Prowexa Technologies";
              let bodyHtml = "";

              if (type === "job_application") {
                subject = `Application Received: ${details.role || "Software Engineering"} | Prowexa Careers`;
                bodyHtml = `
                  <div style="font-family: 'Segoe UI', Arial, sans-serif; padding: 32px 40px; color: #334155; background: #ffffff;">
                    <h2 style="color: #581c87; font-size: 24px; font-weight: 700; margin-top: 0;">Job Application Acknowledgement</h2>
                    <p style="font-size: 15px; line-height: 1.6;">Dear <strong>${recipientName || "Candidate"}</strong>,</p>
                    <p style="font-size: 15px; line-height: 1.6;">Thank you for applying for the <strong style="color: #9333ea;">${details.role || "Software Position"}</strong> opportunity at Prowexa Technologies.</p>
                    
                    <div style="background: #faf5ff; border: 1px solid #e9d5ff; padding: 20px; border-radius: 12px; margin: 24px 0;">
                      <div style="font-size: 12px; text-transform: uppercase; color: #7e22ce; font-weight: 700; margin-bottom: 8px;">Application Status: Under HR Review</div>
                      <p style="font-size: 13px; color: #6b21a8; margin: 0; line-height: 1.5;">Our engineering team is actively evaluating applicant portfolios. If your skills align with our current roadmap, our recruitment specialist will reach out to schedule an interview round.</p>
                    </div>

                    ${signatureHtml}
                  </div>
                `;
              } else {
                subject = `Thank you for reaching out to Prowexa Technologies, ${recipientName || "Client"}`;
                bodyHtml = `
                  <div style="font-family: 'Segoe UI', Arial, sans-serif; padding: 32px 40px; color: #334155; background: #ffffff;">
                    <h2 style="color: #581c87; font-size: 24px; font-weight: 700; margin-top: 0;">Project Inquiry Received</h2>
                    <p style="font-size: 15px; line-height: 1.6;">Dear <strong>${recipientName || "Client"}</strong>,</p>
                    <p style="font-size: 15px; line-height: 1.6;">Thank you for getting in touch with Prowexa Technologies. We have successfully logged your project request for <span style="color: #9333ea; font-weight: 600;">"${details.service || "Custom Software Engineering"}"</span>.</p>
                    
                    <div style="background: #faf5ff; border-left: 4px solid #a855f7; padding: 20px; border-radius: 8px; margin: 24px 0;">
                      <div style="font-size: 12px; text-transform: uppercase; color: #7e22ce; font-weight: 700; margin-bottom: 8px;">Inquiry Summary</div>
                      <div style="font-size: 14px; margin-bottom: 6px;"><strong>Requested Service:</strong> ${details.service || "N/A"}</div>
                      <div style="font-size: 14px; margin-bottom: 6px;"><strong>Message Details:</strong> ${details.message || "N/A"}</div>
                    </div>

                    ${signatureHtml}
                  </div>
                `;
              }

              const fullHtml = `
                <!DOCTYPE html>
                <html>
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

              console.log(`[Local API] Sending Purple MNC email to ${recipientEmail} from ${fromAddress}...`);
              const info = await transporter.sendMail({
                from: `"${fromName}" <${fromAddress}>`,
                to: recipientEmail,
                subject,
                html: fullHtml,
              });

              console.log(`[Local API] Email Sent! MessageId: ${info.messageId}`);
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              return res.end(JSON.stringify({ success: true, message: `Email sent from ${fromAddress}!` }));
            } catch (err: any) {
              console.error("[Local API Error]:", err);
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              return res.end(JSON.stringify({ error: err?.message || "Failed to send email" }));
            }
          });
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig(({ mode }) => ({
  plugins: [
    localApiPlugin(mode),
    TanStackRouterVite(),
    tailwindcss(),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    target: "es2022",
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("@tanstack")
            ) {
              return "vendor-core";
            }
            if (id.includes("lucide-react") || id.includes("framer-motion")) {
              return "vendor-ui";
            }
          }
        },
      },
    },
  },
}));
