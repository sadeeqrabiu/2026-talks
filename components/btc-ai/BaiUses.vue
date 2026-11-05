<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import BaiCat from './BaiCat.vue'
import BaiDemoBips from './BaiDemoBips.vue'
import BaiDemoCore from './BaiDemoCore.vue'
import BaiDemoTests from './BaiDemoTests.vue'
import BaiPixel from './BaiPixel.vue'
import { emitBai, useBaiActive } from './deck'

/* Each click (or a click on a tile) switches the job; the panel's demo plays from the top. */
const props = defineProps<{ step: number }>()
const active = useBaiActive()

const TABS = [
  { icon: 'flask', title: 'Generate tests', sub: 'for Bitcoin libraries' },
  { icon: 'pin', title: 'Navigate Core', sub: 'for new contributors' },
  { icon: 'doc', title: 'Summarize BIPs', sub: 'for learning' },
]
const TOP = 96
const GAP = 138

const picked = ref<number | null>(null)
watch(() => props.step, () => (picked.value = null))
const tab = computed(() => picked.value ?? Math.min(props.step, 2))

function pick(i: number) {
  picked.value = i
  emitBai({ type: 'ripple', x: 120, y: TOP + i * GAP + 50 })
}

const lineY = computed(() => TOP + tab.value * GAP + 56)
const catX = computed(() => [60, 330, 620][tab.value])
</script>

<template>
  <div class="absolute inset-0">
    <h2 class="bai-heading absolute left-9 top-11">Where it helps</h2>

    <button
      v-for="(t, i) in TABS"
      :key="t.title"
      class="tab"
      :class="{ on: tab === i }"
      :style="{ top: `${TOP + i * GAP}px` }"
      @mousedown.prevent
      @click="pick(i)"
    >
      <span class="tile"><BaiPixel :name="t.icon" :px="3" /></span>
      <span class="block text-[14px] font-800 leading-tight mt-2">{{ t.title }}</span>
      <span class="block text-[11px] font-700 leading-tight mt-0.5">{{ t.sub }}</span>
    </button>

    <!-- Wire from the active tile to the panel -->
    <svg class="absolute inset-0 pointer-events-none" width="980" height="552">
      <path
        class="wire"
        :d="`M 208 ${lineY} H 250`"
        fill="none"
        stroke="#fff"
        stroke-width="1.5"
      />
      <rect :x="204" :y="lineY - 3" width="6" height="6" fill="#fff" class="wire" />
    </svg>

    <div class="panel bai-paper">
      <BaiCat :x="catX" />
      <Transition name="swap" mode="out-in">
        <BaiDemoTests v-if="tab === 0" :active="active" />
        <BaiDemoCore v-else-if="tab === 1" :active="active" />
        <BaiDemoBips v-else :active="active" />
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.tab {
  position: absolute;
  left: 36px;
  width: 172px;
  height: 122px;
  padding: 12px;
  border: 0;
  border-radius: 10px;
  text-align: left;
  color: var(--bai-white);
  background: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: background 0.3s, color 0.3s, transform 0.45s var(--bai-spring);
}
.tab:hover {
  transform: translateX(4px);
}
.tab.on {
  background: var(--bai-white);
  color: var(--bai-ink);
  transform: translateX(6px);
}
.tile {
  display: inline-grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.18);
  transition: background 0.3s, color 0.3s;
}
.tab.on .tile {
  background: var(--bai-orange);
  color: var(--bai-white);
}
.wire {
  transition: all 0.5s var(--bai-spring);
}
.panel {
  position: absolute;
  left: 250px;
  top: 96px;
  right: 30px;
  bottom: 26px;
}
.swap-enter-active {
  transition: opacity 0.3s, transform 0.5s var(--bai-ease);
}
.swap-leave-active {
  transition: opacity 0.16s, transform 0.16s;
}
.swap-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.swap-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
