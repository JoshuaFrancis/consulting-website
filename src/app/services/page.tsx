import type { Metadata } from "next";
import { ScrollHeroSection } from "@/components/ui/scroll-hero-section";
import { Section } from "@/components/layout/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { JsonLd } from "@/components/shared/json-ld";
import { CTABanner } from "@/components/shared/cta-banner";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "End-to-end AI consulting, from strategy to production deployment. AI strategy, LLM implementation, agent development, and UX/UI design.",
  alternates: {
    canonical: "https://joshuafrancis.ca/services",
  },
};

const faqs = [
  {
    question: "What does an AI consultant do?",
    answer:
      "An AI consultant helps businesses identify where artificial intelligence can create measurable value, then designs and builds the systems to deliver it. This includes assessing AI readiness, selecting the right technologies, architecting LLM pipelines, and shipping production-ready AI products. A good AI consultant bridges the gap between business strategy and technical implementation.",
  },
  {
    question: "How long does an AI implementation typically take?",
    answer:
      "AI implementation timelines vary based on complexity. An AI strategy and roadmap typically takes 2-4 weeks. LLM implementation projects run 4-12 weeks for production deployment, including architecture design, RAG pipeline development, prompt engineering, and monitoring setup. Simpler integrations like adding AI features to an existing product can ship in as little as 2-3 weeks.",
  },
  {
    question: "Do I need AI for my business?",
    answer:
      "Not every business needs AI, but most can benefit from it. AI is worth exploring if you have repetitive processes that could be automated, large volumes of unstructured data, customer-facing workflows that need personalization, or content creation needs at scale. The best approach is an AI readiness assessment that evaluates your specific opportunities and their potential ROI before committing to implementation.",
  },
  {
    question: "What's the difference between AI strategy and LLM implementation?",
    answer:
      "AI strategy is the planning phase: identifying which AI opportunities will create the most business value, selecting technologies, and building a roadmap with milestones. LLM implementation is the building phase: architecting systems, developing RAG pipelines, engineering prompts, fine-tuning models, and deploying to production. Strategy answers 'what should we build and why.' Implementation answers 'how do we build it and ship it.'",
  },
  {
    question: "What industries do you work with?",
    answer:
      "I work across industries including technology, SaaS, education, real estate, financial services, and professional services. My clients range from early-stage startups building their first AI product to enterprise companies integrating AI into existing workflows. The common thread is organizations that want to move from AI ambition to production reality with a hands-on partner who designs, builds, and ships.",
  },
  {
    question: "How is your approach different from other AI consultants?",
    answer:
      "Most AI consultants deliver strategy decks and leave. I design, build, and ship working products. I combine business experience from finance at BMO, product design expertise, and engineering capability, so you get one person who understands the business case, can design the user experience, and can build and deploy the technical solution. You get a working product, not a presentation about one.",
  },
];

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "AI Consulting Services",
  description:
    "End-to-end AI consulting services offered by Joshua Francis, from strategy to production deployment.",
  itemListElement: services.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Service",
      name: service.title,
      description: service.description,
      provider: {
        "@type": "Person",
        name: "Joshua Francis",
        url: "https://joshuafrancis.ca",
      },
      url: `https://joshuafrancis.ca/services#${service.slug}`,
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
            What I do.{" "}
            <span className="font-serif italic text-muted-foreground">
              And how.
            </span>
          </h2>
        </AnimatedSection>

        <div className="mt-14 space-y-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <AnimatedSection key={service.slug} delay={i * 0.08}>
                <div
                  id={service.slug}
                  className="gradient-border rounded-2xl p-8 md:p-10 scroll-mt-24"
                >
                  <div className="grid grid-cols-1 md:grid-cols-[1fr,1px,1fr] gap-8 md:gap-10">
                    {/* Left: description */}
                    <div>
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                          <Icon className="w-4.5 h-4.5 text-accent" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground">
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                      <p className="mt-5 text-sm text-muted-foreground/70 italic">
                        {service.typicalEngagement}
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="hidden md:block bg-border" />

                    {/* Right: includes + who it's for */}
                    <div>
                      <ul className="space-y-2.5">
                        {service.includes.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm text-muted-foreground"
                          >
                            <div className="w-1 h-1 rounded-full bg-accent mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-6 text-sm text-foreground/60 leading-relaxed border-t border-border pt-5">
                        {service.whoItsFor}
                      </p>
                    </div>
                  </div>
                </div>
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
            <span className="font-serif italic">works.</span>
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
            <span className="font-serif italic">questions.</span>
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
