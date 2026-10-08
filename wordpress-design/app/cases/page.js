import CaseFilter from "../_components/CaseFilter";
import {
  ApiSection,
  AutomationSection,
  CasesHeader,
  CreativeSection,
  CtaBand,
  CustomSection,
  EnterpriseSection,
  WordPressSection,
} from "../_components/CasesSections";
import SideNav from "../_components/SideNav";
import SiteFooter from "../_components/SiteFooter";
import { ColumnSection } from "../_components/ui";
import { cta, header, sections } from "../_data/cases";
import { column } from "../_data/home";

export const metadata = {
  title: "網站案例｜Blazelink 鏈客",
  description: "與 20 多個品牌合作的 WordPress 形象網站、客製化功能、行銷自動化與 API 串接作品。",
};

const renderers = {
  wordpress: WordPressSection,
  custom: CustomSection,
  automation: AutomationSection,
  creative: CreativeSection,
  enterprise: EnterpriseSection,
  api: ApiSection,
};

export default function CasesPage() {
  const tabs = sections.map((s) => ({ key: s.key, tab: s.tab, count: s.items.length }));
  const panels = sections.map((s) => {
    const Section = renderers[s.key];
    return { key: s.key, node: <Section s={s} /> };
  });

  return (
    <>
      <SideNav />
      <main>
        <CasesHeader data={header} />
        <CaseFilter tabs={tabs} panels={panels} />
        <ColumnSection data={{ ...column, eyebrow: "07 — COLUMN" }} />
        <CtaBand data={cta} />
      </main>
      <SiteFooter />
    </>
  );
}
