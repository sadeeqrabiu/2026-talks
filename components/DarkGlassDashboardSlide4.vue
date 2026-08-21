<script setup lang="ts">
import { computed } from 'vue'

const valuesList = [
  { label: 'Accessible', desc: 'Universal access without gatekeepers' },
  { label: 'Inspectable', desc: 'Auditable code for privacy & security' },
  { label: 'Modifiable', desc: 'Sovereign customization & control' },
  { label: 'Collective', desc: 'Global distributed collaboration' },
]
</script>

<template>
  <div class="absolute inset-0 size-full flex flex-col justify-between bg-black text-white font-sans p-6 lg:p-10 overflow-y-auto">
    
    <!-- TOP TITLE HEADER -->
    <div class="relative z-10 space-y-1 mb-4">
      <h1 class="text-3xl lg:text-5xl font-black tracking-tight text-white leading-tight">
        What Does “Freedom” Have To Do With Code?
      </h1>
    </div>

    <!-- MAIN DASHBOARD GRID (Replicates uploaded reference image layout exactly) -->
    <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 rounded-3xl border border-white/15 bg-zinc-950/90 backdrop-blur-2xl overflow-hidden my-auto shadow-2xl">
      
      <!-- LEFT SECTION (8 COLS): 3 QUADRANTS -->
      <div class="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 border-b lg:border-b-0 lg:border-r border-white/15">
        
        <!-- TOP-LEFT QUADRANT: 100% PERMISSIONLESS & 10 HUMAN ICONS -->
        <div class="md:col-span-2 p-6 lg:p-8 border-b border-white/15 space-y-4">
          <div class="flex items-center gap-6">
            <div class="text-5xl lg:text-7xl font-black font-mono text-[#4ade80] tracking-tight shrink-0 drop-shadow-[0_0_20px_rgba(34,197,94,0.4)]">
              100%
            </div>
            <p class="text-sm lg:text-base font-semibold text-zinc-200 leading-snug">
              Permissionless Access: Available to anyone, anywhere on Earth without gatekeepers.
            </p>
          </div>

          <!-- 10 Human Pictogram Icons (All 10 highlighted in green) -->
          <div class="flex items-center gap-3 pt-2">
            <div
              v-for="i in 10"
              :key="i"
              class="flex flex-col items-center"
            >
              <svg class="size-7 text-[#4ade80] drop-shadow-[0_0_8px_#22c55e]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- BOTTOM-LEFT QUADRANT: INSPECTABLE & DONUT DIAGRAM -->
        <div class="p-6 lg:p-7 border-r border-white/15 flex items-center gap-5">
          <!-- Circular Donut Chart SVG -->
          <div class="relative size-20 shrink-0">
            <svg class="size-full -rotate-90" viewBox="0 0 36 36">
              <path class="text-zinc-800" stroke-width="4.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path class="text-[#4ade80]" stroke-dasharray="85, 100" stroke-width="4.5" stroke-linecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div class="absolute inset-0 flex items-center justify-center font-mono font-bold text-xs text-white">
              85%
            </div>
          </div>

          <div>
            <div class="text-2xl font-black text-white font-mono">Inspectable</div>
            <p class="text-xs text-zinc-400 mt-1 leading-relaxed">
              Transparent & auditable code for user privacy and data security.
            </p>
          </div>
        </div>

        <!-- BOTTOM-MIDDLE QUADRANT: MODIFIABLE & BAR GRAPHIC -->
        <div class="p-6 lg:p-7 flex items-center gap-5">
          <!-- Bar Comparison Graphic -->
          <div class="flex items-end gap-2 h-16 shrink-0">
            <div class="w-4 h-8 rounded-md bg-zinc-800" />
            <div class="w-5 h-16 rounded-md bg-[#4ade80] shadow-[0_0_12px_#22c55e]" />
          </div>

          <div>
            <div class="text-2xl font-black text-white font-mono">Modifiable</div>
            <p class="text-xs text-zinc-400 mt-1 leading-relaxed">
              Sovereign power for users to inspect, adapt, and run their own software.
            </p>
          </div>
        </div>

      </div>

      <!-- RIGHT COLUMN (4 COLS): 4 STACKED GLASS PILL ROWS -->
      <div class="lg:col-span-4 p-6 lg:p-8 flex flex-col justify-center space-y-3 bg-zinc-950/40 overflow-y-auto max-h-[420px] lg:max-h-none">
        <div
          v-for="(val, idx) in valuesList"
          :key="val.label"
          class="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-3.5 hover:bg-white/[0.08] hover:border-[#4ade80]/40 transition-all group"
        >
          <!-- Circular Arrow Button -->
          <div class="size-8 rounded-full bg-[#4ade80] text-black flex items-center justify-center font-bold text-sm shrink-0 shadow-[0_0_10px_#22c55e] group-hover:scale-110 transition-transform">
            ↑
          </div>

          <div>
            <div class="text-sm font-bold text-white group-hover:text-[#4ade80] transition-colors">
              {{ val.label }}
            </div>
            <div class="text-[11px] text-zinc-400 leading-tight">
              {{ val.desc }}
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
