import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { AnimatedSection } from "./animated-section";
import { ArrowRight } from "lucide-react";

interface CTABannerProps {
  heading?: string;
  subheading?: string;
  buttonText?: string;
  buttonHref?: string;
}

export function CTABanner({
  heading = "Have something you want to build?",
  subheading = "Let's talk about your project. Free 30-minute call, no pitch deck required.",
  buttonText = "Schedule a Call",
  buttonHref = "/contact",
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
            <Link href={buttonHref}>
              {buttonText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </AnimatedSection>
    </Section>
  );
}
