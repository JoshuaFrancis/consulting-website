"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { track } from "@vercel/analytics";
import { cn } from "@/lib/utils";

const CAL_LINK = "joshua-francis/discovery";
const CAL_NAMESPACE = "discovery";

interface BookButtonProps {
  children: React.ReactNode;
  className?: string;
  /** visual style */
  variant?: "solid" | "outline" | "inverted" | "link";
  /** optional context (e.g. self-audit selections) pre-filled into the booking notes */
  notes?: string;
}

/**
 * Opens the Cal.com "discovery" booking popup on click.
 * Single source of truth for every booking CTA across the site.
 */
export function BookButton({
  children,
  className,
  variant = "solid",
  notes,
}: BookButtonProps) {
  const calConfig = JSON.stringify(notes ? { layout: "month_view", notes } : { layout: "month_view" });
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50";
  const variants: Record<string, string> = {
    solid:
      "bg-accent text-accent-foreground px-5 py-2.5 shadow-lg shadow-accent/20 hover:bg-accent/90",
    outline:
      "border border-border bg-card px-5 py-2.5 text-foreground hover:bg-muted/60",
    inverted:
      "bg-white text-black px-5 py-2.5 shadow-lg hover:bg-white/90",
    link: "text-foreground border-b border-foreground/30 hover:border-foreground rounded-none pb-1",
  };

  return (
    <button
      type="button"
      data-cal-namespace={CAL_NAMESPACE}
      data-cal-link={CAL_LINK}
      data-cal-config={calConfig}
      onClick={() =>
        track("booking_open", {
          label: typeof children === "string" ? children : variant,
        })
      }
      className={cn(base, variants[variant], className)}
    >
      {children}
    </button>
  );
}
