import Image from "next/image";
import Link from "next/link";
import ColumnList from "../_components/ColumnList";
import SideNav from "../_components/SideNav";
import SiteFooter from "../_components/SiteFooter";
import { CtaBand, Eyebrow, PageHeader, ViewMore } from "../_components/ui";
import { cta, FALLBACK_IMAGE, header, postHref } from "../_data/column";
import { getColumn } from "../_lib/column";
import { asset } from "../_lib/base";

export const metadata = {
  title: "專欄｜Blazelink 鏈客",
  description: "網站設計、行銷科技與經營實務，做一個好網站之前，你需要知道的事都在這裡。",
};

export default async function ColumnPage() {
  const { posts, categories } = await getColumn();
  const featured = posts[0];

  return (
    <>
      <SideNav />
      <main>
        <PageHeader crumb="專欄" display={header.display} title={header.title} lead={header.lead}>
          <Image src={asset("/home/bg-2.webp")} alt="" fill preload sizes="100vw" className="object-cover" />
        </PageHeader>

        {/* Featured post (Figma 204:227). The split is 6:4 rather than the
            design's fixed 860px, so the picture keeps its share of the row at
            every desktop width instead of eating the copy on narrow ones.

            Title and excerpt are clamped because the row stretches to whatever
            the copy needs: left to run, a long excerpt in the narrow column
            pulls the card tall and crops the 16:9 picture into a portrait. */}
        <section className="flex flex-col gap-8 px-6 pb-24 pt-10 lg:px-[160px] lg:pb-[120px]">
          <Eyebrow>FEATURED</Eyebrow>
          <article className="flex flex-col overflow-hidden rounded-[4px] border border-line bg-surface lg:flex-row">
            <Link href={postHref(featured)} className="relative block aspect-[860/484] shrink-0 lg:w-3/5">
              <Image src={featured.image ?? FALLBACK_IMAGE} alt="" fill sizes="(min-width: 1024px) 860px, 100vw" className="object-cover" />
            </Link>
            <div className="flex min-w-0 flex-col justify-center gap-5 p-8 lg:w-2/5 lg:p-9 xl:p-14">
              <p className="whitespace-pre font-mono text-sm text-teal">{`${featured.date}  ・  ${featured.category}`}</p>
              <h2 className="line-clamp-3 font-mono text-[24px] font-medium leading-[1.45] text-ink lg:text-2xl">
                <Link href={postHref(featured)} className="transition-colors hover:text-lavender">
                  {featured.title}
                </Link>
              </h2>
              <p className="line-clamp-3 font-mono text-base leading-[1.8] text-muted lg:text-[17px]">{featured.excerpt}</p>
              <ViewMore href={postHref(featured)} />
            </div>
          </article>
        </section>

        <ColumnList posts={posts} categories={categories} />
        <CtaBand data={cta} />
      </main>
      <SiteFooter />
    </>
  );
}
