import Image from "next/image";
import Link from "next/link";
import SideNav from "../_components/SideNav";
import SiteFooter from "../_components/SiteFooter";
import { Eyebrow, PageHeader } from "../_components/ui";
import { cartHref, consult, header, intro, ntd, productHref, products, purchaseInfo } from "../_data/shop";
import { asset } from "../_lib/base";

export const metadata = {
  title: "商城｜Blazelink 鏈客",
  description: "Flatsome、Astra Pro 等 WordPress 佈景主題正版授權，綠界信用卡付款、電子發票自動開立。",
};

export default function ShopPage() {
  return (
    <>
      <SideNav />
      <main>
        <PageHeader crumb="商城" display={header.display} title={header.title} lead={header.lead}>
          <Image src={asset("/home/bg-3.webp")} alt="" fill preload sizes="100vw" className="object-cover" />
        </PageHeader>

        {/* Side-by-side comparison (Figma 209:210) */}
        <section className="flex flex-col gap-10 px-6 pb-24 pt-10 lg:px-[160px] lg:pb-[120px]">
          <div className="flex items-end justify-between gap-6">
            <div className="flex flex-col gap-4">
              <Eyebrow>{intro.eyebrow}</Eyebrow>
              <h2 className="font-mono text-[32px] font-medium leading-[1.3] text-ink lg:text-3xl">{intro.title}</h2>
            </div>
            <p className="shrink-0 font-mono text-sm text-muted">{products.length} 件商品</p>
          </div>

          <ul className="grid gap-8 md:grid-cols-2">
            {products.map((p) => (
              <li key={p.slug} className="flex flex-col overflow-hidden rounded-[4px] border border-line bg-surface">
                <Link href={productHref(p)} className="relative block h-[240px] sm:h-[400px]">
                  <Image src={p.image} alt={`${p.name} 商品圖`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                </Link>

                <div className="flex flex-1 flex-col gap-8 px-6 pb-8 pt-9 lg:px-12 lg:pb-12 lg:pt-11">
                  <div className="flex flex-col gap-4">
                    <p className="font-mono text-xs tracking-[0.1em] text-teal">{p.kind}</p>
                    <h3 className="flex flex-wrap items-baseline gap-x-3.5 gap-y-1">
                      <span className="font-display text-[18px] font-bold text-ink lg:text-[24px]">{p.name}</span>
                      <span className="text-base text-muted">{p.subtitle}</span>
                    </h3>
                    <p className="flex flex-wrap items-center gap-4">
                      <span className="font-mono text-[18px] font-medium text-ink lg:text-[24px]">{ntd(p.price)}</span>
                      <del className="font-mono text-lg text-muted">
                        <span className="sr-only">原價 </span>
                        {ntd(p.listPrice)}
                      </del>
                      <span className="rounded-[4px] bg-lavender/16 px-2.5 py-1 text-[13px] font-medium text-lavender">省 {ntd(p.listPrice - p.price)}</span>
                    </p>
                  </div>

                  <dl>
                    <SpecRow term="適合誰">
                      <p>{p.forWho}</p>
                    </SpecRow>
                    <SpecRow term="包含什麼">
                      <ul className="flex flex-col gap-2 text-teal">
                        {p.includes.map((item) => (
                          <li key={item} className="whitespace-pre-wrap">{`✓  ${item}`}</li>
                        ))}
                      </ul>
                      {p.note && <p className="mt-2 text-sm text-muted">{p.note}</p>}
                    </SpecRow>
                    <SpecRow term="交付方式">
                      <p>{p.delivery}</p>
                    </SpecRow>
                  </dl>

                  <div className="mt-auto flex gap-3">
                    <a href={cartHref(p)} className="flex flex-1 justify-center rounded-full bg-lavender py-[18px] text-[17px] font-medium text-canvas transition-opacity hover:opacity-90">
                      加入購物車
                    </a>
                    <Link href={productHref(p)} className="shrink-0 rounded-full border border-line px-8 py-[18px] text-[17px] font-medium text-ink transition-colors hover:border-muted">
                      查看詳情
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Purchase notes and the quiet way out to a consultation (Figma 209:286) */}
        <section className="flex flex-col gap-12 px-6 pb-24 lg:pb-[120px] lg:pl-[160px] lg:pr-[264px]">
          <ul className="grid rounded-[4px] border border-line md:grid-cols-3">
            {purchaseInfo.map((info, i) => (
              <li key={info.eyebrow} className={`flex flex-col gap-2.5 px-8 py-8 lg:px-10 lg:py-9 ${i > 0 ? "border-t border-line md:border-l md:border-t-0" : ""}`}>
                <p className="font-display text-xs font-semibold tracking-[0.2em] text-teal">{info.eyebrow}</p>
                <p className="text-[22px] font-bold text-ink">{info.title}</p>
                <p className="text-[15px] leading-[1.75] text-muted">{info.body}</p>
              </li>
            ))}
          </ul>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-2 text-base">
            <span className="text-muted">{consult.text}</span>
            <Link href={consult.href} className="whitespace-pre font-medium text-lavender hover:underline">{`${consult.label}  →`}</Link>
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function SpecRow({ term, children }) {
  return (
    <div className="flex gap-6 border-t border-line py-5">
      <dt className="w-[72px] shrink-0 text-[15px] font-medium text-muted lg:w-24">{term}</dt>
      <dd className="min-w-0 flex-1 text-base leading-[1.7] text-ink">{children}</dd>
    </div>
  );
}
