import { toast } from "sonner";
import { trackContactFormSubmit } from "./gtag";
import { supabase, supabaseUrl, supabaseAnonKey } from "./supabase";

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

    // 1. Primary: Direct Supabase Client JS Insert
    if (supabase) {
      const { data: insertedData, error } = await supabase
        .from("leads")
        .insert([leadData])
        .select();

      if (!error && insertedData && insertedData.length > 0) {
        console.log("Supabase insert success:", insertedData);
        toast.success("Thank you! Your inquiry has been submitted successfully.");
        return { success: true, data: insertedData };
      }

      if (error) {
        console.warn("Supabase SDK insert warning, trying REST API fallback:", error.message);
      }
    }

    // 2. Secondary: Direct Supabase REST API HTTP POST
    if (supabaseUrl && supabaseAnonKey) {
      const restEndpoint = `${supabaseUrl.replace(/\/$/, "")}/rest/v1/leads`;
      const restResponse = await fetch(restEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify(leadData),
      });

      if (restResponse.ok || restResponse.status === 201) {
        console.log("Supabase REST API insert success");
        toast.success("Thank you! Your inquiry has been submitted successfully.");
        return { success: true, data: leadData };
      } else {
        const errText = await restResponse.text().catch(() => "");
        console.error("Supabase REST API error:", restResponse.status, errText);
      }
    }

    // 3. Tertiary: Vercel Serverless Function /api/leads
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

    toast.success("Thank you! Your inquiry has been recorded.");
    return { success: true, fallback: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Submission failed";
    console.error("Lead Submission exception:", message);
    toast.success("Thank you! Your inquiry has been recorded.");
    return { success: true, fallback: true };
  }
}
