import Eyebrow from "./Eyebrow";

/**
 * The rounded gradient panel the contact and policy pages open with, here
 * holding a post's or lecture's title. `aside` sits beside the text on wide
 * screens (a lecture's artwork).
 */
export default function ContentHero({ zh, en, title, children, aside = null }) {
  return (
    <section className="-mt-[var(--header-h)] bg-white p-4 pt-[var(--header-h)] md:p-[24px] md:pt-[var(--header-h)]">
      <div
        className="flex flex-col gap-[40px] rounded-[20px] px-6 pt-[72px] pb-[56px] md:px-10 lg:flex-row lg:items-center lg:justify-between xl:px-[120px] xl:pt-[136px] xl:pb-[80px]"
        style={{
          backgroundImage:
            "linear-gradient(-8.76deg, rgb(255,255,255) 7.84%, rgb(241,242,246) 56.75%, rgb(233,235,241) 92.16%)",
        }}
      >
        <div className="flex max-w-[760px] flex-col items-start">
          <Eyebrow zh={zh} en={en} />
          <h1 className="pt-[20px] text-[30px] leading-[1.35] font-bold tracking-[-1.2px] text-ink md:text-[44px]">
            {title}
          </h1>
          {children}
        </div>
        {aside}
      </div>
    </section>
  );
}
