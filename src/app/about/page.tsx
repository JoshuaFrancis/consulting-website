import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { CTABanner } from "@/components/shared/cta-banner";
import { Target, Users, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Product designer turned AI builder. I design and ship AI products, from conversational agents to full SaaS platforms.",
};

const values = [
  {
    icon: Target,
    title: "Ship, Don't Slide",
    description:
      "I build working products, not slide decks. If it doesn't ship, it doesn't count.",
  },
  {
    icon: Users,
    title: "Design-Driven AI",
    description:
      "AI products fail when nobody wants to use them. I bring design thinking to technical products so they actually get adopted.",
  },
  {
    icon: BarChart3,
    title: "Full Picture",
    description:
      "I work across design, AI, and product so nothing gets lost in translation between what's built and what users need.",
  },
];

const experience = [
  {
    role: "Agent Designer",
    company: "PolyAI",
    period: "2024 to Present",
    description:
      "Designing conversational AI agents for enterprise customers at one of the leading voice AI companies.",
  },
  {
    role: "AI Image Course Instructor",
    company: "Uplimit",
    period: "2024",
    description:
      "Created and taught a course on AI image generation, covering practical techniques for creating with generative AI.",
  },
  {
    role: "Founding Design Lead",
    company: "SynthMinds",
    period: "2023 to 2024",
    description:
      "Led design for an AI consulting and education firm working with enterprise clients including NVIDIA, PwC, and Kraft Heinz.",
  },
  {
    role: "Freelance Product Designer",
    company: "",
    period: "2021 to 2024",
    description:
      "Designed products for a range of clients, from startup MVPs to corporate websites focused on conversion optimization.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About"
        accent="Joshua Francis"
        subtitle="Product designer turned AI builder. I design and ship AI products, from conversational agents to full SaaS platforms."
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
                I&apos;m a product designer turned AI builder. I started in UX,
                designing interfaces for data-heavy products and client
                websites. Over time, I got pulled deeper into the AI side —
                first through design work at an AI consulting firm, then into
                designing conversational AI agents full-time.
              </p>
              <p>
                I also build AI products on my own. I shipped{" "}
                <a href="https://www.roomlab.ca" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline underline-offset-4">
                  RoomLab
                </a>
                , an AI-powered interior design tool, from scratch. The AI
                pipeline, the app, the payments, everything. I&apos;ve also
                taught a course on AI image generation at Uplimit.
              </p>
              <p>
                What I bring to consulting is uncommon: I can design the
                product, build the AI integration, and ship the whole thing. No
                handoffs, no lost-in-translation moments between design and
                engineering.
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
