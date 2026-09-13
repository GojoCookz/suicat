/**
 * DexScreener client.
 *
 * Every market number shown on this site comes through here. Nothing is cached
 * to disk, nothing is faked, and a failed request surfaces as an error the UI
 * has to render — it must never fall back to a placeholder number that looks real.
 *
 * The public API allows cross-origin requests, verified from the browser, so
 * this runs client-side with no proxy.
 */

const ENDPOINT = 'https://api.dexscreener.com/latest/dex/tokens/'

export type Market = {
  mint: string
  /** USD price of one token. */
  priceUsd: number | null
  /** Fully diluted / market cap in USD, as DexScreener reports it. */
  marketCap: number | null
  /** Percent change over 24h. */
  change24h: number | null
  /** Pool liquidity in USD. */
  liquidityUsd: number | null
  /** Traded volume over 24h in USD. */
  volume24h: number | null
  /** Buy + sell count over 24h. */
  txns24h: number | null
  /** Which DEX the deepest pool sits on. */
  dexId: string | null
  /** The quote side of the deepest pool. */
  quoteSymbol: string | null
  pairUrl: string | null
}

type DexPair = {
  dexId?: string
  url?: string
  baseToken?: { address?: string }
  quoteToken?: { symbol?: string }
  priceUsd?: string
  marketCap?: number
  fdv?: number
  priceChange?: { h24?: number }
  liquidity?: { usd?: number }
  volume?: { h24?: number }
  txns?: { h24?: { buys?: number; sells?: number } }
}

const num = (v: unknown): number | null => {
  const n = typeof v === 'string' ? Number.parseFloat(v) : typeof v === 'number' ? v : NaN
  return Number.isFinite(n) ? n : null
}

/**
 * A token can trade in several pools. We report the deepest one by liquidity,
 * because that is the price that actually means something.
 */
function deepestPair(pairs: DexPair[], mint: string): DexPair | null {
  const mine = pairs.filter(
    (p) => p.baseToken?.address?.toLowerCase() === mint.toLowerCase(),
  )
  const pool = mine.length > 0 ? mine : pairs
  if (pool.length === 0) return null
  return pool.reduce((best, p) =>
    (p.liquidity?.usd ?? 0) > (best.liquidity?.usd ?? 0) ? p : best,
  )
}

export async function fetchMarket(mint: string, signal?: AbortSignal): Promise<Market> {
  const res = await fetch(`${ENDPOINT}${mint}`, { signal })
  if (!res.ok) throw new Error(`DexScreener responded ${res.status}`)

  const json = (await res.json()) as { pairs?: DexPair[] | null }
  const pair = deepestPair(json.pairs ?? [], mint)

  if (!pair) {
    return {
      mint,
      priceUsd: null,
      marketCap: null,
      change24h: null,
      liquidityUsd: null,
      volume24h: null,
      txns24h: null,
      dexId: null,
      quoteSymbol: null,
      pairUrl: null,
    }
  }

  const buys = pair.txns?.h24?.buys ?? null
  const sells = pair.txns?.h24?.sells ?? null

  return {
    mint,
    priceUsd: num(pair.priceUsd),
    marketCap: num(pair.marketCap ?? pair.fdv),
    change24h: num(pair.priceChange?.h24),
    liquidityUsd: num(pair.liquidity?.usd),
    volume24h: num(pair.volume?.h24),
    txns24h: buys === null && sells === null ? null : (buys ?? 0) + (sells ?? 0),
    dexId: pair.dexId ?? null,
    quoteSymbol: pair.quoteToken?.symbol ?? null,
    pairUrl: pair.url ?? null,
  }
}

export async function fetchMarkets(mints: string[], signal?: AbortSignal) {
  const results = await Promise.allSettled(mints.map((m) => fetchMarket(m, signal)))
  const map: Record<string, Market> = {}
  const failed: string[] = []

  results.forEach((r, i) => {
    if (r.status === 'fulfilled') map[mints[i]] = r.value
    else failed.push(mints[i])
  })

  return { map, failed }
}

/* --------------------------------------------------------------- formatting -- */

export function formatUsd(v: number | null): string {
  if (v === null) return '—'
  if (v >= 1_000_000_000) return `$${(v / 1_000_000_000).toFixed(2)}B`
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(2)}M`
  if (v >= 1_000) return `$${(v / 1_000).toFixed(1)}K`
  return `$${v.toFixed(2)}`
}

/** Sub-cent prices need significant digits, not fixed decimals. */
export function formatPrice(v: number | null): string {
  if (v === null) return '—'
  if (v >= 1) return `$${v.toFixed(4)}`
  if (v >= 0.01) return `$${v.toFixed(5)}`
  return `$${v.toPrecision(4)}`
}

export function formatPct(v: number | null): string {
  if (v === null) return '—'
  const sign = v > 0 ? '+' : ''
  return `${sign}${v.toFixed(1)}%`
}

export function formatCount(v: number | null): string {
  if (v === null) return '—'
  return v.toLocaleString('en-US')
}

export function shortMint(mint: string, head = 4, tail = 4): string {
  if (mint.length <= head + tail + 1) return mint
  return `${mint.slice(0, head)}…${mint.slice(-tail)}`
}
