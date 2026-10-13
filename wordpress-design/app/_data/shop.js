import { LOCALE } from "../_lib/locale";
import * as zh from "./zh/shop";
import * as en from "./en/shop";
import * as ja from "./ja/shop";

// This build's language (see app/_lib/locale.js).
export const { header, intro, products, purchaseInfo, commonFaq, perks, consult, ntd, productHref, buyHref } = { zh, en, ja }[LOCALE];
