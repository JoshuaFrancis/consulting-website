import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight, ShieldCheck, Check, Star } from "lucide-react";
import { Section } from "@/components/layout/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { JsonLd } from "@/components/shared/json-ld";
import { OfferFaq } from "@/components/offer/offer-faq";
import { OfferGraphic } from "@/components/offer/offer-graphics";
import { ProblemSelfAudit } from "@/components/offer/problem-self-audit";
import { WorkflowHero } from "@/components/offer/workflow-transformation";
import { CasePoster } from "@/components/shared/case-poster";
import { BookButton } from "@/components/booking/book-button";
import { services } from "@/lib/data/services";
import { caseStudies } from "@/lib/data/case-studies";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Bento tiling on a 6-col grid: alternating 4/2 and 2/4 rows,
// with a lone final card spanning full width. Tiles cleanly for any count.
function bentoSpan(i: number, n: number): string {
  if (i === n - 1 && n % 2 === 1) return "md:col-span-6";
  const rowKind = Math.floor(i / 2) % 2;
  const isFirstInPair = i % 2 === 0;
  if (rowKind === 0) return isFirstInPair ? "md:col-span-4" : "md:col-span-2";
  return isFirstInPair ? "md:col-span-2" : "md:col-span-4";
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.transformation ?? service.summary,
    alternates: { canonical: `https://joshuafrancis.ca/services/${slug}` },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const studies = (service.caseStudySlugs ?? [])
    .map((s) => caseStudies.find((c) => c.slug === s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.transformation ?? service.summary,
    serviceType: service.title,
    url: `https://joshuafrancis.ca/services/${slug}`,
    provider: {
      "@type": "Person",
      name: "Joshua Francis",
      url: "https://joshuafrancis.ca",
    },
    areaServed: service.forWho ?? "Canada",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />

      {/* ─── PITCH ──────────────────────────────────────────── */}
      {service.slug === "ai-workflow" ? (
        <WorkflowHero
          headline={service.heroHeadline}
          subhead={service.heroSubhead}
          ctaButton={service.ctaButton ?? "Book a call"}
          trustSignal={service.trustSignal}
        />
      ) : (
      <Section className="relative overflow-hidden pt-32 md:pt-36 pb-20 md:pb-28">
        {/* ambient atmosphere */}
        <div
          className="pointer-events-none absolute -top-24 right-[-10%] h-[480px] w-[480px] rounded-full bg-accent/[0.10] blur-[120px]"
          aria-hidden="true"
        />
        <div className="relative grid grid-cols-12 gap-y-14 md:gap-10 lg:gap-16 items-center">
          {/* Left: headline + CTA */}
          <div className="col-span-12 lg:col-span-6">
            <AnimatedSection delay={0.05}>
              <h1 className="mt-6 text-[2.4rem] sm:text-[2.75rem] lg:text-[3.25rem] font-semibold tracking-tight text-foreground leading-[1.0] text-balance">
                {service.heroHeadline}
              </h1>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <p className="mt-7 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                {service.heroSubhead}
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <BookButton>{service.ctaButton ?? "Book a call"}</BookButton>
                <Link
                  href="#proof"
                  className="inline-flex items-center justify-center rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted/60 transition-colors"
                >
                  See the proof
                </Link>
              </div>
            </AnimatedSection>
            {service.trustSignal && (
              <AnimatedSection delay={0.2}>
                <p className="mt-8 flex items-start gap-2.5 text-sm text-muted-foreground border-t border-border/70 pt-7">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{service.trustSignal}</span>
                </p>
              </AnimatedSection>
            )}
          </div>

          {/* Right: bespoke offer mockup, floating with a proof badge */}
          <div className="col-span-12 lg:col-span-6">
            <AnimatedSection delay={0.15}>
              <div className="relative animate-float">
                <div
                  className="absolute -inset-6 bg-gradient-to-br from-accent/[0.12] via-transparent to-accent/[0.10] rounded-[2rem] blur-2xl"
                  aria-hidden="true"
                />
                <div className="relative rounded-2xl border border-border/80 shadow-2xl shadow-black/[0.10] overflow-hidden aspect-[4/3]">
                  <OfferGraphic slug={service.slug} className="absolute inset-0" />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </Section>
      )}

      {/* ─── PROBLEM (interactive diagnostic console) ───────── */}
      {service.problemQuotes && service.problemQuotes.length > 0 && (
        <ProblemSelfAudit
          quotes={service.problemQuotes}
          whyItFails={service.whyItFails}
          problemBridge={service.problemBridge}
          ctaButton={service.ctaButton ?? "Book a call"}
          unit={
            service.slug === "website-design"
              ? "premium clients"
              : service.slug === "development"
                ? "time and money"
                : "your team's hours"
          }
        />
      )}

      {/* ─── PROOF ──────────────────────────────────────────── */}
      <Section id="proof">
        <AnimatedSection>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground max-w-3xl text-balance leading-[1.05]">
            {service.proofHeadline ?? "Proof it works"}
          </h2>
          {service.proofIntro && (
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-3xl">
              {service.proofIntro}
            </p>
          )}
        </AnimatedSection>

        {service.proofPoints && service.proofPoints.length > 0 && (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {service.proofPoints.map((p, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-7 text-center transition-all duration-300 hover:border-accent/40 hover:shadow-lg">
                  <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="text-5xl md:text-6xl font-semibold tracking-tight text-gradient">
                    {p.metric}
                  </div>
                  <div className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {p.label}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        )}

        {studies.length > 0 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {studies.map((study, i) => (
              <AnimatedSection key={study.slug} delay={i * 0.1}>
                <Link
                  href={`/work/${study.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-accent/40 hover:shadow-xl"
                >
                  <div className="relative aspect-[16/9] bg-muted overflow-hidden">
                    {study.image ? (
                      <>
                        <Image
                          src={study.image}
                          alt={study.title}
                          fill
                          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                          sizes="(max-width: 768px) 100vw, 50vw"
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
                    <div className="mt-auto pt-5 flex items-center gap-1.5 text-sm font-medium text-accent">
                      Read case study
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        )}
      </Section>

      {/* ─── CAPABILITIES (what the engagement covers) ──────── */}
      <Section className="bg-muted/30 border-t border-border/60">
        <AnimatedSection>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.05]">
            {service.sectionHeadings.capabilities.lead}{" "}
            <span className="text-em">{service.sectionHeadings.capabilities.em}</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {service.description}
          </p>
        </AnimatedSection>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-6 gap-4">
          {service.capabilities.map((cap, i) => (
            <AnimatedSection
              key={i}
              delay={i * 0.06}
              className={`col-span-1 ${bentoSpan(i, service.capabilities.length)}`}
            >
              <div className="group h-full rounded-2xl border border-border bg-card p-6 md:p-7 transition-all hover:border-accent/40 hover:shadow-lg">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent text-sm font-semibold">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {cap.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {cap.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      {/* ─── PROCESS ────────────────────────────────────────── */}
      {service.processSteps && service.processSteps.length > 0 && (
        <Section>
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.05]">
              How it <span className="text-em">works.</span>
            </h2>
          </AnimatedSection>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
            {service.processSteps.map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-border bg-card p-6">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-accent font-semibold">
                    {i + 1}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Post-process testimonial — Video 6: "drop a testimonial about how smooth working with you was" */}
          <AnimatedSection delay={0.35}>
            <figure className="mt-10 rounded-2xl border border-border bg-muted/40 px-8 py-7 md:px-10">
              <blockquote className="text-lg font-medium text-foreground leading-snug">
                &ldquo;Josh was excellent and put a lot of attention into my requirements. It was a smooth process. I look forward to working with him more.&rdquo;
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">MUSCLED Inc</span>
                <span className="text-muted-foreground/40">·</span>
                <span>Design &amp; implementation project</span>
              </figcaption>
            </figure>
          </AnimatedSection>
        </Section>
      )}

      {/* ─── WHO IT'S FOR ───────────────────────────────────── */}
      <Section className="bg-muted/30 border-t border-border/60">
        <AnimatedSection>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.05]">
            {service.sectionHeadings.audience.lead}{" "}
            <span className="text-em">{service.sectionHeadings.audience.em}</span>
          </h2>
        </AnimatedSection>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {service.idealClients.map((client, i) => (
            <AnimatedSection key={i} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground">{client.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {client.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      {/* ─── WHAT'S INCLUDED ────────────────────────────────── */}
      <Section>
        <AnimatedSection>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.05]">
            {service.sectionHeadings.pricing.lead}{" "}
            <span className="text-em">{service.sectionHeadings.pricing.em}</span>
          </h2>
        </AnimatedSection>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <AnimatedSection>
            <ul className="space-y-3">
              {service.retainerIncludes.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-[15px] text-foreground/90 leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="rounded-2xl border border-border bg-card p-7">
              <div className="text-sm uppercase tracking-wider text-muted-foreground/70">
                {service.ctaKind === "audit" ? "How we start" : "Engagement"}
              </div>
              <div className="mt-2 text-2xl font-semibold text-foreground">
                {service.pricingFrom}
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {service.pricingNote}
              </p>
              <div className="mt-6">
                <BookButton>{service.ctaButton ?? "Book a call"}</BookButton>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Section>

      {/* ─── FAQ ────────────────────────────────────────────── */}
      <Section className="bg-muted/30 border-t border-border/60">
        <AnimatedSection>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.05]">
            {service.sectionHeadings.faq.lead}{" "}
            <span className="text-em">{service.sectionHeadings.faq.em}</span>
          </h2>
        </AnimatedSection>
        <div className="mt-10">
          <OfferFaq faqs={service.faqs} />
        </div>
      </Section>

      {/* ─── PUSH ───────────────────────────────────────────── */}
      <Section className="bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-[0.04]" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -top-20 left-1/3 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-accent/[0.10] blur-[120px]"
          aria-hidden="true"
        />
        <AnimatedSection>
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.05] text-white text-balance">
                {service.ctaHeadline ?? `Let's talk about ${service.shortTitle}.`}
              </h2>
              {service.ctaSubhead && (
                <p className="mt-5 text-lg text-white/65 leading-relaxed">
                  {service.ctaSubhead}
                </p>
              )}
              <div className="mt-8">
                <BookButton variant="inverted">
                  {service.ctaButton ?? "Book a call"}
                </BookButton>
              </div>

              {/* Proof right next to CTA per Video 7 */}
              <div className="mt-7 flex items-start gap-3 border-t border-white/10 pt-7">
                <div className="flex gap-0.5 shrink-0 mt-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                {service.ctaProof && (
                  <span className="text-sm text-white/50 leading-relaxed">{service.ctaProof}</span>
                )}
              </div>
            </div>

            {/* Right: credibility block */}
            {service.proofPoints && service.proofPoints.length > 0 && (
              <div className="hidden lg:flex flex-col gap-4">
                {service.proofPoints.slice(0, 3).map((p, i) => (
                  <div key={i} className="flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4">
                    <div className="text-2xl font-semibold tracking-tight bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent shrink-0">
                      {p.metric}
                    </div>
                    <div className="text-sm text-white/45 leading-snug">{p.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </AnimatedSection>
      </Section>
    </>
  );
}
