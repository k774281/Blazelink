import Image from "next/image";
import { FOOTER } from "@/lib/content";

function LinkColumn({ title, links }) {
  return (
    <div className="flex flex-col gap-[14px]">
      <p className="font-grotesk text-[24px] font-bold tracking-[4.8px] text-[#8d97b0] max-md:text-[18px]">{title}</p>
      <ul className="flex flex-col gap-[14px]">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} className="text-[20px] font-light text-[#dfe3ee] transition-colors hover:text-white max-md:text-[17px]">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-footer">
      <div className="mx-auto flex max-w-[1440px] flex-col px-[120px] max-lg:px-10 max-md:px-5">
        <div className="flex items-start justify-between gap-12 py-16 max-lg:flex-col">
          <div className="flex w-[417px] flex-col gap-8 max-md:w-full">
            <div className="flex h-[129px] flex-col gap-1">
              <div className="relative w-[300px] flex-1 overflow-hidden">
                <Image
                  src="/images/brand/blazelink-logo-light.webp"
                  alt="Blazelink — Empowering Precision Growth"
                  width={600}
                  height={200}
                  className="absolute top-[7.17%] left-[-0.17%] h-[92.23%] w-full max-w-none"
                />
              </div>
              <address className="text-[16px] font-light tracking-[0.32px] text-[#98a3ba] not-italic">{FOOTER.address}</address>
            </div>
            <div className="flex flex-col gap-2 text-[14px] font-light tracking-[0.28px] text-[#98a3ba]">
              <p className="whitespace-pre-wrap">{FOOTER.hours}</p>
              <p>
                電話：<a href={`tel:${FOOTER.phone.replace(/-/g, "")}`} className="hover:text-white">{FOOTER.phone}</a>
              </p>
              <p>
                信箱：<a href={`mailto:${FOOTER.email}`} className="hover:text-white">{FOOTER.email}</a>
              </p>
            </div>
          </div>
          <nav aria-label="頁尾選單" className="flex items-start gap-[72px] whitespace-nowrap max-md:gap-12">
            <LinkColumn title="ON THIS PAGE" links={FOOTER.onThisPage} />
            <LinkColumn title="SITEMAP" links={FOOTER.sitemap} />
          </nav>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-white/12 py-6 whitespace-nowrap text-[#7f8ba6] max-md:flex-col max-md:items-start">
          <p className="text-[12px] font-light">© 2026 鏈客策略行銷股份有限公司</p>
          <p className="font-grotesk text-[11px] font-medium tracking-[1.54px]">BLAZELINK.CO</p>
        </div>
      </div>
    </footer>
  );
}
