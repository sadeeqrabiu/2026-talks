<script setup lang="ts">
import { computed } from 'vue'

const totalBlocks = 40 // 4 rows x 10 cols grid

// Left side: 40 filled grey blocks (Old Question)
const leftBlocks = computed(() => Array.from({ length: totalBlocks }))

// Right side: 12 filled glowing green blocks, 28 outline blocks (Shifted Focus)
const rightActiveCount = 12
</script>

<template>
  <div class="absolute inset-0 size-full flex flex-col justify-between bg-black text-white font-sans select-none p-10 lg:p-16 overflow-hidden">
    
    <!-- Deep Ambient Glow behind the Green Section -->
    <div
      class="absolute top-1/2 right-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-[#22c55e]/15 blur-[160px] pointer-events-none rounded-full"
    />

    <!-- MAIN HEADLINE (Matches Topaz headline style) -->
    <div class="relative z-10 max-w-4xl pt-2">
      <h1 class="text-3xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
        Then I discovered Freedom Tech — and my perspective completely shifted.
      </h1>
    </div>

    <!-- METRIC COMPARISON SECTION (Exact Topaz 2-Column layout & Grid visual) -->
    <div class="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 max-w-5xl my-auto">
      
      <!-- LEFT COLUMN: THE OLD QUESTION (Dimmed Grey Aesthetics) -->
      <div class="space-y-4 p-6 rounded-3xl bg-zinc-950/60 border border-white/10 backdrop-blur-xl">
        <!-- Tag Header -->
        <div>
          <span class="text-xs font-mono text-zinc-400 uppercase tracking-wider">The Old Question</span>
        </div>

        <!-- Quote Metric Content -->
        <div class="space-y-2">
          <p class="text-xl lg:text-2xl font-semibold text-zinc-300 leading-snug">
            “How can open source help <span class="text-white underline decoration-[#22c55e]">me</span> become a better developer?”
          </p>
          <div class="text-[11px] font-mono text-zinc-500 uppercase tracking-widest pt-1">
            CAREER & UTILITY FOCUS
          </div>
        </div>

        <!-- 4x10 Grey Squircle Block Grid -->
        <div class="grid grid-cols-10 gap-1.5 pt-3">
          <div
            v-for="(_, i) in leftBlocks"
            :key="i"
            class="h-4 lg:h-5 rounded-md bg-zinc-800 border border-zinc-700/50"
          />
        </div>
      </div>

      <!-- RIGHT COLUMN: THE REAL QUESTION (Glowing Neon Green Aesthetics) -->
      <div class="space-y-4 p-6 rounded-3xl bg-zinc-950/90 border border-[#22c55e]/40 backdrop-blur-2xl shadow-[0_0_50px_rgba(34,197,94,0.15)]">
        <!-- Tag Header Pill -->
        <div>
          <span class="inline-block px-3 py-1 rounded-lg bg-[#22c55e]/15 border border-[#22c55e]/50 text-[#4ade80] text-xs font-mono font-bold tracking-wider">
            Freedom Tech Shift
          </span>
        </div>

        <!-- Quote Metric Content -->
        <div class="space-y-2">
          <p class="text-xl lg:text-2xl font-bold text-white leading-snug">
            “Why are people so passionate about keeping technology <span class="text-[#4ade80] underline decoration-[#4ade80]">open & free</span>?”
          </p>
          <div class="text-[11px] font-mono text-[#4ade80] uppercase tracking-widest pt-1">
            FREEDOM, PRIVACY & COMMUNITY
          </div>
        </div>

        <!-- 4x10 Green Squircle Block Grid -->
        <div class="grid grid-cols-10 gap-1.5 pt-3">
          <div
            v-for="i in totalBlocks"
            :key="i"
            class="h-4 lg:h-5 rounded-md transition-all"
            :class="[
              i <= rightActiveCount
                ? 'bg-[#4ade80] shadow-[0_0_12px_#22c55e] border border-[#4ade80]'
                : 'border border-[#22c55e]/30 bg-transparent'
            ]"
          />
        </div>
      </div>

    </div>

    <!-- BOTTOM WATERMARK & PROGRESS BAR -->
    <div class="relative z-10 space-y-2.5 pt-2">
      <div class="flex items-center justify-between text-[11px] font-mono text-zinc-500">
        <span>PERSPECTIVE SHIFT</span>
        <span class="text-white font-bold tracking-widest">
          Open Source Guild
        </span>
      </div>

      <!-- Minimalist Neon Green Progress Line -->
      <div class="relative w-full h-[2px] bg-zinc-900 rounded-full overflow-hidden">
        <div class="h-full w-[17.6%] bg-[#4ade80] shadow-[0_0_12px_#22c55e]" />
      </div>
    </div>

  </div>
</template>
