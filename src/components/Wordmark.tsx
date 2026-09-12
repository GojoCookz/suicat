type WordmarkProps = {
  className?: string
}

/** SUI in white, CAT in cyan, and the cat's question mark blinking after it. */
export function Wordmark({ className = '' }: WordmarkProps) {
  return (
    <span className={`t-pixel font-bold inline-flex items-baseline gap-[2px] ${className}`}>
      <span className="text-paper">SUI</span>
      <span className="text-glow">CAT</span>
      <span className="text-glow anim-blink" aria-hidden="true">
        ?
      </span>
    </span>
  )
}
