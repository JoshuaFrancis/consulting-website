"use client";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { AnimatedSection } from "./animated-section";
import { ArrowRight } from "lucide-react";
import { getMailtoHref } from "@/lib/email";

const marqueeItems = [
  "Automate Support",
  "Accelerate Sales",
  "Streamline Operations",
  "Generate Content",
  "Analyze Data",
  "Ship Products",
  "Scale Teams",
];

function VerticalMarquee() {
  return (
    <div
      className="hidden lg:flex relative h-[400px] flex-col overflow-hidden select-none"
      style={
        {
          "--duration": "25s",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)",
        } as React.CSSProperties
      }
    >
      {/* First copy */}
      <div className="flex shrink-0 flex-col marquee-scroll-vertical">
        {marqueeItems.map((item, idx) => (
          <div
            key={idx}
            className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-tight text-primary-foreground/30 py-5"
          >
            {item}
          </div>
        ))}
      </div>

      {/* Duplicate for seamless loop */}
      <div
        className="flex shrink-0 flex-col marquee-scroll-vertical"
        aria-hidden="true"
      >
        {marqueeItems.map((item, idx) => (
          <div
            key={idx}
            className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-tight text-primary-foreground/30 py-5"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

interface CTABannerProps {
  heading?: string;
  subheading?: string;
  buttonText?: string;
}

export function CTABanner({
  heading = "AI is reshaping every corner of business. Let\u2019s find where it fits in yours.",
  subheading = "Free 30-minute call, no pitch deck required.",
  buttonText = "Get in Touch",
}: CTABannerProps) {
  return (
    <Section className="bg-black text-white py-20 md:py-24 relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 dot-pattern opacity-[0.04]"
        aria-hidden="true"
      />

      <AnimatedSection>
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: CTA content */}
          <div className="text-center lg:text-left">
            <h2
              className="text-3xl md:text-4xl font-semibold tracking-tight leading-snug bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent"
            >
              {heading}
            </h2>
            <p className="mt-4 text-primary-foreground/70 text-lg">
              {subheading}
            </p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="mt-8 shadow-lg"
            >
              <a href={getMailtoHref("Project Inquiry")}>
                {buttonText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Right: Vertical marquee (desktop only) */}
          <VerticalMarquee />
        </div>
      </AnimatedSection>
    </Section>
  );
}
