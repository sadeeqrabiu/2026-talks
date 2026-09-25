<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  slideNum?: string | number
  title?: string
  subtitle?: string
  category?: string
  topic?: string
  totalSlides?: number
}

const props = withDefaults(defineProps<Props>(), {
  slideNum: '02',
  title: '',
  subtitle: '',
  category: '',
  topic: '',
  totalSlides: 9,
})

const progressPercent = computed(() => {
  const current = typeof props.slideNum === 'number' ? props.slideNum : parseInt(String(props.slideNum), 10) || 1
  return Math.min(100, Math.max(5, Math.round((current / props.totalSlides) * 100)))
})
</script>

<template>
  <div
    class="relative flex size-full flex-col justify-between overflow-hidden bg-black text-white font-sans select-none p-10 lg:p-14"
  >
    <!-- Background Ambient Neon Green Glow -->
    <div
      class="absolute top-1/2 right-12 -translate-y-1/2 w-[400px] h-[400px] bg-[#22c55e]/15 blur-[140px] rounded-full pointer-events-none"
    />

    <!-- MAIN SLIDE CONTENT CONTAINER -->
    <div class="relative z-10 my-auto py-4">
      <!-- Category & Topic Tag (if provided) -->
      <div v-if="props.category || props.topic" class="flex items-center gap-3 mb-3">
        <span
          v-if="props.category"
          class="px-2.5 py-1 rounded-lg bg-[#22c55e]/15 border border-[#22c55e]/40 text-[#4ade80] text-xs font-mono font-bold tracking-wider uppercase"
        >
          {{ props.category }}
        </span>
        <span
          v-if="props.topic"
          class="text-xs font-mono text-zinc-400 tracking-wider uppercase"
        >
          {{ props.topic }}
        </span>
      </div>

      <div v-if="props.title" class="mb-6">
        <h2 class="text-3xl lg:text-5xl font-black tracking-tight text-white leading-tight">
          {{ props.title }}
        </h2>
        <p v-if="props.subtitle" class="mt-2 text-base lg:text-lg text-zinc-400 font-medium">
          {{ props.subtitle }}
        </p>
      </div>

      <slot />
    </div>

    <!-- MINIMAL BOTTOM PROGRESS LINE -->
    <div class="relative z-10 space-y-2 pt-2">
      <div class="flex items-center justify-between text-[11px] font-mono text-zinc-500">
        <span>{{ props.category || 'LIVE SESSION' }}</span>
        <span class="text-white font-bold tracking-widest">
          {{ String(props.slideNum).padStart(2, '0') }} / {{ String(props.totalSlides).padStart(2, '0') }}
        </span>
      </div>
      <!-- Minimalist Neon Green Progress Line -->
      <div class="relative w-full h-[2px] bg-zinc-900 rounded-full overflow-hidden">
        <div
          class="absolute left-0 top-0 h-full bg-[#22c55e] shadow-[0_0_12px_#22c55e] transition-all duration-500"
          :style="{ width: `${progressPercent}%` }"
        />
      </div>
    </div>
  </div>
</template>
