"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

import Header from "../_components/Header";
import SiteFooter from "../_components/SiteFooter";
import CtaLink from "../_components/CtaLink";
import Eyebrow from "../_components/Eyebrow";
import ImagePlaceholder from "../_components/ImagePlaceholder";
import useSectionReveal from "../_components/useSectionReveal";
import {
  philosophy,
  dualEngine,
  allInOne,
  results,
  founder,
  next as nextStep,
  onThisPage,
} from "@/app/_data/about";

/*
 * 關於我們. Everything here is specific to this page; the header, the reveal
 * footer, the CTA pair, the Eyebrow label and the reveal hook come from
 * ../_components and are shared with the homepage.
 */

function Philosophy() {
  const scope = useSectionReveal();

  return (
    <section
      ref={scope}
      id="philosophy"
      className="relative overflow-clip bg-canvas px-6 pt-[18px] pb-20 md:px-10 xl:px-[120px] xl:pb-[104px]"
    >
      <nav aria-label="Breadcrumb" className="relative text-[15px] text-black">
        <Link href="/" className="underline-grow [--underline-offset:-4px]">
          首頁
        </Link>
        <span className="px-[6px] text-faint">/</span>
        <span aria-current="page">關於我們</span>
      </nav>

      {/* Oversized watermark sitting behind the content */}
      <p
        aria-hidden
        className="font-mono-brand pointer-events-none absolute top-[330px] left-[460px] hidden text-[190px] leading-none font-bold tracking-[-7.6px] whitespace-nowrap text-line xl:block"
      >
        PHILOSOPHY
      </p>

      <div className="relative mx-auto max-w-[1200px] pt-[56px] xl:pt-[86px]">
        <div data-reveal-stagger className="flex flex-col items-start gap-[24px]">
          <Eyebrow zh="關於鏈客" en="ABOUT" />
          <p className="font-display max-w-[780px] text-[18px] leading-[1.85] font-light text-body md:text-[20px]">
            {philosophy.lead}
          </p>
        </div>

        <div className="flex flex-col gap-10 pt-[60px] lg:flex-row lg:gap-[96px]">
          <div
            data-fade
            className="relative h-[360px] w-full overflow-hidden rounded-[50px] lg:h-[537px] lg:flex-1"
          >
            <Image
              src={philosophy.image}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 552px"
              className="object-cover"
              priority
            />
          </div>

          <div
            data-reveal-stagger
            className="flex flex-col items-start gap-[28px] pt-[12px] lg:flex-1"
          >
            {philosophy.body.map((para, i) => (
              <p
                key={i}
                className="font-display text-[17px] leading-[1.95] font-light text-body md:text-[19px]"
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DualEngine() {
  const scope = useSectionReveal();

  return (
    <section
      ref={scope}
      id="dual-engine"
      className="bg-canvas px-6 pb-20 md:px-10 xl:px-[120px] xl:pb-[68px]"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 lg:flex-row lg:gap-[96px]">
        <div
          data-reveal-stagger
          className="flex flex-col items-start lg:w-[687px]"
        >
          <div className="pb-[22px]">
            <Eyebrow zh="競爭中精準制勝" en="DUAL ENGINE" />
          </div>

          <h2 className="font-display text-[32px] leading-[1.26] font-bold tracking-[-1.32px] text-ink md:text-[44px]">
            {dualEngine.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>

          {dualEngine.paragraphs.map((runs, i) => (
            <p
              key={i}
              className="font-display pt-[18px] text-[17px] leading-[1.95] font-light text-body md:text-[18px]"
            >
              {runs.map((run, j) =>
                run.strong ? (
                  <strong key={j} className="font-bold text-ink">
                    {run.text}
                  </strong>
                ) : (
                  <span key={j}>{run.text}</span>
                ),
              )}
            </p>
          ))}
        </div>

        <div
          data-reveal-cards
          className="flex flex-col items-center gap-[16px] pt-[6px] lg:flex-1"
        >
          {dualEngine.images.map((src) => (
            <div
              key={src}
              className="relative h-[223px] w-full max-w-[295px] overflow-hidden rounded-[50px]"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="295px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AllInOne() {
  const scope = useSectionReveal();

  return (
    <section
      ref={scope}
      id="all-in-one"
      className="bg-white px-6 py-20 md:px-10 xl:px-[120px] xl:py-[88px]"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-[16px]">
        {/* The photograph sits between the gradient and the copy, washed back to
            a fifth of its strength — it is texture, not a subject. */}
        <div
          className="relative flex flex-col items-center justify-center gap-[32px] overflow-hidden rounded-[50px] px-6 py-16 md:px-[80px] md:py-[92px]"
          style={{
            backgroundImage: "linear-gradient(to bottom, #f0eef3, #ede9f9)",
          }}
        >
          <Image
            src={allInOne.image}
            alt=""
            fill
            sizes="1200px"
            className="pointer-events-none object-cover opacity-20"
          />

          <div
            data-reveal-stagger
            className="relative flex w-full flex-col items-center gap-[26px]"
          >
            <h2 className="font-display max-w-[480px] text-center text-[32px] leading-[1.26] font-bold tracking-[-1.32px] text-ink md:text-[44px]">
              {allInOne.title}
            </h2>
            {allInOne.paragraphs.map((para, i) => (
              <p
                key={i}
                className="font-display max-w-[882px] text-center text-[16px] leading-[1.95] font-light text-body md:text-[18px]"
              >
                {para}
              </p>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-[20px] border-t border-solid border-[#dfe1e8] pt-[16px]">
          <p className="text-[14px] font-medium whitespace-nowrap text-ink">
            {allInOne.scopeLabel}
          </p>
          <ul className="flex flex-wrap items-center gap-[10px] py-[16px]">
            {allInOne.scope.map((item) => (
              <li
                key={item}
                className="flex h-[40px] items-center gap-[6px] rounded-[50px] border border-solid border-line-strong bg-canvas px-[22px]"
              >
                <span aria-hidden className="text-[16px] leading-none text-[#b3261e]">
                  •
                </span>
                <span className="text-[16px] font-medium whitespace-nowrap text-ink">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/*
 * Results. From lg up the section pins and the cards are dealt one at a time:
 * each card owns an equal slice of the pinned scroll, the scroll snaps to the
 * slice it lands in, and the last slice ends exactly where the pin releases so
 * the page carries on normally. Below lg — and whenever motion is turned down —
 * the cards simply stack down the page.
 */
function Results() {
  const [index, setIndex] = useState(0);
  const [stacked, setStacked] = useState(false);

  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const steps = results.items.length;

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        setStacked(true);

        const trigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "center center",
          // One slice of scroll per card, the last one included — that trailing
          // slice is what gives the third card its turn on screen before the
          // pin lets go. Deliberately no snapping: the cards already change in
          // whole steps, and a snap point on the final slice would drag a
          // reader who is trying to leave back into the section.
          end: () => "+=" + window.innerHeight * 0.8 * steps,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const at = Math.min(steps - 1, Math.floor(self.progress * steps));
            setIndex((cur) => (cur === at ? cur : at));
          },
        });

        ScrollTrigger.refresh();

        return () => {
          trigger.kill();
          setStacked(false);
          // Hand the cards back to the flow layout with no inline leftovers.
          const root = cardsRef.current;
          if (root) {
            gsap.set(root.children, { clearProps: "all" });
            gsap.set(
              root.querySelectorAll("[data-result-figure], [data-result-copy] > *"),
              { clearProps: "all" },
            );
          }
        };
      },
    );

    return () => mm.revert();
  }, [steps]);

  // Each swap: the figure opens upward from its bottom edge while the copy
  // fades in up beside it.
  useEffect(() => {
    if (!stacked) return;

    const cards = cardsRef.current?.children;
    if (!cards?.length) return;

    const card = cards[index];
    for (const one of cards) {
      gsap.set(one, { autoAlpha: one === card ? 1 : 0 });
    }

    const tl = gsap
      .timeline()
      .fromTo(
        card.querySelector("[data-result-figure]"),
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "power3.out" },
        0,
      )
      .fromTo(
        card.querySelectorAll("[data-result-copy] > *"),
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.1 },
        0.1,
      );

    return () => tl.kill();
  }, [index, stacked]);

  return (
    <section
      ref={sectionRef}
      id="results"
      className="bg-canvas px-6 py-20 md:px-10 xl:px-[120px] xl:py-[76px]"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="pb-[36px]">
          <Eyebrow zh="成效" en="RESULTS" />
        </div>

        <div className="border-y border-solid border-line-mid py-[48px]">
          <div
            ref={cardsRef}
            className={stacked ? "relative h-[340px]" : "flex flex-col gap-[48px]"}
          >
            {results.items.map((item) => (
              <article
                key={item.no}
                className={`flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-[120px] ${
                  stacked ? "absolute inset-0" : ""
                }`}
              >
                <div
                  data-result-figure
                  className="relative h-[240px] w-full overflow-hidden rounded-[50px] border border-solid border-line lg:h-auto lg:flex-1"
                >
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 540px"
                    className="object-cover"
                  />
                </div>

                <div
                  data-result-copy
                  className="flex flex-col justify-center gap-[14px] lg:flex-1"
                >
                  <p className="font-mono-brand text-[24px] leading-none font-bold tracking-[1.44px] text-brand">
                    {item.no}
                  </p>
                  <h3 className="font-display text-[32px] leading-none font-bold tracking-[-1.32px] text-ink md:text-[44px]">
                    {item.title}
                  </h3>
                  <p className="font-display text-[15px] leading-[1.8] font-light text-muted">
                    {item.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Founder() {
  const scope = useSectionReveal();

  return (
    <section
      ref={scope}
      id="founder"
      className="bg-white px-6 py-20 md:px-10 xl:px-[120px] xl:py-[92px]"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 lg:flex-row lg:gap-[80px]">
        <div data-reveal-stagger className="w-full lg:w-[440px] lg:shrink-0">
          <ImagePlaceholder
            label={founder.portraitNote}
            className="h-[360px] w-full rounded-[50px] lg:h-[576px]"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between gap-10">
          <div
            data-reveal-stagger
            className="flex flex-col items-start gap-[18px]"
          >
            <div className="pb-[8px]">
              <Eyebrow zh="創辦人" en="FOUNDER" />
            </div>
            <p className="font-mono-brand text-[52px] leading-none font-bold tracking-[-2.04px] text-ink md:text-[68px]">
              {founder.name}
            </p>
            <p className="font-display text-[16px] font-bold whitespace-nowrap text-muted">
              {founder.role}
            </p>
            <p className="font-display text-[20px] leading-[1.7] font-bold tracking-[0.44px] text-ink md:text-[22px]">
              {founder.lead}
            </p>
            {founder.body.map((para, i) => (
              <p
                key={i}
                className="font-display text-[16px] leading-[1.95] font-light text-body"
              >
                {para}
              </p>
            ))}
          </div>

          <div className="flex flex-col items-start gap-[26px] border-t border-solid border-line pt-[26px]">
            <p className="text-[14px] leading-[1.9] text-muted">
              {founder.skills}
            </p>
            <Link
              href={founder.cta.href}
              className="inline-flex h-[52px] items-center gap-[10px] rounded-[50px] border border-solid border-brand px-[28px] transition-colors duration-500 ease-in-out hover:bg-brand-tint"
            >
              <img
                src="/figma/icon-mail.svg"
                alt=""
                width={17}
                height={17}
                className="shrink-0"
              />
              <span className="text-[16px] font-medium whitespace-nowrap text-brand">
                {founder.cta.label}
              </span>
            </Link>
          </div>
        </div>
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

        <h2 className="font-display text-[34px] leading-[1.28] font-bold tracking-[-1.38px] text-white md:text-[46px]">
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

export default function About() {
  return (
    <>
      <Header />
      {/* Opaque and above the footer, so scrolling the last screen uncovers it. */}
      <main className="relative z-10 bg-white">
        <Philosophy />
        <DualEngine />
        <AllInOne />
        <Results />
        <Founder />
      </main>
      <SiteFooter onThisPage={onThisPage}>
        <NextPanel />
      </SiteFooter>
    </>
  );
}
