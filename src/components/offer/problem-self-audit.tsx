"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { AnimatedSection } from "@/components/shared/animated-section";
import { BookButton } from "@/components/booking/book-button";
import { cn } from "@/lib/utils";
import type { ProblemQuote } from "@/lib/data/services";

/* film-grain noise, encoded so it needs no asset */
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function emphasize(quote: string, emphasis?: string) {
  if (!emphasis || !quote.includes(emphasis)) return quote;
  const idx = quote.indexOf(emphasis);
  return (
    <>
      {quote.slice(0, idx)}
      <mark className="bg-accent/25 text-white rounded-[3px] px-1 [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
        {emphasis}
      </mark>
      {quote.slice(idx + emphasis.length)}
    </>
  );
}

/* Live EKG / vitals line, amplitude + speed scale with the leak level (0..1). */
function Vitals({ level, severe }: { level: number; severe: boolean }) {
  const amp = 3 + level * 32;
  const seg = 100;
  const beats = 9;
  let d = "M0 40";
  for (let b = 0; b < beats; b++) {
    const x = b * seg;
    d +=
      ` L${x + 22} 40` +
      ` L${x + 30} ${40 - amp * 0.22}` +
      ` L${x + 38} ${40 + amp * 0.16}` +
      ` L${x + 46} ${(40 - amp).toFixed(1)}` +
      ` L${x + 54} ${(40 + amp * 0.6).toFixed(1)}` +
      ` L${x + 62} 40` +
      ` L${x + seg} 40`;
  }
  const color = severe ? "#ef4444" : "var(--color-accent)";
  return (
    <div className="relative h-16 w-full overflow-hidden">
      <svg
        viewBox={`0 0 ${seg * beats} 80`}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-[200%]"
        style={{ filter: `drop-shadow(0 0 6px ${color})` }}
      >
        <motion.path
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ x: [0, -seg] }}
          transition={{ duration: Math.max(0.9, 3.2 - level * 2.2), repeat: Infinity, ease: "linear" }}
        />
      </svg>
      {/* baseline grid */}
      <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
    </div>
  );
}

interface Props {
  quotes: ProblemQuote[];
  whyItFails?: string;
  problemBridge?: string;
  ctaButton: string;
  unit: string;
}

