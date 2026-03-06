import type { Metadata } from "next";
import { ScrollHeroSection } from "@/components/ui/scroll-hero-section";
import { Section } from "@/components/layout/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { CTABanner } from "@/components/shared/cta-banner";
import { services } from "@/lib/data/services";
import { Search, Lightbulb, Code, Repeat } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description:
    "End-to-end AI consulting, from strategy to production deployment. AI strategy, LLM implementation, agent development, and UX/UI design.",
};

const processSteps = [
  {
    step: "01",
    icon: Search,
    title: "Understand",
    description:
      "I learn your business, your users, and what you've already tried. I need to understand the problem before I can build the right thing.",
  },
  {
    step: "02",
    icon: Lightbulb,
    title: "Plan",
    description:
      "I figure out what's worth building and how to build it. Practical scope, realistic timeline, clear deliverables.",
  },
  {
    step: "03",
    icon: Code,
    title: "Build",
    description:
      "I design and build iteratively, shipping early, getting feedback, and refining. You see working software, not status updates.",
  },
  {
    step: "04",
    icon: Repeat,
    title: "Refine",
    description:
      "After launch, I help optimize what's working and fix what isn't. The first version is rarely the final version.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <ScrollHeroSection />

      {/* Service Details */}
      {services.map((service, i) => {
        const Icon = service.icon;
        const isEven = i % 2 === 0;
        return (
          <Section
            key={service.slug}
            id={service.slug}
            className={isEven ? "" : "bg-muted/50"}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              <AnimatedSection>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h2 className="mt-6 text-3xl font-semibold tracking-tight text-foreground">
                  {service.title}
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-8 p-6 rounded-lg bg-muted/50 border border-border">
                  <p className="text-sm font-medium text-foreground">
                    Typical engagement
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {service.typicalEngagement}
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                      What&apos;s Included
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {service.includes.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm text-muted-foreground"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                      Who It&apos;s For
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {service.whoItsFor}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </Section>
        );
      })}

      {/* Process */}
      <Section>
        <AnimatedSection>
          <p className="text-sm font-medium text-accent uppercase tracking-wider">
            Process
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            How every engagement works
          </h2>
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {processSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <AnimatedSection key={step.title} delay={i * 0.1}>
                <div className="space-y-4">
                  <span className="text-sm font-mono text-accent">
                    {step.step}
                  </span>
                  <div className="w-10 h-10 rounded-md bg-accent/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </Section>

      <CTABanner
        heading="Have a project in mind?"
        subheading="Let's talk about what you're building and how I can help."
      />
    </>
  );
}
