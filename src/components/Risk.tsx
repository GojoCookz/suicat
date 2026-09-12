import { TOKEN } from '../config/token'
import { Reveal } from './ui/Reveal'

const POINTS = [
  {
    h: 'It is a meme token',
    p: `$${TOKEN.ticker} exists for entertainment. It has no intrinsic value, no business and no revenue. It confers no equity, no ownership, no voting rights, no dividends and no claim against any person or entity.`,
  },
  {
    h: 'Payouts are a mechanism, not a promise',
    p: `Fee routing is a configuration of ${TOKEN.launchpad}'s programs, not an obligation anyone here has taken on. Nobody promises any payout, yield or return. Cycles can be delayed, changed or stopped and some wallets may be excluded. If nobody trades, nobody gets paid.`,
  },
  {
    h: 'The fee applies to you too',
    p: 'The fee tax comes off eligible transfers, including your own buys and sells. You always end up with less than was sent.',
  },
  {
    h: `The name is not a ${TOKEN.jokeChain} affiliation`,
    p: `${TOKEN.ticker} is not built on, endorsed by, partnered with or connected to ${TOKEN.jokeChain} or anyone who works on it. It is a ${TOKEN.chain} token with a joke for a name.`,
  },
  {
    h: 'Third parties can break it',
    p: `This depends on ${TOKEN.chain}, on ${TOKEN.launchpad}'s launch and reward programs, and on whichever AMM the pool sits in. Bugs, outages, upgrades and policy changes at any of them can affect the token, its liquidity and its payouts.`,
  },
  {
    h: 'It can go to zero',
    p: 'Do not spend money you need. Verify the mint, the pool and the settings on-chain before you buy. Do not trust a website, including this one.',
  },
]

export function Risk() {
  return (
    <section id="risk" className="bg-paper text-ink">
      <div className="shell py-14 md:py-20">
        <Reveal>
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="dither-50 d-ink h-[16px] w-[64px] shrink-0"
              style={{ ['--ds' as string]: '8px' }}
            />
            <p className="t-micro">Warning label</p>
          </div>

          <h2 className="t-display mt-5" style={{ fontSize: 'clamp(2rem, 6vw, 3.75rem)' }}>
            Read this before you buy anything
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-9 grid gap-x-10 gap-y-7 md:mt-12 md:grid-cols-2">
            {POINTS.map((point) => (
              <div key={point.h} className="border-t-[4px] border-ink pt-4">
                <h3 className="t-pixel text-[13px] font-bold">{point.h}</h3>
                <p className="t-body mt-2 text-[15px]">{point.p}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={140}>
          <p className="t-micro mt-10 max-w-[70ch]">
            Nothing on this page is financial, investment, legal or tax advice, an offer to
            sell, or a solicitation of an offer to buy. Jokes about other chains are jokes.
            Availability may be restricted where you live and you are responsible for your own
            compliance.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
