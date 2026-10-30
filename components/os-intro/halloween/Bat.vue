<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 22 })
</script>

<template>
  <svg :width="size * 2" :height="size" viewBox="0 0 48 24" aria-hidden="true" class="bat">
    <g class="wing l"><path d="M24 12C19 4 12 3 2 6c4 2 5 5 4 8 3-2 6-1 7 2 2-3 6-3 8-1Z" fill="#fff" fill-opacity="0.85" /></g>
    <g class="wing r"><path d="M24 12c5-8 12-9 22-6-4 2-5 5-4 8-3-2-6-1-7 2-2-3-6-3-8-1Z" fill="#fff" fill-opacity="0.85" /></g>
    <ellipse cx="24" cy="13" rx="3" ry="4.5" fill="#fff" />
    <path d="M22 9l-1-3 2.4 2M26 9l1-3-2.4 2" stroke="#fff" stroke-width="1.2" fill="none" />
  </svg>
</template>

<style scoped>
.wing {
  transform-origin: 24px 12px;
  animation: flap 0.28s ease-in-out infinite alternate;
}
@keyframes flap {
  from { transform: scaleY(1); }
  to { transform: scaleY(-0.35); }
}
</style>
