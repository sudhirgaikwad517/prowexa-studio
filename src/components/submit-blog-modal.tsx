import { useState, type FormEvent } from "react";
import { submitBlog } from "@/lib/blogs";
import { X, Send, FileText, CheckCircle2, Loader2 } from "lucide-react";

interface SubmitBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function SubmitBlogModal({ isOpen, onClose, onSuccess }: SubmitBlogModalProps) {
  const [formState, setFormState] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    author: "",
    cover_image: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  function handleTitleChange(val: string) {
    const autoSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    setFormState({
      ...formState,
      title: val,
      slug: formState.slug || autoSlug,
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await submitBlog({
        ...formState,
        slug: formState.slug || formState.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        is_published: false, // Requires admin approval
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
      title: "",
      slug: "",
      description: "",
      content: "",
      author: "",
      cover_image: "",
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-border bg-card p-6 md:p-8 shadow-glow transition-all">
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
            <h3 className="mt-4 text-2xl font-bold">Blog Article Submitted!</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Thank you, <span className="font-semibold text-foreground">{formState.author}</span>. Your blog post draft has been submitted for editorial review and will be published live after admin approval.
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
                <FileText className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-xl font-bold">Write / Submit a Blog Article</h3>
                <p className="text-xs text-muted-foreground">Share technical insights, engineering guides, and technology trends</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Scaling React 19 Micro-frontends on Vercel"
                  value={formState.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand transition"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="scaling-react-19-microfrontends"
                    value={formState.slug}
                    onChange={(e) => setFormState({ ...formState, slug: e.target.value })}
                    className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Author Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tech Team / Author Name"
                    value={formState.author}
                    onChange={(e) => setFormState({ ...formState, author: e.target.value })}
                    className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Short Summary / Abstract *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Brief 1-2 sentence overview of the article..."
                  value={formState.description}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                  className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Cover Image URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/blog-cover.jpg"
                  value={formState.cover_image}
                  onChange={(e) => setFormState({ ...formState, cover_image: e.target.value })}
                  className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Full Article Content (Markdown or Text) *
                </label>
                <textarea
                  rows={8}
                  required
                  placeholder="Write your article content here..."
                  value={formState.content}
                  onChange={(e) => setFormState({ ...formState, content: e.target.value })}
                  className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand transition resize-y font-mono"
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
                    Submitting Article...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Submit Blog Article for Review
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
