import { CHAIN, LINKS, TOKENS } from '../config/tokens'
import type { MarketsState } from '../hooks/useMarkets'
import { formatUsd } from '../lib/dexscreener'
import { Action } from './ui/Action'

type Props = { markets: MarketsState }

/**
 * Steam curls rising off the bowl. Sits BEHIND the card and is clipped to the
 * top edge, so it reads as steam escaping rather than as three white bars
 * floating on the background.
 */
function Steam() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -top-10 z-0 flex h-10 items-end justify-center gap-6 overflow-hidden"
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="anim-steam block h-9 w-[10px] rounded-full bg-cream"
          style={{ animationDelay: `${i * 1.1}s`, opacity: 0 }}
        />
      ))}
    </div>
  )
}

export function Hero({ markets }: Props) {
  const loading = markets.status === 'loading'
  const combinedMcap = TOKENS.reduce<number | null>((sum, t) => {
    const v = markets.data[t.mint]?.marketCap
    if (v === null || v === undefined) return sum
    return (sum ?? 0) + v
  }, null)

  return (
    <header className="relative overflow-hidden bg-amber">
      <div className="shell">
        <nav className="flex items-center justify-between gap-4 py-5">
          <span className="t-display text-[22px] text-wok md:text-[26px]">
            Chop<span className="text-chili">Sui</span> Crew
          </span>
          <div className="hidden items-center gap-2 md:flex">
            <a className="btn btn--sm btn--ghost" href="#board">
              Board
            </a>
            <a className="btn btn--sm btn--ghost" href="#ladder">
              Ladder
            </a>
            <a className="btn btn--sm btn--ghost" href="#contracts">
              Contracts
            </a>
          </div>
        </nav>

        <div className="grid gap-8 pb-14 pt-4 md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-12 md:pb-20">
          <div>
            <span className="chip chip--live">
              {CHAIN} · {TOKENS.length} tokens · rewards paid on-chain
            </span>

            <h1
              className="t-display t-outline-lg mt-5 text-amber"
              style={{ fontSize: 'clamp(3rem, 12vw, 7.5rem)' }}
            >
              Everyone eats.
            </h1>

            <p className="t-body mt-5 max-w-[46ch] text-[17px] md:text-[20px]">
              The ChopSui crew is a bowl of {CHAIN} tokens that pay their holders.
              SUICAT V1 pays you V2. V2 pays you SOL. ChopSui is the bowl it all
              sits in.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a className="btn btn--primary" href="#board">
                See the board
              </a>
              <Action href={LINKS.telegram} variant="ghost">
                Telegram
              </Action>
            </div>

            <div className="sticker sticker--cream mt-7 inline-flex flex-wrap items-baseline gap-x-3 gap-y-1 px-4 py-3">
              <span className="t-label opacity-70">Crew market cap</span>
              <span className="t-num text-[20px]">
                {loading ? <span className="skeleton w-16" /> : formatUsd(combinedMcap)}
              </span>
              <span className="t-label opacity-60">via DexScreener</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[420px] md:max-w-none">
            <div className="relative isolate">
              <Steam />
              <div className="sticker anim-bob relative z-10 overflow-hidden p-0">
                <img
                  src="/crew.png"
                  width={800}
                  height={800}
                  alt="The ChopSui crew: a hippo in a blue jacket, a blue dog in a cap and sunglasses, and a blue cat with chopsticks, around a bowl of chop suey."
                  className="block h-auto w-full"
                  fetchPriority="high"
                />
              </div>
            </div>
            <p className="t-label mt-4 text-center opacity-70">
              hippo · dog · cat — the whole crew
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
