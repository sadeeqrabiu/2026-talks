<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  slideNum?: string | number
  title?: string
  subtitle?: string
}

const props = withDefaults(defineProps<Props>(), {
  slideNum: '02',
  title: '',
  subtitle: '',
})

const progressPercent = computed(() => {
  const current = typeof props.slideNum === 'number' ? props.slideNum : parseInt(String(props.slideNum), 10) || 1
  return Math.min(100, Math.max(5, Math.round((current / 17) * 100)))
})
</script>

<template>
  <div
    class="relative flex size-full overflow-hidden bg-black text-white font-sans select-none"
  >
    <!-- Background Ambient Neon Green Glow -->
    <div
      class="absolute top-1/2 left-1/4 -translate-y-1/2 w-[480px] h-[480px] bg-[#22c55e]/15 blur-[140px] rounded-full pointer-events-none"
    />

    <!-- MAIN SPLIT LAYOUT (Matches Slide 1 / DarkGlassHero structure exactly) -->
    <div class="relative z-10 flex size-full">
      
      <!-- LEFT SECTION (60% Width): Title, Subtitle, Slide Content & Progress Bar -->
      <div class="flex w-3/5 flex-col justify-between p-10 lg:p-14">
        


        <!-- Main Title & Subtitle Header -->
        <div class="my-auto py-4">
          <div v-if="props.title" class="mb-5">
            <h2 class="text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
              {{ props.title }}
            </h2>
            <p v-if="props.subtitle" class="mt-2 text-sm lg:text-base text-zinc-400 font-medium">
              {{ props.subtitle }}
            </p>
          </div>

          <!-- SLIDE SPECIFIC CONTENT SLOT -->
          <slot />
        </div>

        <!-- Bottom Timeline Progress Bar -->
        <div class="space-y-3">
          <!-- Neon Green Progress Line -->
          <div class="relative w-full h-[2px] bg-zinc-900 rounded-full overflow-hidden">
            <div
              class="absolute left-0 top-0 h-full bg-[#22c55e] shadow-[0_0_12px_#22c55e] transition-all duration-500"
              :style="{ width: `${progressPercent}%` }"
            />
          </div>
        </div>
      </div>

      <!-- RIGHT SECTION (40% Width): Vertical Ribbed Glass Slats & Glowing Torus Ring -->
      <div class="relative flex w-2/5 overflow-hidden border-l border-white/10">
        
        <!-- Glowing Neon Green Ring Object (Matches Slide 1) -->
        <div
          class="absolute top-1/2 right-12 -translate-y-1/2 w-[340px] h-[340px] rounded-full border-[36px] border-[#4ade80] shadow-[0_0_90px_#22c55e,inset_0_0_60px_#22c55e] pointer-events-none opacity-80"
        />

        <!-- 7 Vertical Frosted Glass Slats (Ribbed Glass Distortion Columns) -->
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
