import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { CTABanner } from "@/components/shared/cta-banner";
import { Target, Users, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "AI consultant and designer helping companies turn AI ambition into production reality.",
};

const values = [
  {
    icon: Target,
    title: "Ship, Don't Slide",
    description:
      "I deliver working systems, not 100-page strategy decks. Every engagement produces tangible, deployable outcomes.",
  },
  {
    icon: Users,
    title: "Human-Centered AI",
    description:
      "AI systems succeed when they're designed for the people who use them. I bring design rigor to technical implementation.",
  },
  {
    icon: BarChart3,
    title: "Measurable Impact",
    description:
      "Every project is anchored to business metrics. If we can't measure the impact, we rethink the approach.",
  },
];

const experience = [
  {
    role: "Independent AI Consultant",
    company: "",
    period: "2022 — Present",
    description:
      "Working with startups and enterprises on AI strategy, LLM implementation, and agent development.",
  },
  {
    role: "Lead AI Designer",
    company: "TechCorp AI",
    period: "2020 — 2022",
    description:
      "Led design and implementation of AI-powered products serving enterprise customers.",
  },
  {
    role: "Senior Product Designer",
    company: "DesignLab",
    period: "2018 — 2020",
    description:
      "Designed complex data-driven products with a focus on usability and user trust.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About"
        accent="Joshua Francis"
        subtitle="AI consultant & designer helping companies turn AI ambition into production reality."
      />

      {/* Bio */}
      <Section className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          <AnimatedSection>
            <div className="aspect-[4/5] rounded-lg bg-muted flex items-center justify-center">
              <span className="text-sm text-muted-foreground">Photo</span>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                I started my career in UX design, building interfaces for
                complex data products. But as I watched companies struggle to
                bridge the gap between AI capabilities and usable
                implementation, I found my real calling.
              </p>
              <p>
                Today, I work at the intersection of AI engineering and design
                thinking. I help companies move from &ldquo;we should use
                AI&rdquo; to production systems that create measurable business
                impact — not through slide decks and strategy documents, but
                through hands-on implementation.
              </p>
              <p>
                My background in both design and engineering means I build AI
                systems that aren&apos;t just technically sound — they&apos;re
                systems that people actually want to use. From LLM architectures
                and RAG pipelines to agent frameworks and conversational UIs, I
                bring the full picture.
              </p>
              <p>
                When I&apos;m not building, I&apos;m writing about practical AI
                implementation and speaking at industry events about closing the
                gap between AI research and production deployment.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </Section>

      {/* Values */}
      <Section className="bg-muted/50">
        <AnimatedSection>
          <p className="text-sm font-medium text-accent uppercase tracking-wider">
            My Approach
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            How I work
          </h2>
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, i) => {
            const Icon = value.icon;
            return (
              <AnimatedSection key={value.title} delay={i * 0.1}>
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-md bg-accent/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </Section>

      {/* Experience */}
      <Section>
        <AnimatedSection>
          <p className="text-sm font-medium text-accent uppercase tracking-wider">
            Background
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Experience
          </h2>
        </AnimatedSection>

        <div className="mt-12 space-y-8">
          {experience.map((item, i) => (
            <AnimatedSection key={item.period} delay={i * 0.1}>
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12 pb-8 border-b border-border last:border-0">
                <div className="md:w-48 flex-shrink-0">
                  <span className="text-sm text-muted-foreground">
                    {item.period}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.role}
                  </h3>
                  {item.company && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.company}
                    </p>
                  )}
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      <CTABanner
        heading="Let's work together."
        subheading="I'm currently available for new consulting engagements."
        buttonText="Get in Touch"
      />
    </>
  );
}
