import Image from "next/image";
import Link from "next/link";
import SideNav from "../_components/SideNav";
import SiteFooter from "../_components/SiteFooter";
import { CtaBand, Eyebrow, PageHeader } from "../_components/ui";
import { allInOne, cta, dualEngine, founder, header, howWeBuild, philosophy, results } from "../_data/about";
import { asset } from "../_lib/base";

export const metadata = {
  title: "關於鏈客｜Blazelink 鏈客",
  description: "策略與科技，是我們的雙引擎。先設計、再開工，網站資產完全屬於你——認識鏈客與創辦人 Ben。",
};

const shell = "px-6 py-24 lg:px-[160px] lg:py-[140px]";
const h2 = "font-mono text-[32px] font-medium leading-[1.35] text-ink lg:text-3xl";

export default function AboutPage() {
  return (
    <>
      <SideNav />
      <main>
        <PageHeader crumb="關於鏈客" display={header.display} title={header.title} lead={header.lead}>
          <Image src={asset("/home/bg-1.webp")} alt="" fill preload sizes="100vw" className="object-cover" />
        </PageHeader>

        {/* 01 Philosophy (Figma 303:388) */}
        <section className="flex flex-col gap-16 px-6 pb-24 pt-10 lg:px-[160px] lg:pb-[140px]">
          <Eyebrow>{philosophy.eyebrow}</Eyebrow>
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-[120px]">
            <div className="flex min-w-0 flex-1 flex-col gap-12">
              <p className="font-mono text-[32px] font-medium leading-[1.35] text-ink lg:text-[48px]">
                {philosophy.statement.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <div className="flex flex-col gap-7 text-base leading-[2] lg:text-lg">
                {philosophy.body.map((p) => (
                  <p key={p} className="text-muted">
                    {p}
                  </p>
                ))}
                <p className="text-ink">{philosophy.closing}</p>
              </div>
            </div>
            <div className="relative aspect-[560/680] w-full overflow-hidden rounded-[4px] lg:w-[560px] lg:shrink-0">
              <Image src={philosophy.image} alt="" fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
            </div>
          </div>
        </section>

        {/* 02 Dual engine (Figma 303:396) */}
        <section className={`flex flex-col gap-14 border-t border-line bg-surface lg:flex-row lg:items-center lg:gap-[120px] ${shell}`}>
          <div className="flex gap-4 sm:gap-6 lg:shrink-0">
            <div className="relative aspect-[400/520] flex-[4] overflow-hidden rounded-[4px] lg:w-[400px] lg:flex-none">
              <Image src={dualEngine.images[0]} alt="" fill sizes="(min-width: 1024px) 400px, 55vw" className="object-cover" />
            </div>
            <div className="flex-[3] pt-[22%] lg:w-[300px] lg:flex-none lg:pt-[120px]">
              <div className="relative aspect-[300/400] overflow-hidden rounded-[4px]">
                <Image src={dualEngine.images[1]} alt="" fill sizes="(min-width: 1024px) 300px, 40vw" className="object-cover" />
              </div>
            </div>
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-7">
            <Eyebrow>{dualEngine.eyebrow}</Eyebrow>
            <h2 className={h2}>
              {dualEngine.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            {dualEngine.paragraphs.map((runs, i) => (
              <p key={i} className="text-base leading-[2] text-muted lg:text-lg">
                {runs.map((run, j) =>
                  run.strong ? (
                    <strong key={j} className="font-bold text-lavender">
                      {run.text}
                    </strong>
                  ) : (
                    <span key={j}>{run.text}</span>
                  ),
                )}
              </p>
            ))}
          </div>
        </section>

        {/* 03 All in one (Figma 303:406) */}
        <section className={`flex flex-col gap-8 ${shell}`}>
          <div className="relative flex flex-col items-center gap-7 overflow-hidden rounded-[4px] border border-line bg-[linear-gradient(156deg,rgba(112,77,227,0.45)_0%,rgba(143,209,210,0.12)_51%)] px-6 py-16 text-center lg:p-[120px]">
            <Image src={allInOne.image} alt="" fill sizes="100vw" className="pointer-events-none object-cover opacity-[0.06]" />
            <Eyebrow className="relative">{allInOne.eyebrow}</Eyebrow>
            <h2 className="relative font-mono text-[28px] font-medium leading-[1.35] text-ink lg:text-[36px]">{allInOne.title}</h2>
            <p className="relative max-w-[880px] text-base leading-[2] text-ink lg:text-lg">{allInOne.paragraphs[0]}</p>
            <p className="relative max-w-[880px] text-base leading-[2] text-muted lg:text-lg">{allInOne.paragraphs[1]}</p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
            <p className="shrink-0 text-sm font-medium text-muted">{allInOne.scopeLabel}</p>
            <ul className="flex flex-wrap gap-2.5">
              {allInOne.scope.map((item) => {
                const on = item === allInOne.highlight;
                return (
                  <li
                    key={item}
                    className={`rounded-full border px-[22px] py-2.5 text-base font-medium ${on ? "border-lavender bg-lavender/16 text-lavender" : "border-line text-ink"}`}
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* 04 How we build — this site only (Figma 303:428) */}
        <section className={`flex flex-col gap-14 border-t border-line ${shell}`}>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-4">
              <Eyebrow>{howWeBuild.eyebrow}</Eyebrow>
              <h2 className={h2}>{howWeBuild.title}</h2>
            </div>
            <Link href={howWeBuild.more.href} className="whitespace-pre text-base font-medium text-lavender hover:underline">{`${howWeBuild.more.label}  →`}</Link>
          </div>
          <ul className="grid gap-6 md:grid-cols-3">
            {howWeBuild.items.map((item) => (
              <li key={item.no} className="flex flex-col gap-4 rounded-[4px] border border-line bg-surface px-8 pb-11 pt-10 lg:px-10">
                <p className="font-display text-[40px] font-bold leading-none text-lavender">{item.no}</p>
                <h3 className="mt-6 text-[26px] font-bold text-ink">{item.title}</h3>
                <p className="text-base leading-[1.85] text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* 05 Results (Figma 303:450) */}
        <section className={`flex flex-col gap-14 border-t border-line bg-surface ${shell}`}>
          <div className="flex flex-col gap-4">
            <Eyebrow>{results.eyebrow}</Eyebrow>
            <h2 className={h2}>{results.title}</h2>
          </div>
          <ul className="grid gap-12 md:grid-cols-3 md:gap-6">
            {results.items.map((item) => (
              <li key={item.no} className="flex flex-col gap-4">
                <div className="relative mb-3 h-[240px] overflow-hidden rounded-[4px] lg:h-[300px]">
                  <Image src={item.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                </div>
                <p className="font-mono text-xl font-medium tracking-[0.06em] text-lavender">{item.no}</p>
                <h3 className="text-[28px] font-bold text-ink lg:text-[32px]">{item.title}</h3>
                <p className="text-base leading-[1.85] text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* 06 Founder (Figma 303:473) */}
        <section className={`flex flex-col gap-12 lg:flex-row lg:gap-[120px] ${shell}`}>
          <div className="relative mx-auto aspect-[520/640] w-full max-w-[400px] overflow-hidden rounded-[4px] lg:mx-0 lg:w-[520px] lg:max-w-none lg:shrink-0">
            <Image src={founder.portrait} alt="鏈客創辦人 Ben" fill sizes="(min-width: 1024px) 520px, 400px" className="object-cover object-[50%_25%]" />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-5">
            <Eyebrow>{founder.eyebrow}</Eyebrow>
            <h2 className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
              <span className="font-display text-[64px] font-bold leading-none tracking-[-0.02em] text-ink lg:text-[88px]">{founder.name}</span>
              <span className="text-base font-medium text-muted">{founder.role}</span>
            </h2>
            <p className="text-[22px] font-bold leading-[1.6] text-ink lg:text-[26px]">{founder.lead}</p>
            {founder.body.map((p) => (
              <p key={p} className="text-base leading-[1.95] text-muted lg:text-[17px]">
                {p}
              </p>
            ))}
            <div className="flex flex-col items-start gap-6 border-t border-line pt-6">
              <ul className="flex flex-wrap gap-2">
                {founder.skills.map((s) => (
                  <li key={s} className="rounded-full border border-line px-3.5 py-1.5 text-[13px] text-lavender">
                    {s}
                  </li>
                ))}
              </ul>
              <a
                href={founder.cta.href}
                className="whitespace-pre rounded-full border border-lavender px-7 py-4 text-base font-medium text-lavender transition-colors hover:bg-lavender/16"
              >{`${founder.cta.label}  →`}</a>
            </div>
          </div>
        </section>

        <CtaBand data={cta} />
      </main>
      <SiteFooter />
    </>
  );
}
