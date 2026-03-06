"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function WhySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-32 md:py-44 px-6 md:px-8 bg-muted/30">
      <div ref={ref} className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={
            isInView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 30, filter: "blur(8px)" }
          }
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight leading-relaxed text-foreground"
        >
          AI is already transforming how businesses operate. Automating
          workflows, making{" "}
          <span className="font-serif italic text-accent">
            smarter decisions
          </span>
          , and shipping faster. The space is moving quickly, and the companies
          that move now won&apos;t just keep up. They&apos;ll{" "}
          <span className="font-serif italic text-accent">pull ahead</span>.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={
            isInView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 20, filter: "blur(6px)" }
          }
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="mt-8 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
        >
          Most companies know AI could improve their processes. They just
          don&apos;t know where to start. That&apos;s where I come in.
        </motion.p>
      </div>
    </section>
  );
}
