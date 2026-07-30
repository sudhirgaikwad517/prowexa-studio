import { useState, useEffect } from "react";
import type { MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/prowexa-logo.png";
import { Menu, X } from "lucide-react";

import { scrollToSection } from "@/utils/scroll";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";

  /* Track scroll for header background intensity */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const homeLinks = [
    { label: "About", target: "about" },
    { label: "Services", target: "services" },
    { label: "Industries", target: "industries" },
  ];

  const pageLinks = [
    { label: "Portfolio", to: "/portfolio" as const },
    { label: "Case Studies", to: "/case-studies" as const },
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
    <header
      className={`sticky top-0 z-50 backdrop-blur-xl border-b border-nav-border transition-all duration-300 text-nav-foreground ${
        scrolled
          ? "bg-nav-background shadow-lg shadow-black/5"
          : "bg-nav-background/85"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center" aria-label="Prowexa Technologies home">
          <motion.img
            src={logo}
            alt="Prowexa Technologies"
            className="h-9 md:h-11 w-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-nav-muted">
          {homeLinks.map((l) => (
            <a
              key={l.target}
              href={`/#${l.target}`}
              onClick={(e) => handleHomeNavClick(e, l.target)}
              className="nav-underline hover:text-nav-foreground transition-colors py-1"
            >
              {l.label}
            </a>
          ))}
          {pageLinks.map((l) => {
            const isActive = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`nav-underline transition-colors py-1 ${
                  isActive ? "text-brand active" : "hover:text-nav-foreground"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            to="/careers"
            className={`nav-underline font-semibold transition-colors py-1 ${
              location.pathname === "/careers"
                ? "text-purple-400 active"
                : "text-purple-400/80 hover:text-purple-300"
            }`}
          >
            Careers
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/careers"
            className="inline-flex items-center rounded-full bg-purple-600 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-purple-500/20 hover:bg-purple-700 transition-all duration-300 hover:scale-[1.03]"
          >
            Join Us
          </Link>
          <Link
            to="/contact"
            className="shimmer-btn inline-flex items-center rounded-full bg-gradient-brand px-5 py-2 text-sm font-medium text-primary-foreground shadow-glow hover:opacity-90 transition-all duration-300 hover:scale-[1.03]"
          >
            Let's Connect
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface hover:bg-surface-elevated transition"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu — Slide-in Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="lg:hidden overflow-hidden border-t border-border bg-nav-background"
          >
            <div className="px-6 py-6 flex flex-col gap-4 text-sm font-medium">
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
              {pageLinks.map((l) => {
                const isActive = location.pathname === l.to;
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setMobileOpen(false)}
                    className={`py-2 transition-colors border-b border-border/40 ${
                      isActive ? "text-brand" : "text-nav-muted hover:text-nav-foreground"
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
              <Link
                to="/careers"
                onClick={() => setMobileOpen(false)}
                className={`py-2 font-semibold transition-colors border-b border-border/40 ${
                  location.pathname === "/careers"
                    ? "text-purple-400"
                    : "text-purple-400/80 hover:text-purple-300"
                }`}
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
