import { useEffect } from 'react'

/*
 * In-page links (#about, #services, ...) scroll smoothly to their section. The
 * stacked sections are sticky, and a stuck section already reads as being at
 * the top, so the targets are the plain markers placed before each one
 * (see App.jsx) and the scroll is worked out from where they sit in the flow.
 *
 * Deferred a moment so the mobile menu, which locks page scrolling while it
 * is open, has closed first.
 */
export function useSectionLinks() {
  useEffect(() => {
    const onClick = (event) => {
      const link = event.target.closest?.('a[href^="#"]')
      const id = link?.getAttribute('href').slice(1)
      const target = id && document.getElementById(id)
      if (!target) return

      event.preventDefault()
      setTimeout(() => {
        const top = target.getBoundingClientRect().top + window.scrollY
        window.scrollTo({ top, behavior: 'smooth' })
        history.replaceState(null, '', `#${id}`)
      }, 60)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
}
