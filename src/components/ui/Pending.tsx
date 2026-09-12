import { PENDING } from '../../config/token'

type ValueProps = {
  value: string
  /** Extra classes applied when the value is real, not pending. */
  className?: string
}

/**
 * Renders a config value. If it is not decided yet it comes out as a filled
 * placeholder chip that says so, never as a dimmed fake number.
 */
export function Value({ value, className = '' }: ValueProps) {
  if (value === PENDING) {
    return <span className="pending">{PENDING}</span>
  }
  return <span className={`t-num ${className}`}>{value}</span>
}
