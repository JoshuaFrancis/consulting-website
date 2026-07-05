"use client";

import { Star } from "lucide-react";
import { Section } from "@/components/layout/section";
import { AnimatedSection } from "./animated-section";
import { BookButton } from "@/components/booking/book-button";
import { MeshBackdrop } from "@/components/ui/hero-shader";

const PROOF_STATS = [
  { metric: "3×", label: "Qualified enterprise leads — SynthMinds" },
  { metric: "+52%", label: "Longer average session — SynthMinds" },
  { metric: "100/100", label: "PageSpeed, 6× faster — Shiki Studios" },
];

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

interface CTABannerProps {
  heading?: string;
  subheading?: string;
  buttonText?: string;
}

export function CTABanner({
  heading = "Your next high-value client is looking at your site right now.",
  subheading = "Book a free consultation. We'll look at where your site is costing you premium work, and what it would take to fix it. No pitch deck. No obligation.",
  buttonText = "Book your free consultation",
}: CTABannerProps) {
  return (
    <Section className="bg-black text-white py-20 md:py-28 relative overflow-hidden">
      {/* Bookend: the hero's mesh language, dimmer and slower */}
      <MeshBackdrop
        colors={["#000000", "#0a1029", "#1e3a8a", "#2563ff", "#000000"]}
        speed={0.1}
        distortion={0.7}
        swirl={0.1}
        className="pointer-events-none absolute inset-0 opacity-40"
      />
      <div
        className="absolute inset-0 dot-pattern opacity-[0.04]"
        aria-hidden="true"
      />

      <AnimatedSection>
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Left: CTA content */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.05] bg-gradient-to-b from-white to-white/55 bg-clip-text text-transparent text-balance">
              {heading}
            </h2>
            <p className="mt-5 text-white/60 text-lg leading-relaxed">
              {subheading}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <BookButton variant="inverted">{buttonText}</BookButton>
            </div>

            {/* Proof right next to CTA - doc requirement */}
            <div className="mt-7 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 border-t border-white/10 pt-7">
              <div className="flex items-center gap-2">
                <Stars />
                <span className="text-sm text-white/50">5-star client reviews</span>
              </div>
              <span className="hidden sm:block text-white/20">·</span>
              <span className="text-sm text-white/50">3× qualified leads — SynthMinds</span>
              <span className="hidden sm:block text-white/20">·</span>
              <span className="text-sm text-white/50">One accountable owner</span>
            </div>
          </div>

          {/* Right: proof stats grid */}
          <div className="hidden lg:grid grid-cols-1 gap-5">
            {PROOF_STATS.map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-5"
              >
                <div className="text-3xl font-semibold tracking-tight bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent shrink-0">
                  {s.metric}
                </div>
                <div className="text-sm text-white/50 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </Section>
  );
}
