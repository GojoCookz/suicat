import { CHAIN, LINKS } from '../config/tokens'
import { Action } from './ui/Action'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-wok py-12 text-paper md:py-16">
      <div className="shell">
        <h2
          className="t-display t-outline text-amber"
          style={{ fontSize: 'clamp(2.25rem, 9vw, 5.5rem)' }}
        >
          Pull up a bowl.
        </h2>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Action href={LINKS.telegram} variant="sui">
            Telegram
          </Action>
          <Action href={LINKS.x} variant="ghost">
            Follow on X
          </Action>
          <a
            className="btn btn--ghost"
            href={LINKS.revshare}
            target="_blank"
            rel="noreferrer noopener"
          >
            RevShare
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t-[3px] border-paper pt-6">
          <nav className="flex flex-wrap gap-4">
            {[
              { href: '#board', label: 'Board' },
              { href: '#ladder', label: 'Ladder' },
              { href: '#contracts', label: 'Contracts' },
              { href: '#crew', label: 'Crew' },
              { href: '#faq', label: 'FAQ' },
              { href: '#risk', label: 'Risk' },
            ].map((l) => (
              <a
                key={l.href}
                className="t-label underline-offset-4 hover:text-sui hover:underline"
                href={l.href}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <p className="t-label opacity-70">
            {year} · {CHAIN} meme tokens · no promises
          </p>
        </div>
      </div>
    </footer>
  )
}
