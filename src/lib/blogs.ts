import { apiFetch, jsonBody } from "./http";

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
    title: "Building Microservices with React 19, Vite & PostgreSQL",
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
  const result = await apiFetch<BlogData[]>("/api/content?type=blogs");
  return result.data && result.data.length > 0 ? result.data : fallbackBlogs;
}

export async function fetchAllBlogsAdmin(): Promise<BlogData[]> {
  const result = await apiFetch<BlogData[]>("/api/admin?resource=blogs");
  return result.data || [];
}

// Submitted articles stay hidden until an admin approves them.
export async function submitBlog(data: Omit<BlogData, "id" | "created_at" | "is_published" | "published_at">) {
  return apiFetch("/api/content?type=blogs", { method: "POST", body: jsonBody(data) });
}

export async function updateBlogStatus(id: string, is_published: boolean) {
  return apiFetch(`/api/admin?resource=blogs&id=${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: jsonBody({ is_published }),
  });
}

export async function deleteBlog(id: string) {
  return apiFetch(`/api/admin?resource=blogs&id=${encodeURIComponent(id)}`, { method: "DELETE" });
}
