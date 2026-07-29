import { Link } from "@tanstack/react-router";
import { Mail, Phone, Globe, MapPin, ArrowUpRight, Linkedin, Github, Twitter } from "lucide-react";
import logo from "@/assets/prowexa-logo.png";

export function Footer() {
  const quickLinks = [
    { label: "About", href: "/#about" },
    { label: "Services", href: "/#services" },
    { label: "Portfolio", to: "/portfolio" },
    { label: "Case Studies", to: "/case-studies" },
    { label: "Testimonials", to: "/testimonials" },
  ];

  const companyLinks = [
    { label: "Academy", to: "/academy" },
    { label: "Careers", to: "/careers" },
    { label: "Contact", to: "/contact" },
  ];

  const socialLinks = [
    { icon: Linkedin, href: "https://linkedin.com/company/prowexa", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/prowexa", label: "Twitter" },
    { icon: Github, href: "https://github.com/prowexa", label: "GitHub" },
  ];

  return (
    <footer className="relative border-t border-border bg-surface/40">
      {/* Gradient divider glow */}
      <div className="divider-glow absolute top-0 inset-x-0" />

      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        {/* Column 1: Brand */}
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="Prowexa Technologies" className="h-9 w-auto" />
          </div>
          <p className="mt-5 text-sm text-muted-foreground max-w-xs leading-relaxed">
            Turning ideas into scalable digital products — from MVP to global scale. Custom software, AI, cloud
            engineering, and education.
          </p>

          {/* Social Icons */}
          <div className="mt-6 flex gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface/60 text-muted-foreground transition-all duration-300 hover:bg-brand hover:text-white hover:border-brand hover:shadow-glow hover:scale-110"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="font-label text-xs font-bold uppercase tracking-wider text-brand-glow mb-5">Quick Links</h4>
          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.label}>
                {"to" in link && link.to ? (
                  <Link
                    to={link.to as "/portfolio" | "/case-studies" | "/testimonials" | "/academy" | "/careers" | "/contact"}
                    className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 transition-all group-hover:opacity-100 group-hover:translate-y-0" />
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 transition-all group-hover:opacity-100 group-hover:translate-y-0" />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Company */}
        <div>
          <h4 className="font-label text-xs font-bold uppercase tracking-wider text-brand-glow mb-5">Company</h4>
          <ul className="space-y-3">
            {companyLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to as "/academy" | "/careers" | "/contact"}
                  className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                  <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 transition-all group-hover:opacity-100 group-hover:translate-y-0" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <h4 className="font-label text-xs font-bold uppercase tracking-wider text-brand-glow mb-3">Registered Office</h4>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mt-0.5 flex-none text-brand-glow/60" />
              <p className="leading-relaxed">
                Survey No 44 H. No. 8/1 (P, Plot A, opp. Bhartiya Vidyapeeth School,
                Balewadi, Pune, Maharashtra - 411045
              </p>
            </div>
          </div>
        </div>

        {/* Column 4: Contact */}
        <div>
          <h4 className="font-label text-xs font-bold uppercase tracking-wider text-brand-glow mb-5">Contact</h4>
          <ul className="space-y-4">
            <li>
              <a href="mailto:info@prowexa.com" className="group flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-brand/10 text-brand-glow transition-all group-hover:bg-brand group-hover:text-white">
                  <Mail className="h-4 w-4" />
                </span>
                info@prowexa.com
              </a>
            </li>
            <li>
              <a href="tel:7030347209" className="group flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-brand/10 text-brand-glow transition-all group-hover:bg-brand group-hover:text-white">
                  <Phone className="h-4 w-4" />
                </span>
                +91 7030 347 209
              </a>
            </li>
            <li>
              <a href="https://prowexa.com" className="group flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-brand/10 text-brand-glow transition-all group-hover:bg-brand group-hover:text-white">
                  <Globe className="h-4 w-4" />
                </span>
                prowexa.com
              </a>
            </li>
          </ul>

          {/* Newsletter */}
          <div className="mt-8 rounded-2xl border border-border bg-surface/40 p-5">
            <h4 className="font-semibold text-sm mb-2">Stay Updated</h4>
            <p className="text-xs text-muted-foreground mb-3">Get the latest on tech trends & academy programs.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none focus:border-brand focus:ring-1 focus:ring-brand transition"
              />
              <button className="rounded-lg bg-gradient-brand px-4 py-2 text-xs font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition">
                Join
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <span>© 2026 Prowexa Technologies Pvt. Ltd. All rights reserved</span>
          <span className="font-label text-[10px] tracking-wider">CIN: U62090PN2025PTC249889</span>
        </div>
      </div>
    </footer>
  );
}
