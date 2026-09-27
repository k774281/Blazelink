import Image from "next/image";
import { PillLink, SectionHead, Tag, TextLink } from "./ui";
import { LECTURES, LINKS } from "@/lib/content";

export default function Academy() {
  return (
    <section id="academy" className="scroll-mt-6 bg-white">
      <div className="mx-auto flex max-w-[1440px] flex-col px-[120px] py-[92px] max-lg:px-10 max-md:px-5 max-md:py-16">
        <SectionHead
          zh="鏈客商學院"
          en="ACADEMY"
          title="最新講座"
          className="pb-[46px]"
          action={
            <PillLink href={LINKS.academy} variant="outline">
              查看全部講座
            </PillLink>
          }
        />
        <ul className="flex gap-7 pb-[26px] max-lg:flex-col">
          {LECTURES.map((lecture, i) => (
            <li key={i} className="flex flex-1 flex-col items-start rounded-[50px] border border-line px-8 py-4 shadow-card">
              <article className="flex w-full flex-col items-center gap-[18px] pb-8">
                <div className="flex items-center gap-[10px]">
                  <Tag>{lecture.tag}</Tag>
                  <p className="font-grotesk text-[16px] font-medium tracking-[1.28px] whitespace-nowrap text-muted max-md:text-[14px] max-md:tracking-[0.6px]">
                    {lecture.date}
                  </p>
                </div>
                <h3 className="w-full text-[21px] leading-[1.55] font-bold tracking-[-0.21px] text-ink">{lecture.title}</h3>
                <Image
                  src={lecture.poster}
                  alt={`${lecture.title} 講座海報`}
                  width={237}
                  height={151}
                  className="h-[151px] w-[237px] object-contain"
                />
                <p className="w-full text-[14px] leading-[1.85] font-light text-muted">{lecture.description}</p>
              </article>
              <TextLink href={lecture.href} className="gap-6 pb-1">
                前往報名
              </TextLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
