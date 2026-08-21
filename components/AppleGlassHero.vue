<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title?: string
  subtitle?: string
  author?: string
  event?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'WebAI',
  subtitle: 'Exploring agentic capabilities within the browser',
  author: 'Sandeep Ramgolam',
  event: 'Developers Conference 2026 · Mauritius',
})
</script>

<template>
  <div
    class="relative flex size-full flex-col items-center justify-center overflow-hidden bg-slate-950 px-6 text-white select-none font-sans"
  >
    <!-- Dynamic Ambient Spectrum Light Blobs -->
    <div
      class="absolute top-1/4 left-1/4 h-80 w-80 rounded-full bg-cyan-500/20 blur-[120px] pointer-events-none"
    />
    <div
      class="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-600/25 blur-[140px] pointer-events-none"
    />
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-indigo-500/15 blur-[160px] pointer-events-none"
    />

    <!-- Apple Liquid Glass Main Stage Container -->
    <div
      class="relative z-10 flex max-w-4xl flex-col items-center text-center p-10 md:p-14 rounded-3xl backdrop-blur-3xl bg-gradient-to-b from-white/12 via-white/5 to-white/2 border border-white/20 shadow-[0_24px_80px_rgba(0,0,0,0.6)] transition-all duration-700 hover:border-white/35 hover:shadow-[0_32px_96px_rgba(0,212,255,0.2)]"
    >
      <!-- Top Pill Badge -->
      <div
        class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-xs font-semibold tracking-wider text-cyan-300 uppercase shadow-inner mb-6"
      >
        <span class="size-2 rounded-full bg-cyan-400" />
        <span>Apple Liquid Glass Edition</span>
      </div>

      <!-- Main Title -->
      <h1
        class="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-200 bg-clip-text text-transparent drop-shadow-lg mb-4"
      >
        {{ props.title }}
      </h1>

      <!-- Subtitle -->
      <p class="max-w-2xl text-xl sm:text-2xl font-light text-slate-200 leading-relaxed mb-8">
        {{ props.subtitle }}
      </p>

      <!-- Glass Divider Line -->
      <div class="w-48 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent mb-8" />

      <!-- Presenter & Event Info Cards -->
      <div class="flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-slate-300">
        <div
          class="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/15 backdrop-blur-lg"
        >
          <span class="text-slate-400">Speaker:</span>
          <strong class="text-white font-semibold">{{ props.author }}</strong>
        </div>

        <div
          class="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/15 backdrop-blur-lg"
        >
          <span class="text-slate-400">Event:</span>
          <span class="text-cyan-300 font-medium">{{ props.event }}</span>
        </div>
      </div>
    </div>

    <!-- Navigation Prompt -->
    <div
      class="absolute bottom-8 flex items-center gap-2 text-xs font-medium text-slate-400 tracking-wider uppercase"
    >
      <span>Click or press space to begin</span>
      <span>→</span>
    </div>
  </div>
</template>
