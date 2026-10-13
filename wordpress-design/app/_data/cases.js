import { LOCALE } from "../_lib/locale";
import * as zh from "./zh/cases";
import * as en from "./en/cases";
import * as ja from "./ja/cases";

// This build's language (see app/_lib/locale.js).
export const { header, sections, cta } = { zh, en, ja }[LOCALE];
