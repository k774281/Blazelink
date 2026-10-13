import { getLatestLectures, getPostsByCategory } from "@/app/_lib/wp";
import { columns } from "@/app/_data/academy";
import AcademyPage from "./AcademyPage";

/*
 * Both WordPress lists are read here at build time, so the exported page
 * carries them for search engines and readers without JavaScript. AcademyPage
 * then reads them again as the page opens, so a lecture or post published
 * since the last upload shows without rebuilding the site.
 */
export default async function Academy() {
  const [tabs, lectures] = await Promise.all([
    Promise.all(
      columns.tabs.map(async (tab) => ({
        ...tab,
        items: await getPostsByCategory(tab.category),
      })),
    ),
    getLatestLectures(),
  ]);

  return <AcademyPage columnTabs={tabs} lectures={lectures} />;
}
