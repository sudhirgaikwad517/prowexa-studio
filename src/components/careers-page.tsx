import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  Users,
  Trophy,
  Globe,
  Zap,
  CheckCircle2,
  Heart,
  Coffee,
  Laptop,
  GraduationCap,
} from "lucide-react";
import { SiteHeader } from "./site-header";
import { Footer } from "./footer";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function CareersPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-80px" });

  const cultureRef = useRef<HTMLDivElement>(null);
  const cultureInView = useInView(cultureRef, { once: true, margin: "-80px" });

  const jobsRef = useRef<HTMLDivElement>(null);
  const jobsInView = useInView(jobsRef, { once: true, margin: "-80px" });

  const perksRef = useRef<HTMLDivElement>(null);
  const perksInView = useInView(perksRef, { once: true, margin: "-80px" });

  const jobs = [
    {
      title: "Senior Full Stack Engineer",
      type: "Full-time",
      location: "Pune / Remote",
      category: "Engineering",
      description: "Join our core team to build scalable digital products using modern tech stacks.",
    },
    {
      title: "Product Designer (UI/UX)",
      type: "Full-time",
      location: "Pune",
      category: "Design",
      description: "Create stunning, intuitive interfaces for next-gen startups and enterprise products.",
    },
    {
      title: "AI / ML Engineer",
      type: "Full-time",
      location: "Remote",
      category: "Engineering",
      description: "Implement cutting-edge AI features and LLM integrations for our product portfolio.",
    },
  ];

  const perks = [
    { icon: Laptop, title: "Remote-Friendly", desc: "Work from anywhere with flexible hours." },
    { icon: GraduationCap, title: "Learning Budget", desc: "Annual budget for courses, conferences & certifications." },
    { icon: Heart, title: "Health Coverage", desc: "Comprehensive health insurance for you and family." },
    { icon: Coffee, title: "Team Retreats", desc: "Quarterly team outings and hackathon events." },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main>
        {/* Careers Hero */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent opacity-50" />
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 24 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative z-10 mx-auto max-w-7xl px-6 text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-xs text-purple-400 backdrop-blur-sm animate-glow-pulse"
            >
              <Sparkles className="h-3.5 w-3.5" />
              We're Hiring — Join the Prowexa Team
            </motion.div>
            <h1 className="font-display mt-8 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Build the <span className="text-gradient-brand">Future</span> With Us
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              We're looking for passionate creators, thinkers, and builders to help us transform
              ideas into world-class digital products. Work on exciting projects with global impact.
            </p>
          </motion.div>
        </section>

        {/* Culture Section */}
        <section className="py-24 bg-surface/30">
          <div className="mx-auto max-w-7xl px-6">
            <div ref={cultureRef} className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <motion.div
                initial={{ opacity: 0, x: -32 }}
                animate={cultureInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7 }}
                className="lg:col-span-5"
              >
                <h2 className="font-display text-3xl font-bold md:text-4xl">Why Work at Prowexa?</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  At Prowexa, we foster a culture of innovation, ownership, and continuous learning.
                  We believe in building products that solve real problems, and we know that starts
                  with an exceptional team.
                </p>
                <div className="mt-8 space-y-3.5">
                  {[
                    "Ownership & Autonomy",
                    "Modern Tech Stack (React, Next.js, AI)",
                    "Competitive Compensation",
                    "Flexible Work Environment",
                    "Fast-paced Startup Culture",
                  ].map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -16 }}
                      animate={cultureInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: i * 0.08, duration: 0.5 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2 className="h-5 w-5 text-purple-500 flex-shrink-0" />
                      <span className="font-medium text-sm md:text-base">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {[
                  { icon: Users, title: "Collaborative Team", desc: "Work with the brightest minds in engineering and design." },
                  { icon: Trophy, title: "Impactful Projects", desc: "Build products that scale and make a real difference." },
                  { icon: Zap, title: "Fast Execution", desc: "We value speed and shipping quality products quickly." },
                  { icon: Globe, title: "Global Reach", desc: "Our products are used by businesses and users worldwide." },
                ].map((card, i) => (
                  <motion.div
                    key={card.title}
                    custom={i}
                    initial="hidden"
                    animate={cultureInView ? "visible" : "hidden"}
                    variants={fadeUp}
                    className="group rounded-3xl border border-border bg-card p-6 shadow-card hover:border-purple-500/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400 mb-4 transition-transform group-hover:scale-110">
                        <card.icon className="h-6 w-6" />
                      </span>
                      <h3 className="font-bold text-lg">{card.title}</h3>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{card.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Perks & Benefits */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-12">
              <span className="font-label text-xs font-bold uppercase tracking-[0.2em] text-brand-glow">Benefits</span>
              <h2 className="font-display mt-3 text-3xl font-bold tracking-tight md:text-4xl">Perks &amp; Benefits</h2>
            </div>
            <div ref={perksRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {perks.map((perk, i) => (
                <motion.div
                  key={perk.title}
                  custom={i}
                  initial="hidden"
                  animate={perksInView ? "visible" : "hidden"}
                  variants={fadeUp}
                  className="group glass-card rounded-3xl p-6 text-center shadow-card hover:border-brand/30 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-glow transition-transform group-hover:scale-110">
                    <perk.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display mt-5 text-lg font-bold">{perk.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{perk.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Job Listings */}
        <section id="openings" className="py-24 bg-surface/30">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <h2 className="font-display text-3xl font-bold md:text-4xl">Open Positions</h2>
                <p className="mt-2 text-muted-foreground">Find your next challenge and join our mission.</p>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <span className="flex h-2.5 w-2.5 rounded-full bg-green-500 animate-subtle-ping" />
                Waitlist currently open for all roles
              </div>
            </div>

            <div ref={jobsRef} className="grid gap-4">
              {jobs.map((job, i) => (
                <motion.div
                  key={job.title}
                  custom={i}
                  initial="hidden"
                  animate={jobsInView ? "visible" : "hidden"}
                  variants={fadeUp}
                  className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-card hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-400">
                          {job.category}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                          <MapPin className="h-3 w-3" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                          <Clock className="h-3 w-3" />
                          {job.type}
                        </div>
                      </div>
                      <h3 className="font-display text-2xl font-bold group-hover:text-purple-400 transition-colors">
                        {job.title}
                      </h3>
                      <p className="mt-3 text-muted-foreground leading-relaxed max-w-2xl">{job.description}</p>
                    </div>
                    <a
                      href="mailto:careers@prowexa.com"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-surface-elevated border border-border px-8 py-3.5 text-sm font-semibold hover:bg-purple-500 hover:text-white hover:border-purple-500 transition-all duration-300 whitespace-nowrap"
                    >
                      Apply Now <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={jobsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-16 text-center rounded-[2.5rem] bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/10 p-12"
            >
              <h3 className="font-display text-2xl font-bold">Don't see a perfect fit?</h3>
              <p className="mt-4 text-muted-foreground">
                We're always looking for talented individuals. Send us your resume and tell us how
                you can make an impact at Prowexa.
              </p>
              <a
                href="mailto:careers@prowexa.com"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-purple-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 hover:bg-purple-700 transition-all duration-300 hover:scale-[1.02]"
              >
                Send Open Application <Briefcase className="h-4 w-4 ml-1" />
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
