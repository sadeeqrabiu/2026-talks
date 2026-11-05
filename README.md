# 2026 Talks — Sadiq Rabiu

Interactive conference presentation deck for 2026 talks by **Sadiq Rabiu** (Bitcoin open source contributor, Founder of **Open Source Guild** & **BitDevs Mauritius**).

Built with [Slidev](https://sli.dev/), **Vue 3**, **Vite**, **UnoCSS**, and **PartySocket**, this repository hosts four independently styled talks behind a unified talk switcher and real-time audience reaction layer.

---

## Talks Included

| # | Talk Title | Route Alias | Slides | Design System |
| :- | :--- | :--- | :--- | :--- |
| **01** | **Open Source: Beyond the Code** | `open-source` | 9 slides | **Dark Liquid Glass** — Apple visionOS dark glassmorphism (`#000`, frosted blur panels, emerald accents) |
| **02** | **From First Commit to Confident Contributor: Building in the Age of AI** | `first-commit` | 16 slides | **Cyber Mono** — Strict black-and-white minimal cyberpunk / HUD (`#000` / `#FFF`, `Archivo` + `JetBrains Mono`, hairlines) |
| **03** | **Open Source — An Introduction** | `open-source-intro` | 20 slides | **Green Rail** — Glowing commit rail (`#01D758` / `#00FF00` on `#000`, `Source Code Pro`, parallax dot grid, workshop leaderboard) |
| **04** | **Use of AI in Bitcoin Development** | `ai-bitcoin` | 13 slides | **Orange Grid** — Persistent canvas grid (`#FF5C0A`, white pixel icons & wires, `#FAF8F4` paper panels, `#1A1A2E` ink, `Source Code Pro`) |

---

## Key Features

- **4-Way Talk Switcher (`TalkSelector.vue`)**:
  - Slide 1 (`routeAlias: index`) presents all four talks side by side in their native visual languages.
  - Press `1`, `2`, `3`, or `4` on the index slide (or click a column) to jump directly to a talk.
- **Live Audience Reactions (`global-bottom.vue` + `components/audience/`)**:
  - Real-time emoji reactions powered by **PartySocket** (`slidev-audience-client.pages.dev`).
  - Each talk includes its own themed join slide (`join`, `join-mono`, `join-os`, `join-bai`) and a matching latecomer QR modal accessible from the bottom navigation bar (`custom-nav-controls.vue`).
- **Interactive Simulations & Persistent Backdrops**:
  - **Talk 03 (`components/os-intro/`)**: Live vertical commit rail (`OsRail.vue`), interactive `git` graph and PR review gate, contribution heatmap, and an offline-ready workshop leaderboard (`Podium.vue`).
  - **Talk 04 (`components/btc-ai/`)**: Continuous 2D canvas field (`BaiBackdrop.vue`) where pixel tiles walk between slide scenes, wires redraw, consensus forks tear the grid open (`BaiRiskAutopilot.vue`), and a live CompactSize byte encoder (`BaiDemoTests.vue`), Bitcoin Core call-path explorer (`BaiDemoCore.vue`), BIP spec mapper (`BaiDemoBips.vue`), and review queue model (`BaiReview.vue`) run directly in the slide.
- **WebMCP Deck Controls (`composables/deckTools.ts`)**:
  - Registers `next_slide`, `previous_slide`, `go_to_slide`, and `where_are_we` tools on `document.modelContext` when available.

---

## Project Structure

```text
2026-talks/
├── slides.md                   # Main Slidev entry point, index switcher, and slide imports
├── global-bottom.vue           # Persistent backdrops (Talks 03 & 04), live reactions, and latecomer QR cards
├── custom-nav-controls.vue     # Bottom bar controls for reactions and QR popup
├── style.css                   # Base typography and dark-liquid-glass utilities
├── uno.config.ts               # UnoCSS configuration
├── pages/                      # Modular slide markdown files
│   ├── 02-*.md ... 09-*.md     # Talk 01: Open Source: Beyond the Code
│   ├── first-commit/           # Talk 02: 01-title.md through 16-end.md
│   ├── open-source-intro/      # Talk 03: 01-title.md through 20-end.md
│   └── ai-bitcoin/             # Talk 04: 01-title.md through 13-closing.md
├── components/                 # Vue 3 slide & design-system components
│   ├── TalkSelector.vue        # Slide 1 4-way talk picker
│   ├── DarkGlass*.vue          # Talk 01 Dark Liquid Glass components
│   ├── cyber/                  # Talk 02 Cyber Mono components & deck.ts (CM_TOTAL)
│   ├── os-intro/               # Talk 03 Green Rail components, leaderboard.ts & deck.ts (OS_TOTAL)
│   ├── btc-ai/                 # Talk 04 Orange Grid canvas, interactive demos & deck.ts (BAI_TOTAL)
│   └── audience/               # Real-time WebSocket audience reaction widgets
├── composables/
│   └── deckTools.ts            # WebMCP tool registration for slide navigation
└── public/                     # Static assets (QR codes, logos, talk photos, leaderboard avatars)
```

---

## Getting Started

### Prerequisites

- **Node.js** (v18+ recommended)
- **pnpm**

### Install Dependencies

```bash
pnpm install
```

### Run Development Server

Starts the local Slidev server with hot-reload and opens the deck in your browser:

```bash
pnpm dev
```

### Build for Production

Builds the static SPA into `dist/`:

```bash
pnpm build
```

To build with the `/2026-talks/` base path for GitHub Pages deployment:

```bash
pnpm build:gh
```

### Export Slides

Export slides to PDF or PNG (requires `playwright-chromium`):

```bash
pnpm export
```

---

## Author & License

- **Author**: [Sadiq Rabiu](https://github.com/Sadeeqrabiu)
- **License**: [MIT](./LICENSE)
