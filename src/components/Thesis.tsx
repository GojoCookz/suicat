import { TOKEN } from '../config/token'

/**
 * Full-bleed accent band. This is the page's figure/ground event — everything
 * around it is ink, this is solid cyan.
 */
export function Thesis() {
  return (
    <section className="relative overflow-hidden bg-glow text-ink">
      <div className="shell py-14 md:py-24">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-center md:gap-16">
          <div>
            <p className="t-micro">The whole idea</p>

            <p
              className="t-display mt-5 max-w-[14ch]"
              style={{ fontSize: 'clamp(2.75rem, 10vw, 6.5rem)' }}
            >
              {TOKEN.payoutAsset} in. {TOKEN.payoutAsset} out. That&rsquo;s it.
            </p>

            <span
              aria-hidden="true"
              className="dither-50 d-ink mt-9 block h-[16px] w-full max-w-[440px]"
              style={{ ['--ds' as string]: '8px' }}
            />

            <p className="t-body mt-8 max-w-[52ch] text-[17px] font-semibold md:text-[20px]">
              No bridge. No wrapped anything. No second chain to learn. One{' '}
              {TOKEN.chain} wallet, one token, and a cut of every trade landing back in it as{' '}
              {TOKEN.payoutAsset}. We just liked the cat.
            </p>
          </div>

          {/* the cat's question mark, whole and deliberate, never behind the words */}
          <span
            aria-hidden="true"
            className="t-pixel pointer-events-none -mr-[6vw] hidden select-none self-center leading-[0.8] text-ink md:-mr-[3vw] md:block"
            style={{ fontSize: 'clamp(9rem, 20vw, 17rem)' }}
          >
            ?
          </span>
        </div>
      </div>
    </section>
  )
}
