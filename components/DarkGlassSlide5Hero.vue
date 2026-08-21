<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})

const steps = [
  { num: '01', text: 'Finds a problem in real production systems' },
  { num: '02', text: 'Reports & logs detailed issue parameters' },
  { num: '03', text: 'Investigates root cause & stack traces' },
  { num: '04', text: 'Proposes architectural solution & PR' },
  { num: '05', text: 'Engages in peer code review & feedback' },
  { num: '06', text: 'Tests edge cases & regression scenarios' },
  { num: '07', text: 'Writes documentation & API guides' },
  { num: '08', text: 'Maintains codebase & manages releases' },
  { num: '09', text: 'Mentors new open-source contributors' },
]
</script>

<template>
  <div
    class="relative flex size-full overflow-hidden bg-black text-white font-sans select-none"
  >
    <!-- Background Ambient Neon Green Glow -->
    <div
      class="absolute top-1/2 left-1/4 -translate-y-1/2 w-[480px] h-[480px] bg-[#22c55e]/15 blur-[140px] pointer-events-none rounded-full"
    />

    <!-- GRID LAYOUT: LEFT CONTENT (60%) & RIGHT GLASS SLATS (40%) -->
    <div class="relative z-10 flex size-full">
      
      <!-- LEFT SECTION (60% Width): Title, Animated Vertical List, Progress Bar -->
      <div class="flex w-3/5 flex-col justify-between p-10 lg:p-14">
        
        <!-- Main Title & Animated List Section -->
        <div class="my-auto py-4 space-y-5">
          
          <!-- Slide Title -->
          <h1 class="text-2.5xl lg:text-4.5xl font-black tracking-tight leading-[1.12] text-white">
            The Code Is Only the Beginning
          </h1>

          <!-- Animated Vertical List (Clean Text & Numbers, No Card Frames) -->
          <div class="flex flex-col space-y-3 max-w-xl overflow-y-auto max-h-[360px] pr-2 pt-1">
            <div
              v-for="(step, idx) in steps"
              :key="step.num"
              class="flex items-center gap-4 transition-all duration-700 ease-out group"
              :style="{
                transitionDelay: `${idx * 90 + 120}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(24px)'
              }"
            >
              <span class="text-[#4ade80] font-mono font-bold text-sm shrink-0">
                {{ step.num }}
              </span>
              <span class="text-sm lg:text-base font-medium text-zinc-200 group-hover:text-white transition-colors">
                {{ step.text }}
              </span>
            </div>
          </div>

        </div>

        <!-- Bottom Timeline Progress Bar -->
          <!-- Progress Line with Neon Green Active Bar -->
          
      </div>

      <!-- RIGHT SECTION (40% Width): VERTICAL RIBBED GLASS SLATS & NEON GREEN TORUS RING -->
      <div class="relative flex w-2/5 overflow-hidden border-l border-white/10">
        
        <!-- Glowing Neon Green Ring Object (Matches Slide 1) -->
        <div
          class="absolute top-1/2 right-12 -translate-y-1/2 w-[340px] h-[340px] rounded-full border-[36px] border-[#4ade80] shadow-[0_0_90px_#22c55e,inset_0_0_60px_#22c55e] pointer-events-none opacity-80"
        />

        <!-- Vertical Frosted Glass Slats (Ribbed Glass Distortion Columns) -->
        <div class="relative z-10 flex size-full">
          <div
            v-for="i in 7"
            :key="i"
            class="flex-1 backdrop-blur-2xl bg-white/[0.02] border-r border-white/10 shadow-inner"
          />
        </div>
      </div>

    </div>
  </div>
</template>
