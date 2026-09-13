import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchMarkets, type Market } from '../lib/dexscreener'

export type MarketsState = {
  data: Record<string, Market>
  /** Mints whose fetch failed on the last attempt. */
  failed: string[]
  status: 'loading' | 'ready' | 'error'
  /** When the last successful refresh landed. */
  updatedAt: Date | null
  refresh: () => void
  isRefreshing: boolean
}

const REFRESH_MS = 45_000

/**
 * Polls DexScreener for the given mints.
 *
 * Deliberate behaviour: on a failed refresh we KEEP the last good numbers on
 * screen but flip `status` to 'error' and stop advancing `updatedAt`, so the UI
 * can say the data is stale instead of silently showing old figures as live.
 */
export function useMarkets(mints: string[]): MarketsState {
  const [data, setData] = useState<Record<string, Market>>({})
  const [failed, setFailed] = useState<string[]>([])
  const [status, setStatus] = useState<MarketsState['status']>('loading')
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const key = mints.join(',')
  const abortRef = useRef<AbortController | null>(null)

  const load = useCallback(async () => {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller
    setIsRefreshing(true)

    try {
      const { map, failed: bad } = await fetchMarkets(key.split(','), controller.signal)

      if (controller.signal.aborted) return

      setData((prev) => ({ ...prev, ...map }))
      setFailed(bad)

      const gotNothing = Object.keys(map).length === 0
      setStatus(gotNothing ? 'error' : 'ready')
      if (!gotNothing) setUpdatedAt(new Date())
    } catch {
      if (!controller.signal.aborted) setStatus('error')
    } finally {
      if (!controller.signal.aborted) setIsRefreshing(false)
    }
  }, [key])

  useEffect(() => {
    void load()
    const id = window.setInterval(() => void load(), REFRESH_MS)

    // Don't poll a tab nobody is looking at; refresh the moment they come back.
    const onVisible = () => {
      if (document.visibilityState === 'visible') void load()
    }
    document.addEventListener('visibilitychange', onVisible)

    return () => {
      window.clearInterval(id)
      document.removeEventListener('visibilitychange', onVisible)
      abortRef.current?.abort()
    }
  }, [load])

  return { data, failed, status, updatedAt, refresh: () => void load(), isRefreshing }
}
