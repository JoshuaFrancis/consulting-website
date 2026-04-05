import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { JsonLd } from "@/components/shared/json-ld";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Ready to discuss your AI project? Book a free consultation or send a message to Joshua Francis, AI consultant based in Toronto.",
  alternates: {
    canonical: "https://joshuafrancis.ca/contact",
  },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Joshua Francis",
  description:
    "Get in touch with Joshua Francis for AI consulting, LLM implementation, AI education, or UX/UI design for AI products.",
  url: "https://joshuafrancis.ca/contact",
  mainEntity: {
    "@type": "Person",
    name: "Joshua Francis",
    jobTitle: "AI Consultant & Developer",
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
        title="Get in Touch"
        subtitle="Ready to discuss your AI project? Book a free consultation or send me a message."
      />

      <Section className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16">
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
