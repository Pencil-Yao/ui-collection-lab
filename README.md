# UI Collection Lab

A runnable Vite + React playground and skill repository. Components are grouped by source library, and each ships its full source so it can be copied into a project.

Currently: **magicui/** — `animated-circular-progress-bar`, `dia-text-reveal`, `globe`, `icon-cloud`, `meteors`, `morphing-text` (all black-gray, based on Magic UI, MIT).

## Components

### magicui/animated-circular-progress-bar
Black-gray SVG circular progress gauge. Plain CSS, React only.

```jsx
import { AnimatedCircularProgressBar } from './magicui/animated-circular-progress-bar/src/AnimatedCircularProgressBar';
<AnimatedCircularProgressBar value={64} size={160} />
```

### magicui/dia-text-reveal
Gradient-sweep text reveal; single string or rotating array. Powered by `motion`.

```jsx
import { DiaTextReveal } from './magicui/dia-text-reveal/src/DiaTextReveal';
<DiaTextReveal repeat text={['build faster', 'ship smarter', 'scale easier']} />
```

### magicui/globe
Draggable, autorotating WebGL globe (cobe). Give it a positioned square parent.

```jsx
import { Globe } from './magicui/globe/src/Globe';
<div style={{ position: 'relative', width: 260, height: 260 }}><Globe /></div>
```

### magicui/icon-cloud
Rotating, draggable 3D sphere of icons or images. Plain CSS + DOM, React only.

```jsx
import { IconCloud } from './magicui/icon-cloud/src/IconCloud';
<div style={{ position: 'relative', width: 320, height: 320 }}><IconCloud icons={[<Logo />]} /></div>
```

### magicui/meteors
Decorative meteor-shower overlay. Pure CSS animation, React only.

```jsx
import { Meteors } from './magicui/meteors/src/Meteors';
<div style={{ position: 'relative', height: 320, overflow: 'hidden' }}><Meteors number={28} /></div>
```

### magicui/morphing-text
Gooey text morph via blur + SVG alpha-threshold filter. React only.

```jsx
import { MorphingText } from './magicui/morphing-text/src/MorphingText';
<div style={{ fontSize: 56 }}><MorphingText texts={['faster', 'smarter', 'together']} /></div>
```

See each skill's `SKILL.md` for props and theming.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build check
```

## Licensing

The repository is MIT-licensed — see the root [`LICENSE`](./LICENSE). All components are based on Magic UI (MIT) — see each skill's `LICENSE.md` for the upstream notice. No react-bits component source is included (react-bits is MIT + Commons Clause and cannot be redistributed as components).
