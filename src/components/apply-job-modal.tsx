import { useState, type FormEvent } from "react";
import { submitLead } from "@/lib/api";
import { X, Send, Briefcase, CheckCircle2, Loader2, Upload } from "lucide-react";

interface ApplyJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: string;
}

export function ApplyJobModal({ isOpen, onClose, defaultRole = "Senior Full Stack Engineer" }: ApplyJobModalProps) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    role: defaultRole,
    experience: "1-3 years",
    portfolioUrl: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await submitLead({
        name: formState.name,
        email: formState.email,
        company: `Phone: ${formState.phone} | Exp: ${formState.experience}`,
        service: `job-application: ${formState.role}`,
        budget: formState.portfolioUrl ? `Portfolio: ${formState.portfolioUrl}` : "Job Applicant",
        message: formState.message || `Application for ${formState.role}. Portfolio: ${formState.portfolioUrl}`,
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setSubmitted(false);
    setFormState({
      name: "",
      email: "",
      phone: "",
      role: defaultRole,
      experience: "1-3 years",
      portfolioUrl: "",
      message: "",
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-card p-6 md:p-8 shadow-glow transition-all">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-surface text-muted-foreground hover:bg-surface/80 hover:text-foreground transition"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center animate-fade-up">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="mt-4 text-2xl font-bold">Application Submitted!</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Thank you, <span className="font-semibold text-foreground">{formState.name}</span>. Our HR and engineering team will review your profile for the <span className="font-semibold text-purple-400">{formState.role}</span> role and contact you via email.
            </p>
            <button
              onClick={handleReset}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-glow">
                <Briefcase className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-xl font-bold">Job Application Form</h3>
                <p className="text-xs text-muted-foreground">Apply for open tech positions at Prowexa Technologies</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand transition"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="rahul@example.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand transition"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Position Applied For *
                  </label>
                  <select
                    value={formState.role}
                    onChange={(e) => setFormState({ ...formState, role: e.target.value })}
                    className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand transition"
                  >
                    <option value="Senior Full Stack Engineer">Senior Full Stack Engineer</option>
                    <option value="Product Designer (UI/UX)">Product Designer (UI/UX)</option>
                    <option value="AI / ML Engineer">AI / ML Engineer</option>
                    <option value="Open Role Application">Open Role / Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Experience Level *
                  </label>
                  <select
                    value={formState.experience}
                    onChange={(e) => setFormState({ ...formState, experience: e.target.value })}
                    className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand transition"
                  >
                    <option value="Fresh Graduate">Fresh Graduate / Student</option>
                    <option value="1-3 years">1 - 3 Years</option>
                    <option value="3-5 years">3 - 5 Years</option>
                    <option value="5+ years">5+ Years Senior</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  LinkedIn / GitHub / Portfolio URL *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://linkedin.com/in/username or https://github.com/username"
                  value={formState.portfolioUrl}
                  onChange={(e) => setFormState({ ...formState, portfolioUrl: e.target.value })}
                  className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Cover Note / Key Projects (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your tech stack expertise and past project achievements..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting Application...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Submit Job Application
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
