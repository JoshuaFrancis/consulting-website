import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScrollHeroSection } from "@/components/ui/scroll-hero-section";
import { Section } from "@/components/layout/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { JsonLd } from "@/components/shared/json-ld";
import { CTABanner } from "@/components/shared/cta-banner";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Four ways to put AI to work for your business: Creative Studio, AI Agent, AI Apps, and AI Training. Retainer engagements, end-to-end.",
  alternates: {
    canonical: "https://joshuafrancis.ca/services",
  },
};

const faqs = [
  {
    question: "How do retainers work?",
    answer:
      "Most engagements are monthly retainers with a 3-month minimum. The first month is setup and deployment, then ongoing tuning, expansion, and support. You can pause or cancel after the initial period.",
  },
  {
    question: "Can you combine services?",
    answer:
      "Yes, most engagements blur the lines. An AI Agent build often folds in a custom internal tool, and a Creative Studio engagement usually includes Training so your team can run the workflow. Pricing scales with scope.",
  },
  {
    question: "What industries do you work with?",
    answer:
      "Most of my work is with founders, SMBs, agencies, and professional services. I avoid heavily regulated industries (healthcare, finance) unless the engagement has the right legal and compliance support in place.",
  },
  {
    question: "How is your approach different from other AI consultants?",
    answer:
      "Most AI consultants deliver strategy decks and leave. I design, build, ship, and operate. You get one person who handles the business case, the product design, the engineering, and the ongoing care of what we build together.",
  },
];

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "AI Consulting Services",
  description:
    "Productized AI consulting services offered by Joshua Francis.",
  itemListElement: services.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Service",
      name: service.title,
      description: service.summary,
      serviceType: service.title,
      provider: {
        "@type": "Person",
        name: "Joshua Francis",
        url: "https://joshuafrancis.ca",
      },
      url: `https://joshuafrancis.ca/services/${service.slug}`,
    },
  })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const processSteps = [
  {
    step: "01",
    title: "Understand",
    description:
      "I learn your business, your users, and what you've already tried.",
  },
  {
    step: "02",
    title: "Plan",
    description:
      "I figure out what's worth building and how to build it.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "I ship early, get feedback, and refine. You see working software, not status updates.",
  },
  {
    step: "04",
    title: "Refine",
    description:
      "After launch, I optimize what's working and fix what isn't.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesSchema} />
      <JsonLd data={faqSchema} />
      <ScrollHeroSection />

      {/* Services */}
      <Section>
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Four ways I can help.{" "}
            <span className="text-muted-foreground">
              Pick one.
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            Each engagement is productized so you know exactly what you&apos;re
            getting. Most clients start with one and add others as we go.
          </p>
        </AnimatedSection>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <AnimatedSection key={service.slug} delay={i * 0.06}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group block h-full rounded-2xl border border-border bg-card p-7 md:p-8 transition-all hover:border-accent/40 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-accent transition-colors" />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    {service.summary}
                  </p>

                  <div className="mt-6 pt-5 border-t border-border flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      {service.pricingFrom}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {service.shortTitle} →
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      </Section>

      {/* Process */}
      <Section className="bg-muted/30">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            How it{" "}
            <span className="text-em">works.</span>
          </h2>
        </AnimatedSection>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-6">
          {processSteps.map((step, i) => (
            <AnimatedSection key={step.title} delay={i * 0.1}>
              <div className="relative">
                <span className="text-5xl font-bold text-accent/10">
                  {step.step}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Frequently asked{" "}
            <span className="text-em">questions.</span>
          </h2>
        </AnimatedSection>

        <div className="mt-14 max-w-3xl space-y-10">
          {faqs.map((faq, i) => (
            <AnimatedSection key={faq.question} delay={i * 0.06}>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {faq.question}
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      <CTABanner
        heading="Have a project in mind?"
        subheading="Let's talk about what you're building and how I can help."
      />
    </>
  );
}
