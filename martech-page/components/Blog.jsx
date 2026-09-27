import Image from "next/image";
import { PillLink, SectionHead, Tag, TextLink } from "./ui";
import { LINKS, POSTS } from "@/lib/content";

export default function Blog() {
  return (
    <section id="blog" className="scroll-mt-6 bg-white">
      <div className="mx-auto flex max-w-[1440px] flex-col px-[120px] pt-[120px] pb-[92px] max-lg:px-10 max-md:px-5 max-md:pt-16 max-md:pb-16">
        <SectionHead
          zh="部落格"
          en="BLOG"
          title="最新文章"
          className="pb-[46px]"
          action={
            <PillLink href={LINKS.academy} variant="outline">
              查看全部文章
            </PillLink>
          }
        />
        <ul className="flex gap-7 pb-[26px] max-lg:flex-col">
          {POSTS.map((post, i) => (
            <li
              key={i}
              className="flex flex-1 flex-col items-start rounded-[50px] px-8 py-4 drop-shadow-[0px_2px_4px_rgba(15,12,16,0.25)]"
            >
              <article className="flex w-full flex-col items-start gap-[18px] pb-8">
                <div className="relative h-[154px] w-full">
                  <Image
                    src={post.cover}
                    alt={post.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 320px"
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col items-start gap-[10px]">
                  <Tag>{post.tag}</Tag>
                  <p className="font-grotesk text-[16px] font-medium tracking-[1.28px] text-muted">{post.date}</p>
                </div>
                <h3 className="text-[21px] font-bold tracking-[0.32px] text-ink">{post.title}</h3>
              </article>
              <TextLink href={post.href} className="gap-6 pb-1">
                了解更多
              </TextLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
