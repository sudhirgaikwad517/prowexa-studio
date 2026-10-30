import { toast } from "sonner";
import { trackContactFormSubmit } from "./gtag";
import { apiFetch, jsonBody } from "./http";

export interface LeadSubmissionData {
  name: string;
  email: string;
  company?: string;
  service: string;
  budget?: string;
  message: string;
}

// Saves the inquiry in Postgres via /api/leads; the server also sends the acknowledgement email.
export async function submitLead(data: LeadSubmissionData): Promise<{ success: boolean; data?: any; error?: string }> {
  trackContactFormSubmit(data.service);

  const result = await apiFetch("/api/leads", { method: "POST", body: jsonBody(data) });
  if (result.success) {
    toast.success("Thank you! Your inquiry has been submitted successfully.");
    return { success: true, data: result.data };
  }

  const error = result.error || "Could not submit your inquiry.";
  toast.error(`${error} You can also email us at info@prowexa.com.`);
  return { success: false, error };
}
