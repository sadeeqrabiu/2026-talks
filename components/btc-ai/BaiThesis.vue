<script setup lang="ts">
import BaiGate from './BaiGate.vue'
import { useBaiActive } from './deck'

/* step 0: the thesis takes the slide. step 1: it tucks left and the merge gate comes in. */
defineProps<{ step: number }>()
const active = useBaiActive()
</script>

<template>
  <div class="absolute inset-0">
    <p class="thesis" :class="{ tucked: step >= 1 }">
      <span class="lead">AI's role in Bitcoin development is</span>
      <span class="flex flex-wrap items-baseline gap-x-3 gap-y-1 mt-2">
        <span class="yes" :class="{ on: active }">assistive,</span>
        <span class="no">
          <span>not </span>
          <span class="strike" :class="{ on: active }">authoritative.</span>
        </span>
      </span>
    </p>

    <div class="gate-slot bai-rise" :class="{ on: step >= 1 }">
      <BaiGate :live="active && step >= 1" />
    </div>
  </div>
</template>

<style scoped>
.thesis {
  position: absolute;
  left: 38px;
  top: 150px;
  width: 560px;
  margin: 0;
  color: var(--bai-white);
  font-size: 15px;
  font-weight: 600;
  transform: scale(1.4);
  transform-origin: top left;
  transition: transform 0.95s var(--bai-ease), width 0.95s var(--bai-ease), top 0.95s var(--bai-ease);
}
.thesis.tucked {
  top: 170px;
  width: 440px;
  transform: none;
}
.yes {
  display: inline-block;
  padding: 0 10px;
  font-size: 34px;
  font-weight: 900;
  letter-spacing: -0.03em;
  color: var(--bai-orange);
  background: var(--bai-white);
  transform: scale(0.7);
  opacity: 0;
  transition: transform 0.6s var(--bai-spring) 0.25s, opacity 0.3s 0.25s;
}
.yes.on {
  transform: none;
  opacity: 1;
}
.no {
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.02em;
}
.strike {
  position: relative;
  display: inline-block;
}
.strike::after {
  content: '';
  position: absolute;
  left: -3px;
  right: -3px;
  top: 54%;
  height: 4px;
  background: var(--bai-ink);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.55s var(--bai-ease) 0.85s;
}
.strike.on::after {
  transform: scaleX(1);
}
.gate-slot {
  position: absolute;
  right: 28px;
  top: 66px;
  width: 440px;
  height: 416px;
  transition-delay: 0.25s;
}
.gate-slot:not(.on) {
  pointer-events: none;
}
</style>
