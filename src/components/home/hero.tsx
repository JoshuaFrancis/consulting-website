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
      <section className="relative z-20 flex min-h-svh items-center pt-16 pb-36">
        <div className="w-full px-12 lg:px-20">
          <div className="max-w-xl lg:max-w-2xl">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.05] text-balance animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              In the room, you&apos;re premium. Online, you look{" "}
              <span className="text-gradient">cheaper than you are.</span>
            </h1>
            <p
              className="mt-5 text-lg text-white/70 leading-relaxed text-balance animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              Clients judge your credibility in the first seconds, usually
              before they ever reach out. I design and build the site that
              closes that gap, so you win the work and hold your price.
            </p>
            <div className="mt-8 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black shadow-lg shadow-black/20 transition-all duration-200 hover:bg-white/90 active:scale-95"
              >
                Book a consultation
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Client logos, pinned to the base of the hero */}
        <div
          className="absolute inset-x-0 bottom-0 z-20 px-12 pb-10 lg:px-20 animate-fade-up"
          style={{ animationDelay: "0.45s" }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
            Work delivered for teams at
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-10 gap-y-4">
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
