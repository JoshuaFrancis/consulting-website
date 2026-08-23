"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatedSection } from "@/components/shared/animated-section";
import type { CaseReport } from "@/lib/data/case-studies";

/* Lighthouse-style score colour. */
function scoreColor(n: number) {
  if (n >= 90) return "#0cce6b";
  if (n >= 50) return "#ffa400";
  return "#ff4e42";
}

/* rAF count-up that runs once when `play` flips true. Holds final value when reduced. */
function useCountUp(to: number, play: boolean, from = 0, duration = 1500, reduced = false) {
  const [val, setVal] = useState(reduced ? to : from);
  useEffect(() => {
    if (!play) return;
    if (reduced) {
      setVal(to);
      return;
    }
    let raf = 0;
    let startTs = 0;
    const step = (ts: number) => {
      if (!startTs) startTs = ts;
      const t = Math.min(1, (ts - startTs) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(from + (to - from) * eased);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, play, from, duration, reduced]);
  return val;
}

function Gauge({ label, before, after, unit = "", play, reduced }: { label: string; before: number; after: number; unit?: string; play: boolean; reduced: boolean }) {
  const value = useCountUp(after, play, before, 1500, reduced);
  const r = 54;
  const C = 2 * Math.PI * r;
  const color = scoreColor(after);
  const offset = C * (1 - value / 100);

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative h-36 w-36">
        <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90">
          <circle cx="64" cy="64" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
          <circle
            cx="64"
            cy="64"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={offset}
            style={{ filter: `drop-shadow(0 0 8px ${color}66)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-semibold tabular-nums" style={{ color }}>
            {Math.round(value)}{unit}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/35">
            from {before}{unit}
          </span>
        </div>
      </div>
      <div className="mt-4 text-sm font-medium text-white/80">{label}</div>
    </div>
  );
}

function Bar({ label, before, after, unit, word = "faster", play, reduced }: { label: string; before: number; after: number; unit: string; word?: string; play: boolean; reduced: boolean }) {
  const afterPct = Math.max(2, (after / before) * 100);
  const ratio = before / after;
  const faster = ratio >= 10 ? `${Math.round(ratio)}× ${word}` : `${ratio.toFixed(1)}× ${word}`;
  const fmt = (n: number) => `${n % 1 === 0 ? n : n.toFixed(1)}${unit}`;

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white/80">{label}</span>
        <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400">
          {faster}
        </span>
      </div>
      <div className="mt-3 space-y-2">
        {/* before */}
        <div className="flex items-center gap-3">
          <span className="w-12 shrink-0 font-mono text-[10px] uppercase tracking-wider text-white/35">
            Before
          </span>
          <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-white/[0.04]">
            <div
              className="h-full rounded-full bg-red-400/40 transition-[width] duration-700 ease-out"
              style={{ width: play ? "100%" : "0%", transition: reduced ? "none" : undefined }}
            />
          </div>
          <span className="w-16 shrink-0 text-right font-mono text-xs text-white/45">
            {fmt(before)}
          </span>
        </div>
        {/* after */}
        <div className="flex items-center gap-3">
          <span className="w-12 shrink-0 font-mono text-[10px] uppercase tracking-wider text-accent">
            After
          </span>
          <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-white/[0.04]">
            <div
              className="h-full rounded-full bg-emerald-400 transition-[width] duration-1000 ease-out"
              style={{
                width: play ? `${afterPct}%` : "0%",
                boxShadow: "0 0 12px rgba(16,185,129,0.5)",
                transition: reduced ? "none" : undefined,
              }}
            />
          </div>
          <span className="w-16 shrink-0 text-right font-mono text-xs font-semibold text-white">
            {fmt(after)}
          </span>
        </div>
      </div>
    </div>
  );
}

export function PerformanceReport({ report }: { report: CaseReport }) {
  const ref = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setPlay(true); // show final state immediately, no motion
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setPlay(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-y border-white/10 bg-[#08080c] py-24 md:py-32"
    >
      <div className="absolute inset-0 dot-pattern opacity-[0.06]" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-20 left-1/2 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-accent/[0.12] blur-[120px]"
        aria-hidden="true"
      />
      <div className="relative max-w-6xl mx-auto px-6 md:px-8">
        <AnimatedSection>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white leading-[1.05]">
            The numbers, <span className="text-accent">before and after.</span>
          </h2>
          <p className="mt-4 max-w-xl text-lg text-white/55">
            {report.subtitle ??
              "Real Google PageSpeed scores, measured on the same pages before and after the rebuild."}
          </p>
        </AnimatedSection>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* score dials */}
          <div className="lg:col-span-5 flex justify-center gap-10 sm:gap-14">
            {report.gauges.map((g) => (
              <Gauge key={g.label} {...g} unit={report.gaugeUnit} play={play} reduced={reduced} />
            ))}
          </div>
          {/* before/after bars */}
          <div className="lg:col-span-7 space-y-7">
            {report.bars.map((b) => (
              <Bar key={b.label} {...b} word={report.improvementWord} play={play} reduced={reduced} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
