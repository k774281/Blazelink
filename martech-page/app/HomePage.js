"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";

import Header from "./_components/Header";
import SiteFooter from "./_components/SiteFooter";
import ContactPanel from "./_components/ContactPanel";
import CtaPill from "./_components/CtaPill";
import CtaLink from "./_components/CtaLink";
import Eyebrow from "./_components/Eyebrow";
import useSectionReveal from "./_components/useSectionReveal";
import {
  hero,
  philosophy,
  services,
  academy,
  ctaBanner,
  partners,
  blog,
} from "@/app/_data/home";

/*
 * Sections that only ever appear on the homepage live here. Anything a second
 * page reuses — Header, Footer, the contact panel, the CTA pair, the Eyebrow
 * label and the reveal hook — stays in ./_components.
 */

function Hero() {
  // The design clips a logo row wider than its frame, so it runs as a marquee.
  const marqueeLogos = [...hero.logos, ...hero.logos];

  /*
   * The entrance, as one timeline:
   *   1. the gradient soaks in from the top, starting from plain #ffffff
   *   2. the headline whispers in, one character at a time
   *   3. the rest of the hero fades up in document order
   * Everything is hidden by CSS only while scripting is on, so nothing is lost
   * without JS (see .hero-wash / [data-hero] in globals.css).
   */
  const scope = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power2.out" } })
        .fromTo(
          "[data-hero-wash]",
          { "--reveal": "-18%" },
          { "--reveal": "118%", duration: 1.8, ease: "power2.inOut" },
          0,
        )
        .fromTo(
          "[data-whisper]",
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.05 },
          0.15,
        )
        .fromTo(
          "[data-hero]",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 },
          ">-0.25",
        );
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={scope}
      className="-mt-[var(--header-h)] bg-white px-4 pt-[var(--header-h)] pb-4"
    >
      <div className="relative isolate flex flex-col items-center overflow-clip rounded-[20px] bg-white px-6 py-16 md:px-[120px] md:py-[128px]">
        <div
          data-hero-wash
          className="hero-wash absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "linear-gradient(-7.61deg, rgb(255,255,255) 7.84%, rgb(241,242,246) 56.75%, rgb(233,235,241) 92.16%)",
          }}
        />
        <div className="flex w-full max-w-[868px] flex-col items-center gap-[26px] pb-[48px]">
          <p
            data-hero
            className="font-mono-brand text-[12px] font-bold tracking-[2.64px] text-brand"
          >
            {hero.eyebrow}
          </p>

          <h1
            aria-label={hero.title}
            className="font-display text-center text-[40px] leading-tight font-bold tracking-[-1.2px] text-ink md:text-[64px] md:tracking-[-2.24px]"
          >
            <span aria-hidden="true">
              {[...hero.title].map((ch, i) => (
                <span key={i} data-whisper className="inline-block">
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </span>
          </h1>

          <p
            data-hero
            className="font-mono-brand text-center text-[17px] text-body"
          >
            {hero.lead}
          </p>

          <div data-hero>
            <CtaPill href="#contact">預約免費諮詢</CtaPill>
          </div>

          <dl
            data-hero
            className="flex flex-wrap justify-center gap-[26px] text-center text-black"
          >
            {hero.stats.map((stat, i) => (
              <div
                key={i}
                className="flex h-[98px] w-[88px] flex-col items-center justify-center"
              >
                <dt className="font-mono-brand text-[36px] font-medium">
                  {stat.value}
                </dt>
                <dd className="font-mono-brand text-[16px]">{stat.label}</dd>
              </div>
            ))}
          </dl>

          <ul data-hero className="flex flex-wrap justify-center gap-[16px]">
            {hero.tags.map((tag, i) => (
              <li
                key={i}
                className="flex items-center justify-center rounded-[50px] border border-solid border-line bg-white/60 pl-[8px] shadow-card"
              >
                <img
                  src="/figma/icon-ads-click.svg"
                  alt=""
                  width={30}
                  height={30}
                  className="shrink-0"
                />
                <span className="font-display flex h-[41px] w-[135px] items-center justify-center text-center text-[16px] font-light tracking-[0.32px] text-ink">
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p
          data-hero
          className="font-display pb-[8px] text-[13px] font-light tracking-[0.26px] text-muted"
        >
          {hero.proof}
        </p>

        <div
          data-hero
          className="flex h-[115px] w-full max-w-[844px] items-center overflow-hidden rounded-[50px] border border-solid border-line-cool p-[16px] shadow-card"
        >
          <div className="logo-marquee flex w-max shrink-0 items-center gap-[32px]">
            {marqueeLogos.map((src, i) => (
              <div key={i} className="relative h-[46px] w-[80px] shrink-0">
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Philosophy() {
  const scope = useSectionReveal();

  return (
    <section
      ref={scope}
      id="about"
      className="relative overflow-clip bg-white px-6 py-20 md:px-10 xl:px-[120px]"
    >
      {/* Oversized watermark sitting behind the content */}
      <p
        aria-hidden
        className="font-mono-brand pointer-events-none absolute top-[100px] left-[450px] hidden text-[190px] leading-none font-bold tracking-[-7.6px] whitespace-nowrap text-ghost xl:block"
      >
        PHILOSOPHY
      </p>

      <div className="relative mx-auto flex max-w-[1200px] flex-col gap-10 lg:flex-row lg:gap-[233px]">
        <div
          data-fade
          className="relative h-[396px] w-full shrink-0 overflow-hidden rounded-[50px] lg:w-[305px]"
        >
          <Image
            src={philosophy.image}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 305px"
            className="object-cover"
          />
        </div>

        <div
          data-reveal-stagger
          className="flex flex-col items-start gap-[30px] pt-[6px]"
        >
          <Eyebrow zh="公司理念" en="PHILOSOPHY" />

          <h2 className="font-display text-[40px] leading-[1.14] font-bold tracking-[-2.24px] text-ink md:text-[56px]">
            {philosophy.title}
          </h2>

          <p className="font-display max-w-[632px] text-[18px] leading-[1.95] font-light text-body">
            {philosophy.body}
          </p>

          <div className="flex w-full flex-col items-start gap-[14px] border-t border-solid border-line pt-[34px]">
            <p className="font-display text-[24px] leading-[1.38] font-bold tracking-[-0.8px] text-ink md:text-[32px]">
              {philosophy.closingTitle}
            </p>
            <p className="font-display text-[18px] leading-[1.95] font-light text-body">
              {philosophy.closingBody}
            </p>
          </div>

          <CtaLink href="#contact">{philosophy.cta}</CtaLink>
        </div>
      </div>
    </section>
  );
}

const BLURB = 30; // characters of the WordPress description the card shows

/** Array.from, so a surrogate pair counts as the one character it prints as. */
function blurb(text) {
  const chars = Array.from(text ?? "");
  return chars.length > BLURB ? `${chars.slice(0, BLURB).join("")}…` : chars.join("");
}

function Academy({ items }) {
  const scope = useSectionReveal();

  return (
    <section
      ref={scope}
      id="academy"
      className="bg-white px-6 py-20 md:px-10 xl:px-[120px] xl:py-[92px]"
    >
      <div className="mx-auto max-w-[1200px]">
        <SectionHead
          zh="鏈客商學院"
          en="ACADEMY"
          title={academy.title}
          className="pb-[46px]"
        >
          <CtaPill href="/academy" tone="outline">
            {academy.cta}
          </CtaPill>
        </SectionHead>

        <div
          data-reveal-cards
          className="grid gap-[28px] pb-[26px] md:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item) => (
            <article
              key={item.id}
              className="flex flex-col items-start rounded-[50px] border border-solid border-line px-[32px] py-[16px] shadow-card"
            >
              <div className="flex w-full flex-col items-center gap-[18px] pb-[32px]">
                {item.date ? (
                  <span className="font-mono-brand text-center text-[14px] font-medium tracking-[1.28px] text-muted">
                    {item.date}
                  </span>
                ) : null}

                <h3 className="font-display w-full text-[21px] leading-[1.55] font-bold tracking-[-0.21px] text-ink">
                  {item.title}
                </h3>

                <div className="relative h-[151px] w-[237px] shrink-0">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="237px"
                      className="object-contain"
                    />
                  ) : null}
                </div>

                <p className="font-display w-full text-[14px] leading-[1.85] font-light text-muted">
                  {blurb(item.excerpt)}
                </p>
              </div>

              <CtaLink href={item.href} gap={24}>
                前往報名
              </CtaLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBanner() {
  return (
    <section className="bg-white px-6 pb-20 md:px-10 xl:px-[120px] xl:pb-[88px]">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-center gap-10 rounded-[50px] bg-brand-tint px-6 py-[24px] lg:flex-row">
        <div className="flex flex-col items-start justify-center gap-[10px]">
          <p className="font-display max-w-[512px] text-[28px] leading-[1.5] font-bold text-brand md:text-[40px]">
            {ctaBanner.title}
          </p>
          <CtaLink href="#services">{ctaBanner.cta}</CtaLink>
        </div>

        <div className="relative h-[240px] w-full shrink-0 overflow-hidden rounded-[50px] lg:h-[317px] lg:w-[430px]">
          <Image
            src={ctaBanner.image}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 430px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function Partners() {
  return (
    <section className="bg-canvas px-6 py-16 md:px-10 xl:px-[120px] xl:py-[76px]">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-wrap items-center justify-between gap-6 pb-[38px]">
          <Eyebrow zh="我們的夥伴" en="PARTNERS" note={partners.note} />
          <CtaLink href="#contact" tone="ink">
            {partners.cta}
          </CtaLink>
        </div>

        <ul className="grid grid-cols-2 gap-[20px] sm:grid-cols-3 lg:grid-cols-6">
          {partners.brands.map((brand) => (
            <li
              key={brand.src}
              className="flex h-[92px] items-center justify-center rounded-[50px] border border-solid border-line bg-white px-6"
            >
              <div className="relative h-[48px] w-full">
                <Image
                  src={brand.src}
                  alt={brand.name}
                  fill
                  sizes="140px"
                  className="object-contain"
                  // the optimizer rejects SVG unless `dangerouslyAllowSVG` is set
                  unoptimized={brand.src.endsWith(".svg")}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Blog({ items }) {
  const scope = useSectionReveal();

  return (
    <section
      ref={scope}
      id="blog"
      className="bg-white px-6 pt-20 pb-20 md:px-10 xl:px-[120px] xl:pt-[120px] xl:pb-[92px]"
    >
      <div className="mx-auto max-w-[1200px]">
        <SectionHead
          zh="部落格"
          en="BLOG"
          title={blog.title}
          className="pb-[46px]"
        >
          <CtaPill href="#blog" tone="outline">
            {blog.cta}
          </CtaPill>
        </SectionHead>

        <div
          data-reveal-cards
          className="grid gap-[28px] pb-[26px] md:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item) => (
            <article
              key={item.id}
              className="flex flex-col items-start rounded-[50px] px-[32px] py-[16px]"
            >
              <div className="flex w-full flex-col items-start gap-[18px] pb-[32px]">
                <div className="relative h-[180px] w-full">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 340px"
                      className="object-contain"
                    />
                  ) : null}
                </div>

                <div className="flex flex-col items-start justify-center gap-[10px]">
                  <span className="font-mono-brand text-[16px] font-medium tracking-[1.28px] text-muted">
                    {item.date}
                  </span>
                </div>

                <h3 className="font-display w-full text-[21px] font-bold tracking-[0.32px] text-ink">
                  {item.title}
                </h3>
              </div>

              <CtaLink href={item.href} gap={24}>
                了解更多
              </CtaLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHead({ zh, en, title, note, children, className = "" }) {
  return (
    <div
      className={`flex flex-wrap items-end justify-between gap-6 ${className}`}
    >
      <div className="flex flex-col gap-[20px]">
        <Eyebrow zh={zh} en={en} note={note} />
        {title ? (
          <h2 className="font-display text-[32px] leading-[1.24] font-bold tracking-[-1.32px] text-ink md:text-[44px]">
            {title}
          </h2>
        ) : null}
      </div>
      {children}
    </div>
  );
}

function Services() {
  const [active, setActive] = useState(0);
  const detail = services.items[active];
  const scope = useSectionReveal();

  // On every tab click the panel's copy and figure rise past their resting spot
  // and settle back down — `back.out` overshoots the end value, so a tween that
  // travels upward to y:0 carries on above it before springing into place.
  const panelRef = useRef(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true; // the first paint is the resting state, not a transition
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = panelRef.current.querySelectorAll("[data-panel]");
    const tween = gsap.fromTo(
      targets,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "back.out(2.4)",
        stagger: 0.09,
        overwrite: "auto",
      },
    );
    return () => tween.kill();
  }, [active]);

  return (
    <section
      ref={scope}
      id="services"
      className="bg-canvas px-6 py-20 md:px-10 xl:px-[120px] xl:py-[92px]"
    >
      <div data-reveal-stagger className="mx-auto max-w-[1200px]">
        <SectionHead
          zh="提供的服務"
          en="SERVICES"
          title={services.title}
          className="pb-[48px]"
        />

        <div className="flex flex-col gap-[40px] pb-[34px] lg:flex-row lg:items-stretch">
          {/* Selector */}
          <div className="flex shrink-0 flex-col gap-[12px] lg:w-[460px]">
            {services.items.map((item, i) => {
              const on = i === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={on}
                  className={`flex h-[71px] w-full items-center gap-[20px] rounded-[50px] border border-solid px-[30px] text-left transition-colors ${
                    on
                      ? "border-brand bg-white"
                      : "border-line-strong hover:border-faint"
                  }`}
                >
                  <span
                    className={`font-mono-brand text-[15px] font-bold tracking-[0.9px] ${on ? "text-brand" : "text-faint"}`}
                  >
                    {item.id}
                  </span>
                  <span
                    className={`h-[26px] w-px shrink-0 ${on ? "bg-brand" : "bg-line-strong"}`}
                  />
                  <span
                    className={`font-display flex-1 text-[20px] font-bold tracking-[-0.2px] ${on ? "text-ink" : "text-body"}`}
                  >
                    {item.name}
                  </span>
                  <img
                    src={
                      on
                        ? "/figma/arrow-service-active.svg"
                        : "/figma/arrow-service.svg"
                    }
                    alt=""
                    width={18}
                    height={18}
                    className="shrink-0"
                  />
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <div
            ref={panelRef}
            className="flex flex-1 flex-col justify-between gap-8 rounded-[50px] border border-solid border-line bg-white px-6 py-8 md:px-[48px] md:py-[44px]"
          >
            <div data-panel className="flex flex-col gap-[17px]">
              <p className="font-mono-brand text-[13px] font-bold tracking-[2.6px] text-brand">
                SERVICE {detail.id}
              </p>
              <p className="font-display text-[24px] font-bold tracking-[-0.6px] text-ink md:text-[30px]">
                {detail.name}
              </p>
              <p className="font-display text-[16px] leading-[1.95] font-light text-body">
                {detail.body}
              </p>
            </div>

            <div
              data-panel
              className="relative h-[136px] w-full overflow-hidden rounded-[34px] bg-panel"
            >
              <Image
                src={detail.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 650px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-solid border-[#dfe1e8] pt-[26px]">
          <div className="flex flex-wrap items-center gap-[28px]">
            <p className="text-[14px] text-muted">想看更多細節：</p>
            {services.crossLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="border-b border-solid border-brand pb-[2px] text-[15px] font-medium whitespace-nowrap text-brand transition-opacity hover:opacity-70"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <CtaLink href="#contact" tone="ink">
            {services.cta}
          </CtaLink>
        </div>
      </div>
    </section>
  );
}

export default function HomePage({ lectures, posts }) {
  return (
    <>
      <Header />
      {/* Opaque and above the footer, so scrolling the last screen uncovers it. */}
      <main className="relative z-10 bg-white">
        <Hero />
        <Philosophy />
        <Services />
        <Academy items={lectures} />
        <CtaBanner />
        <Partners />
        <Blog items={posts} />
      </main>
      <SiteFooter>
        <ContactPanel />
      </SiteFooter>
    </>
  );
}
