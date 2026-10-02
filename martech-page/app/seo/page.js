"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import Header from "../_components/Header";
import SiteFooter from "../_components/SiteFooter";
import CtaLink from "../_components/CtaLink";
import Eyebrow from "../_components/Eyebrow";
import useSectionReveal from "../_components/useSectionReveal";
import {
  hero,
  problem,
  answer,
  value,
  foundation,
  funnel,
  fit,
  next as nextStep,
  onThisPage,
} from "@/app/_data/seo";

/*
 * 跨國SEO行銷. Everything here is specific to this page; the header, the reveal
 * footer, the CTA pair, the Eyebrow label, the image placeholder and the reveal
 * hook come from ../_components and are shared with the other pages.
 */

function Hero() {
  const scope = useSectionReveal();

  return (
    <section
      ref={scope}
      id="hero"
      className="bg-canvas px-6 pt-[18px] pb-20 md:px-10 xl:px-[120px] xl:pb-[92px]"
    >
      <nav aria-label="Breadcrumb" className="text-[15px] text-black">
        <Link href="/martech" className="underline-grow [--underline-offset:-4px]">
          首頁
        </Link>
        <span className="px-[6px] text-faint">/</span>
        <span aria-current="page">跨國SEO行銷</span>
      </nav>

      <div className="mx-auto max-w-[1200px] pt-[56px] xl:pt-[88px]">
        <div data-reveal-stagger className="flex flex-col items-start gap-[18px]">
          <Eyebrow zh="跨國SEO行銷" en="GLOBAL SEO" />
          <h1 className="font-display max-w-[900px] text-[34px] leading-[1.32] font-bold text-ink md:text-[54px]">
            {hero.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="font-display max-w-[640px] text-[17px] leading-[1.95] font-light text-body md:text-[18px]">
            {hero.lead}
          </p>
        </div>

        <div data-fade className="pt-[56px] xl:pt-[88px]">
          <div className="relative h-[220px] w-full overflow-hidden rounded-[50px] md:h-[320px]">
            <Image
              src={hero.banner}
              alt=""
              fill
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/** A ✕ or ✓ row — the two halves of the problem/answer pair share this shape. */
function MarkRow({ tone, children }) {
  const bad = tone === "bad";

  return (
    <li className="flex w-full items-center gap-[16px] border-b border-solid border-line px-4 py-[24px] md:px-[36px] md:py-[30px]">
      <span
        aria-hidden
        className={`flex size-[30px] shrink-0 items-center justify-center rounded-[50px] text-[13px] font-bold ${
          bad ? "bg-warn-tint text-warn" : "bg-brand/12 text-brand-deep"
        }`}
      >
        {bad ? "✕" : "✓"}
      </span>
      <p className="font-display text-[16px] leading-[1.8] font-light text-body">
        {children}
      </p>
    </li>
  );
}

function Problem() {
  const scope = useSectionReveal();

  return (
    <section
      ref={scope}
      id="problem"
      className="bg-canvas px-6 py-20 md:px-10 xl:px-[120px] xl:py-[92px]"
    >
      <div className="mx-auto max-w-[1200px]">
        <h2
          data-reveal-stagger
          className="font-display max-w-[800px] text-[28px] leading-[1.34] font-bold text-ink md:text-[40px]"
        >
          <span className="block">{problem.title}</span>
        </h2>

        <div className="flex flex-col gap-[48px] pt-[40px] lg:flex-row lg:items-center">
          <div data-fade className="w-full lg:flex-1">
            <div className="relative h-[320px] w-full overflow-hidden rounded-[50px] lg:h-[519px]">
              <Image
                src={problem.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 576px"
                className="object-cover"
              />
            </div>
          </div>

          <div
            data-reveal-stagger
            className="flex w-full flex-col items-start justify-center gap-[20px] lg:flex-1"
          >
            <p className="font-display text-[20px] leading-[1.8] font-bold text-muted md:text-[24px]">
              {problem.listTitle}
            </p>
            <ul className="w-full">
              {problem.items.map((item) => (
                <MarkRow key={item} tone="bad">
                  {item}
                </MarkRow>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Answer() {
  const scope = useSectionReveal();

  return (
    <section
      ref={scope}
      id="answer"
      className="bg-canvas px-6 py-20 md:px-10 xl:px-[120px] xl:py-[92px]"
    >
      <div className="mx-auto max-w-[1200px]">
        <div data-reveal-stagger className="flex flex-col items-start gap-[8px]">
          <h2 className="font-display text-[28px] leading-[1.34] font-bold text-ink md:text-[40px]">
            {answer.title}
          </h2>
          <p className="font-display text-[18px] font-bold text-brand">
            {answer.lead}
          </p>
        </div>

        <div className="flex flex-col gap-[48px] pt-[40px] lg:flex-row-reverse lg:items-center">
          <div data-fade className="w-full lg:flex-1">
            <div className="relative h-[320px] w-full overflow-hidden rounded-[50px] lg:h-[519px]">
              <Image
                src={answer.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 576px"
                className="object-cover"
              />
            </div>
          </div>

          <div
            data-reveal-stagger
            className="flex w-full flex-col items-start justify-center gap-[20px] lg:flex-1"
          >
            <ul className="w-full">
              {answer.items.map((runs, i) => (
                <MarkRow key={i} tone="good">
                  {runs.map((run, j) =>
                    run.strong ? (
                      <strong key={j} className="font-bold text-ink">
                        {run.text}
                      </strong>
                    ) : (
                      <span key={j}>{run.text}</span>
                    ),
                  )}
                </MarkRow>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Value() {
  const scope = useSectionReveal();

  return (
    <section
      ref={scope}
      id="value"
      className="bg-white px-6 pt-20 md:px-10 xl:px-[120px] xl:pt-[64px]"
    >
      <div className="mx-auto max-w-[1200px]">
        <div data-reveal-stagger className="flex flex-col items-start gap-[20px]">
          <Eyebrow zh="三大獨特價值主張" en="WHY BLAZELINK" />
          <h2 className="font-display max-w-[640px] text-[28px] leading-[1.3] font-bold text-ink md:text-[40px]">
            {value.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </div>

        <div
          data-reveal-cards
          className="flex flex-col gap-[24px] py-[40px] xl:py-[60px]"
        >
          {value.items.map((item, i) => (
            <article
              key={item.no}
              // The design alternates which side the artwork sits on.
              className={`flex flex-col gap-[32px] rounded-[50px] px-6 py-[28px] md:px-[38px] md:py-[36px] lg:items-center lg:gap-[60px] ${
                i % 2 ? "lg:flex-row-reverse" : "lg:flex-row"
              }`}
            >
              {/* Stacked, the frame would stretch to the full card and slice
                  the labels off these diagrams, so below the two-column
                  breakpoint it holds a ratio instead of a fixed height. */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[50px] lg:aspect-auto lg:h-[193px] lg:w-[332px] lg:shrink-0">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 332px"
                  className="object-cover"
                />
              </div>

              <div
                className={`flex flex-1 flex-col gap-[16px] ${
                  i % 2 ? "lg:items-end lg:text-right" : "lg:items-start"
                }`}
              >
                <p className="font-mono-brand text-[16px] font-bold tracking-[2.24px] text-brand">
                  {item.no}
                </p>
                <h3 className="font-display text-[22px] font-bold text-ink md:text-[24px]">
                  {item.title}
                </h3>
                <p className="font-display text-[16px] leading-[1.9] font-light text-muted">
                  {item.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Foundation() {
  const scope = useSectionReveal();

  return (
    <section
      ref={scope}
      id="foundation"
      className="bg-white px-6 pb-20 md:px-10 xl:px-[120px] xl:pb-[40px]"
    >
      <div className="mx-auto max-w-[1200px]">
        <div
          data-reveal-stagger
          className="flex flex-col gap-[32px] lg:flex-row lg:gap-[96px]"
        >
          <div className="flex flex-col items-start gap-[20px] lg:shrink-0">
            <Eyebrow zh="底層架構" en="TECHNICAL FOUNDATION" />
            <h2 className="font-display max-w-[480px] text-[26px] leading-[1.34] font-bold text-ink md:text-[36px]">
              {foundation.title}
            </h2>
          </div>

          <p className="font-display flex-1 text-[16px] leading-[1.95] font-light text-body">
            {foundation.lead}
          </p>
        </div>

        <ul data-reveal-stagger className="flex flex-col gap-[16px] pt-[48px]">
          {foundation.items.map((item) => (
            <li
              key={item.no}
              className="flex flex-col gap-[16px] border-b border-solid border-line px-4 py-[26px] md:flex-row md:items-center md:gap-[28px] md:px-[36px]"
            >
              <span className="font-mono-brand w-[40px] shrink-0 text-[15px] font-bold text-brand">
                {item.no}
              </span>

              <div className="flex shrink-0 flex-col gap-[4px] md:w-[220px]">
                <h3 className="font-display text-[18px] font-bold text-ink">
                  {item.title}
                </h3>
                {item.en ? (
                  <p className="font-mono-brand text-[11px] font-medium tracking-[0.88px] text-faint">
                    {item.en}
                  </p>
                ) : null}
              </div>

              <p className="font-display flex-1 text-[16px] leading-[1.8] font-light text-muted">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/*
 * The funnel, as a deck. Each card is `position: sticky` at a top that steps
 * down a little per card, so a card comes to rest and the next one scrolls up
 * over it, leaving the edge of everything underneath on show. It is pure CSS —
 * no scroll listener — but it does mean no ancestor may clip its overflow, so
 * this section and its wrappers deliberately carry no overflow-clip.
 */
function Funnel() {
  const scope = useSectionReveal();

  /*
   * Card 03 carries a row of sub-cards, so it is taller than the rest and its
   * foot shows below whatever stacks on top of it — which reads as a broken
   * card, not as a deck. Levelling them to the tallest keeps every card fully
   * covered. Measured rather than hard-coded, because how much taller it is
   * depends on where the copy wraps.
   */
  const deck = useRef(null);

  useLayoutEffect(() => {
    const cards = [...(deck.current?.querySelectorAll("[data-funnel-card]") ?? [])];
    if (!cards.length) return;

    const level = () => {
      for (const card of cards) card.style.minHeight = "";
      const tallest = Math.max(...cards.map((card) => card.offsetHeight));
      for (const card of cards) card.style.minHeight = `${tallest}px`;
    };

    level();
    // Webfonts land after first paint and move the wrap points with them.
    document.fonts?.ready.then(level);
    window.addEventListener("resize", level);
    return () => {
      window.removeEventListener("resize", level);
      for (const card of cards) card.style.minHeight = "";
    };
  }, []);

  return (
    <section
      ref={scope}
      id="funnel"
      className="bg-lilac-wash px-6 py-20 md:px-10 xl:px-[120px] xl:py-[92px]"
    >
      <div className="mx-auto max-w-[1200px]">
        <div data-reveal-stagger className="flex flex-col items-start gap-[16px]">
          <Eyebrow zh="我們如何打造高轉換獲客漏斗" en="THE FUNNEL" />
          <h2 className="font-display max-w-[800px] text-[28px] leading-[1.3] font-bold text-ink md:text-[40px]">
            {funnel.title}
          </h2>
          <p className="font-display max-w-[720px] text-[16px] leading-[1.9] font-light text-body">
            {funnel.lead}
          </p>
        </div>

        <div ref={deck} className="pt-[40px]">
          {funnel.items.map((item, i) => (
            <div
              key={item.no}
              className="sticky mb-[28px]"
              style={{ top: `calc(var(--header-h) + ${28 + i * 16}px)` }}
            >
              <article
                data-funnel-card
                className="flex flex-col justify-center gap-[16px] rounded-[44px] border-2 border-solid border-brand bg-white px-6 py-[28px] md:px-[36px] md:py-[30px]"
              >
                <div className="flex w-full items-center justify-between gap-4">
                  <div className="flex items-center gap-[16px]">
                    <p className="font-mono-brand text-[36px] leading-[1.8] font-bold text-brand md:text-[48px]">
                      {item.no}
                    </p>
                    <h3 className="font-display text-[19px] font-bold text-ink md:text-[24px]">
                      {item.title}
                    </h3>
                  </div>

                  <img
                    src={item.icon}
                    alt=""
                    width={118}
                    height={118}
                    className="hidden size-[76px] shrink-0 md:block xl:size-[118px]"
                  />
                </div>

                <p className="font-display max-w-[763px] text-[16px] leading-[1.85] font-light text-muted md:text-[18px]">
                  {item.body}
                </p>

                {item.minis ? (
                  <div className="flex flex-col gap-[16px] md:flex-row md:items-start">
                    {item.minis.map((mini) => (
                      <div
                        key={mini.label}
                        className="flex flex-1 flex-col gap-[10px] rounded-[32px] border border-solid border-line bg-canvas px-[24px] py-[22px]"
                      >
                        <p className="text-[13px] font-bold text-brand">
                          {mini.label}
                        </p>
                        <p className="text-[14px] leading-[1.75] text-muted">
                          {mini.body}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}

                {item.tags ? (
                  <ul className="flex flex-wrap items-center gap-[10px]">
                    {item.tags.map((tag) => (
                      <li
                        key={tag}
                        className="flex h-[34px] items-center justify-center rounded-[50px] border border-solid border-line-strong bg-canvas px-[18px] text-[13px] font-medium whitespace-nowrap text-ink"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            </div>
          ))}

          {/*
            A sticky box is clamped to its container's CONTENT box, so padding on
            the container buys it nothing — measured: every card came to rest
            bottom-aligned exactly one padding-height above the container edge.
            The tail that lets the finished stack hold for a screenful has to be
            content. It never reads as empty space: the stuck cards cover it.
          */}
          <div aria-hidden className="h-[45vh]" />
        </div>

        <p className="pt-[40px] text-[17px] leading-[1.7] font-bold text-ink">
          {funnel.closing}
        </p>
      </div>
    </section>
  );
}

function Fit() {
  const scope = useSectionReveal();

  return (
    <section
      ref={scope}
      id="fit"
      className="bg-canvas px-6 py-20 md:px-10 xl:px-[120px] xl:py-[92px]"
    >
      <div className="mx-auto max-w-[1200px]">
        <div
          data-reveal-stagger
          className="flex flex-col gap-[32px] lg:flex-row lg:gap-[96px]"
        >
          <div className="flex flex-col items-start gap-[20px] lg:shrink-0">
            <Eyebrow zh="誰適合跨國SEO內容行銷" en="IS THIS FOR YOU" />
            <h2 className="font-display max-w-[480px] text-[26px] leading-[1.34] font-bold text-ink md:text-[36px]">
              {fit.title}
            </h2>
          </div>

          <p className="font-display flex-1 text-[16px] leading-[1.95] font-light text-body">
            {fit.lead}
          </p>
        </div>

        <ul
          data-reveal-cards
          className="grid gap-[16px] pt-[48px] md:grid-cols-2"
        >
          {fit.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-[16px] rounded-[40px] border border-solid border-line bg-white px-[32px] py-[28px]"
            >
              <span aria-hidden className="text-[20px] font-bold text-brand">
                ✓
              </span>
              <p className="font-display text-[16px] leading-[1.85] font-light text-body">
                {item}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** This page's half of the reveal footer. */
function NextPanel() {
  return (
    <div className="flex flex-col gap-[40px] bg-night px-6 py-16 md:px-10 lg:flex-row lg:items-center lg:justify-between xl:px-[120px] xl:py-[88px]">
      <div className="flex flex-col items-start gap-[24px]">
        <Eyebrow zh="下一步" en="NEXT" tone="light" />

        <h2 className="font-display max-w-[800px] text-[34px] leading-[1.28] font-bold text-white md:text-[46px]">
          {nextStep.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        <p className="font-display max-w-[620px] text-[16px] leading-[1.95] font-light text-contact-body">
          {nextStep.body}
        </p>

        <p className="flex items-start gap-[9px] text-[13px]">
          <span aria-hidden className="font-bold text-brand-soft">
            ✓
          </span>
          <span className="text-contact-body">{nextStep.note}</span>
        </p>
      </div>

      <CtaLink href="/contact" tone="light" size="lg" gap={32}>
        {nextStep.cta}
      </CtaLink>
    </div>
  );
}

export default function Seo() {
  return (
    <>
      <Header />
      {/* Opaque and above the footer, so scrolling the last screen uncovers it. */}
      <main className="relative z-10 bg-white">
        <Hero />
        <Problem />
        <Answer />
        <Value />
        <Foundation />
        <Funnel />
        <Fit />
      </main>
      <SiteFooter onThisPage={onThisPage}>
        <NextPanel />
      </SiteFooter>
    </>
  );
}
