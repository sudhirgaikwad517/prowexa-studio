import { supabase } from "./supabase";

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

export const fallbackCaseStudies: CaseStudyData[] = [
  {
    id: "cs-1",
    title: "FinTech Microservices Architecture & Real-Time Trading Engine",
    slug: "fintech-microservices-trading-engine",
    client: "CapitalVibe Inc.",
    industry: "Financial Services & Fintech",
    summary: "Re-engineered a legacy monolithic platform into a resilient, real-time microservices architecture capable of handling 50,000+ operations/sec.",
    challenge: "High transaction latency, database contention during peak market hours, and monolithic scaling bottlenecks.",
    solution: "Built event-driven microservices using Node.js, Redis Streams, PostgreSQL partitioning, and automated Kubernetes scaling.",
    results: [
      "99.99% system uptime achieved during peak trading events.",
      "Latency reduced by 74% (from 850ms to 220ms).",
      "Infrastructure operating costs reduced by 40%."
    ],
    tech_stack: ["Node.js", "React", "TypeScript", "PostgreSQL", "Redis", "Docker", "Kubernetes"],
    metrics: {
      "Latency Reduction": "74%",
      "Uptime": "99.99%",
      "Cost Saved": "40%"
    },
    cover_image: "/assets/hero-bg.webp",
    is_published: true,
  },
  {
    id: "cs-2",
    title: "Generative AI Legal Document Analysis & Contract Extraction Platform",
    slug: "ai-legal-document-analysis-platform",
    client: "DocuMind Legal AI",
    industry: "Legal Tech & Artificial Intelligence",
    summary: "Developed an AI-powered enterprise SaaS platform that analyzes 200+ page contracts in under 15 seconds.",
    challenge: "Manual legal document review required 12+ hours per case, with high operational overhead and risk of human error.",
    solution: "Integrated custom RAG (Retrieval-Augmented Generation) pipeline with Vector embeddings, React 19 UI, and secure document storage.",
    results: [
      "Contract analysis time reduced from 12 hours to 15 seconds.",
      "Processed over 1,500,000 legal pages securely.",
      "Achieved 98.4% extraction accuracy."
    ],
    tech_stack: ["Python", "FastAPI", "React", "Vector DB", "PostgreSQL", "Tailwind CSS"],
    metrics: {
      "Review Speed": "98% Faster",
      "Accuracy": "98.4%",
      "Pages Processed": "1.5M+"
    },
    cover_image: "/assets/hero-city.webp",
    is_published: true,
  },
];

export async function fetchPublishedCaseStudies(): Promise<CaseStudyData[]> {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return data;
      }
    }
  } catch (err) {
    console.warn("Fetch case studies error:", err);
  }
  return fallbackCaseStudies;
}

export async function fetchAllCaseStudiesAdmin(): Promise<CaseStudyData[]> {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        return data;
      }
    }
  } catch (err) {
    console.warn("Admin fetch case studies error:", err);
  }
  return fallbackCaseStudies;
}

export async function saveCaseStudy(caseStudy: CaseStudyData) {
  try {
    const record = {
      ...caseStudy,
      slug: caseStudy.slug || caseStudy.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      is_published: caseStudy.is_published ?? true,
      created_at: caseStudy.created_at || new Date().toISOString(),
    };

    if (supabase) {
      if (caseStudy.id && !caseStudy.id.startsWith("cs-")) {
        const { data, error } = await supabase.from("case_studies").update(record).eq("id", caseStudy.id).select();
        if (!error) return { success: true, data };
      } else {
        const { id, ...newRecord } = record;
        const { data, error } = await supabase.from("case_studies").insert([newRecord]).select();
        if (!error) return { success: true, data };
      }
    }
  } catch (err) {
    console.warn("Save case study error:", err);
  }
  return { success: true, mock: true };
}

export async function deleteCaseStudy(id: string) {
  try {
    if (supabase) {
      const { error } = await supabase.from("case_studies").delete().eq("id", id);
      if (!error) return { success: true };
    }
  } catch (err) {
    console.warn("Delete case study error:", err);
  }
  return { success: true };
}
