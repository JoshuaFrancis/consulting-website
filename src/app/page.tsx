import { Hero } from "@/components/home/hero";
import { WhySection } from "@/components/home/why-section";
import { ServicesPreview } from "@/components/home/services-preview";
import { ProcessSection } from "@/components/home/process-section";
import { FeaturedWork } from "@/components/home/featured-work";
import { Testimonials } from "@/components/home/testimonials";
import { FaqSection } from "@/components/home/faq-section";
import { CTABanner } from "@/components/shared/cta-banner";
import { JsonLd } from "@/components/shared/json-ld";

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
      {/* PROBLEM — ends on the bridge line, so proof must come next */}
      <WhySection />
      {/* PROOF — case studies (data) then testimonials (social) */}
      <FeaturedWork />
      <Testimonials />
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
