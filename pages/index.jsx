import dynamic from 'next/dynamic'

// Client-only, matching the old Vite SPA entry: the landing page is driven by GSAP/scroll effects that run in the browser.
const App = dynamic(() => import('../src/App.jsx'), { ssr: false })

export default function Home() {
  return (
    <div id="root">
      <App />
    </div>
  )
}
