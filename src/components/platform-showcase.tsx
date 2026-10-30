import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { scrollToSection } from "@/utils/scroll";

/* ─────────────────────── Platform Showcase (animated hexagon stack) ─────────────────────── */

const CYCLE_MS = 11000;
const DEPTH = 14;

function hexPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 90);
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
}

type TileProps = {
  cx: number;
  cy: number;
  r: number;
  top: string;
  side: string;
  delay: number;
  variant?: "drop" | "grow" | "pop";
  children?: React.ReactNode;
};

function HexTile({ cx, cy, r, top, side, delay, variant = "drop", children }: TileProps) {
  return (
    <g className={`hex-piece hex-piece--${variant}`} style={{ animationDelay: `${delay}s` }} filter="url(#hexShadow)">
      <polygon
        points={hexPoints(cx, cy + DEPTH, r)}
        fill={side}
        stroke={side}
        strokeWidth={18}
        strokeLinejoin="round"
      />
      <polygon points={hexPoints(cx, cy, r)} fill={top} stroke={top} strokeWidth={18} strokeLinejoin="round" />
      {children}
    </g>
  );
}

function Label({ x, y, lines, color, size = 15 }: { x: number; y: number; lines: string[]; color: string; size?: number }) {
  return (
    <text x={x} y={y} textAnchor="middle" fill={color} fontSize={size} fontWeight={700} letterSpacing={0.2}>
      {lines.map((line, i) => (
        <tspan key={line} x={x} dy={i === 0 ? 0 : size * 1.25}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

function HexStack() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = window.setInterval(() => setCycle((c) => c + 1), CYCLE_MS);
    return () => window.clearInterval(timer);
  }, [visible]);

  return (
    <div ref={ref} className={`hex-stage relative mx-auto w-full max-w-[520px] ${visible ? "is-visible" : ""}`}>
      <div className="absolute inset-8 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
      <svg
        key={cycle}
        viewBox="0 0 500 540"
        className="hex-float relative h-auto w-full"
        role="img"
        aria-label="Prowexa engineering platform: custom software, web and mobile, AI and data, built on cloud, DevOps and security"
      >
        <defs>
          <linearGradient id="hexRing" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6d28d9" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <filter id="hexShadow" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#4c1d95" floodOpacity="0.22" />
          </filter>
        </defs>

        <HexTile cx={250} cy={262} r={240} top="url(#hexRing)" side="#4c1d95" delay={1.9} variant="grow">
          <Label x={250} y={452} lines={["Cloud · DevOps · Security"]} color="#ffffff" size={13} />
        </HexTile>
        <HexTile cx={163} cy={318} r={100} top="#ede9fe" side="#c4b5fd" delay={1.3}>
          <Label x={136} y={328} lines={["Web & Mobile", "Experiences"]} color="#3b0764" />
        </HexTile>
        <HexTile cx={337} cy={318} r={100} top="#7c3aed" side="#5b21b6" delay={0.7}>
          <Label x={364} y={328} lines={["AI & Data", "Solutions"]} color="#ffffff" />
        </HexTile>
        <HexTile cx={250} cy={165} r={100} top="#2a1258" side="#160935" delay={0.1}>
          <Label x={250} y={128} lines={["Custom Software", "Engineering"]} color="#ffffff" />
        </HexTile>
        <HexTile cx={250} cy={268} r={52} top="#ffffff" side="#ddd6fe" delay={2.6} variant="pop">
          <text x={250} y={268} textAnchor="middle" fill="#5b21b6" fontSize={19} fontWeight={800}>
            Prowexa
          </text>
          <text x={250} y={288} textAnchor="middle" fill="#7c3aed" fontSize={10} fontWeight={700} letterSpacing={1.2}>
            ENGINEERING
          </text>
        </HexTile>
      </svg>
    </div>
  );
}

export function PlatformShowcase() {
  const pillars = [
    "Custom software engineered around your business",
    "Web & mobile experiences your users love",
    "AI & data solutions that automate and inform",
    "Cloud, DevOps & security built in from day one",
  ];
  return (
    <section className="py-12 md:py-16 bg-surface overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-glow">Our approach</span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            One partner for <span className="text-gradient-brand">every layer</span> of your product
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            From the first line of code to cloud scale, Prowexa brings engineering, design, AI and operations together so
            your product ships faster and runs reliably.
          </p>
          <ul className="mt-6 space-y-3">
            {pillars.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm md:text-base">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-brand-glow" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <a
            href="#services"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("services");
            }}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition"
          >
            Explore Our Services <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <HexStack />
      </div>
    </section>
  );
}
