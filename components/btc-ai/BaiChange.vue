<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import BaiCat from './BaiCat.vue'

/*
  Taproot as the worked example, with stages spaced by real elapsed time.
  PR date from the GitHub API, BIP date from bip-0341's header. Review terms from Core's CONTRIBUTING.md.
*/
const props = defineProps<{ step: number }>()

const STAGES = [
  { when: 'Jan 2018', month: 0, title: 'An idea', text: 'Greg Maxwell posts Taproot to the bitcoin-dev mailing list.' },
  { when: 'Jan 2020', month: 24, title: 'BIPs 340, 341, 342', text: 'The proposal is written up as a spec anyone can review.' },
  { when: 'Oct 2020', month: 33, title: 'Code merged', text: 'PR 19953 lands in Bitcoin Core. The new rules still aren\'t switched on.' },
  { when: 'Jun 2021', month: 41, title: 'Locked in', text: 'Enough miners signal readiness. Activation now has a set height.' },
  { when: 'Nov 2021', month: 46, title: 'Active', text: 'Taproot activates at block 709,632, 46 months after the first post.' },
]
const TOTAL = 46

const TERMS = [
  { term: 'Concept ACK', says: 'I agree with the goal.' },
  { term: 'Approach ACK', says: 'I agree with how it\'s done.' },
  { term: 'ACK <commit>', says: 'I reviewed this exact code.' },
  { term: 'NACK', says: 'No, and here\'s my reason.' },
]

const picked = ref<number | null>(null)
watch(() => props.step, () => (picked.value = null))
const at = computed(() => picked.value ?? Math.min(props.step, STAGES.length - 1))
const pct = (m: number) => (m / TOTAL) * 100
</script>

<template>
  <div class="absolute inset-0">
    <h2 class="bai-heading absolute left-9 top-11">How a change actually lands</h2>

    <div class="panel bai-paper">
      <BaiCat :x="520 + pct(STAGES[at].month) * 3.4" />

      <div class="flex items-baseline justify-between">
        <span class="bai-label">Example: Taproot</span>
        <span class="text-[13px] font-800">
          <span class="text-[var(--bai-orange)] text-[22px] font-900 tracking-tight">{{ STAGES[at].month }}</span> months in
        </span>
      </div>

      <div class="rail">
        <div class="line" />
        <div class="line fill" :style="{ width: `${pct(STAGES[at].month)}%` }" />
        <button
          v-for="(s, i) in STAGES"
          :key="s.when"
          class="stop"
          :class="{ done: i <= at, now: i === at }"
          :style="{ left: `${pct(s.month)}%` }"
          :aria-label="`${s.when}: ${s.title}`"
          @mousedown.prevent
          @click="picked = i"
        >
          <i />
          <span class="when" :class="{ last: i === STAGES.length - 1, first: i === 0 }">{{ s.when }}</span>
        </button>
      </div>

      <Transition name="read" mode="out-in">
        <div :key="at" class="story">
          <div class="text-[36px] font-900 tracking-tight leading-none">{{ STAGES[at].title }}</div>
          <div class="text-[18px] font-600 leading-snug mt-3">{{ STAGES[at].text }}</div>
        </div>
      </Transition>

      <div class="mt-auto">
        <span class="bai-label">The words you'll see on every PR</span>
        <div class="terms">
          <div v-for="t in TERMS" :key="t.term">
            <div class="text-[13px] font-800 text-[var(--bai-orange)]">{{ t.term }}</div>
            <div class="text-[11.5px] font-600 leading-snug mt-0.5">{{ t.says }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.panel {
  position: absolute;
  left: 30px;
  right: 30px;
  top: 96px;
  bottom: 26px;
  padding: 18px 24px;
  display: flex;
  flex-direction: column;
}
.rail {
  position: relative;
  height: 56px;
  margin: 14px 8px 0;
}
.line {
  position: absolute;
  left: 0;
  right: 0;
  top: 11px;
  height: 3px;
  background: var(--bai-rule);
}
.line.fill {
  right: auto;
  background: var(--bai-orange);
  transition: width 0.8s var(--bai-ease);
}
.stop {
  position: absolute;
  top: 0;
  width: 26px;
  height: 56px;
  margin-left: -13px;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border: 0;
  background: transparent;
  color: var(--bai-ink);
  cursor: pointer;
}
.stop i {
  display: block;
  flex: none;
  width: 16px;
  height: 16px;
  margin-top: 4px;
  background: var(--bai-rule);
  transition: background 0.3s, transform 0.4s var(--bai-spring);
}
.stop.done i {
  background: var(--bai-orange);
}
.stop.now i {
  transform: scale(1.5);
}
.when {
  position: absolute;
  left: 50%;
  top: 32px;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 11px;
  font-weight: 700;
}
.when.first {
  left: 0;
  transform: none;
}
.when.last {
  left: auto;
  right: 0;
  transform: none;
}
.stop.now .when {
  color: var(--bai-orange);
  font-weight: 800;
}
.story {
  margin-top: 22px;
  min-height: 110px;
}
.terms {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 8px;
  padding-top: 10px;
  border-top: 1.5px solid var(--bai-rule);
}
.read-enter-active {
  transition: opacity 0.25s, transform 0.4s var(--bai-ease);
}
.read-leave-active {
  transition: opacity 0.1s;
}
.read-enter-from {
  opacity: 0;
  transform: translateX(14px);
}
.read-leave-to {
  opacity: 0;
}
</style>
