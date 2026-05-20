import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { JsonLd } from "@/components/shared/json-ld";
import { CTABanner } from "@/components/shared/cta-banner";
import { Badge } from "@/components/ui/badge";
import { researchPosts } from "@/lib/data/research";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Breakdowns",
  description:
    "Important AI research papers broken down into clear, actionable takeaways for business leaders and product teams.",
  alternates: {
    canonical: "https://joshuafrancis.ca/breakdowns",
  },
};

const listSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Breakdowns",
  description:
    "AI research papers broken down into actionable insights for businesses.",
  url: "https://joshuafrancis.ca/breakdowns",
  blogPost: researchPosts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    description: post.intro,
    datePublished: post.date,
    url: `https://joshuafrancis.ca/breakdowns/${post.slug}`,
    author: { "@type": "Person", name: "Joshua Francis" },
  })),
};

export default function BreakdownsPage() {
  return (
    <>
      <JsonLd data={listSchema} />
      <PageHeader
        title="Research,"
        accent="Broken Down"
        subtitle="Important AI research papers, broken down into clear, actionable takeaways. Built for business leaders who need to know what new findings mean for their products, teams, and risk."
      />

      <Section className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {researchPosts.map((post, i) => (
            <AnimatedSection key={post.slug} delay={i * 0.08}>
              <Link
                href={`/breakdowns/${post.slug}`}
                className="group block rounded-xl overflow-hidden gradient-border h-full"
              >
                <div className="aspect-[16/10] bg-gradient-to-br from-accent/12 via-accent/6 to-accent/2 flex items-center justify-center relative">
                  <div
                    className="absolute inset-0 dot-pattern opacity-30"
                    aria-hidden="true"
                  />
                  <div className="relative text-center px-6">
                    <span className="text-[10px] text-muted-foreground/70 uppercase tracking-[0.2em] font-medium">
                      {post.field}
                    </span>
                    <h3 className="mt-3 text-3xl md:text-4xl text-foreground leading-tight">
                      {post.title}
                    </h3>
                    <p className="mt-4 text-xs text-muted-foreground/60">
                      {post.dateLabel} · {post.readTime}
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-1.5">
                    <Badge
                      variant="secondary"
                      className="text-[11px] px-2.5 py-0.5 rounded-full"
                    >
                      {post.field}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="text-[11px] px-2.5 py-0.5 rounded-full"
                    >
                      Paper breakdown
                    </Badge>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {post.intro}
                  </p>
                  <p className="mt-4 text-sm text-foreground/80 leading-relaxed">
                    <span className="text-muted-foreground/60">Takeaway: </span>
                    {post.takeaway}
                  </p>
                  <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-accent">
                    Read breakdown
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      <CTABanner
        heading="Want help translating research into product decisions?"
        subheading="I help teams cut through AI hype and build systems that actually work."
      />
    </>
  );
}
