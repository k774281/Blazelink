import { useMemo } from 'react'
import { motion } from 'motion/react'
import { cn } from '../lib/utils.js'

// Splits by character rather than the original's `split(' ')` — this
// project's copy is Chinese with no word-separating spaces, so a
// space-based split would produce one single "word" and skip the stagger
// entirely. Per-character staggering degrades gracefully for English too.
export default function TextGenerateEffect({
  children,
  as = 'p',
  className,
  wordClassName,
  trigger = true,
  staggerDuration = 0.05,
  transition = { duration: 0.5 },
  filter = true,
}) {
  const chars = useMemo(() => Array.from(children), [children])
  const MotionTag = motion[as]

  return (
    <MotionTag aria-label={children} className={cn('inline-block', className)}>
      <span className="sr-only">{children}</span>
      {chars.map((char, i) => (
        <motion.span
          animate={
            trigger
              ? { filter: filter ? 'blur(0px)' : undefined, opacity: 1 }
              : { filter: filter ? 'blur(4px)' : undefined, opacity: 0 }
          }
          aria-hidden="true"
          className={cn('inline-block whitespace-pre opacity-0', wordClassName)}
          initial={{ filter: filter ? 'blur(4px)' : undefined, opacity: 0 }}
          key={`${i}-${char}`}
          transition={{ ...transition, delay: i * staggerDuration }}
        >
          {char}
        </motion.span>
      ))}
    </MotionTag>
  )
}
