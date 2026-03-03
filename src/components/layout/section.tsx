import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn("py-24 md:py-32", className)}>
      <div className="max-w-6xl mx-auto px-6 md:px-8">{children}</div>
    </section>
  );
}
