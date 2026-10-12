import Header from "./Header";
import SiteFooter from "./SiteFooter";
import Eyebrow from "./Eyebrow";

/**
 * A policy page: the same rounded gradient panel the contact page opens with,
 * holding the title, then the text in .legal-body.
 */
export default function LegalPage({ doc }) {
  return (
    <>
      <Header />
      {/* Opaque and above the footer, so scrolling the last screen uncovers it. */}
      <main className="relative z-10 bg-white">
        <section className="-mt-[var(--header-h)] bg-white p-4 pt-[var(--header-h)] md:p-[24px] md:pt-[var(--header-h)]">
          <div
            className="flex flex-col items-start rounded-[20px] px-6 pt-[72px] pb-[56px] md:px-10 xl:px-[120px] xl:pt-[136px] xl:pb-[80px]"
            style={{
              backgroundImage:
                "linear-gradient(-8.76deg, rgb(255,255,255) 7.84%, rgb(241,242,246) 56.75%, rgb(233,235,241) 92.16%)",
            }}
          >
            <Eyebrow zh={doc.title} en={doc.en} />
            <h1 className="pt-[20px] text-[34px] leading-[1.3] font-bold tracking-[-1.44px] text-ink md:text-[48px]">
              {doc.title}
            </h1>
            <p className="max-w-[560px] pt-[22px] text-[17px] leading-[1.95] font-light text-body">
              {doc.lead.join("")}
            </p>
            <p className="font-mono-brand pt-[24px] text-[12px] font-bold tracking-[1.2px] text-faint">
              最後更新 {doc.updated}
            </p>
          </div>
        </section>

        <div className="px-6 pt-[56px] pb-[96px] md:px-[64px] xl:px-[144px] xl:pb-[136px]">
          <article className="legal-body max-w-[820px]" dangerouslySetInnerHTML={{ __html: doc.html }} />
        </div>
      </main>
      <SiteFooter onThisPage={null} />
    </>
  );
}
