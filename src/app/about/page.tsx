import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { CTABanner } from "@/components/shared/cta-banner";
import { Target, Users, BarChart3 } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description:
    "From finance at BMO to building AI products for businesses. I bring a rare mix of business, design, and engineering to every product I ship.",
};

const values = [
  {
    icon: Target,
    title: "Ship, Don't Slide",
    description:
      "I don't hand off a strategy deck and disappear. I design it, build it, and ship it. You get a working product, not a presentation about one.",
  },
  {
    icon: Users,
    title: "Design-Led, AI-Powered",
    description:
      "Most AI products are built by engineers and look like it. I come from design, so the products I build are ones people actually want to use.",
  },
  {
    icon: BarChart3,
    title: "Business-Aware",
    description:
      "I spent four years in finance before I ever touched design. I understand unit economics, ROI, and business cases, not just pixels and prompts.",
  },
];

const experience = [
  {
    role: "AI Consultant & Developer",
    company: "",
    period: "2024 to Present",
    description:
      "Helping businesses design, build, and ship AI products. Experienced across SaaS platforms, AI agents, and LLM-powered tools.",
  },
  {
    role: "AI Image Course Instructor",
    company: "Uplimit",
    period: "2024",
    description:
      "Designed and taught an AI image creation course that earned a perfect 100/100 feedback score, 89 NPS, and 74.5% completion rate.",
  },
  {
    role: "Founding Design Lead",
    company: "SynthMinds",
    period: "2023 to 2024",
    description:
      "Built the brand identity and web platform for an AI consulting firm serving NVIDIA, PwC, HP, and Kraft Heinz. Led design strategy across consulting, education, and product.",
  },
  {
    role: "Freelance Product Designer",
    company: "",
    period: "2021 to 2024",
    description:
      "Designed and shipped products for startups and enterprises, including conversion-focused websites and AI-powered SaaS tools like RoomLab.",
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
      <PageHeader
        title="About"
        accent="Joshua Francis"
        subtitle="From finance to design to AI. I've worked across all three, and that's what makes the products I build different."
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
                I started my career in finance at BMO and State Street,
                building financial models, automating reporting processes,
                and analyzing data. That&apos;s where I learned how businesses
                actually work, and it gave me a foundation most designers
                and developers don&apos;t have.
              </p>
              <p>
                I moved into product design because I wanted to build things
                people use, not just analyze them. I spent years designing
                products as a freelancer, then joined{" "}
                <a href="https://synthminds.ai" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline underline-offset-4">
                  SynthMinds
                </a>
                {" "}as founding design lead, where I built the brand and
                platform for an AI consulting firm serving NVIDIA, PwC, and
                Kraft Heinz.
              </p>
              <p>
                Now I help businesses build and ship AI products. I&apos;ve
                designed AI systems at enterprise scale, built{" "}
                <a href="https://www.roomlab.ca" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline underline-offset-4">
                  RoomLab
                </a>
                {" "}from idea to live SaaS product, and taught AI image
                creation to professionals at Uplimit.
              </p>
              <p>
                When I consult, you get someone who understands the business
                case, can design the experience, and can build and ship the
                product. That&apos;s not typical, and it&apos;s why the things
                I build actually work.
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
            <AnimatedSection key={item.period} delay={i * 0.1}>
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

      <CTABanner
        heading="Let's work together."
        subheading="I'm currently available for new consulting engagements."
        buttonText="Get in Touch"
      />
    </>
  );
}
