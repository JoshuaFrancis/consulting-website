import { Section } from "@/components/layout/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { BookButton } from "@/components/booking/book-button";

// Guide structure: easy start → the work phase, from their side → the outcome.
const STEPS = [
  {
    num: "01",
    title: "Book a free consultation",
    body: "Thirty minutes. We look at where your current site is costing you credibility, and I give you an honest read on what I'd do. No pitch deck, no pressure.",
  },
  {
    num: "02",
    title: "I design and build it",
    body: "One owner, start to finish. You see the direction early, give feedback as it takes shape, and never manage a designer-to-developer handoff.",
  },
  {
    num: "03",
    title: "You look as established as you are",
    body: "The right clients take you seriously before the first call, and your fees feel justified. An optional Care Plan keeps the site fast, secure, and sharp.",
  },
];

export function ProcessSection() {
  return (
    <Section>
      <AnimatedSection>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.05]">
          Three steps to{" "}
          <span className="text-em">being taken seriously.</span>
        </h2>
        <p className="mt-4 text-muted-foreground max-w-2xl">
          No fifteen-step methodology, no committee. One call, one owner, one
          result.
        </p>
      </AnimatedSection>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
        {STEPS.map((step, i) => (
          <AnimatedSection key={step.num} delay={i * 0.1}>
            <div className="group relative h-full rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:border-accent/40 hover:shadow-lg">
              <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="font-mono text-5xl font-semibold leading-none text-accent/20">
                {step.num}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground leading-snug">
                {step.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {step.body}
              </p>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection delay={0.3}>
        <div className="mt-10 flex items-center gap-4">
          <BookButton>Book a free consultation</BookButton>
          <span className="text-sm text-muted-foreground">
            30 minutes. Free. No pitch.
          </span>
        </div>
      </AnimatedSection>

      {/* Post-process testimonial — Video 6 requirement: smooth/easy working experience */}
      <AnimatedSection delay={0.35}>
        <figure className="mt-14 rounded-2xl border border-border bg-card p-8 md:p-10">
          <blockquote className="text-lg md:text-xl font-medium text-foreground leading-snug">
            &ldquo;Everything went smoothly, communication was fluent, delivered on time and as expected. I highly recommend working with Joshua.&rdquo;
          </blockquote>
          <figcaption className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Product Design Client</span>
            <span className="text-muted-foreground/40">·</span>
            <span>Verified engagement</span>
          </figcaption>
        </figure>
      </AnimatedSection>
    </Section>
  );
}
