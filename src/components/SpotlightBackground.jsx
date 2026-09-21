import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { cn } from '../lib/utils.js'

// Converted from the pasted framer-motion reference to this project's
// `motion/react` package. No CSS was included in the paste (only the JSX
// structure/class names), so `.spotlight-*` was hand-written to match: three
// large blurred radial-gradient blobs drifting/rotating behind the content.
function Spotlight({ className, ...props }) {
  return <motion.div className={`spotlight ${className}`} {...props} />
}

export default function SpotlightBackground({ children, className }) {
  const containerRef = useRef(null)
  // Three large blobs under filter: blur(80px), each on an infinite loop, are
  // expensive to recompute every frame — and this block sits at the very
  // bottom of the page, so they used to animate the whole way down. Only
  // mount them while the block is actually on screen.
  const inView = useInView(containerRef)

  return (
    <div ref={containerRef} className="spotlight-container">
      {inView && (
      <div className="spotlight-overlay">
        <Spotlight
          initial={{ x: '-50%', y: '-50%', rotate: '0deg' }}
          animate={{
            x: ['-50%', '-30%', '-70%', '-50%'],
            y: ['-50%', '-70%', '-30%', '-50%'],
            rotate: ['0deg', '15deg', '-15deg', '0deg'],
          }}
          transition={{
            duration: 12,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'mirror',
          }}
          className="spotlight-left"
        />

        <Spotlight
          initial={{ x: '0%', y: '0%', rotate: '0deg' }}
          animate={{
            x: ['0%', '20%', '-20%', '0%'],
            y: ['0%', '30%', '10%', '0%'],
            rotate: ['-20deg', '0deg', '20deg', '-20deg'],
          }}
          transition={{
            duration: 15,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'mirror',
            delay: 3,
          }}
          className="spotlight-mid"
        />

        <Spotlight
          initial={{ x: '0%', y: '0%', rotate: '10deg' }}
          animate={{
            x: ['0%', '-30%', '10%', '0%'],
            y: ['0%', '-20%', '20%', '0%'],
            rotate: ['10deg', '-10deg', '25deg', '10deg'],
          }}
          transition={{
            duration: 18,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'mirror',
            delay: 5,
          }}
          className="spotlight-right"
        />
      </div>
      )}

      <div className={cn('spotlight-content', className)}>{children}</div>
    </div>
  )
}
