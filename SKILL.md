---
name: ui-collection-lab
description: A drop-in library of reverse-engineered react-bits UI components whose full source ships inside this skill. Bundles MagicBento — an interactive bento grid with cursor spotlight, border glow, drifting stars, 3D tilt, magnetism and a click ripple — split into a shell skill plus six per-card visual skills (insights, overview, teamwork, efficiency, connectivity, protection). Use this skill whenever the user wants to add, copy, adapt or demo a bento grid, feature grid, spotlight card grid, "magic" hover cards, or an individual analytics/collaboration/pipeline/integration/security card. Triggers include "add a bento grid", "feature grid with hover glow", "spotlight cards", "magic bento", "react-bits component", "抄一个 bento 网格", "卡片网格带光效". Ships a runnable Vite + React demo and copy-paste source under magic-bento/.
metadata:
  version: "0.2.0"
  date: "2026-11-24"
  source: "react-bits by David Haz (https://github.com/DavidHDev/react-bits)"
  components:
    - magic-bento
    - magic-bento-insights
    - magic-bento-overview
    - magic-bento-teamwork
    - magic-bento-efficiency
    - magic-bento-connectivity
    - magic-bento-protection
---

# ui-collection-lab

A component skill repository. Every component's **full source lives in this repo**, so an agent can copy it into a user's project without fetching anything from the network or reconstructing it.

## Repository layout

```
ui-collection-lab/
├── SKILL.md                       # this file (index)
├── README.md                      # how to run the demo
├── package.json                   # Vite + React demo app
├── index.html
├── vite.config.js
├── src/                           # demo app only (not shipped as a skill)
│   ├── main.jsx
│   ├── App.jsx                    # playground (theme / props toggles)
│   └── lab.css
└── magic-bento/                   # ← skill: shell + per-card visual skills
    ├── SKILL.md                   # shell skill
    ├── src/
    │   ├── MagicBento.jsx         # grid shell + interaction engine + VISUALS registry
    │   └── MagicBento.css         # shell + theme vars + shared surfaces
    ├── references/MagicBento.md   # full props, presets, CSS-variable hooks
    ├── magic-bento-insights/      # visual skill (analytics line chart)
    ├── magic-bento-overview/      # visual skill (bar chart)
    ├── magic-bento-teamwork/      # visual skill (collaborative cursors)
    ├── magic-bento-efficiency/    # visual skill (CI pipeline steps)
    ├── magic-bento-connectivity/  # visual skill (integration hub)
    └── magic-bento-protection/    # visual skill (security toggles)
```

Each `magic-bento-*/` folder is its own skill: `SKILL.md` + `src/<Visual>.jsx` + `src/<Visual>.css`.

## Skills in this collection

| Skill                       | Role                        | Source                          | Docs                              |
| --------------------------- | --------------------------- | ------------------------------- | --------------------------------- |
| `magic-bento`               | grid shell + registry       | `magic-bento/src/MagicBento.jsx` | `magic-bento/references/MagicBento.md` |
| `magic-bento-insights`      | card: analytics (`analytics`)       | `magic-bento/magic-bento-insights/src/InsightsVisual.jsx` | folder `SKILL.md` |
| `magic-bento-overview`      | card: dashboard (`dashboard`)       | `magic-bento/magic-bento-overview/src/OverviewVisual.jsx` | folder `SKILL.md` |
| `magic-bento-teamwork`      | card: collaboration (`collaboration`) | `magic-bento/magic-bento-teamwork/src/TeamworkVisual.jsx` | folder `SKILL.md` |
| `magic-bento-efficiency`    | card: automation (`automation`)     | `magic-bento/magic-bento-efficiency/src/EfficiencyVisual.jsx` | folder `SKILL.md` |
| `magic-bento-connectivity`  | card: integration (`integration`)   | `magic-bento/magic-bento-connectivity/src/ConnectivityVisual.jsx` | folder `SKILL.md` |
| `magic-bento-protection`    | card: security (`security`)         | `magic-bento/magic-bento-protection/src/ProtectionVisual.jsx` | folder `SKILL.md` |

