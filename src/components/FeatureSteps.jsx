import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '../lib/utils.js'

// Hand-built recreation of the "FeatureSteps" block (numbered step list that
// auto-advances on a timer, paired with a cross-fading image panel) — no
// portable source was pasted, only its usage, so this reproduces the
// documented behavior: progress bar fills over `autoPlayInterval`, then
// steps to the next feature and loops; clicking a step jumps to it directly.
export function FeatureSteps({ features, title, autoPlayInterval = 3000, imageHeight = 'h-[400px]' }) {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentFeature((c) => (c + 1) % features.length)
          return 0
        }
        return prev + 100 / (autoPlayInterval / 100)
      })
    }, 100)
    return () => clearInterval(timer)
  }, [autoPlayInterval, features.length])

  return (
    <div className="mx-auto w-full max-w-[1440px]">
      {title && (
        <h2 className="mb-10 text-center text-3xl font-bold text-white md:text-4xl lg:text-5xl">{title}</h2>
      )}
      <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-8">
        <div className="order-2 flex flex-col gap-6 max-md:items-center">
          {features.map((ft, index) => (
            <button
              type="button"
              key={ft.feature}
              onClick={() => {
                setCurrentFeature(index)
                setProgress(0)
              }}
              className="flex items-start gap-5 text-left max-md:flex-col max-md:items-center max-md:text-center"
            >
              <span
                className={cn(
                  'flex h-15 w-15 shrink-0 items-center justify-center rounded-full border text-xl md:text-3xl max-sm:text-[20px] font-semibold transition-colors max-md:h-[40px] max-md:w-[40px]',
                  index === currentFeature ? 'border-brand bg-brand text-ink' : 'border-white/20 text-white/80',
                )}
              >
                {index + 1}
              </span>
              <div className="flex flex-1 flex-col gap-5 max-md:items-center">
                <p
                  className={cn(
                    'font-display text-lg md:text-base max-sm:text-[16px] font-medium uppercase tracking-wide',
                    index === currentFeature ? 'text-brand' : 'text-white/40',
                  )}
                >
                  {ft.feature}
                </p>
                <h3
                  className={cn(
                    'font-heading text-3xl md:text-2xl max-sm:text-[24px] font-semibold transition-colors',
                    index === currentFeature ? 'text-white' : 'text-white/60',
                  )}
                >
                  {ft.title}
                </h3>
                {/* Both of these used to mount only for the active step, and
                    the description animated height 0 -> auto. Because height
                    is a layout property, every 4s swap resized this section by
                    20px and shifted everything below it — visible as a jump
                    while scrolling further down the page. They now stay
                    mounted so the block's height never changes. */}
                <p className="font-body text-xl md:text-lg max-sm:text-[16px] text-white/60">
                  {ft.content}
                </p>
                <div className="mt-2 h-0.5 w-full max-w-[220px] overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full bg-brand"
                    style={{
                      width: index === currentFeature ? `${progress}%` : '0%',
                      transition: 'width 100ms linear',
                    }}
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className={cn('relative order-1 w-full overflow-hidden rounded-2xl', imageHeight)}>
          <AnimatePresence mode="wait">
            <motion.img
              key={currentFeature}
              src={features[currentFeature].image}
              alt={features[currentFeature].title}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default FeatureSteps
