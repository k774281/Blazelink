"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";

import Header from "../_components/Header";
import SiteFooter from "../_components/SiteFooter";
import CtaPill from "../_components/CtaPill";
import CtaLink from "../_components/CtaLink";
import Eyebrow from "../_components/Eyebrow";
import ImagePlaceholder from "../_components/ImagePlaceholder";
import useSectionReveal from "../_components/useSectionReveal";
import {
  hero,
  latest,
  why,
  topics,
  columns,
  pastEvents,
  next as nextStep,
  onThisPage,
} from "@/app/_data/academy";

/*
 * 鏈客商學院. Everything here is specific to this page; the header, the reveal
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
        <Link href="/" className="underline-grow [--underline-offset:-4px]">
          首頁
        </Link>
        <span className="px-[6px] text-faint">/</span>
        <span aria-current="page">鏈客商學院</span>
      </nav>

      <div className="mx-auto max-w-[1200px] pt-[56px] xl:pt-[88px]">
        <div data-reveal-stagger className="flex flex-col items-start gap-[6px]">
          <Eyebrow zh="鏈客商學院" en="ACADEMY" />
          <h1 className="font-display pt-[18px] text-[38px] leading-tight font-bold text-ink md:text-[56px]">
            {hero.title}
          </h1>
          <p className="font-display max-w-[640px] text-[17px] leading-[1.9] font-light text-muted md:text-[18px]">
            {hero.lead}
          </p>
        </div>

        <div data-fade className="pt-[56px] xl:pt-[88px]">
          <ImagePlaceholder
            label={hero.bannerNote}
            className="h-[220px] w-full rounded-[50px] md:h-[320px]"
          />
        </div>
      </div>
    </section>
  );
}

function Latest({ items }) {
  const scope = useSectionReveal();

  return (
    <section
      ref={scope}
      id="latest"
      className="bg-canvas px-6 py-20 md:px-10 xl:px-[120px] xl:py-[92px]"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="pb-[40px]">
          <Eyebrow zh="最新講座" en="LATEST" />
        </div>

        <div data-reveal-cards className="grid gap-[24px] lg:grid-cols-2">
          {items.map((item) => (
            <article
              key={item.slug}
              className="relative flex flex-col items-start overflow-hidden rounded-[50px] border border-solid border-line bg-white pb-[44px]"
            >
              <div className="relative h-[249px] w-full shrink-0 bg-panel">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 588px"
                    className="object-cover"
                  />
                ) : null}
              </div>

              {/* Sits over the artwork, as the design has it */}
              <span className="absolute top-[20px] left-[20px] flex h-[28px] items-center rounded-[999px] bg-brand-pale px-[14px] text-[13px] font-medium whitespace-nowrap text-brand-deep md:top-[44px] md:left-[48px]">
                {latest.tag}
              </span>

              <div className="flex w-full flex-col items-start gap-[8px] px-6 py-[32px] md:px-[44px]">
                <h2 className="font-display w-full text-[24px] leading-[1.32] font-bold text-ink md:text-[28px]">
                  {item.title}
                </h2>
                <p className="font-display w-full text-[16px] leading-[1.9] font-light text-muted">
                  {item.body}
                </p>
              </div>

              <dl className="flex w-full flex-col items-start gap-[8px] border-t border-solid border-line px-6 pt-[22px] pb-[24px] text-[15px] md:px-[44px]">
                {item.info.map((row) => (
                  <div key={row.label} className="flex gap-[10px]">
                    <dt className="w-[44px] shrink-0 text-faint">{row.label}</dt>
                    <dd className="text-body">{row.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-auto flex w-full flex-col items-center pt-[8px]">
                <CtaPill href={item.href} compact>
                  {latest.cta}
                </CtaPill>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Why() {
  const scope = useSectionReveal();

  return (
    <section
      ref={scope}
      id="why"
      className="bg-white px-6 pt-20 md:px-10 xl:px-[120px] xl:pt-[92px]"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-[48px] lg:flex-row lg:items-center">
        <div
          data-reveal-stagger
          className="flex flex-col items-start gap-[48px] lg:w-[639px] lg:shrink-0"
        >
          <div className="flex flex-wrap items-center gap-[10px]">
            <p className="font-display text-[20px] font-bold text-ink md:text-[24px]">
              為什麼創辦這個學院
            </p>
            <p className="font-mono-brand text-[16px] font-bold tracking-[3.6px] text-brand md:text-[18px]">
              WHY
            </p>
          </div>

          <blockquote className="font-display text-[22px] leading-[1.6] font-bold tracking-[0.52px] text-ink md:text-[26px]">
            {why.quote}
          </blockquote>
        </div>

        <div data-fade className="w-full lg:flex-1">
          <ImagePlaceholder
            label={why.imageNote}
            className="h-[320px] w-full rounded-[50px] lg:h-[492px]"
          />
        </div>
      </div>
    </section>
  );
}

function Topics() {
  const scope = useSectionReveal();

  return (
    <section
      ref={scope}
      id="topics"
      className="bg-white px-6 pb-20 md:px-10 xl:px-[120px] xl:pb-[88px]"
    >
      <div className="mx-auto max-w-[1200px] pt-20 xl:pt-[88px]">
        <div data-reveal-stagger className="flex flex-col items-start gap-[16px]">
          <Eyebrow zh="六大主題領域" en="TOPICS" />
          <p className="font-display max-w-[900px] text-[16px] leading-[1.9] font-light text-muted">
            {topics.lead}
          </p>
        </div>

        <ul
          data-reveal-cards
          className="grid gap-[18px] pt-[18px] md:grid-cols-2"
        >
          {topics.items.map((item) => (
            <li
              key={item.no}
              className="flex flex-col items-start gap-[24px] border-b border-solid border-line px-[28px] py-[26px]"
            >
              <div className="flex w-full items-start justify-between gap-4">
                <h3 className="font-display text-[20px] font-bold whitespace-nowrap text-ink md:text-[24px]">
                  {item.title}
                </h3>
                <span className="font-mono-brand text-[20px] font-bold tracking-[5.76px] text-brand md:text-[24px]">
                  {item.no}
                </span>
              </div>
              <p className="font-display w-full text-[16px] leading-[1.7] font-light text-muted">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Columns({ tabs }) {
  const [active, setActive] = useState(0);
  const tab = tabs[active];
  const scope = useSectionReveal();

  // On every tab click the list rises into place, the same way the homepage's
  // service panel does. The first paint is the resting state, not a transition.
  const listRef = useRef(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rows = listRef.current?.children;
    if (!rows?.length) return;

    const tween = gsap.fromTo(
      rows,
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.05,
        overwrite: "auto",
      },
    );
    return () => tween.kill();
  }, [active]);

  return (
    <section
      ref={scope}
      id="columns"
      className="bg-canvas px-6 py-20 md:px-10 xl:px-[120px] xl:py-[92px]"
    >
      <div data-reveal-stagger className="mx-auto max-w-[1200px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col items-start gap-[20px]">
            <Eyebrow zh="專欄" en="COLUMNS" />
            <h2 className="font-display text-[26px] font-bold tracking-[-0.96px] text-ink md:text-[32px]">
              {columns.title}
            </h2>
          </div>

          <div role="tablist" aria-label="專欄分類" className="flex gap-[10px]">
            {tabs.map((t, i) => {
              const on = i === active;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls="column-articles"
                  onClick={() => setActive(i)}
                  className={`flex h-[48px] w-[100px] items-center justify-center rounded-[999px] border border-solid text-[15px] font-bold transition-colors ${
                    on
                      ? "border-brand bg-brand text-white"
                      : "border-line bg-white text-muted hover:border-faint"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          id="column-articles"
          role="tabpanel"
          className="mt-[32px] flex flex-col items-start rounded-[50px] border border-solid border-line bg-white px-6 py-[12px] md:px-[44px]"
        >
          {tab.items.length ? (
            <>
              <ul ref={listRef} className="w-full">
                {tab.items.map((item) => (
                  <li key={item.id} className="border-b border-solid border-panel">
                    <a
                      href={item.href}
                      className="group flex flex-wrap items-center justify-between gap-2 py-[18px]"
                    >
                      <span className="underline-grow max-w-[820px] text-[16px] font-medium text-ink transition-colors group-hover:text-brand">
                        {item.title}
                      </span>
                      <time
                        dateTime={item.date}
                        className="font-mono-brand text-[13px] whitespace-nowrap text-faint"
                      >
                        {item.date}
                      </time>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="py-[18px]">
                <a
                  href={tab.more}
                  className="underline-grow text-[15px] font-medium text-brand"
                >
                  {columns.more}
                </a>
              </div>
            </>
          ) : (
            <p className="w-full py-[56px] text-center text-[15px] text-faint">
              {columns.empty}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function PastEvents() {
  const scope = useSectionReveal();

  return (
    <section
      ref={scope}
      id="past-events"
      className="bg-white px-6 py-20 md:px-10 xl:px-[120px] xl:py-[92px]"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="pb-[30px]">
          <Eyebrow zh="過往講座" en="PAST EVENTS" />
        </div>

        <ul
          data-reveal-cards
          className="grid gap-[24px] sm:grid-cols-2 lg:grid-cols-4"
        >
          {pastEvents.items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="group flex flex-col items-start gap-[10px] p-[24px]"
              >
                <div className="relative h-[202px] w-full overflow-hidden rounded-[20px] bg-panel">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 264px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
                <time className="font-mono-brand text-[14px] whitespace-nowrap text-faint">
                  {item.date}
                </time>
                <p className="font-display text-[15px] leading-[1.5] font-bold text-ink transition-colors group-hover:text-brand">
                  {item.title}
                </p>
              </a>
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
      <div className="flex flex-col items-start">
        <div className="pb-[24px]">
          <Eyebrow zh="下一步" en="NEXT" tone="light" />
        </div>

        <h2 className="font-display max-w-[560px] text-[34px] leading-[1.28] font-bold text-white md:text-[46px]">
          {nextStep.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        <div className="h-[22px]" />

        <p className="font-display max-w-[560px] text-[16px] leading-[1.95] font-light text-contact-body">
          {nextStep.body}
        </p>
      </div>

      <CtaLink href="mailto:service@blazelink.co" tone="light" size="lg" gap={32}>
        {nextStep.cta}
      </CtaLink>
    </div>
  );
}

export default function AcademyPage({ columnTabs, lectures }) {
  return (
    <>
      <Header />
      {/* Opaque and above the footer, so scrolling the last screen uncovers it. */}
      <main className="relative z-10 bg-white">
        <Hero />
        <Latest items={lectures} />
        <Why />
        <Topics />
        <Columns tabs={columnTabs} />
        <PastEvents />
      </main>
      <SiteFooter onThisPage={onThisPage}>
        <NextPanel />
      </SiteFooter>
    </>
  );
}
