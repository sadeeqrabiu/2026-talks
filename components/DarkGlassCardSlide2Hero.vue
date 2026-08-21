<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref(0)

const tabs = [
  {
    id: '01',
    label: 'CODE',
    title: 'Code &\ncommits',
    desc: 'Viewing open source strictly as a repository of pull requests, commits, and code submissions.',
    tag: '* developer mindset'
  },
  {
    id: '02',
    label: 'LEARN',
    title: 'Learning &\nsyntax',
    desc: 'Reading production codebases to improve programming syntax and technical skills.',
    tag: '* self education'
  },
  {
    id: '03',
    label: 'PORTFOLIO',
    title: 'Green &\nsquares',
    desc: 'Accumulating green contribution squares on GitHub to showcase active development.',
    tag: '* profile proof'
  },
  {
    id: '04',
    label: 'CAREER',
    title: 'Career &\ngrowth',
    desc: 'A utility tool designed to help software engineers level up and land job opportunities.',
    tag: '* career tool'
  }
]
</script>

<template>
  <div class="relative flex size-full flex-col items-center justify-center bg-black text-white font-sans select-none p-8 lg:p-12 overflow-hidden">
    
    <!-- Deep Vibrant Purple / Neon Emerald Background Glow Beam (Matching image top-left light beam) -->
    <div
      class="absolute top-0 left-0 w-[650px] h-[550px] bg-gradient-to-br from-purple-600/30 via-[#22c55e]/20 to-transparent blur-[140px] pointer-events-none rounded-full"
    />
    <div
      class="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-purple-900/20 blur-[150px] pointer-events-none rounded-full"
    />

    <!-- MINIMAL TOP SLIDE INDICATOR -->
    <div class="absolute top-8 right-12 z-20 flex items-center gap-2 text-xs font-mono">
      <span class="size-1.5 rounded-full bg-[#4ade80]" />
      <span class="text-[#4ade80] font-semibold tracking-widest">02 / 17</span>
    </div>

    <!-- MAIN FROSTED GLASS CARD (Replicates uploaded design image exactly) -->
    <div
      class="relative w-full max-w-5xl h-[520px] rounded-[36px] bg-white/[0.04] border border-white/15 backdrop-blur-3xl p-10 lg:p-14 flex flex-col justify-between shadow-[0_30px_100px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden"
    >
      <!-- Subdued inner glow -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 blur-[100px] pointer-events-none" />

      <!-- TOP GLASS CARD HEADER (Brand Name Left + Glass Navigation Pill Right) -->
      <div class="relative z-10 flex items-center justify-between">
        <!-- Brand Name -->
        <div class="font-serif italic text-lg lg:text-xl text-zinc-300 tracking-wide">
          My Old Definition
        </div>

        <!-- Floating Glass Navigation Pill (Matches top-right pill in reference image) -->
        <div class="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-white/[0.05] border border-white/15 backdrop-blur-md">
          <button
            v-for="(tab, idx) in tabs"
            :key="tab.id"
            @click="activeTab = idx"
            class="px-4 py-1.5 rounded-full text-xs font-mono font-medium tracking-wider transition-all duration-300"
            :class="[
              activeTab === idx
                ? 'bg-white text-black font-bold shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-white/10'
            ]"
          >
            {{ tab.id }} {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- MAIN CONTENT AREA (Left Giant Typography & Right Stylized Accent Text) -->
      <div class="relative z-10 flex items-end justify-between mt-auto pt-8">
        
        <!-- Bottom Left Section: Giant Typography + Arrow + Description -->
        <div class="max-w-xl space-y-6">
          <h1 class="text-5xl lg:text-7xl font-sans font-light tracking-tight leading-[0.95] text-white whitespace-pre-line">
            {{ tabs[activeTab].title }}
          </h1>

          <div class="flex items-start gap-4 pt-2">
            <!-- Arrow Button Icon (Matches ↗ in reference image) -->
            <div class="size-12 rounded-2xl bg-white text-black flex items-center justify-center font-bold text-xl shrink-0 shadow-lg transition-transform hover:scale-105">
              ↗
            </div>

            <p class="text-sm lg:text-base text-zinc-300 font-normal leading-relaxed pt-1">
              {{ tabs[activeTab].desc }}
            </p>
          </div>
        </div>

        <!-- Bottom Right Section: Large Stylized Accent Text (Matches * features in reference image) -->
        <div class="text-right">
          <span class="text-4xl lg:text-6xl font-sans font-medium tracking-tight text-white/30 lowercase">
            {{ tabs[activeTab].tag }}
          </span>
        </div>

      </div>

    </div>

    <!-- Bottom Progress Line -->
    <div class="absolute bottom-6 left-12 right-12 h-[2px] bg-zinc-900 rounded-full overflow-hidden">
      <div class="h-full w-[11.7%] bg-[#4ade80] shadow-[0_0_12px_#22c55e]" />
    </div>

  </div>
</template>
