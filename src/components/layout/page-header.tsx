import { AnimatedSection } from "@/components/shared/animated-section";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  accent?: string;
  className?: string;
}

export function PageHeader({ title, subtitle, accent, className }: PageHeaderProps) {
  return (
    <div
      className={cn(
        "relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden",
        className,
      )}
    >
      {/* Subtle background */}
      <div className="absolute inset-0 hero-gradient opacity-50" aria-hidden="true" />
      <div className="absolute inset-0 dot-pattern opacity-30" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-8">
        <AnimatedSection>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            {title}
            {accent && (
              <span className="text-gradient">
                {" "}
                {accent}
              </span>
            )}
          </h1>
          {subtitle && (
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </AnimatedSection>
      </div>
    </div>
  );
}
