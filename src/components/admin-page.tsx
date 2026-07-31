import { useState, useEffect, type FormEvent } from "react";
import { SiteHeader } from "./site-header";
import { Footer } from "./footer";
import { SEOHead } from "./seo-head";
import { toast } from "sonner";
import {
  getEmailSettings,
  saveEmailSettings,
  type EmailConfigSettings,
} from "@/lib/email-settings";
import { triggerEmailNotification } from "@/lib/email-service";
import {
  fetchAllLeadsAdmin,
  updateLeadStatus,
  deleteLead,
  type LeadRecord,
} from "@/lib/leads";
import {
  fetchAllCaseStudiesAdmin,
  saveCaseStudy,
  deleteCaseStudy,
  type CaseStudyData,
} from "@/lib/case-studies";
import {
  fetchAllTestimonialsAdmin,
  updateTestimonialStatus,
  deleteTestimonial,
  type TestimonialData,
} from "@/lib/testimonials";
import {
  fetchAllBlogsAdmin,
  updateBlogStatus,
  deleteBlog,
  type BlogData,
} from "@/lib/blogs";
import {
  ShieldCheck,
  Lock,
  Layers,
  Star,
  FileText,
  Inbox,
  Briefcase,
  Plus,
  Trash2,
  Check,
  Eye,
  CheckCircle2,
  Clock,
  Building2,
  Sparkles,
  RefreshCw,
  LogOut,
  ChevronRight,
  ExternalLink,
  Phone,
  Mail,
  User,
  X,
  Settings,
  Send,
  Sliders,
} from "lucide-react";

