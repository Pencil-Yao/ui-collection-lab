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

## 部署到 GitHub Pages

仓库已包含 `.github/workflows/deploy.yml` 和 `public/.nojekyll`。生产构建使用相对路径（`base: './'`），因此既能部署到：

- `https://<user>.github.io/`（用户主页仓库）
- `https://<user>.github.io/ui-collection-lab/`（项目仓库）

### 1. 推送到 GitHub

```bash
git add -A
git commit -m "deploy: ui collection lab"
git branch -M main
git remote add origin git@github.com:<user>/ui-collection-lab.git
git push -u origin main
```

> 若已有 remote，直接 `git push` 即可。workflow 同时监听 `main` 和 `master`，当前分支是 `master` 也能触发。

### 2. 开启 GitHub Pages

在 GitHub 仓库中：`Settings` → `Pages` → `Build and deployment` → `Source` 选择 **GitHub Actions**。

> 这一步必须由仓库管理员手动开启一次（`GITHUB_TOKEN` 无权限自动创建 Pages 站点）。开启后，重新运行 Actions 里的 deploy workflow，或再 push 一次即可发布。

之后每次 push 到 `main` / `master`，workflow 会：

1. 使用 Node 24 `npm ci`
2. `npm run build`
3. 上传 `dist/`
4. 发布到 GitHub Pages

站点地址：

```text
https://<user>.github.io/ui-collection-lab/
```

首次部署需要几十秒到几分钟；后续 push 自动更新。

> 注意：`node_modules/`、`dist/`、`out/` 已在 `.gitignore` 中忽略（构建在 CI 内完成，视频/封面等 `out/` 产物不随网页发布）。

## Licensing

The repository is MIT-licensed — see the root [`LICENSE`](./LICENSE). All components are based on Magic UI (MIT) — see each skill's `LICENSE.md` for the upstream notice. No react-bits component source is included (react-bits is MIT + Commons Clause and cannot be redistributed as components).
