import Image from "next/image";
import ContactForm from "../_components/ContactForm";
import SideNav from "../_components/SideNav";
import SiteFooter from "../_components/SiteFooter";
import { Eyebrow, PageHeader } from "../_components/ui";
import { header, intro } from "../_data/contact";
import { asset } from "../_lib/base";

export const metadata = {
  alternates: { canonical: "/web-design/contact/" },
  title: "聯繫我們｜Blazelink 鏈客",
  description: "想做形象網站或改版現有網站？留下基本資料，我們會在兩個工作天內回覆，並從設計藍圖開始陪你規劃。",
};

export default function ContactPage() {
  return (
    <>
      <SideNav />
      <main>
        <PageHeader crumb="聯繫我們" display={header.display} title={header.title} lead={header.lead} compact>
          <Image src={asset("/home/bg-3.webp")} alt="" fill preload sizes="100vw" className="object-cover" />
        </PageHeader>

        {/*
          Intro beside the form (Figma 318:391). The 1920 layout leaves the form
          too little room below 1680px (3xl), so narrower screens get less padding
          and a narrower intro, and below 1280px the intro sits above the form.
          The right padding clears the fixed side nav.
        */}
        <section className="flex flex-col gap-16 px-6 pb-24 pt-10 lg:pb-[160px] lg:pl-16 lg:pr-[136px] xl:flex-row xl:items-start xl:gap-16 3xl:gap-[120px] 3xl:px-[160px]">
          <div className="flex flex-col gap-10 xl:w-[400px] xl:shrink-0 3xl:w-[520px]">
            <div className="flex flex-col gap-6">
              <Eyebrow>{intro.eyebrow}</Eyebrow>
              <p className="font-mono text-[32px] font-medium leading-[1.35] text-ink lg:text-[44px] xl:text-[36px] 3xl:text-[44px]">
                {intro.title.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <p className="text-[17px] leading-[1.9] text-muted">{intro.lead}</p>
            </div>

            <div className="flex flex-col gap-6 border-t border-line pt-10">
              <p className="font-display text-xs font-semibold tracking-[0.2em] text-muted">NEXT STEPS</p>
              <ol className="flex flex-col gap-6">
                {intro.steps.map((step) => (
                  <li key={step.no} className="flex gap-5">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-lavender/16 font-mono text-sm font-medium text-lavender">{step.no}</span>
                    <div className="flex flex-col gap-1.5 pt-2">
                      <p className="text-lg font-bold text-ink">{step.title}</p>
                      <p className="text-[15px] leading-[1.7] text-muted">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <dl className="flex flex-col gap-3.5 rounded-[4px] border border-line bg-surface px-8 py-7">
              {intro.details.map((row) => (
                <div key={row.label} className="flex gap-4">
                  <dt className="w-[72px] shrink-0 text-sm text-muted">{row.label}</dt>
                  <dd className="font-mono text-[15px] text-ink">
                    {row.href ? (
                      <a href={row.href} className="transition-colors hover:text-lavender">
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <ContactForm />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
