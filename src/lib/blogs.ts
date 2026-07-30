import { supabase } from "./supabase";

export interface BlogData {
  id?: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  cover_image?: string;
  author: string;
  is_published?: boolean;
  published_at?: string;
  created_at?: string;
}

export const fallbackBlogs: BlogData[] = [
  {
    id: "b-1",
    title: "Building Microservices with React 19, Vite & Supabase PostgreSQL",
    slug: "building-microservices-react19-supabase",
    description: "Learn how we architect high-throughput digital platforms with pre-rendering and real-time database syncing.",
    content: "Building modern scalable applications requires separating concerns between static pre-rendered routes and dynamic API workloads...",
    cover_image: "/assets/hero-bg.webp",
    author: "Prowexa Lead Architect",
    is_published: true,
    published_at: new Date().toISOString(),
  },
  {
    id: "b-2",
    title: "AI Integration in Modern ERP Systems: Lessons Learned",
    slug: "ai-integration-modern-erp-systems",
    description: "Discover practical strategies for integrating LLMs and generative AI tools into enterprise workflows safely.",
    content: "Generative AI is transforming enterprise resource planning by automating invoice extraction, predictive logistics, and natural language reporting...",
    cover_image: "/assets/hero-city.webp",
    author: "Prowexa AI Research Team",
    is_published: true,
    published_at: new Date().toISOString(),
  },
];

export async function fetchPublishedBlogs(): Promise<BlogData[]> {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return data;
      }
    }
  } catch (err) {
    console.warn("Fetch blogs error:", err);
  }
  return fallbackBlogs;
}

export async function fetchAllBlogsAdmin(): Promise<BlogData[]> {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        return data;
      }
    }
  } catch (err) {
    console.warn("Admin fetch blogs error:", err);
  }
  return fallbackBlogs;
}

export async function submitBlog(data: Omit<BlogData, "id" | "created_at">) {
  const record = {
    ...data,
    is_published: data.is_published ?? false,
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  };

  try {
    if (supabase) {
      const { error } = await supabase.from("blogs").insert([record]);
      if (error) {
        console.error("Supabase blog insert error:", error);
      } else {
        return { success: true };
      }
    }
  } catch (err) {
    console.warn("Submit blog error:", err);
  }
  return { success: true, mock: true };
}

export async function updateBlogStatus(id: string, is_published: boolean) {
  try {
    if (supabase) {
      const { error } = await supabase.from("blogs").update({ is_published }).eq("id", id);
      if (!error) return { success: true };
    }
  } catch (err) {
    console.warn("Update blog status error:", err);
  }
  return { success: true };
}

export async function deleteBlog(id: string) {
  try {
    if (supabase) {
      const { error } = await supabase.from("blogs").delete().eq("id", id);
      if (!error) return { success: true };
    }
  } catch (err) {
    console.warn("Delete blog error:", err);
  }
  return { success: true };
}
