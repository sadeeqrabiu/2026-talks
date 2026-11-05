<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import BaiBtn from './BaiBtn.vue'
import BaiCat from './BaiCat.vue'
import BaiPixel from './BaiPixel.vue'
import { emitBai } from './deck'

/*
  AI keeps opening pull requests. They stop at the gate until the person in the room
  presses ACK or NACK. The consensus patch won't take a casual ACK.
*/
const props = defineProps<{ live: boolean }>()

const PATCHES = [
  { id: 31, title: 'test: add CompactSize boundary cases', kind: 'tests', consensus: false },
  { id: 32, title: 'docs: plain-English notes on BIP 341', kind: 'docs', consensus: false },
  { id: 33, title: 'refactor: tidy sigop check in ConnectBlock', kind: 'consensus', consensus: true },
]

type State = 'idle' | 'arriving' | 'waiting' | 'merging' | 'rejecting'
const state = ref<State>('idle')
const n = ref(0)
const merged = ref(0)
const rejected = ref(0)
const warn = ref(0)
const chain = ref([0, 1, 2])
let nextBlock = 3
let timer: ReturnType<typeof setTimeout> | undefined

const patch = computed(() => PATCHES[n.value % PATCHES.length])
const later = (ms: number, fn: () => void) => {
  clearTimeout(timer)
  timer = setTimeout(fn, ms)
}

function arrive() {
  warn.value = 0
  state.value = 'idle'
  later(60, () => {
    state.value = 'arriving'
    later(900, () => (state.value = 'waiting'))
  })
}

watch(() => props.live, (on) => {
  if (on) arrive()
  else {
    clearTimeout(timer)
    state.value = 'idle'
  }
}, { immediate: true })

function ack() {
  if (state.value !== 'waiting') return
  if (patch.value.consensus && warn.value === 0) {
    warn.value = 1
    return
  }
  warn.value = 0
  state.value = 'merging'
  emitBai({ type: 'ripple', x: 730, y: 230 })
  merged.value++
  later(620, () => {
    chain.value = [...chain.value, nextBlock++].slice(-4)
    n.value++
    later(500, arrive)
  })
}

