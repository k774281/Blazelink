"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import CtaLink from "./CtaLink";
import Eyebrow from "./Eyebrow";
import { contact } from "@/app/_data/home";

const DWELL = 2600; // how long each rotating word holds before it leaves
const SLIDE = 0.2; // seconds for its in/out slide

/** The homepage's closing block — the top half of the reveal footer. */
export default function ContactPanel() {
  const [index, setIndex] = useState(0);
  const wordRef = useRef(null);

  // Rotating word: each slides up from below, holds, then leaves upward.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const enter = gsap.fromTo(
      wordRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: SLIDE, ease: "power1.inOut" },
    );

    const id = setTimeout(() => {
      gsap.to(wordRef.current, {
        opacity: 0,
        y: -50,
        duration: SLIDE,
        ease: "power1.inOut",
        onComplete: () => setIndex((i) => (i + 1) % contact.rotating.length),
      });
    }, DWELL);

    return () => {
      clearTimeout(id);
      enter.kill();
    };
  }, [index]);

  return (
    <div className="flex flex-col gap-[48px] bg-night px-6 py-16 md:px-10 lg:flex-row lg:items-center xl:px-[120px] xl:py-[72px]">
      <div className="flex flex-1 flex-col items-start">
        <div className="pb-[26px]">
          <Eyebrow zh="預約諮詢" en="CONTACT" tone="light" />
        </div>

        <div className="flex flex-col items-start gap-[6px]">
          <p className="font-display text-[36px] leading-[1.2] font-bold tracking-[-1.82px] text-white md:text-[52px]">
            {contact.headline}
          </p>
          <div className="h-[68px] w-full max-w-[420px] overflow-hidden">
            <p
              ref={wordRef}
              className="text-[36px] leading-[68px] font-bold tracking-[-1.82px] text-brand-soft md:text-[52px]"
            >
              {contact.rotating[index]}
            </p>
          </div>
        </div>

        <div className="h-[28px]" />

        <p className="font-display max-w-[520px] text-[16px] leading-[1.95] font-light text-contact-body">
          {contact.body}
        </p>
      </div>

      <CtaLink href="mailto:service@blazelink.co" tone="light" size="lg" gap={32}>
        {contact.cta}
      </CtaLink>
    </div>
  );
}
