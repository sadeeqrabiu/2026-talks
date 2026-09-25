<script setup lang="ts">
defineProps<{
  label: string
  heading: string
  items: string[]
  inverted?: boolean
}>()
</script>

<template>
  <div class="flex flex-col p-8" :class="{ 'cm-invert': inverted }">
    <p class="cm-label m-0" :class="{ '!text-black/60': inverted }">{{ label }}</p>
    <h3 class="cm-display text-[30px] mt-3 mb-6">{{ heading }}</h3>
    <ul class="list-none p-0 m-0 mt-auto space-y-3">
      <li v-for="item in items" :key="item" class="flex gap-3 text-[15px] leading-snug">
        <span :class="inverted ? 'text-black/50' : 'cm-dim'">&gt;</span>
        <span>{{ item }}</span>
      </li>
    </ul>
  </div>
</template>
