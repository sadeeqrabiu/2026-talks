<script setup lang="ts">
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
      
      <!-- LEFT SECTION (60% Width): Title, Narrative, Quote Card, Progress Bar -->
      <div class="flex w-3/5 flex-col justify-between p-10 lg:p-14">
        
        <!-- Main Content Area -->
        <div class="my-auto py-4 space-y-6 max-w-2xl">
          

          <!-- Main Narrative Paragraph -->
          <p class="text-lg lg:text-xl font-medium text-zinc-300 leading-relaxed">
            Open source is built by people who spend hours understanding codebases they didn't create answering questions, reviewing PRs, and maintaining critical software.
          </p>

        </div>

      </div>

      <!-- RIGHT SECTION (40% Width): VERTICAL RIBBED GLASS SLATS & NEON GREEN TORUS RING -->
      <div class="relative flex w-2/5 overflow-hidden border-l border-white/10">
        
        <!-- Glowing Neon Green Ring Object -->
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
