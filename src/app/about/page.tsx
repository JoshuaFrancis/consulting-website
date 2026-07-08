import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { JsonLd } from "@/components/shared/json-ld";
import { CTABanner } from "@/components/shared/cta-banner";
import { Target, Users, BarChart3 } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description:
    "Joshua Francis designs and builds credibility-first websites for premium service brands. A Toronto-based designer and developer whose background spans enterprise AI at PolyAI, product design, and finance at BMO.",
  alternates: {
    canonical: "https://joshuafrancis.ca/about",
  },
};

const aboutPersonSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Joshua Francis",
  url: "https://joshuafrancis.ca",
  image: "https://joshuafrancis.ca/photo.png",
  jobTitle: "Designer & Developer",
  description:
    "Toronto-based designer and developer. Designs and builds credibility-first websites for premium service brands, so they look as established as they are and can hold their prices. Background spans enterprise AI at PolyAI, product design, and finance at BMO.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Toronto",
    addressRegion: "Ontario",
    addressCountry: "CA",
  },
  alumniOf: {
    "@type": "Organization",
    name: "BMO Financial Group",
  },
  sameAs: [
    "https://www.linkedin.com/in/joshuafrancis1/",
    "https://www.youtube.com/@JoshFrancisAI",
    "https://x.com/uxbyjosh",
  ],
  knowsAbout: [
    "Website Design for Premium Brands",
    "Brand Credibility & Positioning",
    "Conversion-focused Web Development",
    "Product & UX Design",
    "Conversational AI & Agent Design",
    "Enterprise AI Product Design",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Website Designer & Developer",
    occupationLocation: {
      "@type": "Country",
      name: "Canada",
    },
    description:
      "Designs and builds credibility-first websites for premium service brands, as one accountable owner across design and development.",
  },
};

const aboutFaqs = [
  {
    question: "Who is Joshua Francis?",
    answer:
      "Joshua Francis is a Toronto-based designer and developer who builds credibility-first websites for premium service brands. He designs and builds each site himself, as one accountable owner, so the finished website looks as established as the business behind it. His background spans finance at BMO Financial Group, product design, and enterprise AI, including work as an Agent Designer at PolyAI.",
  },
  {
    question: "Where is Joshua Francis based?",
    answer:
      "Joshua Francis is based in Toronto, Ontario, Canada. He works with clients across Canada and the United States, both remotely and on-site in the Greater Toronto Area.",
  },
  {
    question: "What is Joshua Francis's background?",
    answer:
      "Joshua started his career as a senior analyst in finance at BMO Financial Group from 2017 to 2021, where he led reporting automation that saved roughly $25K annually. He moved into product design, then worked in enterprise AI, as an Agent Designer at PolyAI and as Chief Design Officer at Synthminds, building the brand and platform for an AI consulting firm serving NVIDIA, PwC, HP, and Kraft Heinz. He now designs and builds credibility-first websites for premium service brands.",
  },
  {
    question: "What makes Joshua Francis different from other web designers?",
    answer:
      "Most website projects pass through a chain of people, an agency designs it, a developer builds it, and no one owns the result. Joshua designs and builds the whole thing himself, so the premium positioning survives from first concept to live site. His unusual range, finance, enterprise AI, and product design, means he engineers credibility into the site rather than just decorating it.",
  },
  {
    question: "What work has Joshua Francis done?",
    answer:
      "Joshua rebuilt the website for Shiki Studios, a Toronto acting school, and built the brand and platform for Synthminds, an AI consulting firm serving NVIDIA, PwC, HP, and Kraft Heinz. In enterprise AI, he designed conversational agents at PolyAI, taught an AI image creation course at Uplimit that earned a perfect 100/100 score, and shipped RoomLab as a solo SaaS product.",
  },
];

const aboutFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: aboutFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const values = [
  {
    icon: Target,
    title: "One owner, end to end",
    description:
      "I design it and I build it. No handoff between a designer and a developer, no finger-pointing. One person accountable for how the site looks and how it works.",
  },
  {
    icon: Users,
    title: "Design-led, built to convert",
    description:
      "Most sites are either pretty or functional. I come from product design and enterprise AI, so the sites I build look premium and are engineered to turn visitors into clients.",
  },
  {
    icon: BarChart3,
    title: "Business-aware",
    description:
      "I spent four years in finance before I ever touched design. I understand ROI, pricing power, and why credibility is a business asset, not decoration.",
  },
];

