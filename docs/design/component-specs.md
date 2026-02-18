# Component Specifications — Prastut Dahal Portfolio

> Complete specs for every UI component. Each spec includes structure,
> props/variants, styling tokens, animation behavior, and Tailwind v4 class patterns.

---

## Table of Contents

1. [Custom Cursor](#1-custom-cursor)
2. [Navbar](#2-navbar)
3. [Hero Section](#3-hero-section)
4. [Section Marquee](#4-section-marquee)
5. [Project Card](#5-project-card)
6. [About Section](#6-about-section)
7. [Skills Grid](#7-skills-grid)
8. [Gallery Strip](#8-gallery-strip)
9. [Contact Section](#9-contact-section)
10. [Footer](#10-footer)
11. [Glass Button](#11-glass-button)
12. [Ripple Button](#12-ripple-button)
13. [Tech Tag](#13-tech-tag)
14. [Text Reveal](#14-text-reveal)
15. [Case Study Layout](#15-case-study-layout)
16. [Mobile Menu](#16-mobile-menu)
17. [Page Transition](#17-page-transition)
18. [Scroll Progress](#18-scroll-progress)

---

## 1. Custom Cursor

Cuberto-style custom cursor that replaces the default browser cursor.
Implemented as a fixed-position React component with state machine.

### File: `components/CustomCursor.tsx`

### Structure
```
<div class="cursor-dot" />       ← 16px inner dot
<div class="cursor-outline" />   ← 48px+ outer ring (scales per state)
```

### States

| State | Outer Size | Inner Size | Visual | Trigger |
|-------|-----------|-----------|--------|---------|
| `default` | 0px (hidden) | 16px | White filled circle | Default state |
| `pointer` | 48px | 8px | Ring expands, inner shrinks | `<a>`, `<button>` hover |
| `text` | 0px | 4px wide, 24px tall | Vertical line | Text content hover |
| `action` | 80px | 0px | Large ring + "View" text | CTA buttons |
| `media` | 120px | 0px | Large ring + "Explore" text | Project cards |
| `drag` | 80px | 0px | Ring + "Drag" text | Gallery strip |
| `hidden` | 0px | 0px | Invisible | Off-screen, touch device |

### Behavior
- Position: `fixed`, `pointer-events: none`, `z-index: var(--z-cursor)`
- Follows mouse with `requestAnimationFrame` + lerp (0.15 factor) for smooth trailing
- Inner dot: direct mouse position (no lerp)
- Outer ring: lerped position (slight delay creates organic feel)
- `mix-blend-mode: exclusion` on outer ring for contrast inversion
- **Disabled on touch devices** — detect via `(pointer: coarse)` media query

### Animation
- State transitions: `var(--duration-normal)` with `var(--ease-out-expo)`
- Scale transitions for size changes
- Text label fades in with 100ms delay after ring expansion

### Cursor Data Attributes
Components communicate cursor state via data attributes:
```html
<a data-cursor="pointer">Link</a>
<button data-cursor="action" data-cursor-label="Hire Me">CTA</button>
<div data-cursor="media" data-cursor-label="Explore">Project Card</div>
<div data-cursor="drag">Gallery</div>
```

### Tailwind Classes
```
Fixed pointer-events-none z-[9999]
mix-blend-exclusion
transition-[width,height,opacity] duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]
```

---

## 2. Navbar

Fixed glassmorphic navigation bar. Reveals/hides based on scroll direction.

### File: `components/Navbar.tsx`

### Structure
```html
<header>                            ← fixed top-0 w-full z-30
  <nav>                             ← container flex justify-between items-center
    <a class="logo">Prastut Dahal</a>
    <div class="nav-links">         ← hidden on mobile
      <a>Work</a>
      <a>About</a>
      <a>Contact</a>
    </div>
    <div class="nav-actions">
      <GlassButton>Hire Me</GlassButton>
      <button class="menu-toggle">Menu ≡</button>
    </div>
  </nav>
</header>
```

### Variants

| State | Background | Border | Transform |
|-------|-----------|--------|-----------|
| Top of page | `transparent` | `none` | `translateY(0)` |
| Scrolled down | `glass-subtle` | `border-b border-white/6` | `translateY(0)` |
| Scrolling down (past 300px) | — | — | `translateY(-100%)` |
| Scrolling up | `glass` (stronger blur) | `border-b border-white/10` | `translateY(0)` |

### Dimensions
- Height: `5rem` (80px) desktop, `4rem` (64px) mobile
- Logo: `font-body`, `--text-body-lg`, `--weight-bold`
- Nav links: `font-body`, `--text-body-sm`, `--weight-medium`, `--tracking-wide`
- Container padding: `var(--container-px)`

### Link Hover Animation
- Underline slides in from left: `scaleX(0)` to `scaleX(1)` with `transform-origin: left`
- Duration: `var(--duration-normal)`
- Easing: `var(--ease-out-expo)`

### "Hire Me" Button
- Uses `GlassButton` component with accent variant
- Pill shape: `border-radius: var(--radius-full)`
- Padding: `--space-3` vertical, `--space-6` horizontal

### Scroll Behavior (React Hook)
```tsx
// useScrollDirection hook
// Returns { direction: 'up' | 'down', scrollY: number, isAtTop: boolean }
// Threshold: 10px before direction change registers
// Transition: transform 500ms var(--ease-out-expo)
```

### Tailwind Classes
```
fixed top-0 left-0 right-0 z-30
transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]

/* Scrolled state */
bg-white/3 backdrop-blur-sm border-b border-white/6

/* Scrolled + glass state */
bg-white/6 backdrop-blur-md border-b border-white/10
[box-shadow:inset_0_1px_0_0_rgba(255,255,255,0.08)]
```

---

## 3. Hero Section

Full-viewport introductory section. The most dramatic element on the site.

### File: `components/Hero.tsx`

### Structure
```html
<section class="hero">              ← min-h-screen relative overflow-hidden
  <div class="hero-content">        ← container, centered vertically
    <p class="hero-greeting">       ← body font, secondary color
      Hello! I am <strong>Prastut Dahal</strong> & I specialize in
    </p>
    <h1 class="hero-title">         ← display font, massive
      React JS                      ← cycles through: React JS, Next JS, TypeScript
    </h1>
  </div>
  <div class="hero-media">          ← absolute positioned, right side
    <Image />                       ← 3D mockup of projects (ref image 1)
  </div>
  <div class="scroll-indicator">    ← bottom center, animated
    ↓ Scroll
  </div>
</section>
```

### Typography
- Greeting: `var(--font-body)`, `var(--text-body-xl)`, `var(--color-ink-secondary)`
- Name in greeting: `var(--weight-bold)`, `var(--color-ink)`
- Title: `var(--font-display)`, `var(--text-display-hero)`, `var(--color-ink)`
- Title italic variant for the specialization text

### Layout
- Desktop: Two-column — text left (60%), media right (40%)
- Mobile: Stacked — text on top, media below (or hidden)
- Vertical centering: Flexbox with generous top padding (`--section-gap-md`)
- Bottom padding: `--section-gap-lg` minimum

### Text Cycling Animation
The specialization ("React JS") cycles through values:
```
React JS → Next JS → TypeScript → Node JS
```
- Uses `text-reveal` keyframe (slide up from below)
- Each word visible for 3 seconds
- Transition: 800ms `var(--ease-out-expo)`
- Container: `overflow: hidden` to clip sliding text

### Hero Media
- 3D perspective mockup of project screenshots
- `perspective: 1000px` on container
- Subtle parallax: translates 2–5% on mouse move
- Glass glow behind media: `--shadow-glow-soft`

### Scroll Indicator
- Position: absolute bottom center
- Font: `--font-mono`, `--text-caption`, `--tracking-widest`
- Animation: `float` keyframe, 3s infinite
- Opacity: 0.5, fades out after 5s or first scroll

### Tailwind Classes
```
min-h-screen flex items-center relative overflow-hidden
bg-[var(--color-void)]

/* Hero title */
font-[var(--font-display)] text-[clamp(3.5rem,8vw+1rem,10rem)]
tracking-[-0.04em] leading-none text-[var(--color-ink)]
```

---

## 4. Section Marquee

Repeating horizontal text banner used for section headers (like "ABOUT ME", "SAY HI!!").
Inspired by reference images 3 and 5.

### File: `components/SectionMarquee.tsx`

### Props
```tsx
interface SectionMarqueeProps {
  text: string;           // e.g., "ABOUT ME", "SAY HI!!"
  speed?: number;         // seconds per cycle (default: 20)
  direction?: 'left' | 'right';
  variant?: 'filled' | 'outline' | 'mixed';  // text treatment
}
```

### Structure
```html
<div class="marquee-container">     ← overflow-hidden, full-width
  <div class="marquee-track">       ← flex, animate marquee
    <!-- Repeated 4x to ensure seamless loop -->
    <span class="filled">ABOUT ME</span>
    <span class="outline">ABOUT ME</span>
    <span class="filled">ABOUT ME</span>
    <span class="outline">ABOUT ME</span>
    <!-- ...duplicated -->
  </div>
</div>
```

### Typography
- Font: `var(--font-display)`
- Size: `var(--text-display-section)`
- Transform: `uppercase`
- Tracking: `--tracking-tight`
- Filled variant: `color: var(--color-ink)`
- Outline variant: `-webkit-text-stroke: 1.5px var(--color-ink); color: transparent`

### Animation
- `animation: marquee [speed]s linear infinite`
- Track contains content duplicated to fill 200% width
- `will-change: transform` for GPU acceleration
- Pauses on hover (optional)

### Spacing
- Vertical padding: `var(--section-gap-sm)` above and below
- Gap between text items: `var(--space-12)` (3rem)
- Separator character between items: ` — ` or decorative dot

---

## 5. Project Card

Showcase card for portfolio projects. Two-column grid layout on desktop.

### File: `components/ProjectCard.tsx`

### Props
```tsx
interface ProjectCardProps {
  title: string;             // "Itahari Medical"
  description: string;       // "Website Design and Development..."
  tags: string[];            // ["HTML", "SCSS", "GSAP"]
  image: string;             // static preview image
  video?: string;            // optional hover video
  href: string;              // link to case study
  layout?: 'large' | 'standard';  // large = full-width hero card
}
```

### Structure
```html
<article class="project-card" data-cursor="media" data-cursor-label="Explore">
  <div class="card-media">          ← aspect-ratio: 500/675, overflow-hidden, rounded
    <Image class="card-image" />    ← covers, scales on hover
    <video class="card-video" />    ← absolute overlay, fades in on hover
    <div class="card-overlay" />    ← gradient overlay bottom
    <span class="read-more">       ← glass pill, bottom-right
      Read More
    </span>
  </div>
  <div class="card-content">
    <span class="card-label">      ← overline style
      {title}
    </span>
    <h3 class="card-title">        ← heading style
      {description}
    </h3>
    <div class="card-tags">
      <TechTag>{tag}</TechTag>     ← for each tag
    </div>
  </div>
</article>
```

### Dimensions
- Card aspect ratio: `500 / 675` (portrait) for standard
- Image: fills card-media container with `object-fit: cover`
- Border radius: `var(--radius-xl)` (20px)
- Content padding: `var(--space-6)` top

### Layout Grid
```
Desktop (xl+):  2 columns, gap: var(--space-8)
                First card: large variant (spans more visual weight)
Tablet (md):    2 columns, equal size
Mobile:         1 column, full width
```

### Hover Behavior
1. **Image scale:** `1.0 → 1.05` over `var(--duration-dramatic)` (1200ms)
2. **Video reveal:** `opacity: 0 → 1` with 500ms delay, `var(--duration-smooth)`
3. **Card lift:** `translateY(0) → translateY(-4px)`
4. **Border glow:** `border-color: var(--glass-border) → var(--glass-border-strong)`
5. **"Read More" pill:** `opacity: 0 → 1`, `translateY(8px) → translateY(0)`
6. **Title shift:** `translateY(0) → translateY(-2px)`

### Video Behavior
- `autoPlay`, `muted`, `loop`, `playsInline`
- Loaded lazily, starts playing on hover
- Position: absolute, covers the image
- Transition: `opacity var(--duration-smooth) var(--ease-out-expo)`

### "Read More" Pill
- Glass button: `glass-button` class
- Pill shape: `var(--radius-full)`
- Font: `--font-mono`, `--text-caption`
- Position: absolute, bottom-right of media with `--space-4` offset

### Tailwind Classes
```
/* Card container */
group relative

/* Media */
aspect-[500/675] overflow-hidden rounded-[20px] relative

/* Image */
w-full h-full object-cover
transition-transform duration-1200 ease-[cubic-bezier(0.16,1,0.3,1)]
group-hover:scale-105

/* Video overlay */
absolute inset-0 object-cover opacity-0
transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
group-hover:opacity-100

/* Content */
pt-6 space-y-3

/* Label */
font-[var(--font-body)] text-[11px] font-semibold tracking-[0.1em] uppercase
text-[var(--color-ink-secondary)]

/* Title */
font-[var(--font-body)] text-[clamp(1.25rem,1.5vw+0.5rem,1.75rem)]
font-semibold text-[var(--color-ink)]
transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]
group-hover:-translate-y-0.5
```

---

## 6. About Section

Bio section with the "ABOUT ME" marquee header. Two-column layout:
large statement left, detailed bio right.

### File: `components/About.tsx`

### Structure
```html
<section>
  <SectionMarquee text="ABOUT ME" variant="mixed" />
  <div class="container grid grid-cols-1 lg:grid-cols-2 gap-16">
    <div class="about-statement">
      <h2>Multidisciplinary Web Developer with more than 4 years
          of experience in Front End Web Development</h2>
    </div>
    <div class="about-bio">
      <p>Hi! I am Prastut Dahal, a 25-year-old Web Developer...</p>
      <p>I love teaching as a passion...</p>
      <div class="about-links">
        <a>LinkedIn</a>
        <a>GitHub</a>
      </div>
    </div>
  </div>
</section>
```

### Typography
- Statement heading: `var(--font-display)`, `var(--text-h1)`, `var(--weight-bold)`
- Bio text: `var(--font-body)`, `var(--text-body-lg)`, `var(--color-ink-secondary)`
- Links: `var(--font-body)`, `var(--text-body-sm)`, `var(--color-accent)`

### Scroll Animation
- Statement: `text-reveal` animation, line by line, staggered 100ms
- Bio paragraphs: `fade-in-up`, staggered 60ms per paragraph
- Links: `fade-in-up` with 300ms extra delay

---

## 7. Skills Grid

Three-column breakdown of technical skills.

### File: `components/Skills.tsx`

### Structure
```html
<section>
  <div class="container grid grid-cols-1 md:grid-cols-3 gap-8">
    <div class="skill-card glass">
      <h3 class="skill-title">Design & Mockup</h3>
      <ul class="skill-list">
        <li>HTML</li>
        <li>CSS</li>
        <li>Bootstrap</li>
      </ul>
    </div>
    <!-- repeat for Front End, Back End -->
  </div>
</section>
```

### Card Styling
- Uses `.glass` utility class
- Border radius: `var(--radius-2xl)` (28px)
- Padding: `var(--space-8)` (2rem)
- Title: `var(--font-body)`, `var(--text-h3)`, `var(--weight-semibold)`
- List items: `var(--font-body)`, `var(--text-body)`, `var(--color-ink-secondary)`
- List spacing: `var(--space-3)` between items

### Hover
- Border brightens: `var(--glass-border) → var(--glass-border-strong)`
- Subtle lift: `translateY(-2px)`
- Background opacity increase: `0.06 → 0.10`

---

## 8. Gallery Strip

Horizontal draggable carousel showing project screenshots.

### File: `components/Gallery.tsx`

### Structure
```html
<section data-cursor="drag">
  <div class="gallery-track">      ← overflow-x-auto, flex, snap-x
    <div class="gallery-item">     ← flex-shrink-0, snap-center
      <Image />
    </div>
    <!-- repeat items -->
  </div>
</section>
```

### Dimensions
- Track: full viewport width, no container constraint
- Item width: `clamp(280px, 30vw, 400px)`
- Item aspect ratio: `var(--ratio-gallery-thumb)` (4:5)
- Gap: `var(--space-6)` (24px)
- First/last item padding: `var(--container-px)`

### Image Treatment
- Border radius: `var(--radius-lg)` (14px)
- `object-fit: cover`
- Desaturated at rest: `filter: saturate(0.9)`
- On hover: `filter: saturate(1)`, `scale(1.02)`

### Scroll Behavior
- CSS: `overflow-x: auto; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;`
- Hide scrollbar: `scrollbar-width: none; ::-webkit-scrollbar { display: none; }`
- Optional: JS drag-to-scroll with momentum (GSAP Draggable or custom)

### Cursor
- Changes to `drag` state (80px ring + "Drag" label)

---

## 9. Contact Section

"SAY HI!!" section with marquee, email, and social links.

### File: `components/Contact.tsx`

### Structure
```html
<section>
  <SectionMarquee text="SAY HI!!" variant="mixed" speed={15} />
  <div class="container text-center">
    <p class="contact-prompt">Wanna start a project? Say Hii</p>
    <a class="contact-email" href="mailto:dahalprastut@gmail.com">
      dahalprastut@gmail.com
    </a>
    <div class="contact-socials">
      <a href="#">LinkedIn</a>
      <a href="#">GitHub</a>
    </div>
  </div>
</section>
```

### Typography
- Prompt: `var(--font-body)`, `var(--text-body-lg)`, `var(--color-ink-secondary)`
- Email: `var(--font-display)`, `var(--text-h1)`, `var(--color-ink)`
- Email hover: underline appears (scaleX animation), color shifts to `var(--color-accent)`
- Socials: `var(--font-body)`, `var(--text-body)`, `var(--color-ink-tertiary)`

### Spacing
- Section padding: `var(--section-gap-lg)` top and bottom
- Gap between prompt and email: `var(--space-6)`
- Gap between email and socials: `var(--space-10)`

---

## 10. Footer

Minimal footer. Dark background matching void.

### File: `components/Footer.tsx`

### Structure
```html
<footer class="border-t border-white/6">
  <div class="container flex justify-between items-center py-8">
    <span>© 2026 Prastut Dahal</span>
    <span>Built with Next.js</span>
  </div>
</footer>
```

### Typography
- Font: `var(--font-mono)`, `var(--text-caption)`, `var(--color-ink-tertiary)`

---

## 11. Glass Button

Primary interactive button with glassmorphism styling.

### File: `components/GlassButton.tsx`

### Props
```tsx
interface GlassButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;                // renders as <a> if provided
  onClick?: () => void;
  icon?: React.ReactNode;       // optional trailing icon
  className?: string;
}
```

### Variants

| Variant | Background | Border | Text Color |
|---------|-----------|--------|-----------|
| `default` | `var(--glass-bg)` | `var(--glass-border)` | `var(--color-ink)` |
| `accent` | `var(--color-accent-soft)` | `rgba(255,77,26,0.3)` | `var(--color-accent)` |
| `outline` | `transparent` | `var(--glass-border-strong)` | `var(--color-ink)` |

### Sizes

| Size | Padding | Font Size | Height |
|------|---------|-----------|--------|
| `sm` | `8px 16px` | `--text-body-sm` | 36px |
| `md` | `12px 24px` | `--text-body` | 44px |
| `lg` | `16px 32px` | `--text-body-lg` | 52px |

### Styling
- Shape: `border-radius: var(--radius-full)` (pill)
- Backdrop filter: `blur(var(--glass-blur-md)) var(--glass-saturate)`
- Inner glow: `var(--glass-inner-glow)`
- Font: `var(--font-body)`, `var(--weight-medium)`

### Hover Animation
- Background opacity increases
- Border brightens
- Subtle lift: `translateY(-1px)`
- Shadow intensifies: `var(--shadow-sm) → var(--shadow-md)`
- Duration: `var(--duration-normal)`, `var(--ease-out-expo)`

### Active State
- `transform: translateY(0) scale(0.98)`
- Shadow reduces

### Focus State
- `outline: 2px solid var(--color-accent)`
- `outline-offset: 2px`

### Tailwind Pattern
```
inline-flex items-center justify-center gap-2
rounded-full font-[var(--font-body)] font-medium
bg-white/6 backdrop-blur-md border border-white/10
[box-shadow:inset_0_1px_0_0_rgba(255,255,255,0.08),0_1px_2px_rgba(0,0,0,0.2),0_2px_4px_rgba(0,0,0,0.15)]
hover:bg-white/10 hover:border-white/18 hover:-translate-y-px
active:translate-y-0 active:scale-[0.98]
transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]
focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]
```

---

## 12. Ripple Button

Cuberto-style button with color fill rising from bottom on hover.
Used for primary CTAs where higher visual impact is needed.

### File: `components/RippleButton.tsx`

### Props
```tsx
interface RippleButtonProps {
  children: React.ReactNode;
  color?: string;             // fill color (default: var(--color-accent))
  href?: string;
  onClick?: () => void;
  size?: 'md' | 'lg';
}
```

### Structure
```html
<button class="ripple-btn" data-cursor="action" data-cursor-label="View">
  <span class="ripple-bg" />       ← pseudo-element, fills from bottom
  <span class="ripple-text">       ← text with duplicate for slide effect
    <span class="text-top">{children}</span>
    <span class="text-bottom">{children}</span>
  </span>
</button>
```

### Hover Animation Sequence
1. `ripple-bg`: `translateY(100%) → translateY(0)` over 500ms `var(--ease-out-expo)`
2. `text-top`: `translateY(0) → translateY(-100%)` over 350ms
3. `text-bottom`: `translateY(100%) → translateY(0)` over 350ms (visible text slides in)

### Styling
- Background: `var(--color-surface-subtle)` at rest
- Fill color: `var(--color-accent)` on hover
- Text: `var(--color-ink)` at rest, `#FFFFFF` on hover
- Border radius: `var(--radius-full)`
- Padding: `16px 40px` (lg), `12px 28px` (md)
- Font: `var(--font-body)`, `var(--weight-semibold)`
- `overflow: hidden` on container for fill clip

---

## 13. Tech Tag

Small pill label for technology/skill tags on project cards.

### File: `components/TechTag.tsx`

### Props
```tsx
interface TechTagProps {
  children: string;
  variant?: 'default' | 'blue';
}
```

### Styling
- Background: `var(--glass-bg-subtle)` (default) or `var(--color-accent-blue-soft)` (blue)
- Border: `1px solid var(--glass-border-subtle)`
- Radius: `var(--radius-full)`
- Padding: `4px 10px`
- Font: `var(--font-mono)`, `var(--text-caption)`, `var(--weight-medium)`
- Tracking: `var(--tracking-wide)`
- Transform: `uppercase`
- Color: `var(--color-ink-secondary)` (default) or `var(--color-accent-blue)` (blue)

### Tailwind Pattern
```
inline-flex items-center
px-2.5 py-1 rounded-full
bg-white/3 border border-white/6
font-[var(--font-mono)] text-xs font-medium tracking-[0.05em] uppercase
text-[var(--color-ink-secondary)]
```

---

## 14. Text Reveal

Reusable animated text component for scroll-triggered headline reveals.

### File: `components/TextReveal.tsx`

### Props
```tsx
interface TextRevealProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  splitBy?: 'word' | 'line' | 'char';
  staggerMs?: number;          // default: 60
  threshold?: number;          // IntersectionObserver threshold (default: 0.2)
  className?: string;
}
```

### Behavior
1. Splits text into units (words, lines, or characters)
2. Wraps each unit in `<span style="overflow: hidden; display: inline-block">`
3. Inner span starts at `translateY(110%) rotateX(-10deg)` with `opacity: 0`
4. On intersection: animates to `translateY(0) rotateX(0)` with `opacity: 1`
5. Each unit staggers by `staggerMs` milliseconds
6. Animation: `var(--duration-slow)` (800ms) with `var(--ease-out-expo)`
7. Runs once — does not replay on re-entry

### Implementation Notes
- Uses `IntersectionObserver` with configurable threshold
- `will-change: transform, opacity` during animation, removed after
- Respects `prefers-reduced-motion` — falls back to simple `fade-in`
- Container uses `perspective: 1000px` for the rotateX effect

---

## 15. Case Study Layout

Project detail page layout. Light theme (contrast with dark main site).
Based on reference images 6–10.

### File: `app/work/[slug]/page.tsx`

### Page Sections

```
1. Case Study Hero
   └─ White background (--color-paper)
   └─ Project name (overline): font-body, bold, text-body
   └─ Project title (h1): font-display, text-display-project
   └─ Meta row: Client | Responsibility | Year
   └─ Full-width hero image below (16:9 aspect ratio)

2. Project Introduction
   └─ Two-column: heading left, paragraph right
   └─ Heading: font-display, italic, text-h2
   └─ Body: font-body, text-body-lg, color-ink-dark-secondary

3. Image Gallery
   └─ Full-bleed image grid (1-3 columns)
   └─ Images with rounded corners (--radius-lg)
   └─ Mockup presentations (device frames)

4. The Challenge
   └─ Same two-column as introduction
   └─ Background image accent

5. Solution Screens
   └─ Colored background section (project-specific color)
   └─ Mobile + Desktop mockups centered
   └─ Full-bleed, edge-to-edge

6. View Website CTA
   └─ Centered: RippleButton with "View Website"
   └─ Generous whitespace above and below

7. Next Project
   └─ Dark section at bottom
   └─ Large "NEXT PROJECT" text (font-display, text-display-section)
   └─ Project preview card angled/overlapping
   └─ Links to next case study
```

### Theme Toggle
- Case study pages set `data-theme="light"` on `<html>` or wrapping `<div>`
- CSS vars switch:
```css
[data-theme="light"] {
  --bg: var(--color-paper);
  --fg: var(--color-ink-dark);
  --fg-secondary: var(--color-ink-dark-secondary);
}
```

### Typography Rules (Light Pages)
- All text uses dark ink colors
- Display font remains Instrument Serif
- Body font remains Manrope
- Accent color still `--color-accent` (sufficient contrast on light)

---

## 16. Mobile Menu

Full-screen glassmorphic overlay menu for mobile navigation.

### File: `components/MobileMenu.tsx`

### Structure
```html
<div class="menu-overlay">          ← fixed inset-0, glass-prominent
  <nav class="menu-nav">
    <a class="menu-item">Work</a>   ← staggered reveal
    <a class="menu-item">About</a>
    <a class="menu-item">Contact</a>
  </nav>
  <div class="menu-footer">
    <a>LinkedIn</a>
    <a>GitHub</a>
    <span>dahalprastut@gmail.com</span>
  </div>
</div>
```

### Animation
- Overlay: `opacity: 0 → 1` + `backdrop-filter: blur(0) → blur(40px)`, 500ms
- Menu items: `translateY(30px) → translateY(0)` + `opacity: 0 → 1`, staggered 80ms
- Close: reverse at 60% speed

### Typography
- Menu items: `var(--font-display)`, `3rem` mobile, `var(--weight-regular)`
- Footer links: `var(--font-body)`, `var(--text-body-sm)`, `var(--color-ink-secondary)`

### Styling
- Background: `var(--glass-bg-prominent)` with `blur(var(--glass-blur-2xl))`
- Z-index: `var(--z-overlay)` (40)
- Vertical layout: flex-col, justify-center
- Gap between menu items: `var(--space-6)`

---

## 17. Page Transition

Smooth transitions between pages using Next.js App Router.

### File: `components/PageTransition.tsx`

### Behavior
- Wraps page content in animated container
- Enter: `fade-in-up` 600ms `var(--ease-out-quint)`
- Exit: `fade-in` reversed, 300ms
- Uses React `useLayoutEffect` or `framer-motion`'s `AnimatePresence`

### Implementation
```tsx
// Simplified — use framer-motion for production
<AnimatePresence mode="wait">
  <motion.div
    key={pathname}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    transition={{
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    }}
  >
    {children}
  </motion.div>
</AnimatePresence>
```

---

## 18. Scroll Progress

Thin progress bar at the top of the page showing scroll position.

### File: `components/ScrollProgress.tsx`

### Structure
```html
<div class="scroll-progress">      ← fixed top-0 left-0 h-[2px] z-50
  <div class="progress-bar" />     ← width: {scrollPercentage}%
</div>
```

### Styling
- Height: 2px
- Background: `var(--color-accent)`
- Glow: `box-shadow: 0 0 8px var(--color-accent-glow)`
- Transition: `width` via `scaleX` transform (GPU-accelerated)
- `transform-origin: left`
- Z-index: above navbar

---

## Component Dependency Tree

```
Layout
├── CustomCursor (global, portal to body)
├── Navbar
│   ├── GlassButton ("Hire Me")
│   └── MobileMenu (mobile only)
├── ScrollProgress
├── PageTransition
│   └── [Page Content]
│       ├── Hero
│       │   └── TextReveal
│       ├── SectionMarquee ("Recent Works")
│       ├── ProjectCard (× N)
│       │   └── TechTag (× N)
│       ├── About
│       │   ├── SectionMarquee ("ABOUT ME")
│       │   └── TextReveal
│       ├── Skills
│       │   └── Glass card (× 3)
│       ├── Gallery
│       ├── Contact
│       │   ├── SectionMarquee ("SAY HI!!")
│       │   └── RippleButton
│       └── Footer
└── [Case Study Page]
    ├── Case Study Hero
    ├── TextReveal
    ├── RippleButton ("View Website")
    └── Next Project Card
```

---

## Recommended External Dependencies

| Package | Purpose | Version |
|---------|---------|---------|
| `framer-motion` | Page transitions, AnimatePresence, scroll-triggered animations | ^12 |
| `lucide-react` | Icon library (outline style) | ^0.400 |
| `@studio-freight/lenis` | Smooth scroll with momentum (optional, enhances feel) | ^1.0 |

> **Note:** Many animations can be achieved with pure CSS + Intersection Observer.
> Only add framer-motion if page transitions and complex orchestration are needed.
> Avoid over-dependency — CSS-first approach preferred.
