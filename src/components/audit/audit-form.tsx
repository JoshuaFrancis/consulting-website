"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type State = "idle" | "loading" | "done" | "error";

export function AuditForm() {
  const router = useRouter();
  const [state, setState] = useState<State>("idle");
  const [firstName, setFirstName] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") || "").trim();
    const first_name = String(data.get("first_name") || "").trim();
    setFirstName(first_name);

    if (!email) return;

    setState("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, first_name }),
      });
      if (!res.ok) throw new Error("Subscribe request failed");
      router.push("/audit/thank-you");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-2xl border border-border bg-card p-7 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground">
          You&apos;re in{firstName ? `, ${firstName}` : ""}.
        </h2>
        <p className="mt-2 text-muted-foreground leading-relaxed">
          The audit is on its way to your inbox. If it&apos;s not there in a
          couple of minutes, check your spam or promotions tab.
        </p>
        <p className="mt-5 text-sm text-muted-foreground">
          Prefer to skip ahead and just talk it through?{" "}
          <Link
            href="/contact"
            className="font-medium text-accent hover:underline underline-offset-4"
          >
            Book a free call
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="audit-first-name"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          First name
        </label>
        <input
          id="audit-first-name"
          type="text"
          name="first_name"
          placeholder="First name"
          autoComplete="given-name"
          required
          className="h-11 w-full rounded-lg border border-input bg-card px-3.5 text-base text-foreground shadow-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/25"
        />
      </div>

      <div>
        <label
          htmlFor="audit-email"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Email
        </label>
        <input
          id="audit-email"
          type="email"
          name="email"
          placeholder="you@company.com"
          autoComplete="email"
          required
          className="h-11 w-full rounded-lg border border-input bg-card px-3.5 text-base text-foreground shadow-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/25"
        />
      </div>

      <button
        type="submit"
        disabled={state === "loading"}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 text-base font-medium text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent/90 active:scale-[0.99] disabled:opacity-70"
      >
        {state === "loading" ? "Sending…" : "Send me the audit"}
        {state !== "loading" && <ArrowRight className="size-4" />}
      </button>

      <p className="text-xs text-muted-foreground">
        No spam. Unsubscribe anytime.
      </p>
      {state === "error" && (
        <p className="text-sm text-destructive">
          Something went wrong. Please try again, or{" "}
          <Link href="/contact" className="underline underline-offset-2">
            book a call
          </Link>
          .
        </p>
      )}
    </form>
  );
}
