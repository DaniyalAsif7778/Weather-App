# AURA WEATHER — Design System & Project Documentation

> A premium, atmospheric weather dashboard designed for portfolio excellence.  
> **Status:** Building — Mobile-first responsive web app

---

## What This Is

A responsive weather dashboard built with **HTML + Tailwind CSS v4 + JS + Vite**.  
Desktop sidebar on the left. Mobile floating navbars (top + bottom). Mobile sidebar slides up from bottom center.  
Background changes with weather. Glass cards. Bento grid layout.

---

## Stack

| Layer | Tech |
|-------|------|
| Markup | HTML5 |
| Styling | Tailwind CSS v4 + Custom CSS Variables |
| Logic | JavaScript (vanilla) |
| Bundler | Vite |
| Animation | GSAP |
| Icons | Phosphor Icons |
| Font | Geist / Inter |
| Audio | Howler.js |
| APIs | OpenWeatherMap + Nominatim |

---

## What's Built

### Navigation
- [x] Desktop sidebar (left, sticky)
- [x] Desktop top navbar (sticky, blur)
- [x] Mobile floating top navbar
- [x] Mobile floating bottom navbar
- [x] Mobile floating sidebar (bottom center sheet)

### Sections
- [x] Hero section (full viewport, dynamic weather background, scattered shadow effect)
- [x] Hourly forecast (grid layout, wind/rain/sun details, overflow scroll)
- [x] 7-Day forecast (temp bars, grid rows, responsive)

### Design System
- [x] CSS custom properties (all colors, spacing, typography in `:root`)
- [x] Glass card component
- [x] Section dividers (gradient line, aurora, pill, ambient, space)
- [x] Ambient glow backgrounds
- [x] Responsive breakpoints (mobile / tablet / desktop)

---

## What's Pending

- [ ] Weather Details grid (humidity, wind, pressure, UV, visibility, precipitation)
- [ ] Air Quality section (AQI ring, pills)
- [ ] Sunrise/Sunset section (progress bar)
- [ ] Recent Searches (city pills)
- [ ] Weather History page
- [ ] My Cities page
- [ ] Compare Cities page
- [ ] Canvas background animations (rain, snow, stars, clouds)
- [ ] Ambient sound engine (Howler.js)
- [ ] GSAP animations (entrance, transitions, charts)
- [ ] API integration (OpenWeatherMap + Nominatim)
- [ ] Search with autocomplete
- [ ] All UI states (loading, empty, error, offline)
- [ ] Keyboard shortcuts

---

## File Structure

```
├── index.html              ← Main entry (nav + sections)
├── src/
│   ├── style.css           ← All styles + design tokens
│   └── main.js             ← (pending)
├── public/
│   ├── sounds/             ← Ambient audio files (pending)
│   └── images/             ← Weather photos (you add these)
├── vite.config.js
└── package.json
```

---

## Quick Start

```bash
npm install
npm run dev
```

---

## Design Tokens

All values live in `:root` inside `src/style.css`. Change the entire theme from one place.

| Token Category | Examples |
|----------------|----------|
| Colors | `--color-bg-primary`, `--color-accent-cyan`, `--color-weather-clear` |
| Typography | `--font-size-display`, `--font-weight-light`, `--letter-spacing-tight` |
| Spacing | `--space-1` through `--space-32` |
| Radius | `--radius-sm` through `--radius-full` |
| Shadows | `--shadow-sm`, `--shadow-float`, `--shadow-glow-cyan` |
| Transitions | `--transition-fast`, `--transition-slow` |

---

## Responsive Breakpoints

| Breakpoint | Layout |
|------------|--------|
| `< 768px` | Mobile — floating navbars, stacked sections |
| `768–1023px` | Tablet — floating navbars, wider cards |
| `≥ 1024px` | Desktop — left sidebar + top navbar |
| `≥ 1280px` | Large desktop — wider sidebar, larger cards |

---

## APIs

| Service | Purpose | Key |
|---------|---------|-----|
| OpenWeatherMap | Weather data, forecast, air quality | Required (free at openweathermap.org) |
| Nominatim | City name → coordinates | No key needed |

---

*Last updated: 2026-08-10*
