import { LOCALE } from "../_lib/locale";
import * as zh from "./zh/ui";
import * as en from "./en/ui";
import * as ja from "./ja/ui";

// This build's language (see app/_lib/locale.js).
export const { ui } = { zh, en, ja }[LOCALE];
