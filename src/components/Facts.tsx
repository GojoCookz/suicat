import { PENDING, TOKEN, orPending } from '../config/token'
import { Frame } from './ui/Frame'
import { Reveal } from './ui/Reveal'
import { Value } from './ui/Pending'

type Row = { label: string; value: string; note?: string }

const ROWS: Row[] = [
  { label: 'Name', value: TOKEN.name },
  { label: 'Ticker', value: `$${TOKEN.ticker}` },
  { label: 'Chain', value: TOKEN.chain },
  { label: 'Launchpad', value: TOKEN.launchpad },
  { label: 'You pay in', value: TOKEN.quoteAsset },
  { label: 'You are paid in', value: TOKEN.payoutAsset },
  { label: 'Chains involved', value: '1', note: `no ${TOKEN.jokeChain}, no bridge` },
  { label: 'Mint address', value: orPending(TOKEN.mintAddress) },
  { label: 'Total supply', value: orPending(TOKEN.totalSupply) },
  { label: 'Fee tax', value: orPending(TOKEN.feePercent, '%') },
  { label: 'Fees mode', value: orPending(TOKEN.feesMode) },
  { label: 'Venue', value: orPending(TOKEN.venue) },
  { label: 'Launch date', value: orPending(TOKEN.launchDate) },
]

export function Facts() {
  const pendingCount = ROWS.filter((r) => r.value === PENDING).length

  return (
    <section id="facts" className="bg-ink py-16 md:py-28">
      <div className="shell">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="t-micro text-glow">The facts</p>
              <h2
                className="t-display mt-3 text-paper"
                style={{ fontSize: 'clamp(2.25rem, 7vw, 4.75rem)' }}
              >
                Nothing invented
              </h2>
            </div>
            <p className="t-body max-w-[36ch] text-[15px] text-paper">
              {pendingCount} of {ROWS.length} fields are not decided yet. They say so rather
              than showing a number we made up.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <Frame edge="sea" fill="ink" className="mt-9 md:mt-12" innerClassName="p-1">
            <dl className="grid grid-cols-1 md:grid-cols-2">
              {ROWS.map((row) => {
                const pending = row.value === PENDING
                return (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-4 border-b-[4px] border-sea px-5 py-4 md:px-6 md:py-5"
                  >
                    <dt className="t-micro shrink-0 text-glow">{row.label}</dt>
                    <dd className="flex min-w-0 items-center justify-end gap-2 text-right">
                      <Value value={row.value} className="break-all text-[13px] text-paper" />
                      {row.note && !pending && (
                        <span className="t-micro shrink-0 text-glow">{row.note}</span>
                      )}
                    </dd>
                  </div>
                )
              })}
            </dl>
          </Frame>
        </Reveal>
      </div>
    </section>
  )
}
