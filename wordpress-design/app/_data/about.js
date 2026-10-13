import { LOCALE } from "../_lib/locale";
import * as zh from "./zh/about";
import * as en from "./en/about";
import * as ja from "./ja/about";

// This build's language (see app/_lib/locale.js).
export const { header, philosophy, dualEngine, allInOne, howWeBuild, results, founder, cta } = { zh, en, ja }[LOCALE];
