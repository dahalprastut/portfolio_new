# Style Guide — Prastut Dahal Portfolio

> **Design Philosophy:** Cuberto's editorial confidence meets Apple's frosted-glass depth.
> Every pixel earns its place. Typography commands. Glass surfaces breathe. Motion feels physical.

---

## 1. Typography

### Font Stack

| Role | Font | Weight Range | Source |
|------|------|-------------|--------|
| **Display** | Instrument Serif | 400 (Regular, Italic) | `next/font/google` |
| **Body** | Manrope | 300–800 (Variable) | `next/font/google` |
| **Mono** | JetBrains Mono | 400–700 | `next/font/google` |

### Loading Strategy

All fonts loaded via `next/font/google` with `display: 'swap'` and exposed as CSS variables
through Next.js's font variable system:

```tsx
// app/layout.tsx
import { Instrument_Serif, Manrope, JetBrains_Mono } from 'next/font/google'

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  display: 'swap',
  style: ['normal', 'italic'],
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})
```

### Type Scale

#### Display (Instrument Serif)

Used for hero headlines, section marquees, and dramatic emphasis. Always serif.
Set with `letter-spacing: -0.04em` and `line-height: 1.0–1.1`.

| Token | Size | Usage |
|-------|------|-------|
| `--text-display-hero` | `clamp(3.5rem, 8vw + 1rem, 10rem)` | Hero name, primary headline |
| `--text-display-section` | `clamp(2.5rem, 5vw + 1rem, 6rem)` | Section titles ("ABOUT ME", "SAY HI!!") |
| `--text-display-project` | `clamp(2rem, 4vw + 0.5rem, 4.5rem)` | Project names on case study pages |

**Display Rules:**
- Always `font-family: var(--font-display)`
- Tracking: `--tracking-tighter` (-0.04em)
- Line height: `--leading-none` (1.0) or `--leading-tight` (1.1)
- Color: `--color-ink` on dark, `--color-ink-dark` on light
- Use italic variant for emphasis within display text (e.g., "React JS" in hero)

#### Headings (Manrope — Semibold/Bold)

| Token | Size | Weight | Usage |
|-------|------|--------|-------|
| `--text-h1` | `clamp(2rem, 3vw, 3.5rem)` | 700 | Page titles, major headings |
| `--text-h2` | `clamp(1.5rem, 2vw, 2.5rem)` | 600 | Sub-section headers |
| `--text-h3` | `clamp(1.25rem, 1.5vw, 1.75rem)` | 600 | Card titles, feature labels |
| `--text-h4` | `1.25rem` | 600 | Small section labels |

#### Body (Manrope — Regular/Medium)

| Token | Size | Weight | Usage |
|-------|------|--------|-------|
| `--text-body-xl` | `1.375rem` | 400 | Hero subtitle, pull quotes |
| `--text-body-lg` | `1.125rem` | 400 | Introductory paragraphs |
| `--text-body` | `1rem` | 400 | Default body copy |
| `--text-body-sm` | `0.875rem` | 500 | Captions, metadata, dates |

#### Utility (Manrope / JetBrains Mono)

| Token | Size | Weight | Usage |
|-------|------|--------|-------|
| `--text-caption` | `0.75rem` | 500 | Tiny labels, footnotes |
| `--text-overline` | `0.6875rem` | 600 | Overlines, categories (uppercase + wide tracking) |

### Typography Patterns

**Hero Headline:**
```
font: var(--font-display)
size: var(--text-display-hero)
weight: 400
tracking: -0.04em
line-height: 1.0
color: var(--color-ink)
```

**Section Marquee (repeating text banner):**
```
font: var(--font-display)
size: var(--text-display-section)
weight: 400
tracking: -0.02em
text-transform: uppercase
opacity: varies (0.3 for outline, 1.0 for filled)
animation: marquee 20s linear infinite
```

**Overline Label (e.g., "Client", "Responsibility"):**
```
font: var(--font-body)
size: var(--text-overline)
weight: 600
tracking: 0.1em
text-transform: uppercase
color: var(--color-ink-secondary)
```

