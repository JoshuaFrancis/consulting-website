"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

/** Inline Cal.com "discovery" booking calendar, used on the contact page. */
export function CalEmbed() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "discovery" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <Cal
        namespace="discovery"
        calLink="joshua-francis/discovery"
        style={{ width: "100%", height: "100%", minHeight: "640px", overflow: "scroll" }}
        config={{ layout: "month_view" }}
      />
    </div>
  );
}
