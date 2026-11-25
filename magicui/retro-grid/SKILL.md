---
name: retro-grid
description: A retro perspective grid background — a tilted floor of lines scrolling from the far horizon toward the viewer (far→near), fading into the horizon and near edge, with optional centered text. Rendered on a 2D <canvas> with anti-aliasing (no WebGL needed) so lines don't shimmer. Black-gray theme; `cellSize` controls the longitudinal (depth-line) spacing. Based on Magic UI's Retro Grid (MIT). Use for synthwave/hero backgrounds, 80s grid floors, or a perspective texture behind content. Triggers include "retro grid", "synthwave grid", "perspective grid", "80s grid", "网格背景", "赛博网格".
metadata:
  version: "0.3.0"
  date: "2026-11-24"
  upstream: "Magic UI — Retro Grid (MIT)"
  theme: "black-gray"
---

# retro-grid

A retro perspective floor drawn on a 2D `<canvas>` (anti-aliased): depth lines converge on a vanishing point near the top, cross lines scroll **from the far horizon toward the viewer** (down), and the grid fades into the horizon and near edge. Defaults are tuned for a **black-gray** theme.

- Source: `src/RetroGrid.jsx` + `src/RetroGrid.css`
- Dependencies: **none** beyond React (2D canvas)
- Client component (`'use client'`). Based on Magic UI (MIT). See `LICENSE.md`.

> Rendering note: thin CSS/background lines translated each frame snap between pixels and shimmer; redrawing anti-aliased lines on a canvas each frame removes that.

## Usage

Absolutely positioned (`inset: 0`) — give it a **positioned** parent:

```jsx
import { RetroGrid } from './magicui/retro-grid/src/RetroGrid';

<div style={{ position: 'relative', height: 360, overflow: 'hidden', background: '#0a0a0b' }}>
  <RetroGrid>
    <span>Synthwave</span>
    <h2>Retro Grid</h2>
  </RetroGrid>
</div>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `angle` | `number` | `65` | Camera tilt, degrees (clamped 1–89). |
| `cellSize` | `number` | `100` | Longitudinal spacing of the depth lines (px at the near edge). **Bigger = wider spacing / fewer lines.** |
| `opacity` | `number` | `0.7` | Grid line opacity (0–1). |
| `lineColor` | `string` | `rgba(255,255,255,0.5)` | Grid line color (any CSS color). |
| `speed` | `number` | `0.18` | Scroll speed (cycles/second). |
| `children` | `ReactNode` | — | Optional foreground content centered above the grid. |
| `className` | `string` | `''` | Extra classes on the root. |
| `style` | `object` | — | Inline styles on the root. |

> Tuning the depth-line spacing: change `cellSize` only (e.g. `cellSize={120}` for wider spacing). The camera (`angle`), perspective, and far→near scroll direction stay the same.

## How it works

- `.retro-grid` fills a positioned parent; a `<canvas>` fills it.
- Each frame the 2D context is cleared and redrawn:
  - **Depth lines** (constant world x) are drawn from the near edge to a vanishing point near the top; their spacing at the near edge equals `cellSize`.
  - **Cross lines** (constant world z) are projected with `y = horizon + span / z` and scrolled by `phase` so they move down toward the viewer (far → near).
- Lines use fractional coordinates, so the browser anti-aliases them — smooth, no snapping/flicker.
- A `destination-out` gradient fades the dense far/horizon band and the very near edge into the parent background.
- `requestAnimationFrame` advances the phase; `prefers-reduced-motion` draws a static frame. `children` render in a centered DOM overlay above the canvas.

## License & credits

Based on Magic UI — Retro Grid (MIT). This version repackaged as a canvas-rendered perspective floor (no Tailwind), black-gray defaults, optional text overlay, and a shimmer-free anti-aliased render. See `LICENSE.md`.
