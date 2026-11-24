---
name: globe
description: An autorotating, draggable WebGL globe (powered by cobe) with configurable markers, base/glow/marker colors. Black-gray theme by default. Based on Magic UI's Globe (MIT). Use when the user wants a 3D globe / world map / rotating earth / location markers visual for a hero or feature section. Triggers include "globe", "3D globe", "rotating earth", "world map", "location globe", "地球", "3D 地球", "世界地图".
metadata:
  version: "0.1.0"
  date: "2026-11-24"
  upstream: "Magic UI — Globe (MIT)"
  theme: "black-gray"
---

# globe

An interactive WebGL globe that auto-rotates and can be dragged to spin. Renders on a `<canvas>` via [cobe](https://github.com/shuding/cobe) with spring-smoothed dragging (motion). Defaults are tuned for a **black-gray** theme on a dark surface.

- Source: `src/Globe.jsx` + `src/Globe.css`
- Dependencies: `cobe` (`^0.6.4`), `motion` — `npm i cobe motion`
- Client component (`'use client'`). Ported from Magic UI (MIT). See `LICENSE.md`.

## Usage

The component is absolutely positioned (`inset: 0`) and fills a square wrapper — give it a **positioned, square** parent:

```jsx
import { Globe } from './magicui/globe/src/Globe';

<div style={{ position: 'relative', width: 260, height: 260 }}>
  <Globe />
</div>
```

Custom config (markers, colors, rotation):

```jsx
<Globe
  config={{
    ...GLOBE_CONFIG,          // exported for spreading
    markers: [
      { location: [40.7128, -74.006], size: 0.1 },
      { location: [51.5074, -0.1278], size: 0.08 }
    ],
    markerColor: [1, 1, 1]
  }}
/>
```

`GLOBE_CONFIG` is exported from the same module for easy overrides.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | `''` | Extra class names on the root wrapper. |
| `config` | `COBEOptions` | `GLOBE_CONFIG` | Full cobe config (see below). |
| `speed` | `number` | `1` | Auto-rotation multiplier. Rotation is time-based (`0.3 rad/s × speed`), so it is frame-rate independent; e.g. `speed={8}` spins ~8× faster. |

### Key `config` fields (cobe)

| Field | Default (this skill) | Description |
| --- | --- | --- |
| `dark` | `1` | Dark globe rendering. |
| `diffuse` | `0.4` | Surface diffuse lighting. |
| `mapSamples` | `16000` | Dot-map sampling density. |
| `mapBrightness` | `2.5` | Dot-map (terrain) brightness. |
| `mapBaseBrightness` | `0` | Minimum map-sample value. Must be a number — `undefined` becomes a NaN uniform and blanks the sphere. |
| `baseColor` | `[0.9, 0.9, 0.95]` | Land-dot / base color (RGB 0–1). Near-white here for bright terrain dots on a dark sphere. |
| `markerColor` | `[1, 1, 1]` | Marker dot color. |
| `glowColor` | `[0.3, 0.3, 0.33]` | Rim glow color. |
| `theta` | `0.3` | Tilt. |
| `phi` | `0` | Initial rotation. |
| `markers` | 10 cities | `{ location: [lat, lng], size }`. |
| `devicePixelRatio` | `2` | Render scale. |

The component computes `width`/`height` from the canvas size (`offsetWidth * 2`) on mount and resize, so the globe stays square/crisp.

## Black-gray theme

Defaults read as a dark gray globe with light gray markers and a faint gray rim on a near-black surface. Override per instance:

```jsx
<Globe config={{ ...GLOBE_CONFIG, baseColor: [0.2, 0.2, 0.22], glowColor: [0.45, 0.45, 0.5], markerColor: [1, 1, 1] }} />
```

## Behavior

- Auto-rotates (`phi += 0.005` per frame) unless the pointer is dragging.
- Drag: `onPointerDown` / `onMouseMove` / `onTouchMove` accumulate horizontal movement into a `motion` value with spring smoothing (`mass 1, damping 30, stiffness 100`), so it feels inertial.
- Fades in via a 500 ms opacity transition once mounted.
- Cleans up (`globe.destroy()`, resize listener, timeout) on unmount.

## Notes

- Requires WebGL. In environments without WebGL the canvas stays blank (no error thrown by this component).
- Provide an explicit square parent (e.g. `aspect-ratio: 1`) or the canvas will be non-square and the globe distorted.
- SSR-safe: the component is a client component and only touches WebGL inside `useEffect`.

## License & credits

Based on Magic UI — Globe (MIT). This version repacked (JS, plain CSS instead of Tailwind, black-gray default config, exported `GLOBE_CONFIG`). See `LICENSE.md` for the full MIT notice.
