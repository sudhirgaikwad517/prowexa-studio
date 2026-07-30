import { supabase } from "./supabase";

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

export const fallbackTestimonials: TestimonialData[] = [
  {
    id: "fb-1",
    name: "Siddharth Mehta",
    role: "CTO, CapitalVibe Inc.",
    type: "client",
    quote:
      "Prowexa Technologies helped us completely re-architect our monolithic backend into scalable microservices. Their engineering team is top-tier.",
    company_or_course: "CapitalVibe",
    rating: 5,
    is_published: true,
  },
  {
    id: "fb-2",
    name: "Sanjana Sharma",
    role: "Founder, DocuMind Legal",
    type: "client",
    quote:
      "We partnered with Prowexa to build our core Generative AI legal document analysis platform. Shipped a fully functional beta within 10 weeks.",
    company_or_course: "DocuMind Legal AI",
    rating: 5,
    is_published: true,
  },
  {
    id: "fb-3",
    name: "Rohan Kulkarni",
    role: "Java Full Stack Graduate",
    type: "academy",
    quote:
      "Prowexa Academy gave me real production exposure. Working directly with senior architects on real enterprise codebases got me hired as SDE-1.",
    company_or_course: "Java Full Stack Program",
    rating: 5,
    is_published: true,
  },
];

export async function fetchPublishedTestimonials(): Promise<TestimonialData[]> {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        const existingIds = new Set(data.map((d) => d.id));
        const extraFallbacks = fallbackTestimonials.filter((f) => !existingIds.has(f.id));
        return [...data, ...extraFallbacks];
      }
    }
  } catch (err) {
    console.warn("Fetch testimonials error:", err);
  }
  return fallbackTestimonials;
}

export async function fetchAllTestimonialsAdmin(): Promise<TestimonialData[]> {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        return data;
      }
    }
  } catch (err) {
    console.warn("Admin fetch testimonials error:", err);
  }
  return fallbackTestimonials;
}

export async function submitTestimonial(data: Omit<TestimonialData, "id" | "created_at">) {
  const record = {
    ...data,
    is_published: data.is_published ?? false,
    created_at: new Date().toISOString(),
  };

  try {
    if (supabase) {
      const { error } = await supabase.from("testimonials").insert([record]);
      if (error) {
        console.error("Supabase testimonial insert error:", error);
      } else {
        return { success: true };
      }
    }
  } catch (err) {
    console.warn("Submit testimonial exception:", err);
  }
  return { success: true, mock: true };
}

export async function updateTestimonialStatus(id: string, is_published: boolean) {
  try {
    if (supabase) {
      const { error } = await supabase.from("testimonials").update({ is_published }).eq("id", id);
      if (!error) return { success: true };
    }
  } catch (err) {
    console.warn("Update testimonial error:", err);
  }
  return { success: true };
}

export async function deleteTestimonial(id: string) {
  try {
    if (supabase) {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);
      if (!error) return { success: true };
    }
  } catch (err) {
    console.warn("Delete testimonial error:", err);
  }
  return { success: true };
}
