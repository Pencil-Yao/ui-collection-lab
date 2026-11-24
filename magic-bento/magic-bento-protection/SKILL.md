---
name: magic-bento-protection
description: The "Protection" card visual for MagicBento — animated security settings tiles (SSO, 2FA) whose toggle switches flip on. Use for a security / privacy / access-control card inside a bento or feature grid. Triggers include "security card", "protection card", "settings toggle card", "2fa card", "安全卡片". Composes inside magic-bento; ships its own JSX + CSS.
metadata:
  version: "0.1.0"
  date: "2026-11-24"
  parent: magic-bento
  visual-key: security
---

# magic-bento-protection

Card visual: a stack of setting tiles (SSO, 2FA) each with an icon, label and a switch that animates on. Rendered as the `security` visual of MagicBento.

- Source: `src/ProtectionVisual.jsx` + `src/ProtectionVisual.css`
- Visual key: `security`
- Dependencies: `@hugeicons/react`, `@hugeicons/core-free-icons` (Key01Icon, FingerPrintIcon)

## Use it

```jsx
<MagicBento
  items={[{ label: 'Protection', title: 'Security', description: 'Enterprise-grade protection', visual: 'security' }]}
/>
```

or:

```jsx
import ProtectionVisual from '../magic-bento-protection/src/ProtectionVisual';

<MagicBento items={[{ title: 'Security', description: 'Protected by default', visual: <ProtectionVisual /> }]} />
```

Requires the shell CSS for `--mb-*` variables, `.magic-bento__tile`, and the `.magic-bento__visual` **size container** (the `@container` rules drop tiles in short cards).

## Markup

```
.magic-bento__shield
  .magic-bento__setting.magic-bento__tile (×N)
    <icon>
    .magic-bento__setting-label
    .magic-bento__switch (--i)            ← add [data-off] to render as off
```

## Behavior

- Switch track and knob animate on via `magic-bento-switch-track` / `magic-bento-switch-knob`, staggered by `--i`.
- `@container (max-height: 78px)` hides extra settings; `@container (max-height: 38px)` hides the whole shield.
- A switch with `data-off` renders in the off state and opts out of the animation.
- Gated by the shell's `data-motion` / cell `data-state="in"` and disabled under reduced motion.

## Customize

- Rows: edit the `SETTINGS` array (`{ icon, label }`) in `ProtectionVisual.jsx`.
- Off state: add `data-off` to a `.magic-bento__switch`.
- Color: accent (`--mb-accent-rgb`) from MagicBento's `glowColor` / theme.
