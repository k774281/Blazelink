const NAV_LINKS = ['關於我們', '跨國SEO行銷', '網站案例', 'Pricing']

export default function Header() {
  return (
    <header className="site-header flex items-center justify-between max-w-[1920px] w-full mx-auto px-16 py-6 min-sm:max-lg:px-8 min-sm:max-lg:py-5 max-sm:px-5 max-sm:py-4 animate-fade-down">
      <div className="site-header__left flex items-center gap-12 max-lg:gap-6">
        <img
          className="site-header__logo h-10 w-auto"
          src="https://blazelink.co/wp-content/uploads/2025/11/%E9%8F%88%E5%AE%A2Logo-Horizontal.png"
          alt="Blazelink 鏈客"
        />
        <nav className="site-header__nav flex items-center gap-8 max-lg:gap-4 max-md:hidden">
          {NAV_LINKS.map((label) => (
            <a key={label} href="#" className="nav-link text-white text-[20px] font-normal">
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
