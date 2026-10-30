import { apiFetch, jsonBody } from "./http";

export interface CaseStudyData {
  id?: string;
  title: string;
  slug: string;
  client: string;
  industry: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  tech_stack: string[];
  metrics?: Record<string, string>;
  cover_image?: string;
  is_published?: boolean;
  created_at?: string;
}

export async function fetchPublishedCaseStudies(): Promise<CaseStudyData[]> {
  const result = await apiFetch<CaseStudyData[]>("/api/content?type=case-studies");
  return result.data || [];
}

export async function fetchAllCaseStudiesAdmin(): Promise<CaseStudyData[]> {
  const result = await apiFetch<CaseStudyData[]>("/api/admin?resource=case-studies");
  return result.data || [];
}

export async function saveCaseStudy(caseStudy: CaseStudyData) {
  return apiFetch<CaseStudyData>("/api/admin?resource=case-studies", { method: "POST", body: jsonBody(caseStudy) });
}

export async function deleteCaseStudy(id: string) {
  return apiFetch(`/api/admin?resource=case-studies&id=${encodeURIComponent(id)}`, { method: "DELETE" });
}
