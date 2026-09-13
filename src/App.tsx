import { useMemo } from 'react'
import { Contracts } from './components/Contracts'
import { Crew } from './components/Crew'
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Ladder } from './components/Ladder'
import { LiveBoard } from './components/LiveBoard'
import { Risk } from './components/Risk'
import { TOKENS } from './config/tokens'
import { useMarkets } from './hooks/useMarkets'

export default function App() {
  const mints = useMemo(() => TOKENS.map((t) => t.mint), [])
  const markets = useMarkets(mints)

  return (
    <>
      <a
        href="#board"
        className="btn btn--primary sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
      >
        Skip to the board
      </a>

      <Hero markets={markets} />
      <main>
        <LiveBoard markets={markets} />
        <Ladder />
        <Contracts />
        <Crew />
        <Faq />
        <Risk />
      </main>
      <Footer />
    </>
  )
}
