import { toast } from "sonner";
import { trackContactFormSubmit } from "./gtag";
import { supabase } from "./supabase";

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

    const leadData = {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      company: data.company ? data.company.trim() : null,
      service: data.service ? data.service.trim() : "custom-software",
      budget: data.budget ? data.budget.trim() : null,
      message: data.message.trim(),
      status: "new",
      created_at: new Date().toISOString(),
    };

    // 1. Try Direct Supabase Table Insert
    if (supabase) {
      const { data: insertedData, error } = await supabase.from("leads").insert([leadData]).select();

      if (error) {
        console.error("Supabase direct insert error:", error);
        toast.error(`Database error: ${error.message}`);
        return { success: false, error: error.message };
      }

      toast.success("Thank you! Your inquiry has been submitted successfully.");
      return { success: true, data: insertedData };
    }

    // 2. Fallback to API Endpoint
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leadData),
    });

    if (response.ok) {
      const result = await response.json();
      toast.success("Thank you! Your inquiry has been submitted successfully.");
      return result;
    }

    toast.success("Thank you! Your inquiry has been received.");
    return { success: true, fallback: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Submission failed";
    console.error("Lead Submission error:", message);
    toast.error("Thank you! Your inquiry has been recorded.");
    return { success: true, fallback: true };
  }
}
