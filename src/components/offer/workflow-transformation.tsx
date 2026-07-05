"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, FileSpreadsheet, MessageSquare, ClipboardCopy,
  RefreshCw, Bell, FileText, Clock, Sparkles, CheckCircle2, ShieldCheck,
} from "lucide-react";
import { AnimatedSection } from "@/components/shared/animated-section";
import { BookButton } from "@/components/booking/book-button";

/* Shared coordinate space — both the SVG lines and the HTML chips
   map into this box, so they always line up at any screen size. */
const W = 640;
const H = 260;

type Pt = { x: number; y: number };

interface Chip {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  at: Pt; // center point
}

/* ── BEFORE: the tangle of manual work ── */
const CHAOS_NODES: Chip[] = [
  { id: "c1", label: "Email", icon: Mail, at: { x: 95, y: 58 } },
  { id: "c2", label: "Spreadsheet", icon: FileSpreadsheet, at: { x: 325, y: 45 } },
  { id: "c3", label: "Manual report", icon: FileText, at: { x: 545, y: 68 } },
  { id: "c4", label: "Slack ping", icon: MessageSquare, at: { x: 185, y: 150 } },
  { id: "c5", label: "Copy + paste", icon: ClipboardCopy, at: { x: 425, y: 140 } },
  { id: "c6", label: "Chase update", icon: Bell, at: { x: 560, y: 200 } },
  { id: "c7", label: "Re-format", icon: RefreshCw, at: { x: 150, y: 212 } },
];

/* deliberately crossing connections */
const CHAOS_LINKS: [string, string][] = [
  ["c1", "c2"], ["c1", "c5"], ["c2", "c4"], ["c2", "c6"],
  ["c3", "c7"], ["c4", "c5"], ["c5", "c3"], ["c7", "c6"],
  ["c4", "c3"], ["c1", "c4"],
];

/* ── AFTER: one clean flow ── */
const CLEAN_NODES: Chip[] = [
  { id: "s1", label: "Trigger", icon: Clock, at: { x: 130, y: 130 } },
  { id: "s2", label: "AI handles it", icon: Sparkles, at: { x: 320, y: 130 } },
  { id: "s3", label: "Done", icon: CheckCircle2, at: { x: 510, y: 130 } },
];

const CLEAN_LINKS: [string, string][] = [["s1", "s2"], ["s2", "s3"]];

function center(nodes: Chip[], id: string) {
  return nodes.find((n) => n.id === id)!.at;
}

const pct = (v: number, max: number) => `${(v / max) * 100}%`;

