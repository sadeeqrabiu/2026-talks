<script setup lang="ts">
import { ref } from 'vue'

const galleryImages = [
  { src: '/images/IMG_1064.jpg', label: 'Community Meetup' },
  { src: '/images/IMG_1077.jpg', label: 'Collaborative Coding' },
  { src: '/images/IMG_1097.jpg', label: 'Global Hackathon' },
  { src: '/images/IMG_1249.jpg', label: 'Open Source Guild' },
]

const activeImage = ref(0)
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
      
      <!-- LEFT SECTION (60% Width): Title, Subtitle, 4 Image Grid / Interactive Gallery, Progress Bar -->
      <div class="flex w-3/5 flex-col justify-between p-10 lg:p-14">
        
        <!-- Main Content Area -->
        <div class="my-auto py-4 space-y-5">
          
          <!-- Slide Title & Subtitle -->
          <div>
            <h1 class="text-4xl lg:text-5.5xl font-black tracking-tight leading-[1.1] text-white">
              The Real Value of Open Source
            </h1>
            <p class="text-sm lg:text-base text-zinc-300 font-medium mt-2">
              Real human connections, global community, shared purpose, and real-world impact.
            </p>
          </div>

          <!-- 4 COMMUNITY PHOTO CARDS (Excludes open-source.jpg) -->
          <div class="grid grid-cols-2 gap-3.5 max-w-2xl pt-2">
            <div
              v-for="(img, idx) in galleryImages"
              :key="img.src"
              @click="activeImage = idx"
              class="relative rounded-2xl overflow-hidden bg-zinc-950/80 border transition-all duration-300 cursor-pointer group shadow-xl"
              :class="[
                activeImage === idx
                  ? 'border-[#4ade80] shadow-[0_0_20px_rgba(34,197,94,0.3)] scale-[1.02]'
                  : 'border-white/12 hover:border-white/30'
              ]"
            >
              <img
                :src="img.src"
                :alt="img.label"
                class="w-full h-32 lg:h-36 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <!-- Subtle Dark Gradient Overlay with Label -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                <span class="text-xs font-mono font-bold text-white tracking-wide truncate">
                  {{ img.label }}
                </span>
              </div>
            </div>
          </div>

        </div>

        <!-- Bottom Timeline Progress Bar -->
        <div class="space-y-3 pt-2">
          <div class="flex items-center justify-between text-xs font-mono text-zinc-500">
            <span>HUMAN CONNECTION</span>
            <span class="text-white font-bold tracking-widest">Open Source Guild</span>
          </div>

          <!-- Progress Line with Neon Green Active Bar -->
          <div class="relative w-full h-[2px] bg-zinc-900 rounded-full overflow-hidden">
            <div class="h-full w-[41.1%] bg-[#22c55e] shadow-[0_0_12px_#22c55e]" />
          </div>
        </div>
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
