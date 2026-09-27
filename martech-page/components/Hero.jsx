import Image from "next/image";
import { PillLink } from "./ui";
import { HERO_STATS, HERO_TAGS, LINKS, PARTNER_LOGOS } from "@/lib/content";

function LogoTicker() {
  const track = [...PARTNER_LOGOS, ...PARTNER_LOGOS];
  return (
    <div className="flex h-[115px] w-full max-w-[844px] items-center overflow-hidden rounded-full border border-[#dfe3ee] p-4 shadow-card">
      <ul className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {track.map((logo, i) => (
          <li key={i} aria-hidden={i >= PARTNER_LOGOS.length} className="shrink-0 pr-8">
            <Image
              src={logo.src}
              alt={i < PARTNER_LOGOS.length ? logo.alt : ""}
              width={logo.width}
              height={logo.height}
              className="h-[46px] w-[80px] object-contain"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="mx-auto max-w-[1440px] bg-white p-6 max-md:p-2">
      <div
        className="flex flex-col items-center rounded-[20px] px-[120px] py-32 max-lg:px-10 max-md:px-5 max-md:pt-32 max-md:pb-16"
        style={{
          backgroundImage:
            "linear-gradient(-7.61deg, rgb(255, 255, 255) 7.84%, rgb(241, 242, 246) 56.75%, rgb(233, 235, 241) 92.16%)",
        }}
      >
        <div className="flex w-full max-w-[868px] flex-col items-center gap-[26px] pb-12 text-center">
          <p className="font-grotesk text-[12px] font-bold tracking-[2.64px] text-primary">MARTECH GROWTH ENGINE</p>
          <h1 className="text-[64px] leading-normal font-bold tracking-[-2.24px] text-ink max-lg:text-[52px] max-md:text-[36px] max-md:tracking-[-1.2px]">
            別讓你的流量，
            <br className="md:hidden" />
            只是路過。
          </h1>
          <p className="font-grotesk text-[17px] text-body max-md:text-[15px] max-md:leading-[1.8]">
            從表單、名單分級到 CRM 全線打通。不只把人帶進來，而是讓每一次進站都留下可追蹤、可交付給業務的名單。
          </p>
          <PillLink href={LINKS.contact}>預約免費諮詢</PillLink>
          <ul className="flex items-start gap-[26px] text-center text-black">
            {HERO_STATS.map((stat, i) => (
              <li key={i} className="flex h-[98px] w-[88px] flex-col items-center justify-center font-grotesk">
                <span className="text-[36px] leading-[38px] font-medium">{stat.value}</span>
                <span className="text-[16px] leading-[34px] whitespace-nowrap">{stat.label}</span>
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap justify-center gap-4">
            {HERO_TAGS.map((tag, i) => (
              <li
                key={i}
                className="flex items-center rounded-full border border-line pl-2 shadow-card"
              >
                <Image src="/icons/ads-click.svg" alt="" width={30} height={30} />
                <span className="flex h-[41px] w-[135px] items-center justify-center text-[16px] font-light tracking-[0.32px] text-ink max-md:w-[110px] max-md:text-[14px]">
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <p className="pb-2 font-noto text-[13px] font-light tracking-[0.26px] text-muted">
          12 個合作品牌 · 跨國 B2B 與 YMYL 高門檻產業
        </p>
        <LogoTicker />
      </div>
    </section>
  );
}
