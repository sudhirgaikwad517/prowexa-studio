import { useRef, type RefObject } from "react";
import { motion, useScroll, useTransform, useInView as useFramerInView } from "framer-motion";
import officeTeam from "@/assets/office-team.jpg";
import officeWorkspace from "@/assets/office-workspace.jpg";
import officeReception from "@/assets/office-reception.jpg";
import officeNight from "@/assets/office-night.jpg";
import officeCoding from "@/assets/office-coding.jpg";
import heroBg from "@/assets/hero-bg.png";
import {
  ArrowRight,
  Lightbulb,
  Rocket,
  TrendingUp,
  Code2,
  Smartphone,
  Cloud,
  Cpu,
  Zap,
  Target,
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
  ChevronUp,
  ArrowUpRight,
  CheckCircle2,
  Star,
  Shield,
} from "lucide-react";

import { scrollToSection } from "@/utils/scroll";
import { useInView } from "@/hooks/use-intersection-observer";
import { useCountUp } from "@/hooks/use-count-up";
import { Footer } from "./footer";

/* ─── Framer Motion Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export function HomePage() {
  return (
    <main id="top" className="flex flex-col w-full">
      <Hero />
      <StatsBar />
      <BrandTicker />
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
      <BackToTop />
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
      className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      style={{ background: "#25D366" }}
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7 fill-white" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.163 0 0 7.163 0 16c0 2.824.737 5.478 2.027 7.789L0 32l8.454-2.217A15.94 15.94 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm8.066 22.064c-.334.94-1.957 1.797-2.69 1.857-.733.061-1.43.366-4.822-1.004-4.074-1.651-6.677-5.804-6.878-6.07-.2-.267-1.63-2.168-1.63-4.135s1.03-2.934 1.396-3.334c.366-.4.8-.5 1.067-.5l.767.014c.247.01.578-.094.906.693.334.8 1.134 2.767 1.234 2.968.1.2.167.434.033.7-.133.267-.2.434-.4.667-.2.234-.42.523-.6.7-.2.2-.407.416-.175.816.234.4 1.04 1.716 2.234 2.78 1.534 1.366 2.826 1.79 3.226 1.99.4.2.633.167.867-.1.233-.267 1-.1 1.166.3.167.4.167 2.1-.5 2.898z" />
      </svg>
    </a>
  );
}

/* ─────────────────────── Back to Top ─────────────────────── */
function BackToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-8 left-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-border/40 bg-surface/80 backdrop-blur-md text-muted-foreground shadow-lg transition-all duration-300 hover:bg-brand hover:text-white hover:shadow-glow hover:scale-110"
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}

