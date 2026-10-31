import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { SiteHeader } from "./site-header";
import { Footer } from "./footer";
import { SEOHead } from "./seo-head";
import { AcademyEnquireModal } from "./academy-enquire-modal";
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  BookOpen,
  Users,
  Award,
  Briefcase,
  Calendar,
  Clock,
  CheckCircle2,
  ChevronRight,
  Code,
  FileText,
  Send,
} from "lucide-react";

export function AcademyPage() {
  const [isEnquireOpen, setIsEnquireOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("Java Full Stack Development");

  function openEnquire(courseName?: string) {
    if (courseName) setSelectedCourse(courseName);
    setIsEnquireOpen(true);
  }

  const programs = [
    {
      title: "Java Full Stack Development",
      duration: "6 Months",
      type: "Online / Classroom",
      description: "Master core Java, Advanced Java, Spring Boot, Hibernate, microservices, React, and databases. Build robust enterprise-grade applications.",
      syllabus: ["Core Java & OOPS", "Spring Boot & Microservices", "React Front-end Integration", "SQL & NoSQL Databases", "Deployment & AWS Basics"],
      outcome: "Full Stack Java Developer, Backend Engineer"
    },
    {
      title: "Python + AI & Machine Learning",
      duration: "6 Months",
      type: "Online / Classroom",
      description: "Dive deep into Python, Data Science, Machine Learning, Deep Learning, NLP, and AI models integration. Learn to build and deploy intelligent software.",
      syllabus: ["Python Foundations", "Data Analysis (Pandas, NumPy)", "Scikit-Learn Machine Learning", "Neural Networks & TensorFlow", "LLMs & OpenAI Integration"],
      outcome: "AI Engineer, Data Scientist, ML Developer"
    },
    {
      title: "Data Analytics Masterclass",
      duration: "4 Months",
      type: "Online / Classroom",
      description: "Learn to process, analyze, and visualize data to make business decisions. Master Excel, SQL, Tableau, Power BI, and basic Python statistics.",
      syllabus: ["Advanced Excel & Statistics", "SQL Queries & Databases", "Power BI & Tableau Dashboards", "Python for Data Analysis", "Business Case Studies"],
      outcome: "Data Analyst, Business Analyst, BI Developer"
    },
    {
      title: "Corporate Training Program",
      duration: "Custom",
      type: "On-site / Online",
      description: "Customized upskilling programs for engineering teams. Modernize your team's tech stack with hands-on practice and real-world case studies.",
      syllabus: ["Customized Tech Stacks", "Agile & DevOps Workflows", "Hands-on Capstone Projects", "Post-Training Support", "Assessments & Dashboards"],
      outcome: "High Performance Upskilled Development Team"
    }
  ];

  const roadmapSteps = [
    {
      step: "01",
      title: "Enrollment & Orientation",
      desc: "Detailed counseling, syllabus overview, setup of developer environments, and git setup."
    },
    {
      step: "02",
      title: "Hands-on Training",
      desc: "Interactive daily lectures combined with immediate coding exercises and module tests."
    },
    {
      step: "03",
      title: "Capstone Projects",
      desc: "Build 2 major, industry-relevant applications matching enterprise development standards."
    },
    {
      step: "04",
      title: "Internship at Prowexa",
      desc: "Work on live Prowexa projects alongside our engineering team, following real delivery standards."
    },
    {
      step: "05",
      title: "Join the Prowexa Team",
      desc: "Students who complete the program are considered for roles in Prowexa's own engineering team."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SEOHead
        title="Prowexa Academy | Tech Courses & Software Development Internships Pune"
        description="Bridge academia and industry with Prowexa Academy. Practical training in Java Full Stack, MERN Stack, React Native, AI & Data Science in Pune."
        canonicalUrl="https://www.prowexa.com/academy"
      />
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent opacity-50" />
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-brand opacity-10 blur-3xl" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-xs text-brand backdrop-blur-sm animate-fade-up">
              <GraduationCap className="h-3.5 w-3.5" />
              Prowexa Academy
            </div>
            <h1 className="mt-8 text-4xl font-bold tracking-tight md:text-5xl animate-fade-up">
              Upskill for the <span className="text-gradient-purple">Future</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed animate-fade-up">
              Bridge the gap between academia and industry. Real-world, practical training from engineering experts 
              complemented by hands-on internships.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4 animate-fade-up">
              <button
                onClick={() => openEnquire("Java Full Stack Development")}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition animate-fade-up"
              >
                Enquire Now <Send className="h-4 w-4" />
              </button>
              <a
                href="#programs"
                className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-card px-7 py-3.5 text-sm font-semibold text-brand hover:bg-brand-soft transition animate-fade-up"
              >
                Explore Programs <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section id="programs" className="py-12 md:py-16 bg-surface/30">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-10">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-glow">Our Courses</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Industry-Ready Curriculums</h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                No fluff. Just the technologies and practical skills our engineers use every day on real Prowexa projects.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {programs.map((program) => (
                <div
                  key={program.title}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-card hover:border-purple-500/50 transition-all duration-300 animate-fade-up flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start gap-4 flex-wrap">
                      <div>
                        <h3 className="text-2xl font-bold group-hover:text-brand transition-colors">
                          {program.title}
                        </h3>
                        <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {program.duration}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="h-3.5 w-3.5" />
                            {program.type}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                      {program.description}
                    </p>

                    <div className="mt-6">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Key Modules Covered</span>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {program.syllabus.map((item) => (
                          <span key={item} className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1 text-xs">
                            <CheckCircle2 className="h-3 w-3 text-brand" />
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-border flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Prepares you for:</span>
                      <span className="font-semibold text-brand">{program.outcome}</span>
                    </div>
                  </div>

                  <div className="mt-8 pt-4">
                    <button
                      onClick={() => openEnquire(program.title)}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition"
                    >
                      Enquire Now <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Training Roadmap */}
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-10">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-glow">Execution</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">The 5-Step Learning Roadmap</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-5">
              {roadmapSteps.map((step) => (
                <div key={step.step} className="rounded-2xl border border-border bg-card p-6 relative">
                  <span className="text-3xl font-extrabold text-purple-500/30">{step.step}</span>
                  <h3 className="mt-2 text-base font-bold">{step.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-surface/30">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <div className="rounded-2xl border border-border bg-gradient-hero p-8 md:p-12 shadow-glow">
              <h2 className="text-3xl md:text-4xl font-bold">Ready to Build Your Career at Prowexa?</h2>
              <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
                Join Prowexa Academy's upcoming batch and learn on live projects with our engineering team.
              </p>
              <div className="mt-8">
                <button
                  onClick={() => openEnquire("Java Full Stack Development")}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition"
                >
                  Enquire Now <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AcademyEnquireModal
        isOpen={isEnquireOpen}
        onClose={() => setIsEnquireOpen(false)}
        defaultCourse={selectedCourse}
      />

      <Footer />
    </div>
  );
}
