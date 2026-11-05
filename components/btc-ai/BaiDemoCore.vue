<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'

/*
  The path a relayed transaction takes through Bitcoin Core. Checked against
  bitcoin/bitcoin master on 5 Nov 2026; refresh if the talk is given much later.
*/
const props = defineProps<{ active: boolean }>()

const STOPS = [
  {
    file: 'src/net_processing.cpp',
    fn: 'PeerManagerImpl::ProcessMessage',
    what: 'A peer\'s tx message lands here. The bytes become a transaction object and get handed on.',
    grep: 'ProcessMessage',
    tag: '',
  },
  {
    file: 'src/validation.cpp',
    fn: 'ChainstateManager::ProcessTransaction',
    what: 'The door into mempool acceptance. Every relayed transaction comes through it.',
    grep: 'ProcessTransaction',
    tag: '',
  },
  {
    file: 'src/validation.cpp',
    fn: 'MemPoolAccept::PreChecks',
    what: 'The first gauntlet. Cheap checks run before any expensive script verification.',
    grep: 'PreChecks',
    tag: '',
  },
  {
    file: 'src/consensus/tx_check.cpp',
    fn: 'CheckTransaction',
    what: 'Rules every node must agree on: inputs and outputs present, value ranges, no duplicate inputs.',
    grep: 'CheckTransaction',
    tag: 'consensus',
  },
  {
    file: 'src/policy/policy.cpp',
    fn: 'IsStandardTx',
    what: 'Your node\'s relay preferences. Failing here is not the same as being invalid in a block.',
    grep: 'IsStandardTx',
    tag: 'policy',
  },
]

const reached = ref(-1)
const picked = ref<number | null>(null)
let timer: ReturnType<typeof setTimeout> | undefined

const sel = computed(() => picked.value ?? Math.max(0, reached.value))
const stop = computed(() => STOPS[sel.value])

function clear() {
  clearTimeout(timer)
}
function play() {
  clear()
  picked.value = null
  reached.value = -1
  const tick = () => {
    reached.value++
    if (reached.value < STOPS.length - 1) timer = setTimeout(tick, 1500)
  }
  timer = setTimeout(tick, 500)
}
function pick(i: number) {
  clear()
  reached.value = Math.max(reached.value, i)
  picked.value = i
}

watch(() => props.active, on => (on ? play() : clear()), { immediate: true })
onBeforeUnmount(clear)
</script>

<template>
  <div class="absolute inset-0 p-5 flex flex-col">
    <div class="prompt">
      <span class="text-[var(--bai-orange)] font-800">&gt;</span>
      where does a new transaction get validated?
    </div>

    <div class="relative flex-1 mt-4 flex gap-5 min-h-0">
      <!-- Trace -->
      <div class="relative w-[330px] shrink-0">
        <div class="spine" />
        <div class="spine fill" :style="{ height: `${Math.max(0, reached) * 58}px` }" />
        <button
          v-for="(s, i) in STOPS"
          :key="s.fn"
          class="stop"
          :class="{ lit: i <= reached, sel: sel === i && reached >= 0 }"
          :style="{ top: `${i * 58}px` }"
          @mousedown.prevent
          @click="pick(i)"
        >
          <span class="dot" />
          <span class="block text-[9.5px] font-600 opacity-70 truncate">{{ s.file }}</span>
          <span class="block text-[12px] font-800 truncate leading-tight">{{ s.fn }}</span>
        </button>
      </div>

      <!-- Reading -->
      <Transition name="read" mode="out-in">
        <div :key="sel" class="flex-1 min-w-0 flex flex-col">
          <span v-if="stop.tag" class="tag" :class="stop.tag">{{ stop.tag }}</span>
          <span v-else class="bai-label mb-2 h-[20px]">stop {{ sel + 1 }} of {{ STOPS.length }}</span>
          <p class="m-0 text-[15px] font-700 leading-snug">{{ stop.what }}</p>
          <div class="term">
            <span class="text-white/60">$</span> git grep -n "{{ stop.grep }}"<br>&nbsp;&nbsp;{{ stop.file }}
          </div>
        </div>
      </Transition>
    </div>

    <div class="text-[13px] font-800 tracking-tight mt-2">
      AI gives you the map. <span class="text-[var(--bai-orange)]">git grep proves it's real.</span>
    </div>
  </div>
</template>

<style scoped>
.prompt {
  padding: 8px 12px;
  border: 1.5px solid var(--bai-rule);
  border-radius: 8px;
  background: var(--bai-white);
  font-size: 13px;
  font-weight: 600;
}
.spine {
  position: absolute;
  left: 7px;
  top: 21px;
  width: 2px;
  height: 232px;
  background: var(--bai-rule);
}
.spine.fill {
  background: var(--bai-orange);
  transition: height 0.9s var(--bai-ease);
}
.stop {
  position: absolute;
  left: 0;
  width: 100%;
  height: 50px;
  padding: 0 10px 0 26px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--bai-ink);
  text-align: left;
  cursor: pointer;
  opacity: 0.35;
  transition: opacity 0.4s, background 0.25s, color 0.25s, transform 0.4s var(--bai-spring);
}
.stop.lit {
  opacity: 1;
}
.stop.sel {
  background: var(--bai-ink);
  color: var(--bai-white);
  transform: translateX(4px);
}
.dot {
  position: absolute;
  left: 3px;
  top: 19px;
  width: 10px;
  height: 10px;
  background: var(--bai-rule);
  transition: background 0.3s, transform 0.4s var(--bai-spring);
}
.stop.lit .dot {
  background: var(--bai-orange);
}
.stop.sel .dot {
  transform: scale(1.3);
}
.tag {
  align-self: flex-start;
  height: 20px;
  margin-bottom: 8px;
  padding: 0 8px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 800;
  line-height: 20px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--bai-white);
}
.tag.consensus {
  background: var(--bai-orange);
}
.tag.policy {
  background: var(--bai-ink);
}
.term {
  margin-top: auto;
  margin-bottom: 8px;
  padding: 10px 12px;
  border-radius: 6px;
  background: var(--bai-ink);
  color: var(--bai-white);
  font-size: 10.5px;
  font-weight: 500;
  line-height: 1.4;
  word-break: break-all;
}
.read-enter-active {
  transition: opacity 0.25s, transform 0.4s var(--bai-ease);
}
.read-leave-active {
  transition: opacity 0.1s;
}
.read-enter-from {
  opacity: 0;
  transform: translateX(12px);
}
.read-leave-to {
  opacity: 0;
}
</style>
