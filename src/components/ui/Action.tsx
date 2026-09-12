import type { ReactNode } from 'react'

type ActionProps = {
  /** null means the destination does not exist yet. Renders a labelled locked
   *  control instead of a button that goes nowhere. */
  href: string | null
  children: ReactNode
  variant?: 'primary' | 'ghost'
  /** Shown in place of the label when href is null. */
  lockedLabel?: string
  className?: string
}

/**
 * There are no dead buttons on this site. If a link has no destination yet the
 * control renders disabled and says why.
 */
export function Action({
  href,
  children,
  variant = 'primary',
  lockedLabel = 'Soon',
  className = '',
}: ActionProps) {
  const cls = `btn ${variant === 'primary' ? 'btn--primary' : 'btn--ghost'} ${className}`

  if (href === null) {
    return (
      <span className={`${cls} select-none`} aria-disabled="true" role="link">
        {children}
        <span aria-hidden="true">·</span>
        <span>{lockedLabel}</span>
      </span>
    )
  }

  const external = href.startsWith('http')

  return (
    <a
      className={cls}
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
    >
      {children}
    </a>
  )
}

type ChipProps = {
  children: ReactNode
  tone?: 'glow' | 'sea' | 'paper'
  className?: string
}

export function Chip({ children, tone = 'glow', className = '' }: ChipProps) {
  const bg =
    tone === 'glow' ? 'bg-glow text-ink' : tone === 'sea' ? 'bg-sea text-paper' : 'bg-paper text-ink'
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-2 t-micro ${bg} ${className}`}
    >
      {children}
    </span>
  )
}
