import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Ready to discuss your AI project? Book a free consultation or send me a message.",
};

export default function ContactPage() {
  return (
    <>
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
