---
name: ui-collection-lab
description: A runnable Vite + React lab and skill repository that groups components by source library. Under magicui/ it ships animated-circular-progress-bar (dependency-free SVG circular progress gauge) and dia-text-reveal (gradient-sweep text reveal with rotating strings, powered by motion) — both black-gray themed with full source. Use to add, demo or copy those components; also the scaffold for more. Triggers include "ui-collection-lab", "circular progress bar", "radial gauge", "text reveal", "gradient sweep text", "圆形进度条", "文字扫光".
metadata:
  version: "0.6.0"
  date: "2026-11-24"
  components:
    - magicui/animated-circular-progress-bar
    - magicui/dia-text-reveal
---

# ui-collection-lab

A component lab / skill repository. Components are grouped by their source library, and each ships its **full source** in-tree so it can be copied straight into a project.

## Layout

```
ui-collection-lab/
├── SKILL.md                              # this file (index)
├── README.md
├── package.json                          # Vite + React demo app
├── index.html
├── vite.config.js
├── magicui/                              # ← components sourced from Magic UI (MIT)
│   ├── animated-circular-progress-bar/   # plain CSS, React only
│   │   ├── SKILL.md
│   │   ├── LICENSE.md
│   │   └── src/
│   │       ├── AnimatedCircularProgressBar.jsx
│   │       └── AnimatedCircularProgressBar.css
│   └── dia-text-reveal/                  # uses motion
│       ├── SKILL.md
│       ├── LICENSE.md
│       └── src/
│           ├── DiaTextReveal.jsx
│           └── DiaTextReveal.css
└── src/                                  # demo app (not shipped as a skill)
    ├── main.jsx
    ├── App.jsx                           # playground: both components
    └── lab.css
```

## Skills in this collection

| Skill | What it is | Dependencies | Source |
| --- | --- | --- | --- |
| `magicui/animated-circular-progress-bar` | SVG circular progress gauge, black-gray, plain CSS | react | `magicui/animated-circular-progress-bar/src/` |
| `magicui/dia-text-reveal` | Gradient-sweep text reveal, single or rotating strings | react, motion | `magicui/dia-text-reveal/src/` |

## magicui/animated-circular-progress-bar

Circular progress / radial gauge with a centered percentage; two arcs animate as `value` changes. React only, no Tailwind, no `cn`/`clsx`.

```jsx
import { AnimatedCircularProgressBar } from './magicui/animated-circular-progress-bar/src/AnimatedCircularProgressBar';
<AnimatedCircularProgressBar value={64} size={160} />
```

Props: `value`, `min`, `max`, `gaugePrimaryColor`, `gaugeSecondaryColor`, `valueColor`, `size`, `transitionLength`, `delay`, `unit`, `className`. Details: `magicui/animated-circular-progress-bar/SKILL.md`.

## magicui/dia-text-reveal

A horizontal gradient band sweeps across text (via `background-clip: text`), revealing it and settling on a base color. Black-gray metallic palette by default. Supports single text or a rotating array.

```bash
npm i motion   # required (motion/react)
```

```jsx
import { DiaTextReveal } from './magicui/dia-text-reveal/src/DiaTextReveal';

<DiaTextReveal text="Magic UI" className="text-4xl font-bold" />
<DiaTextReveal repeat text={['build faster', 'ship smarter']} />
```

Props: `text`, `colors`, `textColor`, `duration`, `delay`, `repeat`, `repeatDelay`, `startOnView`, `once`, `fixedWidth`, `className`. Details: `magicui/dia-text-reveal/SKILL.md`.

## Adding a new component

1. Create `<library>/<component-name>/` with `SKILL.md`, `LICENSE.md` (keep upstream notices), and `src/<Component>.jsx` + `src/<Component>.css`.
2. Render a demo in `src/App.jsx`.
3. Register it in the table above and in `metadata.components`.
4. Install any deps and confirm `npm install && npm run build`.
5. Only redistribute third-party source when its license permits it (Magic UI is MIT; react-bits is MIT + Commons Clause, which does **not** allow redistributing the components themselves).

## Licensing

- `magicui/*` components are based on Magic UI (MIT) — see each `LICENSE.md`.
- No react-bits component source is included in this repository.
