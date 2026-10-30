<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 34 })
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 40 40" aria-hidden="true">
    <path d="M21 3c-4 5-7 14-9 25h17C27 21 26 13 30 8c-3 1-6-1-9-5Z" fill="#000" stroke="#fff" stroke-width="1.6" stroke-linejoin="round" />
    <rect x="12.5" y="23" width="16" height="3.4" fill="#01D758" />
    <ellipse cx="20.5" cy="29.5" rx="18" ry="3.6" fill="#000" stroke="#fff" stroke-width="1.6" />
  </svg>
</template>
