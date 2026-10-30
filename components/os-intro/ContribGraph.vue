<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { HALLOWEEN, seeded } from './deck'
import Pumpkin from './halloween/Pumpkin.vue'

/*
  52×7 contribution graph.
  step >= fillAt     → cells light up in a diagonal wave
  step >= wordAt     → `word` is "drawn" in neon cells
  step >= pumpkinAt  → late-October cells turn into pumpkins (Halloween only)
  `auto` runs the fill on mount (for background texture use).
*/
const props = withDefaults(
  defineProps<{
    step?: number
    auto?: boolean
    cell?: number
    gap?: number
    word?: string
    fillAt?: number
    wordAt?: number
    pumpkinAt?: number
    labels?: boolean
    seed?: number
    density?: number
  }>(),
  { step: 0, auto: false, cell: 11, gap: 3, word: '', fillAt: 1, wordAt: 2, pumpkinAt: 3, labels: false, seed: 31, density: 0.62 },
)

const COLS = 52
const ROWS = 7

const FONT: Record<string, string[]> = {
  A: ['###', '#.#', '###', '#.#', '#.#'],
  C: ['###', '#..', '#..', '#..', '###'],
  E: ['###', '#..', '###', '#..', '###'],
  G: ['###', '#..', '#.#', '#.#', '###'],
  H: ['#.#', '#.#', '###', '#.#', '#.#'],
  I: ['###', '.#.', '.#.', '.#.', '###'],
  M: ['#...#', '##.##', '#.#.#', '#...#', '#...#'],
  N: ['#..#', '##.#', '#.##', '#..#', '#..#'],
  O: ['###', '#.#', '#.#', '#.#', '###'],
  P: ['###', '#.#', '###', '#..', '#..'],
  R: ['###', '#.#', '##.', '#.#', '#.#'],
  S: ['###', '#..', '###', '..#', '###'],
  T: ['###', '.#.', '.#.', '.#.', '.#.'],
  U: ['#.#', '#.#', '#.#', '#.#', '###'],
  ' ': ['..', '..', '..', '..', '..'],
}

const wordCells = computed(() => {
  const set = new Set<string>()
  const glyphs = props.word.toUpperCase().split('').map(ch => FONT[ch] ?? FONT[' '])
  const width = glyphs.reduce((w, g) => w + g[0].length + 1, -1)
  let x = Math.floor((COLS - width) / 2)
  for (const g of glyphs) {
    g.forEach((row, r) => row.split('').forEach((c, i) => c === '#' && set.add(`${x + i}:${r + 1}`)))
    x += g[0].length + 1
  }
  return set
})

// Oct 31 2026 is a Saturday → week 43, last row. Plus two neighbours.
const PUMPKINS = new Set(['43:6', '42:2', '44:4'])

const cells = computed(() => {
  const rand = seeded(props.seed)
  const out: { key: string; level: number; delay: number; word: boolean; pumpkin: boolean }[] = []
  for (let c = 0; c < COLS; c++) {
    // busier toward the end of the year — the "momentum" story
    const bias = 0.35 + (c / COLS) * 0.65
    for (let r = 0; r < ROWS; r++) {
      const v = rand()
      const level = v > props.density * bias + 0.3 ? 0 : Math.min(4, 1 + Math.floor(rand() * 4 * bias))
      const key = `${c}:${r}`
      out.push({ key, level, delay: c * 22 + r * 18, word: wordCells.value.has(key), pumpkin: HALLOWEEN && PUMPKINS.has(key) })
    }
  }
  return out
})

// auto: fill → word → pumpkins, on its own clock
const autoStep = ref(0)
onMounted(() => {
  if (!props.auto) return
  ;[250, 1900, 2900].forEach((t, i) => setTimeout(() => (autoStep.value = i + 1), t))
})

const s = computed(() => (props.auto ? autoStep.value : props.step))
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
</script>

<template>
  <div class="cg" :style="{ '--c': `${cell}px`, '--g': `${gap}px` }">
    <div v-if="labels" class="months">
      <span v-for="m in MONTHS" :key="m">{{ m }}</span>
    </div>
    <div class="grid">
      <div
        v-for="x in cells"
        :key="x.key"
        class="cell"
        :class="[
          `l${s >= fillAt ? x.level : 0}`,
          { word: x.word && s >= wordAt, gone: x.pumpkin && s >= pumpkinAt },
        ]"
        :style="{ transitionDelay: `${s >= wordAt && x.word ? 0 : x.delay}ms` }"
      >
        <Pumpkin v-if="x.pumpkin" class="pk" :class="{ on: s >= pumpkinAt }" :size="cell + 4" />
      </div>
    </div>
    <div v-if="labels" class="legend">
      <span>Less</span>
      <i class="cell l0" /><i class="cell l1" /><i class="cell l2" /><i class="cell l3" /><i class="cell l4" />
      <span>More</span>
    </div>
  </div>
</template>

<style scoped>
.cg {
  display: inline-flex;
  flex-direction: column;
  gap: 6px;
}
.grid {
  display: grid;
  grid-template-rows: repeat(7, var(--c));
  grid-auto-flow: column;
  grid-auto-columns: var(--c);
  gap: var(--g);
}
.months {
  display: flex;
  justify-content: space-between;
  font-size: 9px;
  color: var(--os-dim);
  padding-right: 20px;
}
.legend {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 3px;
  font-size: 9px;
  color: var(--os-dim);
}
.legend span { margin: 0 4px; }
.legend .cell { width: var(--c); height: var(--c); display: inline-block; }
.cell {
  position: relative;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.06);
  transition: background-color 0.45s var(--os-ease), transform 0.45s var(--os-spring), box-shadow 0.45s;
}
.l1 { background: rgba(1, 215, 88, 0.28); }
.l2 { background: rgba(1, 215, 88, 0.5); }
.l3 { background: rgba(1, 215, 88, 0.75); }
.l4 { background: #01d758; }
.word {
  background: #00ff00 !important;
  box-shadow: 0 0 8px rgba(0, 255, 0, 0.8);
  transform: scale(1.12);
}
.gone {
  background: transparent !important;
  box-shadow: none;
}
.pk {
  position: absolute;
  left: -2px;
  top: -2px;
  transform: scale(0) rotate(-40deg);
  transition: transform 0.7s var(--os-spring) 0.15s;
  filter: drop-shadow(0 0 4px rgba(0, 255, 0, 0.6));
}
.pk.on { transform: scale(1) rotate(0); }
</style>
