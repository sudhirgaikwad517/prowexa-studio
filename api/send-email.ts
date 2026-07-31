import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

interface EmailRequestBody {
  type: "contact" | "job_application" | "blog_approved" | "testimonial_approved" | "subscribe";
  recipientEmail: string;
  recipientName?: string;
  details?: Record<string, any>;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const { type, recipientEmail, recipientName, details = {} } = req.body as EmailRequestBody;

  if (!recipientEmail || !type) {
    return res.status(400).json({ error: "Missing recipientEmail or type." });
  }

  // Configure SMTP Transporter using Google Workspace or custom SMTP
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
  const smtpUser = process.env.SMTP_USER || "info@prowexa.com";
  const smtpPass = process.env.SMTP_PASS || ""; // Google App Password

  // Fallback / Log if SMTP password is not set yet in Vercel env
  if (!smtpPass) {
    console.warn("SMTP_PASS is not set in environment variables. Email simulation logged.");
    return res.status(200).json({
      success: true,
      simulated: true,
      message: "Email triggered successfully (Simulation mode - set SMTP_PASS in Vercel to send live emails).",
      details: { type, recipientEmail, recipientName },
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for 587
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    let subject = "Notification from Prowexa Technologies";
    let htmlContent = "";

    switch (type) {
      case "contact":
        subject = `Thank you for contacting Prowexa Technologies, ${recipientName || "Client"}!`;
        htmlContent = `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #6366f1;">Thank you for reaching out to Prowexa Technologies!</h2>
            <p>Hi ${recipientName || "there"},</p>
            <p>We have received your project inquiry regarding <strong>${details.service || "Software Services"}</strong>.</p>
            <p>Our engineering team will review your requirement and get back to you within 24 business hours.</p>

            <div style="background: #f4f4f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <strong>Your Inquiry Summary:</strong><br />
              <strong>Service:</strong> ${details.service || "N/A"}<br />
              <strong>Message:</strong> ${details.message || "N/A"}
            </div>

            <p>Best Regards,<br /><strong>Prowexa Technologies Team</strong><br />Pune, India | <a href="https://prowexa.com">prowexa.com</a></p>
          </div>
        `;
        break;

      case "job_application":
        subject = `Job Application Received: ${details.role || "Software Position"} | Prowexa Technologies`;
        htmlContent = `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #6366f1;">Application Received at Prowexa!</h2>
            <p>Hi ${recipientName || "Candidate"},</p>
            <p>Thank you for applying for the <strong>${details.role || "Software Engineering"}</strong> position at Prowexa Technologies.</p>
            <p>Our HR and technical hiring team will evaluate your portfolio and get in touch with you if your qualifications match our current requirements.</p>

            <p>Best of luck,<br /><strong>Prowexa Talent Acquisition Team</strong></p>
          </div>
        `;
        break;

      case "blog_approved":
        subject = `🎉 Congratulations! Your Blog Article "${details.title}" is Published on Prowexa!`;
        htmlContent = `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #10b981;">Your Blog Article is Live!</h2>
            <p>Hi ${recipientName || "Author"},</p>
            <p>Great news! Your technical blog article titled <strong>"${details.title}"</strong> has been approved by the Prowexa editorial team and is now live on our official blog!</p>
            <p><a href="https://prowexa.com/blogs/${details.slug || ""}" style="background: #6366f1; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; display: inline-block;">Read Live Article</a></p>
            <p>Thank you for contributing to the Prowexa Engineering Community.</p>
          </div>
        `;
        break;

      case "testimonial_approved":
        subject = `🌟 Your Review is Published on Prowexa Technologies!`;
        htmlContent = `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #f59e0b;">Thank you for your review!</h2>
            <p>Hi ${recipientName || "Valued User"},</p>
            <p>Your feedback/testimonial has been approved and is now featured on the Prowexa Technologies Testimonials page.</p>
            <p><a href="https://prowexa.com/testimonials" style="color: #6366f1;">View Testimonials Page</a></p>
          </div>
        `;
        break;

      case "subscribe":
        subject = `Welcome to Prowexa Tech Insights! 🚀`;
        htmlContent = `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #6366f1;">Welcome to Prowexa Technologies!</h2>
            <p>Thank you for subscribing to our technical newsletter. You will now receive monthly engineering blogs, AI system guides, and architecture insights.</p>
          </div>
        `;
        break;
    }

    // Send Mail
    await transporter.sendMail({
      from: `"Prowexa Technologies" <${smtpUser}>`,
      to: recipientEmail,
      subject,
      html: htmlContent,
    });

    // Send Notification to Admin
    if (type === "contact" || type === "job_application") {
      await transporter.sendMail({
        from: `"Prowexa Website Alert" <${smtpUser}>`,
        to: smtpUser,
        subject: `[ALERT] New ${type.toUpperCase()}: ${recipientName}`,
        html: `<p>New submission from <strong>${recipientName}</strong> (${recipientEmail}).</p><p>Check Admin Dashboard: <a href="https://prowexa.com/admin">prowexa.com/admin</a></p>`,
      });
    }

    return res.status(200).json({ success: true, message: "Email sent successfully via Google Workspace SMTP!" });
  } catch (error: any) {
    console.error("Nodemailer error:", error);
    return res.status(500).json({ error: "Failed to send email.", details: error?.message });
  }
}
