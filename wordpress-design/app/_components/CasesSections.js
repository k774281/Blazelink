/*
 * The cases page's sections (Figma 201:202), one renderer per kind of card.
 * Copy lives in app/_data/cases.js; CaseFilter decides which sections show.
 */

import Image from "next/image";
import Link from "next/link";
import { Eyebrow, MotionButton, PageHeader } from "./ui";
import { asset } from "../_lib/base";

export { CtaBand } from "./ui";

/* ------------------------------------------------------------------ header */

export function CasesHeader({ data }) {
  return (
    <PageHeader crumb="網站案例" display={data.display} title={data.title} lead={data.lead}>
      {/* Two blurred glows, exported from Figma with their blur baked in. */}
      <img src={asset("/cases/glow-1.svg")} alt="" width="1420" height="680" className="pointer-events-none absolute left-[540px] top-[260px] hidden max-w-none lg:block" />
      <img src={asset("/cases/glow-2.svg")} alt="" width="1020" height="580" className="pointer-events-none absolute left-[1040px] top-[340px] hidden max-w-none lg:block" />
    </PageHeader>
  );
}

/* ---------------------------------------------------------------- sections */

function SectionHeader({ s }) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="flex flex-col gap-4">
        <Eyebrow>{s.eyebrow}</Eyebrow>
        <h2 className="font-mono text-[32px] font-medium leading-[1.3] text-ink lg:text-3xl">{s.title}</h2>
      </div>
      <p className="text-base leading-[1.75] text-muted">
        {s.lead[0]}
        <br className="hidden lg:block" />
        {s.lead[1]}
      </p>
    </div>
  );
}

const shell = "flex flex-col gap-14 px-6 py-24 lg:py-[140px] lg:pl-[160px]";
const pad = { narrow: "lg:pr-[264px]", wide: "lg:pr-[160px]" };

function Chip({ children }) {
  return <span className="rounded-full border border-line px-3.5 py-1.5 font-mono text-[13px] text-lavender">{children}</span>;
}

