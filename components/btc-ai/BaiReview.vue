<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import BaiBtn from './BaiBtn.vue'
import BaiCat from './BaiCat.vue'
import { useBaiActive } from './deck'

/*
  A small queue model with made-up numbers. It shows the shape of the problem, not a
  measurement: PRs arrive every week, and each reviewer clears a fixed number.
*/
const props = defineProps<{ step: number }>()
const active = useBaiActive()

const PER_REVIEWER = 5
const SHOW_MAX = 150
const WEEK_MS = 750
const PRESETS = [
  { prs: 8, reviewers: 2 },
  { prs: 24, reviewers: 2 },
  { prs: 24, reviewers: 6 },
]

const prs = ref(8)
const reviewers = ref(2)
const backlog = ref(0)
const week = ref(0)
let timer: ReturnType<typeof setInterval> | undefined

const capacity = computed(() => reviewers.value * PER_REVIEWER)
const net = computed(() => prs.value - capacity.value)
const status = computed(() => {
  if (net.value > 0) return `Queue grows by ${net.value} a week`
  if (backlog.value > 0) return `Queue shrinks by ${-net.value} a week`
  return 'Queue under control'
})
const tokens = computed(() => Math.min(backlog.value, SHOW_MAX))

function tick() {
  week.value++
  backlog.value = Math.max(0, backlog.value + net.value)
}
function run(on: boolean) {
  clearInterval(timer)
  if (on) timer = setInterval(tick, WEEK_MS)
}

watch(() => props.step, (s) => {
  const p = PRESETS[Math.min(s, PRESETS.length - 1)]
  prs.value = p.prs
  reviewers.value = p.reviewers
  if (s === 0) {
    backlog.value = 0
    week.value = 0
  }
}, { immediate: true })
watch(active, run, { immediate: true })
onBeforeUnmount(() => clearInterval(timer))

const bump = (r: typeof prs, by: number, min: number, max: number) => {
  r.value = Math.min(max, Math.max(min, r.value + by))
}
</script>

<template>
  <div class="absolute inset-0">
    <h2 class="bai-heading absolute left-9 top-11">Drafting got cheap. Review didn't.</h2>

    <div class="panel bai-paper">
      <BaiCat :x="net > 0 ? 840 : 680" />

      <div class="controls">
        <div class="ctl">
          <span class="bai-label">AI-drafted PRs a week</span>
          <div class="flex items-center gap-2 mt-2">
            <BaiBtn class="ghost sq" @click="bump(prs, -4, 0, 60)">−</BaiBtn>
            <span class="val">{{ prs }}</span>
            <BaiBtn class="ghost sq" @click="bump(prs, 4, 0, 60)">+</BaiBtn>
          </div>
        </div>
        <div class="ctl">
          <span class="bai-label">Reviewers</span>
          <div class="flex items-center gap-2 mt-2">
            <BaiBtn class="ghost sq" @click="bump(reviewers, -1, 1, 12)">−</BaiBtn>
            <span class="val">{{ reviewers }}</span>
            <BaiBtn class="ghost sq" @click="bump(reviewers, 1, 1, 12)">+</BaiBtn>
          </div>
          <div class="text-[11px] font-600 text-[var(--bai-mute)] mt-2">Each clears {{ PER_REVIEWER }} a week</div>
        </div>
        <div class="text-[11px] font-600 text-[var(--bai-mute)] mt-auto">Illustrative numbers, not measured data.</div>
      </div>

      <div class="queue">
        <div class="flex items-baseline justify-between">
          <span class="text-[17px] font-800 tracking-tight" :class="{ 'text-[var(--bai-orange)]': net > 0 }">{{ status }}</span>
          <span class="bai-label">week {{ week }} · {{ backlog }} waiting</span>
        </div>
        <div class="cells">
          <i v-for="i in tokens" :key="i" class="bai-pop" />
        </div>
        <div v-if="backlog > SHOW_MAX" class="text-[11px] font-700 mt-1">+{{ backlog - SHOW_MAX }} more waiting</div>
      </div>
    </div>

    <div class="takeaway bai-rise" :class="{ on: step >= 2 }">
      More PRs won't fix that. More people who can review will.
    </div>
  </div>
</template>

<style scoped>
.panel {
  position: absolute;
  left: 30px;
  right: 30px;
  top: 96px;
  bottom: 70px;
  padding: 18px 22px;
  display: flex;
  gap: 28px;
}
.controls {
  width: 216px;
  flex: none;
  display: flex;
  flex-direction: column;
  gap: 22px;
}
.sq {
  width: 34px;
  padding: 0;
  justify-content: center;
  font-size: 18px;
}
.val {
  width: 54px;
  text-align: center;
  font-size: 34px;
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1;
}
.queue {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
.cells {
  flex: 1;
  margin-top: 12px;
  padding: 10px;
  border: 1.5px solid var(--bai-rule);
  border-radius: 8px;
  background: var(--bai-white);
  display: grid;
  grid-template-columns: repeat(25, 1fr);
  grid-auto-rows: 18px;
  gap: 3px;
  align-content: start;
  overflow: hidden;
}
.cells i {
  display: block;
  border-radius: 2px;
  background: var(--bai-orange);
}
.takeaway {
  position: absolute;
  left: 36px;
  right: 36px;
  bottom: 26px;
  font-size: 22px;
  font-weight: 900;
  letter-spacing: -0.03em;
}
</style>
