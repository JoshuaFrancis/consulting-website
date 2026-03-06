"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";

interface ScrollHeroProps {
  words?: string[];
  className?: string;
}

const DEFAULT_WORDS = [
  "strategize.",
  "design.",
  "prototype.",
  "build.",
  "train.",
  "ship.",
];

export function ScrollHeroSection({
  words = DEFAULT_WORDS,
  className,
}: ScrollHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      style={{ height: `${(words.length + 1) * 55}vh` }}
    >
      {/* Background — fixed behind sticky content */}
      <div className="sticky top-0 h-screen overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 hero-gradient opacity-50" />
        <GridPattern
          width={32}
          height={32}
          x={-1}
          y={-1}
          className="[mask-image:radial-gradient(600px_circle_at_center,white,transparent)] stroke-gray-300/40 fill-gray-300/10"
          squares={[
            [4, 4], [7, 2], [11, 6], [3, 8], [14, 3],
            [8, 10], [16, 7], [6, 12], [12, 1], [2, 14],
          ]}
        />
      </div>

      {/* Words — sticky centered, scroll drives active index */}
      <div className="sticky top-0 h-screen flex items-center justify-center -mt-[100vh]">
        <ul className="list-none p-0 m-0">
          {words.map((word, i) => (
            <WordItem
              key={i}
              word={word}
              index={i}
              total={words.length}
              scrollProgress={scrollYProgress}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

function WordItem({
  word,
  index,
  total,
  scrollProgress,
}: {
  word: string;
  index: number;
  total: number;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // Map scroll progress to which word is active
  // Each word gets an equal slice of the scroll range
  const wordStart = index / total;
  const wordEnd = (index + 1) / total;
  const wordMid = (wordStart + wordEnd) / 2;

  const color = useTransform(scrollProgress, (v) => {
    const dist = Math.abs(v - wordMid);
    const threshold = 0.5 / total;
    if (dist < threshold) {
      return "oklch(0.50 0.13 250)"; // accent
    }
    return "oklch(0.13 0.005 285 / 0.2)"; // faded
  });

  return (
    <motion.li
      className="text-[clamp(2.5rem,8vw,5rem)] font-semibold leading-[1.2]"
      style={{ color }}
    >
      {word}
    </motion.li>
  );
}
