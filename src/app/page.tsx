import { Hero } from "@/components/home/hero";
import { WhySection } from "@/components/home/why-section";
import { ServicesPreview } from "@/components/home/services-preview";
import { FeaturedWork } from "@/components/home/featured-work";
import { Testimonials } from "@/components/home/testimonials";
import { FaqSection } from "@/components/home/faq-section";
import { CTABanner } from "@/components/shared/cta-banner";
import { JsonLd } from "@/components/shared/json-ld";

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Joshua Francis | AI Consulting & Implementation",
  url: "https://joshuafrancis.ca",
  description:
    "Joshua Francis is an AI consultant based in Toronto who helps startups and enterprises design, build, and ship AI products. Services include AI strategy and roadmapping, LLM implementation, AI education and training, and UX/UI design for AI-powered products.",
  publisher: {
    "@type": "Person",
    name: "Joshua Francis",
    jobTitle: "AI Consultant & Developer",
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteSchema} />
      <Hero />
      <WhySection />
      <ServicesPreview />
      <FeaturedWork />
      <Testimonials />
      <FaqSection />
      <CTABanner />
    </>
  );
}
