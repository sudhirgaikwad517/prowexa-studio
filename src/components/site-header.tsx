import { useState } from "react";
import type { MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { ThemeToggle } from "./theme-toggle";
import logo from "@/assets/prowexa-logo.webp";
import { Menu, X } from "lucide-react";
import { trackCTAClick } from "@/lib/gtag";

import { scrollToSection } from "@/utils/scroll";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";

  const homeLinks = [
    { label: "About", target: "about" },
    { label: "Services", target: "services" },
    { label: "Industries", target: "industries" },
  ];

  const pageLinks = [
    { label: "Portfolio", to: "/portfolio" as const },
    { label: "Case Studies", to: "/case-studies" as const },
    { label: "Blogs", to: "/blogs" as const },
    { label: "Academy", to: "/academy" as const },
    { label: "Testimonials", to: "/testimonials" as const },
  ];

  function handleHomeNavClick(event: MouseEvent, target: string) {
    event.preventDefault();
    setMobileOpen(false);
    if (isHomePage) {
      scrollToSection(target);
    } else {
      navigate({ to: "/" }).then(() => {
        // Wait briefly for route transition before scrolling
        setTimeout(() => {
          scrollToSection(target);
        }, 150);
      });
    }
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-nav-background border-b border-nav-border text-nav-foreground">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center" aria-label="Prowexa Technologies home">
          <img
            src={logo}
            alt="Prowexa Technologies"
            width={180}
            height={44}
            className="h-9 md:h-11 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-nav-muted">
          {homeLinks.map((l) => (
            <a
              key={l.target}
              href={`/#${l.target}`}
              onClick={(e) => handleHomeNavClick(e, l.target)}
              className="hover:text-nav-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
          {pageLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "text-brand" }}
              inactiveProps={{ className: "hover:text-nav-foreground" }}
              className="transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/careers"
            activeProps={{ className: "text-purple-400" }}
            inactiveProps={{ className: "text-purple-400/80 hover:text-purple-300" }}
            className="font-semibold transition-colors"
          >
            Careers
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/careers"
            className="inline-flex items-center rounded-full bg-purple-600 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-purple-500/20 hover:bg-purple-700 transition"
          >
            Join Us
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center rounded-full bg-gradient-brand px-5 py-2 text-sm font-medium text-primary-foreground shadow-glow hover:opacity-90 transition"
          >
            Let's Connect
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex lg:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface hover:bg-surface-elevated transition"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-nav-background px-6 py-6 flex flex-col gap-4 text-sm font-medium">
          {homeLinks.map((l) => (
            <a
              key={l.target}
              href={`/#${l.target}`}
              onClick={(e) => handleHomeNavClick(e, l.target)}
              className="py-2 text-nav-muted hover:text-nav-foreground transition-colors border-b border-border/40"
            >
              {l.label}
            </a>
          ))}
          {pageLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMobileOpen(false)}
              activeProps={{ className: "text-brand" }}
              inactiveProps={{ className: "text-nav-muted hover:text-nav-foreground" }}
              className="py-2 transition-colors border-b border-border/40"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/careers"
            onClick={() => setMobileOpen(false)}
            activeProps={{ className: "text-purple-400" }}
            inactiveProps={{ className: "text-purple-400/80 hover:text-purple-300" }}
            className="py-2 font-semibold transition-colors border-b border-border/40"
          >
            Careers
          </Link>
          <div className="mt-4 flex flex-col gap-3">
            <Link
              to="/careers"
              onClick={() => setMobileOpen(false)}
              className="inline-flex justify-center items-center rounded-full bg-purple-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-purple-700 transition"
            >
              Join Us
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="inline-flex justify-center items-center rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow hover:opacity-90 transition"
            >
              Let's Connect
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
