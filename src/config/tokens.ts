/**
 * SINGLE SOURCE OF TRUTH for every token on this site.
 *
 * HOUSE RULES
 *  - No fake data. Market numbers are NEVER written here. They come from the
 *    DexScreener API at runtime and render as skeletons while loading and as
 *    an explicit error state when the fetch fails.
 *  - Anything not yet known is `null` and renders as "—" or an "UNCONFIRMED"
 *    chip. Never guess a value to make a card look complete.
 *
 * ADDRESSES WERE VERIFIED against api.dexscreener.com before being written here.
 * Both SuiCat mints report the on-chain name "SuiCat", which is exactly why the
 * V1 / V2 labels below exist: a holder must be able to tell them apart. If you
 * change an address, re-verify it and re-check which one pays what.
 */

export type RewardPayout = {
  /** Ticker of what holders receive. null = not confirmed. */
  asset: string | null
  /** Short human sentence. null = not confirmed. */
  note: string | null
}

export type TokenDef = {
  id: 'chopsui' | 'suicatV1' | 'suicatV2'
  /** What we call it on the site. Must disambiguate the two SuiCats. */
  label: string
  ticker: string
  /** On-chain name as reported by DexScreener, shown so people can cross-check. */
  onchainName: string
  mint: string
  /** One line on what this token is for. */
  role: string
  /** What holding it pays out. */
  pays: RewardPayout
  /** Flagship of the crew gets visual priority. */
  flagship: boolean
  dexscreener: string
  /** Token art. Shown anywhere the token is named. */
  art: { src: string; alt: string; pixel: boolean }
}

const SUICAT_ART = {
  src: '/suicat.png',
  alt: 'SuiCat: a pixel-art white cat looking up at a large question mark.',
  pixel: true,
}

export const TOKENS: TokenDef[] = [
  {
    id: 'chopsui',
    label: 'ChopSui!',
    ticker: 'CHOPSUI',
    onchainName: 'ChopSui!',
    mint: 'sUiYveS2o7BfvkDWcdcMwUKPDqkxoBJnuwZVeeh3shq',
    role: 'The bowl everything else sits in. The crew token.',
    // Not confirmed as a reward token — its mint is not a RevShare address and
    // no payout config has been verified. Do not invent one.
    pays: { asset: null, note: null },
    flagship: true,
    dexscreener: 'https://dexscreener.com/solana/sUiYveS2o7BfvkDWcdcMwUKPDqkxoBJnuwZVeeh3shq',
    art: {
      src: '/crew.png',
      alt: 'The ChopSui crew around a bowl of chop suey.',
      pixel: false,
    },
  },
  {
    id: 'suicatV1',
    label: 'SUICAT V1',
    ticker: 'SUICAT',
    onchainName: 'SuiCat',
    mint: 'hFyV6R6Gok9qr6rmY5J6EwgnJ5iBbbWRNVVTw7fGREV',
    role: 'The feeder. Hold it and it pays you the V2 token.',
    pays: { asset: 'SUICAT V2', note: 'Holders are paid in SUICAT V2.' },
    flagship: false,
    dexscreener: 'https://dexscreener.com/solana/hFyV6R6Gok9qr6rmY5J6EwgnJ5iBbbWRNVVTw7fGREV',
    art: SUICAT_ART,
  },
  {
    id: 'suicatV2',
    label: 'SUICAT V2',
    ticker: 'SUICAT',
    onchainName: 'SuiCat',
    mint: 'DWKWx7vpgpHUYuWgkrZc11eEgMgy5iLzfCefhmjXbREV',
    role: 'The end of the line. Hold it and it pays you SOL.',
    pays: { asset: 'SOL', note: 'Holders are paid in SOL.' },
    flagship: false,
    dexscreener: 'https://dexscreener.com/solana/DWKWx7vpgpHUYuWgkrZc11eEgMgy5iLzfCefhmjXbREV',
    art: SUICAT_ART,
  },
]

export const byId = (id: TokenDef['id']): TokenDef => {
  const t = TOKENS.find((x) => x.id === id)
  if (!t) throw new Error(`Unknown token id: ${id}`)
  return t
}

/** The reward chain, in order. Rendered as the ladder diagram. */
export const LADDER = ['suicatV1', 'suicatV2'] as const

export const LINKS = {
  /** Verified from the DexScreener listing for CHOPSUI. */
  telegram: 'https://t.me/chopsuitoken',
  /** null renders a disabled "SOON" control, never a dead button. */
  x: null as string | null,
  revshare: 'https://revshare.dev',
}

/** Where the launchpad mechanic is documented, linked from the page. */
export const REVSHARE_DOCS =
  'https://revshare.dev/articles/how-to-create-a-solana-token-with-a-custom-quote-token-using-revshare'

export const CHAIN = 'Solana'
