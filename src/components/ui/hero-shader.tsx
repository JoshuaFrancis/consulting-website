"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { MeshGradient } from "@paper-design/shaders-react";

/**
 * Drives shader speed from real conditions: 0 when the container is
 * offscreen or the user prefers reduced motion (speed 0 cancels the
 * library's rAF loop entirely, so a paused shader costs nothing).
 */
function useShaderActive(ref: React.RefObject<HTMLDivElement | null>) {
  const [inView, setInView] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);

    const el = ref.current;
    let obs: IntersectionObserver | undefined;
    if (el) {
      obs = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
      obs.observe(el);
    }
    return () => {
      mq.removeEventListener("change", onChange);
      obs?.disconnect();
    };
  }, [ref]);

  return inView && !reduced;
}

/**
 * Reusable animated mesh layer with the pause guardrails built in.
 * Positions itself as an absolute fill inside a relative parent.
 */
export function MeshBackdrop({
  colors,
  speed,
  distortion = 0.8,
  swirl = 0.15,
  className,
}: {
  colors: string[];
  speed: number;
  distortion?: number;
  swirl?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useShaderActive(ref);

  return (
    <div ref={ref} className={className ?? "absolute inset-0"} aria-hidden="true">
      <MeshGradient
        className="absolute inset-0 h-full w-full"
        colors={colors}
        speed={active ? speed : 0}
        distortion={distortion}
        swirl={swirl}
      />
    </div>
  );
}

interface ShaderBackgroundProps {
  children: React.ReactNode;
}

/**
 * Animated mesh-gradient hero backdrop (WebGL), tuned to the brand palette.
 * Full viewport height; content renders above the shader layers.
 */
export function ShaderBackground({ children }: ShaderBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useShaderActive(ref);

  return (
    <div ref={ref} className="relative min-h-svh w-full overflow-hidden bg-black">
      {/* Background shader layers */}
      <MeshGradient
        className="absolute inset-0 h-full w-full"
        colors={["#000000", "#2563ff", "#ffffff", "#0a1029", "#1e3a8a"]}
        speed={active ? 0.25 : 0}
        distortion={0.9}
        swirl={0.2}
      />
      <MeshGradient
        className="absolute inset-0 h-full w-full opacity-50"
        colors={["#000000", "#1e3a8a", "#2563ff", "#000000"]}
        speed={active ? 0.15 : 0}
        distortion={0.7}
        swirl={0.1}
      />
      {/* Readability scrim over the text side */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent"
        aria-hidden="true"
      />

      {children}
    </div>
  );
}
