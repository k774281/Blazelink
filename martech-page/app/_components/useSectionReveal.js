"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Reveals a section the first time it scrolls into view. Attach the returned ref
 * to the section, then mark the pieces inside it:
 *   [data-reveal-stagger] — its direct children fade up one after another
 *   [data-reveal-cards]   — same, but the children also zoom up to full size
 *   [data-fade]           — fades in where it stands
 * Targets are hidden by CSS only while scripting is on (see globals.css).
 */
export default function useSectionReveal() {
  const scope = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context((self) => {
      const scrollTrigger = {
        trigger: scope.current,
        start: "top 72%",
        once: true,
      };

      if (self.selector("[data-fade]").length) {
        gsap.fromTo(
          "[data-fade]",
          { opacity: 0 },
          { opacity: 1, duration: 0.9, ease: "power2.out", scrollTrigger },
        );
      }

      if (self.selector("[data-reveal-stagger] > *").length) {
        gsap.fromTo(
          "[data-reveal-stagger] > *",
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.12,
            scrollTrigger,
          },
        );
      }

      if (self.selector("[data-reveal-cards] > *").length) {
        gsap.fromTo(
          "[data-reveal-cards] > *",
          { opacity: 0, y: 28, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            ease: "power2.out",
            stagger: 0.12,
            scrollTrigger,
          },
        );
      }
    }, scope);

    return () => ctx.revert();
  }, []);

  return scope;
}
