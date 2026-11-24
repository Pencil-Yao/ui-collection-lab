---
name: animated-circular-progress-bar
description: A dependency-light React circular progress gauge (SVG ring + center percentage) that animates its arc when the value changes, themed black-gray. Ships as self-contained JSX + plain CSS (no Tailwind, no clsx) based on Magic UI's Animated Circular Progress Bar. Use when the user wants a circular progress / radial gauge / ring chart / donut progress indicator / 圆形进度条. Triggers include "circular progress bar", "radial gauge", "ring progress", "donut progress", "circle percentage", "圆形进度条", "环形进度".
metadata:
  version: "0.1.0"
  date: "2026-11-24"
  upstream: "Magic UI — Animated Circular Progress Bar (MIT), credit @luis-code"
  theme: "black-gray"
---

# animated-circular-progress-bar

A self-contained circular progress gauge. Two SVG arcs (value + remaining track) and a centered percentage that fade in; the primary arc animates smoothly as `value` changes. Defaults are tuned for a **black-gray** theme.

- Source: `src/AnimatedCircularProgressBar.jsx` + `src/AnimatedCircularProgressBar.css`
- Dependencies: `react` only. No Tailwind, no `cn`/`clsx`, no animation plugin — just one CSS file.
- Ported from Magic UI (MIT). See `LICENSE.md`.

## Usage

```jsx
import { AnimatedCircularProgressBar } from './magicui/animated-circular-progress-bar/src/AnimatedCircularProgressBar';

<AnimatedCircularProgressBar value={64} />
```

Larger, with a unit and custom timing:

```jsx
<AnimatedCircularProgressBar value={42} size={200} unit="%" transitionLength="700ms" />
```

Animated value (grows on each change → the arc transitions):

```jsx
const [value, setValue] = useState(0);
<AnimatedCircularProgressBar value={value} />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number` | `0` | Current value. |
| `min` | `number` | `0` | Minimum of the range. |
| `max` | `number` | `100` | Maximum of the range. |
| `gaugePrimaryColor` | `string` | `'#d4d4d8'` | Color of the value arc (light gray). |
| `gaugeSecondaryColor` | `string` | `'rgba(255,255,255,0.1)'` | Color of the remaining track. |
| `valueColor` | `string` | `'#f4f4f5'` | Center number color. |
| `size` | `number \| string` | `160` | Rendered width/height (px number or CSS length). |
| `transitionLength` | `string` | `'1s'` | Arc + value transition duration. |
| `delay` | `string` | `'0s'` | Transition / fade delay. |
| `unit` | `string` | `''` | Appended to the center number (e.g. `'%'`). |
| `className` | `string` | `''` | Extra class on the root. |

The center number is `clamp(round(((value - min) / (max - min)) * 100), 0, 100)`.

## Black-gray theme

Defaults already read as black-gray on a near-black surface: primary arc `#d4d4d8`, track `rgba(255,255,255,0.1)`, value `#f4f4f5`. Override per instance via props:

```jsx
<AnimatedCircularProgressBar
  value={72}
  gaugePrimaryColor="#e4e4e7"
  gaugeSecondaryColor="rgba(255,255,255,0.08)"
  valueColor="#fafafa"
/>
```

Or override the CSS variables on the root / an ancestor:

| Variable | Purpose |
| --- | --- |
| `--acp-size` | Ring size (set by `size`). |
| `--acp-value-color` | Center number color. |
| `--transition-length` | Animation duration (set by `transitionLength`). |
| `--delay` | Animation delay. |

The gauge uses a `viewBox="0 0 100 100"` with `r=45`; internal `--circle-size` / `--circumference` / `--percent-to-px` are computed by the component — don't override them.

## How it works

- Primary circle: `strokeDasharray = (percent × percentPx) circumference`, rotated `-90deg` so it starts at 12 o'clock; `stroke-linecap: round`.
- Secondary circle (remaining track): only rendered when `0 ≤ percent ≤ 90`; drawn as the complement with a 5% gap at each end, `scaleY(-1)` + offset rotation.
- The wrapper's CSS variables drive the gap/offset math; the transition is `stroke-dasharray` (and `transform`).
- Center number fades in via the `acp-fade` keyframe; honors `prefers-reduced-motion` (arc transitions + fade disabled).

## Accessibility / notes

- The SVG is `aria-hidden`; add a visible label or wrap with `role="img"` + `aria-label` if it conveys standalone information.
- Set an explicit `size` for layout; the component is `inline-block` and does not set its own outer margin.
- Div-by-zero safe when `max === min`.

## License & credits

Based on Magic UI — Animated Circular Progress Bar (MIT), originally by [@luis-code](https://luis-code.vercel.app/). This version is repackaged (plain CSS, black-gray defaults, extra props). See `LICENSE.md` for the full MIT notice.
