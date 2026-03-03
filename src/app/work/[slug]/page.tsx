import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { MetricCard } from "@/components/shared/metric-card";
import { CTABanner } from "@/components/shared/cta-banner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { caseStudies } from "@/lib/data/case-studies";
import { ArrowLeft, ExternalLink, Quote } from "lucide-react";

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
    title: `${study.title} | Joshua Francis`,
    description: study.summary,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);

  if (!study) notFound();

  return (
    <>
      {/* Header */}
      <div className="pt-32 pb-8 md:pt-40 md:pb-12">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <AnimatedSection>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to case studies
            </Link>
            <div className="flex flex-wrap gap-2 mb-4">
              {study.categories.map((cat) => (
                <Badge key={cat} variant="secondary">
                  {cat}
                </Badge>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
              {study.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl leading-relaxed">
              {study.summary}
            </p>
            <div className="mt-6 flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div>
                <span className="font-medium text-foreground">Client:</span>{" "}
                {study.client}
              </div>
              <div>
                <span className="font-medium text-foreground">Timeline:</span>{" "}
                {study.timeline}
              </div>
              {study.url && (
                <a
                  href={study.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-accent hover:underline underline-offset-4"
                >
                  Visit site
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Challenge */}
      <Section className="pt-8">
        <div className="max-w-3xl">
          <AnimatedSection>
            <h2 className="text-sm font-semibold text-accent uppercase tracking-wider">
              The Challenge
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed text-lg">
              {study.challenge}
            </p>
          </AnimatedSection>
        </div>
      </Section>

      {/* Approach */}
      <Section className="bg-muted/50 pt-16 pb-16">
        <div className="max-w-3xl">
          <AnimatedSection>
            <h2 className="text-sm font-semibold text-accent uppercase tracking-wider">
              The Approach
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed text-lg">
              {study.approach}
            </p>
          </AnimatedSection>
        </div>
      </Section>

      {/* Results */}
      <Section>
        <AnimatedSection>
          <h2 className="text-sm font-semibold text-accent uppercase tracking-wider">
            The Results
          </h2>
        </AnimatedSection>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
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

      {/* Testimonial */}
      {study.testimonial && (
        <Section className="bg-muted/50 py-16">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center">
              <Quote className="w-8 h-8 text-accent/30 mx-auto mb-6" />
              <blockquote className="text-xl md:text-2xl font-medium text-foreground leading-relaxed">
                &ldquo;{study.testimonial.quote}&rdquo;
              </blockquote>
              <div className="mt-6">
                <p className="font-semibold text-foreground">
                  {study.testimonial.author}
                </p>
                <p className="text-sm text-muted-foreground">
                  {study.testimonial.role}
                </p>
              </div>
            </div>
          </AnimatedSection>
        </Section>
      )}

      <CTABanner
        heading="Want to build something like this?"
        subheading="Let's talk about your project and see if I can help."
      />
    </>
  );
}
