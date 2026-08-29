import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { ArrowUpRightIcon } from '@animateicons/react/lucide'
import TextGenerateEffect from './TextGenerateEffect.jsx'

const IMAGES = ['/img-1.jpg', '/img-2.jpg', '/img-3.jpg', '/img-4.jpg', '/img-5.jpg']

const SQUARE_DATA = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  src: IMAGES[i % IMAGES.length],
}))

function shuffle(array) {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

// motion's `layout` prop animates each cell's position via FLIP whenever its
// on-screen slot changes between renders — re-shuffling SQUARE_DATA's order
// (keys stay stable, only array position changes) is all that's needed to
// get the swap animation; nothing manually computes the transition.
function generateSquares() {
  return shuffle(SQUARE_DATA).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: 'spring' }}
      className="rounded-4xl"
      style={{ backgroundImage: `url(${sq.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    />
  ))
}

function ShuffleGrid() {
  const timeoutRef = useRef(null)
  const [squares, setSquares] = useState(generateSquares)

  useEffect(() => {
    const shuffleSquares = () => {
      setSquares(generateSquares())
      timeoutRef.current = setTimeout(shuffleSquares, 3000)
    }
    shuffleSquares()
    return () => clearTimeout(timeoutRef.current)
  }, [])

  {/* Cells are now a fixed 500x500px each (see generateSquares), so the
      grid's own height has to size to that content instead of forcing a
      fixed 450px total that would compress/clip the enlarged circles. */}
  return <div className="grid h-[450px] grid-cols-4 grid-rows-4 gap-1 max-sm:h-[300px]">{squares}</div>
}

export default function ShuffleHero() {
  // ArrowUpRightIcon only animates on its own internal hover (its own small
  // box), not the wider CTA — driven imperatively off the button's hover
  // instead, same as the other CTAs on the site.
  const arrowRef = useRef(null)

  // Drives both the h1/p text-generate reveal and the feature icons' pop-in
  // — toggles on every scroll in/out of view (no `once`), so leaving and
  // re-entering replays both animations instead of only firing the first time.
  const copyRef = useRef(null)
  const isInView = useInView(copyRef, { amount: 0.3 })

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-10 md:flex-row">
      <div ref={copyRef} className="flex-1">
        <span className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-ink/5 px-4 py-1.5 mb-5 text-xs font-medium uppercase tracking-wide text-brand-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            MARTECH
          </span>
        <TextGenerateEffect as="h1" trigger={isInView} className="font-heading text-3xl font-bold text-ink md:text-5xl">
          我們深入理解您的需求，打造真正見效的行銷成長策略
        </TextGenerateEffect>
        <TextGenerateEffect
          as="p"
          trigger={isInView}
          className="mb-8 mt-4 font-body text-xl text-muted md:text-xl"
          staggerDuration={0.03}
        >
          自動化獲客的成長引擎，讓品牌擁有可持續的正向循環。
        </TextGenerateEffect>
        {/* <a
          href="#services"
          className="inline-flex items-center gap-1.5 rounded-full bg-brand px-5 py-2.5 text-sm uppercase text-white transition-colors hover:bg-brand-dark"
        >
          了解服務
        </a> */}
        <div className="features flex flex-col gap-3">
          <div className="item flex items-center gap-3">
            <motion.img
              src="/social-marketing_17675704.gif"
              alt=""
              className="h-[100px] w-[100px] object-contain"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 12, delay: 0 }}
            />
            <p className="text-xl">精準行銷策略</p>
          </div>
          <div className="item flex items-center gap-3">
            <motion.img
              src="/movement.gif"
              alt=""
              className="h-[100px] w-[100px] object-contain"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 12, delay: 0.15 }}
            />
            <p className="text-xl">SEO跨國內容行銷</p>
          </div>
          <div className="item flex items-center gap-3">
            <motion.img
              src="/filter_19016344.gif"
              alt=""
              className="h-[100px] w-[100px] object-contain"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 12, delay: 0.3 }}
            />
            <p className="text-xl">自動化銷售漏斗</p>
          </div>
        </div>

        <div className="btn-border-wrap btn-border-wrap--accent hero-cta-wrap mt-10 opacity-0 animate-fade-up-sm [animation-delay:3.2s]">
          <button
            type="button"
            className="btn btn-cta btn-cta--brand bg-[#f7f7f7] inline-flex items-center justify-center gap-2 rounded-[50px] px-7 py-3.5 text-xl font-medium max-sm:px-5 max-sm:py-3 max-sm:text-sm"
            onMouseEnter={() => arrowRef.current?.startAnimation()}
            onMouseLeave={() => arrowRef.current?.stopAnimation()}
          >
            <span className="btn-cta__label relative z-[2]">了解內容行銷</span>
            <span className="btn-cta__icon-wrap relative z-[2] flex items-center justify-center bg-ink/15 rounded-[50px] p-1.5">
              <ArrowUpRightIcon ref={arrowRef} size={32} duration={1} color="#281d38" />
            </span>
          </button>
        </div>
      </div>
      <div className="flex-1">
        <ShuffleGrid />
      </div>
    </div>
  )
}
