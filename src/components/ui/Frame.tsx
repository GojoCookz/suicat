import type { CSSProperties, ReactNode } from 'react'

type Tone = 'ink' | 'glow' | 'sea' | 'paper'

const VAR: Record<Tone, string> = {
  ink: 'var(--color-ink)',
  glow: 'var(--color-glow)',
  sea: 'var(--color-sea)',
  paper: 'var(--color-paper)',
}

type FrameProps = {
  /** Border color. */
  edge?: Tone
  /** Fill color. */
  fill?: Tone
  /**
   * Opt into the stepped corner. Only worth it on large surfaces — clip-path
   * anti-aliases, so a small stepped corner reads as a blob, not a pixel.
   */
  stepped?: boolean
  className?: string
  innerClassName?: string
  style?: CSSProperties
  children: ReactNode
}

/**
 * A hard-edged box with a 4px border. Outer element paints the edge, inner
 * paints the fill. Square by default; `stepped` traces the artwork's staircase
 * corner and is reserved for the hero portrait.
 */
export function Frame({
  edge = 'paper',
  fill = 'ink',
  stepped = false,
  className = '',
  innerClassName = '',
  style,
  children,
}: FrameProps) {
  const step = stepped ? 'px-step px-step-lg' : ''

  return (
    <div
      className={`frame ${step} ${className}`}
      style={{ ['--fc' as string]: VAR[edge], ...style }}
    >
      <div
        className={`frame__in ${step} ${innerClassName}`}
        style={{ ['--bg' as string]: VAR[fill] }}
      >
        {children}
      </div>
    </div>
  )
}
