import type { LeadSubmissionData } from "./api";
import { apiFetch, jsonBody } from "./http";

export interface LeadRecord extends LeadSubmissionData {
  id: string;
  status: "new" | "contacted" | "archived";
  created_at: string;
}

export async function fetchAllLeadsAdmin(): Promise<LeadRecord[]> {
  const result = await apiFetch<LeadRecord[]>("/api/admin?resource=leads");
  return result.data || [];
}

export async function updateLeadStatus(id: string, status: "new" | "contacted" | "archived") {
  return apiFetch(`/api/admin?resource=leads&id=${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: jsonBody({ status }),
  });
}

export async function deleteLead(id: string) {
  return apiFetch(`/api/admin?resource=leads&id=${encodeURIComponent(id)}`, { method: "DELETE" });
}
