import { Section } from "@/components/layout/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { JsonLd } from "@/components/shared/json-ld";

export const homeFaqs = [
  {
    question: "What can I expect from working with you?",
    answer:
      "A site that looks and reads like the business you've actually built, positioning, proof, and speed engineered to make premium buyers take you seriously before you ever speak. Past clients have seen real movement from it. One acting school saw a 24% jump in enrollment after launch, on almost no extra marketing, plus a perfect 100 PageSpeed score. Every business is different, so I won't promise a specific number for yours, but the site becomes something that actively works for you instead of quietly working against you.",
  },
  {
    question: "How long does it take?",
    answer:
      "A focused premium rebuild typically runs a few weeks, depending on scope and how much positioning and content work is needed. You'll have a clear timeline before we start, not a guess designed to make you commit.",
  },
  {
    question: "What happens on the first call?",
    answer:
      "We look at where your current site is creating doubt, what needs to change, and whether a rebuild would actually be worth it. If I don't think the site is the bottleneck, I'll tell you.",
  },
  {
    question: "I just had a redesign. Why didn't it work?",
    answer:
      "Most redesigns change how the site looks without changing what it signals. Prettier isn't the same as more trusted. The work here is engineering the credibility signals, proof, positioning, structure, speed, that actually decide whether a premium buyer takes you seriously in the first seconds.",
  },
  {
    question: "How is this different from hiring an agency?",
    answer:
      "An agency hands you a beautiful site through a chain of people, then leaves. I design and build it myself, so the premium positioning survives from first concept to live site, and I'm still here to own it afterwards. You're buying credibility engineering, not a decoration project.",
  },
  {
    question: "Couldn't I just use Squarespace or a cheaper freelancer?",
    answer:
      "You can, and for many businesses that's the right call. But your buyer is judging whether you're worth a premium fee, and a template that looks like everyone else's quietly answers that question for them. If your site's job is to justify your prices, it can't look like it was chosen to save money.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Premium, custom rebuilds are typically a five-figure investment, scoped to the firm on a call. When a single high-value client is worth tens of thousands to you, a site that wins more of them and lets you stop discounting pays for itself quickly. No blind quotes, we scope it together first.",
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