function nack() {
  if (state.value !== 'waiting') return
  warn.value = 0
  state.value = 'rejecting'
  rejected.value++
  later(800, () => {
    n.value++
    arrive()
  })
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <div class="bai-paper relative w-full h-full p-5">
    <BaiCat :x="merged * 34 + rejected * 12 + 16" />

    <div class="flex items-center justify-between">
      <span class="bai-label">Who decides what merges?</span>
      <span class="bai-label">merged {{ merged }} · rejected {{ rejected }}</span>
    </div>

    <!-- Track -->
    <div class="track">
      <div class="tile hot" :class="{ emit: state === 'arriving' }" style="left: 0; top: 68px">
        <BaiPixel name="bot" :px="3" />
      </div>
      <span class="cap" style="left: 0; top: 128px; width: 56px">AI draft</span>

      <div class="rule" style="left: 56px; width: 106px; top: 95px" />
      <div class="rule" style="left: 186px; width: 54px; top: 95px" />
      <div class="rule v" style="left: 173px; top: 44px; height: 36px" />

      <div class="tile ink small" :class="{ nod: state === 'merging', shake: state === 'rejecting' }" style="left: 152px; top: 0">
        <BaiPixel name="person" :px="2" />
      </div>
      <span class="cap" style="left: 204px; top: 14px; width: 80px; text-align: left">you</span>

      <!-- Gate -->
      <div class="gate" :class="{ open: state === 'merging' }" style="left: 162px; top: 80px">
        <i /><i />
      </div>

      <!-- The patch itself -->
      <div
        v-if="state !== 'idle'"
        :key="patch.id + merged + rejected"
        class="token"
        :class="[state, { danger: patch.consensus }]"
      />

      <!-- Chain -->
      <div
        v-for="(b, i) in chain"
        :key="b"
        class="blk"
        :style="{ left: `${358 - (chain.length - 1 - i) * 38}px`, opacity: i === 0 && chain.length === 4 ? 0.25 : 1 }"
      >
        <BaiPixel name="block" :px="3" />
      </div>
      <span class="cap" style="right: 0; top: 128px; width: 120px; text-align: right">main</span>
    </div>

    <!-- Patch card -->
    <div class="patch" :class="{ warn: warn > 0, shown: state === 'waiting' }">
      <template v-if="state === 'waiting' || state === 'arriving'">
        <div class="flex items-center justify-between mb-1">
          <span class="bai-label !text-[var(--bai-orange)]">#{{ patch.id }} · {{ patch.kind }}</span>
          <span class="bai-label">opened by AI</span>
        </div>
        <div class="text-[13px] font-700 leading-tight">{{ warn ? 'Consensus code. Can you explain every line?' : patch.title }}</div>
      </template>
      <div v-else class="text-[13px] font-700 pt-3" :class="state === 'merging' ? '' : 'text-[var(--bai-mute)]'">
        {{ state === 'merging' ? `ACK. Your name is on this one.` : state === 'rejecting' ? 'NACK. It goes back for another try.' : '' }}
      </div>
    </div>

    <div class="flex gap-2 mt-3">
      <BaiBtn :disabled="state !== 'waiting'" @click="ack">{{ warn ? 'ACK anyway' : 'ACK' }}</BaiBtn>
      <BaiBtn class="ghost" :disabled="state !== 'waiting'" @click="nack">NACK</BaiBtn>
    </div>

    <div class="absolute left-5 right-5 bottom-4 text-[17px] font-800 tracking-tight">
      AI proposes. <span class="text-[var(--bai-orange)]">A human decides.</span>
    </div>
  </div>
</template>

<style scoped>
.track {
  position: relative;
  height: 150px;
  margin-top: 16px;
}
.tile {
  position: absolute;
  width: 56px;
  height: 56px;
  display: grid;
  place-items: center;
  border-radius: 6px;
  color: var(--bai-white);
}
.tile.small {
  width: 44px;
  height: 44px;
}
.tile.hot {
  background: var(--bai-orange);
}
.tile.ink {
  background: var(--bai-ink);
}
.tile.emit {
  animation: emit 0.45s var(--bai-spring);
}
.tile.nod {
  animation: nod 0.5s var(--bai-ease);
}
.tile.shake {
  animation: no 0.42s linear;
}
@keyframes emit {
  40% {
    transform: scale(1.14) rotate(-4deg);
  }
}
@keyframes nod {
  40% {
    transform: translateY(6px);
  }
}
@keyframes no {
  25% {
    transform: translateX(-6px);
  }
  75% {
    transform: translateX(6px);
  }
}
.cap {
  position: absolute;
  font-size: 10px;
  font-weight: 600;
  text-align: center;
  color: var(--bai-mute);
}
.rule {
  position: absolute;
  height: 2px;
  background: var(--bai-rule);
}
.rule.v {
  width: 2px;
}
.gate {
  position: absolute;
  width: 24px;
  height: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.gate i {
  display: block;
  height: 14px;
  background: var(--bai-ink);
  border-radius: 2px;
  transition: transform 0.35s var(--bai-spring);
}
.gate.open i:first-child {
  transform: translateY(-13px);
}
.gate.open i:last-child {
  transform: translateY(13px);
}
.token {
  position: absolute;
  top: 89px;
  left: 44px;
  width: 14px;
  height: 14px;
  background: var(--bai-orange);
  outline: 2px solid var(--bai-paper);
  transition: left 0.85s var(--bai-ease);
}
.token.danger {
  background: var(--bai-ink);
}
.token.waiting {
  left: 144px;
}
.token.arriving {
  left: 144px;
}
.token.merging {
  left: 330px;
  transition: left 0.6s cubic-bezier(0.5, 0, 0.75, 0);
}
.token.rejecting {
  left: 144px;
  animation: drop 0.75s cubic-bezier(0.5, 0, 0.9, 0.4) both;
}
@keyframes drop {
  to {
    transform: translateY(120px) rotate(120deg);
    opacity: 0;
  }
}
.blk {
  position: absolute;
  top: 82px;
  width: 30px;
  height: 28px;
  display: grid;
  place-items: center;
  color: var(--bai-ink);
  transition: left 0.5s var(--bai-spring), opacity 0.4s;
  animation: bai-pop 0.42s var(--bai-spring) both;
}
.patch {
  height: 66px;
  padding: 10px 12px;
  border: 1.5px solid var(--bai-rule);
  border-radius: 8px;
  background: var(--bai-white);
  transition: border-color 0.2s, background 0.2s;
}
.patch.warn {
  border-color: var(--bai-orange);
  background: #fff3ea;
  animation: no 0.36s linear;
}
</style>
