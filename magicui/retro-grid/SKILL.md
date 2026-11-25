---
name: retro-grid
description: A retro perspective grid background — a tilted infinite plane of lines scrolling toward the viewer, covering the whole frame edge-to-edge, with optional centered text. Rendered with WebGL2 (anti-aliased, no shimmer) and no extra deps. Black-gray theme, configurable angle/cell size/opacity/speed. Based on Magic UI's Retro Grid (MIT). Use for synthwave/hero backgrounds, 80s grid floors, or a perspective texture behind content. Triggers include "retro grid", "synthwave grid", "perspective grid", "80s grid", "网格背景", "赛博网格".
metadata:
  version: "0.2.0"
  date: "2026-11-24"
  upstream: "Magic UI — Retro Grid (MIT)"
  theme: "black-gray"
---

# retro-grid

A retro perspective grid drawn with a WebGL2 fragment shader: each pixel is inverse-projected onto a tilted plane, grid lines are anti-aliased via `fwidth`, and the plane scrolls toward the viewer. It fills the whole frame edge-to-edge (the vanishing point sits above the top), with only a thin fade at the extreme top/near edge.

- Source: `src/RetroGrid.jsx` + `src/RetroGrid.css`
- Dependencies: **none** beyond React (uses the browser's WebGL2)
- Client component (`'use client'`). Based on Magic UI (MIT). See `LICENSE.md`.

> Why WebGL: thin CSS/2D lines that translate each frame snap between pixels and shimmer; and a simple floor projection leaves empty sky in the top corners. A per-pixel plane grid gives smooth anti-aliased lines **and** full-frame coverage. Requires WebGL2 (like the Globe component).

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
| `cellSize` | `number` | `90` | Grid cell size in px (plane units). Bigger = fewer/wider lines. |
| `opacity` | `number` | `0.7` | Grid line opacity (0–1). |
| `lineColor` | `string` | `rgba(255,255,255,0.6)` | Line color (hex or rgb/rgba). |
| `speed` | `number` | `0.12` | Scroll speed (cycles/second). |
| `children` | `ReactNode` | — | Optional foreground content centered above the grid. |
| `className` | `string` | `''` | Extra classes on the root. |
| `style` | `object` | — | Inline styles on the root. |

## How it works

- A full-screen triangle pair is shaded. For each fragment, the screen point is run through the inverse of a tilted-plane homography (`u`, `v` plane coordinates), then a grid pattern is evaluated at `(u, v) / cellSize` with `u_scroll` added to `v` for the scroll.
- Line distance is divided by `fwidth(g)` so lines are ~1px wide and anti-aliased at every distance — no popping/shimmer as they move.
- Parameters place the plane's vanishing point above the top of the canvas, so the grid covers the full frame (including the top corners), not just a lower floor.
- A thin `smoothstep` fade only at the extreme top (far) and near edge blends it into the surrounding surface.
- `requestAnimationFrame` advances the phase; `prefers-reduced-motion` draws a static frame. `children` render in a centered DOM overlay above the canvas.

## License & credits

Based on Magic UI — Retro Grid (MIT). This version is a WebGL2 reimplementation (no WebGL1 extensions, no Tailwind) with full-frame coverage, black-gray defaults, and optional text overlay. See `LICENSE.md`.
