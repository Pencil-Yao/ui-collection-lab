---
name: dia-text-reveal
description: A React text-reveal component where a horizontal gradient band sweeps across the text, revealing it and settling on a base color. Black-gray theme by default. Supports single strings or a rotating array of strings, viewport-triggered start, and reduced-motion. Based on Magic UI's Dia Text Reveal (MIT). Use for hero headlines, animated taglines, word rotation, "text shine / sweep reveal" effects. Triggers include "text reveal", "gradient sweep text", "dia text reveal", "animated headline", "rotating words", "文字扫光", "文字揭示".
metadata:
  version: "0.1.0"
  date: "2026-11-24"
  upstream: "Magic UI — Dia Text Reveal (MIT), credit @chishiyac"
  theme: "black-gray"
---

# dia-text-reveal

A horizontal color band sweeps across text (painted via `background-clip: text`), revealing it from left to right and settling on the base color. Defaults are tuned for a **black-gray / metallic-gray** theme.

- Source: `src/DiaTextReveal.jsx` + `src/DiaTextReveal.css`
- Dependency: [`motion`](https://motion.dev) (`motion/react`) — `npm i motion`
- Ported from Magic UI (MIT). See `LICENSE.md`.

## Usage

```jsx
import { DiaTextReveal } from './magicui/dia-text-reveal/src/DiaTextReveal';

<DiaTextReveal text="Magic UI" className="text-4xl font-bold" />
```

Rotating multiple strings:

```jsx
<DiaTextReveal
  repeat
  repeatDelay={1.2}
  text={['build faster', 'ship smarter', 'scale easier']}
/>
```

Inline inside a heading:

```jsx
<h1>
  Learn to <DiaTextReveal repeat text={['build', 'ship', 'scale']} />
</h1>
```

Note: the component sets its own font color (transparent, filled by the gradient), so pass font size/weight/tracking via `className`. Base class `dia-text-reveal` handles vertical alignment, line-height and `-webkit-text-fill-color: transparent` — keep it (the component adds it automatically; just append your classes).

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | `string \| string[]` | — | Text to reveal. Array rotates when `repeat` is on. |
| `colors` | `string[]` | grayscale palette | Colors sampled across the sweeping band. |
| `textColor` | `string` | `'#f4f4f5'` | Solid color after the sweep (also drawn on the leading region during the sweep). |
| `duration` | `number` | `1.5` | One sweep duration, seconds. |
| `delay` | `number` | `0` | Delay before the sweep, seconds. |
| `repeat` | `boolean` | `false` | Advance to the next string (or replay) after each cycle. |
| `repeatDelay` | `number` | `0.5` | Pause between cycles, seconds. |
| `startOnView` | `boolean` | `true` | Start when the element enters the viewport. |
| `once` | `boolean` | `true` | In-view fires at most once (no replay on scroll-back). |
| `fixedWidth` | `boolean` | `false` | Lock width to the widest string (multi-text) to avoid layout shift. |
| `className` | `string` | `''` | Extra classes on the root `span` (typography). |

Any other props are spread onto the underlying `motion.span`.

## Black-gray theme

Default grayscale band palette and `#f4f4f5` base text: `colors = ['#52525b', '#a1a1aa', '#f4f4f5', '#d4d4d8', '#71717a']`. On a near-black surface this reads as a metallic gray shine on light text.

Override per instance:

```jsx
<DiaTextReveal
  text="Black Gray"
  colors={['#3f3f46', '#a1a1aa', '#ffffff', '#d4d4d8', '#52525b']}
  textColor="#fafafa"
/>
```

## How it works

- Text is rendered with `color: transparent` + `background-clip: text`, so the background gradient shows through the glyphs.
- `buildGradient(pos, colors, textColor)` builds a `linear-gradient(90deg, …)` with a `±17%` traveling band: left of the band = `textColor`, inside the band = `colors`, right of the band = `transparent` (not yet revealed). At the end the whole text is solid `textColor`.
- Animation: `motion`'s `animate(useMotionValue, SWEEP_START → SWEEP_END, { ease: sweepEase })` with a custom cubic ease; `useTransform` maps the position to the gradient. `useInView` gates `startOnView`.
- Multi-text: measures each string width with a hidden ghost node (re-measured on container resize and `document.fonts.ready`) and sizes the box to the active string, so text is never clipped; `fixedWidth` locks to the widest string. `line-height` is `1.25` so ascenders/descenders aren't shaved by `overflow: hidden`.
- The box width is applied directly (no width transition), so switching strings can't transiently clip the wider text.
- `useReducedMotion` jumps straight to the finished state.

## Accessibility

- The text is real text, so screen readers read it; animation is decorative.
- Honors `prefers-reduced-motion` (shows the settled state, no sweep).

## License & credits

Based on Magic UI — Dia Text Reveal (MIT), originally by [@chishiyac](https://github.com/chishiyac). This version repackaged (JS, black-gray defaults, base `dia-text-reveal` class instead of Tailwind utilities). See `LICENSE.md` for the full MIT notice.
