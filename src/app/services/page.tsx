import type { Metadata } from "next";
import { ScrollHeroSection } from "@/components/ui/scroll-hero-section";
import { Section } from "@/components/layout/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { CTABanner } from "@/components/shared/cta-banner";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "End-to-end AI consulting, from strategy to production deployment. AI strategy, LLM implementation, agent development, and UX/UI design.",
};

const processSteps = [
  {
    step: "01",
    title: "Understand",
    description:
      "I learn your business, your users, and what you've already tried.",
  },
  {
    step: "02",
    title: "Plan",
    description:
      "I figure out what's worth building and how to build it.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "I ship early, get feedback, and refine. You see working software, not status updates.",
  },
  {
    step: "04",
    title: "Refine",
    description:
      "After launch, I optimize what's working and fix what isn't.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <ScrollHeroSection />

      {/* Services */}
      <Section>
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            What I do.{" "}
            <span className="font-serif italic text-muted-foreground">
              And how.
            </span>
          </h2>
        </AnimatedSection>

        <div className="mt-14 space-y-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <AnimatedSection key={service.slug} delay={i * 0.08}>
                <div
                  id={service.slug}
                  className="gradient-border rounded-2xl p-8 md:p-10 scroll-mt-24"
                >
                  <div className="grid grid-cols-1 md:grid-cols-[1fr,1px,1fr] gap-8 md:gap-10">
                    {/* Left: description */}
                    <div>
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                          <Icon className="w-4.5 h-4.5 text-accent" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground">
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                      <p className="mt-5 text-sm text-muted-foreground/70 italic">
                        {service.typicalEngagement}
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="hidden md:block bg-border" />

                    {/* Right: includes + who it's for */}
                    <div>
                      <ul className="space-y-2.5">
                        {service.includes.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm text-muted-foreground"
                          >
                            <div className="w-1 h-1 rounded-full bg-accent mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-6 text-sm text-foreground/60 leading-relaxed border-t border-border pt-5">
                        {service.whoItsFor}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </Section>

      {/* Process */}
      <Section className="bg-muted/30">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            How it{" "}
            <span className="font-serif italic">works.</span>
          </h2>
        </AnimatedSection>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-6">
          {processSteps.map((step, i) => (
            <AnimatedSection key={step.title} delay={i * 0.1}>
              <div className="relative">
                <span className="text-5xl font-bold text-accent/10">
                  {step.step}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      <CTABanner
        heading="Have a project in mind?"
        subheading="Let's talk about what you're building and how I can help."
      />
    </>
  );
}
