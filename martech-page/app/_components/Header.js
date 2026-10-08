"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import CtaPill from "./CtaPill";
import { nav } from "@/app/_data/home";
import { asset } from "../_lib/base";

const WIPE = 0.28; // seconds each half of the MENU/CLOSE wipe takes

export default function Header() {
  // The header is a pill sized to its own contents and centred on the page.
  // Once the page scrolls it drops 20px and turns frosted so it reads as a
  // floating bar over whatever is passing underneath.
  const [atTop, setAtTop] = useState(true);

  // Below md the nav and the CTA move into a dropdown behind a MENU toggle.
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState("MENU");
  const wipeRef = useRef(null);
  const panelRef = useRef(null);
  const busyRef = useRef(false);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    gsap.set(panelRef.current, { autoAlpha: 0, y: -8 });
  }, []);

  useEffect(() => {
    // The menu covers the screen, so the page behind it should not scroll.
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    gsap.to(panelRef.current, {
      autoAlpha: open ? 1 : 0,
      y: open ? 0 : -8,
      duration: 0.25,
      ease: "power2.out",
    });
  }, [open]);

  /*
   * One click runs a wipe: the left border grows right until it covers the
   * button, the label is swapped while it is hidden underneath, then the block
   * collapses back to the left and the new word is uncovered behind it.
   */
  const toggle = () => {
    const next = !open;

    if (busyRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOpen(next);
      setLabel(next ? "CLOSE" : "MENU");
      return;
    }

    busyRef.current = true;
    gsap
      .timeline({ onComplete: () => (busyRef.current = false) })
      .to(wipeRef.current, { scaleX: 1, duration: WIPE, ease: "power2.in" })
      .add(() => {
        setOpen(next);
        setLabel(next ? "CLOSE" : "MENU");
      })
      .to(wipeRef.current, { scaleX: 0, duration: WIPE, ease: "power2.out" });
  };

  const closeMenu = () => {
    if (!open) return;
    setOpen(false);
    setLabel("MENU");
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 flex justify-center transition-transform duration-300 ${
          atTop ? "" : "md:translate-y-[20px]"
        }`}
      >
        <div className="relative w-full md:w-auto md:max-w-full">
          {/*
          Below md this is a full-width frosted bar, blurred at any scroll
          position. From md up it becomes the floating pill, which only frosts
          once the page has moved. The border stays declared in both states so
          the box never shifts.
        */}
          <div
            className={`absolute inset-0 border-b border-solid border-black/5 bg-white/70 backdrop-blur-md transition-all duration-300 md:rounded-[50px] md:border ${
              atTop
                ? "md:border-transparent md:bg-white md:backdrop-blur-none"
                : "md:border-black/5 md:bg-white/70 md:backdrop-blur-md"
            }`}
          />

          <div className="relative flex h-[var(--header-h)] items-center justify-between gap-[24px] px-6 md:justify-start md:gap-[56px] md:px-[24px]">
            <Link
              href="/"
              className="relative block h-[31px] w-[120px] shrink-0"
              onClick={closeMenu}
            >
              <Image
                src={asset("/figma/logo-lockup.webp")}
                alt="Blazelink 鏈客策略行銷"
                fill
                sizes="120px"
                className="object-contain"
                priority
              />
            </Link>

            <nav className="hidden items-center gap-[34px] md:flex">
              {nav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="underline-grow text-[15px] font-medium whitespace-nowrap text-ink transition-colors [--underline-offset:-6px] hover:text-brand"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* md and up: the CTA stays in the bar */}
            <div className="hidden md:block">
              <CtaPill href="/contact" compact>
                聯繫我們
              </CtaPill>
            </div>

            {/* below md: the MENU toggle */}
            <button
              type="button"
              onClick={toggle}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative isolate overflow-hidden border-l-2 border-solid border-ink py-[6px] pr-[2px] pl-[14px] md:hidden"
            >
              <span className="font-mono-brand text-[13px] font-bold tracking-[2.4px] text-ink">
                {label}
              </span>
              {/* Sits above the label so the swap happens genuinely out of sight. */}
              <span
                ref={wipeRef}
                aria-hidden
                className="absolute inset-0 z-10 origin-left scale-x-0 bg-ink"
              />
            </button>
          </div>
        </div>
      </header>

      {/*
      Full-screen menu. Kept outside <header> because the header takes a
      transform when it scrolls, which would otherwise make `fixed` resolve
      against it instead of the viewport.
    */}
      <div
        ref={panelRef}
        id="mobile-menu"
        className={`fixed inset-0 z-40 flex flex-col bg-white px-6 pb-12 md:hidden ${
          open ? "" : "pointer-events-none"
        }`}
        style={{ paddingTop: "calc(var(--header-h) + 56px)" }}
      >
        <nav className="flex flex-col items-start gap-[28px] text-left">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={closeMenu}
              className="font-display text-[34px] leading-tight font-bold tracking-[-0.5px] text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Sits straight under the last nav item, with a rule between them. */}
        <div className="mt-[32px] border-t border-solid border-line pt-[32px]">
          <CtaPill href="/contact" compact>
            聯繫我們
          </CtaPill>
        </div>
      </div>
    </>
  );
}
