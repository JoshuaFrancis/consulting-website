import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/layout/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { Badge } from "@/components/ui/badge";
import { caseStudies } from "@/lib/data/case-studies";
import { ArrowUpRight } from "lucide-react";

const gradients = [
  "from-accent/15 via-accent/8 to-accent/3",
  "from-purple-500/15 via-purple-500/8 to-purple-500/3",
  "from-emerald-500/15 via-emerald-500/8 to-emerald-500/3",
];

export function FeaturedWork() {
  const featured = caseStudies.slice(0, 3);

  return (
    <Section className="bg-muted/30">
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
          Real projects.{" "}
          <span className="font-serif italic">Measurable outcomes.</span>
        </h2>
      </AnimatedSection>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {featured.map((study, i) => (
          <AnimatedSection key={study.slug} delay={i * 0.1}>
            <Link
              href={`/work/${study.slug}`}
              className="group block rounded-xl overflow-hidden gradient-border h-full"
            >
              <div
                className={`aspect-[16/10] ${study.image ? `relative bg-gradient-to-br ${gradients[i]} p-4` : `bg-gradient-to-br ${gradients[i]} flex items-center justify-center relative`}`}
              >
                {study.image ? (
                  <div className="relative w-full h-full rounded-lg overflow-hidden">
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                ) : (
                  <>
                    <div className="absolute inset-0 dot-pattern opacity-40" aria-hidden="true" />
                    <div className="relative text-center px-4">
                      <span className="text-[10px] text-muted-foreground/70 uppercase tracking-[0.2em] font-medium">
                        {study.client}
                      </span>
                      <div className="mt-3 flex justify-center gap-2">
                        {study.results.slice(0, 1).map((r) => (
                          <span
                            key={r.metric}
                            className="text-3xl md:text-4xl font-bold text-foreground tracking-tight"
                          >
                            {r.metric}
                          </span>
                        ))}
                      </div>
                      <span className="mt-1 block text-xs text-muted-foreground/80">
                        {study.results[0]?.description}
                      </span>
                    </div>
                  </>
                )}
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

      <AnimatedSection delay={0.3}>
        <div className="mt-10 text-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline underline-offset-4"
          >
            View all case studies
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </AnimatedSection>
    </Section>
  );
}
