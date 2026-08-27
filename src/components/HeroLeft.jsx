import { useRef } from 'react'
import { ArrowUpRightIcon } from '@animateicons/react/lucide'
import TypewriterHeading from './TypewriterHeading.jsx'

const HEADING_TEXT =
  '為 B2B 企業、知識服務、跨國品牌打造，\n自動化獲客的成長引擎，讓品牌擁有可持續的正向循環。'

// One color per character of "持續的正向循環" (indices 39-45, right after
// splitIndex) — a per-glyph gradient rather than the flat colorAfter tone.
const CLOSING_PHRASE_COLORS = [
  'rgb(169, 172, 252)', // 持
  'rgb(157, 160, 242)', // 續
  'rgb(161, 159, 234)', // 的
  'rgb(181, 175, 242)', // 正
  'rgb(159, 168, 246)', // 向
  'rgb(169, 176, 242)', // 循
  'rgb(172, 184, 245)', // 環
]

export default function HeroLeft() {
  // ArrowUpRightIcon only animates on its own internal hover — which fires
  // solely when the cursor is over the icon's own small box, not the wider
  // CTA. Driving it imperatively off each button's hover instead makes it
  // trigger whenever any part of that CTA is hovered — each button needs
  // its own ref, since sharing one means only the last-mounted icon ever
  // actually receives the imperative calls.
  const arrowRef = useRef(null)
  const arrowRef2 = useRef(null)

  return (
    <section className="hero-left relative flex-[0_1_600px] pt-10 animate-fade-up max-lg:max-w-[600px] max-lg:w-full">
      <TypewriterHeading
        text={HEADING_TEXT}
        splitIndex={39}
        speed={35}
        startDelay={400}
        colorBefore="#ffffff"
        accentColors={CLOSING_PHRASE_COLORS}
      />

      <div className="btn-border-wrap btn-border-wrap--accent hero-cta-wrap mt-10 opacity-0 animate-fade-up-sm [animation-delay:3.2s]">
        <button
          type="button"
          className="btn btn-cta btn-cta--outline inline-flex items-center justify-center gap-2 rounded-[50px] px-7 py-3.5 text-xl font-medium max-sm:px-5 max-sm:py-3 max-sm:text-sm"
          onMouseEnter={() => arrowRef.current?.startAnimation()}
          onMouseLeave={() => arrowRef.current?.stopAnimation()}
        >
          <span className="btn-cta__label relative z-[2]">了解內容行銷</span>
          <span className="btn-cta__icon-wrap relative z-[2] flex items-center justify-center bg-white/15 rounded-[50px] p-1.5">
            <ArrowUpRightIcon ref={arrowRef} size={32} duration={1} color="#ffffff" />
          </span>
        </button>
      </div>
      <div className="btn-border-wrap btn-border-wrap--accent hero-cta-wrap mt-10 ml-4 opacity-0 animate-fade-up-sm [animation-delay:3.2s]">
        <button
          type="button"
          className="btn btn-cta btn-cta--outline inline-flex items-center justify-center gap-2 rounded-[50px] bg-[#190964] px-7 py-3.5 text-xl font-medium max-sm:px-5 max-sm:py-3 max-sm:text-sm"
          onMouseEnter={() => arrowRef2.current?.startAnimation()}
          onMouseLeave={() => arrowRef2.current?.stopAnimation()}
        >
          <span className="btn-cta__label relative z-[2]">了解網站案例</span>
          <span className="btn-cta__icon-wrap relative z-[2] flex items-center justify-center bg-white/15 rounded-[50px] p-1.5">
            <ArrowUpRightIcon ref={arrowRef2} size={32} duration={1} color="#ffffff" />
          </span>
        </button>
      </div>
    </section>
  )
}
