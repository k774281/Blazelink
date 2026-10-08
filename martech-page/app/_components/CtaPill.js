import Link from "next/link";
import { asset } from "../_lib/base";

// Two arrows live inside the clipped circle: the resting one slides out to the
// right while the hover-coloured one slides in from the left, so the swap also
// carries the colour change.
const ARROWS = {
  24: { white: asset("/figma/cta-arrow-white.svg"), brand: asset("/figma/arrow-purple-lg.svg") },
  18: { white: asset("/figma/cta-arrow-white-sm.svg"), brand: asset("/figma/arrow-service-active.svg") },
};

const TONES = {
  solid: {
    shell: "bg-brand hover:bg-white/50",
    label: "text-white group-hover:text-brand",
    circle: "bg-white/50 group-hover:bg-brand/10",
    restArrow: "white",
    hoverArrow: "brand",
  },
  outline: {
    shell: "border border-solid border-brand hover:bg-white/50",
    label: "text-brand",
    circle: "bg-brand-tint group-hover:bg-brand/20",
    restArrow: "brand",
    hoverArrow: "brand",
  },
};

/**
 * The pill CTA with a trailing circled arrow — the design's primary button.
 * Renders a link by default; `as="button"` makes it a real button, which is
 * what the contact form's submit needs.
 */
export default function CtaPill({
  children,
  href = "/contact",
  tone = "solid",
  compact = false,
  as = "link",
  type,
  disabled = false,
}) {
  const t = TONES[tone];
  const size = compact ? 18 : 24;
  const arrows = ARROWS[size];

  const Tag = as === "button" ? "button" : Link;
  const tagProps =
    as === "button" ? { type: type ?? "button", disabled } : { href };

  return (
    <Tag
      {...tagProps}
      className={`group inline-flex shrink-0 items-center justify-center gap-[10px] rounded-[50px] transition-colors duration-500 ease-in-out disabled:cursor-not-allowed disabled:opacity-60 ${
        t.shell
      } ${compact ? "h-[38px] pr-[4px] pl-[24px]" : "h-[60px] pr-[8px] pl-[34px]"}`}
    >
      <span
        className={`text-[17px] font-medium whitespace-nowrap transition-colors duration-500 ease-in-out ${t.label}`}
      >
        {children}
      </span>

      <span
        className={`relative shrink-0 overflow-hidden rounded-[50px] transition-colors duration-500 ease-in-out ${
          t.circle
        } ${compact ? "size-[25px]" : "size-[50px]"}`}
      >
        <img
          src={arrows[t.restArrow]}
          alt=""
          width={size}
          height={size}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ease-in-out group-hover:translate-x-[220%]"
        />
        <img
          src={arrows[t.hoverArrow]}
          alt=""
          width={size}
          height={size}
          className="absolute top-1/2 left-1/2 -translate-x-[280%] -translate-y-1/2 transition-transform duration-500 ease-in-out group-hover:-translate-x-1/2"
        />
      </span>
    </Tag>
  );
}
