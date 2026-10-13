import { useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import SpotlightBackground from './SpotlightBackground.jsx'
import CtaButton from './CtaButton.jsx'
import { asset } from '../lib/asset.js'
import { t, sitePath } from '../lib/locale.js'

const BODY_TEXT = t.bigCta.body

export default function BigCta() {
  const sectionRef = useRef(null)
  useScrollReveal(sectionRef, { hand: false })

  return (
    <section ref={sectionRef} className="mx-auto w-full max-w-[1440px]">
      {/* The reveal is on the copy and the button, not on the wrapper — with
          it on the whole block the backdrop faded in too, so until the
          animation fired this was just a gap in the page. */}
      <div
        className="bg-ink relative block overflow-hidden w-full py-12 lg:!py-[72px] px-8 lg:!px-12 bg-cover bg-center"
        style={{ backgroundImage: `url('${asset('/bg%202.png')}')` }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-16 lg:h-28 bg-gradient-to-b from-[#10141b] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-16 lg:h-28 bg-gradient-to-t from-[#10141b] to-transparent" />
        <SpotlightBackground className="flex flex-col items-center justify-center gap-8 text-center">
          <p
            data-anim="reveal"
            className="max-w-[720px] font-body text-base leading-relaxed text-white/90 md:text-lg"
          >
            {BODY_TEXT}
          </p>
          <CtaButton
            label={t.bigCta.cta}
            href={sitePath('martech', '/contact/')}
            variant="outline"
            iconWrapClassName="bg-white/15"
            dataAnim="reveal"
          />
        </SpotlightBackground>
      </div>
    </section>
  )
}
