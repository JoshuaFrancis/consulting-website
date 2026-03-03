import { Section } from "@/components/layout/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { caseStudies } from "@/lib/data/case-studies";
import { testimonials } from "@/lib/data/testimonials";
import { Quote } from "lucide-react";

interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
}

export function Testimonials() {
  const caseStudyTestimonials: TestimonialItem[] = caseStudies
    .filter((s) => s.testimonial)
    .map((s) => ({
      quote: s.testimonial!.quote,
      author: s.testimonial!.author,
      role: s.testimonial!.role,
    }));

  const upworkTestimonials: TestimonialItem[] = testimonials.map((t) => ({
    quote: t.quote,
    author: t.author,
    role: t.role,
  }));

  const allTestimonials = [...caseStudyTestimonials, ...upworkTestimonials];

  // Split into long and short quotes for bento layout
  const sorted = [...allTestimonials].sort(
    (a, b) => b.quote.length - a.quote.length
  );
  const long = sorted.filter((t) => t.quote.length > 200);
  const short = sorted.filter((t) => t.quote.length <= 200);

  // Interleave: [long, short], [short, long], [remaining full-width]
  const bentoItems: (TestimonialItem & { span: string })[] = [];
  let li = 0;
  let si = 0;
  let row = 0;
  while (li < long.length || si < short.length) {
    if (row % 2 === 0) {
      if (li < long.length) bentoItems.push({ ...long[li++], span: "md:col-span-2" });
      if (si < short.length) bentoItems.push({ ...short[si++], span: "md:col-span-1" });
    } else {
      if (si < short.length) bentoItems.push({ ...short[si++], span: "md:col-span-1" });
      if (li < long.length) bentoItems.push({ ...long[li++], span: "md:col-span-2" });
    }
    row++;
  }
  // If the last item leaves an incomplete row, make it full-width
  const totalSpan = bentoItems.reduce((sum, item) => {
    const s = parseInt(item.span.replace("md:col-span-", ""));
    return sum + s;
  }, 0);
  if (totalSpan % 3 !== 0 && bentoItems.length > 0) {
    bentoItems[bentoItems.length - 1].span = "md:col-span-3";
  }

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

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {bentoItems.map((item, i) => (
          <AnimatedSection
            key={`${item.author}-${i}`}
            delay={i * 0.1}
            className={item.span}
          >
            <div className="relative p-8 rounded-xl gradient-border h-full flex flex-col">
              <Quote className="w-10 h-10 text-accent/15 mb-5 flex-shrink-0" />
              <blockquote className="text-foreground leading-relaxed text-[15px] flex-1">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <div className="mt-8 pt-6 border-t border-border/60 flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-accent/25 via-accent/15 to-accent/5 flex items-center justify-center ring-1 ring-accent/10">
                  <span className="text-sm font-bold text-accent">
                    {item.author[0]}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {item.author}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.role}
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
