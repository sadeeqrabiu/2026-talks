<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  tier?: 1 | 2 | 3
  glow?: 'cyan' | 'violet' | 'amber' | 'emerald' | 'none'
  hoverEffect?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  tier: 2,
  glow: 'none',
  hoverEffect: true,
  class: '',
})

const tierClass = computed(() => {
  switch (props.tier) {
    case 1: return 'glass-tier-1'
    case 3: return 'glass-tier-3'
    default: return 'glass-tier-2'
  }
})

const glowClass = computed(() => {
  switch (props.glow) {
    case 'cyan': return 'glass-glow-cyan'
    case 'violet': return 'glass-glow-violet'
    case 'amber': return 'box-shadow: 0 0 40px rgba(251, 191, 36, 0.25)'
    case 'emerald': return 'box-shadow: 0 0 40px rgba(16, 185, 129, 0.25)'
    default: return ''
  }
})
</script>

<template>
  <div
    :class="[
      'relative overflow-hidden rounded-2xl p-6 transition-all duration-500',
      tierClass,
      glowClass,
      props.hoverEffect ? 'hover:scale-[1.02] hover:border-white/30 hover:shadow-2xl' : '',
      props.class
    ]"
  >
    <!-- Specular Reflection Highlight -->
    <div
      class="absolute -top-24 -left-24 w-48 h-48 bg-white/10 blur-2xl rounded-full pointer-events-none"
    />
    
    <!-- Content Slot -->
    <div class="relative z-10">
      <slot />
    </div>
  </div>
</template>
