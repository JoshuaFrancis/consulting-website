import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { JsonLd } from "@/components/shared/json-ld";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";
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
        title="Book a call."
        accent="Or send a note."
        subtitle="Grab a free 30-minute discovery call, no pitch deck, no obligation. Prefer to write first? Use the form below."
      />

      {/* Primary: Cal.com discovery booking */}
      <Section className="pt-0">
        <AnimatedSection>
          <CalEmbed />
        </AnimatedSection>
      </Section>

      {/* Alternative: message form */}
      <Section className="pt-0">
        <AnimatedSection>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
            Rather send a message?
          </h2>
        </AnimatedSection>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16">
          <div className="md:col-span-3">
            <AnimatedSection>
              <ContactForm />
            </AnimatedSection>
          </div>
          <div className="md:col-span-2">
            <ContactInfo />
          </div>
        </div>
      </Section>
    </>
  );
}