const experience = [
  {
    role: "Website Design & Development",
    company: "Independent",
    period: "2021 to Present",
    description:
      "Design and build credibility-first websites for premium service brands, engineered to make them look as established as they are. Recent work includes Shiki Studios and the Synthminds brand platform.",
  },
  {
    role: "Agent Designer",
    company: "PolyAI",
    period: "2024 to 2026",
    description:
      "Designed conversational AI agents for enterprise voice assistants, shaping how large brands' customers experience automated support at scale.",
  },
  {
    role: "AI Image Course Instructor",
    company: "Uplimit",
    period: "2024",
    description:
      "Designed and taught an AI image creation course that earned a perfect 100/100 feedback score, 89 NPS, and 74.5% completion rate.",
  },
  {
    role: "Chief Design Officer",
    company: "Synthminds",
    period: "2023 to 2024",
    description:
      "Built the brand identity and web platform for an AI consulting firm serving NVIDIA, PwC, HP, and Kraft Heinz. Led design strategy across consulting, education, and product.",
  },
  {
    role: "Senior Analyst, Finance",
    company: "BMO Financial Group",
    period: "2017 to 2021",
    description:
      "Led automation of reporting processes saving ~$25K annually. Tested and provided UX feedback on pre-release S/4 HANA updates. Built financial models for FX-denominated asset and P&L verification.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutPersonSchema} />
      <JsonLd data={aboutFaqSchema} />
      <PageHeader
        title="About"
        accent="Joshua Francis"
        subtitle="From finance to enterprise AI to design. That range is what lets me engineer credibility into a website, not just decorate it."
      />

      {/* Bio */}
      <Section className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          <AnimatedSection>
            <div className="aspect-[4/5] rounded-lg overflow-hidden relative">
              <Image
                src="/photo.png"
                alt="Joshua Francis"
                fill
                className="object-cover"
                priority
              />
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                I started my career in finance at BMO, building financial
                models, automating reporting, and analyzing data. That&apos;s
                where I learned how businesses actually work, and it gave me a
                foundation most designers and developers don&apos;t have.
              </p>
              <p>
                I moved into product design because I wanted to build things
                people use, not just analyze them. That took me into enterprise
                AI, designing conversational agents at{" "}
                <span className="text-foreground font-medium">PolyAI</span> and
                joining{" "}
                <a href="https://synthminds.ai" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline underline-offset-4">
                  Synthminds
                </a>
                {" "}as Chief Design Officer, where I built the brand and
                platform for an AI consulting firm serving NVIDIA, PwC, and
                Kraft Heinz.
              </p>
              <p>
                Working at that level taught me what &ldquo;premium&rdquo;
                actually looks like, and how fast people judge a business by its
                website. So I now focus on one thing: designing and building
                credibility-first websites for premium service brands, the kind
                of site that makes a company look as established as it already
                is.
              </p>
              <p>
                When you work with me, you get one person who understands the
                business case, designs the experience, and builds and ships the
                site. No handoff, no committee. That&apos;s not typical, and
                it&apos;s why the sites I build actually move the business.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </Section>

      {/* Values */}
      <Section className="bg-muted/50">
        <AnimatedSection>
          <p className="text-sm font-medium text-accent uppercase tracking-wider">
            My Approach
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            How I work
          </h2>
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, i) => {
            const Icon = value.icon;
            return (
              <AnimatedSection key={value.title} delay={i * 0.1}>
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-md bg-accent/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </Section>

      {/* Experience */}
      <Section>
        <AnimatedSection>
          <p className="text-sm font-medium text-accent uppercase tracking-wider">
            Background
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Experience
          </h2>
        </AnimatedSection>

        <div className="mt-12 space-y-8">
          {experience.map((item, i) => (
            <AnimatedSection key={item.role} delay={i * 0.1}>
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12 pb-8 border-b border-border last:border-0">
                <div className="md:w-48 flex-shrink-0">
                  <span className="text-sm text-muted-foreground">
                    {item.period}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.role}
                  </h3>
                  {item.company && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.company}
                    </p>
                  )}
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-muted/30">
        <AnimatedSection>
          <p className="text-sm font-medium text-accent uppercase tracking-wider">
            FAQ
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            About Joshua Francis
          </h2>
        </AnimatedSection>

        <div className="mt-12 max-w-3xl space-y-10">
          {aboutFaqs.map((faq, i) => (
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
        heading="Let's work together."
        subheading="I'm currently taking on new website projects for premium service brands."
        buttonText="Book a call"
      />
    </>
  );
}
