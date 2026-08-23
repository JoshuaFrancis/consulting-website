import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { JsonLd } from "@/components/shared/json-ld";
import { MetricCard } from "@/components/shared/metric-card";
import { PerformanceReport } from "@/components/work/performance-report";
import { BeforeAfterSlider } from "@/components/work/before-after-slider";
import { BookButton } from "@/components/booking/book-button";
import { caseStudies, type ApproachBlock } from "@/lib/data/case-studies";
import { ReviewQuote } from "@/components/shared/review-placeholder";
import { ArrowLeft, ArrowUpRight, ImageIcon } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.summary,
    alternates: {
      canonical: `https://joshuafrancis.ca/work/${slug}`,
    },
  };
}

/** Renders an ordered list of narrative blocks (headings, text, lists, media). */
function CaseBlocks({
  blocks,
  studyTitle,
}: {
  blocks: ApproachBlock[];
  studyTitle: string;
}) {
  const firstTextIndex = blocks.findIndex((b) => b.kind === "text");
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        if (block.kind === "heading") {
          return (
            <AnimatedSection key={i} className="pt-8 first:pt-0">
              <div className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {block.label}
                </h3>
              </div>
            </AnimatedSection>
          );
        }
        if (block.kind === "text") {
          return (
            <AnimatedSection key={i}>
              <p
                className={
                  i === firstTextIndex
                    ? "max-w-3xl text-xl md:text-2xl font-medium leading-relaxed text-foreground"
                    : "max-w-3xl text-lg leading-relaxed text-muted-foreground"
                }
              >
                {block.text}
              </p>
            </AnimatedSection>
          );
        }
        if (block.kind === "list") {
          const items = block.items.map((it, j) => (
            <li key={j} className="flex gap-3">
              {block.ordered ? (
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 font-mono text-xs font-semibold text-accent">
                  {j + 1}
                </span>
              ) : (
                <span
                  aria-hidden
                  className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                />
              )}
              <span className="text-lg leading-relaxed text-muted-foreground">
                {it}
              </span>
            </li>
          ));
          return (
            <AnimatedSection key={i}>
              <div className="max-w-3xl">
                {block.label && (
                  <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70">
                    {block.label}
                  </p>
                )}
                {block.ordered ? (
                  <ol className="space-y-3">{items}</ol>
                ) : (
                  <ul className="space-y-3">{items}</ul>
                )}
              </div>
            </AnimatedSection>
          );
        }
        if (block.kind === "beforeAfter") {
          return (
            <AnimatedSection key={i} className="py-3">
              <BeforeAfterSlider
                before={block.before}
                after={block.after}
                title={block.title}
              />
            </AnimatedSection>
          );
        }
        return (
          <AnimatedSection key={i} className="py-3">
            <figure>
              <div
                className={`relative ${block.wide ? "aspect-[16/9]" : "aspect-[16/10]"} overflow-hidden rounded-2xl border border-border ${
                  block.gradient
                    ? "bg-[linear-gradient(165deg,#f6fcff_0%,#dceff9_48%,#b7dcef_100%)]"
                    : block.contain
                      ? "bg-white"
                      : "bg-muted"
                }`}
              >
                {block.src ? (
                  <Image
                    src={block.src}
                    alt={block.caption ?? studyTitle}
                    fill
                    className={block.contain || block.gradient ? "object-contain p-12 md:p-20" : "object-cover object-top"}
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-muted-foreground/60">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-dashed border-border">
                      <ImageIcon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em]">
                      Add screenshot
                    </span>
                  </div>
                )}
              </div>
              {block.caption && (
                <figcaption className="mt-3 text-sm text-muted-foreground">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          </AnimatedSection>
        );
      })}
    </div>
  );
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);

  if (!study) notFound();

  const siteHost = study.url
    ? study.url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "")
    : null;

  // Approach as ordered blocks (text + inline media). Falls back to plain paragraphs.
  const approachBlocks: ApproachBlock[] =
    study.approachBlocks ??
    (Array.isArray(study.approach) ? study.approach : [study.approach]).map((t) => ({
      kind: "text",
      text: t,
    }));

  // Build-time stamp — a real "last updated" freshness signal for AI/search.
  const lastModified = new Date().toISOString();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.summary,
    url: `https://joshuafrancis.ca/work/${slug}`,
    dateModified: lastModified,
    ...(study.datePublished && { datePublished: study.datePublished }),
    author: {
      "@type": "Person",
      name: "Joshua Francis",
      url: "https://joshuafrancis.ca",
    },
    publisher: {
      "@type": "Person",
      name: "Joshua Francis",
    },
    ...(study.image && {
      image: `https://joshuafrancis.ca${study.image}`,
    }),
    about: study.categories.map((cat) => ({
      "@type": "Thing",
      name: cat,
    })),
    mentions: {
      "@type": "Organization",
      name: study.client,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://joshuafrancis.ca",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Work",
        item: "https://joshuafrancis.ca/work",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: study.client,
        item: `https://joshuafrancis.ca/work/${slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      {/* ─── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-28 md:pt-36 pb-16 md:pb-20">
        <div className="absolute inset-0 hero-gradient opacity-70" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -top-24 right-[-12%] h-[520px] w-[520px] rounded-full bg-accent/[0.10] blur-[130px]"
          aria-hidden="true"
        />

        <div className="relative max-w-6xl mx-auto px-6 md:px-8">
          {/* breadcrumb */}
          <AnimatedSection>
            <div className="flex items-center gap-4 border-b border-border/70 pb-5">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Case Studies
              </Link>
              <span className="hidden text-border sm:inline">/</span>
              <span className="hidden truncate text-sm font-medium text-foreground sm:inline">
                {study.client}
              </span>
            </div>
          </AnimatedSection>

          {/* two-column hero: pitch left, framed site right */}
          <div className="mt-10 grid grid-cols-1 items-start gap-10 md:mt-14 lg:grid-cols-12 lg:gap-14 lg:pt-2">
            <div className="lg:col-span-7">
              <AnimatedSection>
                <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-foreground leading-[1.05] text-balance md:text-5xl">
                  {study.title}
                </h1>
                <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
                  {study.summary}
                </p>

                {study.contact && (
                  <div className="mt-8 flex items-center gap-3">
                    {study.contact.image && (
                      <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-muted ring-1 ring-border">
                        <Image
                          src={study.contact.image}
                          alt={study.contact.name}
                          fill
                          className="object-cover"
                          sizes="44px"
                        />
                      </span>
                    )}
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60">
                        In collaboration with
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {study.contact.name},{" "}
                        <span className="font-normal text-muted-foreground">
                          {study.contact.role}
                        </span>
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <BookButton>Book a call</BookButton>
                </div>
              </AnimatedSection>
            </div>

            {/* framed live site */}
            {study.image && (
              <div className="lg:col-span-5">
                <AnimatedSection delay={0.1}>
                  <div className="relative">
                    <div
                      className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-accent/[0.14] via-transparent to-accent/[0.10] blur-3xl"
                      aria-hidden="true"
                    />
                    <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/[0.14]">
                      {siteHost && (
                        <div className="flex h-10 items-center gap-2 border-b border-border bg-muted/60 px-4">
                          <div className="flex gap-1.5">
                            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                          </div>
                          <div className="mx-auto flex items-center gap-1.5 rounded-md bg-background px-3 py-1 font-mono text-[11px] text-muted-foreground">
                            <span className="text-emerald-500">●</span>
                            {siteHost}
                          </div>
                          <div className="w-12" />
                        </div>
                      )}
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={study.image}
                          alt={study.title}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            )}
          </div>

          {/* results strip — flat, full width, no overlap */}
          {study.results.length >= 3 && (
            <AnimatedSection delay={0.2}>
              <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:mt-16">
                <div className={`grid grid-cols-2 divide-x divide-y divide-border md:divide-y-0 ${study.results.length >= 4 ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
                  {study.results.slice(0, 4).map((r) => (
                    <div key={r.description} className="p-5 text-center">
                      <div className="text-2xl md:text-3xl font-semibold tracking-tight text-gradient">
                        {r.metric}
                      </div>
                      <div className="mx-auto mt-1 max-w-[12rem] text-[11px] leading-tight text-muted-foreground line-clamp-2">
                        {r.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* About / Challenge / Solution meta band */}
      <Section className="border-y border-border/60 bg-muted/40 py-12 md:py-14">
        <div className="grid grid-cols-1 divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="md:pr-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/60">
              About
            </p>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">{study.client}</span>
              {study.clientBlurb && <>. {study.clientBlurb}</>}
            </p>
          </div>
          <div className="pt-8 md:pt-0 md:px-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/60">
              Challenge
            </p>
            <p className="mt-2.5 text-sm leading-relaxed text-foreground">
              {study.challengeSummary ??
                (Array.isArray(study.challenge) ? study.challenge[0] : study.challenge)}
            </p>
          </div>
          <div className="pt-8 md:pt-0 md:pl-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/60">
              Solution
            </p>
            <p className="mt-2.5 text-sm leading-relaxed text-foreground">
              {study.solution ?? study.summary}
            </p>
          </div>
        </div>
      </Section>

      {/* Challenge */}
      <Section className="pt-16 md:pt-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-3">
            <AnimatedSection>
              <div className="md:sticky md:top-28">
                <div className="font-mono text-4xl font-semibold leading-none text-accent/25">
                  01
                </div>
                <h2 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
                  The challenge
                </h2>
              </div>
            </AnimatedSection>
          </div>
          <div className="md:col-span-9">
            {study.challengeBlocks ? (
              <CaseBlocks blocks={study.challengeBlocks} studyTitle={study.title} />
            ) : (
              <AnimatedSection>
                <div className="max-w-3xl space-y-5">
                  {(Array.isArray(study.challenge) ? study.challenge : [study.challenge]).map((p, i) => (
                    <p
                      key={i}
                      className={
                        i === 0
                          ? "text-xl md:text-2xl font-medium leading-relaxed text-foreground"
                          : "text-lg leading-relaxed text-muted-foreground"
                      }
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </AnimatedSection>
            )}
          </div>
        </div>
      </Section>

      {/* Pull quote */}
      {study.pullQuote && (
        <Section className="py-10 md:py-16">
          <AnimatedSection>
            <figure className="relative mx-auto max-w-4xl text-center">
              <span
                aria-hidden
                className="block leading-[0.6] text-[7rem] md:text-[10rem] text-accent/15"
                style={{ fontFamily: "Georgia, serif" }}
              >
                &ldquo;
              </span>
              <blockquote className="-mt-10 md:-mt-16 text-3xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.12] text-balance">
                {study.pullQuote}
              </blockquote>
            </figure>
          </AnimatedSection>
        </Section>
      )}

      {/* Approach */}
      <Section className="bg-muted/50 border-y border-border/60 pt-20 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-3">
            <AnimatedSection>
              <div className="md:sticky md:top-28">
                <div className="font-mono text-4xl font-semibold leading-none text-accent/25">
                  02
                </div>
                <h2 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
                  The approach
                </h2>
              </div>
            </AnimatedSection>
          </div>
          <div className="md:col-span-9">
            <CaseBlocks blocks={approachBlocks} studyTitle={study.title} />
          </div>
        </div>
      </Section>

      {/* The result — narrative summary + skimmable breakdown */}
      {study.resultBlocks && (
        <Section className="pt-16 md:pt-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-3">
              <AnimatedSection>
                <div className="md:sticky md:top-28">
                  <div className="font-mono text-4xl font-semibold leading-none text-accent/25">
                    03
                  </div>
                  <h2 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
                    The result
                  </h2>
                </div>
              </AnimatedSection>
            </div>
            <div className="md:col-span-9">
              <CaseBlocks blocks={study.resultBlocks} studyTitle={study.title} />
            </div>
          </div>
        </Section>
      )}

      {/* Results — animated performance report when available, else metric cards */}
      {study.report ? (
        <PerformanceReport report={study.report} />
      ) : (
        study.results.length > 0 && (
          <Section>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {study.results.map((result, i) => (
                <MetricCard
                  key={result.description}
                  metric={result.metric}
                  description={result.description}
                  delay={i * 0.1}
                />
              ))}
            </div>
          </Section>
        )
      )}

      {/* Testimonial — same component/format as the homepage review */}
      {study.testimonial && (
        <ReviewQuote
          className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-24"
          quote={study.testimonial.quote}
          author={study.testimonial.author}
          role={study.testimonial.role}
          image={study.testimonial.image}
          href={study.testimonial.href}
        />
      )}

      {/* ─── PUSH ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-black py-20 md:py-28 text-white">
        <div className="absolute inset-0 dot-pattern opacity-[0.04]" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -bottom-24 left-1/2 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-accent/[0.14] blur-[130px]"
          aria-hidden="true"
        />
        <div className="relative max-w-3xl mx-auto px-6 md:px-8">
          <div>
            {/* the ask */}
            <AnimatedSection>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05] text-balance">
                Let&apos;s get you results like these.
              </h2>
              <p className="mt-5 max-w-md text-lg text-white/60 leading-relaxed">
                A free 30-minute call. I&apos;ll tell you straight what I&apos;d do and
                whether I can help, no pitch deck.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <BookButton variant="inverted">Book a call</BookButton>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
