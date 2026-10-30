<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useIsSlideActive } from '@slidev/client'

/*
  Counts 0 → `to` (ease-out expo) whenever `on` is true AND its slide is the
  active one, so it replays each time you land on the slide.
*/
const props = withDefaults(
  defineProps<{ to: number; on?: boolean; ms?: number; decimals?: number; prefix?: string; suffix?: string }>(),
  { on: true, ms: 1600, decimals: 0, prefix: '', suffix: '' },
)
const active = useIsSlideActive()
const shown = ref(0)
let raf = 0
let settle: ReturnType<typeof setTimeout> | undefined

function stop() {
  cancelAnimationFrame(raf)
  clearTimeout(settle)
}

function run() {
  stop()
  const t0 = performance.now()
  const tick = (now: number) => {
    const p = Math.min(1, (now - t0) / props.ms)
    shown.value = props.to * (p === 1 ? 1 : 1 - 2 ** (-10 * p))
    if (p < 1) raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)
  // rAF is paused in hidden tabs / export — always land on the final value
  settle = setTimeout(() => (shown.value = props.to), props.ms + 150)
}

watch(computed(() => props.on && active.value), (go) => {
  if (go) run()
  else {
    stop()
    shown.value = 0
  }
}, { immediate: true })

onBeforeUnmount(stop)

const fmt = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: props.decimals, maximumFractionDigits: props.decimals })
</script>

<template>
  <span class="tabular-nums">{{ prefix }}{{ fmt(shown) }}{{ suffix }}</span>
</template>
