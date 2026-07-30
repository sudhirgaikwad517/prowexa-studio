import { Link } from "@tanstack/react-router";
import { SiteHeader } from "./site-header";
import { Footer } from "./footer";
import { SEOHead } from "./seo-head";
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
  Building,
  Star,
  MapPin,
  ChevronRight,
  Code,
  FileText,
} from "lucide-react";

export function AcademyPage() {
  const programs = [
    {
      title: "Java Full Stack Development",
      duration: "6 Months",
      type: "Online / Classroom",
      rating: "4.9",
      reviews: "120+",
      description: "Master core Java, Advanced Java, Spring Boot, Hibernate, microservices, React, and databases. Build robust enterprise-grade applications.",
      syllabus: ["Core Java & OOPS", "Spring Boot & Microservices", "React Front-end Integration", "SQL & NoSQL Databases", "Deployment & AWS Basics"],
      outcome: "Full Stack Java Developer, Backend Engineer"
    },
    {
      title: "Python + AI & Machine Learning",
      duration: "6 Months",
      type: "Online / Classroom",
      rating: "4.8",
      reviews: "95+",
      description: "Dive deep into Python, Data Science, Machine Learning, Deep Learning, NLP, and AI models integration. Learn to build and deploy intelligent software.",
      syllabus: ["Python Foundations", "Data Analysis (Pandas, NumPy)", "Scikit-Learn Machine Learning", "Neural Networks & TensorFlow", "LLMs & OpenAI Integration"],
      outcome: "AI Engineer, Data Scientist, ML Developer"
    },
    {
      title: "Data Analytics Masterclass",
      duration: "4 Months",
      type: "Online / Classroom",
      rating: "4.7",
      reviews: "80+",
      description: "Learn to process, analyze, and visualize data to make business decisions. Master Excel, SQL, Tableau, Power BI, and basic Python statistics.",
      syllabus: ["Advanced Excel & Statistics", "SQL Queries & Databases", "Power BI & Tableau Dashboards", "Python for Data Analysis", "Business Case Studies"],
      outcome: "Data Analyst, Business Analyst, BI Developer"
    },
    {
      title: "Corporate Training Program",
      duration: "Custom",
      type: "On-site / Online",
      rating: "5.0",
      reviews: "15+ Corporates",
      description: "Customized upskilling programs for engineering teams. Modernize your team's tech stack with hands-on practice and real-world case studies.",
      syllabus: ["Customized Tech Stacks", "Agile & DevOps Workflows", "Hands-on Capstone Projects", "Post-Training Support", "Assessments & Dashboards"],
      outcome: "High Performance Upskilled Development Team"
    }
  ];

  const partners = [
    {
      college: "Modern College of Engineering",
      location: "Pune",
      type: "Syllabus Integration & Labs"
    },
    {
      college: "DY Patil Institute of Technology",
      location: "Pune",
      type: "Campus Placement Partner"
    },
    {
      college: "Sinhgad Institutes",
      location: "Pune",
      type: "Faculty Development Programs"
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
      title: "Guaranteed Internship",
      desc: "Join Prowexa's internal development team or our partner firms to work on live projects."
    },
    {
      step: "05",
      title: "Placements & Success",
      desc: "Mock interviews, resume building, profile optimization, and direct placement drives."
    }
  ];

  const testimonials = [
    {
      quote: "The Java Full Stack program completely changed my career path. The live internship at Prowexa gave me the hands-on project experience that standard courses lack.",
      name: "Amit Deshmukh",
      role: "Software Engineer at Cognizant",
      course: "Java Full Stack (Batch of 2025)"
    },
    {
      quote: "Learning Python and AI from industry experts who write code daily made a huge difference. I built a working recommendation engine during the course.",
      name: "Priyanka Patil",
      role: "Associate Data Analyst at Tech M",
      course: "Python + AI & ML Program"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Prowexa Academy | Tech Courses & Software Development Internships Pune"
        description="Bridge academia and industry with Prowexa Academy. Practical training in Java Full Stack, MERN Stack, React Native, AI & Data Science in Pune."
        canonicalPath="/academy"
      />
      <SiteHeader />

      <main>
        {/* Academy Hero */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent opacity-50" />
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-brand opacity-10 blur-3xl" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-xs text-purple-400 backdrop-blur-sm animate-fade-up">
              <GraduationCap className="h-3.5 w-3.5" />
              Prowexa Academy
            </div>
            <h1 className="mt-8 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl animate-fade-up">
              Upskill for the <span className="text-gradient-purple">Future</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed animate-fade-up">
              Bridge the gap between academia and industry. Real-world, practical training from engineering experts 
              complemented by hands-on internships.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4 animate-fade-up">
              <a
                href="#programs"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition animate-fade-up"
              >
                Explore Programs <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#partnerships"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20 transition animate-fade-up"
              >
                College Partnerships
              </a>
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section id="programs" className="py-24 bg-surface/30">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-16">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-glow">Our Courses</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Industry-Ready Curriculums</h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                No fluff. Just the exact technologies and practical skills that companies look for in technical interviews.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {programs.map((program) => (
                <div
                  key={program.title}
                  className="group relative overflow-hidden rounded-[2rem] border border-border bg-card p-8 shadow-card hover:border-purple-500/50 transition-all duration-300 animate-fade-up"
                >
                  <div className="flex justify-between items-start gap-4 flex-wrap">
                    <div>
                      <h3 className="text-2xl font-bold group-hover:text-purple-400 transition-colors">
                        {program.title}
                      </h3>
                      <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {program.duration}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-3.5 w-3.5" />
                          {program.type}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-yellow-500">
                          <Star className="h-3.5 w-3.5 fill-current" />
                          {program.rating} ({program.reviews})
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
                    {program.description}
                  </p>

                  <div className="mt-6">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-glow mb-3">Key Syllabus Modules:</h4>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {program.syllabus.map((syl) => (
                        <div key={syl} className="flex items-center gap-2 text-xs font-medium">
                          <CheckCircle2 className="h-4 w-4 text-purple-400 flex-shrink-0" />
                          <span>{syl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border flex justify-between items-center gap-4 flex-wrap">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Target Role</span>
                      <p className="text-xs font-semibold text-foreground mt-0.5">{program.outcome}</p>
                    </div>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 hover:bg-purple-500 hover:text-white px-5 py-2 text-xs font-semibold text-purple-400 transition-all duration-300"
                    >
                      Enquire Now <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Student Success Roadmap */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-16">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-glow">Your Journey</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Student Success Roadmap</h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                From day one of counseling to your first day on the job, our structured pathway ensures your growth.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
              {roadmapSteps.map((step) => (
                <div
                  key={step.step}
                  className="relative rounded-3xl border border-border bg-card p-6 shadow-card hover:border-purple-500/30 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-4xl font-extrabold text-purple-500/20">{step.step}</span>
                    <h3 className="mt-4 text-base font-bold text-foreground">{step.title}</h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Internship Portal Details */}
        <section className="py-24 bg-surface/30">
          <div className="mx-auto max-w-7xl px-6">
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-hero p-10 md:p-14 shadow-card animate-fade-up">
              <div className="absolute -top-32 -left-20 h-80 w-80 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
              <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur">
                    <Briefcase className="h-3.5 w-3.5 text-brand-glow" />
                    Prowexa Internship Program
                  </span>
                  <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">Live Internship Portal</h2>
                  <p className="mt-4 text-muted-foreground text-base leading-relaxed">
                    Most courses end with a certificate, ours ends with software development experience. 
                    Every eligible student gets an internship opportunity to work with the Prowexa studio 
                    or our partner agencies on real projects, building actual features, deploying code, and receiving 
                    professional feedback.
                  </p>
                  <div className="mt-6 space-y-3">
                    {[
                      "Work on real products & web applications",
                      "Git & GitHub version control experience",
                      "Daily Standups, sprint planning & code reviews",
                      "Official Internship Experience Certificate"
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-purple-400" />
                        <span className="text-sm font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-card border border-border rounded-3xl p-8 shadow-2xl">
                  <div className="flex items-center gap-3 pb-6 border-b border-border">
                    <Code className="h-6 w-6 text-purple-400" />
                    <div>
                      <h3 className="font-bold text-lg">Internship Portal</h3>
                      <p className="text-xs text-muted-foreground">internship.prowexa.com</p>
                    </div>
                  </div>
                  <div className="mt-6 space-y-4">
                    <div className="rounded-2xl bg-surface p-4 border border-border">
                      <span className="text-[10px] font-semibold text-purple-400 uppercase">Current Live Projects</span>
                      <p className="text-sm font-bold mt-1">E-commerce API Integration & Client Portal Dashboard</p>
                    </div>
                    <div className="rounded-2xl bg-surface p-4 border border-border">
                      <span className="text-[10px] font-semibold text-purple-400 uppercase">Technologies Active</span>
                      <p className="text-sm font-bold mt-1">React, Next.js, Node.js, GitHub, Supabase</p>
                    </div>
                    <Link
                      to="/contact"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition mt-2"
                    >
                      Enquire About Internship Eligibility <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* College Partnership */}
        <section id="partnerships" className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-glow">Colleges & Universities</span>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">College Partnerships</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  We partner with academic institutions to establish center-of-excellence development labs, custom seminar 
                  lectures, and faculty development programs. This helps align the college syllabus with modern stack requirements 
                  and offers students direct pathways to internships and career opportunities.
                </p>
                <div className="mt-8 space-y-4">
                  <div className="flex gap-4">
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                      <Building className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-bold text-sm">Campus Bootcamps</h4>
                      <p className="text-xs text-muted-foreground mt-1">Hands-on, 1-2 week immersive workshops for students directly at the campus.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                      <Award className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-bold text-sm">Academic Projects Support</h4>
                      <p className="text-xs text-muted-foreground mt-1">Co-mentoring support for final-year engineering projects with industry standards.</p>
                    </div>
                  </div>
                </div>
                <Link
                  to="/contact"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-purple-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 hover:bg-purple-700 transition"
                >
                  Partner With Us <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-lg mb-4 text-center lg:text-left">Associated Institutions</h3>
                {partners.map((partner) => (
                  <div
                    key={partner.college}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 shadow-card hover-lift hover:-translate-y-0.5 transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground">
                        <Building className="h-5 w-5" />
                      </span>
                      <div>
                        <h4 className="font-bold text-sm">{partner.college}</h4>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <MapPin className="h-3 w-3" />
                          {partner.location}
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-purple-500/10 px-3 py-1 text-[10px] font-semibold text-purple-400 border border-purple-500/20">
                      {partner.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Student Testimonials */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-16">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-glow">Success Stories</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">What Our Graduates Say</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="rounded-3xl border border-border bg-card p-8 shadow-card flex flex-col justify-between"
                >
                  <div>
                    <div className="flex gap-1 mb-4 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm italic text-muted-foreground leading-relaxed">
                      "{t.quote}"
                    </p>
                  </div>
                  <div className="mt-6 pt-6 border-t border-border flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-sm">{t.name}</h4>
                      <p className="text-xs text-purple-400 font-semibold mt-0.5">{t.role}</p>
                    </div>
                    <span className="text-[10px] rounded-full border border-border bg-surface px-3 py-1 text-muted-foreground font-medium">
                      {t.course}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
