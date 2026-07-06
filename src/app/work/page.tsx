import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { JsonLd } from "@/components/shared/json-ld";
import { CTABanner } from "@/components/shared/cta-banner";
import { CaseStudyCollage, type CollageRow } from "@/components/work/case-collage";
import { caseStudies } from "@/lib/data/case-studies";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Credibility-first websites and products, designed and built end-to-end for premium brands, with measurable outcomes.",
  alternates: {
    canonical: "https://joshuafrancis.ca/work",
  },
};

// Alternating rows: each study is its image beside its own text; sides flip
// row to row. Balanced across 3 studies, every image paired with its own text.
const ROWS: CollageRow[] = [
  { slug: "shiki-studios-acting-school", fill: "navy", imageLeft: true },
  { slug: "synthminds-brand-platform", fill: "white", imageLeft: false },
  { slug: "ai-image-creation-course", fill: "blue", imageLeft: true },
];

const caseStudyListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Case Studies",
  itemListElement: ROWS.map((r, index) => {
    const study = caseStudies.find((s) => s.slug === r.slug);
    return {
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Article",
        headline: study?.title,
        description: study?.summary,
        url: `https://joshuafrancis.ca/work/${r.slug}`,
        author: { "@type": "Person", name: "Joshua Francis" },
      },
    };
  }),
};

export default function WorkPage() {
  return (
    <>
      <JsonLd data={caseStudyListSchema} />
      <PageHeader
        title="Case Studies"
        subtitle="Credibility-first websites and products, designed and built end-to-end. A look at what happened when premium brands and founders worked with me."
      />

      <Section className="pt-0">
        <AnimatedSection>
          <CaseStudyCollage rows={ROWS} className="ring-1 ring-border" />
        </AnimatedSection>
      </Section>

      <CTABanner />
    </>
  );
}
