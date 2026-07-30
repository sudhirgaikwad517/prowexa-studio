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

export async function fetchAllLeadsAdmin(): Promise<LeadRecord[]> {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        return data;
      }
    }
  } catch (err) {
    console.warn("Fetch leads admin error:", err);
  }
  return fallbackLeads;
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
