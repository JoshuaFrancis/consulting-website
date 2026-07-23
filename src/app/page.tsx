import { Hero } from "@/components/home/hero";
import { WhySection } from "@/components/home/why-section";
import { ServicesPreview } from "@/components/home/services-preview";
import { ProcessSection } from "@/components/home/process-section";
import { FeaturedWork } from "@/components/home/featured-work";
import { FaqSection } from "@/components/home/faq-section";
import { CTABanner } from "@/components/shared/cta-banner";
import { JsonLd } from "@/components/shared/json-ld";
import { ReviewQuote } from "@/components/shared/review-placeholder";

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Joshua Francis | Credibility-First Websites for Premium Brands",
  url: "https://joshuafrancis.ca",
  description:
    "Joshua Francis designs and builds credibility-first websites for premium service brands, engineered to make you look as established as you actually are, so the right clients take you seriously and you can hold your prices. One accountable owner, design and build, no handoff.",
  publisher: {
    "@type": "Person",
    name: "Joshua Francis",
    jobTitle: "Designer & Developer",
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteSchema} />
      {/* 5P order per the website guide: Pitch → Problem → Proof → Process → Push, FAQ before Push. */}
      {/* PITCH — the result, not the service; client logos live inside the hero */}
      <Hero />
      <ReviewQuote
        className="mx-auto mt-12 max-w-6xl px-6 md:px-8"
        quote="I've received a lot of compliments on the website. It gives Shiki Studios a more prestige, high-quality look. Sign-ups are up 41% since the new site launched. It's summer, when I expected them to dip, but we nearly matched my best month of the year. I love it."
        author="Kayleigh Shikanai"
        role="Founder of Shiki Studios, the Toronto acting school behind actors now on Netflix, Prime Video, and Paramount+"
        image="/founder-kayleigh.webp"
        href="/work/shiki-studios-acting-school"
      />
      {/* PROBLEM — ends on the bridge line, so proof must come next */}
      <WhySection />
      <ReviewQuote
        className="mx-auto mt-12 max-w-6xl px-6 md:px-8"
        quote="For a long time, our website was the weakest part of how we showed up. It didn't represent the level we were at. Josh led the redesign, and the difference is night and day. Now prospects compliment the site before the first call. If you want someone who treats your site like it's their own, it's Josh."
        author="William Shields"
        role="Founder and Principal of Synthminds, an AI consultancy and prompt engineering firm whose work has supported teams such as NVIDIA, HP, PwC, and Kraft Heinz"
        image="/william-shields.png"
        href="https://fa0ac5d6.click.kit-mail3.com/v8u4gm5v3gimuxk2g03ughvkooonpf9hd0n8m/qvh8h7hd5x7456ilhk/aHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL3NoaWVsZHMtd2Vz"
      />
      {/* PROOF — case studies (data) then testimonials (social) */}
      <FeaturedWork />
      {/* THE OFFER — what working together gets you */}
      <ServicesPreview />
      {/* PROCESS — easy start → the work → the outcome, smooth-working testimonial after */}
      <ProcessSection />
      {/* FAQ — objections cleared just before the push */}
      <FaqSection />
      {/* PUSH — one action, proof beside it */}
      <CTABanner />
    </>
  );
}
