type StatProps = {
  label: string
  /** Already-formatted value. Pass null while loading. */
  value: string | null
  loading: boolean
  /** Optional tone for values that carry direction (24h change). */
  tone?: 'neutral' | 'up' | 'down'
  className?: string
}

/**
 * One live number.
 *
 * Three honest states and no fourth: loading shows an obvious skeleton bar,
 * a missing value shows an em dash, and a real value shows itself. There is no
 * code path here that invents a plausible number.
 */
export function Stat({ label, value, loading, tone = 'neutral', className = '' }: StatProps) {
  return (
    <div className={className}>
      <p className="t-label opacity-70">{label}</p>
      <p className="t-num mt-1 text-[17px] md:text-[19px]">
        {loading ? (
          <span className="skeleton w-20" />
        ) : tone !== 'neutral' && value !== null ? (
          /*
            Directional values are a filled badge, not colored text. The cards sit
            on white, cream AND sui-blue backgrounds, and deep-blue text on
            sui-blue measures 2.81:1 — it fails on the flagship card. White on
            deep (6.87:1) and white on chili (4.87:1) pass on every surface.
          */
          <span
            className={`inline-block rounded-lg border-[3px] border-wok px-2 py-[2px] text-[15px] text-paper md:text-[16px] ${
              tone === 'up' ? 'bg-deep' : 'bg-chili'
            }`}
          >
            {value}
          </span>
        ) : (
          (value ?? '—')
        )}
      </p>
    </div>
  )
}
