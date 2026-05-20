"use client";

import { useEffect } from "react";

/**
 * Plays creative-wall videos only while they're inside the visible wall
 * window, and pauses everything else — so the GPU never decodes more than
 * one screenful at a time. Renders nothing.
 */
export function CreativeWallVideos() {
  useEffect(() => {
    const wall = document.querySelector<HTMLElement>(".creative-wall");
    if (!wall) return;

    const videos = Array.from(wall.querySelectorAll<HTMLVideoElement>("video"));
    if (videos.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            if (video.paused) video.play().catch(() => {});
          } else {
            if (!video.paused) video.pause();
          }
        }
      },
      // root = the wall itself, so only tiles in the 560px window count
      { root: wall, threshold: 0.1 },
    );

    videos.forEach((v) => io.observe(v));

    // Pause everything when the tab is hidden
    const onVisibility = () => {
      if (document.hidden) videos.forEach((v) => v.pause());
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return null;
}
