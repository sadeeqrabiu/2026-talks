<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 28 })
</script>

<template>
  <svg class="ghost" :width="size" :height="size * 1.15" viewBox="0 0 40 46" aria-hidden="true">
    <path
      d="M20 2C10 2 4 9.5 4 19v23l5-4 5 4 6-4 6 4 5-4 5 4V19C36 9.5 30 2 20 2Z"
      fill="#fff"
      fill-opacity="0.92"
    />
    <ellipse cx="14.5" cy="19" rx="2.6" ry="3.4" fill="#000" />
    <ellipse cx="25.5" cy="19" rx="2.6" ry="3.4" fill="#000" />
    <ellipse cx="20" cy="27.5" rx="2.2" ry="2.8" fill="#000" />
  </svg>
</template>

<style scoped>
.ghost {
  display: block;
  filter: drop-shadow(0 0 8px rgba(0, 255, 0, 0.45));
  animation: bob 2.8s ease-in-out infinite;
}
@keyframes bob {
  0%, 100% { transform: translateY(0) rotate(-3deg); }
  50% { transform: translateY(-5px) rotate(3deg); }
}
</style>
