"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { contactHref, nav } from "../_data/home";
import { asset } from "../_lib/base";

// The overlay leads with the homepage, which the desktop column leaves to the logo.
const menu = [{ label: "首頁", href: "/" }, ...nav];

/**
 * Site navigation. On desktop it is the narrow column fixed to the right edge
 * (Figma "Sidebar"); on small screens it folds into a menu button that opens a
 * full-screen overlay, as the design brief specifies.
 */
export default function SideNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav aria-label="主選單" className="fixed right-0 top-0 z-40 hidden w-[104px] flex-col items-center gap-6 pt-14 lg:flex">
        <Link
          href={contactHref}
          className="flex h-[29px] w-[94px] items-center justify-center rounded-full bg-white/20 font-display text-[13px] font-medium tracking-[0.2px] text-white transition-colors hover:bg-white/30"
        >
          聯繫我們
        </Link>
        <ul className="flex flex-col items-center gap-4 text-center text-[15px] font-medium leading-[1.35] tracking-[0.1em] text-muted">
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="transition-colors hover:text-ink">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="fixed right-4 top-5 z-40 flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full bg-white/10 backdrop-blur lg:hidden"
      >
        <span className="sr-only">開啟選單</span>
        <span className="h-px w-5 bg-ink" />
        <span className="h-px w-5 bg-ink" />
      </button>

      {open && (
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="主選單" className="fixed inset-0 z-50 flex flex-col bg-canvas px-6 pt-28 lg:hidden">
          {/* Same spot as each page's own logo, so opening the menu leaves it in place. */}
          <Link href="/" onClick={() => setOpen(false)} className="absolute left-6 top-5 block">
            <Image src={asset("/home/logo.png")} alt="BLAZELINK 鏈客 首頁" width={188} height={63} className="h-auto w-[140px]" />
          </Link>
          <button type="button" onClick={() => setOpen(false)} className="absolute right-4 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-xl">
            <span className="sr-only">關閉選單</span>
            <span aria-hidden>×</span>
          </button>
          <ul className="flex flex-col gap-6 text-2xl font-medium">
            {menu.map((item) => {
              const here = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link href={item.href} onClick={() => setOpen(false)} aria-current={here ? "page" : undefined} className={here ? "text-lavender" : "text-ink"}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href={contactHref}
            onClick={() => setOpen(false)}
            className="mt-10 inline-flex w-fit items-center gap-3 rounded-full bg-lavender px-8 py-4 text-[17px] font-medium text-canvas"
          >
            聯繫我們 <span className="font-display font-semibold">→</span>
          </Link>
        </div>
      )}
    </>
  );
}
