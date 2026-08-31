import TypewriterHeading from './TypewriterHeading.jsx'
import CtaButton from './CtaButton.jsx'

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
  return (
    <section className="hero-left relative flex-[0_1_600px] pt-10 animate-fade-up max-lg:max-w-[600px] max-lg:w-full max-[1079px]:flex max-[1079px]:flex-none max-[1079px]:flex-col max-[1079px]:items-center max-[1079px]:text-center">
      <TypewriterHeading
        text={HEADING_TEXT}
        splitIndex={39}
        speed={35}
        startDelay={400}
        colorBefore="#ffffff"
        accentColors={CLOSING_PHRASE_COLORS}
      />

      <div className="max-[1079px]:mt-10 max-[1079px]:flex max-[1079px]:flex-row max-[1079px]:items-center max-[1079px]:gap-4">
        <CtaButton
          label="了解內容行銷"
          variant="outline"
          iconWrapClassName="bg-white/15"
          wrapClassName="mt-10 opacity-0 animate-fade-up-sm [animation-delay:3.2s] max-[1079px]:mt-0"
        />
        <CtaButton
          label="了解網站案例"
          variant="outline"
          buttonClassName="bg-[#190964]"
          iconWrapClassName="bg-white/15"
          wrapClassName="mt-10 ml-4 opacity-0 animate-fade-up-sm [animation-delay:3.2s] max-[1079px]:mt-0 max-[1079px]:ml-0"
        />
      </div>
    </section>
  )
}
