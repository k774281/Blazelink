"use client";

import { useEffect, useState } from "react";
import { ArrowCircle, Eyebrow } from "./ui";
import { CONTACT_WORDS, LINKS } from "@/lib/content";

function RotatingWord({ words }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2400);
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <span aria-hidden="true" className="relative block h-[68px] w-[420px] overflow-hidden max-md:h-[48px] max-md:w-full">
      <span
        key={index}
        className="absolute top-2 left-0 animate-word-in font-noto text-[52px] leading-none font-bold tracking-[-1.82px] whitespace-nowrap text-lavender max-md:top-1 max-md:text-[36px] max-md:tracking-[-1.2px]"
      >
        {words[index]}
      </span>
    </span>
  );
}

export default function Contact() {
  const spoken = `讓你的流量，變成${CONTACT_WORDS.map((w) => w.replace("。", "")).join("、")}。`;

  return (
    <section className="bg-ink">
      <div className="mx-auto flex max-w-[1440px] items-center gap-12 px-[120px] py-24 max-lg:flex-col max-lg:items-start max-lg:px-10 max-md:px-5 max-md:py-16">
        <div className="flex flex-1 flex-col items-start">
          <Eyebrow zh="預約諮詢" en="CONTACT" tone="light" className="pb-[26px]" />
          <h2 aria-label={spoken} className="flex flex-col gap-1.5">
            <span
              aria-hidden="true"
              className="text-[52px] leading-[1.2] font-bold tracking-[-1.82px] whitespace-nowrap text-white max-md:text-[36px] max-md:tracking-[-1.2px]"
            >
              讓你的流量，變成
            </span>
            <RotatingWord words={CONTACT_WORDS} />
          </h2>
          <p className="mt-7 w-[520px] text-[16px] leading-[1.95] font-light text-[#c3cbdd] max-md:w-full">
            不用先準備簡報，也不用先想好預算。一通電話，先聊聊你現在卡在哪一段。
          </p>
        </div>
        <a
          href={LINKS.contact}
          className="group inline-flex shrink-0 items-center gap-8 border-b border-white pb-2 font-noto text-[32px] font-medium whitespace-nowrap text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lavender max-md:text-[24px]"
        >
          免費預約諮詢
          <ArrowCircle
            icon="arrow-white-40"
            size={40}
            iconSize={40}
            className="bg-muted transition-transform duration-300 group-hover:rotate-45"
          />
        </a>
      </div>
    </section>
  );
}
