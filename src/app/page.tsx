import { Hero } from "@/components/home/hero";
import { SocialProof } from "@/components/home/social-proof";
import { ServicesPreview } from "@/components/home/services-preview";
import { FeaturedWork } from "@/components/home/featured-work";
import { Testimonials } from "@/components/home/testimonials";
import { CTABanner } from "@/components/shared/cta-banner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <ServicesPreview />
      <FeaturedWork />
      <Testimonials />
      <CTABanner />
    </>
  );
}
