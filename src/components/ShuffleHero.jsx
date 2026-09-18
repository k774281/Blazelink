import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import TextGenerateEffect from './TextGenerateEffect.jsx'
import CtaButton from './CtaButton.jsx'

export default function ShuffleHero() {
  // Drives both the h1/p text-generate reveal and the feature icons' pop-in
  // — toggles on every scroll in/out of view (no `once`), so leaving and
  // re-entering replays both animations instead of only firing the first time.
  const copyRef = useRef(null)
  const isInView = useInView(copyRef, { amount: 0.3 })

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center gap-6 md:flex-row">
      <div ref={copyRef} className="w-2/5 max-lg:w-5/5">
        <span className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-ink/5 px-4 py-1.5 mb-5 text-xs font-medium uppercase tracking-wide text-brand-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            MARTECH
          </span>
        <TextGenerateEffect as="h1" trigger={isInView} className="font-heading text-5xl font-bold text-ink md:text-4xl max-lg:text-center max-sm:text-[24px]">
          我們深入理解您的需求，打造真正見效的行銷成長策略
        </TextGenerateEffect>
        <TextGenerateEffect
          as="p"
          trigger={isInView}
          className="mb-8 mt-4 font-body text-xl text-muted md:text-2xl max-lg:text-center max-sm:text-[16px]"
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
                className="h-[100px] w-[100px] object-contain max-lg:h-[70px] max-lg:w-[70px]"
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
                className="h-[100px] w-[100px] object-contain max-lg:h-[70px] max-lg:w-[70px]"
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
                className="h-[100px] w-[100px] object-contain max-lg:h-[70px] max-lg:w-[70px]"
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
      <motion.div
        className="w-2/5 max-lg:w-5/5 rounded-[50px]"
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={isInView ? { clipPath: 'inset(0 0% 0 0)' } : { clipPath: 'inset(0 100% 0 0)' }}
        transition={{ duration: 1, delay: 1.7, ease: 'easeOut' }}
      >
        <img
          src="/shuffle-1.png"
          alt=""
          className="h-[450px] w-full rounded-[50px] object-cover shadow-xl max-sm:h-[300px]"
        />
      </motion.div>
    </div>
  )
}
