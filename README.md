# UI Collection Lab

A runnable Vite + React playground and skill repository. Components are grouped by source library, and each ships its full source so it can be copied into a project.

Currently: **magicui/** — `animated-circular-progress-bar` and `dia-text-reveal` (both black-gray, based on Magic UI, MIT).

## Components

### magicui/animated-circular-progress-bar
Black-gray SVG circular progress gauge (radial gauge / ring). Plain CSS, React only.

```jsx
import { AnimatedCircularProgressBar } from './magicui/animated-circular-progress-bar/src/AnimatedCircularProgressBar';
<AnimatedCircularProgressBar value={64} size={160} />
```

### magicui/dia-text-reveal
Gradient-sweep text reveal; single string or rotating array. Black-gray metallic palette. Powered by `motion`.

```bash
npm i motion
```

```jsx
import { DiaTextReveal } from './magicui/dia-text-reveal/src/DiaTextReveal';
<DiaTextReveal text="Magic UI" className="text-4xl font-bold" />
<DiaTextReveal repeat text={['build faster', 'ship smarter', 'scale easier']} />
```

See each skill's `SKILL.md` for props and theming.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build check
```

## Licensing

Both components are based on Magic UI (MIT) — see each `LICENSE.md`. No react-bits component source is included (react-bits is MIT + Commons Clause and cannot be redistributed as components).
