# Design Guidelines: Professional 3D Developer Portfolio

## Design Approach
**Selected Approach:** Reference-based (Apple-inspired minimalism + modern 3D interactive experiences)

**Design Principles:**
- Clean, premium, corporate aesthetic — NO funky elements
- Modern Apple-style sophistication with soft gradients and glassmorphism
- Professional 3D integration throughout for visual depth
- Smooth, purposeful animations that enhance UX

## Color Palette
**Primary Colors:**
- Pure Black (#000000) - backgrounds, text
- Pure White (#FFFFFF) - text, highlights
- Slate Grey (#64748B, #475569) - secondary text, borders
- Navy Blue (#0F172A, #1E293B) - accent elements, glassmorphic overlays

**Treatment:**
- Soft gradients between black/navy/grey for depth
- Glassmorphic effects with subtle backdrop blur
- High contrast for readability

## Typography
**Font Stack:** Use Inter or SF Pro Display (Google Fonts)
- Hero Heading: 4xl-6xl, font-bold, tracking-tight
- Section Headings: 3xl-4xl, font-semibold
- Subheadings: xl-2xl, font-medium
- Body Text: base-lg, font-normal, leading-relaxed
- Code/Tech Stack: mono font, sm-base

## Layout System
**Spacing Primitives:** Use Tailwind units: 4, 6, 8, 12, 16, 20, 24, 32
- Section padding: py-20 to py-32 (desktop), py-12 to py-16 (mobile)
- Component spacing: gap-8 to gap-12
- Card padding: p-6 to p-8
- Container: max-w-7xl mx-auto px-6

## Component Library

### Navigation
- Fixed top nav with glassmorphic background (bg-black/80 backdrop-blur-lg)
- Smooth scroll links with active state indicators
- Mobile: Hamburger menu with slide-in drawer

### Hero Section
**3D Integration:** Rotating sphere (React Three Fiber) as background element
- Full viewport height (min-h-screen)
- Center-aligned content with z-index layering over 3D scene
- Name in 6xl bold, role in 2xl with gradient text effect
- Soft camera movement in 3D scene
- Particle effects floating around sphere
- CTA buttons with glassmorphic treatment

### About Section
- Two-column layout (desktop): Summary + Skills grid
- Glassmorphic cards with subtle hover lift animations
- Skills displayed as clean badges/pills
- Geometric 3D shape floating in background

### Experience & Education
- Timeline layout with connecting lines
- Cards with glassmorphic backgrounds
- Framer Motion entrance animations (slide + fade)
- Date badges with navy blue accent

### Projects Showcase
- Grid layout: 2 columns (desktop), 1 column (mobile)
- Project cards with:
  - Glassmorphic hover effect
  - Tech stack badges at bottom
  - Subtle scale animation on hover
  - Clean typography hierarchy

### Contact Form
- Single column centered form with glassmorphic container
- Input fields with subtle borders, focus states with navy glow
- Submit button with gradient background
- Contact details displayed alongside form (2-column on desktop)

### 3D Scene Component (ThreeScene.jsx)
- Ambient + directional lighting for depth
- OrbitControls disabled for user, enabled for development
- Rotating sphere with navy/grey gradient material
- Floating geometric shapes (icosahedron/torus)
- Particle system with slow drift animation
- Soft camera auto-rotation

## Animations
**Framer Motion Implementation:**
- Section entrance: Slide up + fade in (stagger children)
- Cards: Scale 1.02 on hover, duration 0.3s
- Nav links: Underline expansion on hover
- 3D elements: Continuous slow rotation
- Page transitions: Smooth opacity changes

**Animation Constraints:**
- Minimize distracting movements
- All animations < 0.5s duration
- Use ease-in-out curves
- Respect prefers-reduced-motion

## Responsive Behavior
- Mobile: Single column, stacked sections, reduced 3D complexity
- Tablet: 2-column where appropriate
- Desktop: Full multi-column layouts, enhanced 3D effects
- Breakpoints: sm:640px, md:768px, lg:1024px, xl:1280px

## Glassmorphism Treatment
Apply to: Cards, nav, form containers, buttons over 3D scenes
```
bg-white/10 backdrop-blur-md border border-white/20 shadow-xl
```

## Images
**No hero image required** - 3D rotating sphere serves as primary visual
Profile photo optional in About section (circular, 200x200px)
Project screenshots optional but recommended for portfolio pieces

## Performance Notes
- Optimize 3D scene: Low polygon count, efficient materials
- Lazy load 3D components below fold
- Use React.memo for expensive 3D renders
- Implement loading states for Supabase calls