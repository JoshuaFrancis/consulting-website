import { Hero } from "@/components/home/hero";
import { WhySection } from "@/components/home/why-section";
import { ServicesPreview } from "@/components/home/services-preview";
import { FeaturedWork } from "@/components/home/featured-work";
import { Testimonials } from "@/components/home/testimonials";
import { CTABanner } from "@/components/shared/cta-banner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhySection />
      <ServicesPreview />
      <FeaturedWork />
      <Testimonials />
      <CTABanner />
    </>
  );
}
