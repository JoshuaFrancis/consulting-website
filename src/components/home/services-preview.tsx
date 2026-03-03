import Link from "next/link";
import { Section } from "@/components/layout/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { services } from "@/lib/data/services";
import { ArrowUpRight } from "lucide-react";

export function ServicesPreview() {
  return (
    <Section>
      <AnimatedSection>
        <p className="text-sm font-medium text-accent uppercase tracking-wider">
          What I Do
        </p>
        <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
          End-to-end{" "}
          <span className="font-serif italic">AI consulting</span>
        </h2>
        <p className="mt-4 text-muted-foreground max-w-2xl">
          From figuring out what to build through getting it live. I work across
          design, AI, and product to ship things that actually work.
        </p>
      </AnimatedSection>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <AnimatedSection key={service.slug} delay={i * 0.1}>
              <Link
                href={`/services#${service.slug}`}
                className="group block p-8 rounded-xl gradient-border h-full"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 via-accent/10 to-transparent flex items-center justify-center ring-1 ring-accent/10 group-hover:ring-accent/20 group-hover:from-accent/30 group-hover:via-accent/15 transition-all duration-500">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
                  {service.shortTitle}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {service.summary}
                </p>
              </Link>
            </AnimatedSection>
          );
        })}
      </div>
    </Section>
  );
}
