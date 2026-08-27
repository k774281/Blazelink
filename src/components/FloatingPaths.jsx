import { motion } from 'motion/react'

const PATH_COUNT = 36

function buildPaths(position) {
  return Array.from({ length: PATH_COUNT }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${
      312 - i * 5 * position
    } ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }))
}

// animated=false renders plain static <path> elements instead of
// <motion.path> — used on the preloader's door panels, where the ~4s
// lifespan doesn't justify the cost of 36 running Framer Motion loops
// competing with the door/line transitions for main-thread frames.
export default function FloatingPaths({ position = 1, className = '', animated = true }) {
  const paths = buildPaths(position)
  const PathTag = animated ? motion.path : 'path'

  return (
    <div className={`floating-paths absolute inset-0 pointer-events-none text-white ${className}`}>
      <svg className="w-full h-full" viewBox="0 0 696 316" fill="none" preserveAspectRatio="xMidYMid slice">
        {paths.map((path) => (
          <PathTag
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            {...(animated
              ? {
                  initial: { pathLength: 0.3, opacity: 0.6 },
                  animate: {
                    pathLength: 1,
                    opacity: [0.3, 0.6, 0.3],
                    pathOffset: [0, 1, 0],
                  },
                  transition: {
                    duration: 20 + Math.random() * 10,
                    repeat: Infinity,
                    ease: 'linear',
                  },
                }
              : {})}
          />
        ))}
      </svg>
    </div>
  )
}
