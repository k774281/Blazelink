"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import CtaLink from "./CtaLink";
import { contact, footer } from "@/app/_data/home";

const DWELL = 2600; // how long each rotating word holds before it leaves
const SLIDE = 0.2; // seconds for its in/out slide

/**
 * Contact and the footer proper, as one block that the page uncovers.
 *
 * The block is pinned to the bottom of the viewport behind <main>; scrolling the
 * last screen slides the page off it, so it is revealed rather than scrolled to,
 * and its contents lift into place as that happens. The spacer keeps the same
 * height in normal flow so the page still scrolls, and carries #contact so every
 * CTA on the page still has something real to anchor to.
 *
 * Pinning only makes sense while the block fits on screen — a fixed element
 * taller than the viewport would have its top edge permanently out of reach —
 * so on short viewports it falls back to sitting in the flow like any footer.
 */
export default function SiteFooter() {
  const [index, setIndex] = useState(0);
  const [height, setHeight] = useState(0);
  const [pinned, setPinned] = useState(false);

  const wordRef = useRef(null);
  const blockRef = useRef(null);
  const innerRef = useRef(null);
  const spacerRef = useRef(null);

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

  // Measure the block and decide whether it can be pinned.
  useLayoutEffect(() => {
    const measure = () => {
      const h = blockRef.current?.offsetHeight ?? 0;
      setHeight(h);
      setPinned(h > 0 && h <= window.innerHeight);
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (blockRef.current) ro.observe(blockRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // The lift. Tied to scroll rather than played once, so it runs every time the
  // block is uncovered — and runs backwards when the page scrolls away again.
  useLayoutEffect(() => {
    if (!pinned) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const inner = innerRef.current; // captured for the cleanup below
    const tween = gsap.fromTo(
      inner,
      { y: 96 },
      {
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: spacerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 0.4,
        },
      },
    );

    ScrollTrigger.refresh();
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(inner, { clearProps: "transform" });
    };
  }, [pinned, height]);

  return (
    <>
      {/* Holds the block's place in the flow, and is what #contact scrolls to. */}
      <div
        ref={spacerRef}
        id="contact"
        aria-hidden
        style={pinned ? { height } : undefined}
      />

      <footer
        ref={blockRef}
        className={pinned ? "fixed inset-x-0 bottom-0 z-0" : "relative z-0"}
      >
        <div ref={innerRef}>
          {/* Contact */}
          <div className="flex flex-col gap-[48px] bg-night px-6 py-16 md:px-10 lg:flex-row lg:items-center xl:px-[120px] xl:py-[72px]">
            <div className="flex flex-1 flex-col items-start">
              <div className="flex items-center gap-[10px] pb-[26px]">
                <p className="font-display text-[13px] font-bold text-white">預約諮詢</p>
                <p className="font-mono-brand text-[12px] font-bold tracking-[2.4px] text-brand-soft">CONTACT</p>
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

          {/* Footer proper */}
          <div className="bg-night-deep px-6 md:px-10 xl:px-[120px]">
            <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-10 py-[44px] md:flex-row md:items-start">
              <div className="flex w-full flex-col justify-center gap-[24px] md:w-[417px]">
                <div className="flex flex-col items-start gap-[4px]">
                  <div className="relative h-[84px] w-full max-w-[417px]">
                    <Image
                      src="/figma/logo-footer.webp"
                      alt="Blazelink 鏈客策略行銷"
                      fill
                      sizes="417px"
                      className="object-contain object-left"
                    />
                  </div>
                  <p className="font-display w-[300px] text-[16px] font-light tracking-[0.32px] text-footer-body">
                    {footer.address}
                  </p>
                </div>

                <div className="font-display flex flex-col items-start gap-[6px] text-[14px] font-light tracking-[0.28px] text-footer-body">
                  <p className="whitespace-pre-wrap">{footer.hours}</p>
                  <p>{footer.phone}</p>
                  <p>{footer.email}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-[72px]">
                {footer.columns.map((col) => (
                  <div key={col.title} className="flex flex-col items-start gap-[12px]">
                    <p className="font-mono-brand text-[20px] font-bold tracking-[4px] text-footer-head">{col.title}</p>
                    {col.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="font-display text-[16px] font-light text-footer-link transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 border-t border-solid border-white/12 py-[20px] text-footer-meta">
              <p className="font-display text-[12px] font-light">{footer.copyright}</p>
              <p className="font-mono-brand text-[11px] font-medium tracking-[1.54px]">{footer.wordmark}</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
