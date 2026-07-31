import { useState, useEffect } from "react";
import { Link, useParams } from "@tanstack/react-router";
import { SiteHeader } from "./site-header";
import { Footer } from "./footer";
import { SEOHead } from "./seo-head";
import { fetchPublishedBlogs, fallbackBlogs, type BlogData } from "@/lib/blogs";
import { toast } from "sonner";
import {
  Calendar,
  User,
  Clock,
  ArrowLeft,
  Share2,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  MessageCircle,
  Copy,
  Check,
  BookOpen,
  Sparkles,
} from "lucide-react";

export function BlogDetailPage() {
  const { slug } = useParams({ strict: false }) as { slug?: string };
  const [blog, setBlog] = useState<BlogData | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  const currentUrl = typeof window !== "undefined" ? window.location.href : `https://www.prowexa.com/blogs/${slug}`;

  useEffect(() => {
    loadBlogDetail();
  }, [slug]);

  async function loadBlogDetail() {
    setLoading(true);
    const allBlogs = await fetchPublishedBlogs();
    const found = allBlogs.find((b) => b.slug === slug) || fallbackBlogs.find((b) => b.slug === slug) || fallbackBlogs[0];
    setBlog(found);
    setLoading(false);
  }

  function handleCopyLink() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      toast.success("Blog link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    }
  }

  function shareToLinkedIn() {
    if (!blog) return;
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function shareToTwitter() {
    if (!blog) return;
    const text = `Check out this article: "${blog.title}" by Prowexa Technologies`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(currentUrl)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function shareToFacebook() {
    if (!blog) return;
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function shareToWhatsApp() {
    if (!blog) return;
    const text = `*${blog.title}*\n\n${blog.description}\n\nRead more at: ${currentUrl}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function shareToInstagram() {
    handleCopyLink();
    toast.info("Link copied! You can now paste and share this article link in Instagram Stories or Bio.");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
        <SiteHeader />
        <div className="py-32 text-center text-muted-foreground animate-pulse">
          Loading article content...
        </div>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
        <SiteHeader />
        <div className="py-32 text-center">
          <h1 className="text-2xl font-bold">Article Not Found</h1>
          <p className="mt-2 text-muted-foreground">The blog post you requested does not exist or has been removed.</p>
          <Link to="/blogs" className="mt-6 inline-flex items-center gap-2 text-brand font-semibold hover:underline">
            <ArrowLeft className="h-4 w-4" /> Back to Blogs
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SEOHead
        title={`${blog.title} | Prowexa Engineering Blog`}
        description={blog.description}
        canonicalUrl={currentUrl}
      />
      <SiteHeader />

      <main className="flex-1 py-16">
        <article className="mx-auto max-w-4xl px-6">
          {/* Back Navigation */}
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-brand transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to All Articles
          </Link>

          {/* Article Header */}
          <header className="mt-8">
            <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
              <span className="inline-flex items-center gap-1.5 text-purple-400 font-semibold bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                <User className="h-3.5 w-3.5" />
                {blog.author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(blog.published_at || blog.created_at || Date.now()).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <h1 className="mt-6 text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
              {blog.title}
            </h1>

            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              {blog.description}
            </p>
          </header>

          {/* Social Share Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
            <div className="flex items-center gap-2">
              <Share2 className="h-4 w-4 text-brand" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Share Article:</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={shareToLinkedIn}
                className="flex h-9 items-center gap-1.5 rounded-full border border-border bg-card px-3.5 text-xs font-semibold text-muted-foreground hover:border-[#0A66C2] hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 transition"
                title="Share on LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </button>

              <button
                onClick={shareToTwitter}
                className="flex h-9 items-center gap-1.5 rounded-full border border-border bg-card px-3.5 text-xs font-semibold text-muted-foreground hover:border-foreground hover:text-foreground hover:bg-surface transition"
                title="Share on X (Twitter)"
              >
                <Twitter className="h-4 w-4" />
                X / Twitter
              </button>

              <button
                onClick={shareToFacebook}
                className="flex h-9 items-center gap-1.5 rounded-full border border-border bg-card px-3.5 text-xs font-semibold text-muted-foreground hover:border-[#1877F2] hover:text-[#1877F2] hover:bg-[#1877F2]/10 transition"
                title="Share on Facebook"
              >
                <Facebook className="h-4 w-4" />
                Facebook
              </button>

              <button
                onClick={shareToWhatsApp}
                className="flex h-9 items-center gap-1.5 rounded-full border border-border bg-card px-3.5 text-xs font-semibold text-muted-foreground hover:border-[#25D366] hover:text-[#25D366] hover:bg-[#25D366]/10 transition"
                title="Share on WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </button>

              <button
                onClick={shareToInstagram}
                className="flex h-9 items-center gap-1.5 rounded-full border border-border bg-card px-3.5 text-xs font-semibold text-muted-foreground hover:border-[#E4405F] hover:text-[#E4405F] hover:bg-[#E4405F]/10 transition"
                title="Share on Instagram"
              >
                <Instagram className="h-4 w-4" />
                Instagram
              </button>

              <button
                onClick={handleCopyLink}
                className="flex h-9 items-center gap-1.5 rounded-full bg-gradient-brand px-4 text-xs font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition"
                title="Copy Link"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </div>

          {/* Cover Image */}
          {blog.cover_image && (
            <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card shadow-card">
              <img
                src={blog.cover_image}
                alt={blog.title}
                className="w-full max-h-[450px] object-cover"
              />
            </div>
          )}

          {/* Article Full Body */}
          <div className="mt-12 space-y-6 text-base leading-relaxed text-foreground/90 font-normal">
            {blog.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="text-base md:text-lg leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Bottom Share & CTA */}
          <div className="mt-16 rounded-3xl border border-border bg-gradient-hero p-8 text-center shadow-glow">
            <h3 className="text-xl font-bold">Found this article insightful?</h3>
            <p className="mt-2 text-xs text-muted-foreground">Share it with your engineering team and network</p>
            <div className="mt-6 flex justify-center gap-3 flex-wrap">
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-2.5 text-xs font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition"
              >
                <Copy className="h-4 w-4" /> Copy Link & Share
              </button>
              <Link
                to="/blogs"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-2.5 text-xs font-semibold text-foreground hover:bg-surface transition"
              >
                Explore More Articles
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
