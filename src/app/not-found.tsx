import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/section";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <Section className="flex min-h-[72vh] items-center">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent">
          404
        </p>
        <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight text-foreground leading-[1.05] text-balance">
          This page is missing. Your first impression{" "}
          <span className="text-em">shouldn&apos;t be.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-lg text-muted-foreground leading-relaxed">
          The link is broken or the page has moved. Let&apos;s get you back to
          something that works.
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white shadow-lg shadow-accent/20 transition-all duration-200 hover:bg-accent/90 active:scale-95"
          >
            Back to home
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </Section>
  );
}
