import { useEffect, useRef } from 'react'
import { ArrowUpRightIcon } from '@animateicons/react/lucide'
import { gsap } from '../lib/gsap.js'
import TextLoop from './TextLoop.jsx'

const STEPS = ['精準行銷策略', '內容成長執行', '數據優化迭代']

const PROCESS_IMAGES = [
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80',
  'img-6.jpg',
  'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=80',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=80',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80',
]

const BIG_FLOATS = [
  { style: { top: '40px', left: '24px' }, w: 212, aspect: '3/4', idx: 0 },
  { style: { top: '200px', right: '24px' }, w: 212, aspect: '3/4', idx: 1 },
  { style: { bottom: '120px', left: '18%' }, w: 212, aspect: '4/3', idx: 2 },
  { style: { bottom: '40px', right: '20%' }, w: 180, aspect: '3/4', idx: 3 },
]

const SMALL_FLOATS = [
  { style: { top: '80px', left: '28%' }, idx: 4 },
  { style: { top: '140px', left: '64%' }, idx: 5 },
  { style: { top: '280px', left: '14%' }, idx: 0 },
  { style: { top: '420px', right: '14%' }, idx: 1 },
  { style: { bottom: '220px', left: '8%' }, idx: 2 },
  { style: { bottom: '150px', left: '42%' }, idx: 3 },
]

export default function ProcessSection() {
  const sectionRef = useRef(null)
  // ArrowUpRightIcon only animates on its own internal hover (its own small
  // box), not the wider CTA — driven imperatively off the button's hover
  // instead, same as the other CTAs on the site.
  const arrowRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-anim='hand']").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          scale: 0.4,
          rotate: -8,
          duration: 0.7,
          ease: 'back.out(1.8)',
          transformOrigin: 'center',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        })
      })

      gsap.from("[data-anim='steps']", {
        opacity: 0,
        x: -40,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: "[data-anim='steps']", start: 'top 80%' },
      })

      gsap.utils.toArray("[data-anim='reveal']").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
      })

      gsap.utils.toArray("[data-anim='float']").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: (i % 6) * 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 95%' },
        })
        gsap.to(el, { y: '+=12', duration: 3 + (i % 3), repeat: -1, yoyo: true, ease: 'sine.inOut' })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative px-6 py-24 min-h-[900px] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="hidden lg:block pointer-events-none absolute inset-0">
        {BIG_FLOATS.map((f, i) => (
          <div
            key={i}
            data-anim="float"
            className="absolute overflow-hidden rounded-[50px] bg-mist"
            style={{ ...f.style, width: f.w, aspectRatio: f.aspect }}
          >
            <img src={PROCESS_IMAGES[f.idx]} className="size-full object-cover" alt="" />
          </div>
        ))}
      </div>
      <div className="hidden lg:block pointer-events-none absolute inset-0 opacity-50">
        {SMALL_FLOATS.map((f, i) => (
          <div
            key={i}
            className="absolute overflow-hidden rounded-[20px] bg-mist"
            style={{ ...f.style, width: 54, height: 54 }}
          >
            <img src={PROCESS_IMAGES[f.idx]} className="size-full object-cover" alt="" />
          </div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-10">
        <span data-anim="hand" className="font-hand text-ink text-3xl uppercase whitespace-nowrap">
          你可以對我們有期待
        </span>
        <div data-anim="steps" className="flex items-center pl-6">
          <TextLoop
            staticText="我們可以"
            rotatingTexts={STEPS}
            className="font-heading font-bold text-[32px] md:text-[48px] lg:text-[64px] leading-[0.96] tracking-[-2.56px] text-ink uppercase"
          />
        </div>
        <div data-anim="reveal" className="btn-border-wrap btn-border-wrap--accent hero-cta-wrap">
          <a
            href="#contact"
            className="btn btn-cta btn-cta--brand bg-[#f7f7f7] inline-flex items-center justify-center gap-2 rounded-[50px] px-7 py-3.5 text-xl font-medium max-sm:px-5 max-sm:py-3 max-sm:text-sm"
            onMouseEnter={() => arrowRef.current?.startAnimation()}
            onMouseLeave={() => arrowRef.current?.stopAnimation()}
          >
            <span className="btn-cta__label relative z-[2]">了解行銷內容</span>
            <span className="btn-cta__icon-wrap relative z-[2] flex items-center justify-center bg-ink/15 rounded-[50px] p-1.5">
              <ArrowUpRightIcon ref={arrowRef} size={32} duration={1} color="#281d38" />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
