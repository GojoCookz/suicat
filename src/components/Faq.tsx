import { PENDING, TOKEN, orPending } from '../config/token'
import { Frame } from './ui/Frame'
import { Reveal } from './ui/Reveal'

const QA: { q: string; a: string }[] = [
  {
    q: `Huh? What is ${TOKEN.jokeChain}?`,
    a: 'Another layer 1. That is genuinely the entire bit. We are not on it, we do not touch it, and you never have to think about it again.',
  },
  {
    q: `So this is not on ${TOKEN.jokeChain}?`,
    a: `Correct. ${TOKEN.chain} only. One mint, one wallet, one asset. ${TOKEN.jokeChain} is the name and the cat, nothing else.`,
  },
  {
    q: `Then why call it ${TOKEN.ticker}?`,
    a: 'Because the cat was already called that, and a ticker that makes people ask a question is a ticker that gets typed into a search bar.',
  },
  {
    q: 'Do I have to stake or claim?',
    a: 'No. Payouts are pushed to holders. Nothing to lock, nothing to click.',
  },
  {
    q: 'How much will I earn?',
    a: `Entirely dependent on trading volume and on how much of the supply you hold. If nobody trades, nobody gets paid. The fee tax is ${orPending(TOKEN.feePercent, '%')}.`,
  },
  {
    q: 'What if I keep it on an exchange?',
    a: 'Then you may get nothing. Payouts go to wallets. Keep it somewhere you hold the keys.',
  },
  {
    q: 'Is there a presale or a team allocation?',
    a: 'Not announced. When there is something to say it goes in the facts table above, not in a thread.',
  },
  {
    q: 'When does it launch?',
    a:
      TOKEN.launchDate === null
        ? 'No date is committed to yet. When there is one it appears in the facts table.'
        : `${TOKEN.launchDate}.`,
  },
  {
    q: 'Why is the cat confused?',
    a: 'Someone asked it what Sui was.',
  },
]

export function Faq() {
  return (
    <section id="faq" className="bg-ink pb-16 md:pb-28">
      <div className="shell">
        <Reveal>
          <p className="t-micro text-glow">Questions</p>
          <h2
            className="t-display mt-3 text-paper"
            style={{ fontSize: 'clamp(2.25rem, 7vw, 4.75rem)' }}
          >
            Asked the cat
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <Frame edge="sea" fill="ink" className="mt-9 md:mt-12" innerClassName="p-1">
            <div>
              {QA.map((item) => (
                <details key={item.q} className="group border-b-[4px] border-sea last:border-b-0">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 md:px-7">
                    <span className="t-display text-[19px] leading-tight text-paper md:text-[22px]">
                      {item.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className="t-pixel shrink-0 text-[18px] text-glow transition-transform duration-150 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="t-body px-5 pb-6 text-[15px] text-paper md:px-7 md:text-[16px]">
                    {item.a.includes(PENDING) ? (
                      <>
                        {item.a.split(PENDING)[0]}
                        <span className="pending align-middle">{PENDING}</span>
                        {item.a.split(PENDING)[1]}
                      </>
                    ) : (
                      item.a
                    )}
                  </p>
                </details>
              ))}
            </div>
          </Frame>
        </Reveal>
      </div>
    </section>
  )
}
