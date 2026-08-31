import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import TextGenerateEffect from './TextGenerateEffect.jsx'
import CtaButton from './CtaButton.jsx'

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

// motion's `layout="position"` animates each cell's position via FLIP
// whenever its on-screen slot changes between renders — re-shuffling
// SQUARE_DATA's order (keys stay stable, only array position changes) is
// all that's needed to get the swap animation; nothing manually computes
// the transition. Scoped to "position" rather than plain `layout` (which
// also interpolates size) because every cell is already the same size via
// the CSS Grid track — animating size too made Motion briefly write
// explicit pixel width/height inline during the FLIP measurement, fighting
// the grid's own 1fr sizing and visibly displacing the cells each reshuffle.
function generateSquares() {
  return shuffle(SQUARE_DATA).map((sq) => (
    <motion.div
      key={sq.id}
      layout="position"
      transition={{ duration: 1.5, type: 'spring' }}
      className="rounded-2xl"
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

  return <div className="grid h-[450px] grid-cols-4 grid-rows-4 gap-1 max-sm:h-[300px]">{squares}</div>
}

export default function ShuffleHero() {
  // Drives both the h1/p text-generate reveal and the feature icons' pop-in
  // — toggles on every scroll in/out of view (no `once`), so leaving and
  // re-entering replays both animations instead of only firing the first time.
  const copyRef = useRef(null)
  const isInView = useInView(copyRef, { amount: 0.3 })

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center gap-6 md:flex-row">
      <div ref={copyRef} className="w-2/5 max-lg:w-4/5">
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
        <div className="max-lg:flex max-lg:flex-col max-lg:items-center">
          <div className="features flex flex-col gap-3 max-lg:items-center">
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

          <CtaButton
            label="了解內容行銷"
            variant="brand"
            iconWrapClassName="bg-ink/15"
            iconColor="#281d38"
            wrapClassName="mt-10 opacity-0 animate-fade-up-sm [animation-delay:3.2s]"
          />
        </div>
      </div>
      <div className="w-2/5 max-lg:w-4/5">
        <ShuffleGrid />
      </div>
    </div>
  )
}
