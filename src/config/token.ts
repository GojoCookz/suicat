/**
 * SINGLE SOURCE OF TRUTH for every fact rendered on this site.
 *
 * HOUSE RULE: no fake data. A value that is not yet decided is `null`, and the UI
 * renders an explicit "SET AT LAUNCH" chip for it. Never fill one of these in with
 * a plausible-sounding guess to make the page look finished.
 *
 * Mechanic, verified against RevShare's own launch documentation
 * (revshare.dev/articles/how-to-create-a-solana-token-with-a-custom-quote-token-using-revshare):
 *
 *   - SUICAT is a SOLANA token launched through RevShare. Solana only.
 *   - The pool is quoted in SOL. You pay SOL, you hold a Solana SPL token.
 *   - "Fee Tax" is configurable at 1%, 3%, 6% or 10% of eligible transfers.
 *   - "Fees paid in" supports SOL, so holder payouts land as SOL.
 *
 * Sui is NOT part of the mechanic. It is only the name and the joke. There is no
 * bridge, no wrapped asset and no second chain anywhere in this product. Do not
 * let marketing copy imply otherwise.
 */

type Unset = null

export const TOKEN = {
  name: 'SUICAT',
  ticker: 'SUICAT',

  /** The only chain involved. */
  chain: 'Solana',
  /** Launchpad handling the fee tax and the payouts. */
  launchpad: 'RevShare',
  /** The pool's quote asset — what you pay with. */
  quoteAsset: 'SOL',
  /** What holders are paid in. */
  payoutAsset: 'SOL',
  /** The chain this token is named after and has nothing to do with. */
  jokeChain: 'Sui',

  /** SPL mint address. null until deployed. */
  mintAddress: null as string | Unset,
  /** Total supply. null until fixed at launch. */
  totalSupply: null as number | Unset,
  /** RevShare "Fee Tax". Platform offers 1 | 3 | 6 | 10. null until picked. */
  feePercent: null as 1 | 3 | 6 | 10 | Unset,
  /** RevShare "Fees mode": 'Shareholders' | 'Apps Mode'. null until picked. */
  feesMode: null as string | Unset,
  /** AMM / launch venue, e.g. 'Meteora'. null until picked. */
  venue: null as string | Unset,
  /** How often payouts run. null until known. */
  payoutCadence: null as string | Unset,
  /** ISO date, only once a launch date is committed to publicly. */
  launchDate: null as string | Unset,
} as const

export const LINKS = {
  /** A null link renders as a disabled "SOON" control, never a dead button. */
  x: null as string | Unset,
  telegram: null as string | Unset,
  /** Filled in once the token exists. */
  revshare: null as string | Unset,
  chart: null as string | Unset,
} as const

/** Verifiable source for the mechanic described on this page. */
export const SOURCE_URL =
  'https://revshare.dev/articles/how-to-create-a-solana-token-with-a-custom-quote-token-using-revshare'

/** True only when there is a real mint to buy against. */
export const isLive: boolean = TOKEN.mintAddress !== null

export const PENDING = 'SET AT LAUNCH'

/** Formats a value that may not be decided yet. */
export function orPending(value: string | number | Unset, suffix = ''): string {
  if (value === null || value === undefined) return PENDING
  return `${value}${suffix}`
}
