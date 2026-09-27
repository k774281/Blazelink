import Image from "next/image";
import Link from "next/link";
import { PillLink } from "./ui";
import { LINKS, NAV } from "@/lib/content";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 z-20 flex h-[88px] w-[865px] items-center justify-between rounded-[10px] bg-white pr-[21px] pl-[120px] max-lg:pl-10 max-md:w-full max-md:pr-4 max-md:pl-5">
      <div className="flex items-center gap-14">
        <Link href="/" aria-label="Blazelink 鏈客行銷 首頁" className="shrink-0">
          <Image
            src="/images/brand/blazelink-logo.webp"
            alt="Blazelink 鏈客行銷"
            width={120}
            height={31}
            preload
            className="h-[31px] w-[120px] object-contain"
          />
        </Link>
        <nav aria-label="主選單" className="max-md:hidden">
          <ul className="flex items-center gap-[34px] font-noto text-[15px] font-medium whitespace-nowrap text-ink">
            {NAV.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="transition-colors hover:text-primary">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <PillLink href={LINKS.contact} size="sm">
        聯繫我們
      </PillLink>
    </header>
  );
}
