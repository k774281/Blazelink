import App from '../src/App.jsx'

// Server-rendered so the exported HTML carries the page's text and links for
// search engines; the GSAP/scroll effects still start in the browser.
export default function Home() {
  return (
    <div id="root">
      <App />
    </div>
  )
}
