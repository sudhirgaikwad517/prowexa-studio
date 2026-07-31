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
              const currentLogo = logoUrl;

              const logoGraphic = currentLogo
                ? `<img src="${currentLogo}" alt="Prowexa Logo" style="height: 34px; max-width: 140px; object-fit: contain; vertical-align: middle;" />`
                : `<div style="display: inline-block; background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%); width: 38px; height: 38px; border-radius: 10px; text-align: center; line-height: 38px; color: #ffffff; font-weight: bold; font-size: 20px; font-family: 'Segoe UI', Arial, sans-serif; vertical-align: middle;">P</div>`;

              const headerHtml = `
                <div style="background: linear-gradient(135deg, #2e1065 0%, #581c87 50%, #6b21a8 100%); padding: 24px 20px; border-radius: 16px 16px 0 0; border-bottom: 2px solid #a855f7;">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td align="left" style="vertical-align: middle;">
                        ${logoGraphic}
                        <span style="font-family: 'Segoe UI', Arial, sans-serif; color: #ffffff; font-weight: 700; font-size: 18px; vertical-align: middle; margin-left: 10px; letter-spacing: 0.5px;">Prowexa</span>
                      </td>
                      <td align="right" style="vertical-align: middle; white-space: nowrap;">
                        <span style="color: #e9d5ff; font-family: 'Segoe UI', Arial, sans-serif; font-size: 11px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.8px; white-space: nowrap;">
                          ${isJob ? "Talent Acquisition" : "Enterprise Solutions"}
                        </span>
                      </td>
                    </tr>
                  </table>
                </div>
              `;

              const signatureHtml = `
                <div style="margin-top: 32px; border-top: 1px solid #3f3f46; padding-top: 24px;">
                  <div style="border-left: 4px solid #a855f7; padding-left: 16px;">
                    <div style="font-size: 16px; font-weight: 700; color: #ffffff; font-family: 'Segoe UI', Arial, sans-serif;">${sigName}</div>
                    <div style="font-size: 13px; color: #cbd5e1; margin-top: 3px; font-family: 'Segoe UI', Arial, sans-serif;">${sigDesig}</div>
                    <div style="font-size: 13px; color: #c084fc; font-weight: 700; margin-top: 4px; font-family: 'Segoe UI', Arial, sans-serif;">Prowexa Technologies Pvt. Ltd.</div>
                    <div style="font-size: 12px; color: #94a3b8; margin-top: 6px; line-height: 1.6; font-family: 'Segoe UI', Arial, sans-serif;">
                      📍 Balewadi, Pune, Maharashtra - 411045<br />
                      📧 <a href="mailto:${fromAddress}" style="color: #c084fc; font-weight: 600; text-decoration: none;">${fromAddress}</a> &nbsp;|&nbsp; 🌐 <a href="https://prowexa.com" style="color: #c084fc; font-weight: 600; text-decoration: none;">prowexa.com</a>
                    </div>
                  </div>
                </div>
              `;

              const footerHtml = `
                <div style="background: #09090b; padding: 20px 20px; border-radius: 0 0 16px 16px; border-top: 1px solid #27272a; text-align: center; font-family: 'Segoe UI', Arial, sans-serif; font-size: 11px; color: #a855f7;">
                  © 2026 Prowexa Technologies Pvt. Ltd. All rights reserved.<br />
                  This is an automated system message sent to ${recipientEmail}.
                </div>
              `;

              let subject = "Notification from Prowexa Technologies";
              let bodyHtml = "";

              if (type === "job_application") {
                subject = `Application Received: ${details.role || "Software Engineering"} | Prowexa Careers`;
                bodyHtml = `
                  <div style="font-family: 'Segoe UI', Arial, sans-serif; padding: 28px 20px; color: #ffffff; background: #18181b;">
                    <h1 style="color: #ffffff; font-size: 22px; font-weight: 700; margin-top: 0; line-height: 1.3;">Job Application Acknowledgement</h1>
                    <p style="font-size: 15px; line-height: 1.6; color: #f4f4f5;">Dear <strong>${recipientName || "Candidate"}</strong>,</p>
                    <p style="font-size: 15px; line-height: 1.6; color: #e4e4e7;">Thank you for applying for the <strong style="color: #c084fc;">${details.role || "Software Position"}</strong> opportunity at Prowexa Technologies.</p>
                    
                    <div style="background: rgba(168, 85, 247, 0.12); border: 1px solid rgba(192, 132, 252, 0.3); padding: 18px; border-radius: 12px; margin: 20px 0;">
                      <div style="font-size: 11px; text-transform: uppercase; color: #e9d5ff; font-weight: 700; margin-bottom: 6px; letter-spacing: 0.5px;">Status: Under HR Review</div>
                      <p style="font-size: 13px; color: #f3e8ff; margin: 0; line-height: 1.5;">Our engineering team is actively evaluating applicant portfolios. If your skills align with our current roadmap, our recruitment specialist will reach out to schedule an interview round.</p>
                    </div>

                    ${signatureHtml}
                  </div>
                `;
              } else {
                subject = `Thank you for reaching out to Prowexa Technologies, ${recipientName || "Client"}`;
                bodyHtml = `
                  <div style="font-family: 'Segoe UI', Arial, sans-serif; padding: 28px 20px; color: #ffffff; background: #18181b;">
                    <h1 style="color: #ffffff; font-size: 22px; font-weight: 700; margin-top: 0; line-height: 1.3;">Project Inquiry Received</h1>
                    <p style="font-size: 15px; line-height: 1.6; color: #f4f4f5;">Dear <strong>${recipientName || "Client"}</strong>,</p>
                    <p style="font-size: 15px; line-height: 1.6; color: #e4e4e7;">Thank you for getting in touch with Prowexa Technologies. We have successfully logged your project request for <span style="color: #c084fc; font-weight: 700;">"${details.service || "Custom Software Engineering"}"</span>.</p>
                    
                    <div style="background: #27272a; border: 1px solid #3f3f46; border-left: 4px solid #a855f7; padding: 18px; border-radius: 12px; margin: 20px 0;">
                      <div style="font-size: 11px; text-transform: uppercase; color: #c084fc; font-weight: 700; margin-bottom: 6px;">Inquiry Summary</div>
                      <div style="font-size: 14px; color: #ffffff; margin-bottom: 6px;"><strong>Requested Service:</strong> ${details.service || "N/A"}</div>
                      <div style="font-size: 14px; color: #e4e4e7; line-height: 1.5;"><strong>Message Details:</strong> ${details.message || "N/A"}</div>
                    </div>

                    ${signatureHtml}
                  </div>
                `;
              }

              const fullHtml = `
                <!DOCTYPE html>
                <html>
                  <body style="background-color: #09090b; margin: 0; padding: 16px 8px; font-family: 'Segoe UI', Arial, sans-serif;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="center">
                          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: #18181b; border-radius: 16px; border: 1px solid #27272a; box-shadow: 0 10px 25px -5px rgba(147, 51, 234, 0.25); overflow: hidden;">
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

              console.log(`[Local API] Sending Crisp White Text Purple MNC email to ${recipientEmail} from ${fromAddress}...`);
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
