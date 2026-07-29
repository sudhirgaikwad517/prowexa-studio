import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative inline-flex h-10 w-[68px] items-center rounded-full border border-nav-border bg-nav-surface text-nav-muted transition-colors hover:bg-nav-surface/90"
    >
      <span
        className={`absolute top-1 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-brand text-primary-foreground shadow-glow transition-all duration-300 ${
          isDark ? "left-1" : "left-[34px]"
        }`}
      >
        {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </span>
      <Sun
        className={`absolute right-2.5 h-4 w-4 transition-opacity ${isDark ? "opacity-40" : "opacity-0"}`}
      />
      <Moon
        className={`absolute left-2.5 h-4 w-4 transition-opacity ${isDark ? "opacity-0" : "opacity-40"}`}
      />
    </button>
  );
}
