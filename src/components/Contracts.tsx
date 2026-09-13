import { TOKENS } from '../config/tokens'
import { CopyButton } from './ui/CopyButton'
import { Reveal } from './ui/Reveal'

/**
 * Full, unabbreviated addresses. This is the section people will actually act
 * on, so nothing is truncated here and the two identically-named SuiCats are
 * labelled by what they pay.
 */
export function Contracts() {
  return (
    <section id="contracts" className="bg-wok py-14 text-paper md:py-20">
      <div className="shell">
        <Reveal>
          <p className="t-label text-sui">Contracts</p>
          <h2
            className="t-display mt-2"
            style={{ fontSize: 'clamp(2.25rem, 7vw, 4rem)' }}
          >
            Check it before you buy it
          </h2>
          <p className="t-body mt-4 max-w-[60ch] text-[16px] md:text-[18px]">
            Two of these report the same name on-chain. Match the full address, not
            the name and not the ticker. Anything that differs by one character is
            not this token.
          </p>
        </Reveal>

        <div className="mt-8 space-y-5 md:mt-10">
          {TOKENS.map((token, i) => (
            <Reveal key={token.id} delay={60 + i * 50}>
              <div className="sticker p-5 text-wok md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="t-display text-[24px] leading-none">{token.label}</h3>
                    <p className="t-label mt-2 opacity-70">
                      Pays {token.pays.asset ?? 'not confirmed'}
                    </p>
                  </div>
                  <a
                    className="btn btn--sm btn--ghost"
                    href={token.dexscreener}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    DexScreener
                  </a>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <code className="t-num min-w-0 flex-1 break-all rounded-xl border-[3px] border-wok bg-cream px-3 py-2 text-[12px] md:text-[13px]">
                    {token.mint}
                  </code>
                  <CopyButton
                    value={token.mint}
                    label={`Copy the ${token.label} contract address`}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
