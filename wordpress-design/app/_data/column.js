import { LOCALE } from "../_lib/locale";
import * as zh from "./zh/column";
import * as en from "./en/column";
import * as ja from "./ja/column";

// This build's language (see app/_lib/locale.js).
export const { header, localPosts, FALLBACK_IMAGE, consult, cta, articleConsult, articleCta, PAGE_SIZE, postHref } = { zh, en, ja }[LOCALE];
