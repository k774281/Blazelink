import { Eyebrow, TextLink } from "./ui";
import { LINKS, PARTNER_SLOTS } from "@/lib/content";

export default function Partners() {
  return (
    <section className="bg-surface">
      <div className="mx-auto flex max-w-[1440px] flex-col px-[120px] py-[76px] max-lg:px-10 max-md:px-5 max-md:py-14">
        <div className="flex items-center justify-between gap-6 pb-[38px] max-md:flex-col max-md:items-start">
          <div className="flex items-center gap-[10px] max-md:flex-col max-md:items-start">
            <Eyebrow zh="我們的夥伴" en="PARTNERS" />
            <p className="text-[15px] font-light text-muted">12 個品牌，從新創到跨國 B2B 都在同一條動線上。</p>
          </div>
          <TextLink href={LINKS.contact} tone="navy" circleClass="bg-line">
            成為下一個
          </TextLink>
        </div>
        <ul className="grid grid-cols-6 gap-5 max-lg:grid-cols-3 max-md:grid-cols-2">
          {PARTNER_SLOTS.map((name) => (
            <li
              key={name}
              className="flex h-[98px] items-center justify-center rounded-[50px] border border-line bg-white font-grotesk text-[12px] font-medium tracking-[1.2px] text-faint"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
