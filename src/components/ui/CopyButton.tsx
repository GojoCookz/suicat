import { useCallback, useEffect, useRef, useState } from 'react'

type CopyButtonProps = {
  value: string
  /** Accessible label, e.g. "Copy SUICAT V1 contract address". */
  label: string
  className?: string
}

type State = 'idle' | 'copied' | 'failed'

/**
 * Real clipboard write with a real fallback.
 *
 * navigator.clipboard only exists in a secure context, so this falls back to a
 * hidden textarea + execCommand. If BOTH fail the button says so rather than
 * pretending it worked — a contract address silently not copying is the kind of
 * thing that costs somebody money.
 */
export function CopyButton({ value, label, className = '' }: CopyButtonProps) {
  const [state, setState] = useState<State>('idle')
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = useCallback(async () => {
    const flash = (next: State) => {
      setState(next)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setState('idle'), 1800)
    }

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value)
        flash('copied')
        return
      }
      throw new Error('clipboard unavailable')
    } catch {
      try {
        const ta = document.createElement('textarea')
        ta.value = value
        ta.setAttribute('readonly', '')
        ta.style.position = 'fixed'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        const ok = document.execCommand('copy')
        document.body.removeChild(ta)
        flash(ok ? 'copied' : 'failed')
      } catch {
        flash('failed')
      }
    }
  }, [value])

  return (
    <button
      type="button"
      onClick={copy}
      className={`btn btn--sm ${state === 'copied' ? 'btn--sui' : 'btn--ghost'} ${className}`}
      aria-label={label}
      data-state={state}
    >
      {state === 'copied' ? 'Copied!' : state === 'failed' ? 'Copy failed' : 'Copy'}
    </button>
  )
}
