<script setup lang="ts">
/* Hairline spiderweb anchored to a corner. */
withDefaults(defineProps<{ size?: number; corner?: 'tr' | 'tl' | 'br' }>(), { size: 150, corner: 'tr' })
const rings = [0.28, 0.5, 0.72, 0.94]
const spokes = [0, 18, 36, 54, 72, 90]
const pt = (r: number, deg: number) => {
  const t = (deg * Math.PI) / 180
  return [100 - 100 * r * Math.cos(t), 100 * r * Math.sin(t)]
}
const ring = (r: number) =>
  spokes
    .map((d, i) => {
      const [x, y] = pt(r, d)
      if (i === 0) return `M${x},${y}`
      const [px, py] = pt(r * 0.86, d - 9)
      return `Q${px},${py} ${x},${y}`
    })
    .join(' ')
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 100 100"
    class="web"
    :class="corner"
    aria-hidden="true"
  >
    <g stroke="#fff" stroke-opacity="0.32" stroke-width="0.6" fill="none">
      <line v-for="d in spokes" :key="d" x1="100" y1="0" :x2="pt(1.05, d)[0]" :y2="pt(1.05, d)[1]" />
      <path v-for="r in rings" :key="r" :d="ring(r)" />
    </g>
    <line x1="58" y1="0" x2="58" y2="46" stroke="#fff" stroke-opacity="0.4" stroke-width="0.5" class="thread" />
    <g class="spider">
      <ellipse cx="58" cy="50" rx="3.4" ry="4.2" fill="#01D758" />
      <path d="M55 48l-5-3M55 51l-6 0M55 53l-5 3M61 48l5-3M61 51l6 0M61 53l5 3" stroke="#01D758" stroke-width="0.9" />
    </g>
  </svg>
</template>

<style scoped>
.web.tl { transform: scaleX(-1); }
.web.br { transform: scaleY(-1); }
.spider { animation: dangle 4s ease-in-out infinite; transform-origin: 58px 0; }
.thread { animation: dangle 4s ease-in-out infinite; transform-origin: 58px 0; }
@keyframes dangle {
  0%, 100% { transform: rotate(-4deg); }
  50% { transform: rotate(4deg); }
}
</style>
