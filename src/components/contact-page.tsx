import { useState, useRef } from "react";
import type { FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import { SiteHeader } from "./site-header";
import { Footer } from "./footer";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  ExternalLink,
  Shield,
  Zap,
  MessageCircle,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    service: "custom-software",
    budget: "$5,000 - $10,000",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-80px" });

  const faqRef = useRef<HTMLDivElement>(null);
  const faqInView = useInView(faqRef, { once: true, margin: "-80px" });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormState({
        name: "",
        email: "",
        company: "",
        service: "custom-software",
        budget: "$5,000 - $10,000",
        message: "",
      });
    }, 1200);
  }

  const faqs = [
    {
      q: "What is your typical project timeline?",
      a: "For MVPs and standard web/mobile applications, timelines typically range between 6 to 12 weeks. Enterprise platforms or advanced AI integrations may take 4 to 6 months depending on requirements.",
    },
    {
      q: "How does the payment model work?",
      a: "We work on a milestone-based payment structure. A kick-off deposit is paid, followed by staggered disbursements tied to explicit deliverables (e.g., UI/UX approved, Beta Release, Production Deployment).",
    },
    {
      q: "Do you offer post-launch support and maintenance?",
      a: "Yes. Every project includes 30 days of complimentary hypercare support. After that, we offer monthly SLA agreements covering security patches, feature additions, cloud monitoring, and bug fixes.",
    },
    {
      q: "Can you help with app store submissions and cloud setup?",
      a: "Absolutely. We handle AWS/Vercel/Google Cloud provisioning, domain setup, DNS mapping, and publishing mobile applications to the Apple App Store and Google Play Store.",
    },
  ];

  const trustBadges = [
    { icon: Shield, label: "100% Confidential" },
    { icon: Zap, label: "24hr Response Time" },
    { icon: MessageCircle, label: "No-Obligation Quote" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main>
        {/* Header */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-brand/10 via-transparent to-transparent opacity-50" />
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 24 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative z-10 mx-auto max-w-7xl px-6 text-center"
          >
            <span className="font-label text-xs font-bold uppercase tracking-[0.2em] text-brand-glow">
              Get In Touch
            </span>
            <h1 className="font-display mt-4 text-5xl font-bold tracking-tight md:text-6xl">Let's Connect</h1>
            <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
              Have an idea, project, or training inquiry? Fill out the form or schedule a call, and
              we'll reply within 24 hours.
            </p>

            {/* Trust Badges */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {trustBadges.map((badge) => (
                <div key={badge.label} className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2 text-xs font-medium text-muted-foreground backdrop-blur">
                  <badge.icon className="h-3.5 w-3.5 text-brand-glow" />
                  {badge.label}
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Contact Grid */}
        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-12 items-start">
              {/* Information */}
              <div className="lg:col-span-5 space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -24 }}
                  animate={heroInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="rounded-3xl border border-border bg-card p-8 shadow-card"
                >
                  <h2 className="font-display text-xl font-bold mb-6">Contact Information</h2>

                  <div className="space-y-6">
                    <a
                      href="mailto:info@prowexa.com"
                      className="flex items-start gap-4 group text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground shadow-glow transition-transform group-hover:scale-110">
                        <Mail className="h-5 w-5" />
                      </span>
                      <div>
                        <span className="font-label text-xs font-bold uppercase tracking-wider block text-brand-glow">
                          Email Us
                        </span>
                        <p className="mt-1 font-medium text-foreground group-hover:text-brand transition-colors">
                          info@prowexa.com
                        </p>
                        <p className="text-xs mt-0.5">General &amp; project inquiries</p>
                      </div>
                    </a>

                    <a
                      href="tel:+917030247209"
                      className="flex items-start gap-4 group text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground shadow-glow transition-transform group-hover:scale-110">
                        <Phone className="h-5 w-5" />
                      </span>
                      <div>
                        <span className="font-label text-xs font-bold uppercase tracking-wider block text-brand-glow">
                          Call Us
                        </span>
                        <p className="mt-1 font-medium text-foreground group-hover:text-brand transition-colors">
                          +91 7030 347 209
                        </p>
                        <p className="text-xs mt-0.5">Mon-Sat, 10 AM - 7 PM IST</p>
                      </div>
                    </a>

                    <div className="flex items-start gap-4 text-muted-foreground">
                      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground shadow-glow">
                        <MapPin className="h-5 w-5" />
                      </span>
                      <div>
                        <span className="font-label text-xs font-bold uppercase tracking-wider block text-brand-glow">
                          Office Location
                        </span>
                        <p className="mt-1 font-medium text-foreground">Prowexa Technologies Pvt. Ltd.</p>
                        <p className="text-xs mt-0.5">Pune, Maharashtra, India</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Map Embed */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="rounded-3xl border border-border overflow-hidden shadow-card"
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.165!2d73.766!3d18.574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDM0JzI2LjQiTiA3M8KwNDUnNTcuNiJF!5e0!3m2!1sen!2sin!4v1"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Prowexa Office Location"
                    className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                  />
                </motion.div>

                {/* Calendar Integration */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="rounded-3xl border border-border bg-gradient-hero p-8 shadow-card relative overflow-hidden"
                >
                  <div className="absolute -right-20 -bottom-20 h-40 w-40 rounded-full bg-gradient-brand opacity-20 blur-2xl" />
                  <h3 className="font-display text-lg font-bold">Prefer a direct call?</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    Book a free 30-minute discovery call directly on our calendar to discuss project details.
                  </p>
                  <a
                    href="https://calendly.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shimmer-btn mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-xs font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition"
                  >
                    Schedule Calendar Meeting <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </motion.div>
              </div>

              {/* Inquiry Form */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="lg:col-span-7"
              >
                <div className="rounded-[2rem] border border-border bg-card p-8 md:p-10 shadow-card">
                  {submitted ? (
                    <div className="text-center py-12">
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 mx-auto mb-6"
                      >
                        <CheckCircle className="h-8 w-8" />
                      </motion.span>
                      <h2 className="font-display text-2xl font-bold text-foreground">Message Sent Successfully!</h2>
                      <p className="mt-3 text-muted-foreground max-w-md mx-auto">
                        Thank you for reaching out. A Prowexa technology advisor will contact you within 24 hours to schedule a consultation.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="mt-8 rounded-full border border-border bg-surface px-6 py-2.5 text-xs font-semibold hover:bg-surface-elevated transition"
                      >
                        Send Another Inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <h2 className="font-display text-xl font-bold">Inquiry Form</h2>
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label htmlFor="name" className="font-label text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            required
                            placeholder="e.g. Rahul Patil"
                            value={formState.name}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all duration-300"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="font-label text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Work Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            required
                            placeholder="e.g. rahul@company.com"
                            value={formState.email}
                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all duration-300"
                          />
                        </div>
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label htmlFor="company" className="font-label text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Company Name
                          </label>
                          <input
                            type="text"
                            id="company"
                            placeholder="e.g. Acme Corp"
                            value={formState.company}
                            onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all duration-300"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="service" className="font-label text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Service Required *
                          </label>
                          <select
                            id="service"
                            value={formState.service}
                            onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all duration-300"
                          >
                            <option value="custom-software">Custom Software Development</option>
                            <option value="web-development">Web Application Development</option>
                            <option value="mobile-app">Mobile App Development</option>
                            <option value="ai-solutions">AI &amp; Machine Learning Solutions</option>
                            <option value="academy">Academy &amp; Training Programs</option>
                            <option value="other">Other Inquiry</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="font-label text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
                          Estimated Budget *
                        </label>
                        <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
                          {["<$5k", "$5k - $10k", "$10k - $25k", "$25k+"].map((budgetOption) => (
                            <button
                              key={budgetOption}
                              type="button"
                              onClick={() => setFormState({ ...formState, budget: budgetOption })}
                              className={`rounded-xl border p-3 text-xs font-semibold transition-all duration-300 ${
                                formState.budget === budgetOption
                                  ? "border-brand bg-brand/10 text-brand shadow-glow"
                                  : "border-border bg-surface hover:bg-surface-elevated text-muted-foreground"
                              }`}
                            >
                              {budgetOption}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="font-label text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Project Details *
                        </label>
                        <textarea
                          id="message"
                          required
                          rows={4}
                          placeholder="Briefly describe your project requirements, goals, or technologies..."
                          value={formState.message}
                          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all duration-300 resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="shimmer-btn w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-7 py-4 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition disabled:opacity-55"
                      >
                        {loading ? "Sending..." : "Submit Project Inquiry"} <Send className="h-4 w-4" />
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-24 bg-surface/30">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center mb-16">
              <span className="font-label text-xs font-bold uppercase tracking-[0.2em] text-brand-glow">Common Questions</span>
              <h2 className="font-display mt-3 text-3xl font-bold tracking-tight md:text-4xl">Frequently Asked Questions</h2>
            </div>

            <div ref={faqRef} className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <motion.div
                    key={faq.q}
                    custom={index}
                    initial="hidden"
                    animate={faqInView ? "visible" : "hidden"}
                    variants={fadeUp}
                    className="rounded-3xl border border-border bg-card overflow-hidden shadow-card transition-all duration-300"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="w-full flex items-center justify-between gap-4 p-6 text-left font-semibold text-foreground hover:text-brand transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        <HelpCircle className="h-5 w-5 text-brand-glow flex-shrink-0" />
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-4"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
