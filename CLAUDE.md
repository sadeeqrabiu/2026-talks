# CLAUDE.md — 2026 Talks

This file provides guidance to Claude Code (claude.ai/code) when working in `2026-talks/`.
This workflow is optimized for **Claude Opus 5.5** (`claude-opus-5-5`).

## Project Overview

`2026-talks` is a Slidev presentation deck built with Vue 3, Vite, and UnoCSS. It hosts two independently styled, high-production conference presentations with an index talk switcher and real-time audience interaction.

### The Talks
1. **Talk 01: "Open Source: Beyond the Code"**
   - **Route Alias**: `open-source`
   - **Slide Range**: Root `slides.md` + `pages/02-*.md` through `pages/09-*.md`
   - **Design System**: **Dark Liquid Glass** (`dark-liquid-glass-deck`)
   - **Aesthetic**: Refined Apple visionOS dark glassmorphism. Pitch black background (`#000000`), subtle frosted glass panels (`backdrop-filter: blur(24px)`), subdued specular rim borders, muted emerald/slate accents, crisp high-contrast typography. Zero blinking animations.

2. **Talk 02: "From First Commit to Confident Contributor: Building in the Age of AI"**
   - **Route Alias**: `first-commit`
   - **Slide Range**: `pages/first-commit/01-title.md` through `pages/first-commit/16-end.md`
   - **Design System**: **Cyber Mono** (`cyber-mono-deck`)
   - **Aesthetic**: Strict black-and-white minimal cyberpunk. Terminal / HUD / technical-drawing cues, hairlines (`#262626`), `0` border-radius, pure white on black (`#000`), Archivo 800/900 uppercase display, JetBrains Mono body/metadata, registration marks (`+`), bracketed indices (`[01]`), static block cursors. No neon, no gradients, no drop shadows.

3. **Shared Shell & Controls**
   - `slides.md` slide 1: `TalkSelector.vue` (`routeAlias: index`)
   - `global-bottom.vue`: Global layer managing audience reaction animations and the join QR trigger
   - `custom-nav-controls.vue`: Custom navigation controls injecting reactions and QR triggers into Slidev's bottom bar

---

## Commands

Always run commands from inside `2026-talks/` using `pnpm`:

```bash
# Start Slidev dev server (opens in browser)
pnpm dev

# Build production slide presentation
pnpm build

# Build for GitHub Pages deployment
pnpm build:gh

# Export slides to PDF/PNG
pnpm export
```

---

## Architecture & Code Structure

```
2026-talks/
├── slides.md               # Main Slidev entry point, index slide, and talk 01/02 slide references
├── package.json            # Dependencies: @slidev/cli, vue 3.5, partysocket, unocss, motion-v
├── uno.config.ts           # UnoCSS configuration and theme presets
├── style.css               # Global typography and base styles
├── global-bottom.vue       # Global footer layer (reactions, QR overlay)
├── custom-nav-controls.vue # Bottom slide navigation bar injection
├── pages/                  # Slide content broken into discrete markdown files
│   ├── 02-*.md ... 09-*.md # Talk 01 slides
│   └── first-commit/       # Talk 02 slides (01-title.md through 16-end.md)
├── components/             # Reusable Vue slide components
│   ├── DarkGlass*.vue      # Talk 01 dark liquid glass components
│   ├── cyber/              # Talk 02 cyber-mono components (CmFrame, CmHero, CmCompare, CmLoop, CmPipeline, etc.)
│   │                       # deck.ts exports CM_TOTAL - the single source of truth for the NN/NN counter
│   ├── audience/           # Real-time WebSocket audience reaction widgets
│   └── TalkSelector.vue    # Interactive slide 1 talk picker
├── .claude/
│   ├── settings.json       # Configured with "model": "claude-opus-5-5"
│   └── skills/             # Local skills for Claude Code (dark-liquid-glass-deck, cyber-mono-deck)
└── .agents/
    └── skills/             # Local skills for agent IDEs / Antigravity
```

---

## Design System Rules & Skills

Refer to the installed skills in `.claude/skills/` (and `.agents/skills/`):
- `dark-liquid-glass-deck`: Full tokens, glass panels, color palette, and layout archetypes for Talk 01.
- `cyber-mono-deck`: Anti-slop checklist, `Cm*` component API, hairline frame tokens, and typography hierarchy for Talk 02.

### Anti-Slop Guidelines (Mandatory Across All Slides)
- **Zero generic AI templates**: Avoid three equal cards with icons, generic colored gradient bubbles, or centered generic hero layouts.
- **No distracting motion**: Strictly ban `animate-pulse`, `animate-ping`, `animate-bounce`, and blinking cursors. Use static cursors (`█`) and subtle `v-click` reveals only.
- **Intentional structure**: Every badge, bracket, rule, and hairline must serve as a functional index or clear informational anchor.

---

## Claude Opus 5.5 Workflow Best Practices

- Model ID: `claude-opus-5-5`
- Keep edits concise, clean, and targeted to the relevant components or page markdown files.
- When adding or editing slides in Talk 01, use `DarkGlass*.vue` components or Vue 3 glass templates.
- When adding or editing slides in Talk 02, always wrap the slide content inside `<CmFrame>` with proper `section`, `index`, and `slug` props. Do not pass `total` — it defaults to `CM_TOTAL` in `components/cyber/deck.ts`; update that constant when the slide count changes.
- Every `pages/first-commit/*.md` must keep `talk: first-commit` in its frontmatter, and `02-join.md` must keep `routeAlias: join-mono`. `global-bottom.vue` branches on both to render the mono audience QR popup and to suppress it on the join slide.
- Every Talk 02 slide carries speaker notes in a trailing `<!-- ... -->` block. Keep them in sync when you change a slide's content.
- The `CmFrame` viewport does not scroll — overflowing content is cut off at the footer. After editing a slide, view it at full click depth before considering it done.
