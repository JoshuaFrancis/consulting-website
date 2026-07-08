import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ShaderBackground } from "@/components/ui/hero-shader";

// In-pitch trust signal: client logos live inside the hero, per the guide.
type Brand = { name: string; logo?: string; logoClass?: string };

const brands: Brand[] = [
  { name: "NVIDIA" },
  { name: "PwC" },
  { name: "Kraft Heinz", logo: "/logos/kraft-heinz.png", logoClass: "h-5 md:h-6" },
  { name: "Goodyear", logo: "/logos/goodyear.png", logoClass: "h-6 md:h-7" },
  { name: "Peppermill Resort Spa", logo: "/logos/peppermill.png", logoClass: "h-9 md:h-10" },
  { name: "Uplimit" },
];

export function Hero() {
  return (
    <ShaderBackground>
      <section className="relative z-20 flex min-h-svh flex-col px-6 pb-10 pt-24 sm:px-8 lg:px-20 lg:pt-16">
        <div className="flex flex-1 items-center">
          <div className="max-w-xl lg:max-w-2xl">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.05] text-balance animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              Your website is making premium clients{" "}
              <span className="hero-highlight">hesitate before they take action.</span>
            </h1>
            <p
              className="mt-5 max-w-xl text-base sm:text-lg text-white/70 leading-relaxed text-balance animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              Website rebuilds that build trust on first contact, so more of
              your ideal customers take the next step.
            </p>
            <div className="mt-8 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black shadow-lg shadow-black/20 transition-all duration-200 hover:bg-white/90 active:scale-95"
              >
                Book a call
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Client logos, sitting at the base of the hero in normal flow */}
        <div
          className="mt-14 animate-fade-up"
          style={{ animationDelay: "0.45s" }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
            Work connected to teams at
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-4 sm:gap-x-10">
            {brands.map((brand) =>
              brand.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={brand.name}
                  src={brand.logo}
                  alt={brand.name}
                  className={`${brand.logoClass ?? "h-5 md:h-6"} w-auto object-contain brightness-0 invert opacity-45`}
                />
              ) : (
                <span
                  key={brand.name}
                  className="text-base md:text-lg font-semibold tracking-tight text-white/45"
                >
                  {brand.name}
                </span>
              ),
            )}
          </div>
        </div>
      </section>
    </ShaderBackground>
  );
}
