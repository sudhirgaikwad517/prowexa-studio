import { useState, useEffect } from "react";
import { SiteHeader } from "./site-header";
import { Footer } from "./footer";
import { SEOHead } from "./seo-head";
import { SubmitTestimonialModal } from "./submit-testimonial-modal";
import { fetchPublishedTestimonials, type TestimonialData } from "@/lib/testimonials";
import {
  Star,
  Quote,
  Building2,
  GraduationCap,
  Sparkles,
  Plus,
  CheckCircle2,
} from "lucide-react";

export function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [filter, setFilter] = useState<"all" | "client" | "academy">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTestimonials();
  }, []);

  async function loadTestimonials() {
    setLoading(true);
    const data = await fetchPublishedTestimonials();
    setTestimonials(data);
    setLoading(false);
  }

  const filtered = testimonials.filter((t) => {
    if (filter === "all") return true;
    return t.type === filter;
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SEOHead
        title="Client & Student Testimonials | Prowexa Technologies Pune"
        description="Read real client reviews and student testimonials about software development projects and tech courses at Prowexa Technologies Pune."
        canonicalUrl="https://www.prowexa.com/testimonials"
      />
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent opacity-50" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-xs text-amber-400 backdrop-blur-sm animate-fade-up">
              <Star className="h-3.5 w-3.5 fill-current" />
              Verified Testimonials & Reviews
            </div>
            <h1 className="mt-8 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl animate-fade-up">
              Trusted by <span className="text-gradient-amber">Clients & Students</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed animate-fade-up">
              Hear directly from technical leaders, founders, and academy graduates who have built products and accelerated careers with Prowexa.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition animate-fade-up"
              >
                <Plus className="h-4 w-4" />
                Submit Your Testimonial
              </button>
            </div>
          </div>
        </section>

        {/* Filter Controls */}
        <section className="py-8 bg-surface/30 border-y border-border">
          <div className="mx-auto max-w-7xl px-6 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`rounded-full px-5 py-2 text-xs font-semibold transition ${
                  filter === "all"
                    ? "bg-gradient-brand text-primary-foreground shadow-glow"
                    : "border border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                All Reviews ({testimonials.length})
              </button>
              <button
                onClick={() => setFilter("client")}
                className={`rounded-full px-5 py-2 text-xs font-semibold transition ${
                  filter === "client"
                    ? "bg-gradient-brand text-primary-foreground shadow-glow"
                    : "border border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                Client Projects
              </button>
              <button
                onClick={() => setFilter("academy")}
                className={`rounded-full px-5 py-2 text-xs font-semibold transition ${
                  filter === "academy"
                    ? "bg-gradient-brand text-primary-foreground shadow-glow"
                    : "border border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                Academy Students
              </button>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="text-xs text-brand hover:underline font-semibold flex items-center gap-1"
            >
              <Plus className="h-3.5 w-3.5" />
              Write a Review
            </button>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((t) => (
                <div
                  key={t.id || t.name}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-border bg-card p-8 shadow-card hover:border-amber-500/40 transition-all duration-300 animate-fade-up"
                >
                  <div className="relative">
                    <Quote className="h-10 w-10 text-amber-500/20 mb-4" />
                    <div className="flex items-center gap-1 text-amber-400 mb-4">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed text-foreground/90 italic">
                      "{t.quote}"
                    </p>
                  </div>

                  <div className="mt-8 border-t border-border pt-6 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-base">{t.name}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{t.role}</p>
                      {t.company_or_course && (
                        <span className="mt-1 inline-block text-[11px] font-semibold text-brand">
                          {t.company_or_course}
                        </span>
                      )}
                    </div>

                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-muted-foreground">
                      {t.type === "client" ? (
                        <Building2 className="h-4 w-4 text-brand" />
                      ) : (
                        <GraduationCap className="h-4 w-4 text-purple-400" />
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SubmitTestimonialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={loadTestimonials}
      />

      <Footer />
    </div>
  );
}
