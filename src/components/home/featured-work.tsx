import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { CaseStudyCollage, type CollageRow } from "@/components/work/case-collage";

// Curated to the umbrella: website credibility work first, RoomLab as the deep end.
// Same rows/order as the /work page collage, so the two stay visually identical.
const ROWS: CollageRow[] = [
  { slug: "shiki-studios-acting-school", fill: "navy", imageLeft: true },
  { slug: "splash-inn-dive-resort", fill: "blue", imageLeft: false },
  { slug: "synthminds-brand-platform", fill: "white", imageLeft: true },
  { slug: "ai-image-creation-course", fill: "navy", imageLeft: false },
];

export function FeaturedWork() {
  return (
    <Section id="work" className="bg-muted/30 border-y border-border/60">
      <AnimatedSection>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.05]">
          Websites that made the business look{" "}
          <span className="text-em">as strong online as it already was.</span>
        </h2>
      </AnimatedSection>

      <AnimatedSection delay={0.1} className="mt-12">
        <CaseStudyCollage rows={ROWS} className="ring-1 ring-border" />
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <Link
          href="/work"
          className="mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline underline-offset-4"
        >
          View all work
          <ArrowUpRight className="size-3.5" />
        </Link>
      </AnimatedSection>
    </Section>
  );
}
