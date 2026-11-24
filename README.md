# UI Collection Lab

A runnable playground + skill repository for reverse-engineered [react-bits](https://github.com/DavidHDev/react-bits) components. The full component source is committed in-tree, so components can be copied straight into another project.

Currently included: **MagicBento** — an interactive bento grid with cursor spotlight, border glow, drifting stars, 3D tilt, magnetism and a click ripple — organized as a **shell skill** plus **six per-card visual skills**.

## Run the demo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build check
```

The demo (`src/App.jsx`) lets you switch theme, glow color and toggle every interaction prop.

## Skill structure

```
magic-bento/                      # shell skill
├── SKILL.md
├── src/MagicBento.jsx + .css
├── references/MagicBento.md
├── magic-bento-insights/         # card visual: analytics line chart
├── magic-bento-overview/         # card visual: bar chart
├── magic-bento-teamwork/         # card visual: collaborative cursors
├── magic-bento-efficiency/       # card visual: CI pipeline steps
├── magic-bento-connectivity/     # card visual: integration hub
└── magic-bento-protection/       # card visual: security toggles
```

Each `magic-bento-*` folder is an independent skill containing its own `SKILL.md`, `src/<Visual>.jsx` and `src/<Visual>.css`.

## Copy a component into your project

1. Copy `magic-bento/src/` (the shell) and the visual folder(s) you want, e.g. `magic-bento/magic-bento-insights/`.
2. Install deps: `npm i @hugeicons/react @hugeicons/core-free-icons`.
3. Render:

```jsx
import MagicBento from './magic-bento/src/MagicBento';

<MagicBento
  columns={4}
  rowHeight={200}
  items={[{ title: 'Analytics', description: 'Track behavior', visual: 'analytics' }]}
  enableBorderGlow
  enableSpotlight
  clickEffect
/>
```

See [`magic-bento/references/MagicBento.md`](magic-bento/references/MagicBento.md) for every prop, preset and CSS variable hook; see each `magic-bento-*/SKILL.md` for per-visual details.

## As a skill

[`SKILL.md`](SKILL.md) indexes the collection; [`magic-bento/SKILL.md`](magic-bento/SKILL.md) documents the shell and how the visual skills plug in.
