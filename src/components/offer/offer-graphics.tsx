"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FigmaCursorIcon } from "@/components/ui/figma-cursor";

/* ════════════════════════════════════════════════════════════════
   Website Design, a design tool building a premium site, live.
   (Figma-style cursor draws the wireframe section by section.)
   ════════════════════════════════════════════════════════════════ */

const PHASE_DURATIONS = [400, 500, 700, 500, 700, 500, 700, 500, 700, 2200, 800, 500];
const CURSOR_POSITIONS = [
  { x: 0, y: 0 }, { x: 15, y: 3 }, { x: 15, y: 3 }, { x: -3, y: 22 },
  { x: 18, y: 24 }, { x: 8, y: 38 }, { x: 8, y: 40 }, { x: -6, y: 56 },
  { x: 28, y: 60 }, { x: 14, y: 32 }, { x: 14, y: 32 }, { x: 0, y: 0 },
];

export function WebsiteDesignGraphic({ className }: { className?: string }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timer = setTimeout(
      () => setPhase((p) => (p + 1) % PHASE_DURATIONS.length),
      PHASE_DURATIONS[phase]
    );
    return () => clearTimeout(timer);
  }, [phase]);

  const pos = CURSOR_POSITIONS[phase];
  const isFading = phase === 10;
  const isReset = phase === 11 || phase === 0;
  const showNav = phase >= 2 && phase <= 10;
  const showHeading = phase >= 4 && phase <= 10;
  const showCta = phase >= 6 && phase <= 10;
  const showCards = phase >= 8 && phase <= 10;
  const op = (show: boolean) => (isReset || isFading ? 0 : show ? 1 : 0);

  const layers = [
    { name: "Hero Section", active: true, show: showHeading },
    { name: "Navigation", active: false, show: showNav },
    { name: "Heading", active: false, show: showHeading },
    { name: "CTA Button", active: false, show: showCta },
    { name: "Proof Row", active: false, show: showCards },
    { name: "Services", active: false, show: showCards },
    { name: "Footer", active: false, show: showCards },
  ];

  return (
    <div className={cn("relative overflow-hidden bg-[#0b0b0f]", className)}>
      <div className="absolute top-[20%] left-[40%] w-64 h-64 rounded-full bg-accent/[0.10] blur-3xl" />
      <div className="absolute top-5 left-4 right-4 bottom-5 rounded-xl border border-white/[0.1] overflow-hidden bg-[#111]">
        {/* chrome */}
        <div className="flex items-center justify-between px-3 h-7 border-b border-white/[0.06] bg-[#0a0a0a]">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]/80" />
          </div>
          <div className="flex gap-4 text-[8px]">
            <span className="text-white/40 font-medium">Layers</span>
            <span className="text-white/20">Assets</span>
            <span className="text-white/20">Pages</span>
          </div>
          <div className="w-12" />
        </div>

        <div className="flex h-[calc(100%-1.75rem)]">
          {/* layers sidebar */}
          <div className="w-28 md:w-32 border-r border-white/[0.06] bg-[#0d0d0d] p-1 space-y-px">
            {layers.map((layer, idx) => (
              <motion.div
                key={idx}
                animate={{ opacity: op(layer.show) }}
                transition={{ duration: isFading ? 0.6 : 0.3 }}
                className={cn(
                  "flex items-center gap-1.5 px-1.5 py-1 rounded",
                  layer.active && "bg-accent/15"
                )}
              >
                <div
                  className={cn(
                    "w-2 h-2 shrink-0 rounded-sm border",
                    layer.active ? "border-accent/50" : "border-white/[0.12]"
                  )}
                />
                <span
                  className={cn(
                    "text-[7px] truncate",
                    layer.active ? "text-white/60" : "text-white/30"
                  )}
                >
                  {layer.name}
                </span>
              </motion.div>
            ))}
          </div>

          {/* canvas */}
          <div className="flex-1 bg-[#191920] p-3 md:p-4 flex items-start justify-center overflow-hidden relative">
            <motion.div
              className="absolute top-[10%] left-[32%] z-10 flex items-start gap-1"
              animate={{ x: pos.x, y: pos.y }}
              transition={{ type: "spring", stiffness: 120, damping: 20, mass: 0.8 }}
            >
              <FigmaCursorIcon />
              <div className="rounded-full py-0.5 px-2 bg-accent border border-accent/60 text-white text-[8px] whitespace-nowrap">
                Josh
              </div>
            </motion.div>

            <div className="w-full max-w-[240px] bg-[#0f0f14] rounded-md border border-white/[0.06] overflow-hidden shadow-2xl shadow-black/50">
              <motion.div
                animate={{ opacity: op(showNav) }}
                transition={{ duration: isFading ? 0.6 : 0.3 }}
                className="flex items-center justify-between px-2.5 py-1.5 border-b border-white/[0.04]"
              >
                <div className="h-1.5 w-10 rounded bg-white/25" />
                <div className="flex gap-2">
                  <div className="h-1 w-5 rounded bg-white/[0.1]" />
                  <div className="h-1 w-5 rounded bg-white/[0.1]" />
                  <div className="h-1 w-8 rounded bg-accent/50" />
                </div>
              </motion.div>

              <div className="px-2.5 py-3">
                <motion.div animate={{ opacity: op(showHeading) }} transition={{ duration: isFading ? 0.6 : 0.3 }}>
                  <div className="h-2 w-[80%] rounded bg-white/20 mb-1.5" />
                  <div className="h-2 w-[55%] rounded bg-white/20 mb-2" />
                  <div className="h-1 w-full rounded bg-white/[0.06] mb-0.5" />
                  <div className="h-1 w-[80%] rounded bg-white/[0.06]" />
                </motion.div>
                <motion.div animate={{ opacity: op(showCta) }} transition={{ duration: isFading ? 0.6 : 0.3 }} className="mt-2.5">
                  <div className="h-4 w-16 rounded bg-accent/50 border border-accent/30" />
                </motion.div>
              </div>

              <motion.div
                animate={{ opacity: op(showCards) }}
                transition={{ duration: isFading ? 0.6 : 0.3 }}
                className="px-2.5 pb-3 grid grid-cols-3 gap-1"
              >
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rounded bg-white/[0.03] border border-white/[0.05] p-1">
                    <div className="h-5 rounded bg-white/[0.04] mb-0.5" />
                    <div className="h-0.5 rounded bg-white/[0.08] mb-0.5" />
                    <div className="h-0.5 rounded bg-white/[0.05] w-3/4" />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   AI Workflow — scrolling terminal log (hero mockup).
   ════════════════════════════════════════════════════════════════ */

