import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { JsonLd } from "@/components/shared/json-ld";
import { CalEmbed } from "@/components/booking/cal-embed";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a free consultation with Joshua Francis, Toronto-based designer & developer. Credibility-first websites for premium service brands, designed and built end-to-end by one owner.",
  alternates: {
    canonical: "https://joshuafrancis.ca/contact",
  },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Joshua Francis",
  description:
    "Get in touch with Joshua Francis about a credibility-first website for your premium service brand, designed and built end-to-end by one accountable owner.",
  url: "https://joshuafrancis.ca/contact",
  mainEntity: {
    "@type": "Person",
    name: "Joshua Francis",
    jobTitle: "Designer & Developer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Toronto",
      addressRegion: "Ontario",
      addressCountry: "CA",
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactPageSchema} />
      <PageHeader
        title="Let's find where your site is costing you trust."
        subtitle="Book a free 30-minute consultation. We'll look at where premium buyers may be hesitating, what needs to change, and whether a credibility-first rebuild is the right move. No pitch deck."
        className="pb-8 md:pb-10"
      />

      {/* Primary: Cal.com discovery booking */}
      <Section className="pt-0 md:pt-0">
        <AnimatedSection>
          <CalEmbed />
        </AnimatedSection>
      </Section>
    </>
  );
}
