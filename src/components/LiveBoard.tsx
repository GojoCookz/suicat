import { TOKENS } from '../config/tokens'
import type { MarketsState } from '../hooks/useMarkets'
import {
  formatCount,
  formatPct,
  formatPrice,
  formatUsd,
  shortMint,
} from '../lib/dexscreener'
import { CopyButton } from './ui/CopyButton'
import { Reveal } from './ui/Reveal'
import { Stat } from './ui/Stat'

type Props = { markets: MarketsState }

function UpdatedLabel({ markets }: Props) {
  const { status, updatedAt, isRefreshing } = markets

  if (status === 'loading') {
    return <span className="chip chip--muted">Loading live data…</span>
  }

  if (status === 'error') {
    return (
      <span className="chip chip--warn">
        Live data unavailable{updatedAt ? ' · showing last known' : ''}
      </span>
    )
  }

  return (
    <span className="chip chip--live">
      <span
        aria-hidden="true"
        className={`inline-block h-[8px] w-[8px] rounded-full bg-wok ${
          isRefreshing ? 'anim-spin' : ''
        }`}
      />
      Live · updated{' '}
      {updatedAt?.toLocaleTimeString('en-US', { hour12: false }) ?? '—'}
    </span>
  )
}

export function LiveBoard({ markets }: Props) {
  const loading = markets.status === 'loading'

  return (
    <section id="board" className="bg-cream py-14 md:py-20">
      <div className="shell">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="t-label text-chili">The board</p>
              <h2
                className="t-display mt-2 text-wok"
                style={{ fontSize: 'clamp(2.25rem, 7vw, 4rem)' }}
              >
                Every token, live
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <UpdatedLabel markets={markets} />
              <button
                type="button"
                onClick={markets.refresh}
                className="btn btn--sm btn--ghost"
                disabled={markets.isRefreshing}
              >
                {markets.isRefreshing ? 'Refreshing…' : 'Refresh'}
              </button>
            </div>
          </div>
        </Reveal>

        {markets.status === 'error' && (
          <Reveal delay={40}>
            <div className="sticker sticker--chili mt-6 p-5">
              <p className="t-body text-[15px]">
                Could not reach DexScreener. Numbers below are the last ones that
                actually loaded, or blank if none did — nothing here is estimated.
                Try Refresh, or open any token on DexScreener directly.
              </p>
            </div>
          </Reveal>
        )}

        <div className="mt-8 grid gap-6 md:mt-10 md:grid-cols-3">
          {TOKENS.map((token, i) => {
            const m = markets.data[token.mint]
            const change = m?.change24h ?? null
            const tone = change === null ? 'neutral' : change >= 0 ? 'up' : 'down'

            return (
              <Reveal key={token.id} delay={60 + i * 60}>
                <article
                  className={`sticker h-full p-5 md:p-6 ${
                    token.flagship ? 'sticker--sui' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="t-display text-[26px] leading-none text-wok">
                        {token.label}
                      </h3>
                      <p className="t-label mt-2 opacity-70">
                        ${token.ticker} · on-chain name &ldquo;{token.onchainName}&rdquo;
                      </p>
                    </div>
                    {token.flagship && <span className="chip shrink-0">Flagship</span>}
                  </div>

                  <p className="t-body mt-3 text-[15px]">{token.role}</p>

                  <div className="mt-5 grid grid-cols-2 gap-4">
                    <Stat label="Price" value={formatPrice(m?.priceUsd ?? null)} loading={loading} />
                    <Stat
                      label="24h"
                      value={formatPct(change)}
                      loading={loading}
                      tone={tone}
                    />
                    <Stat
                      label="Market cap"
                      value={formatUsd(m?.marketCap ?? null)}
                      loading={loading}
                    />
                    <Stat
                      label="Liquidity"
                      value={formatUsd(m?.liquidityUsd ?? null)}
                      loading={loading}
                    />
                    <Stat
                      label="24h volume"
                      value={formatUsd(m?.volume24h ?? null)}
                      loading={loading}
                    />
                    <Stat
                      label="24h trades"
                      value={formatCount(m?.txns24h ?? null)}
                      loading={loading}
                    />
                  </div>

                  <div className="mt-5 border-t-[3px] border-wok pt-4">
                    <p className="t-label opacity-70">Pays holders</p>
                    <p className="t-body mt-1 text-[15px]">
                      {token.pays.asset ? (
                        <strong>{token.pays.asset}</strong>
                      ) : (
                        <span className="chip chip--muted">Not confirmed</span>
                      )}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <code className="t-num rounded-lg border-[3px] border-wok bg-paper px-2 py-1 text-[12px]">
                      {shortMint(token.mint, 6, 6)}
                    </code>
                    <CopyButton
                      value={token.mint}
                      label={`Copy ${token.label} contract address`}
                    />
                    <a
                      className="btn btn--sm btn--ghost"
                      href={m?.pairUrl ?? token.dexscreener}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Chart
                    </a>
                  </div>

                  {m?.dexId && (
                    <p className="t-label mt-3 opacity-60">
                      Deepest pool: {m.dexId}
                      {m.quoteSymbol ? ` / ${m.quoteSymbol}` : ''}
                    </p>
                  )}
                </article>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={260}>
          <p className="t-label mt-6 opacity-70">
            Source: DexScreener public API, deepest pool by liquidity, refreshed every
            45 seconds. Blank cells mean the API returned nothing for that field.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
