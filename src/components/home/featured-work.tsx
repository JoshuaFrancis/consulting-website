import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/layout/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { caseStudies } from "@/lib/data/case-studies";
import { CasePoster } from "@/components/shared/case-poster";
import { ArrowUpRight } from "lucide-react";

// Curated to the umbrella: website credibility work first, RoomLab as the deep end.
const FEATURED_SLUGS = [
  "shiki-studios-acting-school",
  "synthminds-brand-platform",
  "roomlab-ai-interior-design",
];

export function FeaturedWork() {
  const featured = FEATURED_SLUGS.map((slug) =>
    caseStudies.find((s) => s.slug === slug),
  ).filter((s): s is (typeof caseStudies)[number] => Boolean(s));
  const [hero, ...rest] = featured;

  return (
    <Section className="bg-muted/30 border-y border-border/60">
      <AnimatedSection>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.05]">
          Credibility you can{" "}
          <span className="text-em">see in the work.</span>
        </h2>
        <div className="mt-8 flex flex-wrap gap-x-10 gap-y-3">
          {[
            { metric: "3×", label: "Qualified enterprise leads — SynthMinds" },
            { metric: "100/100", label: "PageSpeed, 6× faster — Shiki Studios" },
            { metric: "+40%", label: "Consultation bookings — SynthMinds" },
          ].map((s) => (
            <div key={s.metric} className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold tracking-tight text-gradient">{s.metric}</span>
              <span className="text-sm text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-6 gap-5">
        {/* Featured case study */}
        <AnimatedSection className="lg:col-span-6">
          <Link
            href={`/work/${hero.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:border-accent/40 hover:shadow-xl"
          >
            <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[24rem] overflow-hidden bg-muted">
              {hero.image ? (
                <>
                  <Image
                    src={hero.image}
                    alt={hero.title}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </>
              ) : (
                <CasePoster study={hero} />
              )}
            </div>
            <div className="flex flex-col justify-center p-8 md:p-10">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70">
                {hero.client}
              </span>
              <h3 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight text-foreground leading-tight group-hover:text-accent transition-colors">
                {hero.title}
              </h3>
              <p className="mt-3 text-muted-foreground leading-relaxed line-clamp-3">
                {hero.summary}
              </p>
              <div className="mt-7 grid grid-cols-3 gap-4 border-t border-border pt-6">
                {hero.results.slice(0, 3).map((r) => (
                  <div key={r.metric}>
                    <div className="text-2xl md:text-3xl font-semibold tracking-tight text-gradient">
                      {r.metric}
                    </div>
                    <div className="mt-1 text-[11px] leading-snug text-muted-foreground">
                      {r.description}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                Read case study
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </Link>
        </AnimatedSection>

        {/* Supporting case studies */}
        {rest.map((study, i) => (
          <AnimatedSection key={study.slug} delay={i * 0.1} className="lg:col-span-3">
            <Link
              href={`/work/${study.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:border-accent/40 hover:shadow-xl"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                {study.image ? (
                  <>
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    {study.results[0] && (
                      <div className="absolute bottom-3 left-3 flex items-baseline gap-1.5 rounded-xl border border-border bg-card/95 px-3 py-2 shadow-lg backdrop-blur">
                        <span className="text-xl font-semibold tracking-tight text-gradient">
                          {study.results[0].metric}
                        </span>
                        <span className="max-w-[10rem] text-[11px] leading-tight text-muted-foreground line-clamp-1">
                          {study.results[0].description}
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <CasePoster study={study} className="absolute inset-0" />
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70">
                  {study.client}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                  {study.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {study.summary}
                </p>
                <div className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  Read case study
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Link>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection delay={0.2}>
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
