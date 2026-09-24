import KineticNavMenu from './KineticNavMenu.jsx'

// Temporary: all five point at the old WordPress site until their pages
// exist on this one.
const NAV_LINKS = [
  { label: '關於我們', href: 'https://blazelink.co/about/' },
  { label: '跨國SEO行銷', href: 'https://blazelink.co/global-seo/' },
  { label: '網站案例', href: 'https://blazelink.co/cases/' },
  { label: '鏈客商學院', href: 'https://blazelink.co/academy/' },
  { label: '聯繫我們', href: 'https://blazelink.co/contact/' },
]

export default function Header() {
  return (
    <header className="site-header flex items-center justify-between max-w-[1440px] w-full mx-auto px-16 py-6 min-sm:max-lg:px-8 min-sm:max-lg:py-5 max-sm:px-5 max-sm:py-4 animate-fade-down">
      <div className="site-header__left flex items-center gap-12 max-lg:gap-6">
        <img
          className="site-header__logo h-10 w-auto"
          src="https://blazelink.co/wp-content/uploads/2025/11/%E9%8F%88%E5%AE%A2Logo-Horizontal.png"
          alt="Blazelink 鏈客"
        />
        <nav className="site-header__nav flex items-center gap-8 max-lg:gap-4 max-lg:hidden">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
              className="nav-link text-white text-[20px] font-normal"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>

      {/* Below lg the inline links give way to the fullscreen kinetic menu. */}
      <div className="lg:hidden">
        <KineticNavMenu links={NAV_LINKS} />
      </div>
    </header>
  )
}
