import { useState } from "react";
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
  Send
} from "lucide-react";
import { SiteHeader } from "./site-header";
import { Footer } from "./footer";
import { SEOHead } from "./seo-head";
import { ApplyJobModal } from "./apply-job-modal";

export function CareersPage() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState("Senior Full Stack Engineer");

  function openApplyModal(jobTitle?: string) {
    if (jobTitle) setSelectedJob(jobTitle);
    setIsApplyModalOpen(true);
  }

  const jobs = [
    {
      title: "Senior Full Stack Engineer",
      type: "Full-time",
      location: "Pune / Remote",
      category: "Engineering",
      description: "Join our core team to build scalable digital products using modern tech stacks."
    },
    {
      title: "Product Designer (UI/UX)",
      type: "Full-time",
      location: "Pune",
      category: "Design",
      description: "Craft beautiful, intuitive user experiences for web and mobile applications."
    },
    {
      title: "AI / ML Engineer",
      type: "Full-time",
      location: "Remote",
      category: "Engineering",
      description: "Implement cutting-edge AI features and LLM integrations for our product portfolio."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SEOHead
        title="Careers & Open Tech Roles | Prowexa Technologies Pune"
        description="Join Prowexa Technologies. We are hiring Senior Full Stack Engineers, UI/UX Designers, React/Flutter Developers, and AI Engineers in Pune & Remote."
        canonicalPath="/careers"
      />
      <SiteHeader />
      
      <main className="flex-1">
        {/* Careers Hero */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent opacity-50" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-xs text-purple-400 backdrop-blur-sm animate-fade-up">
              <Sparkles className="h-3.5 w-3.5" />
              Join the Prowexa Team
            </div>
            <h1 className="mt-8 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl animate-fade-up">
              Build the <span className="text-gradient-purple">Future</span> With Us
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed animate-fade-up">
              We're looking for passionate creators, thinkers, and builders to help us transform ideas into 
              world-class digital products. Work on exciting projects with global impact.
            </p>
          </div>
        </section>

        {/* Culture Section */}
        <section className="py-24 bg-surface/30">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold md:text-4xl">Why Work at Prowexa?</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  At Prowexa, we foster a culture of innovation, ownership, and continuous learning. 
                  We believe in building products that solve real problems, and we know that starts with an 
                  exceptional team.
                </p>
                <div className="mt-8 space-y-4">
                  {[
                    "Ownership & Autonomy",
                    "Modern Tech Stack (React, Next.js, AI)",
                    "Competitive Compensation",
                    "Flexible Work Environment",
                    "Fast-paced Startup Culture"
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-purple-500" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-3xl border border-border bg-card p-6 shadow-card animate-fade-up">
                    <Users className="h-8 w-8 text-purple-400 mb-4" />
                    <h3 className="font-bold text-lg">Collaborative Team</h3>
                    <p className="text-sm text-muted-foreground mt-2">Work with the brightest minds in engineering and design.</p>
                  </div>
                  <div className="rounded-3xl border border-border bg-card p-6 shadow-card animate-fade-up">
                    <Zap className="h-8 w-8 text-purple-400 mb-4" />
                    <h3 className="font-bold text-lg">Fast Execution</h3>
                    <p className="text-sm text-muted-foreground mt-2">We value speed and shipping quality products quickly.</p>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="rounded-3xl border border-border bg-card p-6 shadow-card animate-fade-up">
                    <Trophy className="h-8 w-8 text-purple-400 mb-4" />
                    <h3 className="font-bold text-lg">Impactful Projects</h3>
                    <p className="text-sm text-muted-foreground mt-2">Build products that scale and make a real difference.</p>
                  </div>
                  <div className="rounded-3xl border border-border bg-card p-6 shadow-card animate-fade-up">
                    <Globe className="h-8 w-8 text-purple-400 mb-4" />
                    <h3 className="font-bold text-lg">Global Reach</h3>
                    <p className="text-sm text-muted-foreground mt-2">Our products are used by businesses and users worldwide.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Job Listings */}
        <section id="openings" className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <h2 className="text-3xl font-bold md:text-4xl">Open Positions</h2>
                <p className="mt-2 text-muted-foreground">Find your next challenge and join our mission.</p>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                Applications active for all roles
              </div>
            </div>

            <div className="grid gap-4">
              {jobs.map((job) => (
                <div 
                  key={job.title} 
                  className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-card hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1 animate-fade-up"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
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
                      <h3 className="text-2xl font-bold group-hover:text-purple-400 transition-colors">
                        {job.title}
                      </h3>
                      <p className="mt-3 text-muted-foreground leading-relaxed max-w-2xl">
                        {job.description}
                      </p>
                    </div>
                    <button 
                      onClick={() => openApplyModal(job.title)}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition-all duration-300 whitespace-nowrap"
                    >
                      Apply Now <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center rounded-[2.5rem] bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/10 p-12 shadow-glow">
              <h3 className="text-2xl font-bold">Don't see a perfect fit?</h3>
              <p className="mt-4 text-muted-foreground">
                We're always looking for talented individuals. Submit an open application and tell us 
                how you can make an impact at Prowexa.
              </p>
              <button 
                onClick={() => openApplyModal("Open Role Application")}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition"
              >
                Send Open Application <Briefcase className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <ApplyJobModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        defaultRole={selectedJob}
      />

      <Footer />
    </div>
  );
}
