import officeTeam from "@/assets/office-team.webp";
import officeWorkspace from "@/assets/office-workspace.webp";
import officeReception from "@/assets/office-reception.webp";
import officeNight from "@/assets/office-night.webp";
import officeCoding from "@/assets/office-coding.webp";
import heroBg from "@/assets/hero-bg.webp";
import { SEOHead, defaultOrganizationSchema, defaultLocalBusinessSchema } from "./seo-head";
import { trackWhatsAppClick, trackContactFormSubmit, trackPhoneClick, trackEmailClick } from "@/lib/gtag";
import {
  ArrowRight,
  Lightbulb,
  Rocket,
  TrendingUp,
  Code2,
  Smartphone,
  Cloud,
  Cpu,
  Server,
  Zap,
  Target,
  HandshakeIcon,
  Layers,
  Sparkles,
  GraduationCap,
  Mail,
  Phone,
  Globe,
  MapPin,
  Building2,
  Calendar,
  FileText,
  CheckCircle2,
  Megaphone,
  Users,
  BriefcaseBusiness,
  ShoppingCart,
  Truck,
  HeartPulse,
  BookOpen,
  Banknote,
  CalendarCheck,
  MessageCircle,
  Globe2,
  MonitorSmartphone,
  LifeBuoy,
} from "lucide-react";

import { scrollToSection } from "@/utils/scroll";
import { Footer } from "./footer";

export function HomePage() {
  return (
    <main id="top">
      <SEOHead
        title="Prowexa Technologies | Software Development Company Pune | Build Fast. Scale Smart."
        description="Prowexa Technologies Pvt. Ltd. is a top software development company in Pune, India. We build scalable products, React & Flutter mobile apps, AI solutions, and custom ERP/CRM software."
        structuredData={[defaultOrganizationSchema, defaultLocalBusinessSchema]}
      />
      <Hero />
      <FeatureStrip />
      <About />
      <InsideProwexa />
      <MissionVision />
      <Services />
      <WhyUs />
      <Industries />
      <EdTech />
      <ContactCTA />
      <CompanyDetails />
      <Contact />
      <WhatsAppButton />
      <Footer />
    </main>
  );
}

/* ─────────────────────── WhatsApp Floating Button ─────────────────────── */
function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/917030347209?text=Hi%20Prowexa%2C%20I%20would%20like%20to%20discuss%20a%20project"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      onClick={trackWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-transform hover:scale-110"
      style={{ background: "#25D366" }}
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7 fill-white" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.163 0 0 7.163 0 16c0 2.824.737 5.478 2.027 7.789L0 32l8.454-2.217A15.94 15.94 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm8.066 22.064c-.334.94-1.957 1.797-2.69 1.857-.733.061-1.43.366-4.822-1.004-4.074-1.651-6.677-5.804-6.878-6.07-.2-.267-1.63-2.168-1.63-4.135s1.03-2.934 1.396-3.334c.366-.4.8-.5 1.067-.5l.767.014c.247.01.578-.094.906.693.334.8 1.134 2.767 1.234 2.968.1.2.167.434.033.7-.133.267-.2.434-.4.667-.2.234-.42.523-.6.7-.2.2-.407.416-.175.816.234.4 1.04 1.716 2.234 2.78 1.534 1.366 2.826 1.79 3.226 1.99.4.2.633.167.867-.1.233-.267 1-.1 1.166.3.167.4.167 2.1-.5 2.898z"/>
      </svg>
    </a>
  );
}

