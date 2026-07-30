export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground font-bold shadow-glow">
              P
            </span>
            <span className="font-semibold">Prowexa Technologies</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            Turning ideas into scalable digital products, from MVP to global scale.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Address</h4>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Survey No 44 H. No. 8/1 (P, Plot A, opp. Bhartiya Vidyapeeth School,<br />
            Balewadi, Pune, Maharashtra - 411045
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a href="mailto:info@prowexa.com" className="hover:text-foreground transition-colors">info@prowexa.com</a></li>
            <li><a href="tel:7030347209" className="hover:text-foreground transition-colors">7030347209</a></li>
            <li><a href="https://prowexa.com" className="hover:text-foreground transition-colors">prowexa.com</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-6 text-center text-xs text-muted-foreground">
          © 2026 Prowexa Technologies Pvt. Ltd. All rights reserved
        </div>
      </div>
    </footer>
  );
}
