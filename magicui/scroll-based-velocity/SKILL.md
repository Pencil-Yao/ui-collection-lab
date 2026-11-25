---
name: scroll-based-velocity
description: Endlessly scrolling text rows whose speed and direction react to page scroll velocity. Rows duplicate their content and translate seamlessly using motion's useScroll/useVelocity/useSpring/useAnimationFrame. Black-gray theme, plain CSS, reduced-motion aware. Based on Magic UI's Scroll Based Velocity (MIT). Use for kinetic marquees, "scroll to speed up" banners, or infinite ticker text. Triggers include "scroll velocity", "marquee", "infinite scroll text", "kinetic text", "滚动速度", "无限滚动文字".
metadata:
  version: "0.1.0"
  date: "2026-11-24"
  upstream: "Magic UI — Scroll Based Velocity (MIT)"
  theme: "black-gray"
---

# scroll-based-velocity

Marquee rows that scroll forever and speed up / flip with page scroll velocity. Built on `motion` (`motion/react`), plain CSS for layout.

- Source: `src/ScrollBasedVelocity.jsx` + `src/ScrollBasedVelocity.css`
- Dependency: `motion` (`motion/react`)
- Client component (`'use client'`). Based on Magic UI (MIT). See `LICENSE.md`.

## Usage

```jsx
import {
  ScrollVelocityContainer,
  ScrollVelocityRow
} from './magicui/scroll-based-velocity/src/ScrollBasedVelocity';

<ScrollVelocityContainer className="my-ticker">
  <ScrollVelocityRow baseVelocity={10} direction={1}>
    <span>CREATIVE • DESIGN • MOTION • </span>
  </ScrollVelocityRow>
  <ScrollVelocityRow baseVelocity={10} direction={-1}>
    <span>BUILD FASTER • SHIP SMARTER • </span>
  </ScrollVelocityRow>
</ScrollVelocityContainer>
```

`ScrollVelocityContainer` shares one scroll-velocity signal across its rows; each `ScrollVelocityRow` can also be used on its own (it then measures scroll velocity itself).

## Props

`ScrollVelocityRow`:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `baseVelocity` | `number` | `5` | Auto-scroll speed, in % of one content block per second. |
| `direction` | `1 \| -1` | `1` | Base direction (flips when scrolling up). |
| `scrollReactivity` | `boolean` | `true` | Whether page scroll velocity affects speed/direction. |
| `className` | `string` | `''` | Extra classes on the row. |
| `children` | `ReactNode` | — | The content block (repeated horizontally to fill). |

`ScrollVelocityContainer` takes `className`/`children` and wraps rows in a shared velocity context.

## How it works

- The container measures `scrollY` velocity, smooths it with a spring, and maps it to a factor in `[-5, 5]`.
- Each row measures one content block width with a `ResizeObserver`, then renders enough copies (`max(3, ceil(container/block)+2)`) to fill the viewport.
- A `requestAnimationFrame` loop advances an `x` MotionValue by `blockWidth × baseVelocity/100` per second, scaled by scroll velocity (and reversed by scroll direction), then wraps it modulo the block width for a seamless loop.
- Pauses off-screen / when the tab is hidden; honors `prefers-reduced-motion` (no extra speed-up).

## Black-gray theme

Text inherits `color`; set it on the row/content. Default page is dark so light text reads as a metallic ticker.

## License & credits

Based on Magic UI — Scroll Based Velocity (MIT). This version repackaged (JS, plain CSS, black-gray defaults). See `LICENSE.md`.
