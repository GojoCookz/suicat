import { byId } from '../config/tokens'
import { Reveal } from './ui/Reveal'

const V1 = byId('suicatV1')
const V2 = byId('suicatV2')

const POINTS = [
  {
    h: 'These are meme tokens',
    p: 'They exist for entertainment. No intrinsic value, no business, no revenue. They confer no equity, ownership, voting rights, dividends or claim against any person or entity.',
  },
  {
    h: 'Two mints share one name',
    p: `${V1.label} and ${V2.label} both report "SuiCat" on-chain and they do different things. Copying the wrong address buys the wrong token. Always match the full string.`,
  },
  {
    h: 'Payouts are a mechanism, not a promise',
    p: 'Fee routing is a RevShare configuration, not an obligation anyone here has taken on. Payouts can be delayed, changed or stopped, and some wallets may be excluded. If nobody trades, nobody gets paid.',
  },
  {
    h: 'Liquidity here is thin',
    p: 'The board shows real pool depth and it is small. Small pools mean severe slippage, easy price manipulation and the real possibility that you cannot sell what you bought at anything near the quoted price.',
  },
  {
    h: 'The numbers are third-party',
    p: 'Price, market cap, liquidity and volume come from the DexScreener API and can be wrong, delayed or missing. Verify on-chain before acting on anything shown here.',
  },
  {
    h: 'No affiliation with Sui',
    p: 'The name is a joke about a dish. Nothing here is built on, endorsed by, partnered with or connected to the Sui network or anyone who works on it.',
  },
  {
    h: 'It can go to zero',
    p: 'Do not spend money you need. Verify every mint, pool and setting yourself. Do not trust a website, including this one.',
  },
]

export function Risk() {
  return (
    <section id="risk" className="bg-cream py-14 md:py-20">
      <div className="shell">
        <Reveal>
          <span className="chip chip--warn">Warning label</span>
          <h2
            className="t-display mt-4 text-wok"
            style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}
          >
            Read this before you buy anything
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-8 grid gap-x-10 gap-y-6 md:mt-10 md:grid-cols-2">
            {POINTS.map((point) => (
              <div key={point.h} className="border-t-[3px] border-wok pt-4">
                <h3 className="t-display text-[18px] leading-tight">{point.h}</h3>
                <p className="t-body mt-2 text-[15px]">{point.p}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={140}>
          <p className="t-label mt-8 max-w-[72ch] opacity-70">
            Nothing on this page is financial, investment, legal or tax advice, an offer
            to sell, or a solicitation of an offer to buy. Availability may be restricted
            where you live and you are responsible for your own compliance.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
