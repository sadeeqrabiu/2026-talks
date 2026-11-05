<script setup lang="ts">
import BaiPixel from './BaiPixel.vue'
import { baiStats, useBaiActive } from './deck'

/* The backdrop grows the network; this is the sentence it grows around. */
defineProps<{ step: number }>()
const active = useBaiActive()

const FIRST = ['AI,', 'used', 'responsibly,', 'helps']
</script>

<template>
  <div class="absolute inset-0">
    <div class="statement">
      <div class="small">
        <span
          v-for="(w, i) in FIRST"
          :key="w"
          class="word"
          :class="{ on: active }"
          :style="{ transitionDelay: `${0.2 + i * 0.09}s` }"
        >{{ w }}&nbsp;</span>
      </div>

      <div class="big word" :class="{ on: active }" style="transition-delay: .6s">
        <span class="grow">grow</span>
      </div>
      <div class="big word" :class="{ on: active }" style="transition-delay: .72s">contributor</div>
      <div class="big word" :class="{ on: active }" style="transition-delay: .84s">independence,</div>

      <div class="not" :class="{ on: step >= 1 }">
        not replace it.
      </div>
    </div>

    <div class="hint">
      <span class="flex items-center gap-2">
        <BaiPixel name="person" :px="2" />
        <span class="tabular-nums">{{ String(baiStats.contributors).padStart(2, '0') }} contributors</span>
      </span>
      <span class="opacity-90">Click anywhere to add more</span>
    </div>
  </div>
</template>

<style scoped>
.statement {
  position: absolute;
  left: 36px;
  top: 92px;
  width: 590px;
}
.small {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 10px;
}
.word {
  display: inline-block;
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.5s var(--bai-ease), transform 0.8s var(--bai-spring);
}
.word.on {
  opacity: 1;
  transform: none;
}
.big {
  display: block;
  font-size: 58px;
  font-weight: 900;
  line-height: 1.06;
  letter-spacing: -0.05em;
}
.grow {
  display: inline-block;
  padding: 0 12px 2px;
  background: var(--bai-white);
  color: var(--bai-orange);
}
.not {
  margin-top: 18px;
  display: inline-block;
  padding: 6px 14px;
  background: var(--bai-white);
  color: var(--bai-orange);
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.03em;
  opacity: 0;
  transform: translateX(-22px) skewX(-6deg);
  transition: opacity 0.35s, transform 0.65s var(--bai-spring);
}
.not.on {
  opacity: 1;
  transform: none;
}
.hint {
  position: absolute;
  left: 36px;
  bottom: 22px;
  display: flex;
  align-items: center;
  gap: 18px;
  font-size: 12px;
  font-weight: 700;
}
</style>
