import TypewriterHeading from './TypewriterHeading.jsx'
import CtaButton from './CtaButton.jsx'
import { t, sitePath } from '../lib/locale.js'

export const HEADING_TEXT = t.hero.heading

// The closing phrase is drawn in a gradient, one colour per character — this
// palette, repeated across however many characters the language's phrase has.
const PALETTE = [
  'rgb(169, 172, 252)',
  'rgb(157, 160, 242)',
  'rgb(161, 159, 234)',
  'rgb(181, 175, 242)',
  'rgb(159, 168, 246)',
  'rgb(169, 176, 242)',
  'rgb(172, 184, 245)',
]
const SPLIT = HEADING_TEXT.indexOf(t.hero.accent)
const CLOSING_PHRASE_COLORS = Array.from(t.hero.accent, (_, i) => PALETTE[i % PALETTE.length])

export default function HeroLeft() {
  return (
    <section className="hero-left relative flex-[0_1_600px] max-w-[450px] pt-10 animate-fade-up max-lg:max-w-[600px] max-lg:w-full max-[1079px]:flex max-[1079px]:flex-none max-[1079px]:flex-col max-[1079px]:items-center max-[1079px]:text-center">
      <TypewriterHeading
        text={HEADING_TEXT}
        splitIndex={SPLIT}
        speed={35}
        startDelay={400}
        colorBefore="#ffffff"
        accentColors={CLOSING_PHRASE_COLORS}
      />

      <div className="max-[1079px]:mt-10 max-[1079px]:flex max-[1079px]:flex-row max-[1079px]:items-center max-[1079px]:gap-4">
        <CtaButton
          label={t.hero.martech}
          href={sitePath('martech')}
          variant="outline"
          iconWrapClassName="bg-white/15"
          wrapClassName="mt-10 opacity-0 animate-fade-up-sm [animation-delay:3.2s] max-[1079px]:mt-0"
        />
        <CtaButton
          label={t.hero.webDesign}
          href={sitePath('web-design')}
          variant="outline"
          buttonClassName="bg-[#190964]"
          iconWrapClassName="bg-white/15"
          wrapClassName="mt-10 ml-4 opacity-0 animate-fade-up-sm [animation-delay:3.2s] max-[1079px]:mt-0 max-[1079px]:ml-0"
        />
      </div>
    </section>
  )
}
