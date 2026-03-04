import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 hero-gradient" aria-hidden="true" />
      <div className="absolute inset-0 dot-pattern" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-8 w-full">
        <div className="max-w-3xl">
          <p
            className="text-sm font-medium text-accent uppercase tracking-wider animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            AI Consulting &amp; Development
          </p>
          <h1
            className="mt-6 text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight text-foreground leading-[1.05] animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            I help businesses{" "}
            <span className="font-serif italic text-gradient">
              ship AI products.
            </span>
          </h1>
          <p
            className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            Strategy, design, and development. I take AI products
            from idea to production.
          </p>
          <div
            className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Button asChild size="lg" className="shadow-lg shadow-accent/20">
              <Link href="/contact">
                Book a Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/work">View My Work</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
