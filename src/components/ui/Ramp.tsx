type RampProps = {
  /** Dot color for the ramp bands. */
  tone?: 'sea' | 'glow' | 'ink'
  /** 'down' fades out toward the bottom, 'up' fades in. */
  direction?: 'down' | 'up'
  className?: string
}

const TONE: Record<string, string> = {
  sea: 'var(--color-sea)',
  glow: 'var(--color-glow)',
  ink: 'var(--color-ink)',
}

/**
 * A dithered ramp — the pixel-art substitute for a gradient. Three bands stepping
 * from a dense checkerboard to a sparse one. No fifth color, no alpha.
 */
export function Ramp({ tone = 'sea', direction = 'down', className = '' }: RampProps) {
  const bands = [
    { cls: 'dither-50', ds: '8px', h: 'calc(var(--u) * 5)' },
    { cls: 'dither-25', ds: '8px', h: 'calc(var(--u) * 4)' },
    { cls: 'dither-25', ds: '16px', h: 'calc(var(--u) * 3)' },
    { cls: 'dither-25', ds: '32px', h: 'calc(var(--u) * 3)' },
  ]
  const ordered = direction === 'down' ? bands : [...bands].reverse()

  return (
    <span aria-hidden="true" className={`ramp ${className}`}>
      {ordered.map((band, i) => (
        <i
          key={i}
          className={band.cls}
          style={{
            ['--d' as string]: TONE[tone],
            ['--ds' as string]: band.ds,
            height: band.h,
          }}
        />
      ))}
    </span>
  )
}
