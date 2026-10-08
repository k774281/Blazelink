/*
 * Pieces shared across pages: the section eyebrow, the two buttons, and the
 * 專欄 block that both the homepage and the cases page carry. None of them is
 * interactive beyond CSS hover, so this stays a server module.
 */

import Image from "next/image";
import Link from "next/link";
import { FALLBACK_IMAGE, postHref } from "../_data/column";
import { column } from "../_data/home";
import { asset } from "../_lib/base";

/** Section label set in tracked Montserrat, e.g. "01 — WORKS". */
export function Eyebrow({ children, className = "" }) {
  return <p className={`font-display text-sm font-semibold tracking-[0.2em] text-teal ${className}`}>{children}</p>;
}

/**
 * The "VIEW MORE" pill with its separate arrow capsule (Figma component
 * 154:8136). On hover the label's pill grows rightwards across the 8px gap
 * until it has swallowed the arrow capsule, while the capsule's own fill
 * retreats to the right and closes to nothing.
 *
 * The two fills are laid out as absolute layers over a fixed 167px box
 * (117 + 8 + 42) so they can travel independently: the growing edge sits at
 * 117 + 50p and the retreating one at 125 + 42p, which converge on 167 without
 * ever crossing, so the two translucent whites never stack into a darker seam.
 *
 * Label and arrow stay pinned to their resting boxes above the fills, and the
 * padding a caller passes stays on the link so it keeps its own hit area.
 *
 * The group is named: bare group-hover matches any ancestor carrying `group`,
 * and the hero section is one.
 */
export function ViewMore({ href, label = "VIEW MORE", className = "" }) {
  return (
    <Link href={href} className={`group/more inline-block ${className}`}>
      <span className="relative block h-[31px] w-[167px]">
        <span
          aria-hidden
          className="absolute left-0 top-0 h-full w-[117px] rounded-full bg-white/10 transition-[width,background-color] duration-500 ease-out group-hover/more:w-full group-hover/more:bg-white/20"
        />
        <span
          aria-hidden
          className="absolute right-0 top-0 h-full w-[42px] rounded-full bg-white/10 transition-[width,background-color] duration-500 ease-out group-hover/more:w-0 group-hover/more:bg-white/20"
        />
        <span className="absolute left-0 top-0 flex h-full w-[117px] items-center justify-center font-display text-[13px] font-medium tracking-[0.2px] text-white">
          {label}
        </span>
        <span className="absolute right-0 top-0 flex h-full w-[42px] items-center justify-center">
          <img
            src={asset("/home/arrow-right.svg")}
            alt=""
            width="11.3333"
            height="10.0417"
            className="transition-transform duration-500 ease-out group-hover/more:translate-x-0.5"
          />
        </span>
      </span>
    </Link>
  );
}

/**
 * The primary CTA. At rest a lavender disc carrying the arrow, with the label
 * beside it; on hover the disc sweeps out into a full pill and the label flips
 * to the page colour as the fill arrives under it.
 *
 * The reference sets only duration-500, which on its own is a duration with no
 * transition-property and so animates nothing; each moving part names what it
 * transitions here instead.
 *
 * Arrow and label sit in normal flow so the button sizes itself to its own
 * label, and the fill is the one absolute layer. An earlier version pinned both
 * to a fixed 200px box and re-centred the label on the pill at hover, which put
 * an eight-character label straight on top of the arrow; keeping the label in
 * its own track means the gap can never close, whatever the label says.
 *
 * The button takes its width from the label rather than a fixed minimum, so the
 * run between the arrow and the first glyph is always the label's own padding
 * plus the 12px the 24px arrow leaves inside its 48px box — 24px on every
 * button. Padding the label out to a fixed width instead left a four-character
 * label floating 51px from the arrow while an eight-character one sat at 38.
 * w-fit is what holds that: as a flex item the button would otherwise stretch
 * to its container and reopen the same gap from the other end.
 *
 * The group is named: bare group-hover matches any ancestor carrying `group`,
 * and the hero section is one.
 */
export function MotionButton({ href, label, className = "" }) {
  return (
    <Link href={href} className={`group/cta relative inline-flex w-fit items-center rounded-full p-1 ${className}`}>
      <span
        aria-hidden
        className="absolute left-1 top-1 h-12 w-12 rounded-full bg-lavender transition-[width] duration-500 ease-out group-hover/cta:w-[calc(100%-0.5rem)]"
      />

      <span
        aria-hidden
        className="relative flex h-12 w-12 shrink-0 items-center justify-center text-canvas transition-transform duration-500 ease-out group-hover/cta:translate-x-1"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="block">
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </span>

      <span className="relative -translate-y-px whitespace-nowrap pl-3 pr-6 text-[17px] font-medium leading-none tracking-tight text-ink transition-colors duration-500 ease-out group-hover/cta:text-canvas">
        {label}
      </span>
    </Link>
  );
}

/*
 * 專欄 block: the info column (category list + consult card) beside the latest
 * posts. The homepage and the cases page both carry it; each passes its own
 * copy, since the eyebrow numbering differs, and the column's posts and
 * categories (app/_lib/column.js), read on the server.
 */