const LOG_LINES = [
  "> Initializing workflow audit...",
  "> Scanning team processes: 14 found",
  "> Flagging highest-cost workflow...",
  "> client-reporting: 6.5 hrs/week",
  "> Mapping manual handoff points...",
  "> Connecting to existing tools...",
  "> Building AI automation layer...",
  "> Test run: trigger → output",
  "> ✔ 12 min workflow → 90s",
  "> ✔ Zero new tools required",
  "> Deploying to your stack...",
  "> ✔ Status: RUNNING",
  "> ✔ Hours returned: 6.5 / week",
  "> ✔ ROI positive from week 1",
  "> --------- CYCLE COMPLETE ---------",
];

export function WorkflowGraphic({ className }: { className?: string }) {
  const [lines, setLines] = useState<string[]>([LOG_LINES[0]]);
  const indexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = (indexRef.current + 1) % LOG_LINES.length;
      indexRef.current = next;
      if (next === 0) {
        setLines([LOG_LINES[0]]);
      } else {
        setLines((l) => [...l.slice(-8), LOG_LINES[next]]);
      }
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("relative overflow-hidden bg-[#0b0b0f] flex flex-col", className)}>
      {/* title bar */}
      <div className="flex items-center gap-2 border-b-2 border-white/10 px-4 py-2.5 shrink-0 bg-[#0d0d0d]">
        <span className="h-2.5 w-2.5 rounded-sm bg-red-600" />
        <span className="h-2.5 w-2.5 rounded-sm bg-yellow-500" />
        <span className="h-2.5 w-2.5 rounded-sm bg-green-500" />
        <span className="ml-auto text-[10px] tracking-widest text-white/30 uppercase font-mono">
          workflow.sh
        </span>
      </div>

      {/* log body */}
      <div className="flex-1 bg-[#0b0b0b] p-5 overflow-hidden flex flex-col justify-end">
        <div className="flex flex-col gap-1">
          {lines.map((line, i) => (
            <span
              key={i}
              className="text-[11px] text-white font-mono block"
              style={{ opacity: i === lines.length - 1 ? 1 : 0.45 }}
            >
              {line}
            </span>
          ))}
          <span className="text-[11px] text-[#ea580c] font-mono animate-blink">_</span>
        </div>
      </div>

      {/* footer metric */}
      <div className="px-5 py-3 border-t-2 border-white/10 bg-[#0d0d0d] shrink-0 flex items-center justify-between font-mono">
        <div>
          <div className="text-[8px] text-white/30 uppercase tracking-wider">Time back / week</div>
          <div className="text-lg font-semibold text-white tracking-tight">
            6.5 <span className="text-xs text-white/40 font-normal">hrs</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[8px] text-white/30 uppercase tracking-wider">Per account</div>
          <div className="text-sm font-medium text-emerald-400">12 min → 90s</div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   Development, a stuck build, audited and shipped.
   (Status flips from stuck to live as the pipeline completes.)
   ════════════════════════════════════════════════════════════════ */

