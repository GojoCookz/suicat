import { Fragment } from 'react'
import { REVSHARE_DOCS, byId } from '../config/tokens'
import { Reveal } from './ui/Reveal'
import { TokenArt } from './ui/TokenArt'

const V1 = byId('suicatV1')
const V2 = byId('suicatV2')

type Rung = {
  title: string
  sub: string
  tone: string
  art: { src: string; alt: string; pixel: boolean } | null
}

const RUNGS: Rung[] = [
  { title: V1.label, sub: 'You hold this', tone: 'sticker--cream', art: V1.art },
  {
    title: V2.label,
    sub: `${V1.label} pays you this`,
    tone: 'sticker--sui',
    art: V2.art,
  },
  { title: 'SOL', sub: `${V2.label} pays you this`, tone: 'sticker--deep', art: null },
]

/** The chopsticks between rungs, with a travelling dot. */
function Rail() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-center py-2 md:w-16 md:shrink-0 md:py-0"
    >
      <div className="relative h-12 w-[6px] overflow-hidden rounded-full border-[3px] border-wok bg-paper md:h-[6px] md:w-full">
        <span className="anim-slide absolute left-0 top-0 h-full w-3 bg-chili" />
      </div>
    </div>
  )
}

export function Ladder() {
  return (
    <section id="ladder" className="bg-amber py-14 md:py-20">
      <div className="shell">
        <Reveal>
          <p className="t-label text-chili">The ladder</p>
          <h2
            className="t-display mt-2 text-wok"
            style={{ fontSize: 'clamp(2.25rem, 7vw, 4rem)' }}
          >
            Two cats, one payout
          </h2>
          <p className="t-body mt-4 max-w-[58ch] text-[16px] md:text-[18px]">
            Both SuiCat mints report the same name on-chain, so here is the only thing
            that actually separates them: what each one pays you.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-8 flex flex-col md:mt-12 md:flex-row md:items-stretch">
            {RUNGS.map((rung, i) => (
              <Fragment key={rung.title}>
                {i > 0 && <Rail />}
                <div className={`sticker ${rung.tone} flex-1 p-5 md:p-6`}>
                  <p className="t-label opacity-70">Step {i + 1}</p>
                  <div className="mt-3 flex items-center gap-3">
                    {rung.art ? (
                      <TokenArt art={rung.art} size="lg" decorative />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="t-display flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-[3px] border-wok bg-paper text-[26px] text-wok"
                      >
                        SOL
                      </span>
                    )}
                    <div className="min-w-0">
                      <h3 className="t-display text-[26px] leading-none md:text-[30px]">
                        {rung.title}
                      </h3>
                      <p className="t-body mt-2 text-[15px]">{rung.sub}</p>
                    </div>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="sticker mt-8 p-5 md:p-6">
            <p className="t-body text-[15px] md:text-[16px]">
              Both SuiCat mints are RevShare launches — their addresses end in{' '}
              <code className="t-num">REV</code>. RevShare&rsquo;s fee tax is taken off
              eligible transfers and routed to holders in whichever asset the launch was
              configured to pay.{' '}
              <a
                className="underline decoration-[3px] underline-offset-4 hover:text-chili"
                href={REVSHARE_DOCS}
                target="_blank"
                rel="noreferrer noopener"
              >
                Their docs explain the settings
              </a>
              . Verify the payout config yourself before buying — do not take it from
              this page.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
