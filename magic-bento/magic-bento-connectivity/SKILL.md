---
name: magic-bento-connectivity
description: The "Connectivity" card visual for MagicBento — an animated integration hub (Slack, GitHub, Figma, Notion nodes linked to a center sparkle) with data packets traveling inward. Use for an integrations / ecosystem / connected-tools card inside a bento or feature grid. Triggers include "integrations card", "connectivity card", "app hub card", "connected tools card", "集成卡片". Composes inside magic-bento; ships its own JSX + CSS.
metadata:
  version: "0.1.0"
  date: "2026-11-24"
  parent: magic-bento
  visual-key: integration
---

# magic-bento-connectivity

Card visual: four app nodes (Slack, GitHub, Figma, Notion) connected by lines to a central sparkle node, with packets animating inward while the card is active. Rendered as the `integration` visual of MagicBento.

- Source: `src/ConnectivityVisual.jsx` + `src/ConnectivityVisual.css`
- Visual key: `integration`
- Dependencies: `@hugeicons/react`, `@hugeicons/core-free-icons` (SlackIcon, GithubIcon, FigmaIcon, NotionIcon, SparklesIcon)

## Use it

```jsx
<MagicBento
  items={[{ label: 'Connectivity', title: 'Integration', description: 'Connect favorite tools', visual: 'integration' }]}
/>
```

or:

```jsx
import ConnectivityVisual from '../magic-bento-connectivity/src/ConnectivityVisual';

<MagicBento items={[{ title: 'Integration', description: 'Connect favorite tools', visual: <ConnectivityVisual /> }]} />
```

Requires the shell CSS for `--mb-*` variables, `.magic-bento__tile`, and the `.magic-bento__visual` **size container** (the `@container` rule collapses the hub in short cards).

## Markup

```
.magic-bento__hub
  svg.magic-bento__hub-links        ← 4 lines to center (50,51)
  .magic-bento__packet (--x --y --i) × 4
  .magic-bento__hub-node.magic-bento__tile (--x --y --s --i) × 4  ← app icons
  .magic-bento__hub-node.magic-bento__tile (--x 50% --y 51% --s 34px) ← sparkle
```

## Behavior

- Nodes pop in (`magic-bento-pop`) staggered by `--i`; connecting lines draw (`magic-bento-draw`).
- While the card is `data-active` (hovered), packets loop inward via `magic-bento-packet` (staggered `--i × 0.45s`).
- `@container (max-height: 60px)` hides the hub when the card is too short.
- Gated by the shell's `data-motion` / cell `data-state="in"` and disabled under reduced motion.

## Customize

- Apps + positions: edit the `APPS` array (`{ icon, x, y }`) in `ConnectivityVisual.jsx`; add/remove nodes and their `<line>`s together.
- Center glyph: the `SparklesIcon` node.
- Color: accent (`--mb-accent-rgb`) from MagicBento's `glowColor` / theme.