/* ─────────────────────── Hero ─────────────────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-72px)] flex items-center">
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Prowexa Technologies Hero Background"
          className="h-full w-full object-cover"
          width={1920}
          height={1080}
          loading="eager"
          decoding="async"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-12 md:py-16">
        <div className="max-w-3xl animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-black/40 px-4 py-1.5 text-xs text-white/80 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-brand-glow" />
            Next-gen product engineering
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-white">
            Transforming Ideas into<br />
            <span className="text-brand">Scalable Digital Solutions</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base md:text-lg text-white/90 leading-relaxed">
            Custom Software Development, AI Solutions, Web Applications, Mobile Apps &amp; Technology Consulting.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3 text-sm">
            {[
              { icon: Lightbulb, label: "Idea → MVP" },
              { icon: Rocket, label: "MVP → Scale" },
              { icon: TrendingUp, label: "Business → Success" },
            ].map((step, i) => (
              <div key={step.label} className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-full border border-border bg-black/40 px-4 py-2 backdrop-blur">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-brand text-primary-foreground">
                    <step.icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="font-medium text-white">{step.label}</span>
                </div>
                {i < 2 && <ArrowRight className="h-4 w-4 text-white/60" />}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#contact"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("contact");
              }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition"
            >
              Get a Free Consultation <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("contact");
              }}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20 transition"
            >
              Request a Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── Feature Strip ─────────────────────── */