function NodeChip({ chip, tone }: { chip: Chip; tone: "chaos" | "clean" }) {
  const Icon = chip.icon;
  const styles =
    tone === "chaos"
      ? "border-red-400/30 bg-red-500/[0.06] text-red-200/80"
      : "border-accent/50 bg-accent/[0.12] text-white";
  const iconWrap =
    tone === "chaos"
      ? "border-red-400/30 bg-red-500/10 text-red-300"
      : "border-accent/50 bg-accent/20 text-accent";
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: pct(chip.at.x, W), top: pct(chip.at.y, H) }}
    >
      <div className={`flex items-center gap-1.5 rounded-lg border px-2 py-1 backdrop-blur-sm ${styles}`}>
        <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${iconWrap}`}>
          <Icon className="h-3 w-3" />
        </span>
        <span className="whitespace-nowrap text-[9px] font-medium tracking-tight md:text-[10px]">
          {chip.label}
        </span>
      </div>
    </div>
  );
}

/* The animated graph: tangle of manual steps → one clean AI flow. */
export function WorkflowCanvas() {
  const [phase, setPhase] = useState<"chaos" | "clean">("chaos");

  useEffect(() => {
    const id = setInterval(() => {
      setPhase((p) => (p === "chaos" ? "clean" : "chaos"));
    }, 3600);
    return () => clearInterval(id);
  }, []);

  const isChaos = phase === "chaos";

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0f]">
      {/* status row */}
      <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2.5"
          >
            <span className={`h-2 w-2 rounded-full ${isChaos ? "bg-red-500" : "bg-emerald-400"}`} />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
              {isChaos ? "Before · 14 manual steps" : "After · 1 automated flow"}
            </span>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.span
            key={phase + "-stat"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`font-mono text-[11px] ${isChaos ? "text-red-300/70" : "text-emerald-400"}`}
          >
            {isChaos ? "6.5 hrs lost / week" : "6.5 hrs back / week"}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* canvas */}
      <div
        className="relative w-full"
        style={{
          aspectRatio: `${W} / ${H}`,
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      >
        {/* connection lines */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          aria-hidden
        >
          <motion.g animate={{ opacity: isChaos ? 1 : 0 }} transition={{ duration: 0.5 }}>
            {CHAOS_LINKS.map(([a, b], i) => {
              const p = center(CHAOS_NODES, a);
              const q = center(CHAOS_NODES, b);
              return (
                <line key={i} x1={p.x} y1={p.y} x2={q.x} y2={q.y}
                  stroke="rgba(239,68,68,0.35)" strokeWidth={1.25} strokeDasharray="5,5" />
              );
            })}
          </motion.g>
          <motion.g animate={{ opacity: isChaos ? 0 : 1 }} transition={{ duration: 0.5, delay: isChaos ? 0 : 0.25 }}>
            {CLEAN_LINKS.map(([a, b], i) => {
              const p = center(CLEAN_NODES, a);
              const q = center(CLEAN_NODES, b);
              return (
                <line key={i} x1={p.x} y1={p.y} x2={q.x} y2={q.y}
                  stroke="var(--color-accent)" strokeWidth={2} strokeLinecap="round" />
              );
            })}
          </motion.g>
        </svg>

        {/* chaos chips */}
        <motion.div className="absolute inset-0" animate={{ opacity: isChaos ? 1 : 0 }} transition={{ duration: 0.5 }} style={{ pointerEvents: "none" }}>
          {CHAOS_NODES.map((c) => <NodeChip key={c.id} chip={c} tone="chaos" />)}
        </motion.div>

        {/* clean chips */}
        <motion.div className="absolute inset-0" animate={{ opacity: isChaos ? 0 : 1 }} transition={{ duration: 0.5, delay: isChaos ? 0 : 0.25 }} style={{ pointerEvents: "none" }}>
          {CLEAN_NODES.map((c) => <NodeChip key={c.id} chip={c} tone="clean" />)}
        </motion.div>

        {/* AI sweep — fires on every phase change */}
        <motion.div
          key={phase + "-sweep"}
          initial={{ left: "-15%", opacity: 0 }}
          animate={{ left: "115%", opacity: [0, 1, 1, 0] }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="pointer-events-none absolute top-0 h-full w-24"
          style={{
            background: "linear-gradient(90deg, transparent, var(--color-accent), transparent)",
            filter: "blur(8px)",
            opacity: 0.5,
          }}
          aria-hidden
        />
      </div>
    </div>
  );
}

interface WorkflowHeroProps {
  headline: string;
  subhead: string;
  ctaButton: string;
  trustSignal?: string;
}

/* Full hero for the AI workflow offer: copy on top, wide canvas below. */
export function WorkflowHero({ headline, subhead, ctaButton, trustSignal }: WorkflowHeroProps) {
  const [phase, setPhase] = useState<"chaos" | "clean">("chaos");
  useEffect(() => {
    const id = setInterval(() => setPhase((p) => (p === "chaos" ? "clean" : "chaos")), 3600);
    return () => clearInterval(id);
  }, []);
  const isChaos = phase === "chaos";

  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden border-b border-white/10 bg-[#08080c] pt-32 pb-20 md:pt-40 md:pb-28">
      <Image
        src="/ai-workflow-hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* readability scrim */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#08080c]/95 via-[#08080c]/70 to-[#08080c]/30"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-8">
        <AnimatedSection>
          <h1 className="max-w-4xl text-4xl font-semibold leading-[1.02] tracking-tight text-white text-balance md:text-6xl">
            {headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl">
            {subhead}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <BookButton>{ctaButton}</BookButton>
            <Link
              href="#proof"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/[0.08]"
            >
              See the proof
            </Link>
          </div>
          {trustSignal && (
            <p className="mt-8 flex items-start gap-2.5 border-t border-white/10 pt-7 text-sm text-white/45">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{trustSignal}</span>
            </p>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}
