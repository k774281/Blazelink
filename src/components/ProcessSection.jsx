import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap.js'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import TextLoop from './TextLoop.jsx'
import CtaButton from './CtaButton.jsx'

const STEPS = ['精準行銷策略', '內容成長執行', '數據優化迭代']

const PROCESS_IMAGES = [
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80',
  '/img-6.jpg',
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
  useScrollReveal(sectionRef, { float: true })

  // Bespoke slide-in for the step list — not part of the shared reveal/hand/
  // float set (useScrollReveal), so it keeps its own small effect here.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-anim='steps']", {
        opacity: 0,
        x: -40,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: "[data-anim='steps']", start: 'top 80%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto w-full max-w-[1440px] px-6 py-24 min-h-[900px] flex flex-col items-center justify-center overflow-hidden"
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
        <CtaButton
          label="了解行銷內容"
          href="#contact"
          variant="brand"
          iconWrapClassName="bg-ink/15"
          iconColor="#281d38"
          dataAnim="reveal"
        />
      </div>
    </section>
  )
}
