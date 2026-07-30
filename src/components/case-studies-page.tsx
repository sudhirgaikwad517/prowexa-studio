import { Link } from "@tanstack/react-router";
import { SiteHeader } from "./site-header";
import { Footer } from "./footer";
import { SEOHead } from "./seo-head";
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock,
  Shield,
  Layers,
  Zap,
  CheckCircle,
  FileText,
  User,
  Activity,
  ArrowUpRight,
} from "lucide-react";

export function CaseStudiesPage() {
  const caseStudies = [
    {
      slug: "fintech-scaling",
      client: "CapitalVibe Inc.",
      title: "Scaling a Fintech Platform to 100K+ Active Daily Users",
      industry: "Fintech / Banking",
      timeline: "5 Months",
      impact: "70% Latency Reduction | 99.99% Uptime",
      tags: ["Node.js", "Redis", "PostgreSQL", "AWS ECS", "Docker"],
      problem: "CapitalVibe's legacy monolithic API was failing under peak trading hours (9:15 AM - 10:30 AM), causing transaction dropouts, database connection timeouts, and disgruntled investors.",
      solution: "We re-architected the monolith into lightweight, decoupled microservices. Implemented Redis caching layers for stock price feeds, optimised SQL queries with connection pooling, and deployed auto-scaling container configurations on AWS ECS.",
      outcome: "Successfully handled a surge of 120,000 concurrent users without a single transaction dropout. API response time dropped from 850ms to 95ms."
    },
    {
      slug: "legal-ai",
      client: "LexGuard Chambers",
      title: "AI-Powered RAG System for automated Legal Document Review",
      industry: "LegalTech",
      timeline: "3 Months",
      impact: "80% Time Saved | 95% Accuracy",
      tags: ["Python", "OpenAI GPT-4", "Pinecone", "LangChain", "Next.js"],
      problem: "Attorneys spent an average of 12 hours reviewing commercial leases and compliance contracts, leading to slow client turnaround and human errors in risk detection.",
      solution: "Created an intelligent Retrieval-Augmented Generation (RAG) tool. Deployed custom text-splitting algorithms to chunk documents, stored vector embeddings in Pinecone, and built a chat-based dashboard allowing lawyers to query contracts in plain English.",
      outcome: "Contract review times crashed from 12 hours to under 20 minutes. Discovered 4 hidden compliance risks in the pilot run that were previously missed by manual checks."
    },
    {
      slug: "logistics-routing",
      client: "Runners Express",
      title: "Real-Time Routing & Dispatch Optimization Engine",
      industry: "Logistics & Delivery",
      timeline: "4 Months",
      impact: "25% Lower Delivery Time | 18% Fuel Savings",
      tags: ["React Native", "Go", "WebSocket", "Google Maps API", "MongoDB"],
      problem: "Hyperlocal delivery dispatchers were manually assigning orders to riders, resulting in suboptimal routes, delayed food deliveries, and high rider churn.",
      solution: "Built an automated dispatch engine using a custom Travelling Salesperson Problem (TSP) algorithm. Integrated WebSockets for real-time rider tracking and instant notification dispatching based on distance and order queue.",
      outcome: "Average delivery times dropped from 38 minutes to 28 minutes. Rider utilization increased by 30%, increasing aggregate daily driver earnings."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Client Case Studies & Success Stories | Prowexa Technologies"
        description="Read how Prowexa Technologies delivered high-scale engineering: 70% latency reduction for Fintech, 80% legal AI review efficiency, and zero-downtime EHR cloud migrations."
        canonicalPath="/case-studies"
      />
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent opacity-50" />
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-brand opacity-10 blur-3xl" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs text-blue-400 backdrop-blur-sm animate-fade-up">
              <Activity className="h-3.5 w-3.5" />
              Proven Success
            </div>
            <h1 className="mt-8 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl animate-fade-up">
              Case <span className="text-gradient-brand">Studies</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed animate-fade-up">
              A deep dive into how we partner with organizations to solve business bottlenecks, deploy robust architectures, and scale operations.
            </p>
          </div>
        </section>

        {/* Case Studies List */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 space-y-16">
            {caseStudies.map((study, idx) => (
              <div
                key={study.slug}
                className="group relative overflow-hidden rounded-[2.5rem] border border-border bg-card p-8 md:p-12 shadow-card hover:border-brand/40 transition-all duration-300 animate-fade-up"
              >
                <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gradient-brand opacity-0 blur-3xl group-hover:opacity-20 transition duration-500" />
                
                <div className="relative grid gap-10 lg:grid-cols-12">
                  {/* Info Sidebar */}
                  <div className="lg:col-span-4 space-y-6">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-brand-glow">
                        {study.industry}
                      </span>
                      <h2 className="mt-2 text-2xl font-bold">{study.client}</h2>
                      <p className="text-sm text-muted-foreground mt-1">{study.title}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <Clock className="h-4 w-4 text-brand-glow" />
                        <span>Timeline: <strong>{study.timeline}</strong></span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <TrendingUp className="h-4 w-4 text-brand-glow" />
                        <span>Impact: <strong>{study.impact}</strong></span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {study.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Core Details */}
                  <div className="lg:col-span-8 space-y-6 lg:border-l lg:border-border lg:pl-10">
                    <div className="rounded-2xl bg-surface/60 p-6 border border-border/50">
                      <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-red-400">
                        <Shield className="h-4 w-4" />
                        <span>THE CHALLENGE</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {study.problem}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-surface/60 p-6 border border-border/50">
                      <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-purple-400">
                        <Layers className="h-4 w-4" />
                        <span>OUR APPROACH &amp; SOLUTION</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {study.solution}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-surface/60 p-6 border border-brand/20">
                      <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-emerald-400">
                        <Zap className="h-4 w-4" />
                        <span>BUSINESS OUTCOME</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                        {study.outcome}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-surface/30">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-brand p-12 shadow-glow">
              <div className="absolute -top-20 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-bold text-white">Let's replicate this success for you</h2>
                <p className="mt-3 text-white/80">Get a free architecture audit and consultation for your platform.</p>
                <Link
                  to="/contact"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand hover:bg-white/90 transition"
                >
                  Get Architecture Consultation <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
