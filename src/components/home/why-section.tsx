import { Section } from "@/components/layout/section";
import { AnimatedSection } from "@/components/shared/animated-section";

const PROBLEMS = [
  {
    pain: "\"A client admitted they almost went with someone else, our website nearly talked them out of it.\"",
    cost: "A referral can save a sale like that once. Every visitor who arrives without one is deciding based on a site that undersells what you actually deliver.",
  },
  {
    pain: "\"Prospects are interested, but I can feel them checking if we're really worth the fee.\"",
    cost: "The trust decision happens in the first seconds on the site. A dated or cheap-looking one means your expertise never gets a hearing.",
  },
  {
    pain: "\"The redesign looked better, but it still didn't make us feel more credible.\"",
    cost: "A prettier redesign changes the look, not the trust signal. Decoration doesn't move the business; engineered credibility does.",
  },
];

export function WhySection() {
  return (
    <Section className="bg-muted/30">
      <AnimatedSection>
        <h2 className="max-w-4xl text-3xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.05] text-balance">
          You do great work.{" "}
          <span className="text-em">So why does your site undersell it?</span>
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
        <p className="mt-12 max-w-2xl text-xl leading-relaxed">
          <span className="font-semibold text-foreground">
            It&apos;s not your talent. It&apos;s trust, and it&apos;s
            fixable.
          </span>{" "}
          <span className="text-muted-foreground">
            Here&apos;s what changed when the website finally matched the
            reputation behind it.
          </span>
        </p>
      </AnimatedSection>
    </Section>
  );
}
