<script setup lang="ts">
import { ref } from 'vue'
import DarkGlassSlide from './DarkGlassSlide.vue'

const activeIndex = ref(3) // Default highlighted item (index 3)

const items = [
  { id: '01', title: 'Developers Contributing Code', desc: 'Viewing open source strictly as PRs & commits' },
  { id: '02', title: 'Learning From Developers', desc: 'Reading production code to learn syntax' },
  { id: '03', title: 'Building Your Portfolio', desc: 'Green contribution squares on GitHub' },
  { id: '04', title: 'Career Enhancement', desc: 'A tool to level up as a software engineer' },
]
</script>

<template>
  <DarkGlassSlide slideNum="02">
    <div class="relative flex flex-col items-center justify-center size-full py-4">
      
      <!-- Glowing Bottom Ring Aura (Inspired by the reference image) -->
      <div
        class="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[240px] rounded-full border-[18px] border-[#22c55e]/30 shadow-[0_0_120px_#22c55e,inset_0_0_80px_#22c55e] blur-md pointer-events-none opacity-70"
      />

      <!-- MAIN DARK GLASS FLOATING CARD (Matches image layout & aesthetics) -->
      <div
        class="relative w-full max-w-2xl rounded-[32px] bg-zinc-950/80 border border-white/15 backdrop-blur-3xl p-8 lg:p-10 shadow-[0_20px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(34,197,94,0.15)] overflow-hidden"
      >
        <!-- Specular Dot Grid Texture Background -->
        <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <!-- TOP CARD HEADER BAR -->
        <div class="relative z-10 flex items-center justify-between mb-6">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10">
            <span class="size-2 rounded-full bg-[#22c55e]" />
            <span class="text-xs font-mono text-zinc-300 font-medium">My Old Definition</span>
          </div>

          <!-- Close / Dismiss Action Icon Button -->
          <button class="size-8 rounded-full bg-white/10 border border-white/15 backdrop-blur-md flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/20 transition-all">
            <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- MAIN QUESTION TITLE -->
        <div class="relative z-10 mb-8">
          <h2 class="text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug">
            How I Originally Defined Open Source
          </h2>
          <p class="text-sm text-zinc-400 mt-2">
            A career & learning tool built exclusively by developers for developers.
          </p>
        </div>

        <!-- RATING / ITEM GLASS PILL STACK -->
        <div class="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div
            v-for="(item, idx) in items"
            :key="item.id"
            @click="activeIndex = idx"
            class="group cursor-pointer p-4 rounded-2xl border transition-all duration-300 backdrop-blur-xl flex items-start gap-3.5"
            :class="[
              activeIndex === idx
                ? 'bg-gradient-to-br from-[#22c55e]/20 to-zinc-900 border-[#22c55e]/50 shadow-[0_0_24px_rgba(34,197,94,0.25)]'
                : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.07] hover:border-white/20'
            ]"
          >
            <!-- Circular Number Pill -->
            <div
              class="size-8 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-all"
              :class="[
                activeIndex === idx
                  ? 'bg-[#22c55e] text-black shadow-[0_0_12px_#22c55e]'
                  : 'bg-white/10 text-zinc-400 group-hover:bg-white/20 group-hover:text-white'
              ]"
            >
              {{ item.id }}
            </div>

            <div>
              <h3
                class="text-sm font-bold leading-tight transition-colors"
                :class="activeIndex === idx ? 'text-white' : 'text-zinc-300 group-hover:text-white'"
              >
                {{ item.title }}
              </h3>
              <p class="text-xs text-zinc-400 mt-1 leading-snug">
                {{ item.desc }}
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  </DarkGlassSlide>
</template>
