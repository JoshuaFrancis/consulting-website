"use client";

import { useRef, useEffect, useState } from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const el = ref.current;
    if (!el) return;

    // If element is already in viewport on mount, show immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "-40px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Before JS hydrates, content is fully visible (no scroll-fade class)
  const fadeClass = mounted ? `scroll-fade${isVisible ? " visible" : ""}` : "";

  return (
    <div
      ref={ref}
      className={`${fadeClass}${className ? ` ${className}` : ""}`.trim() || undefined}
      style={mounted && !isVisible ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
