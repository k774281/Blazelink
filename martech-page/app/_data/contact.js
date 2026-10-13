import { LOCALE } from "../_lib/locale";
import * as zh from "./zh/contact";
import * as en from "./en/contact";
import * as ja from "./ja/contact";

// This build's language (see app/_lib/locale.js).
export const { intro, form, success } = { zh, en, ja }[LOCALE];
