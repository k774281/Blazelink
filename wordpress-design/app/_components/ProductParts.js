"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/** Main image with its thumbnails (Figma 229:215); picking a thumbnail swaps the main image. */
export function ProductGallery({ images }) {
  const [current, setCurrent] = useState(0);
  const main = images[current];

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4">
      <div className="relative aspect-square overflow-hidden rounded-[4px] bg-surface lg:aspect-auto lg:h-[620px]">
        <Image src={main.src} alt={main.alt} fill preload sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
      </div>
      {images.length > 1 && (
        <ul className="flex gap-4">
          {images.map((img, i) => {
            const on = i === current;
            return (
              <li key={img.src} className="w-[calc((100%-2rem)/3)] lg:w-[195px]">
                <button
                  type="button"
                  aria-label={`顯示第 ${i + 1} 張圖：${img.alt}`}
                  aria-pressed={on}
                  onClick={() => setCurrent(i)}
                  className={`relative block aspect-[195/130] w-full overflow-hidden rounded-[4px] transition-opacity ${on ? "outline-2 -outline-offset-2 outline-lavender" : "opacity-60 hover:opacity-100"}`}
                >
                  <Image src={img.src} alt="" fill sizes="195px" className="object-cover" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/**
 * Anchor tabs that stick to the top of the viewport (Figma 230:210). The tab for
 * the block being read is underlined: the last block whose top has passed the bar.
 */
export function ProductTabs({ tabs }) {
  const [active, setActive] = useState(tabs[0].id);

  useEffect(() => {
    const blocks = tabs.map((t) => document.getElementById(t.id)).filter(Boolean);
    const onScroll = () => {
      let current = blocks[0];
      for (const b of blocks) if (b.getBoundingClientRect().top <= 160) current = b;
      setActive(current?.id);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [tabs]);

  return (
    <nav aria-label="商品資訊" className="sticky top-0 z-30 border-y border-line bg-canvas/90 px-6 backdrop-blur-md lg:pl-[160px] lg:pr-[264px]">
      <ul className="flex gap-8 lg:gap-12">
        {tabs.map((t) => {
          const on = t.id === active;
          return (
            <li key={t.id}>
              <a
                href={`#${t.id}`}
                aria-current={on ? "location" : undefined}
                className={`block whitespace-nowrap border-b-2 pb-[22px] pt-6 text-base transition-colors ${on ? "border-lavender font-medium text-ink" : "border-transparent text-muted hover:text-ink"}`}
              >
                {t.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
