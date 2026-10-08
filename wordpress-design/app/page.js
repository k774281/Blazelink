import { Beyond, ColumnSection, Hero, Ownership, ProcessSteps, WorksCarousel } from "./_components/HomeSections";
import SideNav from "./_components/SideNav";
import SiteFooter from "./_components/SiteFooter";

export default function HomePage() {
  return (
    <>
      <SideNav />
      <main>
        <Hero />
        <WorksCarousel />
        <ProcessSteps />
        <Ownership />
        <Beyond />
        <ColumnSection />
      </main>
      <SiteFooter />
    </>
  );
}
