---
name: morphing-text
description: A gooey text-morph effect — two stacked text layers cross-fade through blur and an SVG alpha-threshold filter, so one word melts into the next. React only (SVG filter + requestAnimationFrame), black-gray palette, reduced-motion aware. Based on Magic UI's Morphing Text (MIT). Use for hero headlines, rotating value props, "melting / gooey text" transitions, or an animated brand word. Triggers include "morphing text", "gooey text", "text morph", "melting text", "morph text", "文字变形", "文字融合", "文字熔合".
metadata:
  version: "0.1.0"
  date: "2026-11-24"
  upstream: "Magic UI — Morphing Text (MIT)"
  theme: "black-gray"
---

# morphing-text

Two absolutely-stacked text layers sit in the same spot. While morphing, the outgoing word blurs out and loses opacity as the incoming word blurs in; an SVG `feColorMatrix` alpha threshold on the container snaps both blurred layers into hard edges, so the two words appear to melt/fuse before snapping to the next one. A short cooldown holds the fresh word crisp before the next morph.

- Source: `src/MorphingText.jsx` + `src/MorphingText.css`
- Dependencies: **none** beyond React (SVG filter + `requestAnimationFrame`)
- Client component (`'use client'`). Ported from Magic UI (MIT). See `LICENSE.md`.

## Usage

Set the size from the parent (the root is a full-width block whose height is `1em`, sized by `font-size`):

```jsx
import { MorphingText } from './magicui/morphing-text/src/MorphingText';

<div style={{ fontSize: 56 }}>
  <MorphingText texts={['faster', 'smarter', 'together', 'forever']} />
</div>
```

It cycles through `texts` in order, forever. One entry at a time is shown; the next is fetched from the array (wrapping around).

Each entry is a single line. Pass multi-word strings to show several words per morph state on one line:

```jsx
<MorphingText texts={['Morphing Text', 'Fusion Smooth', 'Gooey Blur']} />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `texts` | `string[]` | `[]` | Words/phrases to cycle through. |
| `morphTime` | `number` | `1.5` | Seconds each morph transition takes. |
| `cooldownTime` | `number` | `0.5` | Seconds the fresh word stays crisp before morphing again. |
| `blur` | `number` | `0.6` | Base blur (px) applied to the whole container after the threshold filter. |
| `className` | `string` | `''` | Extra classes on the root (font size, weight, color, tracking…). |
| `style` | `object` | — | Inline styles on the root. |

Any other props are spread onto the root `div`.

## Black-gray theme

Default text is light gray (`#f4f4f5`) at weight `700` on a transparent background — crisp white letters against a dark surface. Override per instance:

```jsx
<MorphingText
  texts={['build', 'ship', 'scale']}
  className="morphing-text--accent"
  style={{ color: '#e4e4e7', letterSpacing: '-0.03em' }}
/>
```

## How it works

- Each frame the loop accumulates elapsed time into `morph`. While `morph / morphTime < 1` it cross-fades: the incoming layer's `blur` goes `100px → 0` and `opacity` `0 → 1` (eased with `pow(f, 0.4)`), the outgoing layer does the inverse.
- The container has `filter: url(#threshold) blur(0.6px)`. The inline SVG `feColorMatrix` uses alpha row `0 0 0 255 -140`, i.e. `alpha' = 255·alpha − 140`, so any pixel with alpha above ~0.55 becomes fully opaque and everything else transparent. Applied to the (heavily blurred) cross-fading text, it turns soft blobs into sharp glyph edges — the signature "gooey" snap.
- When a morph completes, the incoming layer is held crisp for `cooldownTime`, then the pair advances to the next two words.
- Each instance gets a unique filter id (`useId`, sanitized) so multiple morphing texts on one page don't collide.
- `texts`/timing are read from refs inside the loop, so changing the array mid-flight doesn't restart the animation.

## Accessibility

- The animated layers are `aria-hidden`; a visually-hidden copy of the first word is exposed to screen readers.
- Honors `prefers-reduced-motion`: renders the first word statically (no blur, no loop).

## Notes

- The root is `height: 1em` and the layers are absolutely positioned; give it enough line box (e.g. `height: 1.15em`) if descenders clip in your layout.
- The threshold filter works on opaque text; colored/transparent text or images won't morph the same way.
- No WebGL, no extra packages; works anywhere SVG filters + CSS animations run.

## License & credits

Based on Magic UI — Morphing Text (MIT). This version repackaged (JS, plain CSS, per-instance filter ids, black-gray defaults, reduced-motion + screen-reader support). See `LICENSE.md` for the full MIT notice.
