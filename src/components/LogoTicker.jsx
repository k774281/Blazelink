const LOGOS = [
  'https://blazelink.co/wp-content/uploads/2023/11/bbae-logo-300px.png',
  'https://blazelink.co/wp-content/uploads/2023/11/MasterTalks_Logo_1_410x.png',
  'https://blazelink.co/wp-content/uploads/2024/10/Logo%E9%87%91%E5%AD%97-%E5%8E%BB%E8%83%8C-1-586x400.png',
  'https://blazelink.co/wp-content/uploads/2024/10/lmi-logo-1.png',
  'https://blazelink.co/wp-content/uploads/2023/11/oxfordclub-logo.svg',
]

const REPEATED = Array.from({ length: 4 }).flatMap(() => LOGOS)

export default function LogoTicker() {
  return (
    <section className="logo-ticker w-full overflow-hidden pt-5 pb-7 opacity-0 animate-fade-up [animation-delay:0.6s]">
      <div className="logo-ticker__track flex items-center gap-16 w-max max-sm:gap-10">
        {REPEATED.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="logo-ticker__logo w-[137px] h-10 object-contain flex-shrink-0 max-sm:w-24 max-sm:h-7"
          />
        ))}
      </div>
    </section>
  )
}
