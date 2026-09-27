"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { SectionHead, TextLink } from "./ui";
import { LINKS, SERVICES } from "@/lib/content";

const pad = (n) => String(n + 1).padStart(2, "0");

export default function Services() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  const service = SERVICES[active];

  const onKeyDown = (e) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    let next;
    if (step) next = (active + step + SERVICES.length) % SERVICES.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = SERVICES.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="services" className="scroll-mt-6 bg-surface">
      <div className="mx-auto flex max-w-[1440px] flex-col px-[120px] py-[92px] max-lg:px-10 max-md:px-5 max-md:py-16">
        <SectionHead zh="提供的服務" en="SERVICES" title="只對最終的名單與營收負責。" className="pb-12" />

        <div className="flex items-stretch gap-10 pb-[34px] max-lg:flex-col max-lg:gap-6">
          <div
            role="tablist"
            aria-label="服務項目"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="flex w-[460px] shrink-0 flex-col gap-3 max-lg:w-full"
          >
            {SERVICES.map((s, i) => {
              const on = i === active;
              return (
                <button
                  key={s.title}
                  ref={(el) => (tabRefs.current[i] = el)}
                  role="tab"
                  id={`service-tab-${i}`}
                  aria-selected={on}
                  aria-controls="service-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`flex h-[71px] w-full cursor-pointer items-center gap-5 rounded-full border px-[30px] text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                    on ? "border-primary bg-white" : "border-line-strong hover:bg-white/60"
                  }`}
                >
                  <span className={`font-grotesk text-[15px] font-bold tracking-[0.9px] ${on ? "text-primary" : "text-faint"}`}>
                    {pad(i)}
                  </span>
                  <span aria-hidden="true" className={`h-[26px] w-px ${on ? "bg-primary" : "bg-line-strong"}`} />
                  <span className={`flex-1 text-[20px] font-bold tracking-[-0.2px] ${on ? "text-ink" : "text-body"}`}>
                    {s.title}
                  </span>
                  <Image src={on ? "/icons/arrow-purple-18.svg" : "/icons/arrow-gray-18.svg"} alt="" width={18} height={18} />
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id="service-panel"
            aria-labelledby={`service-tab-${active}`}
            className="flex min-h-[363px] flex-1 flex-col justify-between gap-6 rounded-[50px] border border-line bg-white px-12 py-11 max-md:px-6 max-md:py-8"
          >
            <div key={active} className="flex animate-fade-up flex-col gap-[17px]">
              <p className="font-grotesk text-[13px] font-bold tracking-[2.6px] text-primary">SERVICE {pad(active)}</p>
              <h3 className="text-[30px] font-bold tracking-[-0.6px] text-ink max-md:text-[24px]">{service.title}</h3>
              <p className="text-[16px] leading-[1.95] font-light text-body">{service.description}</p>
            </div>
            <div className="flex h-[136px] items-center justify-center gap-[10px] rounded-[34px] border border-dashed border-[#c9ccd6] bg-[#eef0f5]">
              <Image src="/icons/image-placeholder.svg" alt="" width={17} height={17} />
              <p className="font-grotesk text-[12px] font-medium tracking-[1.44px] text-muted">
                service-{pad(active)}　對應視覺待補
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-6 border-t border-[#dfe1e8] pt-[26px] max-md:flex-col max-md:items-start">
          <div className="flex items-center gap-7 max-md:flex-wrap max-md:gap-4">
            <p className="font-noto text-[14px] text-muted">想看更多細節：</p>
            <a href={LINKS.globalSeo} className="border-b border-primary pb-0.5 font-noto text-[15px] font-medium text-primary">
              跨國SEO行銷
            </a>
            <a href={LINKS.website} className="border-b border-primary pb-0.5 font-noto text-[15px] font-medium text-primary">
              網站架設服務
            </a>
          </div>
          <TextLink href={LINKS.contact} tone="navy">
            直接聊聊你的需求
          </TextLink>
        </div>
      </div>
    </section>
  );
}
