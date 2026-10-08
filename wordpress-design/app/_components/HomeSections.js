"use client";

/*
 * Every homepage-only section, in page order. SideNav and SiteFooter stay in
 * their own files because they are reused across pages; nothing in here is.
 *
 * The file is a client module because three of these sections are interactive
 * (the backdrop's pointer light, the news ticker, the works rail). The static
 * sections ride along into the client bundle as a result — see the note in
 * app/page.js if that ever needs splitting back out.
 *
 * `process` is imported under another name: as a module-scope binding it would
 * otherwise shadow the global `process` for the whole file.
 */

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { beyond, hero, news, ownership, process as processData, works } from "../_data/home";
import { ColumnSection, Eyebrow, MotionButton, ViewMore } from "./ui";
import { asset } from "../_lib/base";

export { ColumnSection };

/* -------------------------------------------------------------------- hero */

const subscribeNever = () => () => {};
const isSafariClient = () => /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

/*
 * Hero backdrop: five gooey gradient blobs drifting over a dark base, the
 * pointer dragging a sixth one behind the cursor.
 *
 * Ported from the Aceternity "background gradient animation" with three changes
 * the hero needs:
 * - It is a backdrop, not a page. The root fills its positioned parent instead
 *   of the viewport, and the whole layer is pointer-events-none so the headline
 *   and buttons above it stay clickable.
 * - The custom properties live on the container, not document.body, so a second
 *   instance (or any other section) can set its own colours.
 * - The pointer blob follows on a rAF loop that parks itself once it has caught
 *   up. The upstream version advances one step per mousemove event, so it stalls
 *   mid-travel whenever the mouse stops. prefers-reduced-motion skips it.
 *
 * The drift animations themselves are CSS; see --animate-first..fifth in
 * globals.css, which is where Tailwind v4 keeps what a v3 config called
 * theme.extend.animation.
 */
export function BackgroundGradientAnimation({
  // Defaults are the web-dark palette, held dark enough that ink and teal copy
  // stays legible on top; hard-light over a near-black base screens upward fast.
  gradientBackgroundStart = "rgb(16, 12, 34)",
  gradientBackgroundEnd = "rgb(10, 10, 15)",
  firstColor = "112, 77, 227",
  secondColor = "96, 64, 196",
  thirdColor = "92, 150, 152",
  fourthColor = "70, 46, 160",
  fifthColor = "120, 90, 220",
  pointerColor = "186, 170, 238",
  size = "80%",
  blendingValue = "hard-light",
  interactive = true,
  className,
  containerClassName,
  children,
}) {
  const pointerRef = useRef(null);
  const containerRef = useRef(null);

  // Safari paints the SVG goo filter at a crawl; it gets a plain blur instead.
  // The check reads the browser rather than React state, so it goes through
  // useSyncExternalStore: false while server-rendering, the real answer on the
  // client, and no hydration mismatch in between.
  const isSafari = useSyncExternalStore(subscribeNever, isSafariClient, () => false);

  useEffect(() => {
    const blob = pointerRef.current;
    const host = containerRef.current?.parentElement;
    if (!interactive || !blob || !host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cur = null;
    let target = null;
    let raf = 0;

    const step = () => {
      if (!target) {
        raf = 0;
        return;
      }
      if (!cur) cur = { ...target };
      cur.x += (target.x - cur.x) / 20;
      cur.y += (target.y - cur.y) / 20;
      blob.style.transform = `translate(${Math.round(cur.x)}px, ${Math.round(cur.y)}px)`;
      // Within half a pixel of the cursor there is nothing left to animate.
      const done = Math.abs(target.x - cur.x) < 0.5 && Math.abs(target.y - cur.y) < 0.5;
      raf = done ? 0 : requestAnimationFrame(step);
    };

    const onMove = (event) => {
      const rect = host.getBoundingClientRect();
      target = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      if (!raf) raf = requestAnimationFrame(step);
    };

    host.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", onMove);
    };
  }, [interactive]);

  // Every blob is the same circle in the same place; only the fill and drift differ.
  // Tailwind reads class names as literal text, so each gradient is spelled out
  // rather than built from the colour name.
  const blob = "absolute h-[var(--size)] w-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [mix-blend-mode:var(--blending-value)]";

  return (
    <div
      ref={containerRef}
      aria-hidden
      style={{
        "--gradient-background-start": gradientBackgroundStart,
        "--gradient-background-end": gradientBackgroundEnd,
        "--first-color": firstColor,
        "--second-color": secondColor,
        "--third-color": thirdColor,
        "--fourth-color": fourthColor,
        "--fifth-color": fifthColor,
        "--pointer-color": pointerColor,
        "--size": size,
        "--blending-value": blendingValue,
      }}
      className={`pointer-events-none absolute inset-0 overflow-hidden bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))] ${containerClassName ?? ""}`}
    >
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div className={`h-full w-full blur-lg ${isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]"}`}>
        <div
          className={`${blob} animate-first [background:radial-gradient(circle_at_center,_rgba(var(--first-color),_0.8)_0,_rgba(var(--first-color),_0)_50%)_no-repeat] [transform-origin:center_center]`}
        />
        <div
          className={`${blob} animate-second [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat] [transform-origin:calc(50%-400px)]`}
        />
        <div
          className={`${blob} animate-third [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat] [transform-origin:calc(50%+400px)]`}
        />
        <div
          className={`${blob} animate-fourth opacity-70 [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat] [transform-origin:calc(50%-200px)]`}
        />
        <div
          className={`${blob} animate-fifth [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat] [transform-origin:calc(50%-800px)_calc(50%+800px)]`}
        />

        {interactive && (
          <div
            ref={pointerRef}
            className="absolute -top-1/2 -left-1/2 h-full w-full opacity-70 [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)]"
          />
        )}
      </div>

      {children ? <div className={className}>{children}</div> : null}
    </div>
  );
}

