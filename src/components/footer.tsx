import { Link } from "@tanstack/react-router";
import logo from "@/assets/prowexa-logo.webp";

const quickLinks = [
  { label: "Portfolio", to: "/portfolio" as const },
  { label: "Case Studies", to: "/case-studies" as const },
  { label: "Blogs", to: "/blogs" as const },
  { label: "Academy", to: "/academy" as const },
  { label: "Careers", to: "/careers" as const },
  { label: "Contact Us", to: "/contact" as const },
];

export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="h-1 bg-gradient-brand" />
      <div className="mx-auto max-w-7xl px-6 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src={logo} alt="Prowexa Technologies" width={132} height={52} className="h-11 w-auto" />
          <p className="mt-4 text-sm text-ink-muted max-w-xs">
            Turning ideas into scalable digital products, from MVP to global scale.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-ink-foreground transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Address</h4>
          <p className="mt-3 text-sm text-ink-muted leading-relaxed">
            Survey No. 44, H. No. 8/1 (P), Plot A, Opp. Bhartiya Vidyapeeth School,<br />
            Balewadi, Pune, Maharashtra - 411045
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            <li><a href="mailto:info@prowexa.com" className="hover:text-ink-foreground transition-colors">info@prowexa.com</a></li>
            <li><a href="tel:+917030347209" className="hover:text-ink-foreground transition-colors">+91 70303 47209</a></li>
            <li><a href="https://prowexa.com" className="hover:text-ink-foreground transition-colors">prowexa.com</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 text-center text-xs text-ink-muted">
          © 2026 Prowexa Technologies Pvt. Ltd. All rights reserved
        </div>
      </div>
    </footer>
  );
}
