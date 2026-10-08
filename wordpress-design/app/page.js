import { Beyond, ColumnSection, Hero, Ownership, ProcessSteps, WorksCarousel } from "./_components/HomeSections";
import SideNav from "./_components/SideNav";
import SiteFooter from "./_components/SiteFooter";
import { getColumn } from "./_lib/column";

export default async function HomePage() {
  const { posts, categories } = await getColumn();

  return (
    <>
      <SideNav />
      <main>
        <Hero posts={posts} />
        <WorksCarousel />
        <ProcessSteps />
        <Ownership />
        <Beyond />
        <ColumnSection posts={posts} categories={categories} />
      </main>
      <SiteFooter />
    </>
  );
}
