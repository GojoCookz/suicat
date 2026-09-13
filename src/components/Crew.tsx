import { Reveal } from './ui/Reveal'

type Member = { name: string; role: string; line: string; tone: string }

/**
 * The three characters in the artwork. Personality copy only — nothing here
 * claims a team, a partnership or a person.
 */
const CREW: Member[] = [
  {
    name: 'The Hippo',
    role: 'Eats first',
    line: 'Big coat, bigger appetite. Shows up for every bowl and never sells the noodles.',
    tone: 'sticker--cream',
  },
  {
    name: 'The Dog',
    role: 'Runs the kitchen',
    line: 'Cap, shades, gold chain. Has never explained where the recipe came from.',
    tone: 'sticker--sui',
  },
  {
    name: 'The Cat',
    role: 'Holds the chopsticks',
    line: 'The one on the front of SUICAT. Permanently unsure what Sui is. Gets paid anyway.',
    tone: 'sticker--chili',
  },
]

export function Crew() {
  return (
    <section id="crew" className="bg-cream py-14 md:py-20">
      <div className="shell">
        <Reveal>
          <p className="t-label text-chili">The crew</p>
          <h2
            className="t-display mt-2 text-wok"
            style={{ fontSize: 'clamp(2.25rem, 7vw, 4rem)' }}
          >
            Three at the table
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-6 md:mt-10 md:grid-cols-3">
          {CREW.map((m, i) => (
            <Reveal key={m.name} delay={60 + i * 60}>
              <article className={`sticker ${m.tone} h-full p-6`}>
                <p className="t-label opacity-80">{m.role}</p>
                <h3 className="t-display mt-2 text-[30px] leading-none">{m.name}</h3>
                <p className="t-body mt-3 text-[15px]">{m.line}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
