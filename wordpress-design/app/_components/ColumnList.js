"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { consult, FALLBACK_IMAGE, PAGE_SIZE, postHref } from "../_data/column";
import { Eyebrow } from "./ui";

/**
 * 全部文章 (Figma 205:210): the info column's category filter beside the post
 * list, eight to a page.
 *
 * Under 全部 the featured post is left out, since it already leads the page;
 * picking a category lists every post in it, featured one included, so the list
 * always matches the count beside the category.
 */
export default function ColumnList({ posts, categories }) {
  const [active, setActive] = useState("全部");
  const [page, setPage] = useState(1);
  const top = useRef(null);

  const counts = [{ label: "全部", count: posts.length }, ...categories.map((c) => ({ label: c, count: posts.filter((p) => p.category === c).length }))];
  const list = active === "全部" ? posts.slice(1) : posts.filter((p) => p.category === active);
  const pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const shown = list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const total = counts.find((c) => c.label === active).count;

  // Re-filtering or paging from further down brings the list's heading back into view.
  const jump = () => {
    const el = top.current;
    if (!el || el.getBoundingClientRect().top >= 0) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: still ? "auto" : "smooth" });
  };
  const choose = (label) => {
    setActive(label);
    setPage(1);
    jump();
  };
  const go = (n) => {
    setPage(n);
    jump();
  };

  return (
    <section ref={top} className="flex scroll-mt-6 flex-col gap-14 border-t border-line px-6 pb-24 pt-20 lg:px-[160px] lg:pb-[160px] lg:pt-[120px]">
      <div className="flex items-end justify-between gap-6">
        <div className="flex flex-col gap-4">
          <Eyebrow>ALL POSTS</Eyebrow>
          <h2 className="font-mono text-[28px] font-medium leading-[1.3] text-ink lg:text-[32px]">{active === "全部" ? "全部文章" : active}</h2>
        </div>
        <p className="font-mono text-sm text-muted" aria-live="polite">
          共 {total} 篇
        </p>
      </div>

      <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-20">
        <aside className="flex w-full flex-col gap-10 lg:w-[340px] lg:shrink-0">
          <div role="toolbar" aria-label="專欄分類" className="flex flex-col gap-1">
            <p className="font-display text-xs font-semibold tracking-[0.2em] text-muted">CATEGORY</p>
            {counts.map((c) => {
              const on = c.label === active;
              return (
                <button
                  key={c.label}
                  type="button"
                  aria-pressed={on}
                  onClick={() => choose(c.label)}
                  className={`flex justify-between rounded-lg py-3.5 pr-4 text-left transition-[background-color,color,padding] ${
                    on ? "bg-surface-2 pl-4 font-medium text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  <span className="font-mono text-base">{c.label}</span>
                  <span className="font-display text-[13px] text-muted">{c.count}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-5 rounded-[4px] border border-line bg-[linear-gradient(147deg,rgba(112,77,227,0.5)_0%,rgba(143,209,209,0.18)_71%)] p-7">
            <p className="font-mono text-[22px] font-medium text-ink">{consult.title}</p>
            <p className="font-mono text-[15px] leading-[1.75] text-ink">{consult.body}</p>
            <Link href={consult.href} className="flex w-fit gap-2.5 rounded-full bg-lavender px-6 py-3.5 text-[15px] text-canvas transition-opacity hover:opacity-90">
              <span className="font-medium">{consult.label}</span>
              <span className="font-display font-semibold">→</span>
            </Link>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <ul>
            {shown.map((post) => (
              <li key={post.slug} className="border-t border-line">
                <Link href={postHref(post)} className="group flex items-center gap-6 py-8 sm:gap-10">
                  <div className="flex min-w-0 flex-1 flex-col gap-3">
                    <p className="whitespace-pre font-mono text-[13px] text-teal">{`${post.date}  ・  ${post.category}`}</p>
                    <h3 className="font-mono text-lg font-medium leading-[1.5] text-ink transition-colors group-hover:text-lavender sm:text-[22px]">{post.title}</h3>
                    <p className="line-clamp-2 font-mono text-[15px] leading-[1.75] text-muted">{post.excerpt}</p>
                  </div>
                  <div className="relative hidden h-[140px] w-[224px] shrink-0 overflow-hidden rounded-[4px] sm:block">
                    <Image src={post.image ?? FALLBACK_IMAGE} alt="" fill sizes="224px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {pages > 1 && (
            <nav aria-label="分頁" className="flex items-center justify-center gap-2 border-t border-line pt-12">
              <PageButton label="上一頁" disabled={page === 1} onClick={() => go(page - 1)}>
                ←
              </PageButton>
              {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                <PageButton key={n} label={`第 ${n} 頁`} current={n === page} onClick={() => go(n)}>
                  {n}
                </PageButton>
              ))}
              <PageButton label="下一頁" disabled={page === pages} onClick={() => go(page + 1)}>
                →
              </PageButton>
            </nav>
          )}
        </div>
      </div>
    </section>
  );
}

function PageButton({ children, label, current, disabled, onClick }) {
  const digit = typeof children === "number";
  return (
    <button
      type="button"
      aria-label={label}
      aria-current={current ? "page" : undefined}
      disabled={disabled}
      onClick={onClick}
      className={`flex size-11 items-center justify-center rounded-full text-[15px] transition-colors ${digit ? "font-mono" : "font-display font-semibold"} ${
        current ? "bg-ink text-canvas" : "bg-white/10 text-ink hover:bg-white/20 disabled:text-muted disabled:hover:bg-white/10"
      }`}
    >
      {children}
    </button>
  );
}
