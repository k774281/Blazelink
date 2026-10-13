import { LOCALE } from "../_lib/locale";
import * as zh from "./zh/home";
import * as en from "./en/home";
import * as ja from "./ja/home";

// This build's language (see app/_lib/locale.js).
export const { nav, contactHref, hero, works, process, ownership, beyond, column, footer } = { zh, en, ja }[LOCALE];
