<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import BaiBtn from './BaiBtn.vue'

/* A long spec condenses into three claims, and every claim points back at its section. */
const props = defineProps<{ active: boolean }>()

const BIPS = [
  {
    id: 'BIP 32',
    name: 'HD wallets',
    points: [
      { text: 'One seed derives a whole tree of keys.', from: 'Wallet structure', line: 3 },
      { text: 'An xpub derives child public keys with no private key.', from: 'Child key derivation', line: 7 },
      { text: 'Hardened paths stop an xpub deriving those children.', from: 'Key derivation', line: 11 },
    ],
  },
  {
    id: 'BIP 141',
    name: 'Segregated witness',
    points: [
      { text: 'Witness data leaves the txid, ending third-party malleability.', from: 'Transaction ID', line: 2 },
      { text: 'Block weight replaces size: 4,000,000 weight units at most.', from: 'Block size', line: 8 },
      { text: 'A witness version byte leaves room for future upgrades.', from: 'Witness program', line: 12 },
    ],
  },
  {
    id: 'BIP 341',
    name: 'Taproot',
    points: [
      { text: 'One output commits to a key and an optional script tree.', from: 'Constructing outputs', line: 4 },
      { text: 'Key path spends look like any single-key spend.', from: 'Design', line: 8 },
      { text: 'Script path spends reveal only the branch they use.', from: 'Script validation rules', line: 12 },
    ],
  },
]

// Stable, uneven line widths so the page reads as text
const WIDTHS = [92, 78, 86, 95, 64, 88, 72, 94, 82, 58, 90, 86, 76, 66]
const LINE_H = 19
const DOC_TOP = 34

const idx = ref(2)
const scan = ref(-1)
const found = ref(0)
const hover = ref<number | null>(null)
let timer: ReturnType<typeof setTimeout> | undefined

const bip = computed(() => BIPS[idx.value])
const scanning = computed(() => scan.value >= 0 && scan.value < WIDTHS.length)

function clear() {
  clearTimeout(timer)
}
function play() {
  clear()
  scan.value = -1
  found.value = 0
  hover.value = null
  const step = () => {
    scan.value++
    found.value = bip.value.points.filter(p => p.line <= scan.value).length
    if (scan.value < WIDTHS.length) timer = setTimeout(step, 115)
  }
  timer = setTimeout(step, 350)
}
function choose(i: number) {
  idx.value = i
  play()
}

watch(() => props.active, on => (on ? play() : clear()), { immediate: true })
onBeforeUnmount(clear)

const pointY = (i: number) => 34 + i * 92 + 34
const lineY = (l: number) => DOC_TOP + l * LINE_H + 5
</script>

<template>
  <div class="absolute inset-0 p-5 flex flex-col">
    <div class="flex items-center gap-2">
      <BaiBtn
        v-for="(b, i) in BIPS"
        :key="b.id"
        :class="{ ghost: idx !== i }"
        @click="choose(i)"
      >
        {{ b.id }}
      </BaiBtn>
      <span class="ml-auto text-[12px] font-700 text-[var(--bai-mute)]">{{ bip.name }}</span>
    </div>

    <div class="relative flex-1 mt-3 min-h-0">
      <!-- Spec page -->
      <div class="page">
        <div class="flex items-center justify-between mb-[9px]">
          <span class="bai-label !text-[var(--bai-ink)]">{{ bip.id }}</span>
          <span class="bai-label">the spec</span>
        </div>
        <div
          v-for="(w, l) in WIDTHS"
          :key="l"
          class="ln"
          :class="{
            hit: bip.points.some((p, k) => p.line === l && k < found),
            bright: hover !== null && bip.points[hover].line === l,
          }"
          :style="{ width: `${w}%` }"
        />
        <div v-show="scanning" class="scan" :style="{ top: `${DOC_TOP + scan * LINE_H}px` }" />
      </div>

      <!-- Links: claim back to source -->
      <svg class="absolute inset-0 pointer-events-none overflow-visible" width="100%" height="100%">
        <path
          v-for="(p, k) in bip.points"
          v-show="k < found"
          :key="`${bip.id}-${k}`"
          class="link"
          :class="{ bright: hover === k }"
          pathLength="1"
          :d="`M 212 ${lineY(p.line)} C 262 ${lineY(p.line)}, 262 ${pointY(k)}, 300 ${pointY(k)}`"
          fill="none"
        />
      </svg>

      <!-- Claims -->
      <div
        v-for="(p, k) in bip.points"
        :key="`${bip.id}-p${k}`"
        class="claim"
        :class="{ on: k < found, hot: hover === k }"
        :style="{ top: `${34 + k * 92}px` }"
        @mouseenter="hover = k"
        @mouseleave="hover = null"
        @click="hover = k"
      >
        <span class="block text-[13px] font-700 leading-snug">{{ p.text }}</span>
        <span class="block text-[10px] font-700 mt-1 text-[var(--bai-orange)]">§ {{ p.from }}</span>
      </div>
    </div>

    <div class="text-[13px] font-800 tracking-tight mt-1">
      Read the summary first. <span class="text-[var(--bai-orange)]">Then read the spec.</span>
    </div>
  </div>
</template>

<style scoped>
.page {
  position: absolute;
  left: 0;
  top: 0;
  width: 212px;
  bottom: 6px;
  padding: 10px 12px;
  overflow: hidden;
  border: 1.5px solid var(--bai-rule);
  border-radius: 8px;
  background: var(--bai-white);
}
.ln {
  height: 9px;
  margin-bottom: 10px;
  border-radius: 1px;
  background: var(--bai-rule);
  transition: background 0.25s, transform 0.4s var(--bai-spring);
  transform-origin: left;
}
.ln.hit {
  background: var(--bai-orange);
  transform: scaleY(1.2);
}
.ln.bright {
  background: var(--bai-ink);
}
.scan {
  position: absolute;
  left: 0;
  right: 0;
  height: 20px;
  background: rgba(255, 92, 10, 0.16);
  border-bottom: 2px solid var(--bai-orange);
  transition: top 0.115s linear;
}
.link {
  stroke: var(--bai-orange);
  stroke-width: 1.5;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: draw 0.5s var(--bai-ease) forwards;
  transition: stroke 0.2s, stroke-width 0.2s;
}
.link.bright {
  stroke: var(--bai-ink);
  stroke-width: 2.5;
}
@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
.claim {
  position: absolute;
  left: 300px;
  right: 0;
  height: 80px;
  padding: 10px 12px;
  border-radius: 8px;
  background: var(--bai-white);
  border: 1.5px solid var(--bai-rule);
  opacity: 0;
  transform: translateX(16px);
  cursor: pointer;
  transition: opacity 0.35s, transform 0.5s var(--bai-spring), border-color 0.2s;
}
.claim.on {
  opacity: 1;
  transform: none;
}
.claim.hot {
  border-color: var(--bai-ink);
}
</style>
