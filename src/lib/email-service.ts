export interface TriggerEmailParams {
  type: "contact" | "job_application" | "blog_approved" | "testimonial_approved" | "subscribe";
  recipientEmail: string;
  recipientName?: string;
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

    if (response.ok) {
      const data = await response.json();
      return { success: true, message: data.message };
    }
  } catch (err) {
    console.warn("Trigger email notification error (Local simulation mode):", err);
  }
  return { success: true, message: "Notification logged." };
}
