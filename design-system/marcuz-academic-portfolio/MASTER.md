# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Marcuz Academic Portfolio
**Generated:** 2026-08-13 10:23:42
**Category:** Academic Research Portfolio
**Design Dials:** Variance 3/10 (Centered / Minimal) | Motion 2/10 (Subtle) | Density 3/10 (Spacious)

---

## Global Rules

### Color Palette

| Role               | Hex       | CSS Variable          |
| ------------------ | --------- | --------------------- |
| Institutional navy | `#1E3A5F` | `--institutional`     |
| On Primary         | `#FFFFFF` | `--color-on-primary`  |
| Research cobalt    | `#2563EB` | `--accent`            |
| Data teal          | `#0F766E` | `--accent-secondary`  |
| Scholarly gold     | `#A16207` | `--scholarly`         |
| Background         | `#F8FAFC` | `--background`        |
| Foreground         | `#0F172A` | `--foreground`        |
| Muted              | `#F1F5F9` | `--surface-muted`     |
| Border             | `#CBD5E1` | `--border-strong`     |
| Destructive        | `#DC2626` | `--color-destructive` |
| Ring               | `#2563EB` | `--accent`            |

**Color Notes:** Institutional navy anchors the identity. Cobalt marks research,
teal marks data and applied systems, and gold is reserved for education,
scholarships, and work in progress. Tints remain subtle and gradients are not used.

### Typography

- **Heading Font:** IBM Plex Sans
- **Body Font:** Inter
- **Code / labels:** JetBrains Mono
- **Mood:** editorial, academic, analytical, restrained, international

**CSS Import:**
Fonts are loaded through `next/font` to reduce layout shift and avoid a render-blocking CSS import.

### Spacing Variables

_Density: 3/10 — Spacious_

| Token         | Value             | Usage                     |
| ------------- | ----------------- | ------------------------- |
| `--space-xs`  | `4px` / `0.25rem` | Tight gaps                |
| `--space-sm`  | `8px` / `0.5rem`  | Icon gaps, inline spacing |
| `--space-md`  | `24px` / `1.5rem` | Standard padding          |
| `--space-lg`  | `32px` / `2rem`   | Section padding           |
| `--space-xl`  | `48px` / `3rem`   | Large gaps                |
| `--space-2xl` | `64px` / `4rem`   | Section margins           |
| `--space-3xl` | `96px` / `6rem`   | Hero padding              |

### Shadow Depths

| Level         | Value                          | Usage                       |
| ------------- | ------------------------------ | --------------------------- |
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)`   | Subtle lift                 |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)`    | Cards, buttons              |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)`  | Modals, dropdowns           |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: #1e3a5f;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #1e3a5f;
  border: 1px solid #cbd5e1;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}
```

### Cards

```css
.card {
  background: #fafafa;
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-md);
  transition: all 200ms ease;
  cursor: pointer;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

### Inputs

```css
.input {
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: #18181b;
  outline: none;
  box-shadow: 0 0 0 3px #18181b20;
}
```

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines

**Style:** Academic editorial minimalism with a Swiss grid

**Keywords:** Institutional, editorial, scientific, asymmetric grid, generous whitespace, restrained color

**Best For:** Research portfolios, academic departments, working-paper archives, quantitative research

**Key Effects:** font-size: clamp(3rem 10vw 12rem), font-weight: 900, letter-spacing: -0.05em, massive whitespace

### Page Pattern

**Pattern Name:** Research Archive

- **Reading Strategy:** Identity first, then education, research views, applied capabilities, experience, and contact.
- **CTA Placement:** Hero actions, research-view cards, research detail links, and closing contact block.
- **Editorial Elements:** Numbered sections, discipline-aware color rails, metadata labels, figure captions, and evidence summaries.
- **Background Language:** Static constellation lines in the hero; low-opacity scientific dot fields, oversized orbital outlines, scatter coordinates, method networks, timeline geometry, and signal arcs. Background elements remain non-interactive, sit behind content, and are removed on small screens.
- **Personal Signature:** A restrained red cannon silhouette supplied by the portfolio owner appears only in the portrait caption and footer. It is explicitly framed as a personal supporter detail and never replaces the academic identity or implies club endorsement.

---

## Motion

**Scroll Reveal** (Subtle) — Trigger: scroll (viewport enter) | Duration: 300-400ms | Easing: `power1.out`

```js
gsap.from(el, {
  opacity: 0,
  y: 12,
  duration: 0.35,
  ease: "power1.out",
  scrollTrigger: {
    trigger: el,
    start: "top 90%",
    toggleActions: "play none none reverse",
  },
});
```

**Framework notes:** Requires the ScrollTrigger plugin registered once via gsap.registerPlugin(ScrollTrigger)

- ✅ Keep the y offset small (8-16px) so it reads as a fade, not a slide
- ❌ Don't reveal below-the-fold content needed for SEO/crawlers as invisible-by-default without a no-JS fallback
- ⚡ toggleActions 'play none none reverse' avoids re-triggering on every scroll direction change

---

## Anti-Patterns (Do NOT Use)

- ❌ Playful design
- ❌ Hidden credentials
- ❌ AI purple/pink gradients

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Decorative motion loops** — Background geometry remains static; no continuously moving particles or aurora effects
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
