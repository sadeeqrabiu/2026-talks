<script setup lang="ts">
import { BAI_TOTAL } from './deck'
import './btc-ai.css'

defineProps<{ kicker: string, index: number }>()

const pad = (n: number) => String(n).padStart(2, '0')
</script>

<template>
  <div class="bai absolute inset-0 select-none">
    <header class="absolute top-5 left-9 right-9 flex items-center justify-between z-20 pointer-events-none">
      <span class="bai-kicker">{{ kicker }}</span>
      <span class="bai-kicker">{{ pad(index) }} / {{ pad(BAI_TOTAL) }}</span>
    </header>
    <slot />
  </div>
</template>