const NEWS_INTERVAL = 6000;

/** Hero's news card cycling through the three latest column posts. */
export function NewsTicker({ items }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = items.length;

  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), NEWS_INTERVAL);
    return () => clearInterval(id);
  }, [paused, count]);

  const go = (step) => setIndex((i) => (i + step + count) % count);
  const item = items[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="最新專欄"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="flex w-full flex-col gap-[18px] overflow-hidden rounded-[2px] bg-[rgba(68,67,70,0.7)] px-7 py-6 backdrop-blur-md sm:w-[400px]"
    >
      <div className="flex items-center justify-between text-[13px]">
        <p className="font-display font-semibold tracking-[0.2em] text-teal">NEWS</p>
        <p className="font-mono text-muted" aria-live="polite">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </p>
      </div>

      <Link key={index} href={item.href} className="flex min-h-[80px] animate-news-in flex-col gap-2.5">
        <p className="whitespace-pre font-mono text-[13px] text-muted">{`${item.date}  ・  ${item.category}`}</p>
        <p className="text-[17px] font-medium leading-[1.6] text-ink">{item.title}</p>
      </Link>

      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          {items.map((it, i) => (
            <button
              key={it.title}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`第 ${i + 1} 則`}
              aria-current={i === index}
              className={`h-1 cursor-pointer rounded-[4px] transition-all ${i === index ? "w-6 bg-lavender" : "w-2 bg-line"}`}
            />
          ))}
        </div>
        <div className="flex gap-4 font-display text-[15px] font-semibold text-ink">
          <button type="button" onClick={() => go(-1)} aria-label="上一則" className="cursor-pointer transition-colors hover:text-lavender">
            ←
          </button>
          <button type="button" onClick={() => go(1)} aria-label="下一則" className="cursor-pointer transition-colors hover:text-lavender">
            →
          </button>
        </div>
      </div>
    </section>
  );
}

