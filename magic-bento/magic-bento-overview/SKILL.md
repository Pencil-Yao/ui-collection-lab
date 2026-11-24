---
name: magic-bento-overview
description: The "Overview" card visual for MagicBento — an animated bar chart with a headline figure and a highlighted peak bar. Use for a dashboard / revenue / weekly-summary card inside a bento or feature grid. Triggers include "bar chart card", "dashboard card", "overview card", "revenue card", "柱状图卡片". Composes inside magic-bento; ships its own JSX + CSS.
metadata:
  version: "0.1.0"
  date: "2026-11-24"
  parent: magic-bento
  visual-key: dashboard
---

# magic-bento-overview

Card visual: a compact bar chart with a figure header and an emphasized peak bar. Rendered as the `dashboard` visual of MagicBento.

- Source: `src/OverviewVisual.jsx` + `src/OverviewVisual.css`
- Visual key: `dashboard`
- Dependencies: `react` only (no icon package)

## Use it

```jsx
<MagicBento
  items={[{ label: 'Overview', title: 'Dashboard', description: 'Centralized data view', visual: 'dashboard' }]}
/>
```

or:

```jsx
import OverviewVisual from '../magic-bento-overview/src/OverviewVisual';

<MagicBento items={[{ title: 'Dashboard', description: 'Centralized view', visual: <OverviewVisual /> }]} />
```

Requires the shell CSS (`magic-bento/src/MagicBento.css`) for the `--mb-*` variables and `.magic-bento__visual` container.

## Markup

```
.magic-bento__bars
  .magic-bento__figure
    .magic-bento__figure-value
    .magic-bento__figure-note
  .magic-bento__bars-plot
    .magic-bento__bar          × N  (style="--h: <0..1>; --i: <index>")
      [data-peak]              ← the tallest bar
```

## Behavior

- Bars grow on intro via `magic-bento-grow` (staggered with `--i`), gated by the shell's `data-motion` / cell `data-state="in"`.
- The tallest bar (`Math.max(BARS)`) gets `data-peak` and the solid accent color; the rest are translucent.
- Hover brightens bars (`@media (hover: hover)`).
- Pixel height comes from `--h` (0–1) on each bar; bar colors use `--mb-accent-rgb`.

## Customize

- Values: edit the `BARS` array (0–100) in `OverviewVisual.jsx`.
- Headline + note: the `<span>` text (`$48.2k`, `Weekly`).
- Color: inherited from MagicBento's `glowColor` / theme.
