"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Reveals a section the first time it scrolls into view. Attach the returned ref
 * to the section, then mark the pieces inside it:
 *   [data-reveal-stagger] — its direct children fade up one after another
 *   [data-reveal-cards]   — same, but the children also zoom up to full size
 *   [data-door]           — swings open on a hinge at its left edge
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

      if (self.selector("[data-door]").length) {
        gsap.fromTo(
          "[data-door]",
          { rotationY: -92, opacity: 0 },
          {
            rotationY: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
            transformOrigin: "left center",
            scrollTrigger,
          },
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
