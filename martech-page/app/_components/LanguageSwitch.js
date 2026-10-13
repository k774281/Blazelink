"use client";

import { usePathname } from "next/navigation";
import { LOCALE, LOCALES } from "../_lib/locale";
import { localePath } from "../_lib/base";
import { ui } from "@/app/_data/ui";

const SHORT = { zh: "中", en: "EN", ja: "日" };

/*
 * The same page in the other languages. Each language is its own build, so
 * these are plain links that load the other build. Pages that only exist in
 * one language — 鏈客商學院, and a column post, whose posts differ by language —
 * lead to the other language's home or column list instead.
 */
function counterpart(pathname) {
  if (pathname.startsWith("/academy")) return "/";
  if (pathname.startsWith("/column/") && pathname !== "/column/") return "/column/";
  return pathname;
}

export default function LanguageSwitch({ className = "", tone = "ink" }) {
  const path = counterpart(usePathname() ?? "/");
  const idle = tone === "light" ? "text-footer-link hover:text-white" : "text-muted hover:text-brand";
  const current = tone === "light" ? "text-white" : "text-ink";

  return (
    <nav aria-label={ui.languageNav} className={`flex items-center gap-[12px] ${className}`}>
      {Object.keys(LOCALES).map((lang) =>
        lang === LOCALE ? (
          <span key={lang} aria-current="true" lang={LOCALES[lang].html} className={`text-[13px] font-bold ${current}`}>
            {SHORT[lang]}
          </span>
        ) : (
          <a
            key={lang}
            href={localePath(lang, path)}
            hrefLang={LOCALES[lang].hreflang}
            lang={LOCALES[lang].html}
            aria-label={LOCALES[lang].label}
            className={`text-[13px] font-medium transition-colors ${idle}`}
          >
            {SHORT[lang]}
          </a>
        ),
      )}
    </nav>
  );
}