/** 01: tall screenshot cards that link out to the live sites, then the "your brand next" card. */
export function WordPressSection({ s }) {
  return (
    <section className={`${shell} ${pad.narrow}`}>
      <SectionHeader s={s} />
      <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
        {s.items.map((c) => (
          <li key={c.name} className="flex flex-col gap-5">
            <div className="relative aspect-[482/560] overflow-hidden rounded-[4px] bg-placeholder">
              <Image src={c.image} alt={`${c.name} 網站首頁`} fill sizes="(min-width: 1280px) 482px, (min-width: 640px) 50vw, 100vw" className="object-cover object-top" />
              <div aria-hidden className="absolute inset-0 bg-black/45" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-canvas/0 from-35% to-canvas/90" />

              <a
                href={c.href}
                target="_blank"
                rel="noopener"
                className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-white/12 px-4 py-2.5 backdrop-blur-[6px] transition-colors hover:bg-white/25"
              >
                <span className="font-mono text-sm font-medium text-ink">前往官網</span>
                <img src={asset("/cases/arrow-up-right.svg")} alt="" width="30" height="30" />
                <span className="sr-only">（{c.name}，另開新視窗）</span>
              </a>

              <div className="absolute bottom-0 left-0 flex flex-col gap-3 px-7 pb-[30px]">
                <h3 className={`text-[26px] text-ink ${c.latin ? "font-display font-bold" : "font-mono font-medium"}`}>{c.name}</h3>
                <ul className="flex gap-2">
                  {c.tags.map((t) => (
                    <li key={t} className="rounded-[4px] bg-canvas/70 px-2.5 py-1 font-mono text-xs text-teal">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="font-mono text-base leading-[1.75] text-muted">{c.body}</p>
          </li>
        ))}

        <li className="flex aspect-[482/560] flex-col justify-end gap-6 rounded-[4px] border border-line bg-[linear-gradient(131deg,rgba(112,77,227,0.55)_0%,rgba(143,209,209,0.15)_71%)] p-10">
          <Eyebrow>{s.cta.eyebrow}</Eyebrow>
          <p className="font-mono text-4xl font-medium leading-[1.4] text-ink">
            {s.cta.title[0]}
            <br />
            {s.cta.title[1]}
          </p>
          <MotionButton href={s.cta.href} label={s.cta.label} />
        </li>
      </ul>
    </section>
  );
}

/** 02: feature screenshots on surface cards; the platform tag tells WordPress from Shopify. */
export function CustomSection({ s }) {
  return (
    <section className={`${shell} ${pad.narrow} border-t border-line`}>
      <SectionHeader s={s} />
      <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {s.items.map((c) => (
          <li key={c.name} className="overflow-hidden rounded-[4px] border border-line bg-surface">
            <div className="relative h-[280px]">
              <Image src={c.image} alt={`${c.name}畫面`} fill sizes="(min-width: 1280px) 482px, (min-width: 640px) 50vw, 100vw" className="object-contain" />
            </div>
            <div className="flex flex-col gap-3 px-7 pb-7 pt-6">
              <p className={`font-mono text-xs tracking-[0.1em] ${c.platform === "SHOPIFY" ? "text-lavender" : "text-teal"}`}>{c.platform}</p>
              <h3 className="text-[22px] font-bold text-ink">{c.name}</h3>
              <p className="text-[15px] leading-[1.75] text-muted">{c.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** 03: one row per system, screenshot on the left, ruled top and bottom. */
export function AutomationSection({ s }) {
  return (
    <section className={`${shell} ${pad.wide} border-t border-line`}>
      <SectionHeader s={s} />
      <ul className="border-t border-line">
        {s.items.map((c) => (
          <li key={c.name} className="flex flex-col border-b border-line py-6 md:flex-row md:items-start">
            <div className="relative h-[240px] shrink-0 md:h-[300px] md:w-[360px]">
              <Image src={c.image} alt={`${c.name}畫面`} fill sizes="360px" className="object-contain" />
            </div>
            <div className="flex flex-col gap-4 py-8 md:p-9">
              <p className="font-display text-xs tracking-[0.1em] text-teal">AUTOMATION</p>
              <h3 className="text-2xl font-bold text-ink">{c.name}</h3>
              <p className="font-mono text-[15px] leading-[1.75] text-muted">{c.body}</p>
              <div className="flex gap-2">
                {c.chips.map((chip) => (
                  <Chip key={chip}>{chip}</Chip>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** 04: three works between two rules, divided by hairlines. */
export function CreativeSection({ s }) {
  return (
    <section className={`${shell} ${pad.wide} border-t border-line`}>
      <SectionHeader s={s} />
      <ul className="grid gap-6 border-y border-muted py-[60px] md:grid-cols-3 xl:[grid-template-columns:repeat(3,minmax(0,482px))]">
        {s.items.map((c, i) => (
          <li key={c.name} className={`flex flex-col ${i < s.items.length - 1 ? "md:border-r md:border-line md:pr-3" : ""}`}>
            <div className="relative h-[280px]">
              <Image src={c.image} alt={`${c.name}畫面`} fill sizes="(min-width: 768px) 452px, 100vw" className="object-contain" />
            </div>
            <div className="flex flex-col gap-3 pb-7 pr-7 pt-6">
              <p className="font-mono text-xs tracking-[0.1em] text-lavender">CREATIVE</p>
              <h3 className="font-mono text-[22px] font-medium text-ink">{c.name}</h3>
              <p className="font-mono text-[15px] leading-[1.75] text-muted">{c.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** 05: two confidential systems, the photo only as a faint backdrop. */
export function EnterpriseSection({ s }) {
  return (
    <section className={`${shell} ${pad.narrow} border-t border-line`}>
      <SectionHeader s={s} />
      <ul className="flex flex-col md:h-[498px] md:flex-row">
        {s.items.map((c) => (
          <li key={c.name} className="relative flex min-h-[360px] flex-1 flex-col items-center justify-center gap-4 overflow-hidden border border-line p-9 text-center">
            <Image src={c.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover opacity-20" />
            <p className="relative font-mono text-xs tracking-[0.1em] text-teal">ENTERPRISE</p>
            <h3 className="relative font-mono text-2xl font-medium text-ink">{c.name}</h3>
            <p className="relative font-mono text-[15px] leading-[1.75] text-muted">{c.body}</p>
            <div className="relative flex gap-2">
              {c.chips.map((chip) => (
                <Chip key={chip}>{chip}</Chip>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** 06: one tile per tool we connect to. */
export function ApiSection({ s }) {
  return (
    <section className={`${shell} ${pad.narrow} border-t border-line`}>
      <SectionHeader s={s} />
      <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {s.items.map((c) => (
          <li key={c.name} className="flex flex-col items-center gap-3 rounded-[4px] border border-line bg-surface px-7 py-9 text-center">
            {c.iconDisc ? (
              <span className="flex size-[50px] items-center justify-center rounded-full bg-white/10">
                <img src={c.icon} alt="" width={c.iconSize[0]} height={c.iconSize[1]} className="h-[34px] w-auto" />
              </span>
            ) : (
              <img src={c.icon} alt="" width="50" height="50" />
            )}
            <h3 className="font-display text-lg font-semibold text-ink">{c.name}</h3>
            <p className="font-mono text-sm text-muted">{c.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
