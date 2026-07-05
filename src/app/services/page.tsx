import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { ServicesPreview } from "@/components/home/services-preview";
import { CTABanner } from "@/components/shared/cta-banner";
import { JsonLd } from "@/components/shared/json-ld";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "The Offer",
  description:
    "A credibility-first website design and build for premium service brands, engineered to make you look as established as you are so the right clients take you seriously and you can hold your prices.",
  alternates: {
    canonical: "https://joshuafrancis.ca/services",
  },
};

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Services",
  itemListElement: services.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Service",
      name: service.title,
      description: service.transformation ?? service.summary,
      url: `https://joshuafrancis.ca/services/${service.slug}`,
      provider: { "@type": "Person", name: "Joshua Francis" },
    },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesSchema} />
      <PageHeader
        title="One umbrella."
        accent="The result I lead with."
        subtitle="I make premium service brands look as established and credible as they actually are, so the right clients take them seriously and they can charge what they're worth. Here's how that's delivered, and exactly how it works."
      />
      <ServicesPreview />
      <CTABanner />
    </>
  );
}
