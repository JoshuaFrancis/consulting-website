import { MapPin, Clock, MessageSquare } from "lucide-react";
import { AnimatedSection } from "@/components/shared/animated-section";

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
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                Location
              </p>
              <p className="text-sm font-medium text-foreground">
                Toronto, Ontario
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                Response Time
              </p>
              <p className="text-sm font-medium text-foreground">
                Within 24 hours
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                Consultation
              </p>
              <p className="text-sm font-medium text-foreground">
                Free 30-minute call
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
