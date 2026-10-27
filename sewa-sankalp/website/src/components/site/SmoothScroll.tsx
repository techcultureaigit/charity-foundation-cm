"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

/** Buttery wheel/trackpad scrolling site-wide (respects reduced-motion via autoToggle). */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        autoToggle: true,
        anchors: true,
        duration: 1.15,
        smoothWheel: true,
        touchMultiplier: 1.2,
      }}
    >
      {children}
    </ReactLenis>
  );
}
