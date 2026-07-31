import { useState, useEffect } from "react";
import { SiteHeader } from "./site-header";
import { Footer } from "./footer";
import { SEOHead } from "./seo-head";
import { SubmitBlogModal } from "./submit-blog-modal";
import { fetchPublishedBlogs, type BlogData } from "@/lib/blogs";
import {
  FileText,
  Plus,
  Calendar,
  User,
  Clock,
  ArrowRight,
  BookOpen,
} from "lucide-react";

export function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogs();
  }, []);

  async function loadBlogs() {
    setLoading(true);
    const data = await fetchPublishedBlogs();
    setBlogs(data);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SEOHead
        title="Engineering Blogs & Technical Articles | Prowexa Technologies"
        description="Read technical insights, system architecture guides, React 19 microservices, and AI engineering articles written by Prowexa engineers."
        canonicalUrl="https://www.prowexa.com/blogs"
      />
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent opacity-50" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-xs text-purple-400 backdrop-blur-sm animate-fade-up">
              <FileText className="h-3.5 w-3.5" />
              Technical Blog & Community Articles
            </div>
            <h1 className="mt-8 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl animate-fade-up">
              Engineering <span className="text-gradient-purple">Blogs & Insights</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed animate-fade-up">
              In-depth software engineering guides, frontend architecture best practices, and Generative AI implementation insights.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={() => setIsBlogModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition animate-fade-up"
              >
                <Plus className="h-4 w-4" />
                Write & Submit a Blog Post
              </button>
            </div>
          </div>
        </section>

        {/* Blogs Grid */}
        <section className="py-24 bg-surface/30">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((b) => (
                <article
                  key={b.id || b.slug}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-border bg-card p-8 shadow-card hover:border-purple-500/40 transition-all duration-300 animate-fade-up"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1.5 text-purple-400 font-semibold">
                        <User className="h-3.5 w-3.5" />
                        {b.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(b.published_at || b.created_at || Date.now()).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold tracking-tight group-hover:text-purple-400 transition-colors">
                      {b.title}
                    </h2>

                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {b.description}
                    </p>
                  </div>

                  <div className="mt-8 border-t border-border pt-6 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand group-hover:underline">
                      Read Article <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface text-muted-foreground group-hover:text-foreground">
                      <BookOpen className="h-4 w-4" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SubmitBlogModal
        isOpen={isBlogModalOpen}
        onClose={() => setIsBlogModalOpen(false)}
        onSuccess={loadBlogs}
      />

      <Footer />
    </div>
  );
}
