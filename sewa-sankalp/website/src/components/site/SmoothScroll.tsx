"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

/** Smooth wheel/trackpad scrolling on every page (off when user prefers reduced motion). */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        autoToggle: true,
        anchors: true,
        duration: 1.2,
        lerp: 0.08,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.35,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
