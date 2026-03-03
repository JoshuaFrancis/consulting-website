import { Mail, Linkedin, Github, MapPin } from "lucide-react";
import { AnimatedSection } from "@/components/shared/animated-section";

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@joshuafrancis.co",
    href: "mailto:hello@joshuafrancis.co",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "joshuafrancis",
    href: "https://linkedin.com/in/joshuafrancis",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "joshuafrancis",
    href: "https://github.com/joshuafrancis",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "San Francisco, CA",
    href: undefined,
  },
];

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <AnimatedSection delay={0.1}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <span className="text-sm font-medium text-foreground">
            Available for new projects
          </span>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.15}>
        <div className="space-y-6">
          {contactMethods.map((method) => {
            const Icon = method.icon;
            const content = (
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    {method.label}
                  </p>
                  <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                    {method.value}
                  </p>
                </div>
              </div>
            );

            if (method.href) {
              return (
                <a
                  key={method.label}
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    method.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  {content}
                </a>
              );
            }

            return <div key={method.label}>{content}</div>;
          })}
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <div className="mt-8 p-6 rounded-lg bg-muted/50 border border-border">
          <h3 className="text-sm font-semibold text-foreground">
            Prefer to talk?
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Book a free 30-minute consultation to discuss your AI project and see
            if we&apos;re a good fit.
          </p>
          <a
            href="mailto:hello@joshuafrancis.co?subject=Consultation%20Request"
            className="mt-3 inline-block text-sm font-medium text-accent hover:underline underline-offset-4"
          >
            Schedule a call →
          </a>
        </div>
      </AnimatedSection>
    </div>
  );
}