**Tech Tag:**
```
font: var(--font-mono)
size: var(--text-caption)
weight: 500
tracking: 0.05em
text-transform: uppercase
padding: 4px 10px
border-radius: var(--radius-full)
background: var(--glass-bg)
border: 1px solid var(--glass-border)
```

---

## 2. Color System

### Dark Theme (Primary — 90% of pages)

The portfolio is predominantly dark. The void-black canvas makes glassmorphism
surfaces pop and creates dramatic contrast with white serif typography.

| Role | Token | Value | Usage |
|------|-------|-------|-------|
| Page BG | `--color-void` | `#030303` | Root background |
| Card BG | `--color-surface` | `#0A0A0A` | Card/section backgrounds |
| Raised BG | `--color-surface-raised` | `#111111` | Elevated panels |
| Subtle BG | `--color-surface-subtle` | `#1A1A1A` | Hover states, borders |
| Primary Text | `--color-ink` | `#EDEDED` | Headlines, body copy |
| Secondary Text | `--color-ink-secondary` | `#999999` | Descriptions, meta |
| Tertiary Text | `--color-ink-tertiary` | `#666666` | Labels, placeholders |
| Ghost Text | `--color-ink-ghost` | `#333333` | Watermarks, outlines |

### Light Theme (Case Study Pages Only)

Clean white for project detail pages — editorial feel like references 6–10.

| Role | Token | Value | Usage |
|------|-------|-------|-------|
| Page BG | `--color-paper` | `#FAFAF8` | Warm off-white background |
| Card BG | `--color-paper-raised` | `#FFFFFF` | Pure white surfaces |
| Subtle BG | `--color-paper-subtle` | `#F0EFEB` | Section dividers |
| Primary Text | `--color-ink-dark` | `#1A1A1A` | Headlines, body |
| Secondary Text | `--color-ink-dark-secondary` | `#555555` | Descriptions |
| Tertiary Text | `--color-ink-dark-tertiary` | `#888888` | Labels |

### Accent Colors

| Name | Token | Value | Usage |
|------|-------|-------|-------|
| **Ember** | `--color-accent` | `#FF4D1A` | Primary CTAs, "Hire Me" button, active links |
| Ember Hover | `--color-accent-hover` | `#E6441A` | Hover state for accent |
| Ember Soft | `--color-accent-soft` | `rgba(255,77,26,0.15)` | Accent backgrounds, glows |
| **Signal Blue** | `--color-accent-blue` | `#2563EB` | Tech tags, secondary links, project labels |
| Blue Soft | `--color-accent-blue-soft` | `rgba(37,99,235,0.12)` | Blue tag backgrounds |

### Color Application Rules

