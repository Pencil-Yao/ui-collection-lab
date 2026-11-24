---
name: icon-cloud
description: A rotating 3D sphere of icon tiles — icons (SVG/React nodes) or images float on a Fibonacci-distributed sphere, projected with perspective and sorted by depth, auto-rotating and draggable with inertia. Black-gray theme by default, zero runtime dependencies. Based on Magic UI's Icon Cloud (MIT). Use when the user wants an animated icon cloud, 3D tag/logo sphere, "tech stack" cloud, or a floating brand-logo ball for a hero or feature section. Triggers include "icon cloud", "3D icon sphere", "logo cloud", "tech stack sphere", "floating icons", "图标云", "3D 图标球", "标签云".
metadata:
  version: "0.1.0"
  date: "2026-11-24"
  upstream: "Magic UI — Icon Cloud (MIT)"
  theme: "black-gray"
---

# icon-cloud

Icons are scattered evenly over a unit sphere (Fibonacci lattice), rotated in 3D every frame, then perspective-projected to 2D. Each tile is billboarded to the camera, so glyphs stay readable while scale/opacity/depth-sort create the illusion of a solid ball. Defaults are tuned for a **black-gray** theme on a dark surface.

- Source: `src/IconCloud.jsx` + `src/IconCloud.css`
- Dependencies: **none** beyond React (uses DOM + CSS transforms + `requestAnimationFrame`)
- Client component (`'use client'`). Concept from Magic UI (MIT). See `LICENSE.md`.

## Usage

Give it a **positioned square** parent (it fills `100% × 100%`):

```jsx
import { IconCloud } from './magicui/icon-cloud/src/IconCloud';

<div style={{ position: 'relative', width: 320, height: 320 }}>
  <IconCloud icons={[<ReactLogo />, <TsLogo />, <NodeLogo />]} />
</div>
```

### With images

```jsx
<IconCloud
  images={[
    'https://example.com/react.png',
    'https://example.com/node.png',
    'https://example.com/postgres.png'
  ]}
/>
```

Images are drawn in a circular crop (`object-fit: cover`). Icons (`icons`) and images (`images`) may be combined.

### With brand icons (Simple Icons)

Any monochrome SVG works — pass it with `fill="currentColor"` so it inherits the theme color:

```jsx
import { siReact, siTypescript } from 'simple-icons';

const svg = icon => (
  <svg viewBox="0 0 24 24" role="img" aria-label={icon.title}>
    <path d={icon.path} fill="currentColor" />
  </svg>
);

<IconCloud icons={[svg(siReact), svg(siTypescript)]} />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icons` | `ReactNode[]` | `[]` | Icon elements (SVG, `<img>`, etc.). Inherit color via `currentColor`. |
| `images` | `string[]` | `[]` | Image URLs, rendered as circular thumbnails. |
| `iconSize` | `number` | auto | Tile size in px. When omitted it is derived from the container (`~10%` of the short side, clamped 22–46px). |
| `speed` | `number` | `1` | Auto-rotation multiplier. `0` freezes auto-spin (drag still works). |
| `color` | `string` | `'#d4d4d8'` | Icon color (`--icon-cloud-color`). Set via CSS variable too. |
| `ariaLabel` | `string` | `'Icon cloud'` | Accessible name on the `role="img"` root. |
| `className` | `string` | `''` | Extra classes on the root. |
| `style` | `object` | — | Inline styles on the root (e.g. `--icon-cloud-color`). |

Any other props are spread onto the root `div`.

## Behavior

- **Distribution**: `spherePoints(n)` spreads `n` points over a unit sphere with the Fibonacci/golden-angle lattice, so spacing is even for any count.
- **Animation**: a single `requestAnimationFrame` loop yaws the sphere (`~0.5 rad/s × speed`), applies a fixed forward tilt, and eases pitch back to the resting tilt after a drag. Horizontal momentum (`velY`) persists on release and relaxes back to the auto-spin rate, so dragging feels inertial.
- **Projection**: each point is rotated (yaw → pitch), perspective-divided (`FOCAL / (FOCAL − z)`), and rendered as `translate3d(...) scale(...)`. Scale grows toward the viewer; opacity ramps `0.28 → 1` from back to front; `z-index` is derived from depth so front tiles overlap back tiles.
- **Billboarding**: each tile is positioned by its own transform, so it always faces the camera and stays crisp (vector SVG, not rasterized).
- **Responsive**: a `ResizeObserver` recomputes the sphere radius and tile size when the container changes.
- **Accessibility**: honors `prefers-reduced-motion` (auto-spin off by default, drag still available); root is `role="img"` with `aria-label`.

## Black-gray theme

Default icons render in light gray (`#d4d4d8`) with a soft drop shadow on a near-black surface, reading as floating metallic glyphs. Override per instance:

```jsx
<IconCloud icons={logos} color="#a1a1aa" speed={0.6} />
```

## Notes

- Needs a square, positioned parent — the component is `width/height: 100%`. A non-square parent still works but the ball is centered in the short side.
- `touch-action: none` is set on the root so vertical drags rotate the sphere instead of scrolling the page; keep the cloud small on touch layouts.
- Pure DOM/CSS: works in any modern browser, no WebGL required.

## License & credits

Inspired by Magic UI — Icon Cloud (MIT). This implementation is an independent, dependency-free rewrite (JS, plain CSS, black-gray defaults, drag inertia, reduced-motion support). See `LICENSE.md` for the full MIT notice. Demo logos: [Simple Icons](https://simpleicons.org) (CC0-1.0).
