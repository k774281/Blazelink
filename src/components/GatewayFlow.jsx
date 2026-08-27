import { useEffect, useRef } from 'react'

const NUM_PATHS = 80

function getBezierPoint(t, p0, p1, p2, p3) {
  const u = 1 - t
  return {
    x: u ** 3 * p0.x + 3 * u ** 2 * t * p1.x + 3 * u * t ** 2 * p2.x + t ** 3 * p3.x,
    y: u ** 3 * p0.y + 3 * u ** 2 * t * p1.y + 3 * u * t ** 2 * p2.y + t ** 3 * p3.y,
  }
}

// Canvas-only port of the "Gateway Flow" background: bezier particle streams
// converging on the viewport center, with click-triggered shockwave ripples
// that push nearby particles outward.
export default function GatewayFlow({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let width = 0
    let height = 0
    let explosions = []
    let rafId

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    const handleClick = (event) => {
      explosions.push({ x: event.clientX, y: event.clientY, radius: 0, life: 1 })
    }
    window.addEventListener('click', handleClick)

    const paths = Array.from({ length: NUM_PATHS }, (_, i) => ({
      isLeft: i % 2 === 0,
      startY: (i / NUM_PATHS) * height * 1.4 - height * 0.2,
      particles: [{ t: Math.random(), speed: 0.0015 + Math.random() * 0.002 }],
    }))

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      const centerX = width / 2
      const centerY = height / 2

      explosions.forEach((exp) => {
        exp.radius += 15
        exp.life -= 0.015
      })
      explosions = explosions.filter((exp) => exp.life > 0)

      paths.forEach((path) => {
        const p0 = { x: path.isLeft ? 0 : width, y: path.startY }
        const p1 = { x: path.isLeft ? centerX * 0.5 : width - centerX * 0.5, y: path.startY }
        const p2 = { x: path.isLeft ? centerX * 0.8 : width - centerX * 0.8, y: centerY }
        const p3 = { x: centerX, y: centerY }

        ctx.beginPath()
        ctx.moveTo(p0.x, p0.y)
        ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)'
        ctx.lineWidth = 1.2
        ctx.setLineDash([1, 4])
        ctx.stroke()
        ctx.setLineDash([])

        path.particles.forEach((p) => {
          p.t += p.speed
          if (p.t > 1) {
            p.t = 0
            path.startY += (Math.random() - 0.5) * 10
          }

          const pos = getBezierPoint(p.t, p0, p1, p2, p3)

          let dxTotal = 0
          let dyTotal = 0
          explosions.forEach((exp) => {
            const dx = pos.x - exp.x
            const dy = pos.y - exp.y
            const dist = Math.hypot(dx, dy)
            if (dist < exp.radius + 120 && dist > exp.radius - 120) {
              const force = (1 - Math.abs(dist - exp.radius) / 120) * exp.life
              dxTotal += (dx / dist) * force * 80
              dyTotal += (dy / dist) * force * 80
            }
          })

          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
          ctx.fillRect(pos.x + dxTotal - 1.5, pos.y + dyTotal - 1.5, 3, 3)
        })
      })

      rafId = requestAnimationFrame(render)
    }
    rafId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('click', handleClick)
    }
  }, [])

  return <canvas ref={canvasRef} className={`gateway-flow absolute inset-0 w-full h-full pointer-events-none ${className}`} />
}
