import { Section } from "@/components/layout/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { caseStudies } from "@/lib/data/case-studies";
import { Quote } from "lucide-react";

export function Testimonials() {
  const withTestimonials = caseStudies.filter((s) => s.testimonial);

  return (
    <Section>
      <AnimatedSection>
        <p className="text-sm font-medium text-accent uppercase tracking-wider">
          Client Feedback
        </p>
        <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
          What clients{" "}
          <span className="font-serif italic">say</span>
        </h2>
      </AnimatedSection>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {withTestimonials.slice(0, 4).map((study, i) => (
          <AnimatedSection key={study.slug} delay={i * 0.1}>
            <div className="relative p-8 rounded-xl gradient-border h-full flex flex-col">
              <Quote className="w-10 h-10 text-accent/15 mb-5 flex-shrink-0" />
              <blockquote className="text-foreground leading-relaxed text-[15px] flex-1">
                &ldquo;{study.testimonial!.quote}&rdquo;
              </blockquote>
              <div className="mt-8 pt-6 border-t border-border/60 flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-accent/25 via-accent/15 to-accent/5 flex items-center justify-center ring-1 ring-accent/10">
                  <span className="text-sm font-bold text-accent">
                    {study.testimonial!.author[0]}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {study.testimonial!.author}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {study.testimonial!.role}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </Section>
  );
}
