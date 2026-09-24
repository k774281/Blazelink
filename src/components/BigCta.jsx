import { useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import SpotlightBackground from './SpotlightBackground.jsx'
import CtaButton from './CtaButton.jsx'

const BODY_TEXT =
  '我們深入了解需求，依品牌創造最適合的行銷策略與方法，進而不斷優化與改進，品牌的成長就是我們共同的目標。無論您是一家小型新創企業，還是一個已經穩固的品牌，我們都將全心投入，幫助您實現成功。與鏈客團隊合作，您不僅得到了專業的行銷服務，還擁有一個真正關心您業務成長的夥伴。我們的成功建立在您的成功之上，這就是我們為之努力的原因。'

export default function BigCta() {
  const sectionRef = useRef(null)
  useScrollReveal(sectionRef, { hand: false })

  return (
    <section ref={sectionRef} className="mx-auto w-full max-w-[1440px]">
      {/* The reveal is on the copy and the button, not on the wrapper — with
          it on the whole block the backdrop faded in too, so until the
          animation fired this was just a gap in the page. */}
      <div className="bg-ink relative block overflow-hidden w-full py-12 lg:!py-[72px] px-8 lg:!px-12 bg-[url('/bg%202.png')] bg-cover bg-center">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-16 lg:h-28 bg-gradient-to-b from-[#10141b] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-16 lg:h-28 bg-gradient-to-t from-[#10141b] to-transparent" />
        <SpotlightBackground className="flex flex-col items-center justify-center gap-8 text-center">
          <p
            data-anim="reveal"
            className="max-w-[720px] font-body text-base leading-relaxed text-white/90 md:text-lg"
          >
            {BODY_TEXT}
          </p>
          {/* Temporary: points at the old WordPress site until this page
              exists on this one. */}
          <CtaButton
            label="馬上諮詢"
            href="https://blazelink.co/contact/"
            variant="outline"
            iconWrapClassName="bg-white/15"
            dataAnim="reveal"
          />
        </SpotlightBackground>
      </div>
    </section>
  )
}
