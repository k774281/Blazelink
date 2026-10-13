import { LOCALE } from "../_lib/locale";
import * as zh from "./zh/legal";
import * as en from "./en/legal";
import * as ja from "./ja/legal";

// This build's language (see app/_lib/locale.js).
export const { privacy, terms } = { zh, en, ja }[LOCALE];
