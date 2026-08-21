---
name: dark-liquid-glass-deck
description: Build presentation decks in Vue 3 + Vite using refined Apple visionOS dark glassmorphism featuring pitch black backgrounds (#000000), subtle frosted glass panels, crisp typography, static ambient glows, and zero distracting blinking animations.
---

# Dark Liquid Glass Design System

A refined, high-end dark glassmorphism presentation system inspired by modern Apple visionOS glass aesthetics and premium editorial design.

## Design System Specifications

1. **Color Palette & Tone (No AI Slop)**:
   - **Background**: Pitch Black (`#000000`)
   - **Glass Panels**: `rgba(255, 255, 255, 0.04)` to `rgba(255, 255, 255, 0.02)` with `backdrop-filter: blur(24px) saturate(140%)`
   - **Borders**: Subdued Specular Rim (`rgba(255, 255, 255, 0.12)`)
   - **Accents**: Muted Emerald (`#22c55e`), Slate Grey (`#71717a`)
   - **Text**: Pure White (`#ffffff`), Dimmed Slate (`#a1a1aa`)

2. **Animation Rules**:
   - **NO BLINKING / PULSING**: `animate-ping`, `animate-pulse`, `animate-bounce`, and any blinking elements are strictly prohibited.
   - **Motion**: Smooth, static, subtle hover state transitions only (`transition-all duration-300`).

3. **Layout Archetypes**:
   - **Clean Glass Cards**: Rounded glass panels (`rounded-3xl bg-zinc-950/80 border border-white/10 backdrop-blur-2xl p-6`).
   - **Typography**: High contrast, minimal, crisp hierarchy.