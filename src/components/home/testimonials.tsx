import Image from "next/image";
import { Star } from "lucide-react";
import { Section } from "@/components/layout/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { testimonials } from "@/lib/data/testimonials";

function Stars({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-0.5 ${className}`} aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export function Testimonials() {
  const [featured, ...rest] = testimonials;
  const name = (t: (typeof testimonials)[number]) => t.author ?? t.role;
  const sub = (t: (typeof testimonials)[number]) => (t.author ? t.role : "Client");

  return (
    <Section>
      <AnimatedSection>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.05]">
          What clients say about{" "}
          <span className="text-em">working with me.</span>
        </h2>
      </AnimatedSection>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-6 gap-5">
        {/* Featured testimonial */}
        <AnimatedSection className="lg:col-span-6">
          <figure className="grid grid-cols-1 md:grid-cols-5 overflow-hidden rounded-3xl border border-border bg-card">
            <div className="relative md:col-span-2 aspect-[4/3] md:aspect-auto md:min-h-[20rem] overflow-hidden bg-muted">
              {featured.image && (
                <Image
                  src={featured.image}
                  alt={name(featured)}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              )}
            </div>
            <div className="md:col-span-3 flex flex-col justify-center p-8 md:p-12">
              <Stars />
              <span
                aria-hidden
                className="mt-4 block leading-none text-5xl text-accent/30"
                style={{ fontFamily: "Georgia, serif" }}
              >
                &ldquo;
              </span>
              <blockquote className="-mt-3 text-xl md:text-[1.7rem] font-medium text-foreground leading-snug">
                {featured.quote}
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-2 text-sm">
                <span className="font-semibold text-foreground">{name(featured)}</span>
                <span className="text-muted-foreground/50">·</span>
                <span className="text-muted-foreground">{sub(featured)}</span>
              </figcaption>
            </div>
          </figure>
        </AnimatedSection>

        {/* Supporting testimonials */}
        {rest.map((t, i) => (
          <AnimatedSection
            key={`${name(t)}-${i}`}
            delay={i * 0.08}
            className="lg:col-span-2"
          >
            <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:-translate-y-1">
              <Stars />
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-foreground/90">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted ring-1 ring-border">
                  {t.image && (
                    <Image
                      src={t.image}
                      alt={name(t)}
                      fill
                      className="object-cover"
                      style={{ objectPosition: "50% 22%" }}
                      sizes="40px"
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-foreground">
                    {name(t)}
                  </div>
                  <div className="truncate text-xs text-muted-foreground">{sub(t)}</div>
                </div>
              </figcaption>
            </figure>
          </AnimatedSection>
        ))}
      </div>
    </Section>
  );
}
