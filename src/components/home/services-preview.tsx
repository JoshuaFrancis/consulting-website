"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Section } from "@/components/layout/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { services } from "@/lib/data/services";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedCursor } from "@/components/ui/figma-cursor";

const cardConfig = [
  { colSpan: "md:col-span-4" },
  { colSpan: "md:col-span-2" },
  { colSpan: "md:col-span-2" },
  { colSpan: "md:col-span-4" },
];

const imageCards: Record<number, string> = {
  0: "/Abstract image1.jpg",
  1: "/Abstract image2.jpg",
};

function AgentDevelopmentGraphic({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden bg-black", className)}>
      {/* Subtle glow */}
      <div className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-emerald-500/[0.06] blur-3xl" />

      {/* Agent execution panel */}
      <div className="absolute top-6 left-5 right-5 bottom-[36%] rounded-lg border border-white/[0.08] overflow-hidden bg-[#0a0a0a]">
        {/* Panel header */}
        <div className="flex items-center justify-between px-3 h-7 border-b border-white/[0.06]">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
            <span className="text-[9px] text-white/40 font-medium tracking-wide">
              Agent Run
            </span>
          </div>
          <span className="text-[8px] text-white/20 font-mono">1.2s</span>
        </div>

        {/* Execution trace */}
        <div className="p-3 font-mono text-[9px] leading-relaxed">
          {/* User input */}
          <div className="flex items-start gap-2 mb-3">
            <div className="w-4 h-4 rounded-full bg-blue-500/20 border border-blue-500/30 shrink-0 mt-0.5 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-blue-400" />
            </div>
            <div className="px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">
              <span className="text-white/50">
                &quot;Summarize Q4 revenue&quot;
              </span>
            </div>
          </div>

          {/* Tool calls - tree structure */}
          <div className="ml-2 pl-3 border-l border-white/[0.06] space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-px bg-white/[0.08]" />
              <div className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/15">
                <span className="text-emerald-400/70">search</span>
                <span className="text-white/20">(revenue, Q4)</span>
              </div>
              <span className="text-white/15 hidden min-[400px]:inline">
                → 3 results
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-2.5 h-px bg-white/[0.08]" />
              <div className="px-2 py-0.5 rounded bg-violet-500/10 border border-violet-500/15">
                <span className="text-violet-400/70">analyze</span>
                <span className="text-white/20">(data)</span>
              </div>
              <span className="text-white/15 hidden min-[400px]:inline">
                → trends
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-2.5 h-px bg-white/[0.08]" />
              <div className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/15">
                <span className="text-amber-400/70">draft</span>
                <span className="text-white/20">(summary)</span>
              </div>
              <span className="text-emerald-400/40">✓</span>
            </div>
          </div>

          {/* Status bar */}
          <div className="flex items-center gap-3 mt-3 pt-2 border-t border-white/[0.04]">
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 rounded-full bg-emerald-400/60" />
              <span className="text-white/20 text-[8px]">3 tools</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 rounded-full bg-blue-400/40" />
              <span className="text-white/20 text-[8px]">247 tokens</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade for text readability */}
      <div className="absolute bottom-0 left-0 right-0 h-[42%] bg-gradient-to-b from-transparent to-black" />
    </div>
  );
}

