import Image from "next/image";

export function Eyebrow({ zh, en, tone = "dark", className = "" }) {
  const light = tone === "light";
  return (
    <p className={`flex items-center gap-[10px] whitespace-nowrap ${className}`}>
      <span className={`text-[13px] font-bold ${light ? "text-white" : "text-ink"}`}>{zh}</span>
      <span className={`font-grotesk text-[12px] font-bold tracking-[2.4px] ${light ? "text-lavender" : "text-primary"}`}>
        {en}
      </span>
    </p>
  );
}

export function ArrowCircle({ size, iconSize, icon, className }) {
  return (
    <span
      aria-hidden="true"
      className={`relative inline-flex shrink-0 items-center justify-center rounded-full ${className}`}
      style={{ width: size, height: size }}
    >
      <Image src={`/icons/${icon}.svg`} alt="" width={iconSize} height={iconSize} />
    </span>
  );
}

const PILL = {
  solid: {
    sm: "h-[38px] pl-6 pr-1 bg-primary text-white",
    lg: "h-[60px] pl-[34px] pr-2 bg-primary text-white",
  },
  outline: {
    sm: "h-[38px] pl-6 pr-1 border border-primary text-primary",
    lg: "h-[60px] pl-[34px] pr-2 border border-primary text-primary",
  },
};

const PILL_CIRCLE = {
  solid: { sm: ["arrow-white-18", 25, 18, "bg-white/50"], lg: ["arrow-white-24", 50, 24, "bg-white/50"] },
  outline: { sm: ["arrow-purple-18", 25, 18, "bg-primary/10"], lg: ["arrow-purple-24", 50, 24, "bg-primary/10"] },
};

export function PillLink({ href, children, variant = "solid", size = "lg", className = "" }) {
  const [icon, circle, iconSize, circleBg] = PILL_CIRCLE[variant][size];
  return (
    <a
      href={href}
      className={`group inline-flex shrink-0 items-center justify-center gap-[10px] rounded-full font-noto text-[17px] font-medium whitespace-nowrap transition-[filter,background-color] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${PILL[variant][size]} ${className}`}
    >
      {children}
      <ArrowCircle
        icon={icon}
        size={circle}
        iconSize={iconSize}
        className={`${circleBg} transition-transform duration-300 group-hover:rotate-45`}
      />
    </a>
  );
}

const TEXT_LINK = {
  purple: { text: "text-primary border-primary", icon: "arrow-purple-17", circle: "bg-primary/10" },
  navy: { text: "text-ink border-ink", icon: "arrow-navy-17", circle: "bg-[#dfe3ee]" },
};

export function TextLink({ href, children, tone = "purple", circleClass, className = "gap-[10px] pb-2" }) {
  const t = TEXT_LINK[tone];
  return (
    <a
      href={href}
      className={`group inline-flex shrink-0 items-center border-b font-noto text-[16px] font-medium whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${t.text} ${className}`}
    >
      {children}
      <ArrowCircle
        icon={t.icon}
        size={25}
        iconSize={17}
        className={`${circleClass ?? t.circle} transition-transform duration-300 group-hover:rotate-45`}
      />
    </a>
  );
}

export function SectionHead({ zh, en, title, action, className = "" }) {
  return (
    <div className={`flex items-end justify-between gap-6 max-md:flex-col max-md:items-start ${className}`}>
      <div className="flex flex-col gap-5">
        <Eyebrow zh={zh} en={en} />
        <h2 className="text-[44px] leading-[1.24] font-bold tracking-[-1.32px] text-ink max-md:text-[32px]">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function Tag({ children }) {
  return (
    <span className="inline-flex h-[26px] shrink-0 items-center rounded-full bg-primary/10 px-3 font-noto text-[12px] font-medium whitespace-nowrap text-primary-dark">
      {children}
    </span>
  );
}
