"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { footer } from "@/app/_data/home";

/**
 * The closing block every page shares: a page-specific panel passed as children,
 * sitting on top of the footer proper.
 *
 * The block is pinned to the bottom of the viewport behind <main>; scrolling the
 * last screen slides the page off it, so it is revealed rather than scrolled to,
 * and its contents lift into place as that happens. The spacer keeps the same
 * height in normal flow so the page still scrolls. It keeps the #contact id it
 * was given when the CTAs anchored here rather than at /contact, so anything
 * already linking to /#contact still lands somewhere sensible.
 *
 * A block taller than the viewport cannot simply be pinned to the bottom: its
 * top edge would sit permanently out of reach. Those anchor to the top instead
 * and are revealed from there, then the part that does not fit is carried up
 * past the viewport over the rest of the spacer — so the effect is the same at
 * every size, rather than only on screens the block happens to fit.
 *
 * `onThisPage` overrides the first link column, which names the sections of
 * whichever page the footer is closing; pass null on a page that has no
 * sections of its own to leave the column out. `children` is optional too —
 * the contact page is its own closing panel and needs nothing above the
 * footer proper.
 */
const LIFT = 96; // how far the block rises as the page uncovers it

export default function SiteFooter({ children, onThisPage }) {
  const [height, setHeight] = useState(0);
  const [viewport, setViewport] = useState(0);
  const [pinned, setPinned] = useState(false);

  const blockRef = useRef(null);
  const innerRef = useRef(null);
  const spacerRef = useRef(null);

  // What will not fit on screen, and so has to be scrolled through rather than
  // simply uncovered.
  const overflow = Math.max(0, height - viewport);

  const columns = [
    // undefined falls back to the homepage's sections; null leaves it out.
    onThisPage === null
      ? null
      : { title: "ON THIS PAGE", links: onThisPage ?? footer.onThisPage },
    { title: "SITEMAP", links: footer.sitemap },
  ].filter(Boolean);

  // Measure the block against the viewport it has to be revealed in.
  useLayoutEffect(() => {
    const measure = () => {
      const h = blockRef.current?.offsetHeight ?? 0;
      const vh = window.innerHeight;
      setHeight(h);
      setViewport(vh);
      // With motion turned down it stays an ordinary footer at the end of the page.
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setPinned(!reduced && h > 0 && vh > 0);
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
    gsap.registerPlugin(ScrollTrigger);

    const inner = innerRef.current; // captured for the cleanup below
    const scrollTrigger = {
      trigger: spacerRef.current,
      start: "top bottom",
      end: "bottom bottom",
      scrub: 0.4,
    };

    // The spacer is exactly as tall as the block, so its travel is `height`.
    // A block that fits spends all of it being uncovered; a taller one spends
    // one viewport being uncovered and the remainder carrying its overflow up.
    const anim =
      overflow > 0
        ? gsap
            .timeline({ scrollTrigger })
            .fromTo(
              inner,
              { y: LIFT },
              { y: 0, ease: "none", duration: viewport / height },
            )
            .to(inner, {
              y: -overflow,
              ease: "none",
              duration: overflow / height,
            })
        : gsap.fromTo(inner, { y: LIFT }, { y: 0, ease: "none", scrollTrigger });

    ScrollTrigger.refresh();
    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
      gsap.set(inner, { clearProps: "transform" });
    };
  }, [pinned, height, viewport, overflow]);

  return (
    <>
      {/* Holds the block's place in the flow; #contact is kept for old links. */}
      <div
        ref={spacerRef}
        id="contact"
        aria-hidden
        style={pinned ? { height } : undefined}
      />

      <footer
        ref={blockRef}
        className={
          pinned
            ? `fixed inset-x-0 z-0 ${overflow > 0 ? "top-0" : "bottom-0"}`
            : "relative z-0"
        }
      >
        <div ref={innerRef}>
          {children}

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
                {columns.map((col) => (
                  <div
                    key={col.title}
                    className="flex flex-col items-start gap-[12px]"
                  >
                    <p className="font-mono-brand text-[20px] font-bold tracking-[4px] text-footer-head">
                      {col.title}
                    </p>
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
              <p className="font-display text-[12px] font-light">
                {footer.copyright}
              </p>
              <p className="font-mono-brand text-[11px] font-medium tracking-[1.54px]">
                {footer.wordmark}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
