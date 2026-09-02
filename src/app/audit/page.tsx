import type { Metadata } from "next";
import Image from "next/image";
import { AuditForm } from "@/components/audit/audit-form";

export const metadata: Metadata = {
  title: "Does Your Website Undersell You? | Free Credibility Audit",
  description:
    "A free 10-minute self-audit that scores your website the way a high-value client does, across the 10 trust signals premium buyers judge before they ever call you.",
  alternates: { canonical: "https://joshuafrancis.ca/audit" },
};

export default function AuditPage() {
  return (
    <>
      {/* Hide site chrome from first paint (SiteShell also removes it after
          hydration) so there's no flash of the nav on this landing page. */}
      <style>{`header,footer{display:none!important}`}</style>
      <div className="min-h-svh bg-background lg:grid lg:grid-cols-2">
        {/* LEFT — pitch + form */}
        <div className="relative flex min-h-svh flex-col px-6 py-10 md:px-10 lg:px-14 xl:px-20">
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Joshua Francis
          </span>

          <div className="flex flex-1 flex-col justify-center py-10 lg:py-12">
            <div className="w-full max-w-md">
              <h1 className="text-[2rem] font-semibold leading-[1.08] tracking-tight text-foreground sm:text-4xl md:text-5xl">
                Does your website{" "}
                <span className="text-em">undersell you?</span>
              </h1>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed sm:mt-5 sm:text-lg">
                A free 10-minute self-audit that scores your site across the 10
                trust signals premium buyers judge before they ever call, so you
                see exactly where it&apos;s quietly costing you bookings and
                pricing power.
              </p>

              <div className="mt-7 sm:mt-8">
                <AuditForm />
              </div>

              {/* Mobile/tablet only: keep the social proof that lives in the
                  right-hand image panel on desktop. */}
              <figure className="mt-8 border-t border-border pt-6 lg:hidden">
                <blockquote className="text-[15px] leading-relaxed text-foreground/80">
                  &ldquo;Josh led the redesign, and the difference is night and
                  day. Now prospects compliment the site before the first
                  call.&rdquo;
                </blockquote>
                <figcaption className="mt-3 text-sm">
                  <span className="font-semibold text-foreground">
                    William Shields
                  </span>
                  <span className="mt-0.5 block text-pretty text-muted-foreground">
                    Founder and Principal of Synthminds, an AI consultancy whose
                    work has supported teams such as NVIDIA, HP, PwC, and
                    Kraft&nbsp;Heinz
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Joshua Francis
          </p>
        </div>

        {/* RIGHT — image panel with testimonial overlay */}
        <div className="relative hidden overflow-hidden lg:block">
          <Image
            src="/audit-panel.jpg"
            alt=""
            fill
            priority
            sizes="50vw"
            className="object-cover"
          />
          {/* scrim so the testimonial stays legible */}
          <div
            className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/95 via-black/40 to-transparent"
            aria-hidden="true"
          />
          <figure className="absolute inset-x-0 bottom-0 p-10 text-white xl:p-14">
            <blockquote className="max-w-xl text-lg leading-relaxed xl:text-xl">
              &ldquo;Josh led the redesign, and the difference is night and day.
              Now prospects compliment the site before the first call.&rdquo;
            </blockquote>
            <figcaption className="mt-5 flex items-start gap-3">
              <Image
                src="/william-shields.png"
                alt="William Shields"
                width={44}
                height={44}
                className="size-11 shrink-0 rounded-full object-cover ring-1 ring-white/25"
              />
              <span className="min-w-0">
                <span className="block font-semibold">William Shields</span>
                <span className="mt-0.5 block max-w-md text-pretty text-sm leading-snug text-white/85">
                  Founder and Principal of Synthminds, an AI consultancy whose
                  work has supported teams such as NVIDIA, HP, PwC, and
                  Kraft&nbsp;Heinz
                </span>
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </>
  );
}
