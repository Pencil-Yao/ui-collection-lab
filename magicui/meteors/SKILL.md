---
name: meteors
description: A decorative meteor-shower effect — small light heads with fading tails streak diagonally across a container on randomized delays, durations and positions. Pure CSS animation, React only, black-gray palette, reduced-motion aware. Based on Magic UI's Meteors (MIT). Use for hero/background accents, "shooting star" / starfield / night-sky ambience, or a subtle motion layer behind content. Triggers include "meteors", "meteor shower", "shooting stars", "falling stars", "starfield", "流星", "流星雨".
metadata:
  version: "0.1.0"
  date: "2026-11-24"
  upstream: "Magic UI — Meteors (MIT)"
  theme: "black-gray"
---

# meteors

A layer of glowing meteor heads that trail a fading tail and streak diagonally across their container. Each meteor gets a random horizontal position, delay and duration, so the shower looks organic. The component renders an absolutely-positioned overlay that fills a **positioned parent** and clips itself with `overflow: hidden`.

- Source: `src/Meteors.jsx` + `src/Meteors.css`
- Dependencies: **none** beyond React (pure CSS keyframe animation)
- Client component (`'use client'`). Ported from Magic UI (MIT). See `LICENSE.md`.

## Usage

Place it inside any `position: relative` (positioned) container — it fills `inset: 0` and ignores pointer events:

```jsx
import { Meteors } from './magicui/meteors/src/Meteors';

<div style={{ position: 'relative', width: '100%', height: 320, overflow: 'hidden', background: '#0b0b0d' }}>
  <Meteors number={28} />
  {/* content on top */}
</div>
```

The overlay sits above earlier siblings; put your content after it (or give the content a higher `z-index`) so it stays clickable.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `number` | `number` | `20` | How many meteors to render. |
| `minDelay` | `number` | `0.2` | Minimum start delay, seconds (random per meteor). |
| `maxDelay` | `number` | `1.2` | Maximum start delay, seconds. |
| `minDuration` | `number` | `2` | Minimum travel time, seconds. |
| `maxDuration` | `number` | `10` | Maximum travel time, seconds. |
| `angle` | `number` | `240` | Streak rotation in degrees. Larger values fall more steeply/vertically; the default is a fairly upright downward-right fall. |
| `className` | `string` | `''` | Extra classes on the overlay root. |

## Black-gray theme

Default heads are light gray (`#d4d4d8`) with a faint white ring and a `#71717a → transparent` tail — floating sparks on a near-black surface. Tune per instance:

```jsx
<Meteors number={40} maxDuration={6} angle={250} />
```

## How it works

- On mount (`useEffect`) it builds one style object per meteor with a random `left` (`-25–100%`, so some start just off the left edge and fall into view — the left side gets streaks too), `top: -5%`, `animationDelay`, `animationDuration`, and a `--angle` custom property. Styles are generated client-side to avoid SSR/hydration mismatches, so the first paint has no meteors (they appear on the next tick).
- Each `.meteors__item` is a 2px rounded head animated by `meteors-fall`: it rotates by `--angle` and translates along the rotated axis (a more upright down-right fall at the default `240°`) while fading `1 → 0` after 70% of the run, then loops. The tail always trails behind the head.
- The travel distance is **scaled to the container** (a `--meteor-distance` custom property set from a `ResizeObserver`, derived from height and `angle`), so meteors cross the full height — reaching the middle and bottom of large/1080p frames instead of stopping after a fixed pixel distance.
- The `.meteors__tail` is a 60px, 1px, right-fading gradient child (behind the head) that rotates with it, reading as a trailing streak.
- The root `.meteors` is `position: absolute; inset: 0; overflow: hidden; pointer-events: none`, so it clips near the container edges and never blocks interaction.

## Accessibility

- The overlay is `aria-hidden="true"` (purely decorative).
- Honors `prefers-reduced-motion`: meteors are hidden (no animation).

## Notes

- Requires a positioned parent; with `overflow: hidden` on that parent the streaks clip cleanly at the edges (the component also clips its own overlay).
- Random placement means the shower differs each mount — expected for an ambient effect.
- No WebGL, no extra packages; works anywhere CSS animations run.

## License & credits

Based on Magic UI — Meteors (MIT). This version repackaged (JS, plain CSS, self-clipping overlay, percentage placement, black-gray defaults, reduced-motion support). See `LICENSE.md` for the full MIT notice.