function FeatureStrip() {
  return (
    <section className="bg-gradient-brand text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6 py-6">
        <div className="flex items-center gap-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-foreground/15 backdrop-blur">
            <Megaphone className="h-5 w-5" />
          </span>
          <p className="text-sm md:text-base font-medium">
            Prowexa Technologies Pvt. Ltd. | Turning Ideas into Scalable Digital Solutions
          </p>
        </div>
        <a
          href="#contact"
          onClick={(event) => {
            event.preventDefault();
            scrollToSection("contact");
          }}
          className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 hover:bg-primary-foreground/25 px-6 py-2.5 text-sm font-semibold backdrop-blur transition"
        >
          Let's Connect <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

/* ─────────────────────── Section Heading ─────────────────────── */
function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-glow">{eyebrow}</span>
      <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

/* ─────────────────────── About ─────────────────────── */
function About() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="About" title="About Prowexa" />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Building2,
              title: "Incorporated 2025",
              body: "A technology-driven company incorporated on 24 December 2025 under the Companies Act, 2013.",
            },
            {
              icon: Layers,
              title: "Product Engineering",
              body: "We specialize in building high-performance software solutions, SaaS platforms, and digital products.",
            },
            {
              icon: Target,
              title: "Real Problem Solvers",
              body: "We don't just develop software; we build products that solve real problems at scale.",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="group relative rounded-3xl border border-border bg-card p-8 shadow-card hover-lift hover:-translate-y-1 animate-fade-up"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-glow">
                <c.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── Inside Prowexa ─────────────────────── */
function InsideProwexa() {
  const images = [
    { src: officeReception, label: "Reception", span: "md:col-span-2 md:row-span-2" },
    { src: officeTeam, label: "Team Collaboration", span: "" },
    { src: officeWorkspace, label: "Workspace", span: "" },
    { src: officeCoding, label: "Engineering", span: "md:col-span-2" },
    { src: officeNight, label: "Always-on Culture", span: "" },
  ];
  return (
    <section className="py-24 bg-surface/40">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Our space"
          title="Inside Prowexa"
          subtitle="A glimpse of where our ideas, code and culture come to life."
        />
        <div className="mt-14 grid grid-cols-1 md:grid-cols-4 md:auto-rows-[220px] gap-4">
          {images.map((img) => (
            <div
              key={img.label}
              className={`group relative overflow-hidden rounded-3xl border border-border shadow-card hover-lift hover:-translate-y-1 animate-fade-up ${img.span}`}
            >
              <img
                src={img.src}
                alt={`Prowexa office: ${img.label}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 rounded-full bg-background/70 backdrop-blur px-3 py-1 text-xs font-medium">
                {img.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── Mission & Vision ─────────────────────── */
function MissionVision() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 grid gap-6 md:grid-cols-2">
        {[
          {
            icon: Target,
            tag: "Mission",
            title: "Empower founders to ship",
            body: "To empower businesses and founders by transforming ideas into scalable digital products.",
          },
          {
            icon: Sparkles,
            tag: "Vision",
            title: "A trusted global product partner",
            body: "To become a trusted global product engineering partner known for innovation, quality, and results.",
          },
        ].map((c) => (
          <div
            key={c.tag}
            className="relative overflow-hidden rounded-3xl border border-border bg-gradient-hero p-10 shadow-card hover-lift hover:-translate-y-1 animate-fade-up"
          >
            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground shadow-glow">
                  <c.icon className="h-5 w-5" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-glow">{c.tag}</span>
              </div>
              <h3 className="mt-5 text-3xl font-bold tracking-tight">{c.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{c.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────── Services ─────────────────────── */
function Services() {
  const services = [
    {
      icon: Code2,
      title: "Custom Software Development",
      body: "Tailor-made enterprise-grade software built for your unique business requirements and built to scale.",
    },
    {
      icon: MonitorSmartphone,
      title: "Web Development",
      body: "High-performance, responsive web applications crafted with modern frameworks and best practices.",
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      body: "Native and cross-platform mobile apps for iOS and Android with delightful user experiences.",
    },
    {
      icon: Cpu,
      title: "AI Solutions",
      body: "AI-powered features, automation, and intelligent workflows that move the needle for your business.",
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      body: "Scalable cloud infrastructure, CI/CD pipelines, and DevOps practices for reliable, fast delivery.",
    },
    {
      icon: BriefcaseBusiness,
      title: "IT Consulting",
      body: "Strategic technology consulting to help you make the right architectural and business decisions.",
    },
  ];
  return (
    <section id="services" className="py-24 bg-surface/40">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Services"
          title="What We Build"
          subtitle="A full-stack technology partner for software development, AI, cloud and consulting — all under one roof."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-card hover-lift hover:-translate-y-1 hover:border-brand animate-fade-up"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-brand opacity-0 blur-3xl group-hover:opacity-30 transition" />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-glow">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── Why Choose Prowexa ─────────────────────── */
function WhyUs() {
  const items = [
    { icon: Users, text: "Experienced Technology Professionals" },
    { icon: Zap, text: "Agile Development Process" },
    { icon: TrendingUp, text: "Scalable Solutions" },
    { icon: Layers, text: "End-to-End Project Delivery" },
    { icon: LifeBuoy, text: "Dedicated Support" },
    { icon: Globe2, text: "Industry Expertise" },
  ];
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-glow">Why choose us</span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            A technology partner built for <span className="text-gradient-brand">growth &amp; scale</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            We blend deep technical expertise with agile delivery so you can build faster, scale smarter and achieve
            your business goals with confidence.
          </p>
          <a
            href="#contact"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("contact");
            }}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition"
          >
            Get a Free Consultation <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-card hover-lift hover:-translate-y-1 animate-fade-up"
            >
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground shadow-glow">
                <item.icon className="h-4 w-4" />
              </span>
              <span className="font-medium text-sm">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── Industries ─────────────────────── */
function Industries() {
  const industries = [
    { icon: Banknote, name: "Banking & Finance", desc: "Secure fintech platforms and financial software." },
    { icon: HeartPulse, name: "Healthcare", desc: "Digital health solutions and patient management systems." },
    { icon: BookOpen, name: "Education", desc: "EdTech platforms and learning management systems." },
    { icon: ShoppingCart, name: "Retail & E-commerce", desc: "Scalable storefronts and commerce automation." },
    { icon: Truck, name: "Logistics", desc: "Fleet management and supply chain software." },
    { icon: Rocket, name: "Startups", desc: "MVP development and growth engineering for startups." },
  ];
  return (
    <section id="industries" className="py-24 bg-surface/40">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Industries"
          title="Industries We Serve"
          subtitle="We build technology solutions across diverse sectors — from regulated industries to high-growth startups."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind) => (
            <div
              key={ind.name}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-card hover-lift hover:-translate-y-1 hover:border-brand animate-fade-up"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-brand opacity-0 blur-3xl group-hover:opacity-30 transition" />
              <div className="relative flex items-start gap-4">
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-glow">
                  <ind.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{ind.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{ind.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── EdTech / Academy ─────────────────────── */
function EdTech() {
  const programs = [
    "Java Full Stack",
    "Python + AI",
    "Data Analytics",
    "Interview Preparation",
    "Corporate Training",
  ];
  return (
    <section id="academy" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-hero p-10 md:p-14 shadow-card animate-fade-up">
          <div className="absolute -top-32 -left-20 h-80 w-80 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur">
                <GraduationCap className="h-3.5 w-3.5 text-brand-glow" />
                Prowexa Academy
              </span>
              <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">Education &amp; Training</h2>
              <p className="mt-4 text-muted-foreground text-lg">
                Practical, industry-focused programs designed to build real-world skills and accelerate careers.
              </p>
              <a
                href="#contact"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection("contact");
                }}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition"
              >
                Explore Programs <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {programs.map((t) => (
                <div key={t} className="flex items-center gap-3 rounded-2xl border border-border bg-card/80 backdrop-blur p-4">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground shadow-glow">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <span className="font-medium text-sm">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── Contact CTA ─────────────────────── */
function ContactCTA() {
  return (
    <section className="py-24 bg-surface/40">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-brand p-10 md:p-16 shadow-glow text-center animate-fade-up">
          <div className="absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              Let's Build Your Next Digital Product
            </h2>
            <p className="mt-4 text-white/80 text-lg">
              Tell us about your vision. We'll help you turn it into a world-class digital product.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="#contact"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection("contact");
                }}
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand shadow-lg hover:bg-white/90 transition"
              >
                <CalendarCheck className="h-4 w-4" />
                Schedule a Meeting
              </a>
              <a
                href="mailto:info@prowexa.com"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20 transition"
              >
                <MessageCircle className="h-4 w-4" />
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── Company Details ─────────────────────── */
function CompanyDetails() {
  const details = [
    { icon: Building2, label: "Company Name", value: "Prowexa Technologies Pvt. Ltd." },
    { icon: Calendar, label: "Incorporation Date", value: "24 December 2025" },
    { icon: FileText, label: "CIN", value: "U62090PN2025PTC249889" },
    { icon: Layers, label: "Type", value: "Private Limited" },
    { icon: MapPin, label: "State", value: "Maharashtra" },
  ];
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="Company" title="Company Details" />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {details.map((d) => (
            <div key={d.label} className="rounded-3xl border border-border bg-card p-6 shadow-card hover-lift hover:-translate-y-1 animate-fade-up">
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground">
                  <d.icon className="h-4 w-4" />
                </span>
                <span className="text-xs uppercase tracking-wider">{d.label}</span>
              </div>
              <p className="mt-3 text-lg font-semibold">{d.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── Contact ─────────────────────── */
function Contact() {
  return (
    <section id="contact" className="py-24 bg-surface/40">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-hero p-10 md:p-16 shadow-glow text-center animate-fade-up">
          <div className="absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-gradient-brand opacity-30 blur-3xl" />
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Let's build something amazing together
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Tell us about your idea. We'll help you turn it into a product.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { icon: Mail, label: "Email", value: "info@prowexa.com", href: "mailto:info@prowexa.com" },
                { icon: Phone, label: "Phone", value: "7030347209", href: "tel:7030347209" },
                { icon: Globe, label: "Website", value: "prowexa.com", href: "https://prowexa.com" },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="group rounded-2xl border border-border bg-card/80 backdrop-blur p-5 hover:border-brand transition"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground shadow-glow mx-auto">
                    <c.icon className="h-4 w-4" />
                  </span>
                  <div className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">{c.label}</div>
                  <div className="mt-1 font-semibold">{c.value}</div>
                </a>
              ))}
            </div>
            <a
              href="mailto:info@prowexa.com"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition"
            >
              Start a conversation <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
