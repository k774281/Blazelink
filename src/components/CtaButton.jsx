import { useRef } from 'react'
import { ArrowUpRightIcon } from '@animateicons/react/lucide'
import { cn } from '../lib/utils.js'

// Shared CTA: glow wrapper + button/link + ArrowUpRightIcon driven by hover
// on the whole element (the icon only animates on its own internal hover by
// default, so it's triggered imperatively here instead). Previously this
// exact markup was copy-pasted with only the label/colors changed across
// HeroLeft (x2), ShuffleHero, ServicesSection, and ProcessSection.
export default function CtaButton({
  label,
  href,
  variant = 'outline', // 'outline' | 'brand'
  buttonClassName,
  iconWrapClassName,
  iconColor = '#ffffff',
  wrapClassName,
  dataAnim,
  onClick,
}) {
  const arrowRef = useRef(null)
  const Tag = href ? 'a' : 'button'

  return (
    <div data-anim={dataAnim} className={cn('btn-border-wrap btn-border-wrap--accent hero-cta-wrap', wrapClassName)}>
      <Tag
        {...(href ? { href } : { type: 'button' })}
        onClick={onClick}
        className={cn(
          'btn btn-cta inline-flex items-center justify-center gap-2 rounded-[50px] px-5 py-2.5 text-xl font-medium max-sm:px-4 max-sm:py-2 max-sm:text-base',
          variant === 'brand' ? 'btn-cta--brand bg-[#f7f7f7]' : 'btn-cta--outline',
          buttonClassName,
        )}
        onMouseEnter={() => arrowRef.current?.startAnimation()}
        onMouseLeave={() => arrowRef.current?.stopAnimation()}
      >
        <span className="btn-cta__label relative z-[2]">{label}</span>
        <span
          className={cn(
            'btn-cta__icon-wrap relative z-[2] flex items-center justify-center rounded-[50px] p-1.5',
            iconWrapClassName,
          )}
        >
          <ArrowUpRightIcon ref={arrowRef} size={24} duration={1} color={iconColor} />
        </span>
      </Tag>
    </div>
  )
}
