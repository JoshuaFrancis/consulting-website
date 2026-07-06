import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { MeshBackdrop } from "@/components/ui/hero-shader";
import { cn } from "@/lib/utils";

const CORE = {
  title: "Credibility-first design & build",
  body: "A site engineered through product and UX design to make you look as established as you are. Senior, custom, no templates. Everything else on this page hangs off this.",
};

const COMPONENTS = [
  {
    tag: "Trust decided in seconds",
    title: "Trust & proof layer",
    body: "Press, case studies, results. Placed where they decide trust, not buried three scrolls down.",
  },
  {
    tag: "Slow and fragile",
    title: "Performance & reliability",
    body: "Fast, secure, mobile-first. Speed and stability are themselves trust signals.",
  },
  {
    tag: "Forced discounting",
    title: "Positioning that protects your price",
    body: "Messaging and structure that hold your price. No more discounting to close work you should win at full rate.",
  },
  {
    tag: "Handoff mess",
    title: "One owner: design + build",
    body: "I design it and I build it. No handoff, no finger-pointing. One person accountable for the whole thing.",
  },
  {
    tag: "Stale after launch",
    title: "Care Plan",
    body: "Hosting, monitoring, security, and changes on a monthly retainer. The site stays sharp after launch.",
  },
];

// Frosted glass panels sitting on ONE shared mesh background. The thin seams
// between cells are what "split" the single background into cards.
const cellBase =
  "rounded-2xl bg-[#0b1220] bg-[radial-gradient(130%_110%_at_20%_-10%,rgba(37,99,255,0.22),transparent_55%)] p-6 ring-1 ring-inset ring-white/10 md:rounded-none md:bg-white/[0.04] md:bg-none md:p-7 md:backdrop-blur-xl";

function CellCopy({ title, body }: { title: string; body: string }) {
  return (
    <>
      <h3 className="text-base font-semibold text-white leading-snug">
        {title}
      </h3>
      <p className="mt-2 text-sm text-white/65 leading-relaxed">{body}</p>
    </>
  );
}

export function ServicesPreview() {
  return (
    <Section id="offer">
      <AnimatedSection>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.05]">
          One owner. One website built to{" "}
          <span className="text-em md:whitespace-nowrap">
            close the credibility gap.
          </span>
        </h2>
        <p className="mt-4 text-muted-foreground max-w-2xl">
          Not a cosmetic redesign. A strategy-led website rebuild that makes
          your proof, positioning, and reputation obvious before the first call.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.1} className="mt-12">
        <div className="relative overflow-hidden rounded-[28px] md:bg-black">
          {/* One background for the whole grid (desktop only — on mobile the
              cards stack and each carries its own dark background, so the seams
              fall back to the light page background) */}
          <MeshBackdrop
            colors={["#000000", "#0a1029", "#1e3a8a", "#2563ff", "#000000"]}
            speed={0.1}
            distortion={0.7}
            swirl={0.1}
            className="pointer-events-none absolute inset-0 hidden opacity-40 md:block"
          />
          <div
            className="pointer-events-none absolute inset-0 hidden dot-pattern opacity-[0.04] md:block"
            aria-hidden="true"
          />

          <div className="relative grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-[11rem_11rem_11rem] md:gap-px">
            {/* Core — the anchor, 2×2 */}
            <div
              className={cn(
                cellBase,
                "flex flex-col justify-center md:col-start-1 md:col-span-2 md:row-start-1 md:row-span-2",
              )}
            >
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white leading-snug">
                {CORE.title}
              </h3>
              <p className="mt-3 max-w-md text-base text-white/65 leading-relaxed">
                {CORE.body}
              </p>
            </div>

            <div className={cn(cellBase, "flex flex-col justify-center md:col-start-3 md:row-start-1")}>
              <CellCopy {...COMPONENTS[0]} />
            </div>

            <div className={cn(cellBase, "flex flex-col justify-center md:col-start-3 md:row-start-2")}>
              <CellCopy {...COMPONENTS[1]} />
            </div>

            <div className={cn(cellBase, "flex flex-col justify-center md:col-start-1 md:row-start-3")}>
              <CellCopy {...COMPONENTS[2]} />
            </div>

            <div className={cn(cellBase, "flex flex-col justify-center md:col-start-2 md:row-start-3")}>
              <CellCopy {...COMPONENTS[3]} />
            </div>

            <div className={cn(cellBase, "flex flex-col justify-center md:col-start-3 md:row-start-3")}>
              <CellCopy {...COMPONENTS[4]} />
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.5}>
        <Link
          href="/contact"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white shadow-lg shadow-accent/20 transition-all duration-200 hover:bg-accent/90 active:scale-95"
        >
          Close the credibility gap
          <ArrowRight className="size-4" />
        </Link>
      </AnimatedSection>
    </Section>
  );
}
