import { useRef } from 'react'
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from 'motion/react'
import { cn } from '../lib/utils.js'

function wrap(min, max, value) {
  const range = max - min
  return ((((value - min) % range) + range) % range) + min
}

// A row of children repeated 4x, sliding at a constant base speed that
// speeds up and reverses direction to follow the page's own scroll
// velocity. wrap() confines the translateX to a single copy-width span
// (-25% to -50%, i.e. copies 2 and 3 of the 4), so it loops seamlessly
// forever instead of the accumulator drifting off unbounded.
export function ScrollVelocity({ children, velocity = 5, className = '' }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false })

  const directionFactor = useRef(1)
  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * velocity * (delta / 3000)

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get()
    baseX.set(baseX.get() + moveBy)
  })

  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`)

  return (
    <div className={cn('w-full overflow-hidden whitespace-nowrap', className)}>
      <motion.div className="inline-flex whitespace-nowrap" style={{ x }}>
        <span className="inline-flex">{children}</span>
        <span className="inline-flex">{children}</span>
        <span className="inline-flex">{children}</span>
        <span className="inline-flex">{children}</span>
      </motion.div>
    </div>
  )
}
