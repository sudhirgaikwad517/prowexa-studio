import { useState } from "react";
import type { FormEvent } from "react";
import { SiteHeader } from "./site-header";
import { Footer } from "./footer";
import { SEOHead } from "./seo-head";
import { trackContactFormSubmit, trackPhoneClick, trackEmailClick } from "@/lib/gtag";
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
} from "lucide-react";

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

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    trackContactFormSubmit(formState.service);
    // Simulate API request
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
      a: "For MVPs and standard web/mobile applications, timelines typically range between 6 to 12 weeks. Enterprise platforms or advanced AI integrations may take 4 to 6 months depending on requirements."
    },
    {
      q: "How does the payment model work?",
      a: "We work on a milestone-based payment structure. A kick-off deposit is paid, followed by staggered disbursements tied to explicit deliverables (e.g., UI/UX approved, Beta Release, Production Deployment)."
    },
    {
      q: "Do you offer post-launch support and maintenance?",
      a: "Yes. Every project includes 30 days of complimentary hypercare support. After that, we offer monthly SLA agreements covering security patches, feature additions, cloud monitoring, and bug fixes."
    },
    {
      q: "Can you help with app store submissions and cloud setup?",
      a: "Absolutely. We handle AWS/Vercel/Google Cloud provisioning, domain setup, DNS mapping, and publishing mobile applications to the Apple App Store and Google Play Store."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Contact Us & Get a Quote | Prowexa Technologies Pune"
        description="Get in touch with Prowexa Technologies in Balewadi, Pune. Schedule a project consultation for web, mobile app, AI, or enterprise software development."
        canonicalPath="/contact"
      />
      <SiteHeader />

      <main>
        {/* Header */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-brand/10 via-transparent to-transparent opacity-50" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-glow">Get In Touch</span>
            <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-6xl">Let's Connect</h1>
            <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
              Have an idea, project, or training inquiry? Fill out the form or schedule a call, and we'll reply within 24 hours.
            </p>
          </div>
        </section>

        {/* Contact Grid */}
        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-12 items-start">
              {/* Information */}
              <div className="lg:col-span-5 space-y-8">
                <div className="rounded-3xl border border-border bg-card p-8 shadow-card">
                  <h2 className="text-xl font-bold mb-6">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <a
                      href="mailto:info@prowexa.com"
                      className="flex items-start gap-4 group text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground shadow-glow">
                        <Mail className="h-5 w-5" />
                      </span>
                      <div>
                        <span className="text-xs uppercase tracking-wider font-semibold block text-brand-glow">Email Us</span>
                        <p className="mt-1 font-medium text-foreground group-hover:text-brand transition-colors">info@prowexa.com</p>
                        <p className="text-xs mt-0.5">General &amp; project inquiries</p>
                      </div>
                    </a>

                    <a
                      href="tel:+917030247209"
                      className="flex items-start gap-4 group text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground shadow-glow">
                        <Phone className="h-5 w-5" />
                      </span>
                      <div>
                        <span className="text-xs uppercase tracking-wider font-semibold block text-brand-glow">Call Us</span>
                        <p className="mt-1 font-medium text-foreground group-hover:text-brand transition-colors">+91 7030 347 209</p>
                        <p className="text-xs mt-0.5">Mon-Sat, 10 AM - 7 PM IST</p>
                      </div>
                    </a>

                    <div className="flex items-start gap-4 text-muted-foreground">
                      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground shadow-glow">
                        <MapPin className="h-5 w-5" />
                      </span>
                      <div>
                        <span className="text-xs uppercase tracking-wider font-semibold block text-brand-glow">Office Location</span>
                        <p className="mt-1 font-medium text-foreground">Prowexa Technologies Pvt. Ltd.</p>
                        <p className="text-xs mt-0.5">Pune, Maharashtra, India</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Calendar Integration Mock */}
                <div className="rounded-3xl border border-border bg-gradient-hero p-8 shadow-card relative overflow-hidden">
                  <div className="absolute -right-20 -bottom-20 h-40 w-40 rounded-full bg-gradient-brand opacity-20 blur-2xl" />
                  <h3 className="text-lg font-bold">Prefer a direct call?</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    Book a free 30-minute discovery call directly on our calendar to discuss project details.
                  </p>
                  <a
                    href="https://calendly.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-xs font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition"
                  >
                    Schedule Calendar Meeting <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              {/* Inquiry Form */}
              <div className="lg:col-span-7">
                <div className="rounded-[2rem] border border-border bg-card p-8 md:p-10 shadow-card">
                  {submitted ? (
                    <div className="text-center py-12">
                      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 mx-auto mb-6">
                        <CheckCircle className="h-8 w-8" />
                      </span>
                      <h2 className="text-2xl font-bold text-foreground">Message Sent Successfully!</h2>
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
                      <h2 className="text-xl font-bold">Inquiry Form</h2>
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your Name *</label>
                          <input
                            type="text"
                            id="name"
                            required
                            placeholder="e.g. Rahul Patil"
                            value={formState.name}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus:border-brand focus:ring-1 focus:ring-brand outline-none transition"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Work Email *</label>
                          <input
                            type="email"
                            id="email"
                            required
                            placeholder="e.g. rahul@company.com"
                            value={formState.email}
                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus:border-brand focus:ring-1 focus:ring-brand outline-none transition"
                          />
                        </div>
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label htmlFor="company" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Company Name</label>
                          <input
                            type="text"
                            id="company"
                            placeholder="e.g. Acme Corp"
                            value={formState.company}
                            onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus:border-brand focus:ring-1 focus:ring-brand outline-none transition"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="service" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Service Required *</label>
                          <select
                            id="service"
                            value={formState.service}
                            onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus:border-brand focus:ring-1 focus:ring-brand outline-none transition"
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
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">Estimated Budget *</label>
                        <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
                          {["<$5k", "$5k - $10k", "$10k - $25k", "$25k+"].map((budgetOption) => (
                            <button
                              key={budgetOption}
                              type="button"
                              onClick={() => setFormState({ ...formState, budget: budgetOption })}
                              className={`rounded-xl border p-3 text-xs font-semibold transition ${
                                formState.budget === budgetOption
                                  ? "border-brand bg-brand/10 text-brand"
                                  : "border-border bg-surface hover:bg-surface-elevated text-muted-foreground"
                              }`}
                            >
                              {budgetOption}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Project Details *</label>
                        <textarea
                          id="message"
                          required
                          rows={4}
                          placeholder="Briefly describe your project requirements, goals, or technologies..."
                          value={formState.message}
                          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus:border-brand focus:ring-1 focus:ring-brand outline-none transition resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-7 py-4 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition disabled:opacity-55"
                      >
                        {loading ? "Sending..." : "Submit Project Inquiry"} <Send className="h-4 w-4" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-24 bg-surface/30">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center mb-16">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-glow">Common Questions</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div
                    key={faq.q}
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
                      <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-4">
                        {faq.a}
                      </div>
                    )}
                  </div>
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
