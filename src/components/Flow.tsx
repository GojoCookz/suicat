import { Fragment } from 'react'
import { SOURCE_URL, TOKEN, orPending } from '../config/token'
import { Frame } from './ui/Frame'
import { Reveal } from './ui/Reveal'
import { Value } from './ui/Pending'

type Station = {
  step: string
  title: string
  detail: string
  /** Parameter still to be fixed at launch, rendered as an explicit pending chip. */
  param: { label: string; value: string }
}

const STATIONS: Station[] = [
  {
    step: '01',
    title: `You buy with ${TOKEN.quoteAsset}`,
    detail: `A plain ${TOKEN.chain} swap into a ${TOKEN.chain} token. Same wallet you already use, no bridge, no new chain.`,
    param: { label: 'Venue', value: orPending(TOKEN.venue) },
  },
  {
    step: '02',
    title: 'Every trade skims a fee',
    detail: `${TOKEN.launchpad} takes a fee tax off eligible transfers. Sellers pay it. Bots pay it. Your own trades pay it. It is set once at launch and not switchable after.`,
    param: { label: 'Fee tax', value: orPending(TOKEN.feePercent, '%') },
  },
  {
    step: '03',
    title: `It comes back as ${TOKEN.payoutAsset}`,
    detail: `Payouts settle in ${TOKEN.payoutAsset} and are pushed to holders pro-rata. Nothing to stake, nothing to claim, nothing to bridge back.`,
    param: { label: 'Payouts', value: orPending(TOKEN.payoutCadence) },
  },
]

/** The fee pipe. Touches both cards so it reads as plumbing, not decoration. */
function Connector() {
  return (
    <div
      aria-hidden="true"
      className="flex shrink-0 items-stretch justify-center self-stretch md:w-[clamp(24px,3vw,56px)] md:items-center md:self-center"
    >
      <div className="pipe pipe--v h-14 md:hidden">
        <div className="pipe__track dither-50" />
      </div>
      <div className="pipe pipe--h hidden w-full md:block">
        <div className="pipe__track dither-50" />
      </div>
    </div>
  )
}

export function Flow() {
  return (
    <section id="mechanic" className="bg-ink py-16 md:py-28">
      <div className="shell">
        <Reveal>
          <p className="t-micro text-glow">The mechanic</p>
          <h2
            className="t-display mt-3 text-paper"
            style={{ fontSize: 'clamp(2.25rem, 7vw, 4.75rem)' }}
          >
            Where your {TOKEN.payoutAsset} comes from
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-10 flex flex-col md:mt-16 md:flex-row md:items-stretch">
            {STATIONS.map((station, i) => (
              <Fragment key={station.step}>
                {i > 0 && <Connector />}
                <Frame
                  edge="sea"
                  fill="ink"
                  className="md:min-w-0 md:flex-1"
                  innerClassName="h-full p-6 md:p-6"
                >
                  <div className="flex items-center gap-4">
                    <span className="t-num text-[13px] text-glow">{station.step}</span>
                    <span
                      aria-hidden="true"
                      className="dither-50 d-sea h-[8px] flex-1"
                      style={{ ['--ds' as string]: '8px' }}
                    />
                  </div>

                  <h3 className="t-display mt-5 text-[25px] leading-[0.95] text-paper md:text-[27px]">
                    {station.title}
                  </h3>

                  <p className="t-body mt-3 text-[15px] text-paper">{station.detail}</p>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t-[4px] border-sea pt-5">
                    <span className="t-micro text-glow">{station.param.label}</span>
                    <Value value={station.param.value} className="text-[12px] text-paper" />
                  </div>
                </Frame>
              </Fragment>
            ))}
          </div>
        </Reveal>

        <Reveal delay={140}>
          <p className="t-body mt-8 max-w-[66ch] text-[15px] text-paper md:mt-10">
            The fee tax tiers and {TOKEN.payoutAsset}-denominated payouts are documented{' '}
            {TOKEN.launchpad} launch settings —{' '}
            <a
              className="text-glow underline underline-offset-4 hover:text-paper"
              href={SOURCE_URL}
              target="_blank"
              rel="noreferrer noopener"
            >
              read their guide
            </a>
            . The chipped values above are the ones we have not picked yet.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
