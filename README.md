# SUICAT

Landing page for **$SUICAT** — a Solana meme token launching through
[RevShare](https://revshare.dev), where a fee tax on every trade is paid back
out to holders in SOL.

The joke is the name. Sui is not part of the mechanic: there is no bridge, no
wrapped asset, and no second chain anywhere in the product. Solana in, Solana
out. The cat has questions.

**Status: pre-launch.** No mint, no pool, nothing to buy.

---

## The one rule for this repo

Every fact rendered on the site comes from `src/config/token.ts`. Nothing else
hardcodes a number.

Anything not yet decided is `null` there, and the UI renders it as an explicit
`SET AT LAUNCH` chip instead of a plausible-looking made-up value. When the token
launches, fill in that file and the whole page updates — the facts table, the
mechanic cards, the FAQ and the buy steps all read from it.

Do not "finish" the page by inventing a supply, a fee percentage or a launch
date. A visible placeholder is the feature.

```ts
// src/config/token.ts
mintAddress: null,   // -> renders "SET AT LAUNCH", buy step 3 stays Locked
feePercent: null,    // RevShare offers 1 | 3 | 6 | 10
```

Links behave the same way. A `null` entry in `LINKS` renders a disabled control
labelled `SOON`, never a button that goes nowhere.

## Mechanic, and where it is sourced from

Verified against RevShare's own launch documentation
([guide](https://revshare.dev/articles/how-to-create-a-solana-token-with-a-custom-quote-token-using-revshare)):

- Solana token created through the RevShare launchpad
- **Fee Tax** configurable at 1%, 3%, 6% or 10% of eligible transfers
- **Fees mode** — Shareholders or Apps Mode
- **Fees paid in** supports SOL, so holder payouts settle in SOL
- Payouts are pushed pro-rata; there is nothing to stake or claim

## Design system

Four colors. That is the entire palette, sampled by pixel-reading the source
artwork in `public/cat.png`:

| Token     | Hex       | Use                          |
| --------- | --------- | ---------------------------- |
| `ink`     | `#000C40` | ground                       |
| `sea`     | `#187A9F` | borders, placeholder chips   |
| `glow`    | `#5DD8E0` | accent, headlines, CTAs      |
| `paper`   | `#FFFFFF` | body text, frames            |

Rules that follow from that, all enforced in `src/index.css`:

- **No gradients and no alpha tints.** A tone between two colors is *dithered*,
  the way indexed-color pixel art actually does it (`.dither-25`, `.dither-50`,
  and the `<Ramp>` component which stacks bands of decreasing density).
- **No border radius.** Corners are square with hard 4px borders. The stepped
  staircase corner (`.px-step`) is traced from the artwork's own corners and is
  used on exactly one element — the hero portrait — because `clip-path`
  anti-aliases and a small staircase reads as a blob rather than a pixel.
- **Everything snaps to `--u` (4px).** Borders, gaps, corner steps, motion.
- `sea` is never used for small text on `ink` — that pairing measures 3.84:1 and
  fails WCAG AA. Placeholder values use paper-on-sea (4.86:1) instead.

Type is Archivo Variable (`wdth` 125 / `wght` 900) for display, Silkscreen for
pixel microtype. The scale runs ~16x from 10px microtype to the hero display.

## Motion

Transform and opacity only. Entry reveals play once and settle — no scroll-linked
animation, no count-ups. `prefers-reduced-motion` is honored throughout.

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # -> dist/
pnpm preview
```

## Legal posture

`src/components/Risk.tsx` carries the warning label and it is deliberately
prominent, not a footnote. It states plainly that the token confers no equity,
ownership, dividends or claim on anyone, that payouts are a mechanism rather
than a promise, and that the name implies no affiliation with Sui. Keep it that
way.
