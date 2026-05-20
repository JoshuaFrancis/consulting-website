import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { JsonLd } from "@/components/shared/json-ld";
import { CreativeWallVideos } from "@/components/shared/creative-wall-videos";
import { services } from "@/lib/data/services";

interface PageProps {
  params: Promise<{ slug: string }>;
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
    description: service.summary,
    alternates: {
      canonical: `https://joshuafrancis.ca/services/${service.slug}`,
    },
    openGraph: {
      title: service.title,
      description: service.summary,
      url: `https://joshuafrancis.ca/services/${service.slug}`,
    },
  };
}

const ROMAN = ["I", "II", "III", "IV", "V", "VI"];

function num(n: number) {
  return n.toString().padStart(2, "0");
}

// ─── Creative studio — portfolio wall tile ──────────────────
type CreativeTile =
  | {
      kind: "reel";
      h: number;
      gradient: string;
      caption: string;
      captionEm: string;
      handle: string;
      duration: string;
      video?: string;
      poster?: string;
    }
  | {
      kind: "static";
      h: number;
      gradient: string;
      eyebrow: string;
      headline: string;
      cta: string;
      light: boolean;
      image?: string;
    }
  | {
      kind: "avatar";
      h: number;
      gradient: string;
      quote: string;
      name: string;
      video?: string;
      poster?: string;
    }
  | {
      kind: "ugc";
      h: number;
      gradient: string;
      quote: string;
      tag: string;
      video?: string;
      poster?: string;
    };

