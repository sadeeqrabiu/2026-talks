<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core'
import { useNav, useSlideContext } from '@slidev/client'
import './cyber/cyber-mono.css'

const nav = useNav()
const { $page } = useSlideContext()

const open = (alias: 'open-source' | 'first-commit') => nav.go(alias)

// Number keys pick a talk, but only while the selector is on screen
onKeyStroke(['1', '2'], (e) => {
  if (nav.currentPage.value !== $page.value) return
  open(e.key === '1' ? 'open-source' : 'first-commit')
})
</script>

<template>
  <div class="absolute inset-0 flex bg-black text-white select-none overflow-hidden">
    <!-- 01 — Dark glass (existing talk's language) -->
    <button
      class="group relative flex w-1/2 flex-col justify-between p-12 text-left bg-transparent border-0 text-white cursor-pointer font-sans"
      @click.stop="open('open-source')"
    >
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] bg-[#22c55e]/15 blur-[120px] rounded-full pointer-events-none transition-opacity duration-300 opacity-60 group-hover:opacity-100" />

      <span class="relative self-start px-2.5 py-1 rounded-lg bg-[#22c55e]/15 border border-[#22c55e]/40 text-[#4ade80] text-xs font-mono font-bold tracking-wider">
        01 · AUGUST 2026
      </span>

      <div class="relative p-8 rounded-3xl bg-zinc-950/80 border border-white/10 backdrop-blur-2xl transition-all duration-300 group-hover:border-[#22c55e]/40">
        <p class="text-xs font-mono text-zinc-400 tracking-wider uppercase mb-3">Talk // Open Source</p>
        <h2 class="text-4xl font-black tracking-tight leading-[1.1] text-white m-0">
          Open Source:<br>Beyond the Code
        </h2>
        <p class="mt-4 mb-0 text-sm text-zinc-400">Community, Freedom Tech, and moving from consumer to contributor.</p>
      </div>

      <span class="relative text-xs font-mono text-zinc-500 group-hover:text-[#4ade80] transition-colors duration-300">
        Press 1 or click →
      </span>
    </button>

    <!-- 02 — Cyber mono -->
    <button
      class="cm group relative flex w-1/2 flex-col justify-between p-12 text-left border-0 border-l border-solid border-[var(--cm-line)] cursor-pointer transition-colors duration-200 hover:!bg-white hover:!text-black"
      @click.stop="open('first-commit')"
    >
      <div class="flex items-center justify-between">
        <span class="cm-label group-hover:!text-black/60">02 · TALK_02</span>
        <span class="cm-label group-hover:!text-black/60">+</span>
      </div>

      <div>
        <p class="text-[13px] m-0 mb-5">
          <span class="cm-dim group-hover:!text-black/50">$</span> git commit -m "first"
        </p>
        <h2 class="cm-display text-[44px] m-0">
          From first commit<br>to confident<br>contributor
        </h2>
        <div class="h-px my-6 bg-[var(--cm-line)] group-hover:bg-black/20" />
        <p class="text-sm m-0">
          <span class="cm-dim group-hover:!text-black/50">&gt;</span> Building in the age of AI<span class="ml-1">█</span>
        </p>
      </div>

      <span class="cm-label group-hover:!text-black/60">[ PRESS 2 ]</span>
    </button>

    <!-- Shared top strip -->
    <div class="absolute top-0 inset-x-0 flex justify-center pointer-events-none">
      <span class="mt-5 px-3 py-1 bg-black border border-white/15 text-[11px] font-mono tracking-[0.2em] text-zinc-400 uppercase">
        Sadiq Rabiu · 2026 Talks · Select a topic
      </span>
    </div>
  </div>
</template>
