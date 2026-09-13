import type { ReactNode } from 'react'

type ActionProps = {
  /** null means the destination does not exist yet. Renders a labelled locked
   *  control instead of a button that goes nowhere. */
  href: string | null
  children: ReactNode
  variant?: 'primary' | 'sui' | 'ghost'
  size?: 'md' | 'sm'
  lockedLabel?: string
  className?: string
}

/** There are no dead buttons on this site. */
export function Action({
  href,
  children,
  variant = 'primary',
  size = 'md',
  lockedLabel = 'Soon',
  className = '',
}: ActionProps) {
  const variantCls =
    variant === 'primary' ? 'btn--primary' : variant === 'sui' ? 'btn--sui' : 'btn--ghost'
  const cls = `btn ${variantCls} ${size === 'sm' ? 'btn--sm' : ''} ${className}`

  if (href === null) {
    return (
      <span className={cls} aria-disabled="true" role="link">
        {children} · {lockedLabel}
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
