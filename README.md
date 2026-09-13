# ChopSui Crew

Live site for the **ChopSui crew** — a set of Solana meme tokens that pay their
holders, launched through [RevShare](https://revshare.dev).

```
SUICAT V1  ──pays──>  SUICAT V2  ──pays──>  SOL
```

$CHOPSUI is the crew's flagship token. Sui itself is not involved in anything
here: no bridge, no wrapped asset, no second chain. The name is a joke about a
dish.

## The three tokens

| Label | Ticker | Mint | Pays holders |
| --- | --- | --- | --- |
| ChopSui! | `CHOPSUI` | `sUiYveS2o7BfvkDWcdcMwUKPDqkxoBJnuwZVeeh3shq` | not confirmed |
| SUICAT V1 | `SUICAT` | `hFyV6R6Gok9qr6rmY5J6EwgnJ5iBbbWRNVVTw7fGREV` | SUICAT V2 |
| SUICAT V2 | `SUICAT` | `DWKWx7vpgpHUYuWgkrZc11eEgMgy5iLzfCefhmjXbREV` | SOL |

> **Read this before editing `src/config/tokens.ts`.**
> Both SuiCat mints report the **same on-chain name, "SuiCat"**. The only thing
> that distinguishes them is the full address and what each one pays. That is
> why the V1/V2 labels exist and why the Contracts section never truncates an
> address. If you change a mint, re-verify it against DexScreener first and
> re-check which one pays what. Getting this wrong costs somebody money.

## No fake data — how it is enforced

No market number is ever written into the source. Everything comes from the
DexScreener public API at runtime via `src/lib/dexscreener.ts` and
`src/hooks/useMarkets.ts`.

- **Loading** renders an obvious skeleton bar, never a plausible placeholder number.
- **Missing** renders `—`. You can see this live: SUICAT V2 trades on a Meteora
  DBC pool that reports no liquidity, so its Liquidity cell is blank by design.
- **Failed fetch** keeps the last good numbers on screen but flips the status chip
  to "Live data unavailable", stops advancing the timestamp, and shows an error
  panel. It never silently presents stale figures as live.
- **Unconfirmed facts** render a "Not confirmed" chip. $CHOPSUI's payout is not
  verified, so the board says so instead of guessing.
- **Null links** render a disabled control labelled "Soon" — never a dead button.

Prices refresh every 45 seconds, pause when the tab is hidden, and refetch on
return. The deepest pool by liquidity is used for each mint.

## Design system

Palette sampled from the crew artwork (`public/crew.png`):

| Token | Hex | Use |
| --- | --- | --- |
| `wok` | `#0B0B0B` | outlines, dark sections |
| `amber` | `#F0A020` | primary ground |
| `ember` | `#E07B10` | secondary warm |
| `chili` | `#D92B1F` | primary CTA, warnings |
| `sui` | `#30B0F0` | accent, flagship card |
| `deep` | `#0A5E96` | positive values |
| `cream` | `#F7EEDA` | alternate ground |
| `paper` | `#FFFFFF` | cards |

Cartoon sticker language: 3px black outlines, hard offset shadows with zero
blur, generous radii, buttons that press flat into the page on `:active`.

**Contrast was measured, not eyeballed.** The safe pairings are documented at the
top of `src/index.css`. Two traps worth repeating:

- `sui` on `amber` is **1.02:1** — effectively invisible. Only ever use it as a
  filled shape with a black outline, never as text.
- `deep` on `sui` is **2.81:1**, which is why 24h change renders as a filled badge
  with white text rather than colored text — the cards sit on white, cream *and*
  sui-blue backgrounds.

Type: Luckiest Guy (display), Nunito (body), JetBrains Mono (every number and
address). All self-hosted via Fontsource.

## Motion

Transform and opacity only. Reveals play once and settle. `prefers-reduced-motion`
is honored throughout.

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # -> dist/
pnpm preview
```

## Legal posture

`src/components/Risk.tsx` is deliberately prominent, not a footnote. It states
that these are meme tokens conferring no equity or claim, that payouts are a
RevShare mechanism rather than a promise, that **liquidity here is thin enough
that you may not be able to sell near the quoted price**, that the two mints
share a name, and that there is no affiliation with the Sui network. Keep it
that way.