1. **Never use pure white (#FFFFFF) as text on dark** — use `--color-ink` (#EDEDED) instead
2. **Accent color is reserved for interactive elements** — buttons, links, hover states
3. **Text hierarchy uses exactly 3 levels** — primary, secondary, tertiary. No more.
4. **Glass surfaces derive from background context** — dark glass on dark pages, light glass on light
5. **Accent glow only on hover/focus** — never static; it must feel earned

---

## 3. Spacing & Layout

### Philosophy

Inspired by Cuberto's extreme generosity with whitespace. Sections don't just have padding —
they *breathe*. The space between elements communicates hierarchy as much as size or weight.

### Grid System

```
Container max-width:    1440px
Container padding:      clamp(1.5rem, 5vw, 6rem)  — 24px mobile, 96px desktop
Narrow container:       960px  — for text-heavy content
Wide container:         1600px — for full-bleed sections
Column grid:            12 columns with 24px (1.5rem) gutter
```

### Section Spacing

| Level | Token | Range | Usage |
|-------|-------|-------|-------|
| Small | `--section-gap-sm` | 4–8rem | Between tightly related sections |
| Medium | `--section-gap-md` | 6–12rem | Standard section spacing |
| Large | `--section-gap-lg` | 8–16rem | Major section breaks |
| Extra Large | `--section-gap-xl` | 10–25rem | Hero-level dramatic spacing |

### Spacing Rules

1. **Component internal spacing:** Use `--space-*` tokens (4px increments)
2. **Between components in a section:** Use `--space-8` to `--space-16` (32–64px)
3. **Between sections:** Use `--section-gap-*` tokens (minimum 4rem)
4. **Mobile sections:** Never less than `--space-16` (4rem/64px) between sections
5. **Hero section:** Minimum `--section-gap-xl` below it — let the hero command the viewport

### Responsive Breakpoints

| Name | Width | Design Target |
|------|-------|--------------|
| Default | 0px | Mobile (375px design target) |
| `sm` | 640px | Large phones / landscape |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small laptops |
| `xl` | 1280px | Desktop |
| `2xl` | 1536px | Large monitors |

---

## 4. Glassmorphism

### The Glass System

Three tiers of glass intensity, each designed for specific contexts:

#### Tier 1: Subtle Glass
- Barely-there frosted effect
- Use for: section backgrounds, large panels, page-level overlays
- `background: rgba(255,255,255,0.03)` + `blur(8px)`

#### Tier 2: Standard Glass
- Clearly frosted, the default glass surface
- Use for: cards, navbar, dropdown menus, tooltips
- `background: rgba(255,255,255,0.06)` + `blur(16px)`

#### Tier 3: Prominent Glass
- Bold frosted surface, high visibility
- Use for: buttons, CTAs, modals, focused elements
- `background: rgba(255,255,255,0.10)` + `blur(40px)`

### Glass Construction Recipe

Every glass surface is built from these layers (bottom to top):

```
1. Background:     rgba(255, 255, 255, 0.03–0.15)
2. Backdrop filter: blur(8–40px) saturate(180%)
3. Border:         1px solid rgba(255, 255, 255, 0.06–0.18)
4. Inner glow:     inset 0 1px 0 0 rgba(255, 255, 255, 0.08)
5. Shadow:         layered multi-stop shadow for depth
```

### Glass Rules

1. **Glass needs a busy background** — glass on a solid color looks flat. Ensure the
   background behind glass surfaces has visual content (images, gradients, other elements)
2. **Limit glass nesting** — never put a glass surface inside another glass surface
3. **Glass borders are mandatory** — without a subtle border, glass surfaces disappear
4. **Inner glow sells the effect** — the `inset 0 1px 0` highlight mimics light hitting
   the top edge of a real glass panel
5. **Performance: use `will-change: backdrop-filter`** on animated glass elements and
   remove it when animation completes
6. **Safari needs `-webkit-backdrop-filter`** — always include the prefixed version

### Glassmorphism in Tailwind v4

```html
<!-- Standard glass card -->
<div class="bg-white/6 backdrop-blur-md border border-white/10
            shadow-lg rounded-2xl
            [box-shadow:inset_0_1px_0_0_rgba(255,255,255,0.08)]">
  ...
</div>

<!-- Glass button -->
<button class="bg-white/6 backdrop-blur-md border border-white/10
               rounded-full px-6 py-3
               hover:bg-white/10 hover:border-white/18
               transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]">
  ...
</button>
```

---

## 5. Animation & Motion

### Easing Philosophy

> "Nothing moves linearly. Everything decelerates. The world has friction."

All motion uses Cuberto's signature exponential ease-out: `cubic-bezier(0.16, 1, 0.3, 1)`.
This creates motion that starts fast and settles gently — like an object coming to rest.

### Easing Curves

| Token | Curve | Feel | Usage |
|-------|-------|------|-------|
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Snap + settle | **Primary** — 90% of transitions |
| `--ease-out-quint` | `cubic-bezier(0.22, 1, 0.36, 1)` | Smooth deceleration | Scroll reveals, page transitions |
| `--ease-out-back` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Overshoot + bounce | Cursor state changes, toast popups |
| `--ease-spring` | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | Spring | Button press, toggle states |
| `--ease-in-expo` | `cubic-bezier(0.7, 0, 0.84, 0)` | Accelerate out | Exit animations only |

### Duration Scale

| Token | Time | Usage |
|-------|------|-------|
| `--duration-instant` | 100ms | Color changes, opacity toggles |
| `--duration-fast` | 200ms | Hover states, micro-feedback |
| `--duration-normal` | 350ms | Button animations, card hover |
| `--duration-smooth` | 500ms | Glass transitions, navbar show/hide |
| `--duration-slow` | 800ms | Page section reveals, text animations |
| `--duration-dramatic` | 1200ms | Hero entrance, project card image zoom |
| `--duration-glacial` | 2000ms | Full page transitions, background shifts |

### Animation Patterns

#### 1. Scroll Reveal (Fade Up)
Elements fade in and translate up 30px as they enter the viewport.
Stagger children by 60ms increments.

```tsx
// Use Intersection Observer or Framer Motion
animation: fade-in-up 800ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
```

#### 2. Text Reveal (Cuberto-style)
Each line/word clips from below with a slight rotation.
Wrapped in `overflow: hidden` container.

```tsx
// Each line wraps in overflow-hidden container
animation: text-reveal 800ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
// Stagger each line by 100ms
```

#### 3. Button Hover (Ripple Fill)
Background color fills upward from bottom using a pseudo-element.
Text slides up to reveal duplicate text below.

```css
.btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--color-accent);
  transform: translateY(100%);
  transition: transform 500ms cubic-bezier(0.16, 1, 0.3, 1);
}
.btn:hover::before { transform: translateY(0); }
```

#### 4. Project Card Hover
Image scales from 1.0 to 1.05 over 1.2s.
Video overlay fades in with 500ms delay.
Title text shifts up 4px.

#### 5. Navbar Show/Hide
Translates Y on scroll direction change.
Uses glass blur that intensifies on scroll.

#### 6. Section Marquee
Continuous horizontal scroll of repeated section titles.
Speed: 20s per cycle. Uses `will-change: transform` for GPU acceleration.

### Motion Rules

1. **No animation on first paint above the fold** — hero content renders immediately
2. **Below-fold elements animate once** — triggered by Intersection Observer, never replays
3. **Hover animations are instant-start** — never add delay to hover states
4. **Exit animations are faster than enter** — 60% of enter duration
5. **Respect `prefers-reduced-motion`** — disable all non-essential motion
6. **GPU-accelerate transforms** — use `translateZ(0)` or `will-change: transform`
7. **Stagger delays cap at 600ms** — beyond that, users lose attention

---

## 6. Shadows & Elevation

### Elevation Model

Five elevation levels, each with multi-layered shadows for realistic diffusion:

| Level | Token | Usage |
|-------|-------|-------|
| 0 | None | Flat elements on surface |
| 1 | `--shadow-xs` | Subtle lift, input fields |
| 2 | `--shadow-sm` | Cards at rest, tags |
| 3 | `--shadow-md` | Cards on hover, dropdowns |
| 4 | `--shadow-lg` | Modals, floating elements |
| 5 | `--shadow-xl` | Full overlays, hero media |

### Shadow Rules

1. Shadows are always **multi-layered** (2–4 layers) for realistic falloff
2. On dark backgrounds, shadows use higher opacity (0.3–0.6)
3. On light backgrounds, shadows use lower opacity (0.04–0.1)
4. **Glow shadows** (`--shadow-glow-accent`) used only on accent-colored elements on hover
5. Glass surfaces combine inner glow with external shadow for depth

---

## 7. Borders & Dividers

| Context | Style |
|---------|-------|
| Glass surface border | `1px solid rgba(255,255,255,0.10)` |
| Section divider (dark) | `1px solid rgba(255,255,255,0.06)` |
| Section divider (light) | `1px solid rgba(0,0,0,0.06)` |
| Input border default | `1px solid rgba(255,255,255,0.12)` |
| Input border focus | `1px solid var(--color-accent)` |
| Card border hover | `1px solid rgba(255,255,255,0.18)` |

---

## 8. Iconography

### Approach

Minimal icon usage. When needed:

- **Style:** Outline/stroke icons, 1.5px stroke weight
- **Size scale:** 16px (inline), 20px (buttons), 24px (navigation), 32px (features)
- **Library:** Lucide React (consistent with modern Next.js ecosystem)
- **Color:** Inherits text color via `currentColor`
- **Interaction icons:** Arrow-right for links, external-link for outbound, menu for nav

### Custom Cursor States

| State | Visual | Trigger |
|-------|--------|---------|
| Default | 16px white circle | Default |
| Pointer | 48px circle + text label | Hovering interactive elements |
| Text | 4px vertical line | Over text content |
| Action | 80px circle + "View" label | CTA buttons |
| Media | 120px circle + "Explore" | Project cards |
| Menu | 48px circle + "Menu" | Hamburger icon |

---

## 9. Imagery & Media

### Project Images

- **Aspect ratio:** 500:675 (portrait) for project cards, 16:9 for case study hero
- **Treatment:** Slight desaturation (90% saturation) at rest, full saturation on hover
- **Border radius:** `--radius-lg` (14px) for card images
- **Hover:** Scale 1.0 to 1.05 over 1200ms with `overflow: hidden` on container

### Gallery

- **Layout:** Horizontal scrollable strip (drag-to-scroll)
- **Thumbnail aspect ratio:** 4:5
- **Gap:** `--space-6` (24px)
- **Cursor:** Custom "Drag" state when hovering gallery
- **Scroll behavior:** Smooth with momentum/inertia (CSS `scroll-snap-type: x mandatory`)

---

## 10. Accessibility

### Color Contrast

All text meets WCAG AA minimum:
- `--color-ink` on `--color-void`: 16.5:1 (AAA)
- `--color-ink-secondary` on `--color-void`: 8.2:1 (AAA)
- `--color-ink-tertiary` on `--color-void`: 4.5:1 (AA)
- `--color-accent` on `--color-void`: 5.4:1 (AA)
- `--color-ink-dark` on `--color-paper`: 15.8:1 (AAA)

### Focus States

- All interactive elements have visible focus indicators
- Focus ring: `2px solid var(--color-accent)` with `2px offset`
- Focus ring on glass surfaces: `2px solid rgba(255,77,26,0.6)` with glow
- Tab order follows visual reading order

### Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Semantic Structure

- Single `<h1>` per page (hero headline or project name)
- Logical heading hierarchy (h1 > h2 > h3, no skipping)
- Landmark regions: `<nav>`, `<main>`, `<footer>`, `<section>` with `aria-label`
- All images have descriptive `alt` text
- Interactive elements have `aria-label` when text is not visible

---

## 11. Responsive Strategy

### Mobile-First Approach

Design at 375px width first, then enhance at each breakpoint.

| Breakpoint | Typography Scale | Section Spacing | Layout Changes |
|------------|-----------------|-----------------|----------------|
| Mobile (0–639px) | Display: 3.5rem, Body: 1rem | `--section-gap-sm` | Single column, full-width cards |
| Tablet (640–1023px) | Display: 5rem | `--section-gap-md` | 2-column project grid |
| Laptop (1024–1279px) | Display: 7rem | `--section-gap-md` | Full nav visible, 2-col grid |
| Desktop (1280–1535px) | Display: 9rem | `--section-gap-lg` | Max container, generous padding |
| Large (1536px+) | Display: 10rem | `--section-gap-xl` | Extreme whitespace, cinematic |

### Mobile-Specific Rules

1. **Custom cursor disabled** — touch devices use native interactions
2. **Glass blur reduced** — `blur(8px)` max on mobile for performance
3. **Animation reduced** — simpler reveals, no parallax, no stagger beyond 3 items
4. **Navigation** — full-screen glass overlay menu on mobile
5. **Project cards** — full-width, stacked vertically, no hover video
6. **Section marquee** — reduced speed, smaller font size
7. **Touch targets** — minimum 44x44px for all interactive elements
