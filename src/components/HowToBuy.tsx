import { LINKS, TOKEN, isLive, orPending } from '../config/token'
import { Action } from './ui/Action'
import { Frame } from './ui/Frame'
import { Reveal } from './ui/Reveal'
import { Value } from './ui/Pending'

const STEPS = [
  {
    n: '01',
    title: 'Get a Solana wallet',
    body: 'Phantom or Solflare. Hold your own keys — tokens parked on an exchange do not receive payouts.',
    ready: true,
  },
  {
    n: '02',
    title: `Fund it with ${TOKEN.quoteAsset}`,
    body: `Buy ${TOKEN.quoteAsset} on any exchange and send it over. That is the whole setup — there is no second chain to fund.`,
    ready: true,
  },
  {
    n: '03',
    title: `Swap it for $${TOKEN.ticker}`,
    body: 'Needs a live pool and a verified mint address. Neither exists yet.',
    ready: isLive,
  },
]

export function HowToBuy() {
  return (
    <section id="buy" className="bg-ink py-16 md:py-28">
      <div className="shell">
        <Reveal>
          <p className="t-micro text-glow">How to buy</p>
          <h2
            className="t-display mt-3 text-paper"
            style={{ fontSize: 'clamp(2.25rem, 7vw, 4.75rem)' }}
          >
            You can&rsquo;t yet
          </h2>
          <p className="t-body mt-5 max-w-[54ch] text-[17px] text-paper md:text-[20px]">
            There is no mint, no pool and no token. Any {TOKEN.chain} coin calling itself $
            {TOKEN.ticker} right now is not this one. The address will appear here and on our
            X account at the same time.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <ol className="mt-10 grid gap-5 md:mt-14 md:grid-cols-3">
            {STEPS.map((step) => (
              <li key={step.n}>
                <Frame
                  edge={step.ready ? 'glow' : 'sea'}
                  fill="ink"
                  className="h-full"
                  innerClassName="flex h-full flex-col p-6"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="t-num text-[13px] text-glow">{step.n}</span>
                    {step.ready ? (
                      <span className="t-micro text-glow">Ready</span>
                    ) : (
                      <span className="pending">Locked</span>
                    )}
                  </div>
                  <h3 className="t-display mt-4 text-[24px] leading-[0.95] text-paper">
                    {step.title}
                  </h3>
                  <p className="t-body mt-3 text-[15px] text-paper">{step.body}</p>
                </Frame>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={140}>
          <Frame edge="sea" fill="ink" className="mt-8" innerClassName="p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="min-w-0">
                <p className="t-micro text-glow">Mint address</p>
                <div className="mt-3">
                  <Value
                    value={orPending(TOKEN.mintAddress)}
                    className="break-all text-[13px] text-paper"
                  />
                </div>
              </div>
              <span className="btn-block">
                <Action href={LINKS.x} lockedLabel="Soon">
                  Get it first on X
                </Action>
              </span>
            </div>
          </Frame>
        </Reveal>
      </div>
    </section>
  )
}
