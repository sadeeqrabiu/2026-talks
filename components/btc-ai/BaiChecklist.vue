<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import BaiBtn from './BaiBtn.vue'
import BaiCat from './BaiCat.vue'
import BaiPixel from './BaiPixel.vue'
import { emitBai } from './deck'

/* Each click ticks a rule, or tick them by hand. The PR only opens once all five hold. */
const props = defineProps<{ step: number }>()

const RULES = [
  'I can explain every line without the AI.',
  'I ran the tests myself.',
  'I read the BIP or the code around it.',
  'I said where AI helped.',
  "It's small enough for someone to review.",
]

const manual = ref<Record<number, boolean>>({})
const opened = ref(false)
watch(() => props.step, () => {
  manual.value = {}
  opened.value = false
})

const isOn = (i: number) => manual.value[i] ?? i < props.step
const count = computed(() => RULES.filter((_, i) => isOn(i)).length)
const ready = computed(() => count.value === RULES.length)

watch(ready, (r) => {
  if (!r) opened.value = false
})

function toggle(i: number) {
  manual.value = { ...manual.value, [i]: !isOn(i) }
}
function open() {
  opened.value = true
  emitBai({ type: 'ripple', x: 780, y: 300 })
}
</script>

<template>
  <div class="absolute inset-0">
    <h2 class="bai-heading absolute left-9 top-11">Before you open the PR</h2>

    <div class="list bai-paper">
      <button
        v-for="(r, i) in RULES"
        :key="r"
        class="rule"
        :class="{ on: isOn(i) }"
        @mousedown.prevent
        @click="toggle(i)"
      >
        <span class="box">
          <svg v-if="isOn(i)" width="14" height="14" viewBox="0 0 14 14" class="bai-pop"><path d="M2 7.5 5.5 11 12 3.5" fill="none" stroke="currentColor" stroke-width="2.5" /></svg>
        </span>
        {{ r }}
      </button>
    </div>

    <div class="pr bai-paper" :class="{ ready, opened }">
      <BaiCat :x="ready ? 214 : 16" />
      <div class="flex items-center justify-between">
        <span class="bai-label">Your pull request</span>
        <span class="state">{{ opened ? 'open' : ready ? 'ready' : 'draft' }}</span>
      </div>
      <div class="text-[16px] font-800 leading-snug mt-3 tracking-tight">test: add CompactSize boundary cases</div>
      <div class="flex items-center gap-2 mt-3 text-[12px] font-600 text-[var(--bai-mute)]">
        <BaiPixel name="person" :px="2" /> you, with AI drafting help
      </div>

      <div class="segs">
        <i v-for="(_, i) in RULES" :key="i" :class="{ on: i < count }" />
      </div>
      <div class="text-[11px] font-700 mt-2">{{ count }} of {{ RULES.length }} checks</div>

      <BaiBtn class="hot w-full justify-center mt-3" :disabled="!ready || opened" @click="open">
        {{ opened ? 'Opened' : 'Open PR' }}
      </BaiBtn>

      <div class="next bai-rise" :class="{ on: opened }">Now stay for the review.</div>
    </div>
  </div>
</template>

<style scoped>
.list {
  position: absolute;
  left: 30px;
  top: 96px;
  bottom: 26px;
  width: 530px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.rule {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--bai-ink);
  text-align: left;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition: background 0.25s;
}
.rule:hover {
  background: #fff0e4;
}
.box {
  flex: none;
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border: 2px solid var(--bai-ink);
  border-radius: 5px;
  color: var(--bai-white);
  transition: background 0.2s, border-color 0.2s;
}
.rule.on .box {
  background: var(--bai-orange);
  border-color: var(--bai-orange);
}
.pr {
  position: absolute;
  right: 30px;
  top: 130px;
  width: 340px;
  bottom: 56px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  transition: transform 0.5s var(--bai-spring);
}
.pr.ready {
  transform: translateY(-8px) scale(1.02);
}
.state {
  padding: 2px 8px;
  border-radius: 3px;
  background: var(--bai-rule);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: background 0.2s, color 0.2s;
}
.pr.ready .state {
  background: var(--bai-orange);
  color: var(--bai-white);
}
.segs {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 3px;
  margin-top: 16px;
}
.segs i {
  display: block;
  height: 10px;
  background: var(--bai-rule);
  transition: background 0.25s;
}
.segs i.on {
  background: var(--bai-orange);
}
.next {
  margin-top: auto;
  font-size: 15px;
  font-weight: 800;
  color: var(--bai-orange);
}
</style>