export function ProblemSelfAudit({
  quotes,
  whyItFails,
  problemBridge,
  ctaButton,
  unit,
}: Props) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const count = selected.size;
  const total = quotes.length;
  const pct = Math.round((count / total) * 100);
  const level = count / total;
  const severe = count >= total;

  const toggle = (i: number) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  const severity = count === 0 ? "Awaiting input" : count <= 2 ? "Low" : count <= 4 ? "Building" : "Critical";
  const read =
    count === 0
      ? "Tap the symptoms that sound like you."
      : count <= 2
        ? `Even one of these is enough to cost you ${unit}.`
        : count <= 4
          ? `That's a pattern, you're quietly losing ${unit}.`
          : `All ${total}. Let's not let this keep compounding.`;

  const notes =
    count > 0
      ? "From the self-audit on your site, these are true for me:\n" +
        [...selected].sort((a, b) => a - b).map((i) => "• " + quotes[i].quote).join("\n")
      : undefined;

  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-[#08080c] py-24 md:py-32">
      {/* atmosphere */}
      <div className="absolute inset-0 dot-pattern opacity-[0.06]" aria-hidden="true" />
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: NOISE }}
        aria-hidden="true"
      />
      {/* ambient glow grows with the leak */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 rounded-full blur-[120px] transition-all duration-1000"
        style={{
          width: 700,
          height: 500,
          opacity: 0.08 + level * 0.22,
          background: severe ? "#ef4444" : "var(--color-accent)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-6 md:px-8">
        {/* console header */}
        <AnimatedSection>
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
            <span>Self-audit · 00:10</span>
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Live
            </span>
          </div>
          <h2 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.0]">
            Sound <span className="text-accent">familiar?</span>
          </h2>
          <p className="mt-5 text-lg text-white/55 max-w-xl">
            Run the 10-second self-audit.{" "}
            <span className="text-white/80">Tap every symptom that&apos;s true for you</span>, it&apos;s
            the gut-check version of what I&apos;d do on the call.
          </p>
        </AnimatedSection>

        {/* symptom instruments */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-4">
          {quotes.map((q, i) => {
            const isSel = selected.has(i);
            return (
              <AnimatedSection
                key={i}
                delay={i * 0.06}
                className={`col-span-1 ${q.lead ? "md:col-span-8" : "md:col-span-4"}`}
              >
                <motion.button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-pressed={isSel}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.985 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  className={cn(
                    "group relative flex h-full w-full flex-col text-left rounded-2xl border backdrop-blur-sm transition-colors duration-300",
                    q.lead ? "p-7 md:p-9" : "p-6",
                    isSel
                      ? "border-accent bg-accent/[0.10] shadow-[0_0_40px_-8px_var(--color-accent)]"
                      : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.05]"
                  )}
                >
                  {/* instrument label + check */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
                      Symptom {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                    </span>
                    <motion.span
                      animate={isSel ? { scale: 1 } : { scale: 0.85 }}
                      transition={{ type: "spring", stiffness: 500, damping: 22 }}
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full border transition-colors",
                        isSel
                          ? "bg-accent border-accent text-white"
                          : "border-white/20 bg-white/5 text-transparent group-hover:border-accent/50"
                      )}
                    >
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </motion.span>
                  </div>

                  <blockquote
                    className={cn(
                      "mt-5 font-medium text-white leading-snug",
                      q.lead ? "text-2xl md:text-[2rem]" : "text-lg md:text-xl"
                    )}
                  >
                    {emphasize(q.quote, q.emphasis)}
                  </blockquote>

                  {(q.consequence || q.attribution) && (
                    <div className="mt-auto pt-6">
                      {q.consequence && (
                        <div className="flex items-start gap-2 text-sm font-medium text-accent">
                          <span aria-hidden className="mt-px">
                            &rarr;
                          </span>
                          <span>{q.consequence}</span>
                        </div>
                      )}
                      {q.attribution && (
                        <div className="mt-2 font-mono text-[11px] text-white/35">
                          / {q.attribution}
                        </div>
                      )}
                    </div>
                  )}
                </motion.button>
              </AnimatedSection>
            );
          })}
        </div>

        {/* vitals readout */}
        <AnimatedSection delay={0.1}>
          <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.02] p-7 md:p-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                  Diagnostic reading
                </div>
                <div className="mt-2 flex items-baseline gap-3">
                  <span
                    className={cn(
                      "text-5xl md:text-6xl font-semibold tracking-tight tabular-nums transition-colors",
                      severe ? "text-red-400" : "text-white"
                    )}
                  >
                    {pct}
                    <span className="text-2xl text-white/40">%</span>
                  </span>
                  <span
                    className={cn(
                      "font-mono text-xs uppercase tracking-[0.16em] transition-colors",
                      severe ? "text-red-400" : count > 0 ? "text-accent" : "text-white/40"
                    )}
                  >
                    {severity}
                  </span>
                </div>
              </div>
              <div className="w-full max-w-sm">
                <Vitals level={level} severe={severe} />
              </div>
            </div>

            <p className="mt-7 text-xl md:text-2xl font-medium text-white leading-snug max-w-3xl">
              {read}
            </p>
            {whyItFails && (
              <p className="mt-4 text-base md:text-lg text-white/50 leading-relaxed max-w-3xl">
                {whyItFails}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <BookButton variant="inverted" notes={notes}>
                {ctaButton}
              </BookButton>
              {count > 0 && (
                <span className="font-mono text-xs text-white/45">
                  {count}/{total} flagged, I&apos;ll have it before we talk.
                </span>
              )}
            </div>
          </div>
        </AnimatedSection>

        {/* the turn toward the fix */}
        {problemBridge && (
          <AnimatedSection delay={0.15}>
            <p className="mt-12 text-2xl md:text-3xl font-semibold text-white leading-snug max-w-3xl text-balance">
              {problemBridge}
            </p>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
