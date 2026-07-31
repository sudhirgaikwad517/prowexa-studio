export interface TriggerEmailParams {
  type: "contact" | "job_application" | "blog_approved" | "testimonial_approved" | "subscribe" | "admin_otp";
  recipientEmail: string;
  recipientName?: string;
  senderEmail?: string;
  senderName?: string;
  signatureName?: string;
  signatureDesignation?: string;
  logoUrl?: string;
  details?: Record<string, any>;
}

export async function triggerEmailNotification(params: TriggerEmailParams): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const data = await response.json().catch(() => ({}));

    if (response.ok && data.success) {
      return { success: true, message: data.message || "Email sent successfully!" };
    } else {
      return { success: false, message: data.error || data.message || "Failed to send email. Check SMTP settings." };
    }
  } catch (err: any) {
    console.error("Trigger email notification error:", err);
    return { success: false, message: err?.message || "Network error while triggering email." };
  }
}
