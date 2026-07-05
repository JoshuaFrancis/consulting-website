import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  LayoutTemplate,
  BadgeCheck,
  Banknote,
  UserCheck,
  Gauge,
  LifeBuoy,
  Boxes,
} from "lucide-react";
import { Section } from "@/components/layout/section";
import { AnimatedSection } from "@/components/shared/animated-section";

// The single umbrella, delivered. The core leads at double width; the
// supporting components sit smaller; the deep end stays deliberately quiet.
const CORE = {
  icon: LayoutTemplate,
  tag: "The core",
  title: "Credibility-first design & build",
  body: "A site engineered through product and UX design to make you look as established as you are. Senior, custom, no templates. Everything else on this page hangs off this.",
};

const COMPONENTS = [
  {
    icon: BadgeCheck,
    tag: "Trust decided in seconds",
    title: "Trust & proof layer",
    body: "Press, case studies, results. Placed where they decide trust, not buried three scrolls down.",
  },
  {
    icon: Banknote,
    tag: "Forced discounting",
    title: "Fee-justifying positioning",
    body: "Messaging and structure that hold your price. No more discounting to close work you should win at full rate.",
  },
  {
    icon: UserCheck,
    tag: "Handoff mess",
    title: "One owner: design + build",
    body: "I design it and I build it. No handoff, no finger-pointing. One person accountable for the whole thing.",
  },
  {
    icon: Gauge,
    tag: "Slow and fragile",
    title: "Performance & reliability",
    body: "Fast, secure, mobile-first. Speed and stability are themselves trust signals.",
  },
  {
    icon: LifeBuoy,
    tag: "Stale after launch",
    title: "Care Plan",
    body: "Hosting, monitoring, security, and changes on a monthly retainer. The site stays sharp after launch.",
  },
];

export function ServicesPreview() {
  return (
    <Section id="offer">
      <AnimatedSection>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.05]">
          One owner. One site engineered to{" "}
          <span className="text-em">make you look serious.</span>
        </h2>
        <p className="mt-4 text-muted-foreground max-w-2xl">
          Not a prettier redesign. A credibility-first design and build, where
          every part earns the trust that decides whether a premium buyer takes
          you seriously.
        </p>
      </AnimatedSection>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* The core — featured, double width */}
        <AnimatedSection className="md:col-span-2">
          <div className="group relative h-full overflow-hidden rounded-2xl border border-accent/30 bg-card p-7 md:p-9 shadow-lg transition-all duration-300 hover:shadow-xl">
            <div
              className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-accent/[0.07] blur-3xl"
              aria-hidden="true"
            />
            <div className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-md shadow-accent/25">
              <CORE.icon className="size-5" />
            </div>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
              {CORE.tag}
            </p>
            <h3 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight text-foreground leading-snug">
              {CORE.title}
            </h3>
            <p className="mt-3 max-w-xl text-base text-muted-foreground leading-relaxed">
              {CORE.body}
            </p>
          </div>
        </AnimatedSection>

        {/* Supporting components */}
        {COMPONENTS.map((c, i) => {
          const Icon = c.icon;
          return (
            <AnimatedSection key={c.title} delay={(i + 1) * 0.06}>
              <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-lg">
                <div className="flex size-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Icon className="size-4.5" />
                </div>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60">
                  {c.tag}
                </p>
                <h3 className="mt-1.5 text-base font-semibold text-foreground leading-snug">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {c.body}
                </p>
              </div>
            </AnimatedSection>
          );
        })}

        {/* The deep end — present, but quieter. Grown into, never led with. */}
        <AnimatedSection delay={0.42} className="md:col-span-3">
          <div className="flex h-full flex-col gap-3 rounded-2xl border border-dashed border-border bg-muted/30 p-6 md:flex-row md:items-center md:gap-6">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-foreground/5 text-muted-foreground">
              <Boxes className="size-4.5" />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60">
                The deeper end
              </p>
              <h3 className="mt-1 text-base font-semibold text-foreground">
                Product &amp; app work
              </h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed max-w-2xl">
                When the result lives in a product, the same design-and-build
                muscle shapes the experience users activate and stay in. Grown
                into over time, not where most clients start.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>

      <AnimatedSection delay={0.5}>
        <Link
          href="/services/website-design"
          className="mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline underline-offset-4"
        >
          See exactly how the offer works
          <ArrowUpRight className="size-3.5" />
        </Link>
      </AnimatedSection>
    </Section>
  );
}
