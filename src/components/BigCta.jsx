import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap.js'
import SpotlightBackground from './SpotlightBackground.jsx'

export default function BigCta() {
  const wrapRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(wrapRef.current, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: wrapRef.current, start: 'top 85%' },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="px-6 pt-12">
      <div ref={wrapRef}>
        <a
          href="#contact"
          className="bg-ink relative block overflow-hidden hover:opacity-90 transition w-full py-12 lg:!py-[72px] px-8 lg:!px-12"
        >
          <SpotlightBackground className="flex items-center justify-center text-white font-heading font-bold uppercase whitespace-nowrap text-[32px] lg:!text-[64px] tracking-[-2.56px] gap-5">
            <span>現在馬上諮詢</span>
            <svg className="size-8 lg:size-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </SpotlightBackground>
        </a>
      </div>
    </section>
  )
}
