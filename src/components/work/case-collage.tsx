import Link from "next/link";
import Image from "next/image";
import { caseStudies, type CaseStudy } from "@/lib/data/case-studies";
import { cn } from "@/lib/utils";
import { ChevronsRight } from "lucide-react";

// On-brand palette only: deep navy, white, and the brand blue as the accent pop.
export type CollageFill = "navy" | "blue" | "white";

// Each study is its image beside its own text; sides + fill are configured
// per row so the two usages (home + /work) can share the exact same tiles.
export type CollageRow = { slug: string; fill: CollageFill; imageLeft: boolean };

const label = (s: CaseStudy) => s.relatedOffer?.label ?? s.categories[0];

const FILL: Record<CollageFill, string> = {
  navy: "bg-[#0b1120]",
  blue: "bg-accent",
  white: "bg-white",
};
const TITLE: Record<CollageFill, string> = {
  navy: "text-white",
  blue: "text-white",
  white: "text-foreground transition-colors group-hover:text-accent",
};
const BODY: Record<CollageFill, string> = {
  navy: "text-white/65",
  blue: "text-white/80",
  white: "text-muted-foreground",
};
const CLIENT: Record<CollageFill, string> = {
  navy: "text-white/50",
  blue: "text-white/60",
  white: "text-muted-foreground/70",
};
// Pill + read-more colours derive from the fill, all on-brand.
const PILL: Record<CollageFill, string> = {
  navy: "bg-white/15 text-white",
  blue: "bg-white/20 text-white",
  white: "bg-accent/10 text-accent",
};
const LINK: Record<CollageFill, string> = {
  navy: "text-white",
  blue: "text-white",
  white: "text-accent",
};

function ImageTile({ study }: { study: CaseStudy }) {
  const src = study.cover ?? study.image;
  return (
    <Link
      href={`/work/${study.slug}`}
      className="group relative block aspect-[3/2] overflow-hidden bg-muted md:aspect-auto md:h-full"
    >
      {src && (
        <Image
          src={src}
          alt={study.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
        />
      )}
    </Link>
  );
}

function TextTile({ study, fill }: { study: CaseStudy; fill: CollageFill }) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className={cn("group flex flex-col justify-center p-9 md:min-h-[24rem] md:p-14", FILL[fill])}
    >
      <div className="flex flex-wrap items-center gap-2.5">
        <span className={cn("inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]", PILL[fill])}>
          {label(study)}
        </span>
        <span className={cn("font-mono text-[10px] uppercase tracking-[0.16em]", CLIENT[fill])}>
          {study.client}
        </span>
      </div>
      <h3 className={cn("mt-5 text-2xl md:text-[1.9rem] font-semibold leading-[1.15] tracking-tight line-clamp-3", TITLE[fill])}>
        {study.title}
      </h3>
      <p className={cn("mt-4 max-w-md text-[15px] leading-relaxed line-clamp-3", BODY[fill])}>
        {study.summary}
      </p>
      <span className={cn("mt-7 inline-flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.12em]", LINK[fill])}>
        Read more
        <ChevronsRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

/**
 * Full-bleed checkerboard collage: each row pairs a study's image with its
 * own text tile, sides alternating, tiles butted with no gaps. Both cells
 * stretch to the row's tallest content so no background band shows through.
 */
export function CaseStudyCollage({ rows, className }: { rows: CollageRow[]; className?: string }) {
  return (
    <div className={cn("flex flex-col overflow-hidden rounded-2xl", className)}>
      {rows.map((row) => {
        const study = caseStudies.find((s) => s.slug === row.slug);
        if (!study) return null;
        return (
          <div key={row.slug} className="grid grid-cols-1 md:grid-cols-2">
            {row.imageLeft ? (
              <>
                <ImageTile study={study} />
                <TextTile study={study} fill={row.fill} />
              </>
            ) : (
              <>
                <TextTile study={study} fill={row.fill} />
                <ImageTile study={study} />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
