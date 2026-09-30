import { getLectures, getPostsByCategory } from "@/app/_lib/wp";
import { columns, latest } from "@/app/_data/academy";
import AcademyPage from "./AcademyPage";

/*
 * The page itself stays on the server so the column lists can be read from
 * WordPress at build time and refreshed on a schedule, rather than shipping a
 * fetch to every visitor. Everything the reader interacts with — the tabs, the
 * reveals — lives in AcademyPage.
 */
export default async function Academy() {
  const [tabs, products] = await Promise.all([
    Promise.all(
      columns.tabs.map(async (tab) => ({
        ...tab,
        items: await getPostsByCategory(tab.category),
      })),
    ),
    getLectures({ slugs: latest.items.map((item) => item.slug) }),
  ]);

  // WordPress owns each lecture's title, artwork and link; the rows beside them
  // are editorial and stay in _data. A lecture WordPress cannot return is left
  // out rather than rendered half-empty.
  const lectures = latest.items
    .map((item) => {
      const product = products.find((p) => p.slug === item.slug);
      return product ? { ...item, ...product, href: item.href ?? product.href } : null;
    })
    .filter(Boolean);

  return <AcademyPage columnTabs={tabs} lectures={lectures} />;
}