function DesignGraphic({ className }: { className?: string }) {
  const layers = [
    { name: "Hero Section", active: true, type: "frame" as const },
    { name: "Navigation", active: false, type: "frame" as const },
    { name: "Heading", active: false, type: "text" as const },
    { name: "CTA Button", active: false, type: "circle" as const },
    { name: "Card Grid", active: false, type: "frame" as const },
    { name: "Features", active: false, type: "frame" as const },
    { name: "Footer", active: false, type: "frame" as const },
  ];

  return (
    <div className={cn("relative overflow-hidden bg-black", className)}>
      {/* Subtle glow */}
      <div className="absolute top-[20%] left-[40%] w-64 h-64 rounded-full bg-violet-500/[0.04] blur-3xl" />

      {/* Design tool window */}
      <div className="absolute top-5 left-4 right-4 bottom-[35%] rounded-xl border border-white/[0.1] overflow-hidden bg-[#111]">
        {/* Window chrome */}
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

        {/* Main content area */}
        <div className="flex h-[calc(100%-1.75rem)]">
          {/* Layers sidebar */}
          <div className="w-28 md:w-32 border-r border-white/[0.06] bg-[#0d0d0d]">
            <div className="px-2 py-1.5 border-b border-white/[0.04]">
              <div className="h-4 rounded bg-white/[0.03] border border-white/[0.04] flex items-center px-1.5">
                <span className="text-[7px] text-white/15">
                  Search layers...
                </span>
              </div>
            </div>
            <div className="p-1 space-y-px">
              {layers.map((layer, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex items-center gap-1.5 px-1.5 py-0.5 rounded",
                    layer.active && "bg-accent/10"
                  )}
                >
                  <div
                    className={cn(
                      "w-2 h-2 shrink-0",
                      layer.type === "frame" && "rounded-sm border",
                      layer.type === "text" && "rounded-none border",
                      layer.type === "circle" && "rounded-full border",
                      layer.active ? "border-accent/40" : "border-white/[0.1]"
                    )}
                  />
                  <span
                    className={cn(
                      "text-[7px] truncate",
                      layer.active ? "text-white/50" : "text-white/25"
                    )}
                  >
                    {layer.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Canvas area */}
          <div className="flex-1 bg-[#1a1a1a] p-3 md:p-4 flex items-start justify-center overflow-hidden relative">
            {/* Figma cursor */}
            <div className="absolute top-[30%] left-[45%] z-10">
              <AnimatedCursor text="Joshua" />
            </div>
            <div className="w-full max-w-[240px] bg-[#0f0f0f] rounded-md border border-white/[0.06] overflow-hidden shadow-2xl shadow-black/50">
              {/* Nav */}
              <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-white/[0.04]">
                <div className="h-1.5 w-8 rounded bg-white/20" />
                <div className="flex gap-2">
                  <div className="h-1 w-5 rounded bg-white/[0.08]" />
                  <div className="h-1 w-5 rounded bg-white/[0.08]" />
                  <div className="h-1 w-5 rounded bg-white/[0.08]" />
                </div>
              </div>
              {/* Hero section */}
              <div className="px-2.5 py-2.5">
                <div className="h-1.5 w-[70%] rounded bg-white/15 mb-1" />
                <div className="h-1.5 w-[45%] rounded bg-white/15 mb-1.5" />
                <div className="h-1 w-full rounded bg-white/[0.04] mb-0.5" />
                <div className="h-1 w-[80%] rounded bg-white/[0.04] mb-2" />
                <div className="h-3.5 w-14 rounded bg-accent/40 border border-accent/25" />
              </div>
              {/* Card row */}
              <div className="px-2.5 pb-2 grid grid-cols-3 gap-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="rounded bg-white/[0.02] border border-white/[0.04] p-1"
                  >
                    <div className="h-5 rounded bg-white/[0.03] mb-0.5" />
                    <div className="h-0.5 rounded bg-white/[0.06] mb-0.5" />
                    <div className="h-0.5 rounded bg-white/[0.04] w-3/4" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Properties panel (hidden on mobile) */}
          <div className="hidden md:block w-36 border-l border-white/[0.06] bg-[#0d0d0d] p-2 space-y-2">
            <span className="text-[7px] text-white/30 font-medium uppercase tracking-wider">
              Properties
            </span>

            {/* Position */}
            <div>
              <span className="text-[7px] text-white/20 uppercase tracking-wide">
                Position
              </span>
              <div className="flex gap-1 mt-0.5">
                <div className="flex-1 h-3.5 rounded bg-white/[0.03] border border-white/[0.05] flex items-center px-1">
                  <span className="text-[6px] text-white/15">X</span>
                  <span className="text-[7px] text-white/35 ml-auto font-mono">
                    120
                  </span>
                </div>
                <div className="flex-1 h-3.5 rounded bg-white/[0.03] border border-white/[0.05] flex items-center px-1">
                  <span className="text-[6px] text-white/15">Y</span>
                  <span className="text-[7px] text-white/35 ml-auto font-mono">
                    48
                  </span>
                </div>
              </div>
            </div>

            {/* Size */}
            <div>
              <span className="text-[7px] text-white/20 uppercase tracking-wide">
                Size
              </span>
              <div className="flex gap-1 mt-0.5">
                <div className="flex-1 h-3.5 rounded bg-white/[0.03] border border-white/[0.05] flex items-center px-1">
                  <span className="text-[6px] text-white/15">W</span>
                  <span className="text-[7px] text-white/35 ml-auto font-mono">
                    1440
                  </span>
                </div>
                <div className="flex-1 h-3.5 rounded bg-white/[0.03] border border-white/[0.05] flex items-center px-1">
                  <span className="text-[6px] text-white/15">H</span>
                  <span className="text-[7px] text-white/35 ml-auto font-mono">
                    640
                  </span>
                </div>
              </div>
            </div>

            {/* Fill */}
            <div>
              <span className="text-[7px] text-white/20 uppercase tracking-wide">
                Fill
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-3.5 h-3.5 rounded bg-accent/50 border border-white/[0.08]" />
                <span className="text-[7px] text-white/30 font-mono">
                  #4F46E5
                </span>
              </div>
            </div>

            {/* Typography */}
            <div>
              <span className="text-[7px] text-white/20 uppercase tracking-wide">
                Font
              </span>
              <div className="mt-0.5 h-3.5 rounded bg-white/[0.03] border border-white/[0.05] flex items-center px-1.5">
                <span className="text-[7px] text-white/30">
                  Inter · 16 · Med
                </span>
              </div>
            </div>

            {/* Spacing */}
            <div>
              <span className="text-[7px] text-white/20 uppercase tracking-wide">
                Spacing
              </span>
              <div className="grid grid-cols-2 gap-1 mt-0.5">
                {["24", "16", "12", "8"].map((val, idx) => (
                  <div
                    key={idx}
                    className="h-3.5 rounded bg-white/[0.03] border border-white/[0.05] flex items-center justify-center"
                  >
                    <span className="text-[7px] text-white/25 font-mono">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade for text readability */}
      <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-b from-transparent to-black" />
    </div>
  );
}

export function ServicesPreview() {
  return (
    <Section>
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
          What I&apos;d build{" "}
          <span className="font-serif italic">for you</span>
        </h2>
        <p className="mt-4 text-muted-foreground max-w-2xl">
          Every engagement is different. Most start with one of these.
        </p>
      </AnimatedSection>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-6 gap-5">
        {services.map((service, i) => {
          const config = cardConfig[i];
          const cardImage = imageCards[i];

          return (
            <AnimatedSection
              key={service.slug}
              delay={i * 0.1}
              className={cn("col-span-1", config.colSpan)}
            >
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="h-full"
              >
                <Link
                  href={`/services#${service.slug}`}
                  className="group block rounded-2xl h-full overflow-hidden relative ring-1 ring-white/10 shadow-lg"
                >
                  {/* Card visual area */}
                  <div className="relative h-[26rem] md:h-[28rem]">
                    {cardImage && (
                      <Image
                        src={cardImage}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 66vw"
                      />
                    )}
                    {i === 2 && (
                      <AgentDevelopmentGraphic className="absolute inset-0" />
                    )}
                    {i === 3 && (
                      <DesignGraphic className="absolute inset-0" />
                    )}
                  </div>

                  {/* Gradient overlays for image cards */}
                  {cardImage && (
                    <>
                      <div
                        className="absolute bottom-0 left-0 right-0 h-[70%] backdrop-blur-xl"
                        style={{
                          WebkitMaskImage:
                            "linear-gradient(to bottom, transparent 0%, black 40%)",
                          maskImage:
                            "linear-gradient(to bottom, transparent 0%, black 40%)",
                        }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-[70%] bg-gradient-to-b from-transparent via-black/30 to-black/60" />
                    </>
                  )}

                  {/* Text content — white on dark */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-medium text-blue-300 uppercase tracking-[0.15em]">
                        {service.shortTitle}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-white/50 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-200 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/70 leading-relaxed">
                      {service.summary}
                    </p>
                  </div>
                </Link>
              </motion.div>
            </AnimatedSection>
          );
        })}
      </div>
    </Section>
  );
}
