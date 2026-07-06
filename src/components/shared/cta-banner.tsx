"use client";

import { Section } from "@/components/layout/section";
import { AnimatedSection } from "./animated-section";
import { BookButton } from "@/components/booking/book-button";
import { MeshBackdrop } from "@/components/ui/hero-shader";

interface CTABannerProps {
  heading?: string;
  subheading?: string;
  buttonText?: string;
}

export function CTABanner({
  heading = "Your next high-value client is looking at your site right now.",
  subheading = "Book a free 30-minute consultation. We'll look at where your current site may be creating doubt, what it would take to fix it, and whether a rebuild is actually the right move.",
  buttonText = "Start the conversation",
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
        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.2] bg-gradient-to-b from-white to-white/55 bg-clip-text text-transparent text-balance pb-1">
            {heading}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-white/60 text-lg leading-relaxed">
            {subheading}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <BookButton variant="inverted">{buttonText}</BookButton>
          </div>
        </div>
      </AnimatedSection>
    </Section>
  );
}
