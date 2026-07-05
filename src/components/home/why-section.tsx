import { Section } from "@/components/layout/section";
import { AnimatedSection } from "@/components/shared/animated-section";

const PROBLEMS = [
  {
    pain: "\"My website makes me look cheaper than I am.\"",
    cost: "Premium clients decide against you before you ever get the call. You discount to win work you should have closed at full price.",
  },
  {
    pain: "\"High-value clients judge my credibility before they ever contact me.\"",
    cost: "The trust decision happens in the first seconds on the site. A dated or cheap-looking one means your expertise never gets a hearing.",
  },
  {
    pain: "\"I hired someone and got a pretty site that still didn't make me look serious.\"",
    cost: "A prettier redesign changes the look, not the trust signal. Decoration doesn't move the business; engineered credibility does.",
  },
];

export function WhySection() {
  return (
    <Section className="bg-muted/30 border-y border-border/60">
      <AnimatedSection>
        <h2 className="max-w-4xl text-3xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.05] text-balance">
          You don&apos;t have a design problem. You have a{" "}
          <span className="text-em">trust problem.</span>
        </h2>
      </AnimatedSection>

      <div className="mt-12 divide-y divide-border/70 border-y border-border/70">
        {PROBLEMS.map((p, i) => (
          <AnimatedSection key={i} delay={i * 0.08}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8 py-7">
              <p className="text-lg md:text-2xl font-medium text-foreground leading-snug">
                {p.pain}
              </p>
              <p className="flex items-start gap-2 text-base text-muted-foreground leading-relaxed">
                <span aria-hidden className="mt-0.5 font-medium text-accent">
                  &rarr;
                </span>
                <span>{p.cost}</span>
              </p>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection delay={0.15}>
        <p className="mt-12 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          If any of this sounds familiar, here&apos;s what happened when firms in the same situation worked with me.
        </p>
      </AnimatedSection>
    </Section>
  );
}
