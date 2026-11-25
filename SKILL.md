---
name: ui-collection-lab
description: A runnable Vite + React lab and skill repository that groups components by source library. Under magicui/ it ships animated-circular-progress-bar (dependency-free SVG circular progress gauge), dia-text-reveal (gradient-sweep text reveal), globe (draggable WebGL globe via cobe), icon-cloud (draggable 3D sphere of icons/images), meteors (decorative meteor-shower overlay), morphing-text (gooey blur+threshold text morph), retro-grid (CSS perspective grid floor), scroll-based-velocity (scroll-reactive kinetic marquee rows), shiny-button (light-sweep CTA button), and typing-animation (typewriter text) — all black-gray themed with full source. Use to add, demo or copy those components; also the scaffold for more. Triggers include "ui-collection-lab", "circular progress bar", "radial gauge", "text reveal", "3D globe", "rotating earth", "icon cloud", "3D icon sphere", "meteors", "meteor shower", "shooting stars", "morphing text", "gooey text", "retro grid", "synthwave grid", "scroll velocity", "marquee", "shiny button", "typing animation", "typewriter", "图标云", "流星", "流星雨", "文字变形", "文字融合", "网格背景", "滚动速度", "光效按钮", "打字动画", "圆形进度条", "文字扫光", "3D 地球".
metadata:
  version: "0.11.0"
  date: "2026-11-24"
  components:
    - magicui/animated-circular-progress-bar
    - magicui/dia-text-reveal
    - magicui/globe
    - magicui/icon-cloud
    - magicui/meteors
    - magicui/morphing-text
    - magicui/retro-grid
    - magicui/scroll-based-velocity
    - magicui/shiny-button
    - magicui/typing-animation
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
│   ├── dia-text-reveal/                  # uses motion
│   ├── globe/                            # uses cobe + motion (WebGL)
│   │   ├── SKILL.md
│   │   ├── LICENSE.md
│   │   └── src/
│   │       ├── Globe.jsx
│   │       └── Globe.css
│   ├── icon-cloud/                       # plain CSS + DOM, React only
│   │   ├── SKILL.md
│   │   ├── LICENSE.md
│   │   └── src/
│   │       ├── IconCloud.jsx
│   │       └── IconCloud.css
│   ├── meteors/                          # plain CSS animation, React only
│   │   ├── SKILL.md
│   │   ├── LICENSE.md
│   │   └── src/
│   │       ├── Meteors.jsx
│   │       └── Meteors.css
│   ├── morphing-text/                    # SVG filter + RAF, React only
│   │   ├── SKILL.md
│   │   ├── LICENSE.md
│   │   └── src/
│   │       ├── MorphingText.jsx
│   │       └── MorphingText.css
│   ├── retro-grid/                       # plain CSS perspective grid
│   ├── scroll-based-velocity/            # uses motion
│   ├── shiny-button/                     # uses motion
│   └── typing-animation/                 # uses motion
└── src/                                  # demo app (not shipped as a skill)
    ├── main.jsx
    ├── App.jsx                           # playground: all components
    ├── techIcons.jsx                     # demo logo set (Simple Icons, CC0)
    └── lab.css
```

## Skills in this collection

| Skill | What it is | Dependencies | Source |
| --- | --- | --- | --- |
| `magicui/animated-circular-progress-bar` | SVG circular progress gauge, black-gray, plain CSS | react | `magicui/animated-circular-progress-bar/src/` |
| `magicui/dia-text-reveal` | Gradient-sweep text reveal, single or rotating strings | react, motion | `magicui/dia-text-reveal/src/` |
| `magicui/globe` | Autorotating draggable WebGL globe with markers | react, cobe, motion | `magicui/globe/src/` |
| `magicui/icon-cloud` | Rotating draggable 3D sphere of icon/image tiles | react | `magicui/icon-cloud/src/` |
| `magicui/meteors` | Decorative meteor-shower overlay (CSS animation) | react | `magicui/meteors/src/` |
| `magicui/morphing-text` | Gooey blur + SVG-threshold text morph | react | `magicui/morphing-text/src/` |
| `magicui/retro-grid` | CSS perspective grid floor that scrolls | react | `magicui/retro-grid/src/` |
| `magicui/scroll-based-velocity` | Kinetic marquee rows reacting to scroll velocity | react, motion | `magicui/scroll-based-velocity/src/` |
| `magicui/shiny-button` | CTA button with a looping light-sweep mask | react, motion | `magicui/shiny-button/src/` |
| `magicui/typing-animation` | Typewriter text with blinking cursor | react, motion | `magicui/typing-animation/src/` |

## magicui/animated-circular-progress-bar

Circular progress / radial gauge with a centered percentage; two arcs animate as `value` changes. React only, no Tailwind, no `cn`/`clsx`.

```jsx
import { AnimatedCircularProgressBar } from './magicui/animated-circular-progress-bar/src/AnimatedCircularProgressBar';
<AnimatedCircularProgressBar value={64} size={160} />
```

Props: `value`, `min`, `max`, `gaugePrimaryColor`, `gaugeSecondaryColor`, `valueColor`, `size`, `transitionLength`, `delay`, `unit`, `className`. Details: `magicui/animated-circular-progress-bar/SKILL.md`.

## magicui/dia-text-reveal

A horizontal gradient band sweeps across text (via `background-clip: text`), revealing it and settling on a base color. Black-gray metallic palette by default.

```bash
npm i motion
```

```jsx
import { DiaTextReveal } from './magicui/dia-text-reveal/src/DiaTextReveal';

