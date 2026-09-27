import Image from "next/image";
import { TextLink } from "./ui";
import { LINKS } from "@/lib/content";

export default function GrowthCta() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1440px] px-[120px] pb-[88px] max-lg:px-10 max-md:px-5">
        <div className="flex items-center justify-center gap-[10px] rounded-[50px] bg-primary/10 px-[10px] py-6 max-lg:flex-col max-lg:gap-8 max-lg:px-6 max-lg:py-10">
          <div className="flex flex-col items-start gap-[10px]">
            <h2 className="h-[160px] w-[512px] text-[40px] leading-[1.5] font-bold text-primary max-lg:h-auto max-lg:w-full max-md:text-[30px]">
              成長的每一步，我們都與您同行
            </h2>
            <TextLink href={LINKS.academy}>探索更多行銷策略</TextLink>
          </div>
          <Image
            src="/images/home/growth.webp"
            alt="筆電前規劃行銷數據與成長策略的工作情境"
            width={860}
            height={574}
            sizes="(max-width: 1024px) 100vw, 430px"
            className="h-[317px] w-[430px] shrink-0 rounded-[50px] object-cover max-lg:h-auto max-lg:w-full max-lg:max-w-[560px]"
          />
        </div>
      </div>
    </section>
  );
}