## When to use

Use a component when the user asks for the visual/interaction it provides — not for a generic redesign. For MagicBento that means: a responsive grid of cards where a cursor lights up borders and neighbors, with optional stars, tilt, magnetism and a click wave. For a single `magic-bento-*` skill, that means one specific animated card (chart, pipeline, integration hub, …).

## How to use a component (agent workflow)

1. **Copy the source, don't paraphrase it.** Copy the whole `magic-bento/src/` shell plus the visual folder(s) you need (e.g. `magic-bento/magic-bento-insights/`). Keep each `.css` next to its `.jsx`.
2. **Install dependencies** into the target project (see per-component notes below).
3. **Import and render** it. Start from the documented usage, then tailor `items` to the user's content.
4. **Adapt styling only through documented hooks** — CSS variables and props — before editing the CSS. See `magic-bento/references/MagicBento.md`.
5. **Verify** the target app builds. In this repo run `npm install && npm run build`.

## MagicBento (shell)

Interactive bento/feature grid. One vanilla CSS file, one React file for the shell, plus the visual modules. Works in React 18/19 and any Next.js app-router client component (files start with `'use client'`).

The shell imports each visual from its sibling skill folder:

```js
const VISUALS = {
  analytics: InsightsVisual,      // magic-bento-insights
  dashboard: OverviewVisual,      // magic-bento-overview
  collaboration: TeamworkVisual,  // magic-bento-teamwork
  automation: EfficiencyVisual,   // magic-bento-efficiency
  integration: ConnectivityVisual,// magic-bento-connectivity
  security: ProtectionVisual      // magic-bento-protection
};
```

Dependencies:

```bash
npm i @hugeicons/react @hugeicons/core-free-icons
```

(Icons are used by the efficiency, connectivity and protection visuals.)

Minimal usage:

```jsx
import MagicBento from './magic-bento/src/MagicBento';

<MagicBento
  columns={4}
  rowHeight={200}
  gap={12}
  radius={20}
  enableBorderGlow
  enableSpotlight
  spotlightRadius={300}
  clickEffect
/>
```

Custom content:

```jsx
<MagicBento
  items={[
    { label: 'Insights', title: 'Analytics', description: 'Track behavior', visual: 'analytics' },
    { title: 'Teamwork', description: 'Work together', visual: 'collaboration', colSpan: 2, rowSpan: 2 },
    { title: 'Security', description: 'Protected by default', icon: <MyIcon />, href: '/security' }
  ]}
  onItemClick={(item, index) => console.log(item, index)}
/>
```

Key facts:

- `items[]` accepts `title`, `description`, `label`, `icon`, `image`, `visual`, `content`, `href`, `onClick`, `colSpan`, `rowSpan`.
- `visual` can be a built-in key — `analytics`, `dashboard`, `collaboration`, `automation`, `integration`, `security` — or any React node (e.g. `<InsightsVisual />` from a visual skill). `content` replaces the entire card interior while keeping lights/border/click wave.
- Grid auto-drops from `columns` to 2, then 1, based on card width.
- Honors `prefers-reduced-motion`; `disableAnimations` turns everything off.
- Theme via `theme="dark" | "light"`; accent via `glowColor` (hex or `"r, g, b"`).

Full props, presets and CSS-variable hooks: **`magic-bento/references/MagicBento.md`**.

## Adding a new component or visual

1. New visual skill: `magic-bento/magic-bento-<name>/` with `SKILL.md`, `src/<Name>Visual.jsx`, `src/<Name>Visual.css`.
2. Register it in `magic-bento/src/MagicBento.jsx` (`import` + `VISUALS`) with a new `visual` key.
3. Update this table, `magic-bento/SKILL.md`, and `metadata.components`.
4. Optionally add a demo section in `src/App.jsx` and confirm `npm run build`.
