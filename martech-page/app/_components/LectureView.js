import Image from "next/image";
import Header from "./Header";
import SiteFooter from "./SiteFooter";
import ContentHero from "./ContentHero";
import CtaPill from "./CtaPill";
import CtaLink from "./CtaLink";

import { ui } from "@/app/_data/ui";
const ntd = (n) => `NT$${n.toLocaleString("en-US")}`;

/** A lecture in this site's style. Shared by its own page and the reader. */
export default function LectureView({ lecture }) {
  const register = (
    <CtaPill href={lecture.register} compact>
      {ui.lecture.registerNow}
    </CtaPill>
  );

  return (
    <>
      <Header />
      <main className="relative z-10 bg-white">
        <ContentHero
          zh={lecture.tag ?? ui.eyebrow.lecture}
          en="LECTURE"
          title={lecture.title}
          aside={
            lecture.image ? (
              <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-[34px] bg-panel lg:w-[400px]">
                <Image src={lecture.image} alt="" fill preload sizes="(max-width: 1024px) 100vw, 400px" className="object-cover" />
              </div>
            ) : null
          }
        >
          {lecture.body ? (
            <p className="pt-[22px] text-[17px] leading-[1.95] font-light text-body">{lecture.body}</p>
          ) : null}

          {lecture.info.length ? (
            <dl className="mt-[28px] flex w-full flex-col gap-[10px] border-t border-solid border-line pt-[24px] text-[15px]">
              {lecture.info.map((row) => (
                <div key={row.label} className="flex gap-[12px]">
                  <dt className="w-[44px] shrink-0 text-faint">{row.label}</dt>
                  <dd className="text-body">{row.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          <div className="flex flex-wrap items-center gap-[20px] pt-[32px]">
            {register}
            {lecture.price ? <p className="font-mono-brand text-[18px] font-bold text-ink">{ntd(lecture.price)}</p> : null}
          </div>
        </ContentHero>

        <div className="px-6 pt-[56px] pb-[96px] md:px-[64px] xl:px-[144px] xl:pb-[136px]">
          <article className="flex max-w-[820px] flex-col gap-[48px]">
            <div className="legal-body post-body" dangerouslySetInnerHTML={{ __html: lecture.html }} />
            <div className="flex flex-wrap items-center justify-between gap-[24px] border-t border-solid border-line pt-[32px]">
              {register}
              <CtaLink href="/academy/">{ui.lecture.back}</CtaLink>
            </div>
          </article>
        </div>
      </main>
      <SiteFooter onThisPage={null} />
    </>
  );
}
