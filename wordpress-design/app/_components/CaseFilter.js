"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The category bar and the panels it filters (Figma "分類篩選", sticky at the
 * top while the cases scroll under it).
 *
 * Every panel is rendered on the server and stays in the HTML; filtering only
 * toggles `hidden`, so search engines and no-JS visitors still get all the
 * cases. Choosing a tab while scrolled down brings the bar back to the top of
 * the viewport, so the first matching case is what you see next.
 *
 * The bar's bottom rule doubles as a scrollbar for the tab strip. Without it a
 * narrow window just clips the last tabs and reads as a broken layout or a
 * missing category. The thumb is written straight to the DOM on scroll rather
 * than held in state, so dragging the strip costs no renders, and the whole
 * rail stays at opacity 0 while every tab already fits.
 */
export default function CaseFilter({ tabs, panels }) {
  const [active, setActive] = useState("all");
  const bar = useRef(null);
  const strip = useRef(null);
  const rail = useRef(null);
  const thumb = useRef(null);
  const fade = useRef(null);

  useEffect(() => {
    const el = strip.current;
    const track = rail.current;
    const bead = thumb.current;
    const veil = fade.current;
    if (!el || !track || !bead) return;

    const sync = () => {
      const over = el.scrollWidth - el.clientWidth;
      track.style.opacity = over > 1 ? "1" : "0";
      // The veil lifts once the strip is scrolled to its end: nothing is cut
      // off there, and fading the last tab would only hide it.
      if (veil) veil.style.opacity = over > 1 && el.scrollLeft < over - 1 ? "1" : "0";
      if (over <= 1) return;
      bead.style.width = `${(el.clientWidth / el.scrollWidth) * 100}%`;
      bead.style.left = `${(el.scrollLeft / el.scrollWidth) * 100}%`;
    };

    sync();
    el.addEventListener("scroll", sync, { passive: true });
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", sync);
      ro.disconnect();
    };
  }, []);
  const total = tabs.reduce((sum, t) => sum + t.count, 0);
  const shown = active === "all" ? total : tabs.find((t) => t.key === active)?.count ?? 0;

  const choose = (key) => {
    setActive(key);
    const el = bar.current;
    if (!el) return;
    const top = el.parentElement.getBoundingClientRect().top + window.scrollY;
    if (window.scrollY > top) {
      const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top, behavior: still ? "auto" : "smooth" });
    }
  };

  const all = [{ key: "all", tab: "全部", count: total }, ...tabs];

  return (
    <div>
      {/* On phones the right padding leaves room for SideNav's fixed menu button. */}
      <div
        ref={bar}
        className="sticky top-0 z-30 flex items-center justify-between gap-6 border-y border-line bg-canvas py-6 pl-6 pr-[76px] lg:pl-[160px] lg:pr-[264px]"
      >
        <div className="relative min-w-0 flex-1">
          <div ref={strip} role="toolbar" aria-label="作品分類" className="no-scrollbar -ml-6 flex gap-3 overflow-x-auto pl-6 lg:ml-0 lg:pl-0">
            {all.map((t) => {
              const on = t.key === active;
              return (
                <button
                  key={t.key}
                  type="button"
                  aria-pressed={on}
                  onClick={() => choose(t.key)}
                  className={`flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full px-5 py-3 font-medium transition-colors ${
                    on ? "bg-ink text-canvas" : "border border-line text-ink hover:border-muted"
                  }`}
                >
                  <span className="font-mono text-[15px]">{t.tab}</span>
                  <span className={`font-display text-xs ${on ? "" : "text-muted"}`}>{t.count}</span>
                </button>
              );
            })}
          </div>

          {/* Softens the hard cut where the strip clips its last tab. */}
          <div ref={fade} aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-r from-transparent to-canvas opacity-0 transition-opacity duration-300" />
        </div>
        <p className="hidden shrink-0 font-mono text-base text-muted md:block" aria-live="polite">
          {shown} 件作品
        </p>

        <div ref={rail} aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-white/5 opacity-0 transition-opacity duration-300">
          <span ref={thumb} className="absolute top-0 h-full rounded-full bg-lavender" />
        </div>
      </div>

      {panels.map((p) => (
        <div key={p.key} hidden={active !== "all" && active !== p.key}>
          {p.node}
        </div>
      ))}
    </div>
  );
}
