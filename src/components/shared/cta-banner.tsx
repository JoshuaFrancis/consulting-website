"use client";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { AnimatedSection } from "./animated-section";
import { ArrowRight } from "lucide-react";
import { getMailtoHref } from "@/lib/email";

interface CTABannerProps {
  heading?: string;
  subheading?: string;
  buttonText?: string;
}

export function CTABanner({
  heading = "Have something you want to build?",
  subheading = "Let's talk about your project. Free 30-minute call, no pitch deck required.",
  buttonText = "Get in Touch",
}: CTABannerProps) {
  return (
    <Section className="animated-gradient text-primary-foreground py-20 md:py-24 relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 dot-pattern opacity-10" aria-hidden="true" />

      <AnimatedSection>
        <div className="relative text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
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
      </AnimatedSection>
    </Section>
  );
}
