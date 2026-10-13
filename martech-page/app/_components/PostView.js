import Image from "next/image";
import Header from "./Header";
import SiteFooter from "./SiteFooter";
import ContentHero from "./ContentHero";
import CtaLink from "./CtaLink";

import { ui } from "@/app/_data/ui";
/** A column post in this site's style. Shared by its own page and the reader. */
export default function PostView({ post }) {
  return (
    <>
      <Header />
      <main className="relative z-10 bg-white">
        <ContentHero zh={post.category} en="COLUMN" title={post.title}>
          <p className="font-mono-brand pt-[24px] text-[13px] font-bold tracking-[1.2px] text-faint">
            <time dateTime={post.date}>{post.date.replace(/-/g, ".")}</time>
            {`　・　${ui.column.readTime(post.minutes)}`}
          </p>
        </ContentHero>

        <div className="px-6 pt-[56px] pb-[96px] md:px-[64px] xl:px-[144px] xl:pb-[136px]">
          <article className="flex max-w-[820px] flex-col gap-[48px]">
            {post.image ? (
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[34px] bg-panel">
                <Image src={post.image} alt="" fill preload sizes="(max-width: 900px) 100vw, 820px" className="object-cover" />
              </div>
            ) : null}
            <div className="legal-body post-body" dangerouslySetInnerHTML={{ __html: post.html }} />
            <div className="border-t border-solid border-line pt-[32px]">
              <CtaLink href="/column/">{ui.column.back}</CtaLink>
            </div>
          </article>
        </div>
      </main>
      <SiteFooter onThisPage={null} />
    </>
  );
}
