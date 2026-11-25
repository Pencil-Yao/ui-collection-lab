---
name: typing-animation
description: A typewriter effect that types (and optionally deletes/loops) one or more strings with a blinking cursor. Starts on view, configurable speeds, loop, cursor style, and reduced-motion aware. React + motion (useInView), plain CSS. Based on Magic UI's Typing Animation (MIT). Use for hero headlines, rotating taglines, "typing" intros. Triggers include "typing animation", "typewriter", "typing text", "打字动画", "打字机效果".
metadata:
  version: "0.1.0"
  date: "2026-11-24"
  upstream: "Magic UI — Typing Animation (MIT)"
  theme: "black-gray"
---

# typing-animation

Types out its text character by character with a blinking cursor. Pass a single string (or `words` to cycle through several, deleting between them). Black-gray by default.

- Source: `src/TypingAnimation.jsx` + `src/TypingAnimation.css`
- Dependency: `motion` (`motion/react`, for `useInView`)
- Client component (`'use client'`). Based on Magic UI (MIT). See `LICENSE.md`.

## Usage

```jsx
import { TypingAnimation } from './magicui/typing-animation/src/TypingAnimation';

<TypingAnimation className="text-3xl">Typing Animation</TypingAnimation>
```

Cycle several strings (types, pauses, deletes, next):

```jsx
<TypingAnimation words={['build faster', 'ship smarter', 'scale easier']} loop />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `string` | — | Single string to type. |
| `words` | `string[]` | — | Multiple strings to cycle (overrides `children`). |
| `duration` | `number` | `100` | Default type speed (ms per char). |
| `typeSpeed` | `number` | `duration` | Typing speed (ms per char). |
| `deleteSpeed` | `number` | `typeSpeed / 2` | Deleting speed (ms per char). |
| `delay` | `number` | `0` | Initial delay before typing (ms). |
| `pauseDelay` | `number` | `1000` | Pause after a word before deleting (ms). |
| `loop` | `boolean` | `false` | Loop forever (otherwise stops on the last word). |
| `as` | `string` | `'span'` | Element tag to render. |
| `startOnView` | `boolean` | `true` | Start when scrolled into view. |
| `showCursor` | `boolean` | `true` | Show the cursor. |
| `blinkCursor` | `boolean` | `true` | Blink the cursor. |
| `cursorStyle` | `'line' \| 'block' \| 'underscore'` | `'line'` | Cursor glyph. |
| `className` | `string` | `''` | Extra classes on the root. |

## How it works

- A small state machine (`typing → pause → deleting → typing`) advances on a `setTimeout` whose delay depends on the phase and speed props.
- `useInView` (motion) gates `startOnView`.
- The cursor is a `<span class="typing-animation__cursor">` with a CSS blink; it hides once a single word finishes.
- Honors `prefers-reduced-motion` (no cursor blink).

## Black-gray theme

Text inherits `color` (set `className`/`style`); the page is dark so light text reads well. Example:

```jsx
<TypingAnimation className="text-4xl font-bold" words={['build', 'ship', 'scale']} loop />
```

## License & credits

Based on Magic UI — Typing Animation (MIT). This version repackaged (JS, plain CSS, black-gray defaults, reduced-motion cursor). See `LICENSE.md`.
