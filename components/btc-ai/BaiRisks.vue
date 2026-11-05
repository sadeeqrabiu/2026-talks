<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import BaiCat from './BaiCat.vue'
import BaiPixel from './BaiPixel.vue'
import BaiRiskAutopilot from './BaiRiskAutopilot.vue'
import BaiRiskConfidence from './BaiRiskConfidence.vue'
import BaiRiskHallucination from './BaiRiskHallucination.vue'
import { useBaiActive } from './deck'

const props = defineProps<{ step: number }>()
const active = useBaiActive()

const TABS = [
  { icon: 'ghost', title: 'Hallucinations' },
  { icon: 'gauge', title: 'False confidence' },
  { icon: 'fork', title: 'Autopilot on consensus' },
]

const picked = ref<number | null>(null)
watch(() => props.step, () => (picked.value = null))
const tab = computed(() => picked.value ?? Math.min(props.step, 2))
</script>

<template>
  <div class="absolute inset-0">
    <h2 class="bai-heading absolute left-9 top-11">Where it hurts</h2>

    <div class="tabs">
      <button
        v-for="(t, i) in TABS"
        :key="t.title"
        class="tab"
        :class="{ on: tab === i }"
        @mousedown.prevent
        @click="picked = i"
      >
        <BaiPixel :name="t.icon" :px="2" />
        {{ t.title }}
      </button>
      <span class="tab-mark" :style="{ transform: `translateX(${tab * 100}%)` }" />
    </div>

    <div class="panel bai-paper">
      <Transition name="cut" mode="out-in">
        <BaiRiskHallucination v-if="tab === 0" :active="active" />
        <BaiRiskConfidence v-else-if="tab === 1" />
        <BaiRiskAutopilot v-else :active="active" />
      </Transition>
    </div>
    <div class="cat-rail">
      <BaiCat :x="tab * 306" :px="2" />
    </div>
  </div>
</template>

<style scoped>
.tabs {
  position: absolute;
  left: 30px;
  right: 30px;
  top: 92px;
  height: 42px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.tab {
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 0;
  background: transparent;
  color: var(--bai-white);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: color 0.25s;
}
.tab.on {
  color: var(--bai-ink);
}
.tab-mark {
  position: absolute;
  left: 0;
  top: 0;
  height: 42px;
  width: calc(100% / 3);
  border-radius: 10px 10px 0 0;
  background: var(--bai-paper);
  transition: transform 0.55s var(--bai-spring);
}
.panel {
  position: absolute;
  left: 30px;
  right: 30px;
  top: 134px;
  bottom: 26px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  overflow: hidden;
}
.cat-rail {
  position: absolute;
  left: 292px;
  top: 92px;
  width: 0;
  height: 0;
}
.cut-enter-active {
  transition: opacity 0.3s, transform 0.45s var(--bai-ease);
}
.cut-leave-active {
  transition: opacity 0.14s;
}
.cut-enter-from {
  opacity: 0;
  transform: translateY(14px);
}
.cut-leave-to {
  opacity: 0;
}
</style>
