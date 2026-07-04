# Erfan Labbafi — Portfolio

Angular 20 · TypeScript · Tailwind CSS v4 · GSAP · Signals-first architecture.

## Run it

```bash
npm install
npm start
```

Then open http://localhost:4200.

Production build:

```bash
npm run build
```

Output goes to `dist/erfan-portfolio`.

## Before you deploy

Two assets are referenced but intentionally not included (binary placeholders aren't useful to ship):

- `public/resume.pdf` — the downloadable resume linked from the hero's "Download Resume" button.
- `public/og-cover.png` — a 1200×630 social preview image referenced by the Open Graph / Twitter meta tags in `src/index.html`.

Also update the placeholder URLs (GitHub, LinkedIn, Telegram, email, `erfanlabbafi.dev`) throughout `src/app/shared/components` and `src/index.html` with the real ones.

## Architecture

```
src/app/
├── core/services/        # GsapService (lazy-loaded gsap+ScrollTrigger), CursorService, ThemeService
├── shared/
│   ├── models/            # Plain TS interfaces for content
│   ├── data/               # Static content, kept separate from presentation
│   ├── directives/         # appReveal, appMagnetic, appTilt, appScrollProgress
│   └── components/         # Nav, Footer, custom Cursor, noise overlay, ticker tape, section heading
└── features/               # One folder per page section, each a standalone, OnPush component
    └── home/                # Composes all sections; the only route, lazy-loaded via loadComponent
```

Key decisions:

- **Signals everywhere** — no component-level RxJS subjects; `computed()` derives grouped skills and ticker content, `signal()` holds all local UI state, and the count-up figures animate a signal via a GSAP tween's `onUpdate`.
- **GSAP is dynamically imported** (`GsapService.load()`), never imported at the top of a component file, so it never sits in the initial bundle or blocks a non-browser render.
- **`prefers-reduced-motion` is respected everywhere** motion is introduced: hero entrance, reveal-on-scroll, magnetic buttons, tilt, the ticker marquee and the canvas background all check it and fall back to a static, fully legible state.
- **The "particles" and "floating geometric elements" the brief asked for** are a canvas-drawn node network plus a live sparkline (`MarketGraphCanvasComponent`) rather than generic confetti — it's meant to read as market data, tying the motion back to the FinTech subject matter.

## Design tokens

Defined in `src/styles.css` under `@theme` (Tailwind v4's CSS-first config):

| Token | Value | Use |
|---|---|---|
| `--color-ink` | `#0a0d12` | Base background |
| `--color-surface` | `#12161d` | Cards, nav |
| `--color-line` | `#1e2530` | Hairline borders |
| `--color-signal` | `#43e8c9` | Primary accent ("uptick" cyan) |
| `--color-watch` | `#f5a623` | Secondary accent, used sparingly |
| `--font-display` | Space Grotesk | Headings |
| `--font-body` | Inter | Body copy |
| `--font-mono` | JetBrains Mono | Data, code, tabular figures |

## Notes

This project was generated in a sandboxed environment without npm registry access, so dependencies have not been installed or build-verified here. The code follows current Angular 20 / Tailwind v4 APIs as documented, but run `npm install` and `npm start` locally as the first step to confirm everything compiles cleanly, and check the browser console for anything environment-specific (font loading, `resume.pdf`/`og-cover.png` above).
