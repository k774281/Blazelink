import { LOCALE } from "../_lib/locale";
import * as zh from "./zh/academy";
import * as en from "./en/academy";
import * as ja from "./ja/academy";

// This build's language (see app/_lib/locale.js).
export const { hero, latest, why, topics, columns, pastEvents, next, onThisPage } = { zh, en, ja }[LOCALE];
