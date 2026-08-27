import TypewriterHeading from './TypewriterHeading.jsx'

const HEADING_TEXT =
  '為 B2B 企業、知識服務、跨國品牌打造，\n自動化獲客的成長引擎，讓品牌擁有可持續的正向循環。'

export default function HeroLeft() {
  return (
    <section className="hero-left relative flex-[0_1_600px] pt-10 animate-fade-up max-lg:max-w-[600px] max-lg:w-full">
      <TypewriterHeading text={HEADING_TEXT} splitIndex={39} speed={35} startDelay={400} colorBefore="#ffffff" />

      <div className="btn-border-wrap btn-border-wrap--accent hero-cta-wrap mt-10 opacity-0 animate-fade-up-sm [animation-delay:3.2s]">
        <button
          type="button"
          className="btn btn-cta group inline-flex items-center justify-center gap-2 rounded-[50px] bg-brand text-white px-7 py-3.5 text-xl font-medium max-sm:px-5 max-sm:py-3 max-sm:text-sm"
        >
          <span className="btn-cta__label relative z-[2]">了解內容行銷</span>
          <span className="btn-cta__icon-wrap relative z-[2] flex items-center justify-center bg-white/15 rounded-[50px] p-1.5">
            <svg
              className="btn-cta__icon text-white transition-transform duration-300 group-hover:-rotate-45"
              width="28"
              height="28"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 9H14M14 9L9.5 4.5M14 9L9.5 13.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>
    </section>
  )
}
