import Image from "next/image";
import { asset } from "../_lib/base";
import SideNav from "./SideNav";
import SiteFooter from "./SiteFooter";
import { PageHeader } from "./ui";

/** A policy page: the page header, then the text in the article style. */
export default function LegalPage({ doc }) {
  return (
    <>
      <SideNav />
      <main>
        <PageHeader crumb={doc.title} display={doc.display} title={doc.title} lead={doc.lead} compact>
          <Image src={asset("/home/bg-3.webp")} alt="" fill preload sizes="100vw" className="object-cover" />
        </PageHeader>

        <div className="px-6 pb-24 pt-10 lg:px-[160px] lg:pb-[160px]">
          <article className="flex max-w-[820px] flex-col gap-10">
            <p className="font-mono text-[13px] text-muted">最後更新：{doc.updated}</p>
            <div className="article-body" dangerouslySetInnerHTML={{ __html: doc.html }} />
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
