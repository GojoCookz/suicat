import { LINKS, TOKEN } from '../config/token'
import { Action } from './ui/Action'
import { Wordmark } from './Wordmark'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-ink">
      <div
        aria-hidden="true"
        className="dither-25 d-sea h-[64px] w-full"
        style={{ ['--ds' as string]: '8px' }}
      />

      <div className="shell py-14 md:py-20">
        <h2 className="t-display text-paper" style={{ fontSize: 'clamp(2.5rem, 10vw, 7rem)' }}>
          Hold the cat.
          <br />
          <span className="text-glow">Get paid in {TOKEN.payoutAsset}.</span>
        </h2>

        <p className="t-body mt-6 max-w-[50ch] text-[16px] text-paper">
          Nothing is live yet. The only thing worth doing today is following along, so you get
          the mint address from us first and not from a copy of us.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <span className="btn-block">
            <Action href={LINKS.x} lockedLabel="Soon">
              Follow on X
            </Action>
          </span>
          <Action href={LINKS.telegram} variant="ghost" lockedLabel="Soon">
            Telegram
          </Action>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-5 border-t-[4px] border-sea pt-6">
          <Wordmark className="text-[14px]" />
          <nav className="flex flex-wrap gap-5">
            {[
              { href: '#mechanic', label: 'Mechanic' },
              { href: '#facts', label: 'Facts' },
              { href: '#faq', label: 'FAQ' },
              { href: '#risk', label: 'Risk' },
            ].map((link) => (
              <a
                key={link.href}
                className="t-micro text-glow underline-offset-4 hover:text-paper hover:underline"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <p className="t-micro text-glow">{year} · Meme token · No promises</p>
        </div>
      </div>
    </footer>
  )
}
