---
name: shiny-button
description: A button with a looping shine sweep and a click press/ripple effect — an animated gradient masked across the label and a matching border glow, driven by motion. Black-gray theme, plain CSS. Based on Magic UI's Shiny Button (MIT). Use for primary CTAs, "get started" buttons, or a glowing action with a metallic light sweep. Triggers include "shiny button", "shine button", "glow button", "光效按钮", "闪光按钮".
metadata:
  version: "0.1.0"
  date: "2026-11-24"
  upstream: "Magic UI — Shiny Button (MIT)"
  theme: "black-gray"
---

# shiny-button

A pill/rounded button whose label has a travelling light mask and whose border lights up in sync. The `--x` CSS variable is animated by `motion`, and both the text mask and border gradient read it.

- Source: `src/ShinyButton.jsx` + `src/ShinyButton.css`
- Dependency: `motion` (`motion/react`)
- Client component (`'use client'`). Based on Magic UI (MIT). See `LICENSE.md`.

## Usage

```jsx
import { ShinyButton } from './magicui/shiny-button/src/ShinyButton';

<ShinyButton onClick={handleClick}>Get Started</ShinyButton>
```

Renders a `<motion.button>`; accepts normal button props (`onClick`, `type`, `disabled`, `style`, …) and forwards `ref`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | Button label. |
| `className` | `string` | `''` | Extra classes on the button. |
| `...props` | button/motion props | — | Passed to `motion.button`. |

## Black-gray theme

Light-gray label + border on a dark translucent surface, with a soft radial top highlight. Tune via CSS variables on the button:

```jsx
<ShinyButton style={{ '--shiny-primary': '#fff' }}>Buy now</ShinyButton>
```

## How it works

- `motion.button` animates `--x` from `100% → -100%` in an infinite spring loop (with a 1s pause), plus a subtle `scale` breathing.
- On press it scales down (`whileTap: 0.9`), brightens the border/shadow, and emits an expanding `shiny-button__ripple` ring (re-mounted per press).
- `.shiny-button__label` uses `mask-image: linear-gradient(-75deg, primary calc(var(--x)+20%), transparent calc(var(--x)+30%), primary calc(var(--x)+100%))` so a transparent "shine" band sweeps across the text.
- `.shiny-button__border` is an inset 1px overlay with `mask: ... content-box exclude` so only the 1px ring shows, painted with a matching moving gradient.
- Honors `prefers-reduced-motion` (disables the hover transition; motion respects the OS setting via `useReducedMotion` only if you opt in — the shine loop is decorative).

## License & credits

Based on Magic UI — Shiny Button (MIT). This version repackaged (JS, plain CSS, black-gray defaults, CSS variables). See `LICENSE.md`.