export function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [activeTab, setActiveTab] = useState<"leads" | "applications" | "casestudies" | "testimonials" | "blogs" | "email_settings">("leads");

  // Data states
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudyData[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [loading, setLoading] = useState(false);

  // Email Settings State
  const [emailConfig, setEmailConfig] = useState<EmailConfigSettings>(getEmailSettings());
  const [testEmailRecipient, setTestEmailRecipient] = useState("connect@prowexa.com");

  // Case Study Upload Form State
  const [showCaseStudyForm, setShowCaseStudyForm] = useState(false);
  const [editingCaseStudy, setEditingCaseStudy] = useState<CaseStudyData | null>(null);
  const [csForm, setCsForm] = useState({
    title: "",
    client: "",
    industry: "",
    summary: "",
    challenge: "",
    solution: "",
    resultsStr: "",
    techStackStr: "",
    metricKey1: "Latency Reduction",
    metricVal1: "74%",
    metricKey2: "Uptime",
    metricVal2: "99.99%",
    metricKey3: "Cost Saved",
    metricVal3: "40%",
    cover_image: "",
    is_published: true,
  });

  useEffect(() => {
    const savedPin = localStorage.getItem("prowexa_admin_authed");
    if (savedPin === "true") {
      setIsAuthenticated(true);
      loadAdminData();
    }
  }, []);

  async function loadAdminData() {
    setLoading(true);
    try {
      const [leadsData, csData, tData, bData] = await Promise.all([
        fetchAllLeadsAdmin(),
        fetchAllCaseStudiesAdmin(),
        fetchAllTestimonialsAdmin(),
        fetchAllBlogsAdmin(),
      ]);
      setLeads(leadsData);
      setCaseStudies(csData);
      setTestimonials(tData);
      setBlogs(bData);
    } finally {
      setLoading(false);
    }
  }

  function handleAuthSubmit(e: FormEvent) {
    e.preventDefault();
    if (pinInput === "prowexa2026" || pinInput === "admin123") {
      setIsAuthenticated(true);
      localStorage.setItem("prowexa_admin_authed", "true");
      toast.success("Welcome Admin! Access Granted.");
      loadAdminData();
    } else {
      toast.error("Incorrect Admin PIN! Default PIN: prowexa2026");
    }
  }

  function handleLogout() {
    setIsAuthenticated(false);
    localStorage.removeItem("prowexa_admin_authed");
    toast.info("Logged out of Admin Portal");
  }

  // Save Email Settings
  function handleSaveEmailConfig(e: FormEvent) {
    e.preventDefault();
    saveEmailSettings(emailConfig);
    toast.success("Email Aliases & MNC Signatures Saved!");
  }

  // Trigger Live Test MNC Email from Admin Panel
  async function handleSendTestEmail(type: "job_application" | "contact") {
    if (!testEmailRecipient) {
      toast.error("Please enter a test recipient email.");
      return;
    }

    toast.info(`Sending test MNC email (${type}) to ${testEmailRecipient}...`);

    const res = await triggerEmailNotification({
      type,
      recipientEmail: testEmailRecipient,
      recipientName: "Test Recipient",
      senderEmail: type === "job_application" ? emailConfig.hrSenderEmail : emailConfig.businessSenderEmail,
      senderName: type === "job_application" ? emailConfig.hrSenderName : emailConfig.businessSenderName,
      signatureName: type === "job_application" ? emailConfig.hrSignatureName : emailConfig.businessSignatureName,
      signatureDesignation: type === "job_application" ? emailConfig.hrSignatureDesignation : emailConfig.businessSignatureDesignation,
      details: {
        role: type === "job_application" ? "Senior Full Stack Engineer" : undefined,
        service: type === "contact" ? "Custom Enterprise ERP Platform" : undefined,
        message: "This is a live MNC-grade email template test triggered from Prowexa Admin Panel.",
      },
    });

    if (res.success) {
      toast.success(`MNC Test Email sent to ${testEmailRecipient}! Check inbox.`);
    }
  }

  // Lead status actions
  async function handleLeadStatus(id: string, status: "new" | "contacted" | "archived") {
    await updateLeadStatus(id, status);
    setLeads(leads.map((l) => (l.id === id ? { ...l, status } : l)));
    toast.success(`Marked as ${status}`);
  }

  async function handleLeadDelete(id: string) {
    await deleteLead(id);
    setLeads(leads.filter((l) => l.id !== id));
    toast.success("Record removed");
  }

  // Testimonial status actions
  async function handleTestimonialApprove(id: string, currentStatus: boolean) {
    const newStatus = !currentStatus;
    await updateTestimonialStatus(id, newStatus);
    setTestimonials(testimonials.map((t) => (t.id === id ? { ...t, is_published: newStatus } : t)));
    toast.success(newStatus ? "Testimonial Approved & Published!" : "Testimonial unpublished");
    if (newStatus) {
      const target = testimonials.find((t) => t.id === id);
      if (target) {
        triggerEmailNotification({
          type: "testimonial_approved",
          recipientEmail: "connect@prowexa.com",
          recipientName: target.name,
        });
      }
    }
  }

  async function handleTestimonialDelete(id: string) {
    await deleteTestimonial(id);
    setTestimonials(testimonials.filter((t) => t.id !== id));
    toast.success("Testimonial deleted");
  }

  // Blog status actions
  async function handleBlogApprove(id: string, currentStatus: boolean) {
    const newStatus = !currentStatus;
    await updateBlogStatus(id, newStatus);
    setBlogs(blogs.map((b) => (b.id === id ? { ...b, is_published: newStatus } : b)));
    toast.success(newStatus ? "Blog Approved & Published!" : "Blog unpublished");
    if (newStatus) {
      const target = blogs.find((b) => b.id === id);
      if (target) {
        triggerEmailNotification({
          type: "blog_approved",
          recipientEmail: "connect@prowexa.com",
          recipientName: target.author,
          details: { title: target.title, slug: target.slug },
        });
      }
    }
  }

  async function handleBlogDelete(id: string) {
    await deleteBlog(id);
    setBlogs(blogs.filter((b) => b.id !== id));
    toast.success("Blog deleted");
  }

  // Case Study Actions
  function openNewCaseStudy() {
    setEditingCaseStudy(null);
    setCsForm({
      title: "",
      client: "",
      industry: "Financial Services / Software",
      summary: "",
      challenge: "",
      solution: "",
      resultsStr: "99.99% system uptime achieved.\nLatency reduced by 74%.\nOperational costs reduced by 40%.",
      techStackStr: "Node.js, React, TypeScript, PostgreSQL, Redis, Docker",
      metricKey1: "Latency Reduction",
      metricVal1: "74%",
      metricKey2: "Uptime",
      metricVal2: "99.99%",
      metricKey3: "Cost Saved",
      metricVal3: "40%",
      cover_image: "/assets/hero-bg.webp",
      is_published: true,
    });
    setShowCaseStudyForm(true);
  }

  async function handleCaseStudySave(e: FormEvent) {
    e.preventDefault();
    const results = csForm.resultsStr
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const tech_stack = csForm.techStackStr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const metrics: Record<string, string> = {};
    if (csForm.metricKey1 && csForm.metricVal1) metrics[csForm.metricKey1] = csForm.metricVal1;
    if (csForm.metricKey2 && csForm.metricVal2) metrics[csForm.metricKey2] = csForm.metricVal2;
    if (csForm.metricKey3 && csForm.metricVal3) metrics[csForm.metricKey3] = csForm.metricVal3;

    const payload: CaseStudyData = {
      id: editingCaseStudy?.id,
      title: csForm.title,
      slug: csForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      client: csForm.client,
      industry: csForm.industry,
      summary: csForm.summary,
      challenge: csForm.challenge,
      solution: csForm.solution,
      results,
      tech_stack,
      metrics,
      cover_image: csForm.cover_image || "/assets/hero-bg.webp",
      is_published: csForm.is_published,
    };

    await saveCaseStudy(payload);
    toast.success("Case Study Published Live!");
    setShowCaseStudyForm(false);
    loadAdminData();
  }

  async function handleCaseStudyDelete(id: string) {
    await deleteCaseStudy(id);
    setCaseStudies(caseStudies.filter((cs) => cs.id !== id));
    toast.success("Case Study removed");
  }

  // Filter leads vs job applications
  const jobApplications = leads.filter((l) => l.service?.startsWith("job-application:"));
  const contactLeads = leads.filter((l) => !l.service?.startsWith("job-application:"));

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SEOHead
        title="Admin Management Portal | Prowexa Technologies"
        description="Prowexa Technologies Admin Portal for managing leads, job applications, case studies, testimonials, and blog approvals."
        canonicalUrl="https://www.prowexa.com/admin"
      />
      <SiteHeader />

      <main className="flex-1 py-12">
        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="mx-auto max-w-md px-6 py-16 animate-fade-up">
            <div className="overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-glow text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-glow">
                <Lock className="h-8 w-8" />
              </div>
              <h1 className="mt-6 text-2xl font-bold">Admin Portal Login</h1>
              <p className="mt-2 text-xs text-muted-foreground">
                Enter your Admin Security PIN to access the Prowexa Management Dashboard.
              </p>

              <form onSubmit={handleAuthSubmit} className="mt-6 space-y-4 text-left">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Admin Passcode / PIN *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter admin PIN (default: prowexa2026)"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-brand transition tracking-widest text-center text-lg"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition"
                >
                  <ShieldCheck className="h-4 w-4" />
                  Unlock Admin Dashboard
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Admin Dashboard Interface */
          <div className="mx-auto max-w-7xl px-6">
            {/* Header & Quick Stats */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-border pb-8">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                    Admin Authenticated
                  </span>
                  <span className="text-xs text-muted-foreground">Prowexa Control System</span>
                </div>
                <h1 className="mt-2 text-3xl font-bold tracking-tight">Executive Management Portal</h1>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={loadAdminData}
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-xs font-semibold hover:border-brand transition disabled:opacity-50"
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                  Refresh
                </button>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-xs font-semibold text-rose-400 hover:border-rose-500/50 transition"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs uppercase tracking-wider font-semibold">Contact Leads</span>
                  <Inbox className="h-5 w-5 text-brand" />
                </div>
                <div className="mt-2 text-3xl font-bold">{contactLeads.length}</div>
                <p className="mt-1 text-xs text-emerald-400">
                  {contactLeads.filter((l) => l.status === "new").length} New Leads
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs uppercase tracking-wider font-semibold">Job Applicants</span>
                  <Briefcase className="h-5 w-5 text-purple-400" />
                </div>
                <div className="mt-2 text-3xl font-bold">{jobApplications.length}</div>
                <p className="mt-1 text-xs text-purple-400">
                  {jobApplications.filter((l) => l.status === "new").length} New Candidates
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs uppercase tracking-wider font-semibold">Case Studies</span>
                  <Layers className="h-5 w-5 text-brand" />
                </div>
                <div className="mt-2 text-3xl font-bold">{caseStudies.length}</div>
                <p className="mt-1 text-xs text-muted-foreground">Active Case Portfolio</p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs uppercase tracking-wider font-semibold">Testimonials</span>
                  <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                </div>
                <div className="mt-2 text-3xl font-bold">{testimonials.length}</div>
                <p className="mt-1 text-xs text-amber-400">
                  {testimonials.filter((t) => !t.is_published).length} Pending Approval
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs uppercase tracking-wider font-semibold">Blog Posts</span>
                  <FileText className="h-5 w-5 text-brand" />
                </div>
                <div className="mt-2 text-3xl font-bold">{blogs.length}</div>
                <p className="mt-1 text-xs text-amber-400">
                  {blogs.filter((b) => !b.is_published).length} Pending Review
                </p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="mt-10 flex border-b border-border overflow-x-auto">
              {[
                { id: "leads", label: `Leads & Inquiries (${contactLeads.length})`, icon: Inbox },
                { id: "applications", label: `Job Applications (${jobApplications.length})`, icon: Briefcase },
                { id: "casestudies", label: `Case Studies (${caseStudies.length})`, icon: Layers },
                { id: "testimonials", label: `Testimonials (${testimonials.length})`, icon: Star },
                { id: "blogs", label: `Blogs (${blogs.length})`, icon: FileText },
                { id: "email_settings", label: `Email Templates & Signatures`, icon: Settings },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold border-b-2 transition whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-brand text-brand bg-surface/50"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB CONTENT 1: CONTACT LEADS MANAGER */}
            {activeTab === "leads" && (
              <div className="mt-8 space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Client Inquiries & Contact Leads</h2>
                  <span className="text-xs text-muted-foreground">Direct Lead Submissions</span>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-card">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-surface/80 text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                      <tr>
                        <th className="px-6 py-4">Name / Contact</th>
                        <th className="px-6 py-4">Service & Budget</th>
                        <th className="px-6 py-4">Message</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {contactLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-surface/30 transition">
                          <td className="px-6 py-4">
                            <div className="font-semibold text-foreground">{lead.name}</div>
                            <div className="text-xs text-muted-foreground">{lead.email}</div>
                            {lead.company && <div className="text-xs text-brand mt-0.5">{lead.company}</div>}
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-block rounded-md bg-surface px-2.5 py-1 text-xs font-semibold text-foreground">
                              {lead.service}
                            </span>
                            {lead.budget && (
                              <div className="text-xs text-muted-foreground mt-1">{lead.budget}</div>
                            )}
                          </td>
                          <td className="px-6 py-4 max-w-md">
                            <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                              {lead.message}
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                                lead.status === "new"
                                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                  : lead.status === "contacted"
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                  : "bg-surface text-muted-foreground"
                              }`}
                            >
                              {lead.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right space-x-2">
                            {lead.status !== "contacted" && (
                              <button
                                onClick={() => handleLeadStatus(lead.id, "contacted")}
                                className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20 transition"
                              >
                                Mark Contacted
                              </button>
                            )}
                            <button
                              onClick={() => handleLeadDelete(lead.id)}
                              className="p-1.5 text-muted-foreground hover:text-rose-400 transition"
                              title="Delete Lead"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: SEPARATE JOB APPLICATIONS MANAGER */}
            {activeTab === "applications" && (
              <div className="mt-8 space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-purple-400">Job Applications & Hiring Portal</h2>
                    <p className="text-xs text-muted-foreground">Candidate resumes, experience levels, and portfolio submissions</p>
                  </div>
                  <span className="rounded-full bg-purple-500/10 border border-purple-500/20 px-3 py-1 text-xs font-semibold text-purple-400">
                    {jobApplications.length} Candidates Applied
                  </span>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-card">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-surface/80 text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                      <tr>
                        <th className="px-6 py-4">Applicant Candidate</th>
                        <th className="px-6 py-4">Role & Experience</th>
                        <th className="px-6 py-4">Portfolio / GitHub Link</th>
                        <th className="px-6 py-4">Cover Note / Details</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {jobApplications.map((app) => {
                        const portfolioUrlMatch = app.budget?.replace(/^Portfolio:\s*/, "") || app.message?.match(/https?:\/\/[^\s]+/)?.[0];
                        const roleTitle = app.service?.replace(/^job-application:\s*/, "") || "Software Engineer";

                        return (
                          <tr key={app.id} className="hover:bg-surface/30 transition">
                            <td className="px-6 py-4">
                              <div className="font-semibold text-foreground flex items-center gap-1.5">
                                <User className="h-3.5 w-3.5 text-purple-400" />
                                {app.name}
                              </div>
                              <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                <Mail className="h-3 w-3" />
                                {app.email}
                              </div>
                              {app.company && (
                                <div className="text-xs text-purple-400 flex items-center gap-1 mt-0.5">
                                  <Phone className="h-3 w-3" />
                                  {app.company}
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-block rounded-md bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 text-xs font-semibold text-purple-300">
                                {roleTitle}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              {portfolioUrlMatch ? (
                                <a
                                  href={portfolioUrlMatch}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 rounded-lg bg-surface border border-border px-3 py-1.5 text-xs font-semibold text-brand hover:underline"
                                >
                                  View Portfolio <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                              ) : (
                                <span className="text-xs text-muted-foreground">Not Provided</span>
                              )}
                            </td>
                            <td className="px-6 py-4 max-w-md">
                              <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                                {app.message}
                              </p>
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                                  app.status === "new"
                                    ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                                    : app.status === "contacted"
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                    : "bg-surface text-muted-foreground"
                                }`}
                              >
                                {app.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right space-x-2">
                              {app.status !== "contacted" && (
                                <button
                                  onClick={() => handleLeadStatus(app.id, "contacted")}
                                  className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20 transition"
                                >
                                  Mark Interviewed
                                </button>
                              )}
                              <button
                                onClick={() => handleLeadDelete(app.id)}
                                className="p-1.5 text-muted-foreground hover:text-rose-400 transition"
                                title="Delete Candidate"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: CASE STUDIES MANAGER */}
            {activeTab === "casestudies" && (
              <div className="mt-8 space-y-6 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Case Studies Manager</h2>
                    <p className="text-xs text-muted-foreground">Upload and manage technical portfolio case studies</p>
                  </div>
                  <button
                    onClick={openNewCaseStudy}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition"
                  >
                    <Plus className="h-4 w-4" />
                    Upload Case Study
                  </button>
                </div>

                {/* Case Study Creation / Edit Form Modal */}
                {showCaseStudyForm && (
                  <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-glow animate-fade-up">
                    <div className="flex items-center justify-between border-b border-border pb-4">
                      <h3 className="text-lg font-bold">Upload New Case Study</h3>
                      <button onClick={() => setShowCaseStudyForm(false)} className="text-muted-foreground hover:text-foreground">
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <form onSubmit={handleCaseStudySave} className="mt-6 space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                            Case Study Title *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="FinTech Microservices Platform"
                            value={csForm.title}
                            onChange={(e) => setCsForm({ ...csForm, title: e.target.value })}
                            className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand transition"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                            Client Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="CapitalVibe Inc."
                            value={csForm.client}
                            onChange={(e) => setCsForm({ ...csForm, client: e.target.value })}
                            className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand transition"
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                            Industry / Sector *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Financial Services / AI"
                            value={csForm.industry}
                            onChange={(e) => setCsForm({ ...csForm, industry: e.target.value })}
                            className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand transition"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                            Cover Image Path / URL
                          </label>
                          <input
                            type="text"
                            placeholder="/assets/hero-bg.webp"
                            value={csForm.cover_image}
                            onChange={(e) => setCsForm({ ...csForm, cover_image: e.target.value })}
                            className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand transition"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                          Executive Summary *
                        </label>
                        <textarea
                          rows={2}
                          required
                          placeholder="Brief 2-line overview of the client project and outcome..."
                          value={csForm.summary}
                          onChange={(e) => setCsForm({ ...csForm, summary: e.target.value })}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand transition resize-none"
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                            The Challenge *
                          </label>
                          <textarea
                            rows={3}
                            required
                            placeholder="Describe legacy bottlenecks, scaling pain points..."
                            value={csForm.challenge}
                            onChange={(e) => setCsForm({ ...csForm, challenge: e.target.value })}
                            className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand transition resize-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                            The Solution *
                          </label>
                          <textarea
                            rows={3}
                            required
                            placeholder="Describe Prowexa's engineering solution & architecture..."
                            value={csForm.solution}
                            onChange={(e) => setCsForm({ ...csForm, solution: e.target.value })}
                            className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand transition resize-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                          Key Results (One outcome per line) *
                        </label>
                        <textarea
                          rows={3}
                          required
                          placeholder="99.99% system uptime achieved.&#10;Latency reduced by 74%."
                          value={csForm.resultsStr}
                          onChange={(e) => setCsForm({ ...csForm, resultsStr: e.target.value })}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand transition resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                          Tech Stack (Comma-separated) *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Node.js, React, PostgreSQL, Docker, Kubernetes"
                          value={csForm.techStackStr}
                          onChange={(e) => setCsForm({ ...csForm, techStackStr: e.target.value })}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand transition"
                        />
                      </div>

                      <div className="flex justify-end gap-3 pt-4 border-t border-border">
                        <button
                          type="button"
                          onClick={() => setShowCaseStudyForm(false)}
                          className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="rounded-xl bg-gradient-brand px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition"
                        >
                          Publish Case Study
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Case Studies Table */}
                <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-card">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-surface/80 text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                      <tr>
                        <th className="px-6 py-4">Title / Client</th>
                        <th className="px-6 py-4">Industry</th>
                        <th className="px-6 py-4">Tech Stack</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {caseStudies.map((cs) => (
                        <tr key={cs.id} className="hover:bg-surface/30 transition">
                          <td className="px-6 py-4">
                            <div className="font-semibold text-foreground">{cs.title}</div>
                            <div className="text-xs text-brand">{cs.client}</div>
                          </td>
                          <td className="px-6 py-4 text-xs text-muted-foreground">{cs.industry}</td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {cs.tech_stack?.slice(0, 4).map((tech) => (
                                <span key={tech} className="rounded-md bg-surface px-2 py-0.5 text-[10px] font-semibold">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => handleCaseStudyDelete(cs.id!)}
                              className="p-1.5 text-muted-foreground hover:text-rose-400 transition"
                              title="Delete Case Study"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB CONTENT 4: TESTIMONIALS MANAGER */}
            {activeTab === "testimonials" && (
              <div className="mt-8 space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Testimonials Approvals</h2>
                  <span className="text-xs text-muted-foreground">Approve submitted client & academy reviews</span>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {testimonials.map((t) => (
                    <div key={t.id} className="rounded-2xl border border-border bg-card p-5 shadow-card flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              t.type === "client"
                                ? "bg-brand/10 text-brand border border-brand/20"
                                : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                            }`}
                          >
                            {t.type === "client" ? "Client Review" : "Academy Student"}
                          </span>
                          <span
                            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                              t.is_published ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                            }`}
                          >
                            {t.is_published ? "Published Live" : "Pending Approval"}
                          </span>
                        </div>
                        <p className="mt-4 text-sm italic text-foreground">"{t.quote}"</p>
                        <div className="mt-4 border-t border-border pt-3 flex items-center justify-between text-xs text-muted-foreground">
                          <div>
                            <span className="font-semibold text-foreground">{t.name}</span> — {t.role}
                          </div>
                          <div className="flex items-center text-amber-400">
                            <Star className="h-3.5 w-3.5 fill-current" />
                            <span className="ml-1 font-bold">{t.rating || 5}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 flex items-center justify-end gap-2 border-t border-border pt-3">
                        <button
                          onClick={() => handleTestimonialApprove(t.id!, t.is_published!)}
                          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                            t.is_published
                              ? "border border-border text-muted-foreground hover:bg-surface"
                              : "bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 shadow-glow"
                          }`}
                        >
                          <Check className="h-3.5 w-3.5" />
                          {t.is_published ? "Unpublish" : "Approve & Publish"}
                        </button>
                        <button
                          onClick={() => handleTestimonialDelete(t.id!)}
                          className="p-1.5 text-muted-foreground hover:text-rose-400 transition"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT 5: BLOGS MANAGER */}
            {activeTab === "blogs" && (
              <div className="mt-8 space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Blog Submissions & Approvals</h2>
                  <span className="text-xs text-muted-foreground">Review & publish submitted blog drafts</span>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {blogs.map((b) => (
                    <div key={b.id} className="rounded-2xl border border-border bg-card p-5 shadow-card flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-brand font-semibold">{b.author}</span>
                          <span
                            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                              b.is_published ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                            }`}
                          >
                            {b.is_published ? "Published Live" : "Pending Review"}
                          </span>
                        </div>
                        <h3 className="mt-3 text-base font-bold">{b.title}</h3>
                        <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{b.description}</p>
                      </div>

                      <div className="mt-5 flex items-center justify-end gap-2 border-t border-border pt-3">
                        <button
                          onClick={() => handleBlogApprove(b.id!, b.is_published!)}
                          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                            b.is_published
                              ? "border border-border text-muted-foreground hover:bg-surface"
                              : "bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 shadow-glow"
                          }`}
                        >
                          <Check className="h-3.5 w-3.5" />
                          {b.is_published ? "Unpublish" : "Approve & Publish"}
                        </button>
                        <button
                          onClick={() => handleBlogDelete(b.id!)}
                          className="p-1.5 text-muted-foreground hover:text-rose-400 transition"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT 6: EMAIL TEMPLATES & SIGNATURES MANAGER */}
            {activeTab === "email_settings" && (
              <div className="mt-8 space-y-8 animate-fade-in">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <Settings className="h-5 w-5 text-brand" />
                      Email Aliases & MNC Signatures Config
                    </h2>
                    <p className="text-xs text-muted-foreground">Manage sender names, emails, and signatures for HR & Client notifications</p>
                  </div>
                </div>

                <form onSubmit={handleSaveEmailConfig} className="space-y-8">
                  {/* HR Email Config Card */}
                  <div className="rounded-3xl border border-purple-500/30 bg-card p-6 md:p-8 shadow-card">
                    <div className="flex items-center gap-3 border-b border-border pb-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        <Briefcase className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="text-lg font-bold">HR / Hiring Email Alias Config</h3>
                        <p className="text-xs text-muted-foreground">Used for Job Applications, candidate receipts, and interview scheduling</p>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                          HR Sender Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={emailConfig.hrSenderName}
                          onChange={(e) => setEmailConfig({ ...emailConfig, hrSenderName: e.target.value })}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                          HR Sender Email Alias *
                        </label>
                        <input
                          type="email"
                          required
                          value={emailConfig.hrSenderEmail}
                          onChange={(e) => setEmailConfig({ ...emailConfig, hrSenderEmail: e.target.value })}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand transition font-mono"
                        />
                      </div>
                    </div>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                          HR Signature Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={emailConfig.hrSignatureName}
                          onChange={(e) => setEmailConfig({ ...emailConfig, hrSignatureName: e.target.value })}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                          HR Signature Designation *
                        </label>
                        <input
                          type="text"
                          required
                          value={emailConfig.hrSignatureDesignation}
                          onChange={(e) => setEmailConfig({ ...emailConfig, hrSignatureDesignation: e.target.value })}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand transition"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Business Email Config Card */}
                  <div className="rounded-3xl border border-blue-500/30 bg-card p-6 md:p-8 shadow-card">
                    <div className="flex items-center gap-3 border-b border-border pb-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        <Inbox className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="text-lg font-bold">Business & Client Inquiry Config</h3>
                        <p className="text-xs text-muted-foreground">Used for Contact forms, quote inquiries, blog approvals & testimonials</p>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                          Business Sender Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={emailConfig.businessSenderName}
                          onChange={(e) => setEmailConfig({ ...emailConfig, businessSenderName: e.target.value })}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                          Business Sender Email Alias *
                        </label>
                        <input
                          type="email"
                          required
                          value={emailConfig.businessSenderEmail}
                          onChange={(e) => setEmailConfig({ ...emailConfig, businessSenderEmail: e.target.value })}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand transition font-mono"
                        />
                      </div>
                    </div>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                          Business Signature Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={emailConfig.businessSignatureName}
                          onChange={(e) => setEmailConfig({ ...emailConfig, businessSignatureName: e.target.value })}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                          Business Signature Designation *
                        </label>
                        <input
                          type="text"
                          required
                          value={emailConfig.businessSignatureDesignation}
                          onChange={(e) => setEmailConfig({ ...emailConfig, businessSignatureDesignation: e.target.value })}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand transition"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition"
                    >
                      <Check className="h-4 w-4" /> Save Configuration Settings
                    </button>
                  </div>
                </form>

                {/* Live Test Email Trigger Box */}
                <div className="rounded-3xl border border-emerald-500/30 bg-card p-6 md:p-8 shadow-glow">
                  <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                    <Send className="h-5 w-5" /> 1-Click Live Test MNC Email Trigger
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Send a real test email to any email address to inspect the MNC template rendering & signatures.
                  </p>

                  <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
                    <input
                      type="email"
                      required
                      placeholder="Enter recipient email (e.g. connect@prowexa.com)"
                      value={testEmailRecipient}
                      onChange={(e) => setTestEmailRecipient(e.target.value)}
                      className="w-full sm:w-80 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand transition"
                    />

                    <button
                      onClick={() => handleSendTestEmail("job_application")}
                      className="w-full sm:w-auto inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-xs font-semibold text-white shadow-glow hover:bg-purple-500 transition whitespace-nowrap"
                    >
                      <Briefcase className="h-4 w-4" /> Send Test HR Candidate Email
                    </button>

                    <button
                      onClick={() => handleSendTestEmail("contact")}
                      className="w-full sm:w-auto inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition whitespace-nowrap"
                    >
                      <Mail className="h-4 w-4" /> Send Test Client Inquiry Email
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
