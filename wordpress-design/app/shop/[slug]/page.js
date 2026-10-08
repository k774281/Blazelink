import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGallery, ProductTabs } from "../../_components/ProductParts";
import SideNav from "../../_components/SideNav";
import SiteFooter from "../../_components/SiteFooter";
import { ViewMore } from "../../_components/ui";
import { cartHref, commonFaq, consult, ntd, perks, productHref, products } from "../../_data/shop";
import { asset } from "../../_lib/base";

/* Every product is known at build time; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.name} ${p.subtitle}｜Blazelink 鏈客商城`,
    description: p.detail.lead,
    openGraph: { title: `${p.name} ${p.subtitle}`, description: p.detail.lead, images: [p.image] },
  };
}

const tabs = [
  { id: "overview", label: "商品介紹" },
  { id: "specs", label: "規格與授權" },
  { id: "faq", label: "購買須知" },
];

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) notFound();

  const d = p.detail;
  const gallery = d.gallery ?? [{ src: p.image, alt: `${p.name} 商品圖` }];
  const includes = d.includes ?? p.includes;
  const faq = [...(d.faq ?? []), ...commonFaq];
  const other = products.find((x) => x.slug !== p.slug);

  return (
    <>
      <SideNav />
      <main>
        {/* Top: logo and breadcrumb (Figma 229:211) */}
        <div className="relative px-6 pb-8 pt-32 lg:h-[240px] lg:p-0">
          <Link href="/" className="absolute left-6 top-5 z-10 block lg:left-16 lg:top-[52px]">
            <Image src={asset("/home/logo.png")} alt="BLAZELINK 鏈客" width={188} height={63} preload className="h-auto w-[140px] lg:w-[188px]" />
          </Link>
          <nav aria-label="麵包屑" className="whitespace-pre text-[13px] text-muted lg:absolute lg:left-[160px] lg:top-[190px]">
            <Link href="/" className="hover:text-ink">
              首頁
            </Link>
            {"  /  "}
            <Link href="/shop" className="hover:text-ink">
              商城
            </Link>
            {"  /  "}
            <span aria-current="page">{p.name}</span>
          </nav>
        </div>

        {/* Gallery beside the purchase panel (Figma 229:214) */}
        <div className="flex flex-col gap-12 px-6 pb-24 lg:flex-row lg:items-start lg:gap-20 lg:pb-[120px] lg:pl-[160px] lg:pr-[264px]">
          <ProductGallery images={gallery} />

          <div className="flex flex-col gap-7 lg:sticky lg:top-12 lg:w-[560px] lg:shrink-0">
            <p className="font-mono text-xs tracking-[0.1em] text-teal">{p.kind}</p>
            <div className="flex flex-col gap-2">
              <h1 className="font-display text-[40px] font-bold leading-tight text-ink lg:text-[56px]">{p.name}</h1>
              <p className="text-lg text-muted">{p.subtitle}</p>
            </div>
            <p className="flex flex-wrap items-center gap-4">
              <span className="font-mono text-[40px] font-medium text-ink lg:text-5xl">{ntd(p.price)}</span>
              <del className="font-mono text-xl text-muted">
                <span className="sr-only">原價 </span>
                {ntd(p.listPrice)}
              </del>
              <span className="rounded-[4px] bg-lavender/16 px-2.5 py-1 text-sm font-medium text-lavender">省 {ntd(p.listPrice - p.price)}</span>
            </p>
            <p className="text-[17px] leading-[1.85] text-ink">{d.lead}</p>

            <ul className="flex flex-col gap-2.5 border-y border-line py-6 text-base leading-[1.7] text-teal">
              {includes.map((item) => (
                <li key={item} className="whitespace-pre-wrap">{`✓  ${item}`}</li>
              ))}
            </ul>

            <div className="flex flex-col gap-2 rounded-xl border border-line bg-surface px-6 py-5">
              <p className="text-base font-bold text-ink">{d.deliveryTitle ?? "交付方式"}</p>
              <p className="text-[15px] leading-[1.75] text-muted">{d.deliveryNote}</p>
            </div>

            <a href={cartHref(p)} className="flex justify-center gap-3 rounded-full bg-lavender py-5 text-lg text-canvas transition-opacity hover:opacity-90">
              <span className="font-medium">加入購物車</span>
              <span aria-hidden className="font-display font-semibold">
                →
              </span>
            </a>

            <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
              {perks.map((perk) => (
                <li key={perk}>・{perk}</li>
              ))}
            </ul>
            <p className="flex flex-wrap gap-x-3 text-[15px]">
              <span className="text-muted">不想自己架？交給我們。</span>
              <Link href={consult.href} className="whitespace-pre font-medium text-lavender hover:underline">{`${consult.label}  →`}</Link>
            </p>
          </div>
        </div>

        <ProductTabs tabs={tabs} />

        {/* Overview, specs and FAQ (Figma 230:217) */}
        <div className="flex flex-col gap-24 px-6 py-24 lg:gap-[120px] lg:py-[120px] lg:pl-[160px] lg:pr-[264px]">
          <Block id="overview" eyebrow="OVERVIEW" title="商品介紹">
            {d.html ? <div className="article-body product-body" dangerouslySetInnerHTML={{ __html: d.html }} /> : <p className="text-lg leading-[2] text-ink">{d.lead}</p>}
          </Block>

          <Block id="specs" eyebrow="SPECS" title="規格與授權">
            <dl>
              {d.specs.map(([term, value, pending]) => (
                <div key={term} className="flex gap-6 border-b border-line py-5 text-base">
                  <dt className="w-[104px] shrink-0 font-medium text-muted lg:w-[200px]">{term}</dt>
                  <dd className={`min-w-0 flex-1 ${pending ? "text-lavender" : "text-ink"}`}>{value}</dd>
                </div>
              ))}
            </dl>
          </Block>

          <Block id="faq" eyebrow="FAQ" title="購買須知">
            <div className="flex flex-col gap-6">
              {faq.map((item, i) => (
                <details key={item.q} open={i === 0} className="group border-b border-line py-6">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-medium text-ink [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <span aria-hidden className="font-display text-xl font-semibold text-muted">
                      <span className="group-open:hidden">+</span>
                      <span className="hidden group-open:inline">−</span>
                    </span>
                  </summary>
                  <p className="mt-4 text-base leading-[1.8] text-muted">
                    {item.a}
                    {item.link && (
                      <Link href={item.link.href} className="ml-2 whitespace-nowrap text-lavender hover:underline">
                        {item.link.label} →
                      </Link>
                    )}
                  </p>
                </details>
              ))}
            </div>
          </Block>
        </div>

        {/* The other product (Figma 230:276) */}
        {other && (
          <section className="flex flex-col gap-8 border-t border-line bg-surface px-6 pb-24 pt-20 lg:pb-[120px] lg:pl-[160px] lg:pr-[264px] lg:pt-24">
            <p className="font-display text-sm font-semibold tracking-[0.2em] text-teal">ALSO AVAILABLE</p>
            <div className="flex flex-col overflow-hidden rounded-[4px] border border-line bg-canvas md:flex-row">
              <Link href={productHref(other)} className="relative block h-[240px] shrink-0 md:w-[420px]">
                <Image src={other.image} alt={`${other.name} 商品圖`} fill sizes="420px" className="object-cover" />
              </Link>
              <div className="flex flex-1 flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between lg:px-12">
                <div className="flex flex-col gap-2.5">
                  <h2 className="font-display text-[32px] font-bold text-ink">{other.name}</h2>
                  <p className="text-base text-muted">{other.pitch}</p>
                  <p className="flex items-center gap-3 font-mono">
                    <span className="text-2xl text-ink">{ntd(other.price)}</span>
                    <del className="text-[15px] text-muted">
                      <span className="sr-only">原價 </span>
                      {ntd(other.listPrice)}
                    </del>
                  </p>
                </div>
                <ViewMore href={productHref(other)} className="shrink-0" />
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}

function Block({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="flex scroll-mt-24 flex-col gap-10 lg:flex-row lg:gap-[120px]">
      <div className="flex flex-col gap-3 lg:w-[300px] lg:shrink-0">
        <p className="font-display text-[13px] font-semibold tracking-[0.2em] text-teal">{eyebrow}</p>
        <h2 className="font-mono text-[28px] font-medium leading-[1.4] text-ink lg:text-3xl">{title}</h2>
      </div>
      <div className="min-w-0 flex-1">{children}</div>
    </section>
  );
}
