---
name: magic-bento
description: The MagicBento shell — a responsive, interactive React bento/feature grid with cursor spotlight, border glow, drifting stars, 3D tilt, magnetism and a click ripple. This skill ships the grid itself plus six pluggable card visuals, each also packaged as its own skill (magic-bento-insights, magic-bento-overview, magic-bento-teamwork, magic-bento-efficiency, magic-bento-connectivity, magic-bento-protection). Use when the user wants a bento grid / feature grid / spotlight card grid, or wants to assemble MagicBento from individual visual cards. Triggers include "magic bento", "bento grid", "feature grid with hover glow", "spotlight cards", "卡片网格带光效", "bento 网格".
metadata:
  version: "0.2.0"
  date: "2026-11-24"
  source: "react-bits by David Haz (https://github.com/DavidHDev/react-bits)"
  visual-skills:
    - magic-bento-insights
    - magic-bento-overview
    - magic-bento-teamwork
    - magic-bento-efficiency
    - magic-bento-connectivity
    - magic-bento-protection
---

# magic-bento

The **shell** skill for MagicBento. It contains the grid component and wires six card-visual skills into a `VISUALS` registry. Each visual is also an independent skill so it can be reused or handed off on its own.

## Layout

```
magic-bento/
├── SKILL.md                     # this file (shell)
├── src/
│   ├── MagicBento.jsx           # grid shell + interaction engine + VISUALS registry
│   └── MagicBento.css           # shell + theme variables + shared surfaces
├── references/
│   └── MagicBento.md            # full props, presets, CSS-variable hooks
├── magic-bento-insights/        # card visual: analytics line chart (Insights)
├── magic-bento-overview/        # card visual: bar chart (Overview)
├── magic-bento-teamwork/        # card visual: collaborative doc cursors (Teamwork)
├── magic-bento-efficiency/      # card visual: CI pipeline steps (Efficiency)
├── magic-bento-connectivity/    # card visual: integration hub (Connectivity)
└── magic-bento-protection/      # card visual: security toggles (Protection)
```

`MagicBento.jsx` imports each visual from its sibling skill folder and maps it in `VISUALS`:

```js
import InsightsVisual from '../magic-bento-insights/src/InsightsVisual';
// ...
const VISUALS = {
  analytics: InsightsVisual,
  dashboard: OverviewVisual,
  collaboration: TeamworkVisual,
  automation: EfficiencyVisual,
  integration: ConnectivityVisual,
  security: ProtectionVisual
};
```

## Dependencies

```bash
npm i @hugeicons/react @hugeicons/core-free-icons
```

Needed by the `efficiency`, `connectivity` and `protection` visuals (the others use no icons).

## Usage

```jsx
import MagicBento from './magic-bento/src/MagicBento';

<MagicBento columns={4} rowHeight={200} enableBorderGlow enableSpotlight clickEffect />
```

Select a built-in visual per card with `visual`:

```jsx
<MagicBento
  items={[
    { label: 'Insights', title: 'Analytics', description: 'Track behavior', visual: 'analytics' },
    { label: 'Overview', title: 'Dashboard', description: 'Centralized view', visual: 'dashboard', colSpan: 2, rowSpan: 2 },
    { label: 'Teamwork', title: 'Collaboration', description: 'Together', visual: 'collaboration' }
  ]}
/>
```

Or pass the visual component directly: `{ visual: <InsightsVisual /> }`. Import it from the matching skill, e.g. `import InsightsVisual from '../magic-bento-insights/src/InsightsVisual';`.

## The six card visuals

| Card label  | `visual` key   | Skill                       |
| ----------- | -------------- | --------------------------- |
| Insights    | `analytics`    | `magic-bento-insights`      |
| Overview    | `dashboard`    | `magic-bento-overview`      |
| Teamwork    | `collaboration`| `magic-bento-teamwork`      |
| Efficiency  | `automation`   | `magic-bento-efficiency`    |
| Connectivity| `integration`  | `magic-bento-connectivity`  |
| Protection  | `security`     | `magic-bento-protection`    |

Each visual skill folder holds `<Visual>.jsx` + `<Visual>.css` and a SKILL.md describing its markup, classes and animation hooks. They are designed to render inside the shell — the shell provides the `--mb-*` theme variables, the `.magic-bento__visual` size container and the intro/replay engine.

## Full prop reference

See [`references/MagicBento.md`](references/MagicBento.md) for every prop, the presets, and the `--mb-*` CSS-variable hooks.

## Using a single visual skill

Open the `magic-bento-<name>/SKILL.md` you need. Each one is self-contained about its own markup/animation but assumes the MagicBento shell for theming and layout. When you only need one card, copy the shell (`src/`) plus that one visual folder.
