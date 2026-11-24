---
name: magic-bento-efficiency
description: The "Efficiency" card visual for MagicBento — an animated CI/CD pipeline (trigger tile + stepped status list with pending ↻ done states, progress rail and timings). Use for an automation / workflow / deployment / pipeline card inside a bento or feature grid. Triggers include "pipeline card", "automation card", "ci/cd card", "workflow card", "流水线卡片". Composes inside magic-bento; ships its own JSX + CSS.
metadata:
  version: "0.1.0"
  date: "2026-11-24"
  parent: magic-bento
  visual-key: automation
---

# magic-bento-efficiency

Card visual: a "Push to main" trigger and a four-step pipeline that animates pending → spinner → check, with a filling rail and per-step times. Rendered as the `automation` visual of MagicBento.

- Source: `src/EfficiencyVisual.jsx` + `src/EfficiencyVisual.css`
- Visual key: `automation`
- Dependencies: `@hugeicons/react`, `@hugeicons/core-free-icons` (GitBranchIcon, Tick02Icon)

## Use it

```jsx
<MagicBento
  items={[{ label: 'Efficiency', title: 'Automation', description: 'Streamline workflows', visual: 'automation', colSpan: 2, rowSpan: 2 }]}
/>
```

or:

```jsx
import EfficiencyVisual from '../magic-bento-efficiency/src/EfficiencyVisual';

<MagicBento items={[{ title: 'Automation', description: 'Streamline workflows', visual: <EfficiencyVisual /> }]} />
```

Requires the shell CSS for the `--mb-*` variables, `.magic-bento__tile` / `.magic-bento__well` surfaces, `.magic-bento__visual` container and the flow-replay hooks.

## Markup

```
.magic-bento__flow (--n = step count)
  .magic-bento__flow-trigger.magic-bento__tile
    .magic-bento__flow-glyph            ← GitBranch icon
    .magic-bento__flow-copy (name + hash)
  ol.magic-bento__steps.magic-bento__well
    .magic-bento__rail > .magic-bento__rail-fill
    li.magic-bento__step (--i)
      .magic-bento__status
        .magic-bento__pending / .magic-bento__spinner / .magic-bento__done
      label + .magic-bento__step-time
```

## Behavior

- On intro and again on hover (the shell replays the `magic-bento-wait/run/check/rail` animations when a card becomes active), each step cycles pending → spinner → done (`magic-bento-check`, Tick icon).
- The rail fill scales down the list (`magic-bento-rail`, duration `--n × 520ms`).
- Staggering uses `--i` per step; total steps via `--n`.
- Gated by the shell's `data-motion` / cell `data-state="in"` and disabled under reduced motion.

## Customize

- Steps + timings: edit the `STEPS` array (`{ label, time }`) in `EfficiencyVisual.jsx`; `--n` follows it automatically.
- Trigger text: the `Push to main` / commit hash spans.
- Color: accent (`--mb-accent-rgb`) from MagicBento's `glowColor` / theme.
