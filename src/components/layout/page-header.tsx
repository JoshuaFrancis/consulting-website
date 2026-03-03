import { AnimatedSection } from "@/components/shared/animated-section";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  accent?: string;
}

export function PageHeader({ title, subtitle, accent }: PageHeaderProps) {
  return (
    <div className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 hero-gradient opacity-50" aria-hidden="true" />
      <div className="absolute inset-0 dot-pattern opacity-30" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-8">
        <AnimatedSection>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            {title}
            {accent && (
              <span className="font-serif italic text-gradient">
                {" "}
                {accent}
              </span>
            )}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        </AnimatedSection>
      </div>
    </div>
  );
}
