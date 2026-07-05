import { cn } from "@/lib/utils";
import type { CaseStudy } from "@/lib/data/case-studies";

/** Branded poster shown when a case study has no screenshot yet. */
export function CasePoster({
  study,
  className,
}: {
  study: CaseStudy;
  className?: string;
}) {
  const r = study.results[0];
  return (
    <div
      className={cn(
        "relative flex h-full items-center justify-center overflow-hidden bg-[#0b0b0f] p-8 text-center",
        className
      )}
    >
      <div className="absolute inset-0 dot-pattern opacity-[0.06]" aria-hidden="true" />
      <div
        className="absolute -top-10 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
          {study.client}
        </div>
        {r && (
          <>
            <div className="mt-3 text-5xl md:text-6xl font-semibold tracking-tight text-gradient">
              {r.metric}
            </div>
            <div className="mx-auto mt-2 max-w-xs text-sm text-white/55">
              {r.description}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
