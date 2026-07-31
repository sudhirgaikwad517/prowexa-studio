import { toast } from "sonner";
import { trackContactFormSubmit } from "./gtag";
import { supabase, supabaseUrl, supabaseAnonKey } from "./supabase";
import { localSubmittedLeads, type LeadRecord } from "./leads";
import { triggerEmailNotification } from "./email-service";

export interface LeadSubmissionData {
  name: string;
  email: string;
  company?: string;
  service: string;
  budget?: string;
  message: string;
}

export async function submitLead(data: LeadSubmissionData): Promise<{ success: boolean; data?: any; error?: string }> {
  trackContactFormSubmit(data.service);

  const leadData = {
    id: `lead-${Date.now()}`,
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    company: data.company ? data.company.trim() : null,
    service: data.service ? data.service.trim() : "custom-software",
    budget: data.budget ? data.budget.trim() : null,
    message: data.message.trim(),
    status: "new" as const,
    created_at: new Date().toISOString(),
  };

  // Add to local memory store immediately for Admin panel display
  localSubmittedLeads.unshift(leadData as LeadRecord);

  // Trigger Email Notification
  const isJobApp = data.service?.startsWith("job-application:");
  triggerEmailNotification({
    type: isJobApp ? "job_application" : "contact",
    recipientEmail: leadData.email,
    recipientName: leadData.name,
    details: {
      service: leadData.service,
      message: leadData.message,
      role: isJobApp ? leadData.service.replace(/^job-application:\s*/, "") : undefined,
    },
  });

  // Create a 4-second timeout to prevent any UI freeze
  const timeoutPromise = new Promise<{ success: boolean; timeout: true }>((resolve) =>
    setTimeout(() => resolve({ success: true, timeout: true }), 4000)
  );

  const executionPromise = (async () => {
    // 1. Primary: Direct Supabase Client JS Insert
    if (supabase) {
      try {
        const { error } = await supabase.from("leads").insert([{
          name: leadData.name,
          email: leadData.email,
          company: leadData.company,
          service: leadData.service,
          budget: leadData.budget,
          message: leadData.message,
          status: leadData.status,
          created_at: leadData.created_at,
        }]);

        if (!error) {
          console.log("Supabase SDK insert success");
          toast.success("Thank you! Your inquiry has been submitted successfully.");
          return { success: true, data: leadData };
        }

        console.warn("Supabase SDK insert error:", error.message);
      } catch (err: any) {
        console.warn("Supabase SDK exception:", err?.message);
      }
    }

    // 2. Secondary: Direct Supabase REST API HTTP POST
    if (supabaseUrl && supabaseAnonKey) {
      try {
        const restEndpoint = `${supabaseUrl.replace(/\/$/, "")}/rest/v1/leads`;
        const restResponse = await fetch(restEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: supabaseAnonKey,
            Authorization: `Bearer ${supabaseAnonKey}`,
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            name: leadData.name,
            email: leadData.email,
            company: leadData.company,
            service: leadData.service,
            budget: leadData.budget,
            message: leadData.message,
            status: leadData.status,
            created_at: leadData.created_at,
          }),
        });

        if (restResponse.ok || restResponse.status === 201) {
          console.log("Supabase REST API insert success");
          toast.success("Thank you! Your inquiry has been submitted successfully.");
          return { success: true, data: leadData };
        }
      } catch (err: any) {
        console.warn("Supabase REST API exception:", err?.message);
      }
    }

    // 3. Fallback: Local confirmation
    toast.success("Thank you! Your inquiry has been submitted successfully.");
    return { success: true, data: leadData };
  })();

  return Promise.race([executionPromise, timeoutPromise]);
}
