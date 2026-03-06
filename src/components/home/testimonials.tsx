import Image from "next/image";
import { Section } from "@/components/layout/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { testimonials } from "@/lib/data/testimonials";

export function Testimonials() {

  return (
    <Section>
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
          What clients{" "}
          <span className="font-serif italic">say</span>
        </h2>
      </AnimatedSection>

      <div className="mt-12 -mx-6 md:-mx-8 px-6 md:px-8">
        <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {testimonials.map((item, i) => (
            <AnimatedSection
              key={`${item.author ?? item.role}-${i}`}
              delay={i * 0.1}
              className="flex-shrink-0 w-[320px] md:w-[380px] snap-start"
            >
              <div className="relative h-[420px] md:h-[480px] rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-lg">
                {/* Background image or placeholder gradient */}
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.author ?? item.role}
                    fill
                    className="object-cover object-top"
                    sizes="380px"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black" />
                )}

                {/* Gradient blur overlay — fades in from top */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[55%] backdrop-blur-xl"
                  style={{
                    WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 40%)",
                    maskImage: "linear-gradient(to bottom, transparent 0%, black 40%)",
                  }}
                />
                {/* Dark tint */}
                <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-gradient-to-b from-transparent via-black/40 to-black/80" />

                {/* Text content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 flex flex-col">
                  <blockquote className="text-white text-sm md:text-base font-medium leading-snug">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>

                  <div className="mt-4 pt-4 border-t border-white/15">
                    {item.author ? (
                      <>
                        <p className="text-sm font-semibold text-white">
                          {item.author}
                        </p>
                        <p className="text-sm text-white/50 mt-0.5">
                          {item.role}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm font-semibold text-white">
                        {item.role}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </Section>
  );
}