/* ─────────────────────── Hero ─────────────────────── */
function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef as RefObject<HTMLElement>,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.4, 0.85]);

  return (
    <section ref={heroRef} className="relative overflow-hidden min-h-[calc(100vh-72px)] flex items-center justify-center">
      {/* Hero background image (static, non-scrolling) */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Prowexa Technologies Hero Background"
          className="h-full w-full object-cover scale-105"
          width={1920}
          height={1080}
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/85" />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-[15%] left-[10%] h-48 w-48 rounded-full bg-brand/20 blur-[80px]"
          animate={{ x: [0, 30, -20, 0], y: [0, -25, 15, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[40%] right-[8%] h-64 w-64 rounded-full bg-brand-glow/15 blur-[100px]"
          animate={{ x: [0, -40, 20, 0], y: [0, 30, -20, 0], scale: [1, 0.9, 1.1, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[10%] left-[40%] h-32 w-32 rounded-full bg-accent/20 blur-[60px]"
          animate={{ x: [0, 20, -30, 0], y: [0, -15, 25, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl px-6 py-16 md:py-24">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs backdrop-blur animate-glow-pulse"
          >
            <Sparkles className="h-3.5 w-3.5 text-brand-glow" />
            <span className="font-label uppercase tracking-[0.1em] text-brand-glow">
              Next-gen product engineering
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display mt-8 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.08]"
          >
            Transforming <span className="text-gradient-brand">Ideas</span> into
            <br />
            Scalable Digital Solutions
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-2xl text-base md:text-lg text-white/80 leading-relaxed"
          >
            Custom Software Development, AI Solutions, Web Applications, Mobile Apps &amp; Technology Consulting.
          </motion.p>

          <motion.nav
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-3 text-sm"
            aria-label="Development Process"
          >
            {[
              { icon: Lightbulb, label: "Idea → MVP" },
              { icon: Rocket, label: "MVP → Scale" },
              { icon: TrendingUp, label: "Business → Success" },
            ].map((step, i) => (
              <div key={step.label} className="flex items-center gap-3">
                <div className="glass-card flex items-center gap-2.5 rounded-full px-4 py-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-brand text-primary-foreground">
                    <step.icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="font-semibold text-white">{step.label}</span>
                </div>
                {i < 2 && <ArrowRight className="h-4 w-4 text-white/50" />}
              </div>
            ))}
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex flex-wrap gap-4"
          >
            <a
              href="#contact"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("contact");
              }}
              className="shimmer-btn inline-flex h-12 items-center justify-center gap-2.5 rounded-xl bg-gradient-brand px-8 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:opacity-90 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              Get a Free Consultation <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("contact");
              }}
              className="glass-card inline-flex h-12 items-center justify-center gap-2.5 rounded-xl border-border/30 px-8 text-sm font-semibold text-white transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-white/10 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Request a Quote
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── Stats Bar ─────────────────────── */
function StatItem({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const { ref, inView } = useInView({ threshold: 0.3 });
  const value = useCountUp(end, inView, 2000, suffix);
  return (
    <div ref={ref as React.Ref<HTMLDivElement>} className="text-center">
      <p className="text-3xl md:text-4xl font-extrabold font-display text-brand-glow">{value}</p>
      <p className="text-xs text-muted-foreground mt-1.5 uppercase tracking-wider font-semibold">{label}</p>
    </div>
  );
}

function StatsBar() {
  return (
    <section className="relative border-y border-border/40 bg-surface/30 py-10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="divider-glow absolute top-0 inset-x-0" />
        <div className="divider-glow absolute bottom-0 inset-x-0" />
      </div>
      <div className="mx-auto max-w-7xl px-6 grid gap-8 grid-cols-2 md:grid-cols-4 relative z-10">
        <StatItem end={25} suffix="+" label="Products Shipped" />
        <StatItem end={500} suffix="+" label="Academy Alumni" />
        <StatItem end={6} suffix="+" label="Industries Served" />
        <StatItem end={95} suffix="%" label="Client Satisfaction" />
      </div>
    </section>
  );
}

/* ─────────────────────── Brand Ticker ─────────────────────── */
function BrandTicker() {
  const items = [
    "Prowexa Technologies",
    "AI Innovation",
    "Cloud Engineering",
    "Product Strategy",
    "Scalable Systems",
    "Mobile Solutions",
    "DevOps Excellence",
    "SaaS Platforms",
  ];

  return (
    <aside
      className="relative overflow-hidden border-b border-border/40 bg-surface/20 py-5"
      aria-label="Brand highlights"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

      <div className="flex animate-ticker whitespace-nowrap will-change-transform">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="font-label mx-8 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.1em] text-brand-glow/60 transition-colors hover:text-brand-glow"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand opacity-70" />
            {item}
          </span>
        ))}
      </div>
    </aside>
  );
}

/* ─────────────────────── Section Heading ─────────────────────── */
function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useFramerInView(ref, { once: true, margin: "-80px" });

  return (
    <header ref={ref} className="mx-auto max-w-3xl text-center">
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="font-label text-xs font-bold uppercase tracking-[0.2em] text-brand-glow inline-block"
      >
        {eyebrow}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="font-display mt-4 text-4xl font-extrabold tracking-tight md:text-5xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-5 text-lg text-muted-foreground leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </header>
  );
}

/* ─────────────────────── About ─────────────────────── */
function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useFramerInView(containerRef, { once: true, margin: "-80px" });

  const cards = [
    {
      icon: Building2,
      title: "Incorporated 2025",
      body: "A technology-driven company incorporated on 24 December 2025 under the Companies Act, 2013.",
      number: "01",
    },
    {
      icon: Layers,
      title: "Product Engineering",
      body: "We specialize in building high-performance software solutions, SaaS platforms, and digital products.",
      number: "02",
    },
    {
      icon: Target,
      title: "Real Problem Solvers",
      body: "We don't just develop software; we build products that solve real problems at scale.",
      number: "03",
    },
  ];

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="About" title="About Prowexa" />
        <div ref={containerRef} className="mt-16 grid gap-8 md:grid-cols-3">
          {cards.map((c, i) => (
            <motion.article
              key={c.title}
              custom={i}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeUp}
              className="group glass-card relative rounded-3xl p-8 shadow-card hover-lift hover:border-brand/30 hover:-translate-y-1 transition-all duration-300"
            >
              <span className="absolute top-6 right-6 font-display text-5xl font-extrabold text-brand/8">{c.number}</span>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-glow transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <c.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold tracking-tight">{c.title}</h3>
              <p className="mt-3 text-base text-muted-foreground leading-relaxed">{c.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── Inside Prowexa ─────────────────────── */
function InsideProwexa() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useFramerInView(containerRef, { once: true, margin: "-80px" });

  const images = [
    { src: officeReception, label: "Reception", span: "md:col-span-2 md:row-span-2" },
    { src: officeTeam, label: "Team Collaboration", span: "" },
    { src: officeWorkspace, label: "Workspace", span: "" },
    { src: officeCoding, label: "Engineering", span: "md:col-span-2" },
    { src: officeNight, label: "Always-on Culture", span: "" },
  ];

  return (
    <section className="py-24 md:py-32 bg-surface/40">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Our space"
          title="Inside Prowexa"
          subtitle="A glimpse of where our ideas, code and culture come to life."
        />
        <div ref={containerRef} className="mt-16 grid grid-cols-1 md:grid-cols-4 md:auto-rows-[240px] gap-6">
          {images.map((img, i) => (
            <motion.figure
              key={img.label}
              custom={i}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={scaleIn}
              className={`group relative overflow-hidden rounded-3xl border border-border/30 shadow-card ${img.span}`}
            >
              <img
                src={img.src}
                alt={`Prowexa office: ${img.label}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              {/* Hover zoom icon overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-brand/0 transition-all duration-300 group-hover:bg-brand/10">
                <ArrowUpRight className="h-8 w-8 text-white/0 transition-all duration-300 group-hover:text-white/80 group-hover:scale-100 scale-50" />
              </div>
              <figcaption className="font-label absolute bottom-5 left-5 rounded-full bg-slate-950/80 text-white backdrop-blur-md px-4 py-1.5 text-xs tracking-wider">
                {img.label}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── Mission & Vision ─────────────────────── */
function MissionVision() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useFramerInView(containerRef, { once: true, margin: "-80px" });

  return (
    <section className="py-24 md:py-32">
      <div ref={containerRef} className="mx-auto max-w-7xl px-6 grid gap-8 md:grid-cols-2">
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
        ].map((c, i) => (
          <motion.article
            key={c.tag}
            custom={i}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUp}
            className="gradient-border-ring relative overflow-hidden rounded-3xl bg-gradient-hero p-10 lg:p-12 shadow-card hover-lift hover:-translate-y-1 transition-all duration-300"
          >
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-brand opacity-20 blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <header className="flex items-center gap-4">
                <motion.span
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground shadow-glow"
                >
                  <c.icon className="h-5 w-5" />
                </motion.span>
                <span className="font-label text-xs font-bold uppercase tracking-[0.2em] text-brand-glow">
                  {c.tag}
                </span>
              </header>
              <h3 className="font-display mt-6 text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">{c.title}</h3>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">{c.body}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────── Services ─────────────────────── */
function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useFramerInView(containerRef, { once: true, margin: "-80px" });

  const services = [
    {
      icon: Code2,
      title: "Custom Software Development",
      body: "Tailor-made enterprise-grade software built for your unique business requirements and built to scale.",
      number: "01",
    },
    {
      icon: MonitorSmartphone,
      title: "Web Development",
      body: "High-performance, responsive web applications crafted with modern frameworks and best practices.",
      number: "02",
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      body: "Native and cross-platform mobile apps for iOS and Android with delightful user experiences.",
      number: "03",
    },
    {
      icon: Cpu,
      title: "AI Solutions",
      body: "AI-powered features, automation, and intelligent workflows that move the needle for your business.",
      number: "04",
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      body: "Scalable cloud infrastructure, CI/CD pipelines, and DevOps practices for reliable, fast delivery.",
      number: "05",
    },
    {
      icon: BriefcaseBusiness,
      title: "IT Consulting",
      body: "Strategic technology consulting to help you make the right architectural and business decisions.",
      number: "06",
    },
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-surface/40">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Services"
          title="What We Build"
          subtitle="A full-stack technology partner for software development, AI, cloud and consulting — all under one roof."
        />
        <div ref={containerRef} className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              custom={i}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeUp}
              className="group glass-card relative overflow-hidden rounded-3xl p-8 shadow-card hover-lift hover:border-brand/40 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-brand opacity-0 blur-3xl transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-20 pointer-events-none" />
              {/* Large accent number */}
              <span className="absolute top-6 right-6 font-display text-6xl font-extrabold text-brand/6 select-none">{s.number}</span>
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -6 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-glow"
                >
                  <s.icon className="h-6 w-6" />
                </motion.div>
                <h3 className="font-display mt-6 text-xl font-bold tracking-tight">{s.title}</h3>
                <p className="mt-3 text-base text-muted-foreground leading-relaxed">{s.body}</p>
                <a
                  href="/portfolio"
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-glow opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
                >
                  View our work <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── Why Choose Prowexa (Bento Grid) ─────────────────────── */
function WhyUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useFramerInView(containerRef, { once: true, margin: "-80px" });

  const items = [
    { icon: Users, text: "Experienced Technology Professionals", stat: "10+", statLabel: "Engineers" },
    { icon: Zap, text: "Agile Development Process", stat: "2 Weeks", statLabel: "Sprint Cycles" },
    { icon: TrendingUp, text: "Scalable Solutions", stat: "100K+", statLabel: "Users Served" },
    { icon: Layers, text: "End-to-End Project Delivery", stat: "25+", statLabel: "Projects" },
    { icon: LifeBuoy, text: "Dedicated Support", stat: "24/7", statLabel: "Availability" },
    { icon: Globe2, text: "Industry Expertise", stat: "6+", statLabel: "Sectors" },
  ];

  return (
    <section className="py-24 md:py-32">
      <div ref={containerRef} className="mx-auto max-w-7xl px-6 grid gap-16 lg:grid-cols-2 lg:items-center">
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={slideInLeft}>
          <span className="font-label text-xs font-bold uppercase tracking-[0.2em] text-brand-glow">Why choose us</span>
          <h2 className="font-display mt-4 text-4xl font-extrabold tracking-tight md:text-5xl leading-tight">
            A technology partner built for <span className="text-gradient-brand">growth &amp; scale</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
            We blend deep technical expertise with agile delivery so you can build faster, scale smarter and achieve
            your business goals with confidence.
          </p>
          <a
            href="#contact"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("contact");
            }}
            className="shimmer-btn mt-10 inline-flex h-12 items-center justify-center gap-2.5 rounded-xl bg-gradient-brand px-8 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:opacity-90 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            Get a Free Consultation <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item, i) => (
            <motion.div
              key={item.text}
              custom={i}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={scaleIn}
              className="group glass-card flex flex-col gap-3 rounded-2xl p-5 hover-lift hover:border-brand/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground shadow-glow transition-transform duration-300 group-hover:scale-110">
                  <item.icon className="h-5 w-5" />
                </span>
                <div>
                  <span className="font-display text-lg font-extrabold text-brand-glow">{item.stat}</span>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">{item.statLabel}</p>
                </div>
              </div>
              <span className="font-semibold text-sm leading-snug">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── Industries ─────────────────────── */
function Industries() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useFramerInView(containerRef, { once: true, margin: "-80px" });

  const industries = [
    { icon: Banknote, name: "Banking & Finance", desc: "Secure fintech platforms and financial software.", accent: "from-emerald-500/20 to-emerald-600/5" },
    { icon: HeartPulse, name: "Healthcare", desc: "Digital health solutions and patient management systems.", accent: "from-rose-500/20 to-rose-600/5" },
    { icon: BookOpen, name: "Education", desc: "EdTech platforms and learning management systems.", accent: "from-blue-500/20 to-blue-600/5" },
    { icon: ShoppingCart, name: "Retail & E-commerce", desc: "Scalable storefronts and commerce automation.", accent: "from-amber-500/20 to-amber-600/5" },
    { icon: Truck, name: "Logistics", desc: "Fleet management and supply chain software.", accent: "from-cyan-500/20 to-cyan-600/5" },
    { icon: Rocket, name: "Startups", desc: "MVP development and growth engineering for startups.", accent: "from-violet-500/20 to-violet-600/5" },
  ];

  return (
    <section id="industries" className="py-24 md:py-32 bg-surface/40">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Industries"
          title="Industries We Serve"
          subtitle="We build technology solutions across diverse sectors — from regulated industries to high-growth startups."
        />
        <div ref={containerRef} className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <motion.article
              key={ind.name}
              custom={i}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeUp}
              className="group glass-card relative overflow-hidden rounded-3xl p-8 shadow-card hover-lift hover:border-brand/40 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Industry-specific accent glow */}
              <div className={`absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${ind.accent} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100 pointer-events-none`} />
              <div className="relative flex items-start gap-5 z-10">
                <motion.span
                  whileHover={{ scale: 1.1, rotate: 6 }}
                  className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-glow"
                >
                  <ind.icon className="h-6 w-6" />
                </motion.span>
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight">{ind.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{ind.desc}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── EdTech / Academy ─────────────────────── */
function EdTech() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useFramerInView(containerRef, { once: true, margin: "-80px" });
  const { ref: statRef, inView: statInView } = useInView({ threshold: 0.3 });

  const programs = [
    "Java Full Stack",
    "Python + AI",
    "Data Analytics",
    "Interview Preparation",
    "Corporate Training",
  ];

  return (
    <section id="academy" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          ref={containerRef}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0}
          className="relative overflow-hidden rounded-[2.5rem] border border-border/40 bg-gradient-hero p-10 md:p-16 lg:p-20 shadow-card"
        >
          <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-gradient-brand opacity-20 blur-3xl pointer-events-none" />
          <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center z-10">
            <div>
              <span className="font-label inline-flex items-center gap-2 rounded-full border border-border/40 bg-surface/60 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground backdrop-blur">
                <GraduationCap className="h-4 w-4 text-brand-glow" />
                Prowexa Academy
              </span>
              <h2 className="font-display mt-6 text-4xl font-extrabold tracking-tight md:text-5xl leading-tight">
                Education &amp; Training
              </h2>
              <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
                Practical, industry-focused programs designed to build real-world skills and accelerate careers.
              </p>

              {/* Stats */}
              <div ref={statRef as React.Ref<HTMLDivElement>} className="mt-8 flex gap-8 flex-wrap">
                {[
                  { end: 500, suffix: "+", label: "Alumni" },
                  { end: 95, suffix: "%", label: "Course Completion" },
                  { end: 4, suffix: ".9★", label: "Rating" },
                ].map((s) => (
                  <StatItem key={s.label} end={s.end} suffix={s.suffix} label={s.label} />
                ))}
              </div>

              <a
                href="#contact"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection("contact");
                }}
                className="shimmer-btn mt-8 inline-flex h-12 items-center justify-center gap-2.5 rounded-xl bg-gradient-brand px-8 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:opacity-90 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                Explore Programs <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {programs.map((t, i) => (
                <motion.li
                  key={t}
                  custom={i}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={scaleIn}
                  className="group glass-card flex items-center gap-4 rounded-2xl p-5 shadow-sm hover-lift hover:border-brand/30 hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground shadow-glow transition-transform duration-300 group-hover:scale-110">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <span className="font-semibold text-sm">{t}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────── Contact CTA ─────────────────────── */
function ContactCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useFramerInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 md:py-32 bg-surface/40">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="gradient-border-ring relative overflow-hidden rounded-[2.5rem] bg-gradient-brand p-12 md:p-20 shadow-glow text-center"
        >
          <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Let's Build Your Next Digital Product
            </h2>
            <p className="mt-6 text-white/90 text-lg md:text-xl font-medium">
              Tell us about your vision. We'll help you turn it into a world-class digital product.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href="#contact"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection("contact");
                }}
                className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl bg-white px-8 text-sm font-bold text-brand shadow-lg transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-white/90 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand"
              >
                <CalendarCheck className="h-4 w-4" />
                Schedule a Meeting
              </a>
              <a
                href="mailto:info@prowexa.com"
                className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl border border-white/30 bg-white/10 px-8 text-sm font-bold text-white backdrop-blur transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-white/20 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand"
              >
                <MessageCircle className="h-4 w-4" />
                Contact Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────── Company Details ─────────────────────── */
function CompanyDetails() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useFramerInView(containerRef, { once: true, margin: "-80px" });

  const details = [
    { icon: Building2, label: "Company Name", value: "Prowexa Technologies Pvt. Ltd." },
    { icon: Calendar, label: "Incorporation Date", value: "24 December 2025" },
    { icon: FileText, label: "CIN", value: "U62090PN2025PTC249889" },
    { icon: Layers, label: "Type", value: "Private Limited" },
    { icon: MapPin, label: "State", value: "Maharashtra" },
  ];

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="Company" title="Company Details" />
        <dl ref={containerRef} className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {details.map((d, i) => (
            <motion.div
              key={d.label}
              custom={i}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeUp}
              className="group glass-card rounded-3xl p-8 shadow-card hover-lift hover:border-brand/30 hover:-translate-y-1 transition-all duration-300"
            >
              <dt className="flex items-center gap-3 text-muted-foreground">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground transition-transform duration-300 group-hover:scale-110">
                  <d.icon className="h-4 w-4" />
                </span>
                <span className="font-label text-xs font-bold uppercase tracking-wider">{d.label}</span>
              </dt>
              <dd className="font-display mt-4 text-xl font-bold tracking-tight">{d.value}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ─────────────────────── Contact ─────────────────────── */
function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useFramerInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="py-24 md:py-32 bg-surface/40">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[2.5rem] border border-border/40 bg-gradient-hero p-12 md:p-20 shadow-glow text-center"
        >
          <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-brand opacity-30 blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight">
              Let's build something amazing together
            </h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              Tell us about your idea. We'll help you turn it into a product.
            </p>
            <address className="mt-12 grid gap-6 sm:grid-cols-3 not-italic">
              {[
                { icon: Mail, label: "Email", value: "info@prowexa.com", href: "mailto:info@prowexa.com" },
                { icon: Phone, label: "Phone", value: "7030347209", href: "tel:7030347209" },
                { icon: Globe, label: "Website", value: "prowexa.com", href: "https://prowexa.com" },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="group glass-card rounded-2xl p-6 hover:border-brand/40 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 hover:shadow-md"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground shadow-glow mx-auto transition-transform duration-300 group-hover:scale-110">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <div className="font-label mt-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {c.label}
                  </div>
                  <div className="mt-2 font-semibold text-foreground">{c.value}</div>
                </a>
              ))}
            </address>
            <a
              href="mailto:info@prowexa.com"
              className="shimmer-btn mt-12 inline-flex h-12 items-center justify-center gap-2.5 rounded-xl bg-gradient-brand px-10 text-sm font-bold text-primary-foreground shadow-glow transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:opacity-90 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              Start a conversation <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
