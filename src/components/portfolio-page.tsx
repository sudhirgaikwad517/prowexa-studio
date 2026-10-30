import { Link } from "@tanstack/react-router";
import { SiteHeader } from "./site-header";
import { Footer } from "./footer";
import { SEOHead } from "./seo-head";
import {
  ArrowRight,
  Server,
  Globe,
  ExternalLink,
  MessageCircle,
  Receipt,
  Milk,
  Hospital,
} from "lucide-react";

type Project = {
  title: string;
  icon: typeof Receipt;
  overview: string;
  problem: string;
  solution: string;
  outcome: string;
  link?: { label: string; href: string };
};

const projects: { category: string; icon: typeof Globe; items: Project[] }[] = [
  {
    category: "SaaS Products",
    icon: Globe,
    items: [
      {
        title: "Wabtic — WhatsApp CRM",
        icon: MessageCircle,
        overview: "A WhatsApp Business automation and Cloud API platform for managing customer conversations from one dashboard.",
        problem: "Businesses were handling WhatsApp enquiries from personal phones, with no shared view of customers or follow-ups.",
        solution: "Built a WhatsApp CRM on the official WhatsApp Cloud API that brings conversations, contacts and automation into one place.",
        outcome: "Teams manage WhatsApp customer communication centrally instead of across individual phones.",
        link: { label: "Visit wabtic.com", href: "https://wabtic.com" },
      },
      {
        title: "Billing CRM",
        icon: Receipt,
        overview: "A billing and customer management system for businesses that invoice customers every day.",
        problem: "Invoices, customer records and payment follow-ups were spread across spreadsheets and paper registers.",
        solution: "Built a CRM that combines customer records, invoicing and payment tracking in a single application.",
        outcome: "Billing, customer history and pending payments are available in one place.",
      },
    ],
  },
  {
    category: "Industry ERP & CRM",
    icon: Server,
    items: [
      {
        title: "Dairy ERP",
        icon: Milk,
        overview: "An ERP for dairy businesses covering day-to-day operations from collection to accounts.",
        problem: "Dairy operations relied on manual registers, making records, payments and reporting slow and error-prone.",
        solution: "Built an ERP that digitises the dairy's daily operations, records and billing in one system.",
        outcome: "Daily operations and accounts run from a single, consistent system of record.",
      },
      {
        title: "Hospital CRM",
        icon: Hospital,
        overview: "A CRM for hospitals and clinics to manage patients and their journey through the facility.",
        problem: "Patient details, appointments and follow-ups were tracked manually across departments.",
        solution: "Built a CRM that keeps patient records, appointments and follow-ups organised for the hospital team.",
        outcome: "Staff work from one shared view of each patient and their upcoming visits.",
      },
    ],
  },
];

export function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Our Portfolio & Case Projects | Prowexa Technologies Pune"
        description="Explore Prowexa Technologies' portfolio: Wabtic WhatsApp CRM, Billing CRM, Dairy ERP and Hospital CRM built for real businesses."
        canonicalPath="/portfolio"
      />
      <SiteHeader />

      {/* Hero */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-brand opacity-10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-glow">Our Work</span>
          <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-6xl">Portfolio</h1>
          <p className="mt-5 mx-auto max-w-2xl text-lg text-muted-foreground">
            Products we have built for real businesses: SaaS platforms, CRMs and industry-specific ERP systems.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 space-y-20">
          {projects.map((cat) => (
            <div key={cat.category}>
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-10">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-glow">
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
                    <div className="flex items-center gap-4">
                      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-brand-soft text-brand">
                        <p.icon className="h-5 w-5" />
                      </span>
                      <h3 className="text-xl font-bold">{p.title}</h3>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{p.overview}</p>

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

                    {p.link && (
                      <a
                        href={p.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
                      >
                        {p.link.label} <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16">
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
