import { useEffect, useState } from 'react'
import { LINKS, TOKEN } from '../config/token'
import { Action } from './ui/Action'

/**
 * Mobile-only sticky ask. Appears once the hero is out of the way so it never
 * competes with the hero CTA.
 */
export function StickyCta() {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.9)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 md:hidden"
      style={{
        transform: shown ? 'translate3d(0,0,0)' : 'translate3d(0,100%,0)',
        transition: 'transform 260ms cubic-bezier(0.2,0,0,1)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
      aria-hidden={!shown}
    >
      <div className="border-t-[4px] border-glow bg-ink px-4 pb-3 pt-3">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="t-micro text-paper">${TOKEN.ticker}</p>
            <p className="t-micro truncate text-glow">Pre-launch</p>
          </div>
          <Action
            href={LINKS.x}
            lockedLabel="Soon"
            className="shrink-0 !min-h-[48px] !px-5 !text-[12px]"
          >
            Follow on X
          </Action>
        </div>
      </div>
    </div>
  )
}
