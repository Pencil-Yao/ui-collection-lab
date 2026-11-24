# MagicBento

An interactive bento grid. Cards respond to a cursor spotlight, light up their borders and neighbors, can drift stars, tilt, magnetize toward the pointer and emit a click ripple. Built-in artwork visuals animate on intro / on click.

- Source: `magic-bento/src/MagicBento.jsx` + `magic-bento/src/MagicBento.css`
- Card visuals (separate skills): `magic-bento-insights`, `magic-bento-overview`, `magic-bento-teamwork`, `magic-bento-efficiency`, `magic-bento-connectivity`, `magic-bento-protection` — each `src/<Visual>.jsx`.
- Origin: react-bits (`Components/MagicBento`)
- Client component (`'use client'` directive) — safe in Next.js app router.

## Dependencies

```bash
npm i @hugeicons/react @hugeicons/core-free-icons
```

Used for the built-in `automation`, `integration` and `security` visuals. If you never use those visuals you can swap the imports for your own icons, but keep `@hugeicons` installed to run the file unmodified.

## Usage

```jsx
import MagicBento from './components/MagicBento/MagicBento';

<MagicBento columns={4} rowHeight={200} gap={12} radius={20} />
```

Default items are six feature cards using the six built-in visuals.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `MagicBentoItem[]` | six feature cards | Cards to show. |
| `items[].label` | `string` | – | Small header label. |
| `items[].icon` | `ReactNode` | – | Header icon node. |
| `items[].title` | `string` | – | Card title. |
| `items[].description` | `string` | – | Card description. |
| `items[].visual` | `ReactNode \| string` | – | Artwork between header and text. Built-ins: `analytics`, `dashboard`, `collaboration`, `automation`, `integration`, `security`. |
| `items[].content` | `ReactNode` | – | Replaces the whole card interior. Lights, border and click wave still apply. |
| `items[].image` | `string` | – | Photo filling the card, with a soft scrim under the text. |
| `items[].href` | `string` | – | Renders the card as an `<a>`. |
| `items[].target` / `items[].rel` | `string` | – | Passed to the anchor when `href` is set. |
| `items[].onClick` | `(event) => void` | – | Per-card click handler. |
| `items[].colSpan` | `number` | `1` | Columns spanned. |
| `items[].rowSpan` | `number` | `1` | Rows spanned. |
| `items[].id` | `string \| number` | index | React key. |
| `columns` | `number` | `4` | Columns on wide screens. Drops to 2, then 1, as width shrinks. |
| `rowHeight` | `number` | `200` | Height of one row, in px. |
| `gap` | `number` | `12` | Space between cards, in px. |
| `radius` | `number` | `20` | Card corner radius, in px. |
| `theme` | `'dark' \| 'light'` | `'dark'` | Color theme. |
| `glowColor` | `string` | text/ink color | Color of lights and accents. Hex or `"r, g, b"`. |
| `enableBorderGlow` | `boolean` | `true` | Lights up card edges near the cursor, across neighboring cards. |
| `enableSpotlight` | `boolean` | `true` | Soft light follows the cursor inside the hovered card. |
| `spotlightRadius` | `number` | `300` | Cursor light size, in px. |
| `enableStars` | `boolean` | `false` | Fine specks drift up around the cursor in the hovered card. |
| `particleCount` | `number` | `24` | Specks per card (clamped 0–120). |
| `enableTilt` | `boolean` | `false` | Tilts the hovered card toward the cursor (max 6°). |
| `enableMagnetism` | `boolean` | `false` | Hovered card leans a few px toward the cursor (max 6px). |
| `clickEffect` | `boolean` | `true` | Click sends a ring of light across the grid and replays artwork. |
| `textAutoHide` | `boolean` | `true` | Clamp titles to 1 line, descriptions to 2 lines. |
| `intro` | `boolean` | `true` | Cards rise in one by one and artwork plays when scrolled into view. |
| `disableAnimations` | `boolean` | `false` | Turns off all motion. `prefers-reduced-motion` does the same. |
| `onItemClick` | `(item, index) => void` | – | Fires on card click; makes cards focusable buttons. |
| `className` | `string` | `''` | Extra classes on the grid root. |
| `style` | `CSSProperties` | – | Inline styles on the grid root. |

## Presets (from the upstream demo)

```js
classic: {}
ember:   { glowColor: '#f97316', enableStars: true, particleCount: 28 }
ocean:   { glowColor: '#38bdf8', spotlightRadius: 420 }
mint:    { glowColor: '#34d399', enableStars: true, particleCount: 18, spotlightRadius: 260 }
tilt:    { enableTilt: true, enableMagnetism: true }
quiet:   { enableSpotlight: false, spotlightRadius: 220 }
```

## Theming via CSS variables

The root sets `--mb-*` variables from the `dark` / `light` palettes. Override on the root (or an ancestor) to restyle without editing the component:

| Variable | Purpose |
| --- | --- |
| `--mb-surface` | Card background (gradient). |
| `--mb-edge`, `--mb-highlight` | Card rim border + top highlight. |
| `--mb-shadow` | Card drop shadow. |
| `--mb-tile`, `--mb-tile-edge`, `--mb-tile-highlight`, `--mb-tile-shadow` | Inner tiles (triggers, hub nodes, settings). |
| `--mb-well`, `--mb-well-edge` | Inset wells (document, steps list). |
| `--mb-ink`, `--mb-muted`, `--mb-faint`, `--mb-line` | Text + line colors. |
| `--mb-secondary`, `--mb-secondary-ink` | Secondary cursor. |
| `--mb-glow-rgb`, `--mb-accent-rgb`, `--mb-accent-ink` | Glow/accent RGB and the ink on top of it (set from `glowColor`). |
| `--mb-radius`, `--mb-inner-radius`, `--mb-pad` | Radius and padding (derived from `radius`). |
| `--mb-spot-size`, `--mb-border-size` | Spot and border light sizes (derived from `spotlightRadius`). |
| `--mb-glow-alpha`, `--mb-spot-alpha` | Glow/spot opacity per theme. |

Runtime variables written by the JS engine (read-only, do not set): `--mb-x`, `--mb-y`, `--mb-near`, `--mb-hot`, `--mb-rx`, `--mb-ry`, `--mb-tx`, `--mb-ty`, `--mb-press`, `--mb-wx`, `--mb-wy`, `--mb-wr`, `--mb-wa`, `--mb-delay`.

## Custom visual markers

If you write your own visual, the CSS animations are opt-in by class name. Wrap artwork in `.magic-bento__tile` (raised) or `.magic-bento__well` (inset) for consistent surfaces. The intro/click replay targets the class names registered in `REPLAY` / `FLOW` inside the JSX (`magic-bento-draw`, `magic-bento-fade`, `magic-bento-grow`, `magic-bento-pop`, …), so reuse those CSS class names to inherit the animation choreography.

## Accessibility

- Cards become focusable `button`-role elements when clickable; `Enter` / `Space` activate them.
- `prefers-reduced-motion: reduce` disables motion automatically; `disableAnimations` forces it off.
- Decorative artwork is `aria-hidden`.
