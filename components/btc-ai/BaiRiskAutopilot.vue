<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import BaiBtn from './BaiBtn.vue'
import { emitBai } from './deck'

/*
  The real check from ConnectBlock, off by one character. A block with exactly
  80,000 sigop cost: old nodes accept it, patched nodes refuse it, and the chain splits.
*/
const props = defineProps<{ active: boolean }>()

const merged = ref(false)
const top = ref(0)
const low = ref(0)
let timer: ReturnType<typeof setTimeout> | undefined

function clear() {
  clearTimeout(timer)
}
function reset() {
  clear()
  merged.value = false
  top.value = 0
  low.value = 0
}
function merge() {
  merged.value = true
  emitBai({ type: 'fork' })
  let n = 0
  const tick = () => {
    n++
    if (n % 2) top.value++
    else low.value++
    if (n < 8) timer = setTimeout(tick, 480)
  }
  timer = setTimeout(tick, 450)
}

watch(() => props.active, (on) => {
  if (!on) reset()
})
onBeforeUnmount(clear)

const TRUNK = [0, 1, 2]
const BLOCK = 30
const STEP = 44
const X0 = 8
const MID = 118
const forkX = X0 + TRUNK.length * STEP
const topBlocks = computed(() => Array.from({ length: top.value }, (_, i) => i))
const lowBlocks = computed(() => Array.from({ length: low.value }, (_, i) => i))

// Twelve nodes that sit on one network, then part ways
const NODES = Array.from({ length: 12 }, (_, i) => ({ i, side: i % 2 === 0 ? -1 : 1, x: 14 + i * 28 }))
</script>

<template>
  <div class="absolute inset-0 p-6 flex gap-5">
    <div class="w-[372px] shrink-0 flex flex-col">
      <span class="bai-label">src/validation.cpp · ConnectBlock</span>
      <div class="diff">
        <div class="del"><b>-</b> if (nSigOpsCost &gt; MAX_BLOCK_SIGOPS_COST)</div>
        <div class="add"><b>+</b> if (nSigOpsCost <span class="char" :class="{ on: merged }">&gt;=</span> MAX_BLOCK_SIGOPS_COST)</div>
      </div>

      <div class="mt-3 text-[13px] font-600 leading-snug">
        <span class="font-800">AI:</span> "Tidied the limit check. Looks safe."
      </div>

      <div class="flex gap-2 mt-3">
        <BaiBtn class="hot" :disabled="merged" @click="merge">Merge on autopilot</BaiBtn>
        <BaiBtn class="ghost" :disabled="!merged" @click="reset">Reset</BaiBtn>
      </div>

      <div class="mt-auto">
        <div class="text-[22px] font-900 tracking-tight leading-tight">
          One character.
          <span class="text-[var(--bai-orange)] after" :class="{ on: merged }">Two chains.</span>
        </div>
        <div class="text-[11px] font-600 text-[var(--bai-mute)] leading-snug mt-2">
          It has happened without AI: BIP 50, the unplanned chain fork of March 2013.
        </div>
      </div>
    </div>

    <!-- Network -->
    <div class="relative flex-1 min-w-0">
      <svg viewBox="0 0 372 300" class="absolute inset-0 w-full h-full">
        <g class="nodes">
          <rect
            v-for="n in NODES"
            :key="n.i"
            class="node"
            :class="{ a: n.side < 0 }"
            :x="n.x"
            width="9"
            height="9"
            :style="{ transform: `translateY(${merged ? (n.side < 0 ? 4 : 282) : 196}px)`, transitionDelay: `${n.i * 24}ms` }"
          />
        </g>

        <!-- Links -->
        <line :x1="X0" :y1="MID + 15" :x2="forkX" :y2="MID + 15" class="wire" />
        <path v-if="merged" :d="`M ${forkX - 14} ${MID + 15} C ${forkX + 6} ${MID + 15}, ${forkX} 62, ${forkX + 20} 62`" class="wire draw" pathLength="1" />
        <path v-if="merged" :d="`M ${forkX - 14} ${MID + 15} C ${forkX + 6} ${MID + 15}, ${forkX} 228, ${forkX + 20} 228`" class="wire draw" pathLength="1" />

        <!-- Trunk -->
        <rect v-for="t in TRUNK" :key="t" :x="X0 + t * STEP" :y="MID" :width="BLOCK" :height="BLOCK" class="blk" />

        <!-- Old rules -->
        <template v-if="merged">
          <text :x="forkX + 18" y="30" class="lab">old nodes: valid</text>
          <g v-for="b in topBlocks" :key="`t${b}`">
            <rect :x="forkX + 18 + b * STEP" y="47" :width="BLOCK" :height="BLOCK" class="blk pop" :class="{ hot: b === 0 }" />
            <line v-if="b" :x1="forkX + 18 + b * STEP - 14" y1="62" :x2="forkX + 18 + b * STEP" y2="62" class="wire" />
          </g>
          <text v-if="top" :x="forkX + 18" y="94" class="lab small">80,000 sigops</text>

          <!-- New rules -->
          <text :x="forkX + 18" y="262" class="lab">patched nodes: rejected</text>
          <g v-for="b in lowBlocks" :key="`l${b}`">
            <rect :x="forkX + 18 + b * STEP" y="213" :width="BLOCK" :height="BLOCK" class="blk pop alt" />
            <line v-if="b" :x1="forkX + 18 + b * STEP - 14" y1="228" :x2="forkX + 18 + b * STEP" y2="228" class="wire" />
          </g>
        </template>

        <text v-else :x="X0" y="96" class="lab">one chain, every node agrees</text>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.diff {
  margin-top: 10px;
  border-radius: 8px;
  overflow: hidden;
  font-size: 11.5px;
  font-weight: 600;
  white-space: nowrap;
}
.diff > div {
  padding: 9px 10px;
}
.del {
  background: #efeae1;
  color: var(--bai-mute);
}
.add {
  background: #ffe6d6;
}
.char {
  display: inline-block;
  padding: 0 2px;
  transition: background 0.2s, color 0.2s, transform 0.5s var(--bai-spring);
}
.char.on {
  background: var(--bai-orange);
  color: var(--bai-white);
  transform: scale(1.35);
}
.after {
  display: inline-block;
  opacity: 0;
  transform: translateX(-8px);
  transition: opacity 0.4s 0.35s, transform 0.6s var(--bai-spring) 0.35s;
}
.after.on {
  opacity: 1;
  transform: none;
}
.wire {
  stroke: var(--bai-mute);
  stroke-width: 1.5;
  fill: none;
}
.draw {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: draw 0.45s var(--bai-ease) 0.1s forwards;
}
@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
.blk {
  fill: var(--bai-ink);
  rx: 3;
}
.blk.hot {
  fill: var(--bai-orange);
}
.blk.alt {
  fill: #b6b0a5;
}
.pop {
  transform-box: fill-box;
  transform-origin: center;
  animation: bai-pop 0.42s var(--bai-spring) both;
}
.lab {
  fill: var(--bai-ink);
  font-size: 11px;
  font-weight: 700;
}
.lab.small {
  fill: var(--bai-orange);
  font-size: 10px;
}
.node {
  fill: var(--bai-ink);
  transition: transform 0.8s var(--bai-spring);
}
.node.a {
  fill: var(--bai-orange);
}
</style>
