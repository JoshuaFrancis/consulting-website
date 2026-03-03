import { AnimatedSection } from "./animated-section";

interface MetricCardProps {
  metric: string;
  description: string;
  delay?: number;
}

export function MetricCard({ metric, description, delay = 0 }: MetricCardProps) {
  return (
    <AnimatedSection delay={delay}>
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
          {metric}
        </div>
        <div className="mt-2 text-sm text-muted-foreground">{description}</div>
      </div>
    </AnimatedSection>
  );
}
