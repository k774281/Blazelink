import { LOCALE } from "../_lib/locale";
import * as zh from "./zh/seo";
import * as en from "./en/seo";
import * as ja from "./ja/seo";

// This build's language (see app/_lib/locale.js).
export const { hero, problem, answer, value, foundation, funnel, fit, next, onThisPage } = { zh, en, ja }[LOCALE];
