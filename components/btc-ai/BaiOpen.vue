<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import BaiBtn from './BaiBtn.vue'
import BaiPixel from './BaiPixel.vue'
import { emitBai, seeded, useBaiActive } from './deck'

/*
  Two ways software changes. A company pushes and every device moves at once.
  In Bitcoin a release is an offer, and each node owner decides. Nodes are clickable.
*/
const props = defineProps<{ step: number }>()
const active = useBaiActive()

const COLS = 6
const ROWS = 4
const N = COLS * ROWS

const picked = ref<number | null>(null)
watch(() => props.step, () => (picked.value = null))
const mode = computed<'company' | 'bitcoin'>(() => (picked.value ?? Math.min(props.step, 1)) === 0 ? 'company' : 'bitcoin')

const updated = ref<boolean[]>(Array.from({ length: N }, () => false))
const refused = ref<number | null>(null)
const shipped = ref(false)
const timers: ReturnType<typeof setTimeout>[] = []

const count = computed(() => updated.value.filter(Boolean).length)
const readout = computed(() => {
  if (!shipped.value) return mode.value === 'company' ? 'Every device is on v1.' : 'Every node is on v1.'
  if (mode.value === 'company') return `${count.value} of ${N} updated. Nobody was asked.`
  return `${count.value} of ${N} chose to upgrade.`
})

function clear() {
  timers.splice(0).forEach(clearTimeout)
}
function set(i: number, v: boolean) {
  const next = [...updated.value]
  next[i] = v
  updated.value = next
}
function reset() {
  clear()
  shipped.value = false
  refused.value = null
  updated.value = Array.from({ length: N }, () => false)
}
function ship() {
  reset()
  shipped.value = true
  if (mode.value === 'company') {
    emitBai({ type: 'ripple', x: 680, y: 170 })
    for (let i = 0; i < N; i++) {
      const row = Math.floor(i / COLS)
      timers.push(setTimeout(() => set(i, true), 120 + row * 130))
    }
    return
  }
  // Owners decide one at a time, and some never do
  const rnd = seeded(11)
  for (let i = 0; i < N; i++) {
    if (rnd() < 0.55) timers.push(setTimeout(() => set(i, true), 300 + rnd() * 3200))
  }
}
function tap(i: number) {
  if (mode.value === 'company') {
    refused.value = i
    timers.push(setTimeout(() => (refused.value = null), 450))
    return
  }
  shipped.value = true
  set(i, !updated.value[i])
}

watch([mode, active], ([, on]) => {
  reset()
  if (on) timers.push(setTimeout(ship, 900))
}, { immediate: true })
onBeforeUnmount(clear)
</script>

<template>
  <div class="absolute inset-0">
    <h2 class="bai-heading absolute left-9 top-11">No one can push you an update</h2>

    <div class="copy">
      <p class="line bai-rise on">Most software updates itself.</p>
      <p class="line bai-rise" :class="{ on: step >= 1 }">Bitcoin doesn't. Every node runs what its owner chose.</p>
      <div class="three bai-rise" :class="{ on: step >= 2 }">
        <span>Read the code.</span>
        <span>Run the code.</span>
        <span>Propose a change.</span>
      </div>
    </div>

    <div class="panel bai-paper">
      <div class="flex items-center justify-between">
        <div class="seg">
          <button :class="{ on: mode === 'company' }" @mousedown.prevent @click="picked = 0">A company app</button>
          <button :class="{ on: mode === 'bitcoin' }" @mousedown.prevent @click="picked = 1">Bitcoin</button>
        </div>
        <BaiBtn class="hot" @click="ship">{{ mode === 'company' ? 'Push v2' : 'Release v2' }}</BaiBtn>
      </div>

      <div class="grid" :style="{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }">
        <button
          v-for="(u, i) in updated"
          :key="i"
          class="node"
          :class="{ up: u, no: refused === i }"
          :aria-label="`Node ${i + 1}: ${u ? 'v2' : 'v1'}`"
          @mousedown.prevent
          @click="tap(i)"
        >
          <BaiPixel name="person" :px="2" />
          <span class="ver">{{ u ? 'v2' : 'v1' }}</span>
        </button>
      </div>

      <div class="mt-auto">
        <div class="text-[16px] font-800 tracking-tight">{{ readout }}</div>
        <div class="text-[12px] font-600 mt-1 text-[var(--bai-mute)]">
          {{ mode === 'company' ? 'Click a device. There is no opt-out.' : 'Click any node to decide for it.' }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.copy {
  position: absolute;
  left: 38px;
  top: 112px;
  width: 340px;
}
.line {
  margin: 0 0 16px;
  font-size: 21px;
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: -0.02em;
}
.three {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 26px;
}
.three span {
  align-self: flex-start;
  padding: 3px 10px;
  background: var(--bai-white);
  color: var(--bai-orange);
  font-size: 19px;
  font-weight: 900;
  letter-spacing: -0.02em;
}
.panel {
  position: absolute;
  left: 410px;
  right: 30px;
  top: 96px;
  bottom: 26px;
  padding: 18px;
  display: flex;
  flex-direction: column;
}
.seg {
  display: flex;
  padding: 3px;
  border-radius: 9px;
  background: var(--bai-rule);
}
.seg button {
  height: 30px;
  padding: 0 12px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: var(--bai-ink);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.seg button.on {
  background: var(--bai-ink);
  color: var(--bai-white);
}
.grid {
  display: grid;
  gap: 8px;
  margin-top: 16px;
}
.node {
  height: 62px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border: 0;
  border-radius: 6px;
  background: var(--bai-rule);
  color: var(--bai-ink);
  cursor: pointer;
  transition: background 0.3s, color 0.3s, transform 0.4s var(--bai-spring);
}
.node:hover {
  transform: translateY(-2px);
}
.node.up {
  background: var(--bai-orange);
  color: var(--bai-white);
  transform: scale(1.04);
}
.node.no {
  animation: no 0.42s linear;
}
@keyframes no {
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
.ver {
  font-size: 10px;
  font-weight: 800;
}
</style>
