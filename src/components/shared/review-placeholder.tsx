import Image from "next/image";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedSection } from "@/components/shared/animated-section";

interface ReviewQuoteProps {
  quote: string;
  author: string;
  role: string;
  href?: string;
  image?: string;
  className?: string;
  dark?: boolean;
  delay?: number;
}

interface ReviewCaseNoteProps {
  context: string;
  title: string;
  body: string;
  attribution: string;
  href?: string;
  className?: string;
  dark?: boolean;
  delay?: number;
}

function ReviewShell({
  children,
  className,
  dark = false,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  delay?: number;
}) {
  return (
    <AnimatedSection delay={delay} className={className}>
      <div className="group relative">
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 translate-x-3 translate-y-3 rounded-lg border transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4",
            dark
              ? "border-white/10 bg-white/[0.03]"
              : "border-border/70 bg-card/60",
          )}
        />
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-lg border transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2",
            dark
              ? "border-white/10 bg-white/[0.045]"
              : "border-border bg-card/80",
          )}
        />
        <figure
          className={cn(
            "relative overflow-hidden rounded-lg border p-6 shadow-sm transition duration-500 md:p-7",
            dark
              ? "border-white/10 bg-[#071021] text-white shadow-black/20 group-hover:border-white/20"
              : "border-border bg-card text-foreground shadow-slate-900/[0.04] group-hover:border-accent/25 group-hover:shadow-xl group-hover:shadow-accent/10",
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-x-0 top-0 h-px",
              dark
                ? "bg-gradient-to-r from-transparent via-white/25 to-transparent"
                : "bg-gradient-to-r from-transparent via-accent/45 to-transparent",
            )}
          />
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full blur-3xl",
              dark ? "bg-white/[0.06]" : "bg-accent/[0.08]",
            )}
          />
          <div className="relative">{children}</div>
        </figure>
      </div>
    </AnimatedSection>
  );
}

export function ReviewQuote({
  quote,
  author,
  role,
  href,
  image,
  className,
  dark = false,
  delay = 0,
}: ReviewQuoteProps) {
  return (
    <ReviewShell delay={delay} className={className} dark={dark}>
      <div>
        <blockquote
          className={cn(
            "text-lg font-medium leading-snug md:text-xl",
            dark ? "text-white/90" : "text-foreground",
          )}
        >
          &ldquo;{quote}&rdquo;
        </blockquote>
        <figcaption
          className={cn(
            "mt-6 flex items-center gap-3 text-sm",
            dark ? "text-white/55" : "text-muted-foreground",
          )}
        >
          {image && (
            <span
              className={cn(
                "relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-muted ring-1",
                dark ? "ring-white/15" : "ring-border",
              )}
            >
              <Image
                src={image}
                alt={author}
                fill
                className="object-cover"
                sizes="48px"
              />
            </span>
          )}
          <span className="min-w-0">
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "block font-semibold underline-offset-4 hover:underline",
                  dark ? "text-white" : "text-foreground",
                )}
              >
                {author}
              </a>
            ) : (
              <span
                className={cn(
                  "block font-semibold",
                  dark ? "text-white" : "text-foreground",
                )}
              >
                {author}
              </span>
            )}
            <span className="block leading-snug">{role}</span>
          </span>
        </figcaption>
      </div>
    </ReviewShell>
  );
}

export function ReviewCaseNote({
  context,
  title,
  body,
  attribution,
  href,
  className,
  dark = false,
  delay = 0,
}: ReviewCaseNoteProps) {
  return (
    <ReviewShell delay={delay} className={className} dark={dark}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p
          className={cn(
            "font-mono text-[10px] uppercase tracking-[0.18em]",
            dark ? "text-white/45" : "text-muted-foreground/70",
          )}
        >
          {context}
        </p>
        <div
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
            dark
              ? "border-white/10 bg-white/[0.06] text-white/70"
              : "border-border bg-muted/40 text-muted-foreground",
          )}
        >
          <TrendingUp className="h-3.5 w-3.5 text-accent" />
          Client result
        </div>
      </div>
      <div className="mt-5 flex gap-4">
        <TrendingUp
          className={cn(
            "mt-0.5 h-5 w-5 shrink-0",
            dark ? "text-white/35" : "text-accent/60",
          )}
        />
        <div>
          <h3
            className={cn(
              "text-lg md:text-xl font-semibold leading-snug",
              dark ? "text-white/90" : "text-foreground",
            )}
          >
            {title}
          </h3>
          <p
            className={cn(
              "mt-3 text-base leading-relaxed",
              dark ? "text-white/65" : "text-muted-foreground",
            )}
          >
            {body}
          </p>
          <div
            className={cn(
              "mt-5 flex flex-wrap items-center gap-3 border-t pt-4 text-sm",
              dark ? "border-white/10 text-white/55" : "border-border text-muted-foreground",
            )}
          >
            <span>{attribution}</span>
            {href && (
              <a
                href={href}
                className={cn(
                  "inline-flex items-center gap-1 font-medium underline-offset-4 hover:underline",
                  dark ? "text-white" : "text-foreground",
                )}
              >
                Read the case study
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </ReviewShell>
  );
}
