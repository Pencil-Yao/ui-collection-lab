---
name: retro-grid
description: A retro perspective grid background that fills the whole frame — a tilted plane of lines scrolling from far to near, with optional centered text. Rendered with WebGL2 (anti-aliased, no shimmer) and no extra deps. The depth-line spacing scales with width so a small card and a 1080p render read the same. Black-gray theme; configurable angle/cell size/opacity/speed. Based on Magic UI's Retro Grid (MIT). Use for synthwave/hero backgrounds, 80s grid floors, or a perspective texture behind content. Triggers include "retro grid", "synthwave grid", "perspective grid", "80s grid", "网格背景", "赛博网格".
metadata:
  version: "0.4.0"
  date: "2026-11-24"
  upstream: "Magic UI — Retro Grid (MIT)"
  theme: "black-gray"
---

# retro-grid

A full-frame retro perspective grid rendered by a WebGL2 fragment shader: every pixel is inverse-projected onto a tilted plane, grid lines are anti-aliased with `fwidth`, and the plane scrolls **far → near** (lines move toward the viewer). The vanishing point sits just above the top, so the grid covers the frame edge-to-edge (including top corners), not just a lower floor.

- Source: `src/RetroGrid.jsx` + `src/RetroGrid.css`
- Dependencies: **none** beyond React (uses the browser's WebGL2)
- Client component (`'use client'`). Based on Magic UI (MIT). See `LICENSE.md`.

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
| `angle` | `number` | `65` | Plane tilt, degrees (clamped 1–89). |
| `cellSize` | `number` | `120` | Depth-line spacing at a **1920px-wide reference**; scaled to the actual width, so a ~300px card and a 1080p render show the same number of depth lines. Bigger = fewer/wider lines. |
| `opacity` | `number` | `0.7` | Grid line opacity (0–1). |
| `lineColor` | `string` | `rgba(255,255,255,0.55)` | Line color (hex or rgb/rgba). |
| `speed` | `number` | `0.12` | Scroll speed (cycles/second). |
| `children` | `ReactNode` | — | Optional foreground content centered above the grid. |
| `className` | `string` | `''` | Extra classes on the root. |
| `style` | `object` | — | Inline styles on the root. |

## Web (card) vs video (1080p)

`cellSize` is relative to width (`cellPx = cellSize · width / 1920`), so the same prop yields the same **count** of depth lines on a small lab card and on a full 1080p render (the pixel spacing just scales). Tune `cellSize` once; both stay in proportion.

## How it works

- A full-screen triangle pair is shaded. For each fragment, the screen point is run through the inverse of a tilted-plane homography (`u`, `v` plane coordinates), then a grid is evaluated at `(u, v − scroll) / cell`.
- `u_scroll` increases with time; subtracting it from `v` makes lines move **down / toward the viewer** (far → near).
- Line distance is divided by `fwidth(g)` so lines are ~1px and anti-aliased at every distance — no shimmer.
- Parameters place the vanishing point just above the top of the canvas, so the grid fills the frame corners.
- A thin `smoothstep` fade only at the extreme top/near edge blends it into the surface.
- `requestAnimationFrame` advances the phase; `prefers-reduced-motion` draws a static frame. `children` render in a centered DOM overlay above the canvas.

## License & credits

Based on Magic UI — Retro Grid (MIT). This version is a WebGL2 reimplementation (no Tailwind) with full-frame coverage, width-relative depth spacing (consistent for cards and 1080p), far→near scroll, black-gray defaults, and optional text overlay. See `LICENSE.md`.
