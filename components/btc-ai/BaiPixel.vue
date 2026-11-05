<script setup lang="ts">
import { computed } from 'vue'
import { PIXELS } from './deck'

const props = withDefaults(defineProps<{ name?: string, rows?: string[], px?: number }>(), { px: 3 })

const COLORS: Record<string, string> = { '#': 'currentColor', 'w': '#ffffff', 'o': 'var(--bai-orange)' }
const grid = computed(() => props.rows ?? PIXELS[props.name ?? 'bot'])
const w = computed(() => grid.value[0].length)
const cells = computed(() =>
  grid.value.flatMap((row, y) =>
    [...row].flatMap((ch, x) => (COLORS[ch] ? [{ x, y, fill: COLORS[ch] }] : [])),
  ),
)
</script>

<template>
  <svg
    :viewBox="`0 0 ${w} ${grid.length}`"
    :width="w * px"
    :height="grid.length * px"
    shape-rendering="crispEdges"
    class="block"
    aria-hidden="true"
  >
    <rect v-for="c in cells" :key="`${c.x}-${c.y}`" :x="c.x" :y="c.y" width="1" height="1" :fill="c.fill" />
  </svg>
</template>
