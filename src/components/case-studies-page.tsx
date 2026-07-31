import { useState, useEffect } from "react";
import { SiteHeader } from "./site-header";
import { Footer } from "./footer";
import { SEOHead } from "./seo-head";
import { fetchPublishedCaseStudies, type CaseStudyData } from "@/lib/case-studies";
import {
  Layers,
  ArrowRight,
  TrendingUp,
  Building2,
  CheckCircle2,
  Cpu,
} from "lucide-react";

export function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudyData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCaseStudies();
  }, []);

  async function loadCaseStudies() {
    setLoading(true);
    const data = await fetchPublishedCaseStudies();
    setCaseStudies(data);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SEOHead
        title="Case Studies & Enterprise Architecture Success Stories | Prowexa Pune"
        description="Explore in-depth technical case studies on microservices architecture, real-time trading engines, and Generative AI legal platforms built by Prowexa."
        canonicalUrl="https://www.prowexa.com/case-studies"
      />
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent opacity-50" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs text-blue-400 backdrop-blur-sm animate-fade-up">
              <Layers className="h-3.5 w-3.5" />
              Enterprise Case Studies
            </div>
            <h1 className="mt-8 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl animate-fade-up">
              Real Impact. <span className="text-gradient-brand">Real Results.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed animate-fade-up">
              Detailed technical breakdowns of how Prowexa engineers solved complex software bottlenecks, scaled databases, and built AI systems.
            </p>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-24 bg-surface/30">
          <div className="mx-auto max-w-7xl px-6">
            <div className="space-y-16">
              {caseStudies.map((cs) => (
                <div
                  key={cs.id || cs.title}
                  className="group relative overflow-hidden rounded-[2.5rem] border border-border bg-card p-8 md:p-12 shadow-glow animate-fade-up"
                >
                  <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                    <div className="lg:col-span-7">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                        <span className="rounded-full bg-brand/10 px-3 py-1 font-semibold text-brand border border-brand/20">
                          {cs.client}
                        </span>
                        <span>•</span>
                        <span>{cs.industry}</span>
                      </div>

                      <h2 className="mt-4 text-3xl font-bold tracking-tight group-hover:text-brand transition-colors">
                        {cs.title}
                      </h2>

                      <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                        {cs.summary}
                      </p>

                      <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl border border-border bg-surface p-4">
                          <span className="text-xs font-semibold uppercase tracking-wider text-rose-400">The Challenge</span>
                          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{cs.challenge}</p>
                        </div>
                        <div className="rounded-2xl border border-border bg-surface p-4">
                          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">The Solution</span>
                          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{cs.solution}</p>
                        </div>
                      </div>

                      {/* Tech Stack */}
                      <div className="mt-6 flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-2">Tech Stack:</span>
                        {cs.tech_stack?.map((tech) => (
                          <span key={tech} className="rounded-lg border border-border bg-surface px-3 py-1 text-xs font-semibold text-foreground">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-5">
                      {/* Key Metric Highlights */}
                      <div className="rounded-3xl border border-border bg-gradient-hero p-6 md:p-8 shadow-card">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-emerald-400" /> Key Measured Outcomes
                        </h3>
                        <div className="mt-6 space-y-4">
                          {cs.results?.map((res, rIdx) => (
                            <div key={rIdx} className="flex items-start gap-3">
                              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="text-sm font-medium">{res}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
