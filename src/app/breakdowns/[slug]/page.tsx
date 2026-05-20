import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedSection } from "@/components/shared/animated-section";
import { JsonLd } from "@/components/shared/json-ld";
import { CTABanner } from "@/components/shared/cta-banner";
import { researchPosts } from "@/lib/data/research";
import { ArrowLeft } from "lucide-react";
import { VerificationMiragePost } from "@/components/research/verification-mirage";
import { HistoryAnchorsPost } from "@/components/research/history-anchors";
import { WorkflowReleasePost } from "@/components/research/workflow-release";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const postComponents: Record<string, React.ComponentType> = {
  "the-verification-mirage": VerificationMiragePost,
  "how-researchers-broke-every-ai-model": HistoryAnchorsPost,
  "when-agents-should-stop": WorkflowReleasePost,
};

export async function generateStaticParams() {
  return researchPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = researchPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.intro,
    alternates: {
      canonical: `https://joshuafrancis.ca/breakdowns/${slug}`,
    },
  };
}

export default async function BreakdownPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = researchPosts.find((p) => p.slug === slug);
  const PostBody = postComponents[slug];
  if (!post || !PostBody) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.intro,
    datePublished: post.date,
    url: `https://joshuafrancis.ca/breakdowns/${slug}`,
    author: {
      "@type": "Person",
      name: "Joshua Francis",
      url: "https://joshuafrancis.ca",
    },
    publisher: { "@type": "Person", name: "Joshua Francis" },
    isBasedOn: {
      "@type": "ScholarlyArticle",
      name: post.source.label,
      url: post.source.url,
    },
  };

  return (
    <>
      <JsonLd data={articleSchema} />

      <article className="pt-28 md:pt-36 pb-12">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <AnimatedSection>
            <Link
              href="/breakdowns"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
            >
              <ArrowLeft className="w-4 h-4" />
              All breakdowns
            </Link>

            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.1]">
              {post.title}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
              {post.intro}
            </p>
            <p className="mt-6 text-xs text-muted-foreground/70">
              Published{" "}
              <time dateTime={post.date}>{post.dateLabel}</time> ·{" "}
              {post.readTime}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Based on{" "}
              <a
                href={post.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                {post.source.label}
              </a>
              .
            </p>
          </AnimatedSection>

          <div className="my-10 h-px bg-border" />

          <PostBody />
        </div>
      </article>

      <CTABanner
        heading="Want help applying findings like this to your AI roadmap?"
        subheading="Free 30-minute call. We'll talk through what new research means for your product."
      />
    </>
  );
}
