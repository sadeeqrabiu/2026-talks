<script setup lang="ts">
import { computed } from 'vue'
import { HALLOWEEN } from './deck'
import WitchHat from './halloween/WitchHat.vue'

/* init → commit → branch → parallel work → merge, one click per step. */
const props = withDefaults(defineProps<{ step?: number }>(), { step: 0 })

const M = 170 // main lane
const F = 70 // feature lane

const segs = [
  { d: `M60,${M} L170,${M}`, at: 1 },
  { d: `M170,${M} C230,${M} 230,${F} 290,${F}`, at: 2 },
  { d: `M290,${F} L420,${F}`, at: 3 },
  { d: `M170,${M} L360,${M}`, at: 3 },
  { d: `M420,${F} C490,${F} 490,${M} 560,${M}`, at: 4 },
  { d: `M360,${M} L560,${M}`, at: 4 },
]
const nodes = [
  { x: 60, y: M, at: 0, hash: 'a1f3c9e' },
  { x: 170, y: M, at: 1, hash: '7be20d4' },
  { x: 290, y: F, at: 2, hash: 'c0ffee1' },
  { x: 420, y: F, at: 3, hash: 'f00d42b' },
  { x: 360, y: M, at: 3, hash: '9d1e7aa' },
]
const steps = [
  { cmd: 'git init', say: 'a project gets a memory' },
  { cmd: 'git commit -m "first page"', say: 'save a snapshot' },
  { cmd: 'git switch -c feature', say: 'a safe parallel universe' },
  { cmd: 'git commit  # on both lines', say: 'people work at the same time' },
  { cmd: 'git merge feature', say: 'bring it home' },
]
const now = computed(() => steps[Math.min(props.step, steps.length - 1)])
</script>

<template>
  <div class="flex flex-col gap-5">
    <svg viewBox="0 0 640 220" class="w-full overflow-visible">
      <text x="14" :y="M + 4" class="lane">main</text>
      <text x="300" :y="F - 22" class="lane feat" :class="{ on: step >= 2 }">feature</text>

      <path
        v-for="(s, i) in segs"
        :key="i"
        :d="s.d"
        pathLength="1"
        class="seg"
        :class="{ on: step >= s.at, feat: i === 1 || i === 2 || i === 4 }"
      />

      <g v-for="n in nodes" :key="n.hash" class="nd" :class="{ on: step >= n.at }" :style="{ transformOrigin: `${n.x}px ${n.y}px` }">
        <circle :cx="n.x" :cy="n.y" r="8" fill="#000" stroke="#fff" stroke-width="2.4" />
        <text :x="n.x" :y="n.y + 26" class="hash">{{ n.hash }}</text>
      </g>

      <!-- merge commit -->
      <g class="nd" :class="{ on: step >= 4 }" :style="{ transformOrigin: `560px ${M}px` }">
        <circle cx="560" :cy="M" r="18" fill="#00FF00" opacity="0.2" />
        <circle cx="560" :cy="M" r="10" fill="#000" stroke="#00FF00" stroke-width="3" />
        <text x="560" :y="M + 30" class="hash neon">merged ✓</text>
      </g>
      <g v-if="HALLOWEEN" class="hat" :class="{ on: step >= 4 }">
        <WitchHat :size="38" x="541" :y="M - 46" />
      </g>
    </svg>

    <div class="term">
      <span class="text-[var(--os-green)]">$</span>
      <Transition name="swap" mode="out-in">
        <span :key="now.cmd" class="flex-1 flex justify-between gap-6">
          <span class="text-white">{{ now.cmd }}</span>
          <span class="text-white/45"># {{ now.say }}</span>
        </span>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.lane {
  font-size: 11px;
  fill: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.1em;
}
.lane.feat {
  fill: #01d758;
  opacity: 0;
  transition: opacity 0.5s 0.4s;
}
.lane.feat.on { opacity: 1; }
.seg {
  fill: none;
  stroke: rgba(255, 255, 255, 0.85);
  stroke-width: 3;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: stroke-dashoffset 0.8s var(--os-ease);
}
.seg.feat { stroke: #01d758; }
.seg.on { stroke-dashoffset: 0; }
.nd {
  transform: scale(0);
  transition: transform 0.55s var(--os-spring) 0.45s;
}
.nd.on { transform: scale(1); }
.hash {
  font-size: 10px;
  fill: rgba(255, 255, 255, 0.45);
  text-anchor: middle;
}
.hash.neon { fill: #00ff00; }
.hat {
  transform: translateY(-140px) rotate(-25deg);
  opacity: 0;
  transform-box: fill-box;
  transform-origin: center;
  transition: transform 0.9s var(--os-spring) 1.1s, opacity 0.3s 1.1s;
}
.hat.on {
  transform: translateY(0) rotate(-8deg);
  opacity: 1;
}
.term {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 12px 16px;
  border: 1px solid rgba(1, 215, 88, 0.35);
  border-radius: 8px;
  background: rgba(1, 215, 88, 0.05);
  font-size: 15px;
}
.swap-enter-active,
.swap-leave-active { transition: opacity 0.25s, transform 0.3s var(--os-ease); }
.swap-enter-from { opacity: 0; transform: translateY(8px); }
.swap-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
