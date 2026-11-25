# UI Collection Lab

A runnable Vite + React playground and skill repository. Components are grouped by source library, and each ships its full source so it can be copied into a project.

Currently: **magicui/** — `animated-circular-progress-bar`, `dia-text-reveal`, `globe`, `icon-cloud`, `meteors`, `morphing-text`, `retro-grid`, `scroll-based-velocity`, `shiny-button`, `typing-animation` (all black-gray, based on Magic UI, MIT).

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

### magicui/retro-grid
CSS-only perspective grid floor that scrolls toward the viewer. React only.

```jsx
import { RetroGrid } from './magicui/retro-grid/src/RetroGrid';
<div style={{ position: 'relative', height: 360, overflow: 'hidden' }}><RetroGrid /></div>
```

### magicui/scroll-based-velocity
Kinetic marquee rows that react to scroll velocity (motion). React + motion.

```jsx
import { ScrollVelocityContainer, ScrollVelocityRow } from './magicui/scroll-based-velocity/src/ScrollBasedVelocity';
<ScrollVelocityContainer>
  <ScrollVelocityRow baseVelocity={10}>CREATIVE • DESIGN • MOTION • </ScrollVelocityRow>
</ScrollVelocityContainer>
```

### magicui/shiny-button
Button with a looping light-sweep mask + border shine (motion). React + motion.

```jsx
import { ShinyButton } from './magicui/shiny-button/src/ShinyButton';
<ShinyButton>Get Started</ShinyButton>
```

### magicui/typing-animation
Typewriter effect with blinking cursor; single string or looping words (motion useInView). React + motion.

```jsx
import { TypingAnimation } from './magicui/typing-animation/src/TypingAnimation';
<TypingAnimation words={['build faster', 'ship smarter']} loop />
```

See each skill's `SKILL.md` for props and theming.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build check
```

## 部署到 GitHub Pages

已部署：**https://pencil-yao.github.io/ui-collection-lab/**

仓库使用 `gh-pages` 分支发布：`.github/workflows/deploy.yml` 在 push 到 `main`/`master` 时自动构建，并把 `dist/` 推到 `gh-pages` 分支。生产构建使用相对路径（`base: './'`），所以可以在 `https://<user>.github.io/ui-collection-lab/` 这类项目子路径下正常加载。

### 首次推到 GitHub

```bash
git remote add origin git@github.com:<user>/ui-collection-lab.git
git push -u origin master
```

workflow 同时监听 `main` 和 `master`。

### 开启 GitHub Pages（新仓库首次）

在 GitHub 仓库中：`Settings` → `Pages` → `Build and deployment` → `Source` 选择 **Deploy from a branch**，分支选 **gh-pages** / **(root)**。

> 本仓库推送 `gh-pages` 分支后已被自动开启，无需再设置；若换了新仓库，按上面设置一次即可。

之后每次 push：`npm ci` → `npm run build` → `peaceiris/actions-gh-pages` 把 `dist/` 推到 `gh-pages` → 站点更新。也可在 Actions 页面手动 `Run workflow`。

> `node_modules/`、`dist/`、`out/` 已在 `.gitignore` 中忽略（构建在 CI 内完成，视频/封面等 `out/` 产物不随网页发布）。

## Licensing

The repository is MIT-licensed — see the root [`LICENSE`](./LICENSE). All components are based on Magic UI (MIT) — see each skill's `LICENSE.md` for the upstream notice. No react-bits component source is included (react-bits is MIT + Commons Clause and cannot be redistributed as components).