const DEV_STEPS = [
  { label: "Audit existing codebase", status: "done" },
  { label: "Keep what works, re-architect the rest", status: "done" },
  { label: "Finish & harden for production", status: "done" },
  { label: "Deploy", status: "active" },
];

export function DevGraphic({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden bg-[#0b0b0f]", className)}>
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-56 h-56 rounded-full bg-accent/[0.10] blur-3xl" />

      <div className="absolute top-5 left-4 right-4 bottom-5 rounded-xl border border-white/[0.1] overflow-hidden bg-[#111] flex flex-col">
        {/* status bar: stuck → live */}
        <div className="flex items-center justify-between px-3 h-8 border-b border-white/[0.06] bg-[#0a0a0a] shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[8px] line-through text-red-400/60 font-mono">stuck</span>
            <span className="text-white/20 text-[9px]">→</span>
            <span className="text-[9px] text-emerald-400 font-mono font-medium">● live</span>
          </div>
          <span className="text-[8px] text-white/30 font-mono">main</span>
        </div>

        {/* pipeline */}
        <div className="flex-1 p-3.5 flex flex-col justify-center gap-2.5">
          {DEV_STEPS.map((s, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div
                className={cn(
                  "w-4 h-4 rounded-full flex items-center justify-center shrink-0 border",
                  s.status === "done"
                    ? "bg-emerald-500/15 border-emerald-500/40"
                    : "bg-accent/15 border-accent/50"
                )}
              >
                {s.status === "done" ? (
                  <span className="text-emerald-400 text-[8px]">✓</span>
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                )}
              </div>
              <span className={cn("text-[10px]", s.status === "done" ? "text-white/45" : "text-white/80")}>
                {s.label}
              </span>
              {s.status === "active" && (
                <span className="ml-auto text-[7px] text-accent font-mono">deploying…</span>
              )}
            </div>
          ))}
        </div>

        {/* terminal line */}
        <div className="px-3.5 py-3 border-t border-white/[0.06] bg-[#0d0d0d] shrink-0 font-mono text-[9px] leading-relaxed">
          <div className="text-white/40">
            <span className="text-emerald-400">✓</span> 142 tests passing
          </div>
          <div className="text-white/40">
            <span className="text-emerald-400">✓</span> build succeeded in 38s
          </div>
          <div className="text-white/70">
            <span className="text-accent">→</span> shipped to production{" "}
            <span className="inline-block w-1.5 h-3 align-middle bg-white/50 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* slug → graphic map (used by hero + home bento) */
export function OfferGraphic({ slug, className }: { slug: string; className?: string }) {
  if (slug === "website-design") return <WebsiteDesignGraphic className={className} />;
  if (slug === "ai-workflow") return <WorkflowGraphic className={className} />;
  if (slug === "development") return <DevGraphic className={className} />;
  return null;
}
