import { ui } from "../_data/ui";
import { LOCALE, LOCALES } from "./locale";
import { localePath } from "./base";

/**
 * A page's title, description, canonical and hreflang links. `path` is the
 * page's path inside the site ("/about/"); `languages` lists the builds that
 * have the page (the shop is Chinese only).
 */
export function pageMeta(key, path, languages = ["zh", "en", "ja"]) {
  const { title, description } = ui.meta[key];
  const alternates = { canonical: localePath(LOCALE, path) };
  if (languages.length > 1) {
    alternates.languages = Object.fromEntries(languages.map((lang) => [LOCALES[lang].hreflang, localePath(lang, path)]));
    alternates.languages["x-default"] = localePath("zh", path);
  }
  return { title, description, alternates, openGraph: { locale: LOCALES[LOCALE].og, siteName: "BlazeLink鏈客行銷", title, description } };
}
