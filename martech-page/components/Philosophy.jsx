import { Eyebrow, TextLink } from "./ui";
import { LINKS } from "@/lib/content";

export default function Philosophy() {
  return (
    <section id="philosophy" className="relative scroll-mt-6 overflow-hidden bg-white">
      <p
        aria-hidden="true"
        className="pointer-events-none absolute top-[100px] left-[450px] font-grotesk text-[190px] leading-none font-bold tracking-[-7.6px] whitespace-nowrap text-[#f2f3f7] select-none max-lg:hidden"
      >
        PHILOSOPHY
      </p>
      <div className="relative mx-auto flex h-[560px] max-w-[1440px] items-start pl-[121px] max-lg:h-auto max-lg:flex-col max-lg:gap-10 max-lg:px-10 max-lg:py-16 max-md:px-5">
        <div
          aria-hidden="true"
          className="mt-[47px] h-[396px] w-[305px] shrink-0 rounded-[50px] bg-[#d9d9d9] max-lg:mt-0 max-lg:h-[240px] max-lg:w-full"
        />
        <div className="mt-[31px] ml-[233px] flex w-[632px] flex-col items-start gap-[30px] pt-1.5 max-xl:ml-20 max-lg:mt-0 max-lg:ml-0 max-lg:w-full">
          <Eyebrow zh="公司理念" en="PHILOSOPHY" />
          <h2 className="text-[56px] leading-[1.14] font-bold tracking-[-2.24px] text-ink max-md:text-[40px]">共創成功</h2>
          <p className="text-[18px] leading-[1.95] font-light text-body max-md:text-[16px]">
            策略行銷應該是一場冒險，一場啟發，而我們是您的冒險夥伴，為您鏈接品牌的成功。我們不只是提供服務，更是深入理解品牌的事業夥伴。
          </p>
          <div className="flex w-full flex-col gap-[14px] border-t border-line pt-[34px]">
            <p className="text-[32px] leading-[1.38] font-bold tracking-[-0.8px] text-ink max-md:text-[24px]">
              我們的成功建立在您的成功之上，
            </p>
            <p className="text-[18px] leading-[1.95] font-light text-body max-md:text-[16px]">這就是我們為之努力的原因。</p>
          </div>
          <TextLink href={LINKS.contact}>聊聊你的成長引擎</TextLink>
        </div>
      </div>
    </section>
  );
}
