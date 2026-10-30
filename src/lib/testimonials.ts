import { apiFetch, jsonBody } from "./http";

export interface TestimonialData {
  id?: string;
  name: string;
  role: string;
  type: "client" | "academy";
  quote: string;
  company_or_course?: string;
  rating?: number;
  avatar_url?: string;
  is_published?: boolean;
  created_at?: string;
}

export async function fetchPublishedTestimonials(): Promise<TestimonialData[]> {
  const result = await apiFetch<TestimonialData[]>("/api/content?type=testimonials");
  return result.data || [];
}

export async function fetchAllTestimonialsAdmin(): Promise<TestimonialData[]> {
  const result = await apiFetch<TestimonialData[]>("/api/admin?resource=testimonials");
  return result.data || [];
}

// New reviews stay hidden until an admin approves them.
export async function submitTestimonial(data: Omit<TestimonialData, "id" | "created_at" | "is_published">) {
  return apiFetch("/api/content?type=testimonials", { method: "POST", body: jsonBody(data) });
}

export async function updateTestimonialStatus(id: string, is_published: boolean) {
  return apiFetch(`/api/admin?resource=testimonials&id=${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: jsonBody({ is_published }),
  });
}

export async function deleteTestimonial(id: string) {
  return apiFetch(`/api/admin?resource=testimonials&id=${encodeURIComponent(id)}`, { method: "DELETE" });
}
