import type { Metadata } from "next";
import Link from "next/link";
import { Play, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "You're in | The Premium Credibility Audit",
  description: "Your free credibility audit is on its way to your inbox.",
  // Thank-you pages shouldn't be indexed or surfaced in search.
  robots: { index: false, follow: false },
};

export default function AuditThankYouPage() {
  return (
    <>
      {/* Hide site chrome from first paint (SiteShell also removes it after
          hydration) so there's no flash of the nav on this landing page. */}
      <style>{`header,footer{display:none!important}`}</style>
      <div className="relative min-h-svh overflow-hidden bg-background">
        {/* soft brand backdrop */}
        <div
          className="hero-gradient pointer-events-none absolute inset-0 opacity-70"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -top-24 right-[-10%] h-[520px] w-[520px] rounded-full bg-accent/[0.10] blur-[130px]"
          aria-hidden="true"
        />

        <div className="relative mx-auto flex min-h-svh max-w-3xl flex-col px-6 py-10 md:px-8 md:py-14">
          {/* minimal brand mark, no nav */}
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Joshua Francis
          </span>

          <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              You&apos;re on the list
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-5xl">
              Your audit is on its way.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground leading-relaxed">
              Check your inbox for The Premium Credibility Audit. If it&apos;s
              not there in a couple of minutes, check your spam or promotions
              tab. While you wait, take a minute to watch this.
            </p>

            {/* Video placeholder — replace the inner block with your embed, e.g.:
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube.com/embed/VIDEO_ID"
                  title="Welcome"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                /> */}
            <div className="mt-10 w-full max-w-2xl">
              <div className="group relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#1B1D5B] to-[#0B0B2A] shadow-2xl shadow-[#1B1D5B]/30 ring-1 ring-white/10">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <span className="flex size-16 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur transition group-hover:scale-105">
                    <Play
                      className="size-7 translate-x-0.5 text-white"
                      fill="currentColor"
                    />
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
                    Video coming soon
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-accent px-7 text-base font-medium text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent/90 active:scale-[0.99]"
              >
                Book a free call
                <ArrowRight className="size-4" />
              </Link>
              <p className="mt-3 text-sm text-muted-foreground">
                Prefer to talk it through now? Grab a time that works for you.
              </p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Joshua Francis
          </p>
        </div>
      </div>
    </>
  );
}