export function ColumnSection({ data = column, posts = [], categories = [] }) {
  const counts = [{ label: "全部", count: posts.length }, ...categories.map((c) => ({ label: c, count: posts.filter((p) => p.category === c).length }))];

  return (
    <section className="flex flex-col gap-16 px-6 py-24 lg:py-[160px] lg:pl-8 lg:pr-[264px]">
      <header className="flex flex-col gap-4">
        <Eyebrow>{data.eyebrow}</Eyebrow>
        <h2 className="text-[32px] font-bold leading-[1.3] text-ink lg:text-3xl">{data.title}</h2>
        <p className="text-base leading-[1.7] text-muted">{data.lead}</p>
      </header>

      <div className="flex flex-col gap-16 lg:flex-row lg:gap-20">
        <aside className="flex w-full flex-col gap-10 lg:w-[340px] lg:shrink-0">
          <nav aria-label="專欄分類" className="flex flex-col gap-1">
            <p className="font-display text-xs font-semibold tracking-[0.2em] text-muted">CATEGORY</p>
            {counts.map((cat, i) => (
              <Link
                key={cat.label}
                href="/column"
                aria-current={i === 0 ? "page" : undefined}
                className={`flex justify-between rounded-lg py-3.5 pr-4 transition-colors ${i === 0 ? "bg-surface-2 pl-4 font-medium text-ink" : "text-muted hover:text-ink"}`}
              >
                <span className="text-base">{cat.label}</span>
                <span className="font-mono text-[13px] text-muted">{cat.count}</span>
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-5 rounded-2xl border border-line bg-[linear-gradient(147deg,rgba(112,77,227,0.5)_0%,rgba(143,209,209,0.18)_71%)] p-7">
            <p className="text-[22px] font-bold text-ink">{data.cta.title}</p>
            <p className="text-[15px] leading-[1.75] text-ink">{data.cta.body}</p>
            <MotionButton href={data.cta.href} label={data.cta.label} />
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <ul>
            {posts.slice(0, 4).map((post) => (
              <li key={post.slug} className="border-t border-line">
                <Link href={postHref(post)} className="group flex items-center gap-10 py-8">
                  <div className="flex min-w-0 flex-1 flex-col gap-3">
                    <p className="whitespace-pre font-mono text-[13px] text-teal">{`${post.date}  ・  ${post.category}`}</p>
                    <h3 className="text-[22px] font-bold leading-[1.5] text-ink transition-colors group-hover:text-lavender">{post.title}</h3>
                    <p className="line-clamp-2 text-[15px] leading-[1.75] text-muted">{post.excerpt}</p>
                  </div>
                  <div className="relative hidden h-[140px] w-[224px] shrink-0 overflow-hidden rounded-xl sm:block">
                    <Image src={post.image ?? FALLBACK_IMAGE} alt="" fill sizes="224px" className="object-cover" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <Link href={data.more.href} className="w-fit whitespace-pre text-base font-medium text-lavender">{`${data.more.label}  →`}</Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ page chrome */

/**
 * Inner-page header: the oversized Latin word over the page's Chinese title,
 * breadcrumb above. `compact` trims it to 520px for the contact page, so the
 * form starts on the first screen. Each page passes its own backdrop as children; the fade at
 * the bottom blends whatever it is into the page colour.
 */
export function PageHeader({ crumb, display, title, lead, compact = false, children }) {
  return (
    <header className={`relative overflow-hidden px-6 pt-32 lg:p-0 ${compact ? "pb-12 lg:h-[520px]" : "pb-20 lg:h-[640px]"}`}>
      {children}
      <div aria-hidden className={`absolute inset-x-0 hidden h-40 bg-gradient-to-b from-canvas/0 to-canvas lg:block ${compact ? "top-[360px]" : "top-[480px]"}`} />

      <Link href="/" className="absolute left-6 top-5 z-10 block lg:left-16 lg:top-[52px]">
        <Image src={asset("/home/logo.png")} alt="BLAZELINK 鏈客" width={188} height={63} preload className="h-auto w-[140px] lg:w-[188px]" />
      </Link>

      <nav aria-label="麵包屑" className="relative whitespace-pre font-mono text-sm text-muted lg:absolute lg:left-[160px] lg:top-[190px]">
        <Link href="/" className="hover:text-ink">
          首頁
        </Link>
        {"  /  "}
        <span aria-current="page">{crumb}</span>
      </nav>

      <div className="relative mt-6 flex flex-col gap-6 lg:absolute lg:left-[160px] lg:top-[240px] lg:mt-0">
        <p aria-hidden className="font-display text-[72px] font-bold leading-none tracking-[-0.01em] text-ink lg:text-[120px] lg:leading-normal">
          {display}
        </p>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-10">
          <h1 className="font-mono text-[24px] font-medium text-ink lg:text-xl">{title}</h1>
          <p className="font-mono text-base leading-[1.75] text-muted lg:text-lg">
            {lead[0]}
            <br className="hidden lg:block" />
            {lead[1]}
          </p>
        </div>
      </div>
    </header>
  );
}

/** Closing contact band. The button is optional; the column page's band has none. */
export function CtaBand({ data }) {
  return (
    <section className="flex flex-col gap-10 bg-gradient-to-r from-[#452e99] to-canvas px-6 py-24 lg:flex-row lg:items-center lg:justify-between lg:py-[120px] lg:pl-[160px] lg:pr-[264px]">
      <div className="flex flex-col gap-4">
        <Eyebrow>{data.eyebrow}</Eyebrow>
        <h2 className="font-mono text-[32px] font-medium leading-[1.35] text-ink lg:text-3xl">{data.title}</h2>
      </div>
      {data.label && <MotionButton href={data.href} label={data.label} />}
    </section>
  );
}
