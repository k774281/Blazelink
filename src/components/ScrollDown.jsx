export default function ScrollDown() {
  return (
    <div id="scroll-down-animation" className="absolute bottom-24 left-1/2 -translate-x-1/2 z-[4] pointer-events-none">
      <h2 className="m-0 font-display font-normal text-base text-white text-center">Scroll down</h2>
      <span className="mouse">
        <span className="move" />
      </span>
    </div>
  )
}
