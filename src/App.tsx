import { Facts } from './components/Facts'
import { Faq } from './components/Faq'
import { Flow } from './components/Flow'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { HowToBuy } from './components/HowToBuy'
import { Risk } from './components/Risk'
import { StickyCta } from './components/StickyCta'
import { Thesis } from './components/Thesis'

export default function App() {
  return (
    <>
      <a
        href="#mechanic"
        className="btn btn--primary sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60]"
      >
        Skip to content
      </a>

      <Hero />
      <main>
        <Thesis />
        <Flow />
        <Facts />
        <HowToBuy />
        <Faq />
        <Risk />
      </main>
      <Footer />
      <StickyCta />
    </>
  )
}
