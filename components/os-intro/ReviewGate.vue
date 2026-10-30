<script setup lang="ts">
import { computed } from 'vue'

/*
  AI fires pull requests at a review gate.
  step 1: PRs stream in and queue at the gate
  step 2: the gate opens — only the ones a human understood get merged
*/
const props = withDefaults(defineProps<{ step?: number }>(), { step: 0 })

const N = 12
const PASS = new Set([2, 5, 9])
const GATE = 300

const prs = computed(() =>
  Array.from({ length: N }, (_, i) => {
    const pass = PASS.has(i)
    const col = Math.floor(i / 4)
    const row = i % 4
    let x = 30
    let y = 70 + row * 34
    let o = 0
    let dim = false
    if (props.step >= 1) {
      x = GATE - 46 - col * 40
      o = 1
    }
    if (props.step >= 2) {
      if (pass) {
        const k = [...PASS].indexOf(i)
        x = GATE + 90 + k * 46
        y = 121
      }
      else {
        dim = true
      }
    }
    return { i, x, y, o, pass, dim, d: props.step === 1 ? i * 0.07 : pass ? 0.3 + [...PASS].indexOf(i) * 0.15 : 0 }
  }),
)
</script>

<template>
  <div class="relative w-[520px] h-[260px]">
    <!-- source -->
    <div class="absolute left-0 top-[82px] w-[70px] h-[96px] rounded-xl border-1.5 border-solid border-white/40 grid place-items-center z-2 bg-black">
      <div class="text-center">
        <div class="text-[20px] font-800">AI</div>
        <div class="text-[9px] text-white/45 tracking-widest">PR × ∞</div>
      </div>
    </div>

    <!-- gate -->
    <div class="absolute top-[40px] bottom-[40px] w-[3px] rounded gate" :class="{ open: step >= 2 }" :style="{ left: `${GATE}px` }" />
    <div class="absolute top-[14px] os-label !text-[var(--os-green)]" :style="{ left: `${GATE - 30}px` }">review</div>
    <div class="absolute top-[14px] os-label" :style="{ left: `${GATE + 110}px` }">merged</div>

    <!-- PRs -->
    <div
      v-for="p in prs"
      :key="p.i"
      class="pr"
      :class="{ pass: p.pass && step >= 2, dim: p.dim }"
      :style="{ transform: `translate(${p.x}px, ${p.y}px)`, opacity: p.o, transitionDelay: `${p.d}s` }"
    >
      <span>PR</span>
      <b v-if="p.pass && step >= 2">✓</b>
    </div>

    <div class="absolute bottom-0 text-[11px] text-white/45 transition-opacity duration-500" :class="step >= 2 ? 'opacity-100' : 'opacity-0'" :style="{ left: `${GATE - 200}px` }">
      generated ≠ understood
    </div>
  </div>
</template>

<style scoped>
.pr {
  position: absolute;
  left: 0;
  top: 0;
  width: 34px;
  height: 22px;
  border-radius: 5px;
  border: 1.5px solid rgba(255, 255, 255, 0.75);
  background: #000;
  font-size: 9px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  transition: transform 0.8s var(--os-ease), opacity 0.4s, border-color 0.4s, box-shadow 0.4s;
}
.pr.pass {
  border-color: #00ff00;
  color: #00ff00;
  box-shadow: 0 0 12px rgba(0, 255, 0, 0.5);
}
.pr.dim {
  opacity: 0.2 !important;
}
.gate {
  background: #01d758;
  box-shadow: 0 0 12px rgba(1, 215, 88, 0.6);
  transition: transform 0.6s var(--os-spring);
  transform-origin: top;
}
.gate.open {
  background: linear-gradient(#01d758 0 40%, transparent 40% 60%, #01d758 60%);
}
</style>
