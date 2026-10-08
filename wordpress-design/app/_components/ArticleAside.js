"use client";

import { useEffect, useState } from "react";

/**
 * The article's side column (Figma 207:211): a contents list that follows the
 * reader down the page, then the share buttons. The heading being read gets
 * the lavender rule; it is the last one whose top has passed a line a little
 * below the viewport's top edge.
 */
export default function ArticleAside({ toc, title }) {
  const [active, setActive] = useState(toc[0]?.id);

  useEffect(() => {
    if (!toc.length) return;
    const heads = toc.map((t) => document.getElementById(t.id)).filter(Boolean);
    const onScroll = () => {
      let current = heads[0];
      for (const h of heads) if (h.getBoundingClientRect().top <= 160) current = h;
      setActive(current?.id);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [toc]);

  return (
    <aside className="order-last flex w-full flex-col gap-1 lg:sticky lg:top-12 lg:order-none lg:w-[300px] lg:shrink-0">
      {toc.length > 0 && (
        <nav aria-label="文章目錄" className="hidden flex-col gap-1 lg:flex">
          <p className="font-display text-xs font-semibold tracking-[0.2em] text-muted">CONTENTS</p>
          {toc.map((t) => {
            const on = t.id === active;
            return (
              <a
                key={t.id}
                href={`#${t.id}`}
                aria-current={on ? "location" : undefined}
                className={`py-3 pl-4 font-mono text-[15px] transition-colors ${on ? "border-l-2 border-lavender font-medium text-ink" : "border-l border-line text-muted hover:text-ink"}`}
              >
                {t.text}
              </a>
            );
          })}
        </nav>
      )}
      <Share title={title} />
    </aside>
  );
}

function Share({ title }) {
  const [copied, setCopied] = useState(false);
  const pill = "rounded-full bg-white/10 px-3.5 py-2 font-mono text-[13px] text-ink transition-colors hover:bg-white/20";

  // The address is read on click, so the server render needs no origin.
  const here = () => window.location.href.split("#")[0];
  const open = (make) => window.open(make(encodeURIComponent(here())), "_blank", "noopener");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(here());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be refused; the address bar is still there.
    }
  };

  return (
    <div className="flex flex-col gap-3 lg:pt-8">
      <p className="font-display text-xs font-semibold tracking-[0.2em] text-muted">SHARE</p>
      <div className="flex gap-2">
        <button type="button" className={pill} onClick={() => open((u) => `https://social-plugins.line.me/lineit/share?url=${u}&text=${encodeURIComponent(title)}`)}>
          LINE
        </button>
        <button type="button" className={pill} onClick={() => open((u) => `https://www.facebook.com/sharer/sharer.php?u=${u}`)}>
          Facebook
        </button>
        <button type="button" onClick={copy} className={pill}>
          <span aria-live="polite">{copied ? "已複製" : "複製連結"}</span>
        </button>
      </div>
    </div>
  );
}
