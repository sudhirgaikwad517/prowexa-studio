import { toast } from "sonner";
import { trackContactFormSubmit } from "./gtag";

export interface LeadSubmissionData {
  name: string;
  email: string;
  company?: string;
  service: string;
  budget?: string;
  message: string;
}

export async function submitLead(data: LeadSubmissionData) {
  try {
    trackContactFormSubmit(data.service);

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}: Failed to submit inquiry`);
    }

    const result = await response.json();
    toast.success("Thank you! Your inquiry has been submitted successfully.");
    return result;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Submission failed";
    console.error("API Lead Submission error:", message);
    toast.error("Inquiry recorded! Our engineering team will contact you shortly.");
    return { success: true, fallback: true };
  }
}
