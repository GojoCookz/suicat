import { CHAIN, REVSHARE_DOCS, byId } from '../config/tokens'
import { Reveal } from './ui/Reveal'

const V1 = byId('suicatV1')
const V2 = byId('suicatV2')

const QA: { q: string; a: React.ReactNode }[] = [
  {
    q: 'Huh? What is Sui?',
    a: 'Another layer 1. That is the whole joke. Every token here lives on Solana — there is no bridge, no wrapped asset and no second chain to fund.',
  },
  {
    q: 'Why are there two SUICATs?',
    a: (
      <>
        They are two separate mints that both report the on-chain name
        &ldquo;SuiCat&rdquo;. {V1.label} pays holders in {V2.label}. {V2.label} pays
        holders in SOL. Match the full contract address — the name will not tell
        you which is which.
      </>
    ),
  },
  {
    q: 'Which one should I be looking at?',
    a: (
      <>
        That is your call and this page will not make it for you. {V2.label} is the
        end of the chain and pays SOL. {V1.label} pays you {V2.label}. Both are on the
        board above with live liquidity so you can see the difference in depth.
      </>
    ),
  },
  {
    q: 'Do I have to stake or claim?',
    a: 'No. RevShare pushes payouts to holders. Keep the tokens in a wallet you hold the keys to — tokens sitting on an exchange may be skipped entirely.',
  },
  {
    q: 'How much will I earn?',
    a: 'Entirely dependent on trading volume and on how much of the supply you hold. If nobody trades, nobody gets paid. This page deliberately does not publish a yield figure, because any number would be made up.',
  },
  {
    q: 'Where do the numbers on this page come from?',
    a: (
      <>
        The DexScreener public API, refreshed every 45 seconds, using the deepest
        pool by liquidity for each mint. When a field is blank the API returned
        nothing for it. Nothing on this page is estimated or hardcoded.
      </>
    ),
  },
  {
    q: 'What is RevShare?',
    a: (
      <>
        The launchpad both SuiCat mints were created through — their addresses end in{' '}
        <code className="t-num">REV</code>. It takes a configurable fee tax off
        eligible transfers and routes it to holders.{' '}
        <a
          className="underline decoration-[3px] underline-offset-4 hover:text-chili"
          href={REVSHARE_DOCS}
          target="_blank"
          rel="noreferrer noopener"
        >
          Read their docs
        </a>{' '}
        rather than trusting this summary.
      </>
    ),
  },
  {
    q: 'Does ChopSui pay rewards too?',
    a: 'Not confirmed, so the board says "Not confirmed" rather than guessing. Its mint is not a RevShare address and we have not verified a payout config for it.',
  },
]

export function Faq() {
  return (
    <section id="faq" className="bg-amber py-14 md:py-20">
      <div className="shell">
        <Reveal>
          <p className="t-label text-chili">Questions</p>
          <h2
            className="t-display mt-2 text-wok"
            style={{ fontSize: 'clamp(2.25rem, 7vw, 4rem)' }}
          >
            Ask the cat
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-8 space-y-4 md:mt-10">
            {QA.map((item) => (
              <details key={item.q} className="sticker group overflow-hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 md:p-6">
                  <span className="t-display text-[19px] leading-tight md:text-[22px]">
                    {item.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className="t-display shrink-0 text-[24px] transition-transform duration-150 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="t-body px-5 pb-6 text-[15px] md:px-6 md:text-[16px]">{item.a}</p>
              </details>
            ))}
          </div>
        </Reveal>

        <Reveal delay={140}>
          <p className="t-label mt-6 opacity-70">All tokens on {CHAIN}.</p>
        </Reveal>
      </div>
    </section>
  )
}
