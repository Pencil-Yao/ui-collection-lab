---
name: magic-bento-insights
description: The "Insights" card visual for MagicBento — an animated analytics line chart that draws itself in and lets the pointer scrub a value/dot along the curve. Use for an analytics / traffic / metrics card inside a bento or feature grid. Triggers include "analytics card", "line chart card", "insights card", "scrubbable chart", "数据折线卡片". Composes inside magic-bento; ships its own JSX + CSS.
metadata:
  version: "0.1.0"
  date: "2026-11-24"
  parent: magic-bento
  visual-key: analytics
---

# magic-bento-insights

Card visual: a compact analytics line chart (value + delta, SVG area/line, pointer scrub). Rendered as the `analytics` visual of MagicBento.

- Source: `src/InsightsVisual.jsx` + `src/InsightsVisual.css`
- Visual key: `analytics`
- Dependencies: `react` only (no icon package)
- Self-contained: embeds its own Bezier `curve`/`sampleAt` math, `CHART` data and resize handling.

## Use it

Inside MagicBento, either by key:

```jsx
<MagicBento
  items={[{ label: 'Insights', title: 'Analytics', description: 'Track user behavior', visual: 'analytics' }]}
/>
```

or by component:

```jsx
import InsightsVisual from '../magic-bento-insights/src/InsightsVisual';

<MagicBento items={[{ title: 'Analytics', description: 'Track behavior', visual: <InsightsVisual /> }]} />
```

Make sure the shell CSS (`magic-bento/src/MagicBento.css`) is loaded so the `--mb-*` variables and `.magic-bento__visual` container exist. To theme it, set `glowColor` on MagicBento — the chart line/area/dot use `--mb-accent-rgb`.

## Markup

```
.magic-bento__chart            ← root; handles pointer scrub
  .magic-bento__figure
    .magic-bento__figure-value
    .magic-bento__figure-note
  .magic-bento__plot
    svg
      path.magic-bento__chart-area
      path.magic-bento__chart-line
    .magic-bento__scrub
      .magic-bento__scrub-dot
```

## Behavior

- `ResizeObserver` measures `.magic-bento__plot` and recomputes the SVG path.
- `onPointerMove` / `onPointerDown` scrub the line + dot and update the value (e.g. `12.4k`) and month label; `onPointerLeave` resets to the last value and `+18%`.
- Data lives in the `CHART` array — replace it with your own series.
- Intro animation: line draws (`magic-bento-draw`), area fades (`magic-bento-fade`), gated by the shell's `data-motion` / cell `data-state="in"`.

## Customize

- Change series: edit `CHART` in `InsightsVisual.jsx`.
- Change label format: the `scrub` and `rest` handlers (k suffix, `Oct N`, `+18%`).
- Color: inherited from MagicBento's `glowColor` / theme.
- Accessibility: SVG is `aria-hidden`; the scrub is decorative.
