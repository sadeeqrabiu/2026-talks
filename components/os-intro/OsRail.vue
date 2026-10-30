<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRafFn } from '@vueuse/core'
import { useNav } from '@slidev/client'
import { HALLOWEEN, springStep, OS_TOTAL } from './deck'
import Ghost from './halloween/Ghost.vue'
import Bat from './halloween/Bat.vue'

/*
  The commit rail from the reference art: a vertical main line, a glowing node
  that springs down it as the deck advances (node position = progress), and a
  branch that forks out around the node on section slides.
*/
const X = 46
const TOP = 34
const BOTTOM = 518
const H = 552

const nav = useNav()
const fm = computed<Record<string, any>>(() => nav.currentSlideRoute.value?.meta?.slide?.frontmatter ?? {})

const currentOsIndex = computed(() => Number(fm.value.index || 1))
const yFor = (page: number) => TOP + ((page - 1) / Math.max(1, OS_TOTAL - 1)) * (BOTTOM - TOP)
const targetY = computed(() => yFor(currentOsIndex.value))
const targetA = computed(() => (fm.value.fork ? 34 : 0))

const y = ref(targetY.value)
const a = ref(targetA.value)
let vy = 0
let va = 0
const reduced = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

useRafFn(({ delta }) => {
  if (reduced) {
    y.value = targetY.value
    a.value = targetA.value
    return
  }
  const dt = Math.min(delta, 32) / 1000
  ;[y.value, vy] = springStep(y.value, vy, targetY.value, dt, 120, 20)
  ;[a.value, va] = springStep(a.value, va, targetA.value, dt, 140, 14)
})

const branch = computed(() => {
  const Y = y.value
  const B = X + a.value
  return `M${X},${Y - 120} C${X},${Y - 80} ${B},${Y - 80} ${B},${Y - 42} L${B},${Y + 42} C${B},${Y + 80} ${X},${Y + 80} ${X},${Y + 120}`
})
const nodeX = computed(() => X + a.value)
const stop = computed(() => Math.min(1, Math.max(0, y.value / H)))
const ticks = computed(() => Array.from({ length: OS_TOTAL }, (_, i) => ({ y: yFor(i + 1), done: i + 1 <= currentOsIndex.value })))

const isFirst = computed(() => currentOsIndex.value === 1)
const isLast = computed(() => currentOsIndex.value === OS_TOTAL)
</script>

<template>
  <svg class="absolute inset-0" width="980" height="552" viewBox="0 0 980 552">
    <defs>
      <linearGradient id="os-rail" x1="0" y1="0" x2="0" :y2="H" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#01D758" stop-opacity="0.9" />
        <stop :offset="stop" stop-color="#00FF00" stop-opacity="1" />
        <stop :offset="Math.min(1, stop + 0.04)" stop-color="#01D758" stop-opacity="0.35" />
        <stop offset="1" stop-color="#01D758" stop-opacity="0.04" />
      </linearGradient>
      <filter id="os-glow" x="-200%" y="-200%" width="500%" height="500%">
        <feGaussianBlur stdDeviation="4" result="b" />
        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>

    <!-- main -->
    <line :x1="X" y1="0" :x2="X" :y2="H" stroke="url(#os-rail)" stroke-width="2" />
    <!-- fork -->
    <path v-if="a > 0.5" :d="branch" fill="none" stroke="url(#os-rail)" stroke-width="2" />
    <!-- one tick per slide -->
    <circle
      v-for="(t, i) in ticks"
      :key="i"
      :cx="X"
      :cy="t.y"
      r="1.8"
      :fill="t.done ? '#01D758' : 'rgba(255,255,255,0.18)'"
    />
    <!-- the live commit -->
    <circle :cx="nodeX" :cy="y" r="9" fill="#00FF00" opacity="0.18" filter="url(#os-glow)" />
    <circle :cx="nodeX" :cy="y" r="5" fill="#000" stroke="#fff" stroke-width="2.2" filter="url(#os-glow)" />
  </svg>

  <!-- costumes -->
  <template v-if="HALLOWEEN">
    <div class="absolute rider" :style="{ left: `${nodeX - 13}px`, top: `${y - 40}px` }">
      <Transition name="boo">
        <Ghost v-if="isFirst || isLast" :size="26" />
      </Transition>
    </div>
    <template v-if="fm.fork && !isFirst">
      <Bat :key="`a${currentOsIndex}`" class="absolute bat-a" :size="22" />
      <Bat :key="`b${currentOsIndex}`" class="absolute bat-b" :size="14" />
    </template>
  </template>
</template>

<style scoped>
.rider {
  width: 26px;
}
.boo-enter-active,
.boo-leave-active {
  transition: opacity 0.6s var(--os-ease), transform 0.8s var(--os-spring);
}
.boo-enter-from,
.boo-leave-to {
  opacity: 0;
  transform: translateY(18px) scale(0.6);
}
.bat-a,
.bat-b {
  top: 0;
  left: 0;
  opacity: 0;
  animation: fly 3.4s var(--os-ease) 0.4s 1 forwards;
}
.bat-b {
  animation-duration: 4s;
  animation-delay: 0.7s;
  --dy: 40px;
}
@keyframes fly {
  0% { transform: translate(1010px, 150px) rotate(-6deg); opacity: 0; }
  10% { opacity: 0.85; }
  35% { transform: translate(700px, calc(70px + var(--dy, 0px))) rotate(4deg); }
  65% { transform: translate(380px, calc(120px + var(--dy, 0px))) rotate(-5deg); }
  90% { opacity: 0.8; }
  100% { transform: translate(-60px, calc(40px + var(--dy, 0px))) rotate(3deg); opacity: 0; }
}
</style>
