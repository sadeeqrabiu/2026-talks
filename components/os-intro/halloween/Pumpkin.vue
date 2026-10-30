<script setup lang="ts">
/* Sized to sit inside one contribution-graph cell. */
withDefaults(defineProps<{ size?: number }>(), { size: 12 })
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 3.5c.3-1.4 1.2-2.2 2.6-2.4" stroke="#01D758" stroke-width="1.8" fill="none" stroke-linecap="round" />
    <path
      d="M12 5c-2-1.4-6-1.3-8.2 1.6C1.5 9.6 1.6 15.6 4 19c2.2 3 6 3.3 8 2.2 2 1.1 5.8.8 8-2.2 2.4-3.4 2.5-9.4.2-12.4C18 3.7 14 3.6 12 5Z"
      fill="#01D758"
    />
    <path d="M7 11l2.2-2 1.4 2.6ZM17 11l-2.2-2-1.4 2.6ZM7 15c1.6 1.8 3.2 1 5 2 1.8-1 3.4-.2 5-2-1.2 3.4-8.8 3.4-10 0Z" fill="#000" />
  </svg>
</template>
