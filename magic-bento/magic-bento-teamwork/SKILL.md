---
name: magic-bento-teamwork
description: The "Teamwork" card visual for MagicBento — a fake collaborative document with two animated cursor labels (Maya, Leo), text selection and a blinking caret. Use for a collaboration / realtime-editing / team card inside a bento or feature grid. Triggers include "collaboration card", "teamwork card", "collaborative cursor card", "realtime editing card", "协作光标卡片". Composes inside magic-bento; ships its own JSX + CSS.
metadata:
  version: "0.1.0"
  date: "2026-11-24"
  parent: magic-bento
  visual-key: collaboration
---

# magic-bento-teamwork

Card visual: a document pane with text lines, a highlighted selection + caret, and two named cursors drifting on looping paths. Rendered as the `collaboration` visual of MagicBento.

- Source: `src/TeamworkVisual.jsx` + `src/TeamworkVisual.css`
- Visual key: `collaboration`
- Dependencies: `react` only (no icon package; the cursor arrow is inline SVG)

## Use it

```jsx
<MagicBento
  items={[{ label: 'Teamwork', title: 'Collaboration', description: 'Work together seamlessly', visual: 'collaboration', colSpan: 2, rowSpan: 2 }]}
/>
```

or:

```jsx
import TeamworkVisual from '../magic-bento-teamwork/src/TeamworkVisual';

<MagicBento items={[{ title: 'Collaboration', description: 'Together', visual: <TeamworkVisual /> }]} />
```

Requires the shell CSS for `--mb-*` variables, `.magic-bento__well`, `.magic-bento__visual` container and the `data-active` / `data-motion` hooks.

## Markup

```
.magic-bento__collab.magic-bento__well
  .magic-bento__doc-title
  .magic-bento__lines
    .magic-bento__line (--w) [.magic-bento__line--gap]
      .magic-bento__selection (--from, --span)
        .magic-bento__caret
  .magic-bento__cursor.magic-bento__cursor--primary  (--x --y --i --path=magic-bento-path-a)
  .magic-bento__cursor.magic-bento__cursor--secondary(--x --y --i --path=magic-bento-path-b)
    svg (arrow)  +  .magic-bento__cursor-name
```

## Behavior

- Cursors pop in (`magic-bento-pop`) then drift on the `magic-bento-path-a` / `magic-bento-path-b` loops. The drift runs when the card is `data-active` (hovered).
- Selection wipes in via `magic-bento-select`; caret blinks (`magic-bento-blink`) while the card is active.
- Primary cursor uses the accent color (`--mb-accent-rgb`); secondary uses `--mb-secondary`.
- All motion is gated by the shell's `data-motion` / cell `data-state="in"` and disabled under reduced motion.

## Customize

- Names: the `.magic-bento__cursor-name` text (`Maya`, `Leo`).
- Cursor start positions and drift: `--x` / `--y` on each cursor; the `magic-bento-path-a` / `magic-bento-path-b` keyframes in the CSS.
- Document lines: widths (`--w`), selection (`--from`, `--span`), and the `Launch plan` title.
- Color: primary follows MagicBento's `glowColor`; secondary follows the shell's `--mb-secondary`.
