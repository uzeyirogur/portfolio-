# Creative Frontend Portfolio — Design System Skill

## Purpose
This skill enforces premium, non-generic portfolio design for Üzeyir Öğür's developer portfolio.
It exists because generic "AI slop" aesthetics (purple gradients, Inter font, starfield backgrounds,
empty right sides, horizontal carousels) are explicitly rejected by the user.

## Site Concept: "SYSTEM.exe — Developer's Operating System"
The site feels like a living, interactive developer operating system. Every section is a
layer of a real software system. Visitors should feel like they're navigating an actual
command center, not reading a CV.

## Core Design Philosophy
**Concept: Developer Command Center**
The site should feel like a premium developer's control panel — not a static CV.
Someone viewing it should think "this person builds real systems, not toy projects."

## Visual Identity
- **Base**: `#050709` (ultra-dark, not gray — it has a slight blue tint)
- **Accent**: `#22D3EE` (cyan — electric, not neon)
- **Secondary**: `#818CF8` (indigo — for gradients and secondary elements)
- **Typography**: Bricolage Grotesque (display), Outfit (body), JetBrains Mono (mono)
- **Grid**: Cyan technical grid `rgba(34,211,238,0.04)` at 44–72px spacing
- **Avoid**: Purple gradient templates, Inter font, white backgrounds, colorful blobs

## Reference Aesthetic Targets
- **bierman.io**: Large typography, confident spacing, projects revealed with strong impact
- **byChudy.com**: Energy, creativity, not-a-template feel, spatial compositions
- **runlayer.com**: Premium SaaS quality, dark, intentional color use, product confidence
- The site must feel like it was "made in 2030" — no element should look like Tailwind default

## Hero Section Rules
- Two-column layout on desktop (text left, visual right)
- **RIGHT SIDE MUST NEVER BE EMPTY** — CommandCenter visual required:
  - Central glowing orb with `Code2` icon + rotating rings + pulse animation
  - 5 floating glass cards (API Layer, SQL Server, Clean Arch, AI Workflow, Terminal)
  - SVG connection lines with animated `stroke-dashoffset` for data flow effect
  - CSS technical grid background masked with radial gradient
  - Mouse parallax via `useSpring + useTransform` with different depth per card
  - `FloatingCardItem` is a real React component (hooks-safe in map)
- Mobile: CommandCenter hidden (`hidden lg:block`), text-only layout

## Projects Section — "Mission Briefing" Full-Screen Scenes

### ❌ BANNED (never do these again):
- Horizontal scroll / translateX carousel
- Side-by-side cards (even with 3D tilt)
- Basic "scroll right to see more" pattern
- Cards cramped with all info in a small box
- Weak contrast cards that look like UI library components

### ✅ REQUIRED — Full-screen scroll-pinned scenes:
- **Desktop layout**: `hidden lg:block` container with `height: n * 100vh`
- Inside: `sticky top-0 h-screen overflow-hidden` inner wrapper
- Each project gets its own `ProjectScene` component
- `useScroll({ target: ref, offset: ['start start', 'end end'] })` for scroll tracking
- `scrollYProgress` drives per-project opacity + y animations via `useTransform`
- **No AnimatePresence** — pure useTransform for performance

### ProjectScene structure (per project):
```
┌──────────────────────────────────────────────────────────────┐
│ [progress bar — cyan gradient, scaleX driven by scroll]      │
├─────────────────────────────┬────────────────────────────────┤
│ LEFT (text)                 │ RIGHT (visual)                 │
│ • Counter: 01 / 05          │ • Ghost number watermark       │
│ • Category badge            │   (200px, opacity 0.07)        │
│ • Title (heading-lg, white) │ • Architecture SVG diagram     │
│ • Description (slate/60)    │   (node-connection, animated   │
│ • Stack tags                │    flowing dashes per edge)    │
│ • GitHub / Demo links       │ • Floating ProjectMockup       │
│                             │   (w-48 h-56, bottom-right)    │
│                             │ • Status badge (top-right)     │
└─────────────────────────────┴────────────────────────────────┘
```

### Per-project accent colours:
- `paramnet`: `#22D3EE`
- `anka-sports`: `#818CF8`
- `gold-price-tracker`: `#F59E0B`
- `vehicle-inventory`: `#34D399`
- `ticket-system`: `#60A5FA`

### Architecture diagrams (per project):
Custom inline SVG with `ArchNode` (rounded rect boxes) + `ArchEdge` (animated flowing dash lines).
Each diagram shows the app's actual tech stack as a simple node-connection architecture diagram.
The flowing dash animation creates "data flowing through pipes" effect.

### Mobile layout:
`lg:hidden` vertical list of cards. Each card: mockup preview (h-44) + info block below.
NO sticky, NO scroll-pinning on mobile. Simple `whileInView` entrance animations.

## Animation Standards
- Text reveals: `y: '110%' → '0%'`, `overflow: hidden` wrapper, stagger 0.12s
- Scroll animations: `whileInView`, `viewport: { once: true }`
- Floating cards: `animate={{ y: [0, -amp, 0] }}` with different durations
- Project scene transitions: `useTransform` opacity/y per scene (NOT AnimatePresence)
- `prefers-reduced-motion`: Kill all animations via CSS media query

## "2030-Feel" Criteria (check before marking done)
- [ ] Typography is large and confident — no timid small-text paragraphs
- [ ] Every visual element has intentional depth (not flat)
- [ ] At least one "signature visual" per section that wouldn't exist in a template
- [ ] Motion is meaningful — reveals, parallax, flow — not just opacity fade
- [ ] Architecture diagrams / system diagrams as art (not stock icons)
- [ ] Dark theme is deep black-blue, not gray
- [ ] Section backgrounds feel distinct from each other

## What NOT to Do
- Empty right side in hero
- Generic starfield/dot background only
- Flat card images (404 or blank)
- Purple gradient on dark (looks cheap)
- `Inter` or `system-ui` font for display text
- Simple `fade-in` as the only animation
- Blocking navigation with heavy JS
- **Horizontal scroll carousel for projects**
- **Side-by-side project cards**
- **Any layout that looks like a Tailwind UI template**
- **Cards with weak border/contrast that blend into background**
