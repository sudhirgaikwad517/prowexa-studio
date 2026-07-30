import { Link } from "@tanstack/react-router";
import { SiteHeader } from "./site-header";
import { Footer } from "./footer";
import { SEOHead } from "./seo-head";
import {
  ArrowRight,
  MonitorSmartphone,
  Smartphone,
  Server,
  Cpu,
  Globe,
  ExternalLink,
} from "lucide-react";

const projects = [
  {
    category: "Web Applications",
    icon: MonitorSmartphone,
    color: "from-blue-500 to-cyan-400",
    items: [
      {
        title: "EduTrack LMS",
        overview: "A full-featured Learning Management System for colleges and coaching institutes.",
        tech: ["React", "Node.js", "PostgreSQL", "AWS"],
        problem: "Institutes needed a centralized digital platform to manage courses, students, and assessments.",
        solution: "Built a scalable LMS with live classes, assignment tracking, attendance, and analytics dashboards.",
        outcome: "Onboarded 5,000+ students across 3 institutes in the first quarter.",
      },
      {
        title: "RetailEdge POS",
        overview: "A cloud-based Point-of-Sale system for retail chains with real-time inventory management.",
        tech: ["Next.js", "Supabase", "Tailwind CSS", "Stripe"],
        problem: "Retail chain struggled with disconnected billing, stock, and analytics across 12 outlets.",
        solution: "Unified POS with live stock sync, billing, GST reports, and multi-branch dashboard.",
        outcome: "Reduced billing errors by 80% and inventory discrepancies by 65%.",
      },
    ],
  },
  {
    category: "Mobile Apps",
    icon: Smartphone,
    color: "from-violet-500 to-purple-400",
    items: [
      {
        title: "FitPulse",
        overview: "A fitness tracking app with AI-based workout recommendations for gym members.",
        tech: ["Flutter", "Firebase", "TensorFlow Lite", "REST API"],
        problem: "Gym owners had no way to track member progress or offer personalised plans at scale.",
        solution: "Built a cross-platform app with workout logging, AI plan generation, and trainer dashboards.",
        outcome: "Active on 2,000+ devices; 4.6-star average rating on app stores.",
      },
      {
        title: "QuickDeliver",
        overview: "A hyperlocal delivery app for small businesses with live GPS tracking.",
        tech: ["React Native", "Node.js", "MongoDB", "Google Maps API"],
        problem: "Small businesses in Pune lacked an affordable same-day delivery platform.",
        solution: "Designed a rider-merchant-customer tri-sided platform with real-time tracking.",
        outcome: "Processed 1,200+ orders per week in the pilot city within 2 months.",
      },
    ],
  },
  {
    category: "Enterprise Solutions",
    icon: Server,
    color: "from-emerald-500 to-teal-400",
    items: [
      {
        title: "HRMatrix",
        overview: "End-to-end HRMS for mid-size companies covering payroll, leaves, and appraisals.",
        tech: ["Angular", "Spring Boot", "MySQL", "Docker"],
        problem: "Manual HR processes caused payroll errors and delayed appraisal cycles.",
        solution: "Built a modular HRMS with automated payroll, leave calendar, and performance review workflows.",
        outcome: "Saved 40+ HR hours/month; zero payroll errors since deployment.",
      },
    ],
  },
  {
    category: "AI Projects",
    icon: Cpu,
    color: "from-orange-500 to-amber-400",
    items: [
      {
        title: "DocuMind",
        overview: "AI-powered document extraction and summarisation tool for legal and finance firms.",
        tech: ["Python", "LangChain", "OpenAI GPT-4", "FastAPI", "React"],
        problem: "Legal teams spent hours manually reviewing lengthy contracts and financial reports.",
        solution: "Built an LLM-based tool that extracts key clauses, flags risks, and generates summaries in seconds.",
        outcome: "Reduced document review time by 75% for 3 enterprise clients.",
      },
      {
        title: "SupportBot",
        overview: "Intelligent customer support chatbot trained on company-specific knowledge bases.",
        tech: ["Python", "Pinecone", "OpenAI", "Node.js", "React"],
        problem: "Support teams were overwhelmed with repetitive tickets that drained productivity.",
        solution: "Deployed a RAG-based chatbot that resolves 70% of tier-1 queries automatically.",
        outcome: "Ticket volume down 55%; CSAT score improved from 3.2 to 4.5.",
      },
    ],
  },
  {
    category: "Internal Products",
    icon: Globe,
    color: "from-rose-500 to-pink-400",
    items: [
      {
        title: "Prowexa Studio",
        overview: "Internal project management and client portal built for Prowexa's own operations.",
        tech: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS"],
        problem: "Managing multiple client projects, deadlines, and deliverables in spreadsheets was error-prone.",
        solution: "Custom-built studio with project boards, client dashboards, invoice generation, and time tracking.",
        outcome: "100% internal adoption; reduced project delays by 50%.",
      },
    ],
  },
];

export function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Our Portfolio & Case Projects | Prowexa Technologies Pune"
        description="Explore Prowexa Technologies' portfolio of web applications, React & Flutter mobile apps, AI solutions, and custom enterprise software built for client success."
        canonicalPath="/portfolio"
      />
      <SiteHeader />

      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-brand opacity-10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-glow">Our Work</span>
          <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-6xl">Portfolio</h1>
          <p className="mt-5 mx-auto max-w-2xl text-lg text-muted-foreground">
            Real products built for real businesses. Here's a showcase of what we've shipped across web, mobile,
            enterprise and AI.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 space-y-20">
          {projects.map((cat) => (
            <div key={cat.category}>
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-10">
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${cat.color} text-white shadow-glow`}>
                  <cat.icon className="h-5 w-5" />
                </span>
                <h2 className="text-2xl font-bold">{cat.category}</h2>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Project Cards */}
              <div className="grid gap-6 md:grid-cols-2">
                {cat.items.map((p) => (
                  <div
                    key={p.title}
                    className="group rounded-3xl border border-border bg-card p-8 shadow-card hover-lift hover:-translate-y-1 transition"
                  >
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-bold">{p.title}</h3>
                      <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition" />
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.overview}</p>

                    {/* Tech Stack */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Details */}
                    <div className="mt-6 grid gap-3">
                      {[
                        { label: "Problem", value: p.problem },
                        { label: "Solution", value: p.solution },
                        { label: "Outcome", value: p.outcome },
                      ].map((row) => (
                        <div key={row.label} className="rounded-2xl bg-surface/60 px-4 py-3">
                          <span className="text-xs font-semibold uppercase tracking-wider text-brand-glow">{row.label}</span>
                          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{row.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-brand p-12 shadow-glow">
            <div className="absolute -top-20 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Have a project in mind?</h2>
              <p className="mt-3 text-white/80">Let's build your next digital product together.</p>
              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand hover:bg-white/90 transition"
              >
                Start a Project <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
