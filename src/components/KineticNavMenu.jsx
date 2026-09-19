import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap, CustomEase } from '../lib/gsap.js'
import MenuToggleIcon from './MenuToggleIcon.jsx'

// The reference implementation installed this ease through gsap.defaults(),
// which sets it globally — that would have retimed every other animation on
// the site (the section scroll reveals, WideBanner's pinned carousel). It's
// applied per-timeline here instead.
const EASE = 'kinetic-nav'
if (!gsap.parseEase(EASE)) {
  CustomEase.create(EASE, '0.65, 0.01, 0.05, 0.99')
}

// Each link lights up its own background shape on hover; index maps to
// .kn-shape-1 … .kn-shape-4.
const SHAPE_COUNT = 4

export default function KineticNavMenu({ links }) {
  const overlayRef = useRef(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const overlayRoot = overlayRef.current
    if (!overlayRoot) return

    const ctx = gsap.context(() => {
      const panel = overlayRoot.querySelector('.kn-panel')
      const scrim = overlayRoot.querySelector('.kn-scrim')
      const layers = overlayRoot.querySelectorAll('.kn-backdrop-layer')
      const linkEls = overlayRoot.querySelectorAll('.kn-link')

      const tl = gsap.timeline({ defaults: { ease: EASE, duration: 0.7 } })

      if (open) {
        tl.set(overlayRoot, { display: 'block' })
          .set(panel, { xPercent: 0 }, '<')
          .fromTo(scrim, { autoAlpha: 0 }, { autoAlpha: 1 }, '<')
          .fromTo(layers, { xPercent: 101 }, { xPercent: 0, stagger: 0.12, duration: 0.575 }, '<')
          .fromTo(linkEls, { yPercent: 140, rotate: 10 }, { yPercent: 0, rotate: 0, stagger: 0.05 }, '<+=0.35')
      } else {
        tl.to(scrim, { autoAlpha: 0 })
          .to(panel, { xPercent: 120 }, '<')
          .set(overlayRoot, { display: 'none' })
      }
    }, overlayRef)

    return () => ctx.revert()
  }, [open])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    // Without this the page keeps scrolling behind the overlay, which also
    // drives every ScrollTrigger on the page while the menu covers it.
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const shapeElements = (index) => {
    const shape = overlayRef.current?.querySelector(`.kn-shape-${index}`)
    return shape ? { shape, elements: shape.querySelectorAll('.kn-shape-element') } : null
  }

  const activateShape = (index) => {
    const found = shapeElements(index)
    if (!found) return

    overlayRef.current.querySelectorAll('.kn-shape').forEach((s) => s.classList.remove('is-active'))
    found.shape.classList.add('is-active')
    gsap.fromTo(
      found.elements,
      { scale: 0.5, opacity: 0, rotation: -10 },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'back.out(1.7)',
        overwrite: 'auto',
      },
    )
  }

  const releaseShape = (index) => {
    const found = shapeElements(index)
    if (!found) return

    gsap.to(found.elements, {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      overwrite: 'auto',
      onComplete: () => found.shape.classList.remove('is-active'),
    })
  }

  return (
    <>
      <button
        type="button"
        className="kn-toggle"
        aria-label={open ? '關閉選單' : '開啟選單'}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <MenuToggleIcon open={open} className="size-8" />
      </button>

      {/* Portalled to <body> so the fixed overlay isn't trapped inside the
          header's `.app` ancestor, which is an `isolate` stacking context —
          the page sections that follow it would otherwise paint on top. */}
      {createPortal(
        <div ref={overlayRef} className="kn-overlay-wrapper">
          <div className="kn-scrim" onClick={() => setOpen(false)} />
          <nav className="kn-panel" aria-label="行動版主選單">
            <div className="kn-panel-bg">
              <div className="kn-backdrop-layer kn-backdrop-layer--first" />
              <div className="kn-backdrop-layer kn-backdrop-layer--second" />
              <div className="kn-backdrop-layer" />

              <div className="kn-shapes" aria-hidden="true">
                <svg className="kn-shape kn-shape-1" viewBox="0 0 400 400" fill="none">
                  <circle className="kn-shape-element" cx="80" cy="120" r="40" fill="rgba(99,102,241,0.35)" />
                  <circle className="kn-shape-element" cx="300" cy="80" r="60" fill="rgba(139,92,246,0.3)" />
                  <circle className="kn-shape-element" cx="200" cy="300" r="80" fill="rgba(236,72,153,0.22)" />
                  <circle className="kn-shape-element" cx="350" cy="280" r="30" fill="rgba(99,102,241,0.35)" />
                </svg>

                <svg className="kn-shape kn-shape-2" viewBox="0 0 400 400" fill="none">
                  <path
                    className="kn-shape-element"
                    d="M0 200 Q100 100, 200 200 T 400 200"
                    stroke="rgba(99,102,241,0.4)"
                    strokeWidth="60"
                    fill="none"
                  />
                  <path
                    className="kn-shape-element"
                    d="M0 280 Q100 180, 200 280 T 400 280"
                    stroke="rgba(139,92,246,0.32)"
                    strokeWidth="40"
                    fill="none"
                  />
                </svg>

                <svg className="kn-shape kn-shape-3" viewBox="0 0 400 400" fill="none">
                  <circle className="kn-shape-element" cx="50" cy="50" r="8" fill="rgba(99,102,241,0.6)" />
                  <circle className="kn-shape-element" cx="150" cy="50" r="8" fill="rgba(139,92,246,0.6)" />
                  <circle className="kn-shape-element" cx="250" cy="50" r="8" fill="rgba(236,72,153,0.6)" />
                  <circle className="kn-shape-element" cx="350" cy="50" r="8" fill="rgba(99,102,241,0.6)" />
                  <circle className="kn-shape-element" cx="100" cy="150" r="12" fill="rgba(139,92,246,0.5)" />
                  <circle className="kn-shape-element" cx="200" cy="150" r="12" fill="rgba(236,72,153,0.5)" />
                  <circle className="kn-shape-element" cx="300" cy="150" r="12" fill="rgba(99,102,241,0.5)" />
                  <circle className="kn-shape-element" cx="50" cy="250" r="10" fill="rgba(236,72,153,0.6)" />
                  <circle className="kn-shape-element" cx="150" cy="250" r="10" fill="rgba(99,102,241,0.6)" />
                  <circle className="kn-shape-element" cx="250" cy="250" r="10" fill="rgba(139,92,246,0.6)" />
                  <circle className="kn-shape-element" cx="350" cy="250" r="10" fill="rgba(236,72,153,0.6)" />
                  <circle className="kn-shape-element" cx="100" cy="350" r="6" fill="rgba(99,102,241,0.6)" />
                  <circle className="kn-shape-element" cx="200" cy="350" r="6" fill="rgba(139,92,246,0.6)" />
                  <circle className="kn-shape-element" cx="300" cy="350" r="6" fill="rgba(236,72,153,0.6)" />
                </svg>

                <svg className="kn-shape kn-shape-4" viewBox="0 0 400 400" fill="none">
                  <path
                    className="kn-shape-element"
                    d="M100 100 Q150 50, 200 100 Q250 150, 200 200 Q150 250, 100 200 Q50 150, 100 100"
                    fill="rgba(99,102,241,0.3)"
                  />
                  <path
                    className="kn-shape-element"
                    d="M250 200 Q300 150, 350 200 Q400 250, 350 300 Q300 350, 250 300 Q200 250, 250 200"
                    fill="rgba(236,72,153,0.25)"
                  />
                </svg>
              </div>
            </div>

            {/* The header's own toggle sits behind the panel once it's open,
                so the close control has to live inside the panel. */}
            <button
              type="button"
              className="kn-toggle kn-toggle--close"
              aria-label="關閉選單"
              onClick={() => setOpen(false)}
            >
              <MenuToggleIcon open className="size-8" />
            </button>

            <div className="kn-panel-content">
              <ul className="kn-list">
                {links.map((label, index) => {
                  const shapeIndex = (index % SHAPE_COUNT) + 1
                  return (
                    <li
                      key={label}
                      className="kn-item"
                      onMouseEnter={() => activateShape(shapeIndex)}
                      onMouseLeave={() => releaseShape(shapeIndex)}
                    >
                      <a href="#" className="kn-link" onClick={() => setOpen(false)}>
                        <span className="kn-link-text">{label}</span>
                        <span className="kn-link-hover-bg" />
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </nav>
        </div>,
        document.body,
      )}
    </>
  )
}
