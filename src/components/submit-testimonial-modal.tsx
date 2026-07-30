import { useState, type FormEvent } from "react";
import { submitTestimonial } from "@/lib/testimonials";
import { X, Send, Star, CheckCircle2, Loader2 } from "lucide-react";

interface SubmitTestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function SubmitTestimonialModal({ isOpen, onClose, onSuccess }: SubmitTestimonialModalProps) {
  const [formState, setFormState] = useState({
    name: "",
    role: "",
    type: "client" as "client" | "academy",
    company_or_course: "",
    quote: "",
    rating: 5,
    avatar_url: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await submitTestimonial({
        ...formState,
        is_published: true, // Auto-publish so it displays on the frontend live immediately!
      });
      setSubmitted(true);
      if (onSuccess) onSuccess();
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setSubmitted(false);
    setFormState({
      name: "",
      role: "",
      type: "client",
      company_or_course: "",
      quote: "",
      rating: 5,
      avatar_url: "",
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
            <h3 className="mt-4 text-2xl font-bold">Review Submitted!</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Thank you, <span className="font-semibold text-foreground">{formState.name}</span>. Your testimonial has been submitted for review and will appear live on Prowexa after admin approval.
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
                <Star className="h-5 w-5 fill-current" />
              </span>
              <div>
                <h3 className="text-xl font-bold">Submit Your Testimonial</h3>
                <p className="text-xs text-muted-foreground">Share your experience working with Prowexa Technologies or Academy</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Category *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormState({ ...formState, type: "client" })}
                    className={`rounded-xl border px-4 py-2.5 text-xs font-semibold transition ${
                      formState.type === "client"
                        ? "border-brand bg-gradient-brand text-primary-foreground shadow-glow"
                        : "border-border bg-surface text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Enterprise / Client
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormState({ ...formState, type: "academy" })}
                    className={`rounded-xl border px-4 py-2.5 text-xs font-semibold transition ${
                      formState.type === "academy"
                        ? "border-brand bg-gradient-brand text-primary-foreground shadow-glow"
                        : "border-border bg-surface text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Academy Student
                  </button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Siddharth Mehta"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Title / Role *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={formState.type === "client" ? "e.g. CTO, CapitalVibe" : "e.g. Full Stack Student"}
                    value={formState.role}
                    onChange={(e) => setFormState({ ...formState, role: e.target.value })}
                    className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Company or Course Name
                </label>
                <input
                  type="text"
                  placeholder={formState.type === "client" ? "Company Name" : "Course Name (e.g. Java Full Stack)"}
                  value={formState.company_or_course}
                  onChange={(e) => setFormState({ ...formState, company_or_course: e.target.value })}
                  className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Rating *
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormState({ ...formState, rating: star })}
                      className="p-1 text-amber-400 transition hover:scale-110"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= formState.rating ? "fill-amber-400 text-amber-400" : "text-border"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Your Testimonial / Feedback *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us about your project, learning outcomes, or experience with Prowexa..."
                  value={formState.quote}
                  onChange={(e) => setFormState({ ...formState, quote: e.target.value })}
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
                    Submitting Review...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Submit Testimonial for Review
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
