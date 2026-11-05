<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import BaiBtn from './BaiBtn.vue'

/* The bytes on this slide aren't canned: this is a real CompactSize encoder. */
const props = defineProps<{ active: boolean }>()

const PROMPT = 'draft edge-case tests for CompactSize encoding'

function compactSize(n: bigint): number[] {
  const le = (len: number) => Array.from({ length: len }, (_, i) => Number((n >> BigInt(8 * i)) & 255n))
  if (n < 253n) return [Number(n)]
  if (n <= 0xFFFFn) return [0xFD, ...le(2)]
  if (n <= 0xFFFFFFFFn) return [0xFE, ...le(4)]
  return [0xFF, ...le(8)]
}
const hex = (b: number) => b.toString(16).padStart(2, '0')

const CASES = [252n, 253n, 65535n, 65536n, 4294967295n, 4294967296n].map(n => ({
  label: n.toLocaleString('en-US'),
  bytes: compactSize(n),
}))

const typed = ref(0)
const drafted = ref(0)
const ran = ref(0)
const running = ref(false)
const picked = ref<number | null>(null)
let timer: ReturnType<typeof setTimeout> | undefined

const shown = computed(() => picked.value ?? Math.max(0, ran.value - 1))
const detail = computed(() => {
  const b = CASES[shown.value].bytes
  if (b.length === 1) return `no marker: values under 253 fit in the single byte ${hex(b[0])}`
  const kinds: Record<number, string> = { 0xFD: 'next 2 bytes', 0xFE: 'next 4 bytes', 0xFF: 'next 8 bytes' }
  return `marker ${hex(b[0])} means "${kinds[b[0]]}", then the value in little-endian`
})

function clear() {
  clearTimeout(timer)
}
function run() {
  clear()
  running.value = true
  ran.value = 0
  picked.value = null
  const tick = () => {
    ran.value++
    if (ran.value < CASES.length) timer = setTimeout(tick, 340)
    else running.value = false
  }
  timer = setTimeout(tick, 200)
}
function start() {
  clear()
  typed.value = 0
  drafted.value = 0
  ran.value = 0
  const type = () => {
    typed.value += 1
    if (typed.value < PROMPT.length) {
      timer = setTimeout(type, 20)
      return
    }
    const draft = () => {
      drafted.value++
      if (drafted.value < CASES.length) timer = setTimeout(draft, 110)
      else timer = setTimeout(run, 500)
    }
    timer = setTimeout(draft, 200)
  }
  timer = setTimeout(type, 280)
}

watch(() => props.active, on => (on ? start() : clear()), { immediate: true })
onBeforeUnmount(clear)
</script>

<template>
  <div class="absolute inset-0 p-5 flex flex-col">
    <div class="prompt">
      <span class="text-[var(--bai-orange)] font-800">&gt;</span>
      {{ PROMPT.slice(0, typed) }}<span v-if="typed < PROMPT.length" class="caret" />
    </div>

    <div class="grid grid-cols-[110px_1fr_56px] gap-x-3 mt-3 mb-1 px-2">
      <span class="bai-label">value</span>
      <span class="bai-label">encoded bytes</span>
      <span class="bai-label text-right">test</span>
    </div>

    <div
      v-for="(c, i) in CASES"
      :key="c.label"
      class="row"
      :class="{ show: i < drafted, sel: shown === i && ran > i }"
      @click="ran > i && (picked = i)"
    >
      <span class="text-[12.5px] font-700">{{ c.label }}</span>
      <span class="flex gap-[3px]">
        <template v-if="ran > i">
          <span
            v-for="(b, k) in c.bytes"
            :key="k"
            class="byte bai-pop"
            :class="{ mark: k === 0 && c.bytes.length > 1 }"
            :style="{ animationDelay: `${k * 28}ms` }"
          >{{ hex(b) }}</span>
        </template>
        <span v-else class="text-[11px] text-[var(--bai-mute)] leading-[24px]">{{ i < drafted ? 'waiting' : '' }}</span>
      </span>
      <span class="text-right text-[12px] font-800">
        <span v-if="ran > i" class="inline-block bai-pop">pass</span>
      </span>
    </div>

    <div class="mt-auto flex items-center justify-between gap-4">
      <div class="text-[11.5px] font-600 leading-snug min-h-[32px] flex items-center" :class="{ 'opacity-0': ran === 0 }">
        {{ detail }}
      </div>
      <BaiBtn class="shrink-0" :disabled="running" @click="run">Run ↑</BaiBtn>
    </div>
    <div class="text-[13px] font-800 tracking-tight mt-2">
      AI drafts the cases. <span class="text-[var(--bai-orange)]">You decide what's worth asserting.</span>
    </div>
  </div>
</template>

<style scoped>
.prompt {
  min-height: 36px;
  padding: 8px 12px;
  border: 1.5px solid var(--bai-rule);
  border-radius: 8px;
  background: var(--bai-white);
  font-size: 13px;
  font-weight: 600;
}
.caret {
  display: inline-block;
  width: 8px;
  height: 14px;
  margin-left: 2px;
  vertical-align: -2px;
  background: var(--bai-orange);
}
.row {
  display: grid;
  grid-template-columns: 110px 1fr 56px;
  column-gap: 12px;
  align-items: center;
  height: 33px;
  padding: 0 8px;
  border-radius: 6px;
  opacity: 0;
  transform: translateX(-10px);
  cursor: pointer;
  transition: opacity 0.3s, transform 0.4s var(--bai-ease), background 0.2s;
}
.row.show {
  opacity: 1;
  transform: none;
}
.row.sel {
  background: #fff0e4;
}
.byte {
  display: inline-grid;
  place-items: center;
  width: 25px;
  height: 24px;
  border-radius: 3px;
  background: var(--bai-ink);
  color: var(--bai-white);
  font-size: 11px;
  font-weight: 700;
}
.byte.mark {
  background: var(--bai-orange);
}
</style>
