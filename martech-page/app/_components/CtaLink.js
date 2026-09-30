import Link from "next/link";

const TONES = {
  brand: { text: "text-brand", circle: "bg-brand-tint", icon: "/figma/arrow-purple.svg" },
  ink: { text: "text-ink", circle: "bg-line", icon: "/figma/arrow-navy.svg" },
  light: { text: "text-white", circle: "bg-muted", icon: "/figma/arrow-contact.svg" },
};

/**
 * The text CTA with a small circled arrow. The rule underneath draws in from the
 * left on hover, and the arrow slides out to the right while a second one takes
 * its place from the left — the same swap the pill CTA uses.
 */
export default function CtaLink({ children, href = "/contact", tone = "brand", size = "md", gap = 10 }) {
  const t = TONES[tone];
  const large = size === "lg";
  const iconSize = large ? 40 : 17;

  return (
    <Link
      href={href}
      style={{ gap: `${gap}px` }}
      className={`group underline-grow inline-flex items-center pb-[8px] ${t.text}`}
    >
      <span className={`font-medium whitespace-nowrap ${large ? "text-[32px]" : "text-[16px]"}`}>{children}</span>

      <span
        className={`relative shrink-0 overflow-hidden rounded-[50px] ${t.circle} ${
          large ? "size-[40px]" : "size-[25px]"
        }`}
      >
        <img
          src={t.icon}
          alt=""
          width={iconSize}
          height={iconSize}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ease-in-out group-hover:translate-x-[220%]"
        />
        <img
          src={t.icon}
          alt=""
          width={iconSize}
          height={iconSize}
          className="absolute top-1/2 left-1/2 -translate-x-[280%] -translate-y-1/2 transition-transform duration-500 ease-in-out group-hover:-translate-x-1/2"
        />
      </span>
    </Link>
  );
}
