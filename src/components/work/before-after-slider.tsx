"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { ImageIcon, MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

function Panel({
  src,
  alt,
  kind,
}: {
  src?: string;
  alt: string;
  kind: "before" | "after";
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        draggable={false}
        className="pointer-events-none object-cover object-top"
        sizes="(max-width: 1024px) 100vw, 1024px"
      />
    );
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#0b0b0f] text-white/40">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-dashed border-white/20">
        <ImageIcon className="h-5 w-5" />
      </div>
      <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
        {kind} screenshot
      </span>
    </div>
  );
}

export function BeforeAfterSlider({
  before,
  after,
  title,
}: {
  before?: string;
  after?: string;
  title?: string;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <div>
      {title && (
        <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {title}
        </div>
      )}
      <div
        ref={ref}
        className="group relative aspect-[16/9] w-full cursor-ew-resize select-none overflow-hidden rounded-2xl border border-border shadow-xl"
        style={{ touchAction: "none" }}
        onDragStart={(e) => e.preventDefault()}
        onPointerDown={(e) => {
          dragging.current = true;
          (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
          move(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && move(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        {/* after (full) */}
        <div className="absolute inset-0">
          <Panel src={after} alt="After" kind="after" />
        </div>
        {/* before (clipped to the left of the handle) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Panel src={before} alt="Before" kind="before" />
        </div>

        {/* labels */}
        <span className="pointer-events-none absolute left-3 bottom-3 rounded-full bg-black/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/80 backdrop-blur">
          Before
        </span>
        <span className="pointer-events-none absolute right-3 bottom-3 rounded-full bg-accent px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white">
          After
        </span>

        {/* divider + handle */}
        <div
          className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.4)]"
          style={{ left: `${pos}%` }}
        >
          <div
            className={cn(
              "absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white text-foreground shadow-lg transition-transform",
              "group-hover:scale-105"
            )}
          >
            <MoveHorizontal className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
