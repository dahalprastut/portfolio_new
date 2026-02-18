# Design System — Prastut Dahal Portfolio

> **Cuberto Editorial x Apple Glassmorphism**

A comprehensive design system for the portfolio redesign of prastutdahal.com,
built for Next.js 16 + React 19 + Tailwind CSS v4 + TypeScript.

---

## Design Philosophy

**Three pillars define this design system:**

### 1. Cuberto's Editorial Confidence
Massive serif typography that commands the viewport. Generous whitespace that makes every
element feel intentional. Layered micro-interactions — ripple fills, text reveals, cursor
state machines — that signal craftsmanship. Nothing decorative without purpose.

### 2. Apple's Frosted Glass Depth
Glassmorphism as a structural element, not decoration. Frosted surfaces with precisely
calibrated blur, saturation, and inner-glow create a material hierarchy. Every glass panel
feels like it exists in physical space — you sense the layers.

### 3. Dark Canvas, Light Detail
The portfolio lives on a near-black void (#030303). This isn't "dark mode" — it's a
deliberate canvas choice. Dark backgrounds make glass surfaces glow, white serif text
pop, and accent colors burn. Case study pages flip to warm white for editorial clarity.

---

## File Index

| File | Purpose |
|------|---------|
| [`design-tokens.css`](./design-tokens.css) | All CSS custom properties — colors, typography, spacing, glass, shadows, animation, z-index, cursor, aspect ratios. Import this into your globals.css. |
| [`style-guide.md`](./style-guide.md) | Comprehensive visual rules — typography scale & usage, color application, spacing philosophy, glassmorphism construction, animation patterns, responsive strategy, accessibility. |
| [`component-specs.md`](./component-specs.md) | Detailed specs for every component — structure, props, variants, dimensions, hover behavior, animation sequences, Tailwind class patterns, and dependency tree. |
| [`references/`](./references/) | 14 reference images showing the current site, target design direction, and Cuberto inspiration. |

---

## Tech Stack Integration

### Fonts via next/font/google

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`
      ${instrumentSerif.variable}
      ${manrope.variable}
      ${jetbrainsMono.variable}
    `}>
      <body>{children}</body>
    </html>
  )
}
```

### Design Tokens in Tailwind CSS v4

Tailwind v4 uses CSS-first configuration. Tokens are loaded via `@import` in
globals.css and exposed through `@theme inline {}`:

```css
/* app/globals.css */
@import "tailwindcss";
@import "../docs/design/design-tokens.css";

@theme inline {
  /* Map tokens to Tailwind utilities */
  --color-background: var(--color-void);
  --color-foreground: var(--color-ink);
  --color-accent: var(--color-accent);

  --font-display: var(--font-display);
  --font-body: var(--font-body);
  --font-mono: var(--font-mono);

  /* Tailwind will auto-generate utilities for these */
}
```

### Using Tokens in Components

```tsx
// Direct CSS variable usage in Tailwind classes
<h1 className="font-[var(--font-display)] text-[var(--text-display-hero)]
               tracking-[-0.04em] leading-none text-[var(--color-ink)]">
  Prastut Dahal
</h1>

// Glass surface via utility class
<div className="glass rounded-2xl p-8">
  Card content
</div>

// Glass surface via Tailwind classes
<button className="bg-white/6 backdrop-blur-md border border-white/10
                   rounded-full px-6 py-3
                   hover:bg-white/10 hover:border-white/18
                   transition-all duration-350
                   ease-[cubic-bezier(0.16,1,0.3,1)]">
  Glass Button
</button>
```

### Recommended Project Structure

```
app/
├── globals.css              ← imports tokens + Tailwind config
├── layout.tsx               ← fonts + global providers
├── page.tsx                 ← home page (dark theme)
├── work/
│   └── [slug]/
│       └── page.tsx         ← case study pages (light theme)
│
components/
├── CustomCursor.tsx
├── Navbar.tsx
├── MobileMenu.tsx
├── Hero.tsx
├── SectionMarquee.tsx
├── ProjectCard.tsx
├── About.tsx
├── Skills.tsx
├── Gallery.tsx
├── Contact.tsx
├── Footer.tsx
├── GlassButton.tsx
├── RippleButton.tsx
├── TechTag.tsx
├── TextReveal.tsx
├── PageTransition.tsx
├── ScrollProgress.tsx
│
hooks/
├── useScrollDirection.ts
├── useMousePosition.ts
├── useInView.ts
│
docs/
└── design/
    ├── README.md            ← you are here
    ├── design-tokens.css
    ├── style-guide.md
    ├── component-specs.md
    └── references/
        └── 1.png – 14.png
```

---

## Color Palette Quick Reference

### Dark Theme (Primary)

```
Void          #030303    ████████  Page background
Surface       #0A0A0A    ████████  Cards, sections
Raised        #111111    ████████  Elevated panels
Subtle        #1A1A1A    ████████  Hover states

Ink           #EDEDED    ████████  Primary text
Ink Secondary #999999    ████████  Descriptions
Ink Tertiary  #666666    ████████  Labels
Ink Ghost     #333333    ████████  Watermarks
```

### Accents

```
Ember         #FF4D1A    ████████  Primary CTA, active links
Ember Hover   #E6441A    ████████  Hover state
Signal Blue   #2563EB    ████████  Tech tags, secondary
```

### Light Theme (Case Studies)

```
Paper         #FAFAF8    ████████  Page background
Paper Raised  #FFFFFF    ████████  White surfaces
Paper Subtle  #F0EFEB    ████████  Section dividers

Ink Dark      #1A1A1A    ████████  Primary text
Ink Dark Sec  #555555    ████████  Descriptions
```

---

## Animation Quick Reference

| Pattern | Duration | Easing | Trigger |
|---------|----------|--------|---------|
| Hover color | 200ms | ease-out-expo | Mouse enter |
| Button hover | 350ms | ease-out-expo | Mouse enter |
| Card hover | 1200ms | ease-out-expo | Mouse enter |
| Scroll reveal | 800ms | ease-out-expo | Intersection |
| Text reveal | 800ms | ease-out-expo | Intersection |
| Page enter | 600ms | ease-out-quint | Route change |
| Page exit | 300ms | ease-in-expo | Route change |
| Nav show/hide | 500ms | ease-out-expo | Scroll direction |
| Glass transition | 500ms | ease-out-quint | State change |
| Marquee | 20s | linear | Continuous |

**Primary easing:** `cubic-bezier(0.16, 1, 0.3, 1)` — use this for 90% of animations.

---

## Glass Quick Reference

| Tier | BG Opacity | Blur | Use Case |
|------|-----------|------|----------|
| Subtle | 3% white | 8px | Large panels, section bg |
| Standard | 6% white | 16px | Cards, navbar, tooltips |
| Prominent | 10% white | 40px | Buttons, CTAs, modals |

**Every glass surface needs:** background + backdrop-filter + border + inner-glow + shadow.

---

## Implementation Priority

Build components in this order for fastest visual impact:

1. **Layout + Fonts** — globals.css, layout.tsx with font loading
2. **Custom Cursor** — immediately signals craft quality
3. **Navbar** — glass navbar anchors the page
4. **Hero** — hero section with text reveal, massive typography
5. **Glass Button + Ripple Button** — reusable across all sections
6. **Project Cards** — the portfolio's core content
7. **Section Marquee** — dramatic section headers
8. **About + Skills** — text-heavy but important
9. **Gallery** — drag interaction
10. **Contact + Footer** — closing sections
11. **Case Study Pages** — light theme detail pages
12. **Page Transitions** — polish layer
13. **Scroll Progress** — finishing touch
