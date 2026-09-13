type Art = { src: string; alt: string; pixel: boolean }

type TokenArtProps = {
  art: Art
  size?: 'sm' | 'md' | 'lg'
  className?: string
  /** Decorative uses sit next to the token name, which already says it. */
  decorative?: boolean
}

const SIZE: Record<string, string> = {
  sm: 'h-10 w-10 rounded-lg',
  md: 'h-14 w-14 rounded-xl',
  lg: 'h-20 w-20 rounded-2xl',
}

/**
 * Token art in a sticker frame.
 *
 * `pixel: true` assets get `image-rendering: pixelated` — the SuiCat art is
 * 1000x1000 pixel art and browser smoothing turns it to mush at avatar sizes.
 */
export function TokenArt({ art, size = 'md', className = '', decorative = false }: TokenArtProps) {
  return (
    <img
      src={art.src}
      alt={decorative ? '' : art.alt}
      aria-hidden={decorative || undefined}
      width={160}
      height={160}
      loading="lazy"
      decoding="async"
      className={`shrink-0 border-[3px] border-wok bg-paper object-cover ${SIZE[size]} ${className}`}
      style={art.pixel ? { imageRendering: 'pixelated' } : undefined}
    />
  )
}
