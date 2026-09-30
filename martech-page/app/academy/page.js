import { getPostsByCategory } from "@/app/_lib/wp";
import { columns } from "@/app/_data/academy";
import AcademyPage from "./AcademyPage";

/*
 * The page itself stays on the server so the column lists can be read from
 * WordPress at build time and refreshed on a schedule, rather than shipping a
 * fetch to every visitor. Everything the reader interacts with — the tabs, the
 * reveals — lives in AcademyPage.
 */
export default async function Academy() {
  const tabs = await Promise.all(
    columns.tabs.map(async (tab) => ({
      ...tab,
      items: await getPostsByCategory(tab.category),
    })),
  );

  return <AcademyPage columnTabs={tabs} />;
}
