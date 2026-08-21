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
    class="relative flex size-full flex-col justify-between overflow-hidden bg-black text-white font-sans select-none p-10 lg:p-14"
  >
    <!-- Background Ambient Neon Green Glow -->
    <div
      class="absolute top-1/2 right-12 -translate-y-1/2 w-[400px] h-[400px] bg-[#22c55e]/15 blur-[140px] rounded-full pointer-events-none"
    />



    <!-- MAIN SLIDE CONTENT CONTAINER -->
    <div class="relative z-10 my-auto py-4">
      <div v-if="props.title" class="mb-6">
        <h2 class="text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
          {{ props.title }}
        </h2>
        <p v-if="props.subtitle" class="mt-2 text-lg text-zinc-400 font-medium">
          {{ props.subtitle }}
        </p>
      </div>

      <slot />
    </div>

    <!-- MINIMAL BOTTOM PROGRESS LINE -->
    <div class="relative z-10">
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
