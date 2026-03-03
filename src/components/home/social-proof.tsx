import { Section } from "@/components/layout/section";
import { AnimatedSection } from "@/components/shared/animated-section";

const metrics = [
  { metric: "50+", description: "AI Projects Delivered" },
  { metric: "15+", description: "Enterprise Clients" },
  { metric: "3x", description: "Average ROI" },
  { metric: "5+", description: "Years in AI" },
];

export function SocialProof() {
  return (
    <Section className="border-y border-border py-16 md:py-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {metrics.map((item, i) => (
          <AnimatedSection key={item.description} delay={i * 0.1}>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-semibold tracking-tight text-gradient">
                {item.metric}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {item.description}
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </Section>
  );
}