<DiaTextReveal text="Magic UI" className="text-4xl font-bold" />
<DiaTextReveal repeat text={['build faster', 'ship smarter']} />
```

Props: `text`, `colors`, `textColor`, `duration`, `delay`, `repeat`, `repeatDelay`, `startOnView`, `once`, `fixedWidth`, `className`. Details: `magicui/dia-text-reveal/SKILL.md`.

## magicui/globe

An autorotating, draggable WebGL globe (cobe) with configurable markers and a black-gray palette. Absolutely positioned — give it a positioned square parent.

```bash
npm i cobe motion
```

```jsx
import { Globe, GLOBE_CONFIG } from './magicui/globe/src/Globe';

<div style={{ position: 'relative', width: 260, height: 260 }}>
  <Globe />
</div>
```

Props: `className`, `config` (full cobe options; `GLOBE_CONFIG` exported). Details: `magicui/globe/SKILL.md`.

## magicui/icon-cloud

A rotating, draggable 3D sphere of icons and/or images (Fibonacci-distributed, perspective-projected). Pure DOM + CSS transforms, React only — no WebGL or extra packages. Give it a positioned square parent.

```jsx
import { IconCloud } from './magicui/icon-cloud/src/IconCloud';

<div style={{ position: 'relative', width: 320, height: 320 }}>
  <IconCloud icons={[<ReactLogo />, <TsLogo />]} />
</div>

// or images
<IconCloud images={['/react.png', '/node.png', '/postgres.png']} />
```

Props: `icons`, `images`, `iconSize`, `speed`, `color`, `ariaLabel`, `className`, `style`. Honors `prefers-reduced-motion`. Details: `magicui/icon-cloud/SKILL.md`.

## magicui/meteors

A decorative meteor shower: glowing heads with fading tails streak diagonally on randomized position, delay and duration. Pure CSS animation, React only. Renders an absolute overlay filling a positioned parent.

```jsx
import { Meteors } from './magicui/meteors/src/Meteors';

<div style={{ position: 'relative', height: 320, overflow: 'hidden' }}>
  <Meteors number={28} />
</div>
```

Props: `number`, `minDelay`, `maxDelay`, `minDuration`, `maxDuration`, `angle`, `className`. Honors `prefers-reduced-motion`. Details: `magicui/meteors/SKILL.md`.

## magicui/morphing-text

A gooey text morph: two stacked layers cross-fade through blur and an SVG alpha-threshold filter, so one word melts into the next. React only.

```jsx
import { MorphingText } from './magicui/morphing-text/src/MorphingText';

<div style={{ fontSize: 56 }}>
  <MorphingText texts={['faster', 'smarter', 'together']} />
</div>
```

Props: `texts`, `morphTime`, `cooldownTime`, `blur`, `className`, `style`. Honors `prefers-reduced-motion`. Details: `magicui/morphing-text/SKILL.md`.

## magicui/retro-grid

CSS-only retro perspective grid floor that scrolls toward the viewer, with a bottom fade. React only. Fill a positioned parent.

```jsx
import { RetroGrid } from './magicui/retro-grid/src/RetroGrid';

<div style={{ position: 'relative', height: 360, overflow: 'hidden' }}><RetroGrid /></div>
```

Props: `angle`, `cellSize`, `opacity`, `lineColor`, `fadeColor`, `className`, `style`. Details: `magicui/retro-grid/SKILL.md`.

## magicui/scroll-based-velocity

Endless marquee rows whose speed/direction react to page scroll velocity (motion). React + motion.

```jsx
import { ScrollVelocityContainer, ScrollVelocityRow } from './magicui/scroll-based-velocity/src/ScrollBasedVelocity';

<ScrollVelocityContainer>
  <ScrollVelocityRow baseVelocity={10} direction={1}>CREATIVE • DESIGN • MOTION • </ScrollVelocityRow>
</ScrollVelocityContainer>
```

Props (row): `baseVelocity`, `direction`, `scrollReactivity`, `className`. Details: `magicui/scroll-based-velocity/SKILL.md`.

## magicui/shiny-button

CTA button whose label has a travelling light mask and whose border lights up in sync (motion). React + motion.

```jsx
import { ShinyButton } from './magicui/shiny-button/src/ShinyButton';

<ShinyButton>Get Started</ShinyButton>
```

Props: button/motion props, `className`, `children`. Details: `magicui/shiny-button/SKILL.md`.

## magicui/typing-animation

Typewriter effect with a blinking cursor; single string or cycling `words`. React + motion (`useInView`).

```jsx
import { TypingAnimation } from './magicui/typing-animation/src/TypingAnimation';

<TypingAnimation words={['build faster', 'ship smarter']} loop />
```

Props: `children`, `words`, `typeSpeed`, `deleteSpeed`, `delay`, `pauseDelay`, `loop`, `as`, `startOnView`, `showCursor`, `blinkCursor`, `cursorStyle`, `className`. Details: `magicui/typing-animation/SKILL.md`.

## Adding a new component

1. Create `<library>/<component-name>/` with `SKILL.md`, `LICENSE.md` (keep upstream notices), and `src/<Component>.jsx` + `src/<Component>.css`.
2. Render a demo in `src/App.jsx`.
3. Register it in the table above and in `metadata.components`.
4. Install any deps and confirm `npm install && npm run build`.
5. Only redistribute third-party source when its license permits it (Magic UI is MIT; react-bits is MIT + Commons Clause, which does **not** allow redistributing the components themselves).

## Licensing

- The repository is MIT-licensed — see the root `LICENSE`.
- `magicui/*` components are based on Magic UI (MIT) — see each skill's `LICENSE.md` (which also references the root license).
- No react-bits component source is included in this repository.
