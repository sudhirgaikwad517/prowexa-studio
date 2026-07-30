import { useState, type FormEvent } from "react";
import { submitLead } from "@/lib/api";
import { X, Send, GraduationCap, CheckCircle2, Loader2 } from "lucide-react";

interface AcademyEnquireModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourse?: string;
}

export function AcademyEnquireModal({ isOpen, onClose, defaultCourse = "Java Full Stack Development" }: AcademyEnquireModalProps) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    course: defaultCourse,
    qualification: "Undergraduate / Graduate",
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
        company: `Phone: ${formState.phone} | Qualification: ${formState.qualification}`,
        service: `academy-enquiry: ${formState.course}`,
        budget: "Academy Student Inquiry",
        message: formState.message || `Interested in enrolling for ${formState.course}`,
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
      course: defaultCourse,
      qualification: "Undergraduate / Graduate",
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
            <h3 className="mt-4 text-2xl font-bold">Inquiry Received!</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Thank you, <span className="font-semibold text-foreground">{formState.name}</span>. Our Prowexa Academy counselor will reach out to you via WhatsApp / Phone shortly with course syllabus and batch details.
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
                <GraduationCap className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-xl font-bold">Enquire Now — Prowexa Academy</h3>
                <p className="text-xs text-muted-foreground">Bridge Academia & Industry with Real Software Training</p>
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
                  placeholder="e.g. Ananya Deshmukh"
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
                    placeholder="student@example.com"
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

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Select Course / Program *
                </label>
                <select
                  value={formState.course}
                  onChange={(e) => setFormState({ ...formState, course: e.target.value })}
                  className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand transition"
                >
                  <option value="Java Full Stack Development">Java Full Stack Development & Microservices</option>
                  <option value="MERN Stack Engineering">MERN Stack Engineering (React, Node, Mongo, TS)</option>
                  <option value="Mobile App Development">Mobile App Development (React Native & Flutter)</option>
                  <option value="AI & Data Engineering">Artificial Intelligence & Data Engineering</option>
                  <option value="Software Internship Program">6-Month Industry Software Internship</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Message / Queries (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Ask about batch timings, fee structure, placement assistance..."
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
                    Submitting Inquiry...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Submit Academy Inquiry
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
