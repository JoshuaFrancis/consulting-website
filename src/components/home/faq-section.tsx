import { Section } from "@/components/layout/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { JsonLd } from "@/components/shared/json-ld";

export const homeFaqs = [
  {
    question: "What does Joshua Francis do?",
    answer:
      "Joshua Francis is an AI consultant based in Toronto who helps startups and enterprises design, build, and ship AI products. He offers four core services: AI strategy and roadmapping, LLM implementation including RAG pipelines and agent development, AI education and training for teams, and UX/UI design for AI-powered products. Unlike most consultants, he designs, builds, and ships working products end-to-end.",
  },
  {
    question: "What is AI consulting?",
    answer:
      "AI consulting is a professional service that helps businesses identify where artificial intelligence can create measurable value, then designs and builds the systems to deliver it. A good AI consultant assesses AI readiness, selects appropriate technologies, architects LLM pipelines, and ships production-ready AI products. The role bridges business strategy and technical implementation, turning AI ambition into real systems.",
  },
  {
    question: "How much does AI consulting cost?",
    answer:
      "AI consulting fees vary based on scope and engagement model. AI strategy and roadmapping projects typically run as fixed-fee engagements over 2-4 weeks. LLM implementation projects run 4-12 weeks depending on complexity, including architecture, RAG pipelines, prompt engineering, and deployment. Joshua works with both fixed-fee and retainer arrangements. A free 30-minute consultation is the easiest way to scope your project.",
  },
  {
    question: "How do I hire an AI consultant?",
    answer:
      "Start by defining your goal: are you exploring where AI fits in your business, building a specific AI feature, training your team, or designing an AI product? Then look for someone whose track record matches that goal. Joshua Francis takes new engagements through a free 30-minute call with no pitch deck required — the goal of the call is to understand what you're building and decide together whether it's a fit.",
  },
];

const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export function FaqSection() {
  return (
    <>
      <JsonLd data={homeFaqSchema} />
      <Section className="bg-muted/30">
        <AnimatedSection>
          <p className="text-sm font-medium text-accent uppercase tracking-wider">
            FAQ
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Questions about{" "}
            <span className="text-muted-foreground">
              working together.
            </span>
          </h2>
        </AnimatedSection>

        <div className="mt-12 max-w-3xl space-y-10">
          {homeFaqs.map((faq, i) => (
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
    </>
  );
}
