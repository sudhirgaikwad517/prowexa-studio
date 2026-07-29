import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { SiteHeader } from "./site-header";
import { Footer } from "./footer";
import {
  ArrowRight,
  Star,
  Quote,
  Award,
  CheckCircle,
} from "lucide-react";
import { useInView as useIOView } from "@/hooks/use-intersection-observer";
import { useCountUp } from "@/hooks/use-count-up";

function AnimatedStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, inView } = useIOView({ threshold: 0.3 });
  const display = useCountUp(value, inView, 1800, suffix);
  return (
    <div ref={ref as React.Ref<HTMLDivElement>}>
      <p className="text-3xl font-extrabold text-brand-glow">{display}</p>
      <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-semibold">{label}</p>
    </div>
  );
}

function AvatarInitials({ name }: { name: string }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-brand text-primary-foreground text-sm font-bold shadow-glow flex-none">
      {initials}
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function TestimonialsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-80px" });

  const clientRef = useRef<HTMLDivElement>(null);
  const clientInView = useInView(clientRef, { once: true, margin: "-80px" });

  const studentRef = useRef<HTMLDivElement>(null);
  const studentInView = useInView(studentRef, { once: true, margin: "-80px" });

  const clientTestimonials = [
    {
      name: "Siddharth Mehta",
      role: "CTO, CapitalVibe Inc.",
      type: "Software Services",
      quote:
        "Prowexa Technologies helped us completely re-architect our monolithic backend. Their engineers integrated seamlessly with our core team, delivered on strict timelines, and helped us scale to handle 100K+ daily active users without single hitch.",
      companyLogo: "CapitalVibe",
    },
    {
      name: "Sanjana Sharma",
      role: "Founder, DocuMind Legal",
      type: "AI & SaaS Development",
      quote:
        "We partnered with Prowexa to build our core Generative AI legal analysis tool. Their deep understanding of LLMs, vector embedding storage, and user experience design allowed us to ship a fully functional beta within 3 months.",
      companyLogo: "DocuMind",
    },
    {
      name: "Vikram Malhotra",
      role: "Operations Director, Runners Express",
      type: "Mobile App & Logistics",
      quote:
        "The dispatch and routing engine built by Prowexa has streamlined our last-mile deliveries. Our fuel costs are down 18% and customer satisfaction ratings have shot up.",
      companyLogo: "Runners Express",
    },
  ];

  const studentTestimonials = [
    {
      name: "Amit Deshmukh",
      role: "Software Engineer at Cognizant",
      type: "Prowexa Academy",
      quote:
        "The Java Full Stack program completely changed my career path. The live internship at Prowexa gave me the hands-on project experience that standard courses lack. The mock interviews were extremely close to the real thing.",
      course: "Java Full Stack (Batch of 2025)",
    },
    {
      name: "Priyanka Patil",
      role: "Associate Data Analyst at Tech M",
      type: "Prowexa Academy",
      quote:
        "Learning Python and AI from developers who write code daily made a huge difference. I built a working recommendation engine during the course. The career support team was exceptional.",
      course: "Python + AI & ML Program",
    },
    {
      name: "Rahul Kulkarni",
      role: "Junior Frontend Developer, Prowexa Technologies",
      type: "Prowexa Academy",
      quote:
        "I joined the coding bootcamp as a mechanical engineering graduate. The step-by-step roadmap and mentor support helped me clear the core concepts and land an internship, which led to a full-time role.",
      course: "React Front-End Specialization",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent opacity-50" />
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-brand opacity-10 blur-3xl" />
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 24 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative z-10 mx-auto max-w-7xl px-6 text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-xs text-purple-400 backdrop-blur-sm">
              <Award className="h-3.5 w-3.5" />
              Client &amp; Student Reviews
            </div>
            <h1 className="font-display mt-8 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Graduates &amp; <span className="text-gradient-brand">Partners</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              See how our engineering expertise and practical academy training have empowered
              businesses and accelerated careers.
            </p>
          </motion.div>
        </section>

        {/* Stats Strip */}
        <section className="py-10 border-y border-border bg-surface/20">
          <div className="mx-auto max-w-7xl px-6 grid gap-6 grid-cols-2 md:grid-cols-4 text-center">
            <AnimatedStat value={4} suffix=".9/5" label="Average Rating" />
            <AnimatedStat value={25} suffix="+" label="Shipped Products" />
            <AnimatedStat value={500} suffix="+" label="Academy Alumni" />
            <AnimatedStat value={95} suffix="%" label="Placement Success" />
          </div>
        </section>

        {/* Client reviews */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-16">
              <span className="font-label text-xs font-bold uppercase tracking-[0.2em] text-brand-glow">
                Software Clients
              </span>
              <h2 className="font-display mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                Client Testimonials
              </h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                Read feedback from CTOs, founders, and directors who partnered with Prowexa to build
                high-performance products.
              </p>
            </div>

            <div ref={clientRef} className="grid gap-8 md:grid-cols-3">
              {clientTestimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  custom={i}
                  initial="hidden"
                  animate={clientInView ? "visible" : "hidden"}
                  variants={fadeUp}
                  className="group relative rounded-3xl border border-border bg-card p-8 shadow-card flex flex-col justify-between hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <Quote className="absolute top-6 right-6 h-8 w-8 text-purple-500/10" />

                  <div>
                    {/* Animated stars */}
                    <div className="flex gap-1 text-yellow-500 mb-6">
                      {[...Array(5)].map((_, si) => (
                        <motion.div
                          key={si}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={clientInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: i * 0.1 + si * 0.08, duration: 0.3 }}
                        >
                          <Star className="h-4 w-4 fill-current" />
                        </motion.div>
                      ))}
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                      "{t.quote}"
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border flex items-center gap-3">
                    <AvatarInitials name={t.name} />
                    <div>
                      <h4 className="font-bold text-sm text-foreground">{t.name}</h4>
                      <p className="text-xs text-purple-400 font-semibold mt-0.5">{t.role}</p>
                      <span className="text-[10px] text-muted-foreground font-medium">{t.companyLogo}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Student reviews */}
        <section className="py-24 bg-surface/30">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-16">
              <span className="font-label text-xs font-bold uppercase tracking-[0.2em] text-brand-glow">
                Prowexa Academy
              </span>
              <h2 className="font-display mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                Student Success Stories
              </h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                Real feedback from graduates who transitioned from academic training into successful
                software development careers.
              </p>
            </div>

            <div ref={studentRef} className="grid gap-8 md:grid-cols-3">
              {studentTestimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  custom={i}
                  initial="hidden"
                  animate={studentInView ? "visible" : "hidden"}
                  variants={fadeUp}
                  className="relative rounded-3xl border border-border bg-card p-8 shadow-card flex flex-col justify-between hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <Quote className="absolute top-6 right-6 h-8 w-8 text-purple-500/10" />

                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 px-3 py-1 text-[10px] font-semibold text-purple-400 mb-6">
                      <CheckCircle className="h-3 w-3" />
                      Verified Graduate
                    </span>

                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                      "{t.quote}"
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border flex items-center gap-3">
                    <AvatarInitials name={t.name} />
                    <div>
                      <h4 className="font-bold text-sm text-foreground">{t.name}</h4>
                      <p className="text-xs text-purple-400 font-semibold mt-0.5">{t.role}</p>
                      <span className="text-[10px] text-muted-foreground font-medium">Course: {t.course}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <div className="gradient-border-ring relative overflow-hidden rounded-[2rem] bg-gradient-brand p-12 shadow-glow">
              <div className="absolute -top-20 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
              <div className="relative">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white">Join Prowexa Today</h2>
                <p className="mt-3 text-white/80">
                  Whether you want to build a digital product or upskill your team, we've got you covered.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand hover:bg-white/90 transition-all duration-300 hover:scale-[1.02]"
                  >
                    Start a Project <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/academy"
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20 transition-all duration-300 hover:scale-[1.02]"
                  >
                    Explore Programs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
