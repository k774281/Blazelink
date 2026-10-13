"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../_components/Header";
import SiteFooter from "../_components/SiteFooter";
import ContentHero from "../_components/ContentHero";
import { COLUMN_CATEGORIES, getColumnPosts, keepBuiltPages, postPath } from "../_lib/wp";

import { ui } from "@/app/_data/ui";
const TABS = [{ slug: "all", label: ui.column.all }, ...COLUMN_CATEGORIES];

/**
 * Every column post, filtered by category. The list is the build's, then the
 * live one once WordPress answers, so new posts show without a rebuild. A
 * #martech, #start-up or #web-design in the address opens on that tab.
 */
export default function ColumnList({ posts: built }) {
  const [posts, setPosts] = useState(built);
  const [active, setActive] = useState("all");

  useEffect(() => {
    const fromHash = window.location.hash.slice(1);
    if (TABS.some((t) => t.slug === fromHash)) setActive(fromHash);
    let live = true;
    getColumnPosts({ fresh: true }).then((list) => {
      if (live && list) setPosts(keepBuiltPages(list, built, postPath));
    });
    return () => {
      live = false;
    };
  }, [built]);

  const shown = active === "all" ? posts : posts.filter((p) => p.category === active);

  return (
    <>
      <Header />
      <main className="relative z-10 bg-white">
        <ContentHero zh={ui.eyebrow.column} en="COLUMN" title={ui.column.title}>
          <p className="pt-[22px] text-[17px] leading-[1.95] font-light text-body">
            {ui.column.lead}
          </p>
        </ContentHero>

        <section className="px-6 pt-[56px] pb-[96px] md:px-10 xl:px-[120px] xl:pb-[136px]">
          <div className="mx-auto max-w-[1200px]">
            <div role="tablist" aria-label={ui.column.tabsLabel} className="flex flex-wrap gap-[10px]">
              {TABS.map((t) => {
                const on = t.slug === active;
                return (
                  <button
                    key={t.slug}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls="column-list"
                    onClick={() => {
                      setActive(t.slug);
                      history.replaceState(null, "", t.slug === "all" ? " " : `#${t.slug}`);
                    }}
                    className={`flex h-[48px] items-center justify-center rounded-[999px] border border-solid px-[24px] text-[15px] font-bold transition-colors ${
                      on ? "border-brand bg-brand text-white" : "border-line bg-white text-muted hover:border-faint"
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>

            <div
              id="column-list"
              role="tabpanel"
              className="mt-[32px] rounded-[50px] border border-solid border-line bg-white px-6 py-[12px] md:px-[44px]"
            >
              {shown.length ? (
                <ul className="w-full">
                  {shown.map((item) => (
                    <li key={item.id} className="border-b border-solid border-panel last:border-b-0">
                      <Link href={item.href} className="group flex flex-wrap items-center justify-between gap-2 py-[18px]">
                        <span className="underline-grow max-w-[820px] text-[16px] font-medium text-ink transition-colors group-hover:text-brand">
                          {item.title}
                        </span>
                        <time dateTime={item.date} className="font-mono-brand text-[13px] whitespace-nowrap text-faint">
                          {item.date}
                        </time>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="w-full py-[56px] text-center text-[15px] text-faint">{ui.column.empty}</p>
              )}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter onThisPage={null} />
    </>
  );
}
