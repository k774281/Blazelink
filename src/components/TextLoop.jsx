import { useEffect, useState } from 'react'
import { LazyMotion, domAnimation, m, AnimatePresence } from 'motion/react'
import { cn } from '../lib/utils.js'

export default function TextLoop({
  staticText = 'Design',
  rotatingTexts = ['Limitless', 'Timeless', 'Flawless'],
  className,
  interval = 3000,
  transition = { duration: 0.8, ease: 'easeInOut' },
  staticTextClassName,
  rotatingTextClassName,
  backgroundClassName,
  cursorClassName,
}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingTexts.length)
    }, interval)
    return () => clearInterval(timer)
  }, [rotatingTexts.length, interval])

  return (
    <LazyMotion features={domAnimation}>
      <div className={cn('flex flex-row items-center justify-start w-fit', className)}>
        <span className={cn('mr-3 whitespace-nowrap', staticTextClassName)}>{staticText}</span>
        <div className="relative flex items-center">
          <AnimatePresence mode="wait">
            <m.div
              key={rotatingTexts[index]}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={transition}
              className="relative overflow-hidden whitespace-nowrap"
            >
              <div
                className={cn(
                  'absolute inset-0',
                  'bg-gradient-to-r from-transparent via-brand-light/15 to-brand-light',
                  backgroundClassName,
                )}
              />
              <span
                className={cn(
                  'relative bg-gradient-to-r from-brand-dark to-ink bg-clip-text pr-1 text-transparent',
                  rotatingTextClassName,
                )}
              >
                {rotatingTexts[index]}
              </span>
            </m.div>
          </AnimatePresence>

          <m.div
            className={cn('h-[1.10em] w-[3px] bg-brand-light sm:h-[1em] md:w-[4px]', cursorClassName)}
            animate={{ opacity: [1, 0.5] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
          />
        </div>
      </div>
    </LazyMotion>
  )
}
