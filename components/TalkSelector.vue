<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core'
import { useNav, useSlideContext } from '@slidev/client'
import './cyber/cyber-mono.css'
import './os-intro/os-intro.css'

const nav = useNav()
const { $page } = useSlideContext()

const open = (alias: 'open-source' | 'first-commit' | 'open-source-intro') => nav.go(alias)

// Number keys pick a talk, but only while the selector is on screen
onKeyStroke(['1', '2', '3'], (e) => {
  if (nav.currentPage.value !== $page.value) return
  if (e.key === '1') open('open-source')
  else if (e.key === '2') open('first-commit')
  else if (e.key === '3') open('open-source-intro')
})
</script>

<template>
  <div class="absolute inset-0 flex bg-[#000] text-white select-none overflow-hidden font-sans">
    <!-- 01 — Dark glass (existing talk's language) -->
    <button
      class="group relative flex w-1/3 flex-col justify-between p-8 text-left bg-transparent border-0 text-white cursor-pointer"
      @click.stop="open('open-source')"
    >
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] bg-[#22c55e]/15 blur-[100px] rounded-full pointer-events-none transition-opacity duration-300 opacity-60 group-hover:opacity-100" />

      <span class="relative self-start px-2 py-0.5 rounded-lg bg-[#22c55e]/15 border border-[#22c55e]/40 text-[#4ade80] text-[11px] font-mono font-bold tracking-wider">
        01 · AUGUST 2026
      </span>

      <div class="relative p-6 rounded-2xl bg-zinc-950/80 border border-white/10 backdrop-blur-2xl transition-all duration-300 group-hover:border-[#22c55e]/40">
        <p class="text-[10px] font-mono text-zinc-400 tracking-wider uppercase mb-2">Talk // Open Source</p>
        <h2 class="text-2xl font-black tracking-tight leading-[1.15] text-white m-0">
          Open Source:<br>Beyond the Code
        </h2>
        <p class="mt-3 mb-0 text-xs text-zinc-400 leading-relaxed">Community, Freedom Tech, and moving from consumer to contributor.</p>
      </div>

      <span class="relative text-[11px] font-mono text-zinc-500 group-hover:text-[#4ade80] transition-colors duration-300">
        Press 1 or click →
      </span>
    </button>

    <!-- 02 — Cyber mono -->
    <button
      class="cm group relative flex w-1/3 flex-col justify-between p-8 text-left border-0 border-l border-solid border-[var(--cm-line)] cursor-pointer transition-colors duration-200 hover:!bg-[#fff] hover:!text-black"
      @click.stop="open('first-commit')"
    >
      <div class="flex items-center justify-between">
        <span class="cm-label group-hover:!text-black/60">02 · TALK_02</span>
        <span class="cm-label group-hover:!text-black/60">+</span>
      </div>

      <div>
        <p class="text-[12px] m-0 mb-3">
          <span class="cm-dim group-hover:!text-black/50">$</span> git commit -m "first"
        </p>
        <h2 class="cm-display text-[26px] leading-[1.05] m-0">
          From first commit<br>to confident<br>contributor
        </h2>
        <div class="h-px my-4 bg-[var(--cm-line)] group-hover:bg-[#000]/20" />
        <p class="text-xs m-0 leading-relaxed">
          <span class="cm-dim group-hover:!text-black/50">&gt;</span> Building in the age of AI<span class="ml-1">█</span>
        </p>
      </div>

      <span class="cm-label group-hover:!text-black/60">[ PRESS 2 ]</span>
    </button>

    <!-- 03 — Green rail (Open Source Intro) -->
    <button
      class="os-layout group relative flex w-1/3 flex-col justify-between p-8 text-left border-0 border-l border-solid border-[#01d758]/25 bg-transparent cursor-pointer transition-all duration-200 hover:bg-[#01d758]/5 hover:border-[#00ff00]/60"
      @click.stop="open('open-source-intro')"
    >
      <div class="flex items-center justify-between">
        <span class="os-label !text-[#01d758] group-hover:!text-[#00ff00]">03 · OS_INTRO</span>
        <span class="os-label !text-white/40 group-hover:!text-[#00ff00]">[1983]</span>
      </div>

      <div>
        <p class="text-[12px] text-white/50 m-0 mb-3 font-mono">
          <span class="text-[#01d758]">$</span> git log --since=1983
        </p>
        <h2 class="text-[26px] font-800 leading-[1.1] text-white m-0 tracking-tight font-mono">
          Open<br><span class="text-[#00ff00] drop-shadow-[0_0_12px_rgba(0,255,0,0.5)]">Source</span>
        </h2>
        <div class="h-px my-4 bg-[#01d758]/25 group-hover:bg-[#00ff00]/40 transition-colors" />
        <p class="text-xs text-white/60 m-0 leading-relaxed font-mono">
          <span class="text-[#01d758]">&gt;</span> Intro, Linux, AI, Bitcoin & the OSGuild pathway.
        </p>
      </div>

      <span class="os-label !text-[#01d758] group-hover:!text-[#00ff00] transition-colors">
        [ PRESS 3 ]
      </span>
    </button>

    <!-- Shared top strip -->
    <div class="absolute top-0 inset-x-0 flex justify-center pointer-events-none">
      <span class="mt-4 px-3 py-1 bg-[#000] border border-white/15 text-[11px] font-mono tracking-[0.2em] text-zinc-400 uppercase">
        Sadiq Rabiu · 2026 Talks · Select a topic
      </span>
    </div>
  </div>
</template>
