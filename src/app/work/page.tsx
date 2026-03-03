import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { CTABanner } from "@/components/shared/cta-banner";
import { Badge } from "@/components/ui/badge";
import { caseStudies } from "@/lib/data/case-studies";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies showcasing AI strategy, LLM implementation, and agent development projects with measurable outcomes.",
};

const cardGradients = [
  "from-accent/12 via-accent/6 to-accent/2",
  "from-purple-500/12 via-purple-500/6 to-purple-500/2",
  "from-emerald-500/12 via-emerald-500/6 to-emerald-500/2",
  "from-orange-500/12 via-orange-500/6 to-orange-500/2",
  "from-rose-500/12 via-rose-500/6 to-rose-500/2",
];

export default function WorkPage() {
  return (
    <>
      <PageHeader
        title="Case Studies"
        subtitle="A look at what I've built — client work and personal projects across AI, product design, and development."
      />

      <Section className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseStudies.map((study, i) => (
            <AnimatedSection key={study.slug} delay={i * 0.08}>
              <Link
                href={`/work/${study.slug}`}
                className="group block rounded-xl overflow-hidden gradient-border h-full"
              >
                <div className={`aspect-[16/10] bg-gradient-to-br ${cardGradients[i % cardGradients.length]} flex items-center justify-center relative`}>
                  <div className="absolute inset-0 dot-pattern opacity-30" aria-hidden="true" />
                  <div className="relative text-center px-4">
                    <span className="text-[10px] text-muted-foreground/70 uppercase tracking-[0.2em] font-medium">
                      {study.client}
                    </span>
                    <div className="mt-3 flex justify-center gap-4">
                      {study.results.slice(0, 2).map((r) => (
                        <div key={r.metric} className="text-center">
                          <span className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                            {r.metric}
                          </span>
                          <span className="block text-[10px] text-muted-foreground/70 mt-0.5">
                            {r.description}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground/50">
                      {study.timeline}
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-1.5">
                    {study.categories.map((cat) => (
                      <Badge key={cat} variant="secondary" className="text-[11px] px-2.5 py-0.5 rounded-full">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
                    {study.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {study.summary}
                  </p>
                  <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-accent">
                    Read case study
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      <CTABanner
        heading="Want to build something together?"
        subheading="I'm available for consulting and product work. Let's talk about your project."
      />
    </>
  );
}
