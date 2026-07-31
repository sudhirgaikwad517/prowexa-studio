import { supabase } from "./supabase";
import type { LeadSubmissionData } from "./api";

export interface LeadRecord extends LeadSubmissionData {
  id: string;
  status: "new" | "contacted" | "archived";
  created_at: string;
}

export const fallbackLeads: LeadRecord[] = [
  {
    id: "lead-1",
    name: "Vikram Malhotra",
    email: "vikram@techcorp.in",
    company: "TechCorp Global",
    service: "custom-software",
    budget: "$10,000 - $25,000",
    message: "We need to build a custom ERP system for our logistics business in Pune.",
    status: "new",
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: "lead-job-1",
    name: "Aman Verma",
    email: "aman.verma@example.com",
    company: "Phone: +91 98123 45678 | Exp: 3-5 years",
    service: "job-application: Senior Full Stack Engineer",
    budget: "Portfolio: https://github.com/amanverma",
    message: "Application for Senior Full Stack Engineer. 4 years of experience building React and Node.js microservices.",
    status: "new",
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: "lead-2",
    name: "Ananya Deshmukh",
    email: "ananya@academy.edu",
    company: "COEP Student",
    service: "academy-training",
    budget: "Academy Course Inquiry",
    message: "Interested in Java Full Stack Training + Industry Internship batch starting next month.",
    status: "contacted",
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
];

export const localSubmittedLeads: LeadRecord[] = [];

export async function fetchAllLeadsAdmin(): Promise<LeadRecord[]> {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.warn("Fetch leads admin Supabase error:", error);
      } else if (data) {
        const existingIds = new Set(data.map((d) => d.id));
        const extraLocal = localSubmittedLeads.filter((l) => !existingIds.has(l.id));
        const extraFallbacks = fallbackLeads.filter(
          (f) => !existingIds.has(f.id) && !extraLocal.some((l) => l.id === f.id)
        );
        return [...extraLocal, ...data, ...extraFallbacks];
      }
    }
  } catch (err) {
    console.warn("Fetch leads admin error:", err);
  }
  const existingIds = new Set(localSubmittedLeads.map((d) => d.id));
  const extraFallbacks = fallbackLeads.filter((f) => !existingIds.has(f.id));
  return [...localSubmittedLeads, ...extraFallbacks];
}

export async function updateLeadStatus(id: string, status: "new" | "contacted" | "archived") {
  try {
    if (supabase) {
      const { error } = await supabase.from("leads").update({ status }).eq("id", id);
      if (!error) return { success: true };
    }
  } catch (err) {
    console.warn("Update lead status error:", err);
  }
  return { success: true };
}

export async function deleteLead(id: string) {
  try {
    if (supabase) {
      const { error } = await supabase.from("leads").delete().eq("id", id);
      if (!error) return { success: true };
    }
  } catch (err) {
    console.warn("Delete lead error:", err);
  }
  return { success: true };
}
