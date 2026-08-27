import Preloader from './components/Preloader.jsx'
import FloatingPaths from './components/FloatingPaths.jsx'
import Header from './components/Header.jsx'
import HeroLeft from './components/HeroLeft.jsx'
import HeroRight from './components/HeroRight.jsx'
import LogoTicker from './components/LogoTicker.jsx'
import ScrollDown from './components/ScrollDown.jsx'
import CircleReveal from './components/CircleReveal.jsx'
import AboutSection from './components/AboutSection.jsx'
import ServicesSection from './components/ServicesSection.jsx'
import WideBanner from './components/WideBanner.jsx'
import BigTicker from './components/BigTicker.jsx'
import ProcessSection from './components/ProcessSection.jsx'
import TestimonialsSection from './components/TestimonialsSection.jsx'
import BigCta from './components/BigCta.jsx'
import SiteFooter from './components/SiteFooter.jsx'

export default function App() {
  return (
    <>
      <Preloader />

      <div className="app relative min-h-screen w-full flex flex-col bg-ink">
        <FloatingPaths className="-z-10" />

        <Header />

        <main className="hero relative min-h-screen flex-1 flex items-center max-w-[1920px] w-full mx-auto px-16 pb-[220px] min-sm:max-md:px-8 max-sm:px-5 max-sm:pb-[200px]">
          <div className="hero-row w-full flex items-center justify-between gap-10 max-lg:flex-col max-lg:items-center max-lg:text-left">
            <HeroLeft />
            <HeroRight />
          </div>
          <ScrollDown />
          <LogoTicker />
        </main>

        <CircleReveal />
      </div>

      <div className="bg-white text-ink w-full overflow-x-hidden relative">
        <AboutSection />
        <ServicesSection />
        <WideBanner />
        <BigTicker />
        <ProcessSection />
        <TestimonialsSection />
        <BigCta />
        <SiteFooter />
      </div>
    </>
  )
}
