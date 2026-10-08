import Image from "next/image";
import Link from "next/link";
import { footer } from "../_data/home";
import { asset } from "../_lib/base";

export default function SiteFooter() {
  return (
    <footer className="flex flex-col gap-[72px] border-t border-line bg-surface px-6 pb-12 pt-24 lg:px-8">
      <Image src={asset("/home/logo.png")} alt="BLAZELINK 鏈客" width={255} height={85} className="h-auto w-[200px] lg:w-[255px]" />

      <div className="flex flex-col gap-12 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex flex-col gap-4">
          <p className="text-[15px] leading-[1.8] text-muted">
            {footer.company[0]}
            <br />
            {footer.company[1]}
          </p>
          <p className="text-base font-light tracking-[0.02em] text-footer-meta">{footer.address}</p>
        </div>

        <div className="flex w-full flex-col gap-[25px] xl:w-[481px]">
          <p className="whitespace-pre-wrap text-sm font-light tracking-[0.02em] text-footer-meta">{footer.hours}</p>
          <div className="flex flex-col gap-6 sm:flex-row">
            <a href={`tel:${footer.phone.replace(/-/g, "")}`} className="flex h-[42px] flex-1 items-center justify-center gap-2.5 rounded-full bg-white/10 text-sm font-light tracking-[0.02em] text-footer-meta">
              <img src={asset("/home/icon-phone.svg")} alt="" width="30" height="30" />
              {footer.phone}
            </a>
            <a href={`mailto:${footer.email}`} className="flex h-[42px] flex-1 items-center justify-center gap-2.5 rounded-full bg-white/10 text-sm font-light tracking-[0.02em] text-footer-meta">
              <img src={asset("/home/icon-email.svg")} alt="" width="30" height="30" />
              {footer.email}
            </a>
          </div>
        </div>

        <nav aria-label="頁尾選單" className="flex gap-12 sm:gap-12">
          {footer.columns.map((col) => (
            <div key={col.head} className="flex flex-col gap-3.5">
              <p className="font-display text-xs font-semibold tracking-[0.2em] text-teal">{col.head}</p>
              {col.links.map((link) => (
                <Link key={link.label} href={link.href} className="text-[15px] text-muted transition-colors hover:text-ink">
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </div>

      <div className="flex flex-col gap-4 border-t border-line pt-7 text-[13px] text-muted sm:flex-row sm:justify-between">
        <p className="font-mono">{footer.copyright}</p>
        <div className="flex gap-8">
          {footer.legal.map((link) => (
            <Link key={link.label} href={link.href} className="transition-colors hover:text-ink">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
