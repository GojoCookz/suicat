import { LINKS, TOKEN } from '../config/token'
import { Action } from './ui/Action'
import { Frame } from './ui/Frame'
import { Ramp } from './ui/Ramp'
import { Wordmark } from './Wordmark'

export function Hero() {
  return (
    <header className="relative bg-ink">
      <div className="shell">
        <div className="flex items-center justify-between gap-4 py-5 md:py-7">
          <Wordmark className="text-[15px] md:text-[18px]" />
          <span className="t-micro text-glow">
            {TOKEN.chain} only · {TOKEN.payoutAsset} in, {TOKEN.payoutAsset} out
          </span>
        </div>

        <div aria-hidden="true" className="px-rule text-sea" />

        {/* status. the most important honest fact on the page, so it goes first. */}
        <div className="mt-7 md:mt-9">
          <span className="inline-flex items-center gap-[10px] bg-glow px-4 py-[10px] t-micro text-ink">
            <span aria-hidden="true" className="anim-blink inline-block h-[8px] w-[8px] bg-ink" />
            Pre-launch · no contract yet
          </span>
        </div>

        <div className="mt-7 grid gap-10 md:mt-12 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-14">
          <div>
            <h1
              className="t-display text-paper"
              style={{ fontSize: 'clamp(3.5rem, 15vw, 10rem)' }}
            >
              Huh?
              <br />
              What&rsquo;s <span className="text-glow">{TOKEN.jokeChain}</span>?
            </h1>

            <p className="t-body mt-7 max-w-[46ch] text-[17px] text-paper md:text-[20px]">
              Exactly. ${TOKEN.ticker} is a {TOKEN.chain} token. You pay in{' '}
              {TOKEN.quoteAsset}, you hold a {TOKEN.chain} token, and every trade pays you
              back in {TOKEN.payoutAsset}. The name is a joke. The rewards are not.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4 md:mt-10">
              <span className="btn-block">
                <a className="btn btn--primary" href="#mechanic">
                  See how it works
                </a>
              </span>

              <Action href={LINKS.x} variant="ghost" lockedLabel="Soon">
                Follow on X
              </Action>
            </div>
          </div>

          {/* the cat */}
          <div className="relative mx-auto w-full max-w-[340px] md:max-w-none">
            <Frame edge="paper" fill="glow" stepped className="anim-bob">
              <img
                src="/cat.png"
                width={1000}
                height={1000}
                alt="Pixel-art white cat looking up at a large question mark."
                className="block h-auto w-full"
                fetchPriority="high"
              />
            </Frame>
            <p className="t-micro mt-4 text-center text-glow">
              named after a chain it does not use
            </p>
          </div>
        </div>
      </div>

      {/* dithered ramp into the accent band below. the pixel-art answer to a gradient. */}
      <Ramp tone="glow" direction="up" className="mt-14 md:mt-20" />
    </header>
  )
}