/*
 * Hero. Below lg it is an ordinary stacked section. From lg up it becomes a
 * scroll stage: the section is two viewports tall, the contents stick to the
 * top for the first one, and scrolling drives --p from 0 to 1.
 *
 * Everything that moves reads --p in a calc(), so there is no per-frame style
 * writing beyond the one custom property:
 *   p = 0  the Figma frame — 291x364 reel beside the copy
 *   p = 1  the reel is 100vw x 56.25vw (16:9) and the copy has gone
 *
 * The copy and the news card fade out over the first half, and go invisible at
 * data-faded so their links stop taking clicks once they cannot be seen. The
 * nav keeps its own z-40, so the full-bleed reel passes under it.
 */
const OPEN = 0.65; // share of the stage's stuck travel spent opening the reel
const FADE = 0.35; // viewports of scrolling over which the phone backdrop goes black

export function Hero() {
  const track = useRef(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    // A scroll-linked zoom is motion; nothing below runs when that is declined.
    // Width is not checked: the driver feeds both layouts, and running it at
    // every size also means a resize across lg lands on the right one.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      // The stage stays stuck for one viewport of scrolling: the section is two
      // viewports tall and the stage is one. The open runs over the first OPEN
      // of that, so the rest is a hold with the reel full-bleed and centred —
      // without it the reel reaches full width on the very frame the stage comes
      // unstuck, and scrolls away before it can be seen.
      const scrolled = -el.getBoundingClientRect().top;
      const p = Math.min(1, Math.max(0, scrolled / (window.innerHeight * OPEN)));
      el.style.setProperty("--p", p.toFixed(4));
      el.dataset.faded = p > 0.5 ? "true" : "false";
      // Phones get no stage. There the reel is the hero's backdrop and --m only
      // darkens it, over a short scroll so it is gone as soon as the page moves.
      el.style.setProperty("--m", Math.min(1, Math.max(0, scrolled / (window.innerHeight * FADE))).toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    el.dataset.motion = "on";
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      delete el.dataset.motion;
      delete el.dataset.faded;
    };
  }, []);

  return (
    <section ref={track} style={{ "--p": 0, "--m": 0 }} className="group relative lg:h-[1080px] lg:data-[motion=on]:h-[200vh]">
      <div className="relative overflow-hidden bg-canvas lg:sticky lg:top-0 lg:h-[1080px] lg:group-data-[motion=on]:h-screen">
        {/* The hero light fades out as the reel opens, leaving the stage's own canvas
            behind it, so the bands above and below the full-bleed frame are flat page
            colour at p=1. Phones do this with --m on the scrim below instead. */}
        <BackgroundGradientAnimation containerClassName="lg:transition-opacity lg:duration-700 lg:group-data-[faded=true]:opacity-0" />
        {/* The showcase reel. On a phone it is the hero's backdrop, full bleed
            behind the copy. From lg up it is an aperture: at p=0 a portrait window
            showing the middle third of the 16:9 export, its sides cropped away,
            opening out until the full width is on screen at p=1.
            Size is a width plus an aspect-ratio, both resolved against the stage,
            so the frame never reaches past the content box the way 100vw does
            wherever the scrollbar takes up layout width. The end ratio is 1.955,
            not 16:9: that is 16:9 less the strip the watermark crop below takes
            off the bottom, so at p=1 the frame is exactly as wide as the video
            and nothing is cut off the sides.
            Vertically the frame is always centred on its own middle, and it is
            that middle that travels: 434.5px (176px + half the opening height)
            at p=0, the stage's centre line at p=1. Interpolating the top edge
            and the centring separately instead let it sag ~50px below the
            viewport's middle through the middle of the open. */}
        <div className="absolute left-0 top-0 h-full w-full overflow-hidden lg:h-auto lg:left-[calc(max(50%,720px)+(50%-max(50%,720px))*var(--p))] lg:top-[calc(434.5px+(50%-434.5px)*var(--p))] lg:aspect-[calc(0.5629+1.3925*var(--p))] lg:w-[calc(291px+(100%-291px)*var(--p))] lg:translate-x-[-50%] lg:translate-y-[-50%] lg:rounded-[calc(24px*(1-var(--p)))] lg:bg-surface-2 lg:shadow-[0_40px_120px_0_rgba(112,77,227,0.45)] lg:transition-shadow lg:duration-700 lg:group-data-[faded=true]:shadow-none">
          {/* The export carries a jitter.video badge in the bottom-right corner,
              from 92.5% of the height down. The video runs 10% taller than the
              frame and is anchored to its top, so the bottom 9.1% always falls
              outside the clip and takes the badge with it — at every value of
              --p, not just at the ends. Cropping by the frame's own aspect
              instead would let the badge flash into view mid-open, as soon as
              the frame grew wider than 1.37:1. A watermark-free export makes
              this plain h-full. */}
          <video
            className="absolute inset-x-0 top-0 h-[110%] w-full object-cover object-top"
            src={asset("/home/Orbit-Carousel-16x9.mp4")}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="案例網站畫面影片"
          />
        </div>

        {/* Phones only: a scrim that keeps the copy readable over the reel at rest
            and takes the hero to flat black as soon as the page starts moving. */}
        <div className="absolute inset-0 bg-canvas opacity-[calc(0.4+0.6*var(--m))] lg:hidden" />

        {/* Figma's bottom fade: the light dies into the page colour over the last 140px.
            It lifts as the reel opens up, so it never greys out the full-bleed frame. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[140px] bg-gradient-to-b from-transparent to-canvas lg:opacity-[calc(1-var(--p))]" />

        <Link href="/" className="absolute left-6 top-5 z-10 block lg:left-16 lg:top-[52px] lg:opacity-[calc(1-var(--p))]">
          <Image src={asset("/home/logo.png")} alt="BLAZELINK 鏈客" width={188} height={63} preload className="h-auto w-[140px] lg:w-[188px]" />
        </Link>

        <div className="relative flex flex-col gap-12 px-6 pb-16 pt-32 lg:absolute lg:inset-0 lg:block lg:p-0">
          <div className="flex flex-col gap-7 lg:absolute lg:left-[160px] lg:top-[176px] lg:z-10 lg:opacity-[clamp(0,calc(1-var(--p)*2),1)] lg:translate-y-[calc(var(--p)*-40px)] lg:group-data-[faded=true]:invisible">
            <h1 className="max-w-[520px] text-[32px] font-bold leading-[1.28] text-ink sm:text-[42px] lg:text-[56px]">
              {hero.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="max-w-[400px] text-lg leading-[1.8] text-teal">{hero.lead}</p>
            {/* items-center, and the outline button held to the CTA's 56px: stretched
                to a taller sibling, MotionButton grows but its 48px disc stays pinned
                to the top, leaving the arrow and label below the disc's centre. */}
            <div className="flex items-center gap-4">
              <MotionButton href={hero.primary.href} label={hero.primary.label} />
              <Link
                href={hero.secondary.href}
                className="flex h-14 items-center rounded-full border border-line px-8 text-[17px] font-medium text-ink transition-colors hover:border-muted"
              >
                {hero.secondary.label}
              </Link>
            </div>
          </div>

          <div className="lg:absolute lg:right-[64px] lg:top-[606px] lg:opacity-[clamp(0,calc(1-var(--p)*2),1)] lg:translate-y-[calc(var(--p)*-40px)] lg:group-data-[faded=true]:invisible">
            <NewsTicker items={news} />
          </div>

          <div
            className="hidden items-center gap-3.5 lg:absolute lg:bottom-[79px] lg:left-[160px] lg:flex lg:opacity-[clamp(0,calc(1-var(--p)*2),1)]"
            aria-hidden
          >
            <span className="h-px w-12 bg-muted" />
            <span className="font-display text-xs font-semibold tracking-[0.3em] text-muted">SCROLL</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 01 作品 */

const CARD = 310;
const GAP = 15;
const STEP = CARD + GAP;
const WORKS_INTERVAL = 5000;
const GLIDE = 800; // ms the rail takes to settle on the next card
const COPIES = 3;

// The rail carries three runs of the same cases and parks on the middle one, so
// it can be stepped or dragged past either end and be silently re-centred once
// it settles. That is what makes the loop endless in both directions rather
// than rewinding to the start when it reaches the last card.
// All three runs stay interactive: the rail settles on a different one as it
// loops, so there is no copy that can be marked away from assistive tech.
const SET = works.items.length * STEP;
const LOOP = Array.from({ length: COPIES }, (_, copy) => works.items.map((item, i) => ({ item, key: `${copy}-${i}` }))).flat();

/*
 * Shift the rail a whole run back into the middle copy. The content repeats, so
 * the jump is invisible. Snapping has to come off first: with snap-mandatory on,
 * the browser treats the write as a scroll it is free to re-snap, and pulls the
 * rail straight back to where it was.
 */
function recentreRail(el) {
  const over = el.scrollLeft >= 2 * SET;
  const under = el.scrollLeft < SET;
  if (!over && !under) return;
  el.style.scrollSnapType = "none";
  el.scrollLeft += over ? -SET : SET;
  requestAnimationFrame(() => {
    el.style.scrollSnapType = "";
  });
}

/**
 * 01 精選作品: a fixed intro column beside a rail of 310×373 cards that bleeds
 * off the right edge. The rail advances on its own, loops endlessly, and can be
 * dragged; prev/next step it a card at a time and the segmented bar tracks which
 * card leads.
 */
export function WorksCarousel() {
  const rail = useRef(null);
  const anim = useRef(0);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = works.items.length;

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    el.scrollLeft = SET;

    // Re-centring mid-flight would fight the glide, so the tween does its own;
    // this one is for the rail coming to rest after a drag.
    let settle;
    const onScroll = () => {
      setActive(((Math.round(el.scrollLeft / STEP) % count) + count) % count);
      if (anim.current) return;
      clearTimeout(settle);
      settle = setTimeout(() => recentreRail(el), 150);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(settle);
      el.removeEventListener("scroll", onScroll);
    };
  }, [count]);

  // Stop the tween on unmount; it holds a rAF and writes to the element.
  useEffect(() => () => cancelAnimationFrame(anim.current), []);

  /*
   * The rail is scrolled by hand rather than with behavior:"smooth", whose
   * duration and curve are the browser's to choose. Snapping is switched off for
   * the duration: with snap-mandatory on, each frame's scrollLeft write is a
   * scroll the browser may re-snap, which shows up as stutter.
   */
  const glide = (to) => {
    const el = rail.current;
    if (!el) return;
    cancelAnimationFrame(anim.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.scrollSnapType = "none";
      el.scrollLeft = to;
      el.style.scrollSnapType = "";
      recentreRail(el);
      return;
    }
    const from = el.scrollLeft;
    const delta = to - from;
    if (!delta) return;
    const t0 = performance.now();
    el.style.scrollSnapType = "none";
    const tick = (now) => {
      const t = Math.min(1, (now - t0) / GLIDE);
      el.scrollLeft = from + delta * (1 - Math.pow(1 - t, 3)); // easeOutCubic
      if (t < 1) {
        anim.current = requestAnimationFrame(tick);
        return;
      }
      anim.current = 0;
      el.style.scrollSnapType = "";
      recentreRail(el);
    };
    anim.current = requestAnimationFrame(tick);
  };

  // Steps are relative to where the rail actually sits, so a step landing during
  // a drag carries on from there instead of snapping back to a stored index.
  const stepBy = (n) => {
    const el = rail.current;
    if (!el) return;
    glide((Math.round(el.scrollLeft / STEP) + n) * STEP);
  };

  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => stepBy(1), WORKS_INTERVAL);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, count]);

  return (
    <section className="overflow-hidden px-6 py-24 lg:py-[160px] lg:pl-[160px] lg:pr-0">
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-[58px]">
        <div className="flex shrink-0 flex-col justify-between gap-10 lg:w-[195px]">
          <div>
            <Eyebrow>{works.eyebrow}</Eyebrow>
            <h2 className="font-mono text-[32px] font-medium leading-[1.3] text-ink lg:text-3xl">{works.title}</h2>
            <p className="mt-0 border-t border-muted pt-4 font-mono text-base leading-[1.7] text-muted">{works.lead}</p>
          </div>
        </div>

        <div
          className="min-w-0 flex-1"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <ul ref={rail} className="no-scrollbar flex snap-x snap-mandatory gap-[15px] overflow-x-auto lg:pr-[264px]">
            {LOOP.map(({ item, key }) => (
              <li key={key} className="relative h-[373px] w-[310px] shrink-0 snap-start overflow-hidden">
                {/* Cards are not links; the way on to the cases page is VIEW MORE alone. */}
                <Image src={item.image} alt="" fill sizes="310px" className="object-cover object-top" />
                <div className="absolute inset-x-0 bottom-0 h-[277px] bg-gradient-to-b from-black/0 to-black/90" />
                <div className="absolute bottom-0 left-0 px-[13px] pb-[25px]">
                  <h3 className={`whitespace-nowrap text-xl text-ink ${item.latin ? "font-display font-bold" : "font-mono font-medium"}`}>{item.name}</h3>
                  <p className="mt-2.5 inline-flex h-[21px] items-center bg-white/16 px-2.5 font-mono text-[13px] tracking-[0.1em] text-teal">{item.tag}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-[33px] flex flex-wrap items-center gap-[25px]">
            <div className="flex gap-[3px]">
              <button type="button" onClick={() => stepBy(-1)} aria-label="上一個作品" className="flex h-[39px] w-12 cursor-pointer items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20">
                <img src={asset("/home/arrow-prev.png")} alt="" width="10" height="9" />
              </button>
              <button type="button" onClick={() => stepBy(1)} aria-label="下一個作品" className="flex h-[39px] w-12 cursor-pointer items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20">
                <img src={asset("/home/arrow-next.png")} alt="" width="10" height="9" />
              </button>
            </div>
            <div className="hidden w-[437px] sm:flex" aria-hidden>
              {works.items.map((item, i) => (
                <span key={item.name} className={`h-px flex-1 ${i === active ? "bg-teal" : "bg-white/40"}`} />
              ))}
            </div>
            <ViewMore href={works.more.href} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 02 流程 */

// Height of the band each step keeps at the top once it is stuck: the card's top
// padding plus the "step NN" line. The next card parks exactly below it, so the
// stack reads as a list of step numbers with the live card under them.
const STACK = 96;

/*
 * 02 先設計、再開工. Four full-bleed panels that stack: each one sticks STACK
 * lower than the last, so every step number stays on screen while the card
 * under it is replaced. Everything but that number — name, image, copy, link —
 * dissolves as the following panel climbs over it, so the hand-off reads as a
 * cross-fade rather than a card sliding over another card's live content.
 */
export function ProcessSteps() {
  const list = useRef(null);
  const bodies = useRef([]);

  useEffect(() => {
    const el = list.current;
    if (!el) return;
    // A scroll-linked dissolve is motion; declining it leaves every panel legible.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = Array.from(el.children);
    let raf = 0;
    const update = () => {
      raf = 0;
      cards.forEach((card, i) => {
        const body = bodies.current[i];
        const next = cards[i + 1];
        if (!body || !next) return;
        // How much of this card's body the next panel has yet to cover, over the
        // body's own height: 1 while the next panel is a body away, 0 as it lands.
        const bodyTop = i * STACK + STACK;
        const span = Math.max(1, card.offsetHeight - STACK);
        const left = next.getBoundingClientRect().top - bodyTop;
        body.style.opacity = Math.min(1, Math.max(0, left / span)).toFixed(3);
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="flex flex-col gap-16 pt-24 lg:pt-[160px]">
      <header className="flex flex-col gap-4 px-6 lg:pl-[160px]">
        <Eyebrow>{processData.eyebrow}</Eyebrow>
        <h2 className="text-[32px] font-bold leading-[1.3] text-ink lg:text-3xl">{processData.title}</h2>
        <p className="text-base leading-[1.7] text-muted">{processData.lead}</p>
      </header>

      <ol ref={list} className="flex flex-col">
        {processData.steps.map((step, i) => (
          <li
            key={step.no}
            style={{ top: `${i * STACK}px` }}
            className={`sticky flex flex-col gap-5 overflow-hidden rounded-t-2xl border-t border-line px-6 pb-16 pt-9 lg:min-h-[620px] lg:pb-[120px] lg:pl-[160px] lg:pr-[264px] ${
              i === 0 ? "bg-canvas" : "bg-surface"
            }`}
          >
            {/* The one thing that survives the stack. */}
            <p className="font-mono text-[24px] leading-[52px] text-lavender">step {step.no}</p>

            <div ref={(node) => (bodies.current[i] = node)} className="flex flex-col gap-5">
              <h3 className={`text-[32px] text-ink ${i === 0 ? "font-mono font-medium" : "font-bold"}`}>{step.name}</h3>
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-[50px]">
                <div className="relative aspect-[561/340] w-full shrink-0 overflow-hidden lg:w-[561px]">
                  <Image src={step.image} alt="" fill sizes="(min-width: 1024px) 561px, 100vw" className="object-cover" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-2 pb-10 leading-[1.75] lg:pb-[88px]">
                    <p className="font-mono text-2xl text-white">{step.heading}</p>
                    <p className="text-base text-muted">{step.body}</p>
                  </div>
                  <ViewMore href="/about" />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ------------------------------------------------------------------ 03 資產 */

/** 03 資產屬於客戶: three photo-backed cards contrasting our handover with the usual lock-in. */
export function Ownership() {
  return (
    <section className="flex flex-col gap-16 px-6 py-24 lg:gap-24 lg:py-[160px] lg:pl-[160px] lg:pr-[264px]">
      <header className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-1 flex-col gap-4">
          <Eyebrow>{ownership.eyebrow}</Eyebrow>
          <h2 className="text-[32px] font-bold leading-[1.35] text-ink lg:text-3xl">{ownership.title}</h2>
        </div>
        <div className="flex flex-col gap-4">
          <p className="max-w-[480px] text-base leading-[1.75] text-muted">{ownership.lead}</p>
          <p className="font-display text-[80px] font-bold leading-none tracking-[-0.02em] text-surface-2 lg:text-[120px]" aria-hidden>
            YOURS.
          </p>
        </div>
      </header>

      <ul className="flex flex-col gap-4 border-y border-line-dark py-12 lg:flex-row lg:p-12">
        {ownership.rows.map((row) => (
          <li key={row.label} className="relative flex flex-1 flex-col justify-center gap-8 overflow-hidden rounded-[2px] border border-line bg-surface px-9 py-8">
            <Image src={row.image} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover opacity-20" />
            <h3 className="relative text-[18px] font-bold text-ink">{row.label}</h3>
            <div className="relative flex flex-col gap-10 text-center leading-[1.7]">
              <p className="font-mono text-2xl font-medium text-teal lg:text-[24px]">{row.ours}</p>
              <p className="whitespace-pre-wrap font-mono text-base text-muted line-through">{`✕  傳統做法：${row.theirs}`}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------------------------------------------------------------- 04 不只網站 */

/** 04 不只是網站: a centred teaser pointing to the custom-build and creative cases. */
export function Beyond() {
  return (
    <section className="relative flex flex-col items-center gap-4 overflow-hidden px-6 py-24 text-center lg:py-[120px] lg:pl-[160px] lg:pr-[264px]">
      <Image src={asset("/home/bg-1.webp")} alt="" fill sizes="100vw" className="-z-10 object-cover" />
      {/* The art is dark but uneven; the scrim keeps the muted body copy legible over its bright spots. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-canvas/60" />

      <Eyebrow>{beyond.eyebrow}</Eyebrow>
      <p className="font-mono text-[32px] font-medium leading-[1.3] text-ink">{beyond.kicker}</p>
      <h2 className="font-mono text-[32px] font-medium leading-[1.3] text-ink lg:text-3xl">{beyond.title}</h2>
      <div className="max-w-[500px] font-mono text-base leading-[1.7] text-muted">
        {beyond.lead.map((p) => (
          <p key={p} className="break-all">
            {p}
          </p>
        ))}
      </div>
      <ViewMore href={beyond.href} className="py-[34px]" />
    </section>
  );
}