function CreativeWallTile({ tile }: { tile: CreativeTile }) {
  const base =
    "rounded-2xl overflow-hidden relative border border-black/[0.06] shadow-xl shadow-black/[0.12] flex-shrink-0";

  if (tile.kind === "reel") {
    return (
      <div
        className={base}
        style={{ height: tile.h, background: tile.gradient }}
      >
        {/* video or gradient */}
        {tile.video ? (
          <video
            src={tile.video}
            poster={tile.poster}
            loop
            muted
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 80% at 25% 15%, rgba(255,255,255,0.35), transparent 60%)",
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/60" />
        {/* badge */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/55">
          <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="text-[8px] uppercase tracking-[0.12em] text-white font-bold">
            Reel · {tile.duration}
          </span>
        </div>
        {/* play — only on gradient placeholders */}
        {!tile.video && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 flex items-center justify-center shadow-xl shadow-black/30">
            <svg
              className="w-3.5 h-3.5 ml-0.5"
              viewBox="0 0 24 24"
              fill="#0F172A"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        )}
        {/* caption */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <div className="text-white text-[13px] font-extrabold leading-[1.15] drop-shadow-md">
            {tile.caption}{" "}
            <span className="font-medium">
              {tile.captionEm}
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <div className="w-3.5 h-3.5 rounded-full bg-white/25 border border-white/40" />
            <span className="text-[9px] text-white/90 font-semibold">
              {tile.handle}
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (tile.kind === "static") {
    // Real photo variant — image fills the tile, copy overlaid at the base
    if (tile.image) {
      return (
        <div
          className={base}
          style={{ height: tile.h, background: tile.gradient }}
        >
          <Image
            src={tile.image}
            alt={tile.headline}
            fill
            sizes="240px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/65" />
          <div className="absolute top-2.5 left-2.5">
            <span className="text-[8px] uppercase tracking-[0.12em] font-bold px-1.5 py-0.5 rounded bg-black/55 text-white/85">
              {tile.eyebrow}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-3.5">
            <div
              className="font-semibold leading-[1.05] text-white drop-shadow-lg"
              style={{ fontSize: tile.h > 200 ? "1.6rem" : "1.35rem" }}
            >
              {tile.headline}
            </div>
            <div className="mt-1.5 text-[9px] font-mono uppercase tracking-[0.14em] text-white/75">
              {tile.cta}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div
        className={base}
        style={{ height: tile.h, background: tile.gradient }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(110% 70% at 80% 10%, rgba(255,255,255,0.4), transparent 55%)",
          }}
        />
        <div className="absolute top-2.5 left-2.5">
          <span
            className={`text-[8px] uppercase tracking-[0.12em] font-bold px-1.5 py-0.5 rounded ${
              tile.light
                ? "bg-black/10 text-black/55"
                : "bg-white/15 text-white/80"
            }`}
          >
            {tile.eyebrow}
          </span>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <div
            className={`font-semibold leading-[1.05] ${
              tile.light ? "text-black/85" : "text-white"
            }`}
            style={{ fontSize: tile.h > 200 ? "1.6rem" : "1.3rem" }}
          >
            {tile.headline}
          </div>
          <div
            className={`mt-2.5 text-[9px] font-mono uppercase tracking-[0.14em] ${
              tile.light ? "text-black/55" : "text-white/70"
            }`}
          >
            {tile.cta}
          </div>
        </div>
      </div>
    );
  }

  if (tile.kind === "avatar") {
    return (
      <div
        className={base}
        style={{ height: tile.h, background: tile.gradient }}
      >
        {tile.video ? (
          <video
            src={tile.video}
            poster={tile.poster}
            loop
            muted
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <>
            {/* key light */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(60% 45% at 50% 30%, rgba(255,255,255,0.32), transparent 70%)",
              }}
            />
            {/* soft figure */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[34%] flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-white/[0.14]" />
              <div className="w-[4.5rem] h-9 rounded-t-[2rem] bg-white/[0.1] -mt-1.5" />
            </div>
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/65" />
        {/* badge */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/45">
          <svg
            className="w-2.5 h-2.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
          >
            <polygon points="12 2 15 9 22 9 17 14 19 22 12 17 5 22 7 14 2 9 9 9 12 2" />
          </svg>
          <span className="text-[8px] uppercase tracking-[0.12em] text-white font-bold">
            AI Avatar
          </span>
        </div>
        {/* lower third */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5">
          <div className="rounded-lg bg-black/72 px-2.5 py-2 border border-white/10">
            <div className="text-[10px] text-white font-medium leading-snug">
              &ldquo;{tile.quote}&rdquo;
            </div>
            <div className="flex items-center gap-1.5 mt-1.5">
              <div className="flex items-end gap-[1.5px] h-2.5">
                {[3, 7, 4, 9, 5, 8, 3].map((bh, i) => (
                  <span
                    key={i}
                    className="w-[2px] rounded-full bg-white/70"
                    style={{ height: `${bh}px` }}
                  />
                ))}
              </div>
              <span className="text-[8px] text-white/55 font-mono uppercase tracking-wider">
                {tile.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ugc
  return (
    <div className={base} style={{ height: tile.h, background: tile.gradient }}>
      {tile.video ? (
        <video
          src={tile.video}
          poster={tile.poster}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(110% 70% at 30% 12%, rgba(255,255,255,0.28), transparent 55%)",
            }}
          />
          {/* phone-held inset */}
          <div className="absolute inset-2.5 rounded-xl border border-white/15 bg-white/[0.04]" />
        </>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 to-black/55" />
      <div className="absolute top-3.5 left-3.5">
        <span className="text-[8px] uppercase tracking-[0.12em] font-bold text-white bg-black/55 px-1.5 py-0.5 rounded">
          {tile.tag}
        </span>
      </div>
      <div className="absolute bottom-3.5 left-3.5 right-3.5">
        <div className="text-white text-[12px] font-bold leading-tight drop-shadow-md">
          {tile.quote}
        </div>
        <div className="flex items-center gap-1.5 mt-1.5">
          <div className="w-3 h-3 rounded-full bg-white/25 border border-white/40" />
          <span className="text-[8px] text-white/70 font-mono">
            creator · raw
          </span>
        </div>
      </div>
    </div>
  );
}

const CREATIVE_WALL: CreativeTile[][] = [
  [
    {
      kind: "reel",
      h: 268,
      gradient: "#1c0f1a",
      caption: "POV: you finally found one that",
      captionEm: "works.",
      handle: "@glowco",
      duration: "0:24",
      video: "/creative/reel-glowco.mp4",
      poster: "/creative/reel-glowco-poster.jpg",
    },
    {
      kind: "static",
      h: 200,
      gradient: "#1a1410",
      eyebrow: "Static · 1:1",
      headline: "Glow up.",
      cta: "shop the drop →",
      light: false,
      image: "/creative/static-glowup.jpg",
    },
    {
      kind: "avatar",
      h: 250,
      gradient: "#0d1020",
      quote: "Our customers save 14 hours a week.",
      name: "Aria · AI Spokesperson",
      video: "/creative/avatar-aria.mp4",
      poster: "/creative/avatar-aria-poster.jpg",
    },
    {
      kind: "ugc",
      h: 268,
      gradient: "#0c2620",
      quote: "ok i'm obsessed 😭",
      tag: "UGC · 9:16",
      video: "/creative/ugc-obsessed.mp4",
      poster: "/creative/ugc-obsessed-poster.jpg",
    },
  ],
  [
    {
      kind: "static",
      h: 250,
      gradient: "#0a0f1e",
      eyebrow: "Image ad · 4:5",
      headline: "Built different.",
      cta: "see why →",
      light: false,
      image: "/creative/static-builtdifferent.jpg",
    },
    {
      kind: "reel",
      h: 256,
      gradient: "#0a1628",
      caption: "3 things nobody tells you",
      captionEm: "about it.",
      handle: "@thedailyedit",
      duration: "0:31",
      video: "/creative/reel-thedailyedit.mp4",
      poster: "/creative/reel-thedailyedit-poster.jpg",
    },
    {
      kind: "ugc",
      h: 264,
      gradient: "#2a1a0a",
      quote: "trust me on this one.",
      tag: "UGC · unboxing",
      video: "/creative/ugc-trustme.mp4",
      poster: "/creative/ugc-trustme-poster.jpg",
    },
    {
      kind: "avatar",
      h: 250,
      gradient: "#1a0d1e",
      quote: "Here's how it actually works.",
      name: "Marcus · AI Presenter",
      video: "/creative/avatar-marcus.mp4",
      poster: "/creative/avatar-marcus-poster.jpg",
    },
  ],
  [
    {
      kind: "avatar",
      h: 250,
      gradient: "#08222e",
      quote: "Real results, in 30 seconds.",
      name: "Nova · AI Host",
      video: "/creative/avatar-nova.mp4",
      poster: "/creative/avatar-nova-poster.jpg",
    },
    {
      kind: "reel",
      h: 262,
      gradient: "#1a1030",
      caption: "watch this before you",
      captionEm: "buy.",
      handle: "@studionotes",
      duration: "0:18",
      video: "/creative/reel-studionotes.mp4",
      poster: "/creative/reel-studionotes-poster.jpg",
    },
    {
      kind: "static",
      h: 158,
      gradient: "#1c2b30",
      eyebrow: "Static · 16:9",
      headline: "Your skin. Upgraded.",
      cta: "try risk-free →",
      light: false,
      image: "/creative/static-skinupgraded.jpg",
    },
    {
      kind: "ugc",
      h: 266,
      gradient: "#2a0a1c",
      quote: "this is your sign 💅",
      tag: "UGC · 9:16",
      video: "/creative/ugc-yoursign.mp4",
      poster: "/creative/ugc-yoursign-poster.jpg",
    },
  ],
];

// ─── Creative studio — content-type deep-dives ──────────────
type ContentBreakdown = {
  lead: string;
  emphasis: string;
  media:
    | { type: "video"; src: string; poster: string; badge: string }
    | { type: "image"; src: string; badge: string; ratio: string };
  whatItIs: string;
  fits: string[];
};

const CONTENT_BREAKDOWN: ContentBreakdown[] = [
  {
    lead: "Video",
    emphasis: "content.",
    media: {
      type: "video",
      src: "/creative/example-video.mp4",
      poster: "/creative/example-video-poster.jpg",
      badge: "Reel · 9:16",
    },
    whatItIs:
      "Short-form and long-form video, produced end to end. Scroll-stopping vertical ads for the feed, plus the longer pieces that build a brand: explainers, founder stories, YouTube content. Every piece scripted, edited, captioned, and exported to platform spec.",
    fits: [
      "your ad account needs fresh creative every week to beat fatigue.",
      "you want one shoot to yield a hero film plus a dozen short cut-downs.",
      "you want a YouTube or explainer presence but producing long-form in-house is too slow.",
    ],
  },
  {
    lead: "AI",
    emphasis: "avatars.",
    media: {
      type: "video",
      src: "/creative/example-avatar.mp4",
      poster: "/creative/example-avatar-poster.jpg",
      badge: "AI Avatar",
    },
    whatItIs:
      "A lifelike presenter that delivers your script to camera. No shoot, no studio, no talent day-rate. Tuned to your brand's tone and ready to film a dozen new scripts in the time a traditional crew sets up one.",
    fits: [
      "you need talking-head content but don't have a face for the brand.",
      "you're testing ten different angles and can't book ten shoots.",
      "you want to localize one script into five languages without five actors.",
    ],
  },
  {
    lead: "UGC",
    emphasis: "content.",
    media: {
      type: "video",
      src: "/creative/example-ugc.mp4",
      poster: "/creative/example-ugc-poster.jpg",
      badge: "UGC · 9:16",
    },
    whatItIs:
      "Authentic, handheld, creator-style video. The unpolished aesthetic that outperforms glossy ads in the feed. It looks like a friend's recommendation, because that is what converts now.",
    fits: [
      "polished ads are getting ignored and you need content that doesn't look like an ad.",
      "you can't source, brief, and pay creators fast enough to keep testing.",
      "you need volume, twenty UGC variants a month instead of two.",
    ],
  },
  {
    lead: "Image",
    emphasis: "ads.",
    media: {
      type: "image",
      src: "/creative/static-glowup.jpg",
      badge: "Static · 1:1",
      ratio: "1 / 1",
    },
    whatItIs:
      "Scroll-stopping static creative for paid social, search, and programmatic. Product hero shots, lifestyle scenes, headline variants, all generated, art-directed, and delivered ready for the ad manager in every size you run.",
    fits: [
      "you need ten headline variants on the same visual to find the winner.",
      "a product shoot would cost five figures and take a month.",
      "every placement needs its own crop and you don't have a designer for it.",
    ],
  },
];

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const prefilledMessage = `Hi Josh, I'm interested in ${service.title}. `;
  const contactHref = `/contact?service=${service.slug}&message=${encodeURIComponent(prefilledMessage)}`;
  const foundingHref = `/contact?service=${service.slug}&message=${encodeURIComponent(
    "Hi Josh, I'd like to claim a founding spot. ",
  )}`;

  // Split the headline so the last word renders as a blue accent
  const headlineWords = service.heroHeadline.trim().replace(/\.$/, "").split(" ");
  const headlineLead = headlineWords.slice(0, -1).join(" ");
  const headlineTail = headlineWords[headlineWords.length - 1];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    serviceType: service.title,
    provider: {
      "@type": "Person",
      name: "Joshua Francis",
      url: "https://joshuafrancis.ca",
    },
    areaServed: [
      { "@type": "City", name: "Toronto" },
      { "@type": "Country", name: "Canada" },
      { "@type": "Country", name: "United States" },
    ],
    offers: {
      "@type": "Offer",
      description: `${service.pricingFrom}. ${service.pricingNote}`,
    },
    url: `https://joshuafrancis.ca/services/${service.slug}`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // "Who it's for" — shared section. Rendered before the deep-dives for
  // Creative Studio so visitors self-qualify early; after them elsewhere.
  const whoItsFor = (
    <Section className="py-28 md:py-40 bg-muted/30 border-t border-border/60">
      <AnimatedSection>
        <h2 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[0.98] max-w-4xl">
          {service.sectionHeadings.audience.lead}{" "}
          <span className="text-em">
            {service.sectionHeadings.audience.em}
          </span>
        </h2>
      </AnimatedSection>

      <div className="mt-20 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
        {service.idealClients.map((client, i) => (
          <AnimatedSection key={client.title} delay={i * 0.05}>
            <div className="h-full bg-background border border-border/60 rounded-2xl p-8 md:p-10 flex flex-col">
              <span className="text-5xl md:text-6xl text-accent/25 leading-none mb-10">
                {num(i + 1)}
              </span>
              <h3 className="text-xl md:text-2xl font-semibold text-foreground leading-snug">
                {client.title}
              </h3>
              <p className="mt-4 text-muted-foreground leading-[1.65] text-[15px]">
                {client.description}
              </p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </Section>
  );

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />

      {/* ─── Hero (split: headline + chat mockup) ─────────────── */}
      <Section className="pt-32 md:pt-36 pb-24 md:pb-32">
        <AnimatedSection>
          <div className="grid grid-cols-12 gap-x-0 gap-y-8 md:gap-10 lg:gap-14 items-center">
            {/* Left: headline + CTA */}
            <div className="col-span-12 lg:col-span-6">
              <h1 className="text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[3.75rem] font-semibold tracking-tight text-foreground leading-[0.96] text-balance">
                {headlineLead}{" "}
                <span className="text-em">
                  {headlineTail}.
                </span>
              </h1>
              <p className="mt-8 md:mt-10 text-lg md:text-xl text-muted-foreground leading-[1.55] max-w-xl">
                {service.heroSubhead}
              </p>

              <div className="mt-10 md:mt-12 flex flex-col sm:flex-row sm:items-baseline gap-5 sm:gap-8">
                <Link
                  href={contactHref}
                  className="group inline-flex items-center gap-3 text-base font-medium text-foreground border-b border-foreground/30 hover:border-foreground transition-colors pb-1 w-fit"
                >
                  {service.slug === "creative-studio"
                    ? "Book an intro call"
                    : "Begin a conversation"}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <div className="text-sm text-muted-foreground">
                  <span>From</span>{" "}
                  <span className="text-foreground font-medium">
                    {service.pricingFrom.replace(/^From\s*/i, "")}
                  </span>
                </div>
              </div>

              {service.slug === "creative-studio" ? (
                <p className="mt-6 text-xs uppercase tracking-[0.14em] text-amber-700 dark:text-amber-500 font-semibold">
                  Founding rate open for the first 3 brands
                </p>
              ) : service.slug === "ai-agent" ? (
                <p className="mt-6 text-xs uppercase tracking-[0.14em] text-amber-700 dark:text-amber-500 font-semibold">
                  Founding rate open for the first 2 clients
                </p>
              ) : (
                <p className="mt-6 text-xs text-muted-foreground/70">
                  {service.pricingNote}
                </p>
              )}
            </div>

            {/* Right: chat mockup (only for ai-agent) */}
            {service.slug === "ai-agent" && (
              <div className="col-span-12 lg:col-span-6 relative">
                <div className="absolute -inset-x-6 -top-6 bottom-6 bg-gradient-to-br from-accent/[0.04] via-transparent to-accent/[0.06] rounded-3xl blur-2xl" />
                <div className="relative rounded-2xl bg-card border border-border/80 shadow-2xl shadow-black/[0.06] overflow-hidden">
                  {/* Window chrome (mac) */}
                  <div
                    className="flex items-center justify-between px-4 h-9 border-b border-black/20"
                    style={{ backgroundColor: "#3F0E40" }}
                  >
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                    </div>
                    <div className="text-[11px] text-white/60 font-medium tracking-tight">
                      acme corp
                    </div>
                    <div className="w-12" />
                  </div>

                  {/* Slack-style channel header */}
                  <div className="flex items-center justify-between px-5 md:px-6 h-12 border-b border-border bg-card">
                    <div className="flex items-baseline gap-2">
                      <span className="text-foreground/40 text-lg font-light leading-none">
                        #
                      </span>
                      <span className="text-foreground font-bold text-[15px] leading-none">
                        ops
                      </span>
                      <svg
                        viewBox="0 0 24 24"
                        className="w-3 h-3 text-muted-foreground/60 ml-1"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-1.5">
                        {[
                          "#3F0E40",
                          "#1264A3",
                          "#007A5A",
                          "#ECB22E",
                        ].map((c) => (
                          <div
                            key={c}
                            className="w-5 h-5 rounded-[3px] border border-card"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] text-muted-foreground font-medium">
                        12
                      </span>
                    </div>
                  </div>

                  {/* Conversation */}
                  <div className="p-6 md:p-8 space-y-6">
                    {/* Message — human */}
                    <div className="flex items-start gap-4">
                      <Image
                        src="/sarah-avatar.png"
                        alt="Sarah"
                        width={36}
                        height={36}
                        className="w-9 h-9 rounded-md object-cover flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-2">
                          <span className="font-semibold text-foreground text-sm">
                            Sarah
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            9:14 AM
                          </span>
                        </div>
                        <p className="mt-1 text-foreground/85 leading-relaxed text-[15px]">
                          Hey, can you pull together Q4 churn and draft a
                          summary for the board deck? Need it by EOD.
                        </p>
                      </div>
                    </div>

                    {/* Message — agent ack */}
                    <div className="flex items-start gap-4">
                      <div
                        className="w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: "#611F69" }}
                      >
                        <span className="text-white font-bold text-sm leading-none">
                          R
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-2">
                          <span className="font-semibold text-foreground text-sm">
                            Remi
                          </span>
                          <span
                            className="text-[10px] uppercase tracking-wider text-white font-bold rounded-sm px-1.5 py-0.5 leading-none"
                            style={{ backgroundColor: "#616061" }}
                          >
                            App
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            9:14 AM
                          </span>
                        </div>
                        <p className="mt-1 text-foreground/85 leading-relaxed text-[15px]">
                          On it. Pulling from Stripe and the churn dashboard
                          now. I&apos;ll have a draft in your inbox in about
                          ten minutes.
                        </p>
                      </div>
                    </div>

                    {/* Divider — later */}
                    <div className="flex items-center gap-3 py-1">
                      <div className="flex-1 h-px bg-border/60" />
                      <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 font-medium">
                        12 min later
                      </span>
                      <div className="flex-1 h-px bg-border/60" />
                    </div>

                    {/* Message — agent delivery */}
                    <div className="flex items-start gap-4">
                      <div
                        className="w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: "#611F69" }}
                      >
                        <span className="text-white font-bold text-sm leading-none">
                          R
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-2">
                          <span className="font-semibold text-foreground text-sm">
                            Remi
                          </span>
                          <span
                            className="text-[10px] uppercase tracking-wider text-white font-bold rounded-sm px-1.5 py-0.5 leading-none"
                            style={{ backgroundColor: "#616061" }}
                          >
                            App
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            9:26 AM
                          </span>
                        </div>
                        <p className="mt-1 text-foreground/85 leading-relaxed text-[15px]">
                          Draft is in your inbox.{" "}
                          <span className="text-foreground/70">
                            Notable:
                          </span>{" "}
                          churn ticked up 0.8% in November, mostly Enterprise
                          SKU. I flagged three accounts worth a save call.
                          Details in the doc.
                        </p>
                        <div className="mt-3 inline-flex items-center gap-2 rounded-md border border-border/80 bg-muted/40 px-3 py-2 text-xs">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span className="text-foreground/70">
                            Q4-churn-summary.gdoc
                          </span>
                          <span className="text-muted-foreground/60">·</span>
                          <span className="text-muted-foreground/60">
                            2.4k words
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Typing indicator */}
                    <div className="flex items-center gap-4 pt-1">
                      <Image
                        src="/sarah-avatar.png"
                        alt="Sarah"
                        width={36}
                        height={36}
                        className="w-9 h-9 rounded-md object-cover flex-shrink-0"
                      />
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-muted/60 px-3.5 py-2 flex items-center gap-1">
                          <span className="typing-dot w-1.5 h-1.5 rounded-full bg-foreground/40 block" />
                          <span className="typing-dot w-1.5 h-1.5 rounded-full bg-foreground/40 block" />
                          <span className="typing-dot w-1.5 h-1.5 rounded-full bg-foreground/40 block" />
                        </div>
                        <span className="text-[11px] text-muted-foreground/70">
                          Sarah is typing
                        </span>
                      </div>
                    </div>

                    {/* Composer */}
                    <div className="pt-4 mt-2 border-t border-border/60">
                      <div className="rounded-md border border-border/80 px-4 py-3 flex items-center gap-3 bg-background/50">
                        <span className="text-sm text-muted-foreground/60">
                          Message #ops
                        </span>
                        <div className="ml-auto flex items-center gap-1.5">
                          <div
                            className="w-1.5 h-1.5 rounded-full animate-pulse"
                            style={{ backgroundColor: "#007A5A" }}
                          />
                          <span
                            className="text-[10px] uppercase tracking-wider font-bold"
                            style={{ color: "#007A5A" }}
                          >
                            Active · 24/7
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Right: Voice AI — live call mockup */}
            {service.slug === "voice-ai" && (
              <div className="col-span-12 lg:col-span-6 relative">
                <div className="absolute -inset-x-6 -top-6 bottom-6 bg-gradient-to-br from-emerald-500/[0.06] via-transparent to-emerald-500/[0.08] rounded-3xl blur-2xl" />
                <div className="relative rounded-2xl bg-card border border-border/80 shadow-2xl shadow-black/[0.06] overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center justify-between px-5 h-11 border-b border-border/60 bg-muted/30">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: "#34A853" }}
                      />
                      <span className="text-xs font-semibold tracking-tight text-foreground/85">
                        Active call
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">
                        01:24
                      </span>
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground font-semibold">
                      Inbound
                    </div>
                  </div>

                  {/* Body — 5/7 split */}
                  <div className="grid grid-cols-12">
                    {/* Caller card */}
                    <div className="col-span-12 md:col-span-5 p-6 md:border-r border-border/60 bg-gradient-to-b from-muted/20 to-background">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-foreground/[0.08] to-foreground/[0.18] flex items-center justify-center text-lg font-semibold text-foreground/70 mb-3">
                          JH
                        </div>
                        <h4 className="font-semibold text-foreground text-[15px]">
                          Jordan Hayes
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1 font-mono">
                          (415) 555-9876
                        </p>
                        <p className="text-[11px] text-muted-foreground/70 mt-0.5">
                          San Francisco, CA
                        </p>

                        {/* Waveform */}
                        <div className="mt-5 flex items-end justify-center gap-[2px] h-9 w-full">
                          {Array.from({ length: 32 }).map((_, i) => {
                            const h = 6 + Math.abs(Math.sin(i * 0.55) * 18);
                            return (
                              <div
                                key={i}
                                className="flex-1 max-w-[3px] rounded-full typing-dot"
                                style={{
                                  height: `${h}px`,
                                  backgroundColor: "#34A853",
                                  opacity: 0.7,
                                  animationDelay: `${i * 0.04}s`,
                                }}
                              />
                            );
                          })}
                        </div>

                        {/* Metadata */}
                        <div className="mt-5 w-full pt-4 border-t border-border/60 grid grid-cols-3 gap-y-2 text-left">
                          <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-mono">
                            Intent
                          </div>
                          <div className="col-span-2 text-[11px] text-foreground/85">
                            Book appointment
                          </div>
                          <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-mono">
                            Sentiment
                          </div>
                          <div className="col-span-2 text-[11px] text-foreground/85">
                            Positive · 92%
                          </div>
                          <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-mono">
                            Lead
                          </div>
                          <div className="col-span-2 text-[11px] text-foreground/85">
                            New · No record
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Live transcript */}
                    <div className="col-span-12 md:col-span-7 p-5 md:p-6">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-semibold mb-4">
                        Live transcript
                      </div>
                      <div className="space-y-3.5 text-[13px] leading-relaxed">
                        <div>
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-[10px] uppercase tracking-wider font-bold text-foreground/60">
                              Caller
                            </span>
                            <span className="text-[10px] text-muted-foreground font-mono">
                              00:08
                            </span>
                          </div>
                          <p className="text-foreground/85">
                            Hi, I&apos;d like to book an appointment for a
                            haircut sometime next week.
                          </p>
                        </div>

                        <div>
                          <div className="flex items-baseline gap-2 mb-1">
                            <span
                              className="text-[10px] uppercase tracking-wider font-bold rounded-sm px-1.5 py-0.5 text-white"
                              style={{ backgroundColor: "#34A853" }}
                            >
                              Atlas
                            </span>
                            <span className="text-[10px] text-muted-foreground font-mono">
                              00:13
                            </span>
                          </div>
                          <p className="text-foreground/85">
                            Of course. I have Tuesday at 2pm or Wednesday at
                            10am with Dr. Chen. Which works better?
                          </p>
                        </div>

                        <div>
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-[10px] uppercase tracking-wider font-bold text-foreground/60">
                              Caller
                            </span>
                            <span className="text-[10px] text-muted-foreground font-mono">
                              00:42
                            </span>
                          </div>
                          <p className="text-foreground/85">
                            Tuesday at 2pm sounds great.
                          </p>
                        </div>

                        <div>
                          <div className="flex items-baseline gap-2 mb-1">
                            <span
                              className="text-[10px] uppercase tracking-wider font-bold rounded-sm px-1.5 py-0.5 text-white"
                              style={{ backgroundColor: "#34A853" }}
                            >
                              Atlas
                            </span>
                            <span className="text-[10px] text-muted-foreground font-mono">
                              00:48
                            </span>
                          </div>
                          <p className="text-foreground/85">
                            Booked. Tuesday March 19 at 2:00 PM with Dr. Chen.
                            I&apos;ll text you a reminder. Anything else?
                          </p>
                          <div
                            className="mt-3 inline-flex items-center gap-2 rounded-md border px-3 py-2 text-xs"
                            style={{
                              borderColor: "rgba(52, 168, 83, 0.3)",
                              backgroundColor: "rgba(52, 168, 83, 0.05)",
                            }}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              className="w-3.5 h-3.5"
                              fill="none"
                              stroke="#34A853"
                              strokeWidth="3"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span className="text-foreground/80 font-medium">
                              Appointment booked
                            </span>
                            <span className="text-muted-foreground/60">·</span>
                            <span className="text-muted-foreground/60 font-mono">
                              Mar 19 · 2pm
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5 pt-1">
                          <span className="text-[10px] uppercase tracking-wider font-bold text-foreground/60">
                            Caller
                          </span>
                          <div className="flex gap-1">
                            <span className="typing-dot w-1.5 h-1.5 rounded-full bg-foreground/40 block" />
                            <span className="typing-dot w-1.5 h-1.5 rounded-full bg-foreground/40 block" />
                            <span className="typing-dot w-1.5 h-1.5 rounded-full bg-foreground/40 block" />
                          </div>
                          <span className="text-[10px] text-muted-foreground/70">
                            speaking
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Right: AI Apps — product dashboard mockup */}
            {service.slug === "ai-apps" && (
              <div className="col-span-12 lg:col-span-6 relative">
                <div className="absolute -inset-x-6 -top-6 bottom-6 bg-gradient-to-br from-blue-500/[0.06] via-transparent to-indigo-500/[0.06] rounded-3xl blur-2xl" />
                <div className="relative rounded-xl bg-card border border-border/80 shadow-2xl shadow-black/[0.06] overflow-hidden">
                  {/* Browser chrome */}
                  <div className="flex items-center gap-3 px-4 h-9 border-b border-border/60 bg-muted/40">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
                      <div className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
                      <div className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
                    </div>
                    <div className="flex-1 mx-2 h-5 rounded-md bg-background/60 border border-border/60 flex items-center px-3 text-[10px] text-muted-foreground/70 font-mono">
                      insights.acmecorp.com
                    </div>
                  </div>
                  {/* App body */}
                  <div className="grid grid-cols-12 min-h-[440px]">
                    {/* Sidebar */}
                    <div className="hidden md:flex flex-col col-span-3 border-r border-border/60 bg-muted/20 p-3">
                      <div className="flex items-center gap-2 px-2 py-2 mb-3">
                        <div className="w-5 h-5 rounded bg-gradient-to-br from-blue-500 to-indigo-600" />
                        <span className="text-[11px] font-bold text-foreground">
                          Insights
                        </span>
                      </div>
                      {[
                        { label: "Dashboard", active: true },
                        { label: "Customers" },
                        { label: "Revenue" },
                        { label: "Churn" },
                        { label: "Reports" },
                        { label: "Settings" },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className={`px-2 py-1.5 rounded text-[11px] mb-0.5 ${
                            item.active
                              ? "bg-foreground/[0.06] text-foreground font-semibold"
                              : "text-muted-foreground/80"
                          }`}
                        >
                          {item.label}
                        </div>
                      ))}
                    </div>
                    {/* Main panel */}
                    <div className="col-span-12 md:col-span-9 p-5 md:p-6">
                      <div className="flex items-baseline justify-between mb-5">
                        <div>
                          <h4 className="text-[15px] font-bold text-foreground">
                            Q4 Performance
                          </h4>
                          <p className="text-[10px] text-muted-foreground/70 mt-0.5 font-mono">
                            Updated 2 min ago
                          </p>
                        </div>
                        <button className="text-[10px] uppercase tracking-wider font-semibold text-white px-3 py-1.5 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600">
                          + Generate
                        </button>
                      </div>
                      {/* Metric cards */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {[
                          { label: "MRR", value: "$48.2k", delta: "+12%", up: true },
                          { label: "Churn", value: "4.2%", delta: "−0.8%", up: true },
                          { label: "NPS", value: "67", delta: "+5", up: true },
                        ].map((m, idx) => (
                          <div
                            key={idx}
                            className="rounded-md border border-border/60 bg-background p-3"
                          >
                            <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-semibold">
                              {m.label}
                            </div>
                            <div className="text-base font-bold text-foreground mt-0.5">
                              {m.value}
                            </div>
                            <div
                              className="text-[10px] font-semibold mt-0.5"
                              style={{ color: m.up ? "#34A853" : "#EF4444" }}
                            >
                              {m.delta}
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* AI insight card */}
                      <div
                        className="rounded-md p-4 relative overflow-hidden"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(59,130,246,0.06) 0%, rgba(99,102,241,0.04) 100%)",
                          border: "1px solid rgba(99,102,241,0.2)",
                        }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <svg
                            className="w-3.5 h-3.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#6366F1"
                            strokeWidth="2"
                          >
                            <polygon points="12 2 15 9 22 9 17 14 19 22 12 17 5 22 7 14 2 9 9 9 12 2" />
                          </svg>
                          <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-600 dark:text-indigo-400">
                            AI Insight
                          </span>
                          <span className="text-[10px] text-muted-foreground ml-auto font-mono">
                            High confidence
                          </span>
                        </div>
                        <p className="text-[12px] leading-relaxed text-foreground/85">
                          3 enterprise accounts show early churn signals
                          (login frequency ↓, support tickets ↑). Save calls
                          recommended this week.
                        </p>
                        <button className="mt-3 text-[10px] uppercase tracking-wider font-semibold text-indigo-600 dark:text-indigo-400">
                          View accounts →
                        </button>
                      </div>
                      {/* Mini chart */}
                      <div className="mt-4 rounded-md border border-border/60 bg-background p-3">
                        <div className="flex items-baseline justify-between mb-2">
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-semibold">
                            Revenue / week
                          </span>
                          <span className="text-[10px] text-muted-foreground/70 font-mono">
                            Last 8 wks
                          </span>
                        </div>
                        <svg
                          viewBox="0 0 200 50"
                          className="w-full h-12"
                          preserveAspectRatio="none"
                        >
                          <defs>
                            <linearGradient
                              id="appFill"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="0%"
                                stopColor="#6366F1"
                                stopOpacity="0.3"
                              />
                              <stop
                                offset="100%"
                                stopColor="#6366F1"
                                stopOpacity="0"
                              />
                            </linearGradient>
                          </defs>
                          <path
                            d="M0,40 L25,38 L50,32 L75,30 L100,22 L125,25 L150,18 L175,12 L200,8 L200,50 L0,50 Z"
                            fill="url(#appFill)"
                          />
                          <path
                            d="M0,40 L25,38 L50,32 L75,30 L100,22 L125,25 L150,18 L175,12 L200,8"
                            fill="none"
                            stroke="#6366F1"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Right: Creative Studio — scrolling creative wall */}
            {service.slug === "creative-studio" && (
              <div className="col-span-12 lg:col-span-6 relative">
                <div className="absolute -inset-x-6 -inset-y-8 bg-gradient-to-br from-rose-500/[0.07] via-transparent to-violet-500/[0.07] rounded-[2.5rem] blur-3xl" />
                <div
                  className="creative-wall relative grid grid-cols-3 gap-3 md:gap-4 h-[440px] md:h-[560px] overflow-hidden"
                  style={{
                    maskImage:
                      "linear-gradient(to bottom, transparent 0%, black 11%, black 89%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, transparent 0%, black 11%, black 89%, transparent 100%)",
                  }}
                >
                  {CREATIVE_WALL.map((column, ci) => (
                    <div
                      key={ci}
                      className={
                        ci === 1 ? "creative-col-down" : "creative-col-up"
                      }
                      style={
                        {
                          "--dur": `${[40, 46, 36][ci]}s`,
                        } as React.CSSProperties
                      }
                    >
                      <div className="flex flex-col gap-3 md:gap-4 pb-3 md:pb-4">
                        {column.map((tile, ti) => (
                          <CreativeWallTile key={ti} tile={tile} />
                        ))}
                      </div>
                      <div
                        className="flex flex-col gap-3 md:gap-4 pb-3 md:pb-4"
                        aria-hidden="true"
                      >
                        {column.map((tile, ti) => (
                          <CreativeWallTile key={`d-${ti}`} tile={tile} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <CreativeWallVideos />
              </div>
            )}

            {/* Right: AI Training — editorial syllabus */}
            {service.slug === "ai-training" && (
              <div className="col-span-12 lg:col-span-6 relative">
                <div className="absolute -inset-x-6 -top-6 bottom-6 bg-gradient-to-br from-teal-700/[0.06] via-transparent to-emerald-700/[0.06] rounded-3xl blur-2xl" />
                <div className="relative rounded-xl bg-gradient-to-b from-card to-muted/20 border border-border/80 shadow-2xl shadow-black/[0.06] overflow-hidden p-7 md:p-10">
                  {/* Top crest */}
                  <div className="flex items-center justify-between pb-5 border-b border-border/60 mb-7">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70 font-semibold">
                        Program · 6 weeks
                      </div>
                      <div className="mt-1 text-base md:text-lg font-bold text-foreground">
                        AI Fluency · Design Team
                      </div>
                    </div>
                    <div
                      className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-sm text-white"
                      style={{ backgroundColor: "#0F766E" }}
                    >
                      Custom
                    </div>
                  </div>

                  {/* Modules */}
                  <div className="space-y-5">
                    {[
                      {
                        roman: "I",
                        title: "Foundations",
                        weeks: "Week 1",
                        sessions: [
                          "Tools landscape & mental models",
                        ],
                      },
                      {
                        roman: "II",
                        title: "Hands-on",
                        weeks: "Weeks 2 – 4",
                        sessions: [
                          "Claude & ChatGPT workflows",
                          "Image generation, vibes & critique",
                          "Cursor & Lovable for prototyping",
                        ],
                      },
                      {
                        roman: "III",
                        title: "Integration",
                        weeks: "Weeks 5 – 6",
                        sessions: [
                          "Your team's workflow",
                          "Office hours & async Q&A",
                        ],
                      },
                    ].map((mod, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-12 gap-4 pb-5 border-b border-border/40 last:border-b-0 last:pb-0"
                      >
                        <div className="col-span-2 md:col-span-1">
                          <span
                            className="text-3xl leading-none"
                            style={{ color: "#0F766E" }}
                          >
                            {mod.roman}
                          </span>
                        </div>
                        <div className="col-span-10 md:col-span-3">
                          <div className="text-sm font-bold text-foreground">
                            {mod.title}
                          </div>
                          <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-mono mt-0.5">
                            {mod.weeks}
                          </div>
                        </div>
                        <div className="col-span-12 md:col-span-8 space-y-1">
                          {mod.sessions.map((s, i) => (
                            <div
                              key={i}
                              className="text-[12px] text-foreground/80 leading-relaxed"
                            >
                              <span className="text-muted-foreground/40 mr-2 font-mono text-[10px]">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              {s}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer credit */}
                  <div className="mt-7 pt-5 border-t border-border/60 grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="text-base font-bold text-foreground">
                        12
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-mono mt-0.5">
                        Attendees
                      </div>
                    </div>
                    <div className="border-x border-border/60">
                      <div className="text-base font-bold text-foreground">
                        6
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-mono mt-0.5">
                        Sessions
                      </div>
                    </div>
                    <div>
                      <div className="text-base font-bold text-foreground">
                        ∞
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-mono mt-0.5">
                        Recordings
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </AnimatedSection>
      </Section>

      {/* ─── Integrations marquee ────────────────────────────── */}
      {service.slug === "ai-agent" && (
        <Section className="py-16 md:py-20 border-y border-border/60 bg-muted/20 overflow-hidden">
          <AnimatedSection>
            <div className="grid grid-cols-12 gap-6 md:gap-10 items-end mb-10">
              <div className="col-span-12 md:col-span-7">
                <h3 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.02]">
                  One connection.{" "}
                  <span className="text-em">
                    Every tool.
                  </span>
                </h3>
              </div>
              <div className="col-span-12 md:col-span-5 md:pl-6">
                <p className="text-muted-foreground leading-relaxed max-w-md">
                  No passwords to share, no brittle one-off integrations. Your
                  AI agent connects to the tools you already use through one
                  secure connection, then reads, writes, and acts where your
                  team already works.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </Section>
      )}

      {/* ─── More than just software (ai-agent) ──────────────── */}
      {service.slug === "ai-agent" && (
        <Section className="py-28 md:py-40 border-t border-border/60">
          <AnimatedSection>
            <div className="max-w-4xl">
              <h2 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[0.98]">
                More than just{" "}
                <span className="text-em">software.</span>
              </h2>
              <p className="mt-8 text-lg md:text-xl text-muted-foreground leading-[1.55] max-w-2xl">
                These are the details that make people stop calling it a bot. It
                has a name, an inbox, and a real seat in how your company runs.
              </p>
            </div>
          </AnimatedSection>

          <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {/* Card 1 — Its own identity */}
            <AnimatedSection>
              <div className="h-full rounded-2xl border border-border/60 bg-background overflow-hidden flex flex-col">
                <div className="h-40 bg-gradient-to-br from-muted/40 via-background to-muted/20 flex items-center justify-center p-6">
                  <div className="w-full max-w-xs rounded-xl border border-border bg-card shadow-lg shadow-black/[0.06] p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold">
                        R
                      </div>
                      <div className="min-w-0">
                        <div className="text-[12px] font-semibold text-foreground">
                          Remi
                        </div>
                        <div className="text-[11px] text-muted-foreground font-mono truncate">
                          remi@yourcompany.com
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-border/60 text-[12px] text-muted-foreground leading-snug">
                      Re: Q4 board deck. Drafted and sitting in your inbox.
                    </div>
                  </div>
                </div>
                <div className="p-7 md:p-8 border-t border-border/60 flex-1">
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground leading-tight">
                    It has its own identity
                  </h3>
                  <p className="mt-3 text-muted-foreground leading-[1.65]">
                    You name it. It gets a real email address and signs its own
                    messages. Your team and your clients can email it directly,
                    the same as any other colleague.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Card 2 — Works a real computer */}
            <AnimatedSection delay={0.05}>
              <div className="h-full rounded-2xl border border-border/60 bg-background overflow-hidden flex flex-col">
                <div className="h-40 bg-gradient-to-br from-muted/30 to-background flex items-center justify-center p-6">
                  <div className="w-full max-w-xs rounded-xl border border-border bg-card shadow-lg shadow-black/[0.06] overflow-hidden">
                    <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border/60 bg-muted/40">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: "#FF5F57" }}
                      />
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: "#FEBC2E" }}
                      />
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: "#28C840" }}
                      />
                      <span className="ml-2 text-[10px] text-muted-foreground font-mono">
                        internal-dashboard
                      </span>
                    </div>
                    <div className="p-3.5 space-y-2">
                      <div className="h-2 rounded bg-muted w-3/4" />
                      <div className="h-2 rounded bg-muted w-1/2" />
                      <div className="h-2 rounded bg-accent/30 w-2/3" />
                      <div className="h-2 rounded bg-muted w-2/5" />
                    </div>
                  </div>
                </div>
                <div className="p-7 md:p-8 border-t border-border/60 flex-1">
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground leading-tight">
                    It works a real computer
                  </h3>
                  <p className="mt-3 text-muted-foreground leading-[1.65]">
                    Not a script that only speaks to APIs. It works inside a
                    real machine the way a person does, so it can use the
                    software that was never built to be automated.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Card 3 — Never locked to one model */}
            <AnimatedSection delay={0.1}>
              <div className="h-full rounded-2xl border border-border/60 bg-background overflow-hidden flex flex-col">
                <div className="h-40 bg-gradient-to-br from-muted/30 to-background flex flex-col items-center justify-center gap-3 p-6">
                  <div className="flex items-center gap-2.5">
                    <span className="px-3 py-1.5 rounded-md border border-border bg-card text-[12px] font-mono text-muted-foreground line-through">
                      model v5
                    </span>
                    <ArrowRight className="w-4 h-4 text-accent" />
                    <span className="px-3 py-1.5 rounded-md border border-accent/40 bg-accent/10 text-[12px] font-mono font-semibold text-accent">
                      model v6
                    </span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-mono">
                    Auto-upgraded · no change to your bill
                  </span>
                </div>
                <div className="p-7 md:p-8 border-t border-border/60 flex-1">
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground leading-tight">
                    Never locked to one model
                  </h3>
                  <p className="mt-3 text-muted-foreground leading-[1.65]">
                    The week a faster, cheaper model ships, your AI agent
                    moves to it. You always run on the best intelligence
                    available, and managing that cost stays my job, not yours.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Card 4 — Zero friction */}
            <AnimatedSection delay={0.15}>
              <div className="h-full rounded-2xl border border-border/60 bg-background overflow-hidden flex flex-col">
                <div className="h-40 bg-gradient-to-br from-muted/30 to-background flex items-center justify-center p-6">
                  <div className="w-full max-w-xs space-y-2">
                    {["Token counters", "Usage caps", "Infrastructure to manage"].map(
                      (item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2.5 text-[12px]"
                        >
                          <span className="w-4 h-4 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                            <svg
                              viewBox="0 0 24 24"
                              className="w-2.5 h-2.5 text-muted-foreground"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                            >
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </span>
                          <span className="text-muted-foreground/70 line-through">
                            {item}
                          </span>
                        </div>
                      ),
                    )}
                    <div className="flex items-center gap-2.5 text-[12px] pt-1">
                      <span className="w-4 h-4 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
                        <svg
                          viewBox="0 0 24 24"
                          className="w-2.5 h-2.5 text-accent"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3.5"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span className="font-semibold text-foreground">
                        One flat retainer
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-7 md:p-8 border-t border-border/60 flex-1">
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground leading-tight">
                    Zero friction, by design
                  </h3>
                  <p className="mt-3 text-muted-foreground leading-[1.65]">
                    No token counters. No usage caps. No infrastructure, logins,
                    or upgrades on your plate. One flat retainer, and it simply
                    works.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </Section>
      )}

      {/* ─── Voice AI integrations marquee ───────────────────── */}
      {service.slug === "voice-ai" && (
        <Section className="py-16 md:py-20 border-y border-border/60 bg-muted/20 overflow-hidden">
          <AnimatedSection>
            <div className="grid grid-cols-12 gap-6 md:gap-10 items-end mb-10">
              <div className="col-span-12 md:col-span-7">
                <h3 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.02]">
                  Pushes to your CRM,{" "}
                  <span className="text-em">
                    books on your calendar.
                  </span>
                </h3>
              </div>
              <div className="col-span-12 md:col-span-5 md:pl-6">
                <p className="text-muted-foreground leading-relaxed max-w-md">
                  Every call logged with transcript, summary, sentiment, and
                  next action. Appointments dropped straight onto the right
                  calendar.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </Section>
      )}

      {/* ─── AI Apps stack marquee ────────────────────────────── */}
      {service.slug === "ai-apps" && (
        <Section className="py-16 md:py-20 border-y border-border/60 bg-muted/20 overflow-hidden">
          <AnimatedSection>
            <div className="grid grid-cols-12 gap-6 md:gap-10 items-end mb-10">
              <div className="col-span-12 md:col-span-7">
                <h3 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.02]">
                  A modern stack,{" "}
                  <span className="text-em">
                    your team can maintain.
                  </span>
                </h3>
              </div>
              <div className="col-span-12 md:col-span-5 md:pl-6">
                <p className="text-muted-foreground leading-relaxed max-w-md">
                  Battle-tested tools your engineers already know, or can
                  hand back to your team without a year of cleanup.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </Section>
      )}

      {/* ─── Creative Studio tooling marquee ──────────────────── */}
      {service.slug === "creative-studio" && (
        <Section className="py-16 md:py-20 border-y border-border/60 bg-muted/20 overflow-hidden">
          <AnimatedSection>
            <div className="grid grid-cols-12 gap-6 md:gap-10 items-end mb-10">
              <div className="col-span-12 md:col-span-7">
                <h3 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.02]">
                  Best-in-class tools,{" "}
                  <span className="text-em">
                    in the hands of taste.
                  </span>
                </h3>
              </div>
              <div className="col-span-12 md:col-span-5 md:pl-6">
                <p className="text-muted-foreground leading-relaxed max-w-md">
                  The best generative models, video tools, and editing
                  software in the world. Wielded by a creative director who
                  knows what to keep and what to throw away.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </Section>
      )}

      {/* ─── Who it's for (Creative Studio — early self-qualify) ─ */}
      {service.slug === "creative-studio" && whoItsFor}

      {/* ─── Capabilities (bento grid) ────────────────────────── */}
      <Section className="py-28 md:py-40 border-t border-border/60">
        <AnimatedSection>
          <div className="max-w-5xl">
            <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-tight leading-[0.98]">
              {service.sectionHeadings.capabilities.lead}{" "}
              <span className="text-em">
                {service.sectionHeadings.capabilities.em}
              </span>
            </h2>
            <p className="mt-8 text-lg md:text-xl text-muted-foreground leading-[1.55] max-w-2xl">
              {service.description}
            </p>
          </div>
        </AnimatedSection>

        {service.slug === "ai-agent" ? (
          <div className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
            {/* Card 1 — Lives where your team works (col-span-8) */}
            <AnimatedSection className="md:col-span-8">
              <div className="group h-full rounded-2xl border border-border/60 bg-background overflow-hidden hover:border-foreground/20 transition-colors">
                {/* Visual: stacked notification cards */}
                <div className="relative h-56 md:h-64 bg-gradient-to-br from-muted/40 via-background to-muted/20 overflow-hidden">
                  <div className="absolute inset-0 dot-pattern opacity-[0.04]" />
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="relative w-full max-w-md">
                      {[
                        {
                          color: "#4A154B",
                          app: "Slack",
                          from: "#ops",
                          msg: "Sarah: Pull Q4 churn for board deck",
                          time: "9:14 AM",
                          rotate: -4,
                          offset: 0,
                          z: 10,
                        },
                        {
                          color: "#229ED9",
                          app: "Telegram",
                          from: "Marcus",
                          msg: "Hey can we move our 3pm to tomorrow?",
                          time: "9:21 AM",
                          rotate: 2,
                          offset: 14,
                          z: 20,
                        },
                        {
                          color: "#25D366",
                          app: "WhatsApp",
                          from: "Lisa (ACME)",
                          msg: "Invoice #1487 approved ✓",
                          time: "9:33 AM",
                          rotate: -1,
                          offset: 28,
                          z: 30,
                        },
                      ].map((n, idx) => (
                        <div
                          key={idx}
                          className="absolute left-0 right-0 rounded-xl bg-card border border-border shadow-xl shadow-black/[0.08] p-3.5 transition-transform"
                          style={{
                            top: `${n.offset}px`,
                            transform: `rotate(${n.rotate}deg)`,
                            zIndex: n.z,
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center"
                              style={{ backgroundColor: n.color }}
                            >
                              <span className="text-white text-xs font-bold">
                                {n.app[0]}
                              </span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-baseline justify-between gap-2">
                                <span className="text-[11px] font-semibold text-foreground">
                                  {n.app}
                                </span>
                                <span className="text-[10px] text-muted-foreground/70">
                                  {n.time}
                                </span>
                              </div>
                              <div className="text-[11px] text-muted-foreground mt-0.5 truncate">
                                {n.from}
                              </div>
                              <div className="text-xs text-foreground/85 mt-1 truncate">
                                {n.msg}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-7 md:p-8 border-t border-border/60">
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground leading-tight">
                    {service.capabilities[0].title}
                  </h3>
                  <p className="mt-3 text-muted-foreground leading-[1.65]">
                    {service.capabilities[0].description}
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Card 2 — Persistent memory (col-span-4) */}
            <AnimatedSection className="md:col-span-4" delay={0.05}>
              <div className="group h-full rounded-2xl border border-border/60 bg-background overflow-hidden hover:border-foreground/20 transition-colors">
                <div className="relative h-56 md:h-64 bg-gradient-to-b from-muted/30 via-background to-background overflow-hidden">
                  <div className="absolute inset-0 px-5 pt-5 space-y-2">
                    {[
                      { time: "2w ago", fact: "Sarah prefers Tuesday demos" },
                      { time: "3w ago", fact: "ACME uses Stripe billing" },
                      { time: "1mo ago", fact: "Q3 churn: 4.2% (Enterprise)" },
                      { time: "2mo ago", fact: "Marcus PTO Dec 15–22" },
                      { time: "3mo ago", fact: "Board likes data-led decks" },
                    ].map((m, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-[11px] leading-snug"
                        style={{ opacity: 1 - idx * 0.18 }}
                      >
                        <span className="font-mono text-muted-foreground/60 flex-shrink-0 w-12">
                          {m.time}
                        </span>
                        <span className="text-foreground/80">{m.fact}</span>
                      </div>
                    ))}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-background" />
                </div>
                <div className="p-7 md:p-8 border-t border-border/60">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground leading-tight">
                    {service.capabilities[1].title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-[1.65]">
                    {service.capabilities[1].description}
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Card 3 — Self-improving skills (col-span-4) */}
            <AnimatedSection className="md:col-span-4" delay={0.1}>
              <div className="group h-full rounded-2xl border border-border/60 bg-background overflow-hidden hover:border-foreground/20 transition-colors">
                <div className="relative h-56 md:h-64 bg-gradient-to-br from-muted/30 to-background overflow-hidden p-5">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                      Skills library
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
                      11
                    </span>
                    <span
                      className="text-xs font-semibold"
                      style={{ color: "#34A853" }}
                    >
                      +7 in 90d
                    </span>
                  </div>
                  <div className="text-[11px] text-muted-foreground font-mono">
                    all built from your workflows
                  </div>
                  {/* Sparkline */}
                  <svg
                    viewBox="0 0 200 80"
                    className="w-full mt-4"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#34A853" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#34A853" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,70 L20,68 L40,62 L60,58 L80,52 L100,48 L120,38 L140,30 L160,22 L180,16 L200,10 L200,80 L0,80 Z"
                      fill="url(#sparkFill)"
                    />
                    <path
                      d="M0,70 L20,68 L40,62 L60,58 L80,52 L100,48 L120,38 L140,30 L160,22 L180,16 L200,10"
                      fill="none"
                      stroke="#34A853"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {[
                      [0, 70],
                      [40, 62],
                      [80, 52],
                      [120, 38],
                      [160, 22],
                      [200, 10],
                    ].map(([x, y], idx) => (
                      <circle
                        key={idx}
                        cx={x}
                        cy={y}
                        r="2"
                        fill="#34A853"
                      />
                    ))}
                  </svg>
                </div>
                <div className="p-7 md:p-8 border-t border-border/60">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground leading-tight">
                    {service.capabilities[2].title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-[1.65]">
                    {service.capabilities[2].description}
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Card 4 — Scheduled automations (col-span-8) */}
            <AnimatedSection className="md:col-span-8" delay={0.15}>
              <div className="group h-full rounded-2xl border border-border/60 bg-background overflow-hidden hover:border-foreground/20 transition-colors">
                <div className="relative h-56 md:h-64 bg-gradient-to-b from-muted/40 to-background overflow-hidden p-5 md:p-6">
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                      Today's schedule
                    </span>
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ backgroundColor: "#007A5A" }}
                      />
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">
                        Running
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    {[
                      { time: "06:00", task: "Inbox triage", tag: "Daily", done: true },
                      { time: "08:30", task: "Standup summary → #leadership", tag: "Daily", done: true },
                      { time: "12:00", task: "Support backlog check", tag: "Hourly", done: true },
                      { time: "17:00", task: "Pipeline update → #sales", tag: "Daily", running: true },
                      { time: "22:00", task: "Slack digest for absent team", tag: "Nightly", queued: true },
                    ].map((j, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 text-xs py-1.5 px-2 rounded hover:bg-muted/30 transition-colors"
                      >
                        <span className="font-mono text-muted-foreground/70 w-12">
                          {j.time}
                        </span>
                        <span
                          className="text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-muted/60 text-muted-foreground w-14 text-center"
                        >
                          {j.tag}
                        </span>
                        <span className="text-foreground/85 truncate flex-1">
                          {j.task}
                        </span>
                        {j.done && (
                          <svg
                            viewBox="0 0 24 24"
                            className="w-3 h-3 flex-shrink-0"
                            fill="none"
                            stroke="#007A5A"
                            strokeWidth="3"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                        {j.running && (
                          <div className="flex gap-0.5 flex-shrink-0">
                            <span className="typing-dot w-1 h-1 rounded-full bg-amber-400 block" />
                            <span className="typing-dot w-1 h-1 rounded-full bg-amber-400 block" />
                            <span className="typing-dot w-1 h-1 rounded-full bg-amber-400 block" />
                          </div>
                        )}
                        {j.queued && (
                          <span className="text-[9px] text-muted-foreground/50 flex-shrink-0">
                            queued
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-7 md:p-8 border-t border-border/60">
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground leading-tight">
                    {service.capabilities[3].title}
                  </h3>
                  <p className="mt-3 text-muted-foreground leading-[1.65]">
                    {service.capabilities[3].description}
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Card 5 — Delegates and parallelizes (col-span-4) */}
            <AnimatedSection className="md:col-span-4" delay={0.2}>
              <div className="group h-full rounded-2xl border border-border/60 bg-background overflow-hidden hover:border-foreground/20 transition-colors">
                <div className="relative h-56 md:h-64 bg-gradient-to-br from-muted/30 to-background overflow-hidden p-5 flex items-center justify-center">
                  <div className="w-full max-w-[220px]">
                    {/* Parent */}
                    <div className="flex justify-center mb-3">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-foreground text-background text-xs font-semibold">
                        <div
                          className="w-1.5 h-1.5 rounded-full animate-pulse"
                          style={{ backgroundColor: "#34D399" }}
                        />
                        Remi
                      </div>
                    </div>
                    {/* Connection lines */}
                    <svg
                      viewBox="0 0 220 30"
                      className="w-full h-6"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M 110 0 L 110 10 L 30 10 L 30 30 M 110 10 L 110 30 M 110 10 L 190 10 L 190 30"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="none"
                        className="text-border"
                      />
                    </svg>
                    {/* Sub-agents */}
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { label: "research A", running: true },
                        { label: "research B", running: true },
                        { label: "research C", running: true },
                      ].map((sub, idx) => (
                        <div
                          key={idx}
                          className="px-1.5 py-1.5 rounded-md border border-border/80 bg-background text-center"
                        >
                          <div className="flex justify-center mb-1">
                            <div className="flex gap-0.5">
                              <span
                                className="typing-dot w-1 h-1 rounded-full block"
                                style={{ backgroundColor: "#34A853", animationDelay: `${idx * 0.1}s` }}
                              />
                              <span
                                className="typing-dot w-1 h-1 rounded-full block"
                                style={{ backgroundColor: "#34A853", animationDelay: `${idx * 0.1 + 0.15}s` }}
                              />
                              <span
                                className="typing-dot w-1 h-1 rounded-full block"
                                style={{ backgroundColor: "#34A853", animationDelay: `${idx * 0.1 + 0.3}s` }}
                              />
                            </div>
                          </div>
                          <div className="text-[9px] text-muted-foreground font-mono">
                            {sub.label}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-mono">
                        3 jobs · parallel · ~6 min
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-7 md:p-8 border-t border-border/60">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground leading-tight">
                    {service.capabilities[4].title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-[1.65]">
                    {service.capabilities[4].description}
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Card 6 — Runs 24/7 on cheap infrastructure (col-span-8) */}
            <AnimatedSection className="md:col-span-8" delay={0.25}>
              <div className="group h-full rounded-2xl border border-border/60 bg-background overflow-hidden hover:border-foreground/20 transition-colors">
                <div className="relative h-56 md:h-64 bg-gradient-to-b from-muted/30 to-background overflow-hidden p-5 md:p-6">
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                      Last 90 days
                    </span>
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ backgroundColor: "#34A853" }}
                      />
                      <span className="text-[10px] uppercase tracking-wider font-mono" style={{ color: "#34A853" }}>
                        Operational
                      </span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
                      99.98%
                    </span>
                    <span className="text-xs text-muted-foreground">
                      uptime
                    </span>
                  </div>
                  {/* Uptime bars */}
                  <div className="mt-5 flex gap-[2px] h-9">
                    {Array.from({ length: 60 }).map((_, idx) => {
                      const dim = idx === 18 || idx === 41;
                      return (
                        <div
                          key={idx}
                          className="flex-1 rounded-[1px]"
                          style={{
                            backgroundColor: dim ? "#FBBF24" : "#34A853",
                            opacity: dim ? 0.6 : 0.85,
                          }}
                        />
                      );
                    })}
                  </div>
                  <div className="mt-3 flex items-baseline justify-between text-[10px] uppercase tracking-wider text-muted-foreground/70 font-mono">
                    <span>60 days ago</span>
                    <span className="text-foreground/70">
                      2<span className="text-muted-foreground/60"> auto-recovered</span>
                    </span>
                    <span>today</span>
                  </div>
                </div>
                <div className="p-7 md:p-8 border-t border-border/60">
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground leading-tight">
                    {service.capabilities[5].title}
                  </h3>
                  <p className="mt-3 text-muted-foreground leading-[1.65]">
                    {service.capabilities[5].description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        ) : service.slug === "voice-ai" ? (
          <div className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
            {/* Card 1 — Inbound call handling (col-span-8) */}
            <AnimatedSection className="md:col-span-8">
              <div className="group h-full rounded-2xl border border-border/60 bg-background overflow-hidden hover:border-foreground/20 transition-colors">
                <div className="relative h-56 md:h-64 bg-gradient-to-br from-emerald-500/[0.04] via-background to-background overflow-hidden p-5 md:p-6">
                  {/* Incoming call card */}
                  <div className="max-w-md mx-auto">
                    <div className="rounded-xl border border-border/80 bg-card shadow-lg shadow-black/[0.04] overflow-hidden">
                      <div className="px-4 py-3 border-b border-border/60 flex items-center justify-between bg-muted/30">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-1.5 h-1.5 rounded-full animate-pulse"
                            style={{ backgroundColor: "#34A853" }}
                          />
                          <span className="text-[10px] uppercase tracking-wider font-semibold text-foreground/80">
                            Incoming call
                          </span>
                        </div>
                        <span className="text-[10px] text-muted-foreground font-mono">
                          0.4s answered
                        </span>
                      </div>
                      <div className="p-4 flex items-center gap-4">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-foreground/[0.08] to-foreground/[0.18] flex items-center justify-center text-sm font-semibold text-foreground/70 flex-shrink-0">
                          MK
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-foreground text-[13px]">
                            (415) 555-2103
                          </div>
                          <div className="text-[11px] text-muted-foreground mt-0.5">
                            San Francisco · No prior record
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span
                            className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full text-white"
                            style={{ backgroundColor: "#34A853" }}
                          >
                            Atlas
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Routing arrow */}
                    <div className="flex items-center gap-2 justify-center my-3 text-muted-foreground/60">
                      <div className="h-px w-12 bg-border" />
                      <span className="text-[10px] uppercase tracking-wider font-mono">
                        qualified · routed
                      </span>
                      <div className="h-px w-12 bg-border" />
                    </div>
                    {/* Outcome chip */}
                    <div className="flex justify-center">
                      <div
                        className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-xs bg-card"
                        style={{
                          borderColor: "rgba(52, 168, 83, 0.3)",
                        }}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="#34A853"
                          strokeWidth="3"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span className="text-foreground/85 font-medium">
                          Hot lead → Sarah (Sales)
                        </span>
                        <span className="text-muted-foreground/60 font-mono">
                          Slack alert sent
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-7 md:p-8 border-t border-border/60">
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground leading-tight">
                    {service.capabilities[0].title}
                  </h3>
                  <p className="mt-3 text-muted-foreground leading-[1.65]">
                    {service.capabilities[0].description}
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Card 2 — Outbound at scale (col-span-4) */}
            <AnimatedSection className="md:col-span-4" delay={0.05}>
              <div className="group h-full rounded-2xl border border-border/60 bg-background overflow-hidden hover:border-foreground/20 transition-colors">
                <div className="relative h-56 md:h-64 bg-gradient-to-b from-muted/30 to-background overflow-hidden p-5">
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-3">
                    Today&apos;s outbound
                  </div>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
                      247
                    </span>
                    <span className="text-xs text-muted-foreground">
                      calls
                    </span>
                    <span
                      className="text-xs font-semibold ml-auto"
                      style={{ color: "#34A853" }}
                    >
                      ↑ 38%
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {[
                      { name: "Sarah Chen", status: "done", label: "Booked demo" },
                      { name: "Tom Bryant", status: "done", label: "Voicemail" },
                      { name: "Alex Park", status: "active", label: "Dialing" },
                      { name: "Riya Patel", status: "queued", label: "Queued" },
                    ].map((c, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-2 text-[11px] py-1.5"
                      >
                        <span className="text-foreground/85 truncate">
                          {c.name}
                        </span>
                        <span className="flex items-center gap-1.5 flex-shrink-0">
                          {c.status === "done" && (
                            <svg
                              viewBox="0 0 24 24"
                              className="w-2.5 h-2.5"
                              fill="none"
                              stroke="#34A853"
                              strokeWidth="3"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                          {c.status === "active" && (
                            <div className="flex gap-0.5">
                              <span className="typing-dot w-1 h-1 rounded-full bg-amber-400 block" />
                              <span className="typing-dot w-1 h-1 rounded-full bg-amber-400 block" />
                              <span className="typing-dot w-1 h-1 rounded-full bg-amber-400 block" />
                            </div>
                          )}
                          <span className="text-muted-foreground/70 font-mono">
                            {c.label}
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-7 md:p-8 border-t border-border/60">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground leading-tight">
                    {service.capabilities[1].title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-[1.65]">
                    {service.capabilities[1].description}
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Card 3 — Calendar booking (col-span-4) */}
            <AnimatedSection className="md:col-span-4" delay={0.1}>
              <div className="group h-full rounded-2xl border border-border/60 bg-background overflow-hidden hover:border-foreground/20 transition-colors">
                <div className="relative h-56 md:h-64 bg-gradient-to-br from-muted/30 to-background overflow-hidden p-5">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                      Tuesday · Mar 19
                    </span>
                    <span className="text-[10px] text-muted-foreground/70 font-mono">
                      Dr. Chen
                    </span>
                  </div>
                  <div className="space-y-1">
                    {[
                      { time: "9:00", state: "booked", label: "Smith, J." },
                      { time: "10:00", state: "open", label: null },
                      { time: "11:00", state: "booked", label: "Garcia, M." },
                      { time: "12:00", state: "blocked", label: "Lunch" },
                      { time: "1:00", state: "open", label: null },
                      { time: "2:00", state: "new", label: "Hayes, J." },
                      { time: "3:00", state: "open", label: null },
                    ].map((slot, idx) => {
                      let bg = "bg-muted/30";
                      let border = "border-border/60";
                      let textColor = "text-muted-foreground/70";
                      if (slot.state === "booked") {
                        bg = "bg-muted/60";
                        textColor = "text-foreground/70";
                      } else if (slot.state === "blocked") {
                        bg = "bg-muted/20";
                        textColor = "text-muted-foreground/50";
                      } else if (slot.state === "new") {
                        bg = "bg-emerald-500/10";
                        border = "border-emerald-500/40";
                        textColor = "text-foreground";
                      }
                      return (
                        <div
                          key={idx}
                          className={`flex items-center gap-2.5 text-[11px] py-1 px-2 rounded border ${bg} ${border} ${
                            slot.state === "new"
                              ? "shadow-sm shadow-emerald-500/10"
                              : ""
                          }`}
                        >
                          <span className="font-mono text-muted-foreground/70 w-9 flex-shrink-0">
                            {slot.time}
                          </span>
                          <span
                            className={`flex-1 truncate ${textColor} ${
                              slot.state === "new" ? "font-semibold" : ""
                            }`}
                          >
                            {slot.label || (
                              <span className="text-muted-foreground/30">
                                available
                              </span>
                            )}
                          </span>
                          {slot.state === "new" && (
                            <span
                              className="text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded text-white"
                              style={{ backgroundColor: "#34A853" }}
                            >
                              New
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="p-7 md:p-8 border-t border-border/60">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground leading-tight">
                    {service.capabilities[2].title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-[1.65]">
                    {service.capabilities[2].description}
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Card 4 — CRM integration (col-span-8) */}
            <AnimatedSection className="md:col-span-8" delay={0.15}>
              <div className="group h-full rounded-2xl border border-border/60 bg-background overflow-hidden hover:border-foreground/20 transition-colors">
                <div className="relative h-56 md:h-64 bg-gradient-to-b from-muted/30 to-background overflow-hidden p-5 md:p-6">
                  <div className="rounded-xl border border-border/80 bg-card overflow-hidden shadow-sm">
                    {/* CRM Header */}
                    <div className="px-4 py-2.5 border-b border-border/60 flex items-center justify-between bg-muted/20">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-sm"
                          style={{
                            backgroundColor: "#FF7A59",
                            WebkitMaskImage: `url(https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/hubspot.svg)`,
                            maskImage: `url(https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/hubspot.svg)`,
                            WebkitMaskSize: "contain",
                            maskSize: "contain",
                            WebkitMaskRepeat: "no-repeat",
                            maskRepeat: "no-repeat",
                          }}
                        />
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-foreground/80">
                          Hubspot · Contact created
                        </span>
                      </div>
                      <span className="text-[10px] text-muted-foreground/70 font-mono">
                        2 sec ago
                      </span>
                    </div>
                    <div className="p-4 grid grid-cols-12 gap-4">
                      <div className="col-span-12 md:col-span-5">
                        <div className="font-semibold text-foreground text-[14px]">
                          Jordan Hayes
                        </div>
                        <div className="text-[11px] text-muted-foreground mt-0.5 font-mono">
                          (415) 555-9876
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <span className="text-[9px] uppercase tracking-wider text-muted-foreground/70 font-mono">
                            Status
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] line-through text-muted-foreground/50">
                              New
                            </span>
                            <ArrowRight className="w-2.5 h-2.5 text-muted-foreground/50" />
                            <span
                              className="text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded text-white"
                              style={{ backgroundColor: "#34A853" }}
                            >
                              Qualified
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-7 md:border-l border-border/60 md:pl-4 space-y-1.5">
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-semibold mb-1">
                          Call summary
                        </div>
                        <div className="text-[11px] text-foreground/80 leading-relaxed">
                          Booked Mar 19 · 2pm with Dr. Chen. New patient,
                          interested in cosmetic consult.
                        </div>
                        <div className="flex items-center gap-3 pt-2 text-[10px]">
                          <span className="font-mono text-muted-foreground/70">
                            Sentiment: <span className="text-foreground/80">Positive</span>
                          </span>
                          <span className="font-mono text-muted-foreground/70">
                            Duration: <span className="text-foreground/80">1:47</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-7 md:p-8 border-t border-border/60">
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground leading-tight">
                    {service.capabilities[3].title}
                  </h3>
                  <p className="mt-3 text-muted-foreground leading-[1.65]">
                    {service.capabilities[3].description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        ) : service.slug === "ai-apps" ? (
          <div className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
            {/* Card 1 — AI-native MVPs (col-span-8) */}
            <AnimatedSection className="md:col-span-8">
              <div className="group h-full rounded-2xl border border-border/60 bg-background overflow-hidden hover:border-foreground/20 transition-colors">
                <div className="relative h-56 md:h-64 bg-gradient-to-br from-blue-500/[0.04] to-background overflow-hidden p-5 md:p-6">
                  <div className="flex items-baseline justify-between mb-5">
                    <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                      MVP Roadmap · Project Atlas
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground/70">
                      Week 4 of 8
                    </span>
                  </div>
                  {/* Sprint timeline */}
                  <div className="space-y-2">
                    {[
                      { week: "W1–2", phase: "Scope & design", state: "done" },
                      { week: "W3", phase: "Auth + database", state: "done" },
                      { week: "W4", phase: "AI integration + core flows", state: "active" },
                      { week: "W5–6", phase: "Build the spine", state: "queued" },
                      { week: "W7", phase: "Polish & edge cases", state: "queued" },
                      { week: "W8", phase: "Launch + iterate", state: "queued" },
                    ].map((s, idx) => {
                      const done = s.state === "done";
                      const active = s.state === "active";
                      return (
                        <div key={idx} className="flex items-center gap-3 text-[12px] py-1">
                          <div className="w-12 font-mono text-muted-foreground/70 text-[11px]">
                            {s.week}
                          </div>
                          <div className="flex-1 h-1.5 rounded-full bg-muted/60 overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: done ? "100%" : active ? "60%" : "0%",
                                background: done
                                  ? "linear-gradient(90deg, #6366F1, #3B82F6)"
                                  : active
                                  ? "linear-gradient(90deg, #6366F1, #818CF8)"
                                  : "transparent",
                              }}
                            />
                          </div>
                          <div
                            className={`flex-1 text-[11px] ${
                              done
                                ? "text-muted-foreground"
                                : active
                                ? "text-foreground font-medium"
                                : "text-muted-foreground/50"
                            }`}
                          >
                            {s.phase}
                          </div>
                          {done && (
                            <svg
                              viewBox="0 0 24 24"
                              className="w-3 h-3 flex-shrink-0"
                              fill="none"
                              stroke="#6366F1"
                              strokeWidth="3"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                          {active && (
                            <div className="flex gap-0.5 flex-shrink-0">
                              <span className="typing-dot w-1 h-1 rounded-full bg-indigo-500 block" />
                              <span className="typing-dot w-1 h-1 rounded-full bg-indigo-500 block" />
                              <span className="typing-dot w-1 h-1 rounded-full bg-indigo-500 block" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="p-7 md:p-8 border-t border-border/60">
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground leading-tight">
                    {service.capabilities[0].title}
                  </h3>
                  <p className="mt-3 text-muted-foreground leading-[1.65]">
                    {service.capabilities[0].description}
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Card 2 — Internal tools (col-span-4) */}
            <AnimatedSection className="md:col-span-4" delay={0.05}>
              <div className="group h-full rounded-2xl border border-border/60 bg-background overflow-hidden hover:border-foreground/20 transition-colors">
                <div className="relative h-56 md:h-64 bg-gradient-to-b from-blue-500/[0.04] to-background overflow-hidden p-5">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-semibold mb-3">
                    Lead Scoring Tool
                  </div>
                  <div className="space-y-2">
                    {[
                      { name: "ACME Corp", score: 92, color: "#34A853" },
                      { name: "Globex Inc", score: 78, color: "#34A853" },
                      { name: "Initech LLC", score: 64, color: "#FBBF24" },
                      { name: "Hooli", score: 42, color: "#FBBF24" },
                      { name: "Pied Piper", score: 24, color: "#EF4444" },
                    ].map((row, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 text-[11px]"
                      >
                        <span className="w-20 text-foreground/85 truncate">
                          {row.name}
                        </span>
                        <div className="flex-1 h-1 rounded-full bg-muted/60 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${row.score}%`,
                              backgroundColor: row.color,
                            }}
                          />
                        </div>
                        <span className="w-7 text-right font-mono text-foreground/70">
                          {row.score}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-border/60 text-[10px] uppercase tracking-wider text-muted-foreground/70 font-mono">
                    AI-scored from 12 signals
                  </div>
                </div>
                <div className="p-7 md:p-8 border-t border-border/60">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground leading-tight">
                    {service.capabilities[1].title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-[1.65]">
                    {service.capabilities[1].description}
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Card 3 — RAG and knowledge systems (col-span-4) */}
            <AnimatedSection className="md:col-span-4" delay={0.1}>
              <div className="group h-full rounded-2xl border border-border/60 bg-background overflow-hidden hover:border-foreground/20 transition-colors">
                <div className="relative h-56 md:h-64 bg-gradient-to-br from-blue-500/[0.04] to-background overflow-hidden p-5">
                  <div className="rounded-md border border-border/60 bg-background flex items-center px-3 py-2 mb-4">
                    <svg className="w-3 h-3 text-muted-foreground/60 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                    <span className="text-[11px] text-foreground/80">
                      What&apos;s our return policy?
                    </span>
                    <span className="ml-auto text-[10px] font-mono text-muted-foreground/70">
                      ⌘K
                    </span>
                  </div>
                  <p className="text-[12px] text-foreground/85 leading-relaxed mb-3">
                    Customers can return any item within 30 days for a full
                    refund, no questions asked.
                  </p>
                  <div className="space-y-1">
                    {[
                      { src: "support-handbook.pdf", page: "p.12" },
                      { src: "returns-policy.md", page: "" },
                      { src: "ceo-memo-2024.docx", page: "p.4" },
                    ].map((c, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-[10px] py-1"
                      >
                        <span className="text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                          {idx + 1}
                        </span>
                        <span className="font-mono text-muted-foreground/80 truncate flex-1">
                          {c.src}
                        </span>
                        {c.page && (
                          <span className="text-muted-foreground/60 font-mono">
                            {c.page}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-7 md:p-8 border-t border-border/60">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground leading-tight">
                    {service.capabilities[2].title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-[1.65]">
                    {service.capabilities[2].description}
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Card 4 — Polished UX (col-span-8) */}
            <AnimatedSection className="md:col-span-8" delay={0.15}>
              <div className="group h-full rounded-2xl border border-border/60 bg-background overflow-hidden hover:border-foreground/20 transition-colors">
                <div className="relative h-56 md:h-64 bg-gradient-to-br from-muted/30 to-background overflow-hidden p-5 md:p-6">
                  <div className="grid grid-cols-12 gap-4 h-full">
                    <div className="col-span-5 flex flex-col">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-semibold mb-3">
                        Design tokens
                      </div>
                      <div className="space-y-2">
                        {[
                          { label: "Primary", color: "#6366F1" },
                          { label: "Accent", color: "#0EA5E9" },
                          { label: "Success", color: "#34A853" },
                          { label: "Surface", color: "#F8FAFC", border: true },
                          { label: "Foreground", color: "#0F172A" },
                        ].map((t, idx) => (
                          <div key={idx} className="flex items-center gap-2.5">
                            <div
                              className="w-5 h-5 rounded shadow-sm"
                              style={{
                                backgroundColor: t.color,
                                border: t.border ? "1px solid #e2e8f0" : undefined,
                              }}
                            />
                            <span className="text-[11px] text-foreground/80 flex-1">
                              {t.label}
                            </span>
                            <span className="text-[10px] font-mono text-muted-foreground/60">
                              {t.color}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-span-7 border-l border-border/60 pl-5 flex flex-col">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-semibold mb-3">
                        Live preview
                      </div>
                      {/* Mini component preview */}
                      <div className="rounded-lg border border-border/60 bg-card p-4 shadow-sm">
                        <div className="text-[11px] uppercase tracking-wider text-muted-foreground/70 font-bold mb-1.5">
                          New customers
                        </div>
                        <div className="text-2xl font-bold text-foreground mb-2">
                          1,284
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px]">
                          <span style={{ color: "#34A853" }}>↑ 23%</span>
                          <span className="text-muted-foreground">vs last week</span>
                        </div>
                        <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] uppercase tracking-wider font-bold text-white" style={{ backgroundColor: "#6366F1" }}>
                          View report
                        </div>
                      </div>
                      <div className="mt-3 text-[10px] text-muted-foreground/70 font-mono">
                        DM-sans · 14/24 · 1.5 line-height
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-7 md:p-8 border-t border-border/60">
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground leading-tight">
                    {service.capabilities[3].title}
                  </h3>
                  <p className="mt-3 text-muted-foreground leading-[1.65]">
                    {service.capabilities[3].description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        ) : service.slug === "creative-studio" ? (
          <div className="mt-20 md:mt-28 space-y-24 md:space-y-36">
            {CONTENT_BREAKDOWN.map((item, i) => {
              const mediaRight = i % 2 === 1;
              return (
                <AnimatedSection key={item.lead}>
                  <div className="grid grid-cols-12 gap-x-0 gap-y-8 md:gap-14 items-center">
                    {/* Media */}
                    <div
                      className={`col-span-12 md:col-span-5 ${
                        mediaRight ? "md:order-2" : "md:order-1"
                      }`}
                    >
                      <div className="max-w-[340px] mx-auto">
                        <div className="relative rounded-2xl overflow-hidden border border-border/70 shadow-2xl shadow-black/[0.12] bg-muted/30">
                          {item.media.type === "video" ? (
                            <video
                              src={item.media.src}
                              poster={item.media.poster}
                              autoPlay
                              loop
                              muted
                              playsInline
                              preload="metadata"
                              className="w-full h-auto block"
                            />
                          ) : (
                            <div
                              className="relative w-full"
                              style={{ aspectRatio: item.media.ratio }}
                            >
                              <Image
                                src={item.media.src}
                                alt={`${item.lead} ${item.emphasis} example`}
                                fill
                                sizes="340px"
                                className="object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Copy */}
                    <div
                      className={`col-span-12 md:col-span-7 ${
                        mediaRight ? "md:order-1" : "md:order-2"
                      }`}
                    >
                      <h3 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.0]">
                        {item.lead}{" "}
                        <span className="text-em">
                          {item.emphasis}
                        </span>
                      </h3>
                      <p className="mt-5 text-base md:text-lg text-muted-foreground leading-[1.6] max-w-xl">
                        {item.whatItIs}
                      </p>
                      <div className="mt-8 border-t border-border/60">
                        {item.fits.map((fit) => (
                          <div
                            key={fit}
                            className="flex items-baseline gap-3 py-3.5 border-b border-border/60"
                          >
                            <span className="text-base text-accent/55 flex-shrink-0">
                              When
                            </span>
                            <span className="text-[15px] text-foreground/85 leading-relaxed">
                              {fit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        ) : service.slug === "ai-training" ? (
          <div className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
            {/* Card 1 — Executive AI literacy (col-span-8) */}
            <AnimatedSection className="md:col-span-8">
              <div className="group h-full rounded-2xl border border-border/60 bg-background overflow-hidden hover:border-foreground/20 transition-colors">
                <div className="relative h-56 md:h-64 bg-gradient-to-br from-teal-700/[0.04] to-background overflow-hidden p-5 md:p-6">
                  <div className="rounded-lg border border-border/60 bg-card p-5 h-full overflow-hidden">
                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70 font-semibold">
                          Executive briefing
                        </div>
                        <div className="font-bold text-foreground text-[14px] mt-1">
                          AI for the C-Suite · Half-day
                        </div>
                      </div>
                      <div
                        className="text-[9px] uppercase tracking-wider font-bold px-2 py-1 rounded text-white"
                        style={{ backgroundColor: "#0F766E" }}
                      >
                        4 hours
                      </div>
                    </div>
                    <div className="space-y-2">
                      {[
                        { time: "9:00", topic: "The actual state of AI in 2026" },
                        { time: "10:00", topic: "What's real vs what's hype" },
                        { time: "11:30", topic: "Where AI fits in YOUR org" },
                        { time: "1:00", topic: "Investment frameworks & risk" },
                        { time: "2:30", topic: "Questions to ask your team" },
                      ].map((row, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 py-1 border-b border-border/40 last:border-b-0"
                        >
                          <span className="text-[11px] font-mono text-muted-foreground/70 w-10">
                            {row.time}
                          </span>
                          <span className="text-[11px] text-foreground/85">
                            {row.topic}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-7 md:p-8 border-t border-border/60">
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground leading-tight">
                    {service.capabilities[0].title}
                  </h3>
                  <p className="mt-3 text-muted-foreground leading-[1.65]">
                    {service.capabilities[0].description}
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Card 2 — Hands-on workshops (col-span-4) */}
            <AnimatedSection className="md:col-span-4" delay={0.05}>
              <div className="group h-full rounded-2xl border border-border/60 bg-background overflow-hidden hover:border-foreground/20 transition-colors">
                <div className="relative h-56 md:h-64 bg-gradient-to-b from-teal-700/[0.04] to-background overflow-hidden p-5">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-semibold mb-3">
                    Next session
                  </div>
                  <div className="text-base font-bold text-foreground mb-1">
                    Cursor for designers
                  </div>
                  <div className="text-[11px] text-muted-foreground font-mono mb-4">
                    Mar 19 · 10:00 – 12:30 PT
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-semibold mb-2">
                    Attendees · 12
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {["JF", "MK", "SC", "RP", "TB", "AL", "JK", "VR", "MN", "DH", "LE", "PS"].map((init, idx) => (
                      <div
                        key={idx}
                        className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-700/20 to-teal-700/10 flex items-center justify-center text-[9px] font-bold text-foreground/70 border border-border/60"
                      >
                        {init}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-border/60 flex items-center gap-2 text-[10px]">
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#0F766E" }} />
                    <span className="text-foreground/70 font-mono uppercase tracking-wider font-semibold">
                      Live + recorded
                    </span>
                  </div>
                </div>
                <div className="p-7 md:p-8 border-t border-border/60">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground leading-tight">
                    {service.capabilities[1].title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-[1.65]">
                    {service.capabilities[1].description}
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Card 3 — Role-specific (col-span-4) */}
            <AnimatedSection className="md:col-span-4" delay={0.1}>
              <div className="group h-full rounded-2xl border border-border/60 bg-background overflow-hidden hover:border-foreground/20 transition-colors">
                <div className="relative h-56 md:h-64 bg-gradient-to-br from-teal-700/[0.04] to-background overflow-hidden p-5">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-semibold mb-3">
                    Tracks · this engagement
                  </div>
                  <div className="space-y-3">
                    {[
                      { role: "Designers", progress: 72, count: 8 },
                      { role: "Engineers", progress: 58, count: 11 },
                      { role: "Marketing", progress: 90, count: 5 },
                      { role: "Ops", progress: 34, count: 4 },
                    ].map((t, idx) => (
                      <div key={idx}>
                        <div className="flex items-baseline justify-between mb-1.5 text-[11px]">
                          <span className="text-foreground font-medium">
                            {t.role}
                          </span>
                          <span className="text-muted-foreground/70 font-mono">
                            {t.count} · {t.progress}%
                          </span>
                        </div>
                        <div className="h-1 rounded-full bg-muted/60 overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${t.progress}%`,
                              background:
                                "linear-gradient(90deg, #0F766E, #14B8A6)",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-7 md:p-8 border-t border-border/60">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground leading-tight">
                    {service.capabilities[2].title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-[1.65]">
                    {service.capabilities[2].description}
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Card 4 — Fractional CAIO (col-span-8) */}
            <AnimatedSection className="md:col-span-8" delay={0.15}>
              <div className="group h-full rounded-2xl border border-border/60 bg-background overflow-hidden hover:border-foreground/20 transition-colors">
                <div className="relative h-56 md:h-64 bg-gradient-to-b from-teal-700/[0.04] to-background overflow-hidden p-5 md:p-6">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-semibold">
                        Office hours · March
                      </div>
                      <div className="text-[14px] font-bold text-foreground mt-1">
                        Joshua Francis · Fractional CAIO
                      </div>
                    </div>
                    <div
                      className="text-[9px] uppercase tracking-wider font-bold px-2 py-1 rounded text-white"
                      style={{ backgroundColor: "#0F766E" }}
                    >
                      Ongoing
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      { date: "Mar 04", topic: "Tool stack review", state: "done" },
                      { date: "Mar 11", topic: "Async Q&A · Slack", state: "done" },
                      { date: "Mar 18", topic: "1:1 with Eng Lead", state: "active" },
                      { date: "Mar 25", topic: "Quarterly retro", state: "queued" },
                    ].map((c, idx) => {
                      const done = c.state === "done";
                      const active = c.state === "active";
                      return (
                        <div
                          key={idx}
                          className={`rounded-md border p-3 ${
                            active
                              ? "border-teal-700/40 bg-teal-700/[0.04]"
                              : done
                              ? "border-border/40 bg-muted/30"
                              : "border-border/40 bg-background"
                          }`}
                        >
                          <div className="text-[10px] font-mono text-muted-foreground/70 mb-1">
                            {c.date}
                          </div>
                          <div className={`text-[11px] leading-snug ${done ? "text-muted-foreground" : active ? "font-semibold text-foreground" : "text-foreground/70"}`}>
                            {c.topic}
                          </div>
                          {done && (
                            <svg viewBox="0 0 24 24" className="w-3 h-3 mt-2" fill="none" stroke="#0F766E" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                          {active && (
                            <div className="mt-2 flex gap-0.5">
                              <span className="typing-dot w-1 h-1 rounded-full bg-teal-700 block" />
                              <span className="typing-dot w-1 h-1 rounded-full bg-teal-700 block" />
                              <span className="typing-dot w-1 h-1 rounded-full bg-teal-700 block" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-[10px] uppercase tracking-wider text-muted-foreground/70 font-mono">
                    <span>+ async Slack · all month</span>
                    <span>Next: Mar 18 · 2pm</span>
                  </div>
                </div>
                <div className="p-7 md:p-8 border-t border-border/60">
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground leading-tight">
                    {service.capabilities[3].title}
                  </h3>
                  <p className="mt-3 text-muted-foreground leading-[1.65]">
                    {service.capabilities[3].description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        ) : (
          // Fallback for other services — plain 2-col grid
          <div className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-2 gap-px bg-border/60 border border-border/60 rounded-2xl overflow-hidden">
            {service.capabilities.map((cap, i) => (
              <AnimatedSection key={cap.title} delay={i * 0.04}>
                <div className="bg-background p-8 md:p-10 h-full relative group hover:bg-muted/30 transition-colors">
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground leading-tight">
                    {cap.title}
                  </h3>
                  <p className="mt-4 text-muted-foreground leading-[1.65]">
                    {cap.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        )}
      </Section>

      {/* ─── How it works (creative-studio) ───────────────────────── */}
      {service.slug === "creative-studio" && (
        <Section className="py-28 md:py-40 border-t border-border/60">
          <AnimatedSection>
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[0.98] max-w-4xl">
              How it{" "}
              <span className="text-em">works.</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
              A simple monthly rhythm. You stay in approval, the studio handles
              everything else.
            </p>
          </AnimatedSection>

          <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-4 gap-px bg-border/60 border border-border/60 rounded-2xl overflow-hidden">
            {service.processSteps.map((step, i) => (
              <AnimatedSection key={step.title} delay={i * 0.06}>
                <div className="bg-background p-8 md:p-9 h-full">
                  <div
                    className="text-4xl md:text-5xl leading-none"
                    style={{ color: "#D97706" }}
                  >
                    {num(i + 1)}
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-foreground leading-tight">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-[1.65]">
                    {step.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </Section>
      )}

      {/* ─── What you'd hand it (ai-agent use cases) ──────── */}
      {service.slug === "ai-agent" && (
        <Section className="py-28 md:py-40 border-t border-border/60">
          <AnimatedSection>
            <div className="max-w-3xl">
              <h2 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[0.98]">
                What you&apos;d actually{" "}
                <span className="text-em">hand it.</span>
              </h2>
              <p className="mt-8 text-lg md:text-xl text-muted-foreground leading-[1.55] max-w-2xl">
                Most people underestimate how much of their week repeats. This
                is the kind of work an AI agent quietly takes off your plate.
                Start with one, add more as you go.
              </p>
            </div>
          </AnimatedSection>

          <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {[
              {
                tag: "Inbox",
                title: "Triage the overnight inbox",
                desc: "Sorts every new email, drafts the replies that need sending, and flags anything urgent before you are even at your desk.",
              },
              {
                tag: "Scheduling",
                title: "Run your calendar",
                desc: "Books, reschedules, and protects focus time, negotiating over email so you never trade six messages to find a slot.",
              },
              {
                tag: "Follow-ups",
                title: "Chase every open loop",
                desc: "Tracks who owes you a reply and who you owe one, then sends the nudge on your cadence so nothing goes cold.",
              },
              {
                tag: "Sales",
                title: "Qualify and route new leads",
                desc: "Enriches every inbound lead, scores it against your criteria, and logs it with a recommended next step.",
              },
              {
                tag: "Reporting",
                title: "Build the weekly report",
                desc: "Pulls the numbers from your tools every Monday, writes the summary in your format, and posts it to the channel.",
              },
              {
                tag: "Research",
                title: "Brief you before every meeting",
                desc: "Pulls the company, the people, and the recent history into a one-page brief that lands an hour before the call.",
              },
              {
                tag: "Meetings",
                title: "Turn calls into action",
                desc: "Reads the notes from every meeting, pulls out the decisions and owners, and creates the tasks that follow.",
              },
              {
                tag: "Clients",
                title: "Keep clients in the loop",
                desc: "Drafts the status update each client expects, in your voice, ready for you to skim and send.",
              },
              {
                tag: "Documents",
                title: "Draft the repetitive paperwork",
                desc: "Generates the proposals, contracts, and letters your business sends constantly, filled from your templates and data.",
              },
              {
                tag: "Back office",
                title: "Close the loop on invoices",
                desc: "Watches for unpaid invoices, sends the polite reminder, and tells you when something needs a real conversation.",
              },
              {
                tag: "Monitoring",
                title: "Watch what you forget to",
                desc: "Keeps an eye on the metric, the deadline, or the mailbox you care about, and pings you only when it actually needs you.",
              },
              {
                tag: "Onboarding",
                title: "Run new-client onboarding",
                desc: "Walks every new client through your intake steps, collects what you need, and hands you a clean, complete file.",
              },
            ].map((u, i) => (
              <AnimatedSection key={u.title} delay={(i % 3) * 0.05}>
                <div className="group h-full rounded-xl border border-border/60 bg-background p-6 md:p-7 hover:border-foreground/20 transition-colors">
                  <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-accent">
                    {u.tag}
                  </span>
                  <h3 className="mt-3 text-base md:text-lg font-semibold text-foreground leading-snug">
                    {u.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-muted-foreground leading-[1.6]">
                    {u.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.1}>
            <p className="mt-12 text-sm text-muted-foreground/80 leading-relaxed max-w-xl">
              None of these are the limit. If it lives in your tools and follows
              a pattern, it can become a skill. We start with the one or two
              that pay off fastest, then build from there.
            </p>
          </AnimatedSection>
        </Section>
      )}

      {/* ─── Who it's for (non-Creative-Studio placement) ─────── */}
      {service.slug !== "creative-studio" && whoItsFor}

      {/* ─── Engagement / Pricing ─────────────────────────────── */}
      {service.slug === "creative-studio" ? (
        <Section className="py-28 md:py-40 border-t border-border/60">
          <AnimatedSection>
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[0.98] max-w-4xl">
              {service.sectionHeadings.pricing.lead}{" "}
              <span className="text-em">
                {service.sectionHeadings.pricing.em}
              </span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
              Two ways to work with the studio. Both are monthly retainers
              with a 3-month minimum.
            </p>
          </AnimatedSection>

          <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {/* Studio tier */}
            <AnimatedSection>
              <div className="relative h-full rounded-2xl border-2 border-foreground bg-card p-8 md:p-10 flex flex-col">
                <div className="absolute -top-3 left-8">
                  <span className="text-[10px] uppercase tracking-[0.18em] font-bold px-3 py-1 rounded-full bg-foreground text-background">
                    Most popular
                  </span>
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                  Studio
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-2xl text-muted-foreground">
                    From
                  </span>
                  <span className="text-5xl md:text-6xl font-semibold tracking-tight text-foreground leading-none">
                    $4k
                  </span>
                  <span className="text-lg font-medium text-muted-foreground leading-none">
                    /mo
                  </span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  For brands that need a steady, reliable creative pipeline.
                </p>
                <ul className="mt-7 pt-7 border-t border-border/60 space-y-3.5 flex-1">
                  {[
                    "A steady pipeline of 15 to 25 creatives a month",
                    "Video, static, and AI avatar formats",
                    "Brand and voice calibration",
                    "Concepting and scripting on every piece",
                    "Multiple variants per concept for testing",
                    "Every piece routed to you for approval",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-[15px] text-foreground/85 leading-snug">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={contactHref}
                  className="mt-8 inline-flex items-center justify-center gap-2 w-full rounded-full bg-foreground text-background text-sm font-semibold py-3.5 hover:opacity-90 transition-opacity"
                >
                  Book an intro call
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </AnimatedSection>

            {/* Scale tier */}
            <AnimatedSection delay={0.08}>
              <div className="h-full rounded-2xl border border-border/70 bg-card p-8 md:p-10 flex flex-col">
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                  Scale
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-2xl text-muted-foreground">
                    From
                  </span>
                  <span className="text-5xl md:text-6xl font-semibold tracking-tight text-foreground leading-none">
                    $9k
                  </span>
                  <span className="text-lg font-medium text-muted-foreground leading-none">
                    /mo
                  </span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  For high-output brands feeding an always-on ad machine.
                </p>
                <ul className="mt-7 pt-7 border-t border-border/60 space-y-3.5 flex-1">
                  {[
                    "A high-volume pipeline, 40+ creatives a month",
                    "Everything in Studio",
                    "Priority turnaround",
                    "Dedicated creative direction",
                    "Weekly performance review and iteration",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-[15px] text-foreground/85 leading-snug">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={contactHref}
                  className="mt-8 inline-flex items-center justify-center gap-2 w-full rounded-full border border-foreground/30 text-foreground text-sm font-semibold py-3.5 hover:border-foreground transition-colors"
                >
                  Book an intro call
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </Section>
      ) : (
        <Section className="py-28 md:py-40 border-t border-border/60">
          <AnimatedSection>
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[0.98] max-w-4xl">
              {service.sectionHeadings.pricing.lead}{" "}
              <span className="text-em">
                {service.sectionHeadings.pricing.em}
              </span>
            </h2>
          </AnimatedSection>

          <AnimatedSection className="mt-16 md:mt-20" delay={0.1}>
            <div className="max-w-lg mx-auto rounded-2xl border-2 border-foreground bg-card p-8 md:p-10 flex flex-col">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                Monthly retainer
              </div>
              {(() => {
                const raw = service.pricingFrom.replace(/^From\s*/i, "");
                const match = raw.match(/^(\S+?)((?:\s*\/|\s+per\s+).*)?$/);
                const number = match?.[1] ?? raw;
                const unit = (match?.[2] ?? "").trim();
                return (
                  <div className="mt-4 flex items-baseline gap-2 flex-wrap">
                    <span className="text-2xl text-muted-foreground">From</span>
                    <span className="text-5xl md:text-6xl font-semibold tracking-tight text-foreground leading-none">
                      {number}
                    </span>
                    {unit && (
                      <span className="text-lg font-medium text-muted-foreground leading-none">
                        {unit.startsWith("/") ? unit : ` ${unit}`}
                      </span>
                    )}
                  </div>
                );
              })()}
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                {service.pricingNote}
              </p>
              <ul className="mt-7 pt-7 border-t border-border/60 space-y-3.5 flex-1">
                {service.retainerIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-[15px] text-foreground/85 leading-snug">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href={contactHref}
                className="mt-8 inline-flex items-center justify-center gap-2 w-full rounded-full bg-foreground text-background text-sm font-semibold py-3.5 hover:opacity-90 transition-opacity"
              >
                Begin a conversation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <p className="mt-8 text-xs text-muted-foreground/70 leading-relaxed text-center">
              {service.typicalEngagement}
            </p>
          </AnimatedSection>
        </Section>
      )}

      {/* ─── Founding spots (creative-studio) ─────────────────────── */}
      {service.slug === "creative-studio" && (
        <Section className="py-28 md:py-40 border-t border-border/60">
          <div className="grid grid-cols-12 gap-x-0 gap-y-10 md:gap-12 items-center">
            <AnimatedSection className="col-span-12 md:col-span-5">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-bold text-amber-700 dark:text-amber-500 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                Only 3 spots
              </div>
              <h2 className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.0]">
                Be a founding{" "}
                <span className="text-em">client.</span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-md">
                The studio is new, and that is the opportunity. The first three
                brands come on at the founding rate, with a level of access
                later clients will not get.
              </p>
            </AnimatedSection>

            <AnimatedSection className="col-span-12 md:col-span-7" delay={0.1}>
              <div className="rounded-2xl bg-foreground text-background p-8 md:p-12 relative overflow-hidden">
                <div
                  className="absolute inset-0 dot-pattern opacity-[0.05]"
                  aria-hidden="true"
                />
                <div className="relative">
                  <div className="text-xs uppercase tracking-[0.2em] text-background/55 font-semibold">
                    Founding rate
                  </div>
                  <div className="mt-4 flex items-baseline gap-3">
                    <span className="text-5xl md:text-6xl font-semibold tracking-tight leading-none">
                      $3k
                    </span>
                    <span className="text-lg text-background/60">/mo</span>
                    <span className="text-lg text-background/40 line-through">
                      $4k
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-background/70">
                    Your rate, locked for a full 12 months.
                  </p>
                  <ul className="mt-8 pt-8 border-t border-background/15 space-y-3.5">
                    {[
                      "Studio-tier production, 15 to 25 creatives a month",
                      "A direct line to the creative director, not an account manager",
                      "Priority turnaround and first call on new formats",
                      "In exchange: we feature the work and results as a case study",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <svg
                          viewBox="0 0 24 24"
                          className="w-4 h-4 mt-0.5 flex-shrink-0 text-background/70"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span className="text-[15px] text-background/85 leading-snug">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={foundingHref}
                    className="mt-9 inline-flex items-center justify-center gap-2 w-full rounded-full bg-background text-foreground text-sm font-semibold py-3.5 hover:opacity-90 transition-opacity"
                  >
                    Claim a founding spot
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <p className="mt-4 text-xs text-background/50 text-center">
                    When the three spots are filled, the founding rate closes.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </Section>
      )}

      {/* ─── Founding spots (ai-agent) ────────────────────── */}
      {service.slug === "ai-agent" && (
        <Section className="py-28 md:py-40 border-t border-border/60">
          <div className="grid grid-cols-12 gap-x-0 gap-y-10 md:gap-12 items-center">
            <AnimatedSection className="col-span-12 md:col-span-5">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-bold text-amber-700 dark:text-amber-500 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                Only 2 spots
              </div>
              <h2 className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.0]">
                Be a founding{" "}
                <span className="text-em">client.</span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-md">
                This service is new, and that is the opportunity. The first two
                businesses come on at the founding rate, with a level of access
                later clients will not get.
              </p>
            </AnimatedSection>

            <AnimatedSection className="col-span-12 md:col-span-7" delay={0.1}>
              <div className="rounded-2xl bg-foreground text-background p-8 md:p-12 relative overflow-hidden">
                <div
                  className="absolute inset-0 dot-pattern opacity-[0.05]"
                  aria-hidden="true"
                />
                <div className="relative">
                  <div className="text-xs uppercase tracking-[0.2em] text-background/55 font-semibold">
                    Founding rate
                  </div>
                  <div className="mt-4 flex items-baseline gap-3">
                    <span className="text-5xl md:text-6xl font-semibold tracking-tight leading-none">
                      $3.5k
                    </span>
                    <span className="text-lg text-background/60">/mo</span>
                    <span className="text-lg text-background/40 line-through">
                      $5k
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-background/70">
                    Your rate, locked for a full 12 months.
                  </p>
                  <ul className="mt-8 pt-8 border-t border-background/15 space-y-3.5">
                    {[
                      "A fully deployed AI agent, built around your workflows",
                      "A direct line to me, not a support queue",
                      "Priority turnaround and first call on every new skill",
                      "In exchange: we document the build and results as a case study",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <svg
                          viewBox="0 0 24 24"
                          className="w-4 h-4 mt-0.5 flex-shrink-0 text-background/70"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span className="text-[15px] text-background/85 leading-snug">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={foundingHref}
                    className="mt-9 inline-flex items-center justify-center gap-2 w-full rounded-full bg-background text-foreground text-sm font-semibold py-3.5 hover:opacity-90 transition-opacity"
                  >
                    Claim a founding spot
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <p className="mt-4 text-xs text-background/50 text-center">
                    When the two spots are filled, the founding rate closes.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </Section>
      )}

      {/* ─── FAQ ─────────────────────────────────────────────── */}
      <Section className="py-28 md:py-40 border-t border-border/60">
        <AnimatedSection>
          <h2 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[0.98] max-w-4xl">
            {service.sectionHeadings.faq.lead}{" "}
            <span className="text-em">
              {service.sectionHeadings.faq.em}
            </span>
          </h2>
        </AnimatedSection>

        <div className="mt-20 md:mt-24">
          {service.faqs.map((faq, i) => (
            <AnimatedSection key={faq.question} delay={i * 0.04}>
              <div className="py-10 md:py-12 border-t border-border/60 first:border-t-0">
                <div className="grid grid-cols-12 gap-4 md:gap-10">
                  <div className="col-span-12 md:col-span-1">
                    <span className="text-3xl text-accent/40 leading-none">
                      {num(i + 1)}
                    </span>
                  </div>
                  <div className="col-span-12 md:col-span-5">
                    <h3 className="text-xl md:text-2xl font-medium text-foreground leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="col-span-12 md:col-span-6 text-muted-foreground leading-[1.7] text-[15px]">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      {/* ─── Closing ─────────────────────────────────────────── */}
      <Section className="py-32 md:py-44 bg-black text-white border-t border-border/60 relative overflow-hidden">
        <div
          className="absolute inset-0 dot-pattern opacity-[0.04]"
          aria-hidden="true"
        />
        <AnimatedSection>
          <div className="relative">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[0.98] max-w-5xl bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
              Let&apos;s talk about{" "}
              <span className="text-em">
                {service.shortTitle}.
              </span>
            </h2>
            <p className="mt-10 text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed">
              A free 30-minute call. I&apos;ll tell you straight if this is the
              right fit for your business. And if it isn&apos;t, who to call instead.
            </p>

            <div className="mt-16 md:mt-20 flex flex-col sm:flex-row sm:items-baseline gap-8 sm:gap-12 pt-10 border-t border-white/10">
              <Link
                href={contactHref}
                className="group inline-flex items-center gap-3 text-lg font-medium text-white border-b border-white/40 hover:border-white transition-colors pb-1 w-fit"
              >
                {service.slug === "creative-studio"
                  ? "Book an intro call"
                  : "Begin a conversation"}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
              >
                Explore all services
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </Section>
    </>
  );
}
