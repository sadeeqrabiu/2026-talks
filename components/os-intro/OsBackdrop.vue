<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'

const nav = useNav()
const fm = computed<Record<string, any>>(() => nav.currentSlideRoute.value?.meta?.slide?.frontmatter ?? {})

// Grid slides a little per slide → parallax as you advance
const currentOsIndex = computed(() => Number(fm.value.index || 1))
const shift = computed(() => `translate(${-currentOsIndex.value * 9}px, ${-currentOsIndex.value * 5}px)`)
const horizon = computed(() => !!fm.value.horizon)
</script>

<template>
  <div class="absolute inset-0">
    <!-- dot grid -->
    <div class="grid-dots" :style="{ transform: shift }" />
    <!-- fade the grid out toward the left rail and the bottom -->
    <div class="absolute inset-0 grid-mask" />

    <!-- horizon (title / section / end slides) -->
    <div class="sky" :class="{ on: horizon }" />
    <div class="planet" :class="{ on: horizon }" />
  </div>
</template>

<style scoped>
.grid-dots {
  position: absolute;
  inset: -120px;
  background-image: radial-gradient(rgba(1, 215, 88, 0.28) 1px, transparent 1.6px);
  background-size: 32px 32px;
  transition: transform 1.4s var(--os-ease);
}
.grid-mask {
  background: radial-gradient(120% 90% at 70% 40%, transparent 40%, #000 100%);
}
.sky {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 45%, rgba(1, 215, 88, 0.1) 72%, rgba(0, 255, 0, 0.22) 88%);
  opacity: 0;
  transition: opacity 1.2s var(--os-ease);
}
.sky.on {
  opacity: 1;
}
.planet {
  position: absolute;
  left: 50%;
  width: 1500px;
  height: 900px;
  margin-left: -750px;
  top: 470px;
  border-radius: 50%;
  background: radial-gradient(closest-side, #000 86%, rgba(1, 215, 88, 0.35) 96%, rgba(0, 255, 0, 0.7) 99.4%, transparent 100%);
  box-shadow: 0 -10px 60px rgba(0, 255, 0, 0.25);
  transform: translateY(160px);
  opacity: 0;
  transition: transform 1.4s var(--os-ease), opacity 1s var(--os-ease);
}
.planet.on {
  transform: translateY(0);
  opacity: 1;
}
</style>
