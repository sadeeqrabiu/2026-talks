<script setup lang="ts">
import { computed, ref } from 'vue'
import BaiCat from './BaiCat.vue'
import BaiPixel from './BaiPixel.vue'

/* Layers appear one per click. Pick a language to see where you could start today. */
const props = defineProps<{ step: number }>()

interface Project { name: string, langs: string[], what: string }
const LAYERS: { title: string, icon: string, items: Project[] }[] = [
  {
    title: 'Consensus & nodes',
    icon: 'block',
    items: [
      { name: 'Bitcoin Core', langs: ['C++', 'Python'], what: 'The reference node. Its functional tests are written in Python.' },
      { name: 'btcd', langs: ['Go'], what: 'A full node written in Go.' },
      { name: 'libsecp256k1', langs: ['C'], what: 'The signature and key library Bitcoin Core relies on.' },
      { name: 'BIPs', langs: ['Writing'], what: 'Proposals for changing Bitcoin, written in plain text.' },
    ],
  },
  {
    title: 'Libraries & wallets',
    icon: 'key',
    items: [
      { name: 'rust-bitcoin', langs: ['Rust'], what: 'Bitcoin data structures and encoding for Rust.' },
      { name: 'BDK', langs: ['Rust'], what: 'A toolkit for building Bitcoin wallets.' },
      { name: 'bitcoinjs-lib', langs: ['JS/TS'], what: 'Transactions and scripts in JavaScript and TypeScript.' },
    ],
  },
  {
    title: 'Lightning',
    icon: 'plug',
    items: [
      { name: 'LND', langs: ['Go'], what: 'A Lightning node from Lightning Labs.' },
      { name: 'Core Lightning', langs: ['C'], what: 'A Lightning node from Blockstream.' },
      { name: 'Eclair', langs: ['Scala'], what: 'A Lightning node from ACINQ.' },
      { name: 'LDK', langs: ['Rust'], what: 'A library for building Lightning into your own app.' },
      { name: 'BOLTs', langs: ['Writing'], what: 'The Lightning protocol specifications.' },
    ],
  },
  {
    title: 'Mining',
    icon: 'btc',
    items: [
      { name: 'Stratum V2', langs: ['Rust'], what: 'An open mining protocol and its reference code.' },
    ],
  },
  {
    title: 'People & funding',
    icon: 'person',
    items: [
      { name: 'PR Review Club', langs: ['Reviewing'], what: 'Regular sessions on reading real Bitcoin Core pull requests.' },
      { name: 'BitDevs', langs: ['Reviewing', 'Writing'], what: 'Local meetups for reading and discussing Bitcoin research.' },
      { name: 'OpenSats', langs: [], what: 'Grants for open source Bitcoin contributors.' },
      { name: 'Btrust', langs: [], what: 'Finds, trains and funds developers, with a focus on Africa and the Global South.' },
      { name: 'Brink', langs: [], what: 'Funds and mentors Bitcoin protocol developers.' },
    ],
  },
]
const FILTERS = ['Rust', 'C++', 'Go', 'Python', 'JS/TS', 'C', 'Scala', 'Writing', 'Reviewing']
const ROW_H = 62

const lang = ref<string | null>(null)
const hovered = ref<Project | null>(null)

const shown = computed(() => Math.min(props.step, LAYERS.length - 1))
const detail = computed(() => hovered.value ?? LAYERS[shown.value].items[0])
const matches = computed(() =>
  lang.value ? LAYERS.flatMap(l => l.items).filter(p => p.langs.includes(lang.value!)).length : 0,
)
</script>

<template>
  <div class="absolute inset-0">
    <h2 class="bai-heading absolute left-9 top-11">Bigger than Bitcoin Core</h2>

    <div class="panel bai-paper">
      <BaiCat :x="520 + shown * 90" />

      <div class="flex items-center gap-1.5">
        <span class="bai-label mr-1">I work in</span>
        <button
          v-for="f in FILTERS"
          :key="f"
          class="filter"
          :class="{ on: lang === f }"
          @mousedown.prevent
          @click="lang = lang === f ? null : f"
        >
          {{ f }}
        </button>
      </div>

      <div class="stack">
        <div class="spine" />
        <div class="spine fill" :style="{ height: `${shown * ROW_H}px` }" />
        <div
          v-for="(l, i) in LAYERS"
          :key="l.title"
          class="row"
          :class="{ on: i <= shown }"
          :style="{ top: `${i * ROW_H}px` }"
        >
          <span class="tile"><BaiPixel :name="l.icon" :px="2" /></span>
          <span class="rowname">{{ l.title }}</span>
          <span class="flex flex-wrap gap-1.5">
            <button
              v-for="(p, k) in l.items"
              :key="p.name"
              class="chip"
              :class="{
                hit: lang && p.langs.includes(lang),
                fade: lang && !p.langs.includes(lang),
              }"
              :style="{ transitionDelay: i === shown ? `${k * 50}ms` : '0ms' }"
              @mousedown.prevent
              @mouseenter="hovered = p"
              @mouseleave="hovered = null"
              @click="hovered = p"
            >
              {{ p.name }}
            </button>
          </span>
        </div>
      </div>

      <div class="foot">
        <Transition name="read" mode="out-in">
          <div :key="lang ? `l${lang}` : detail.name" class="text-[14px] font-700 leading-snug">
            <template v-if="lang && !hovered">
              <span class="text-[var(--bai-orange)] font-800">{{ matches }} {{ matches === 1 ? 'place' : 'places' }}</span>
              to start with {{ lang }} on this map.
            </template>
            <template v-else>
              <span class="text-[var(--bai-orange)] font-800">{{ detail.name }}.</span> {{ detail.what }}
            </template>
          </div>
        </Transition>
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
  padding: 16px 20px;
}
.filter {
  height: 28px;
  padding: 0 10px;
  border: 1.5px solid var(--bai-ink);
  border-radius: 7px;
  background: transparent;
  color: var(--bai-ink);
  font-size: 11.5px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, transform 0.2s var(--bai-spring);
}
.filter:hover {
  transform: translateY(-1px);
}
.filter.on {
  background: var(--bai-ink);
  color: var(--bai-white);
}
.stack {
  position: relative;
  height: 312px;
  margin-top: 14px;
}
.spine {
  position: absolute;
  left: 21px;
  top: 22px;
  width: 2px;
  height: 248px;
  background: var(--bai-rule);
}
.spine.fill {
  background: var(--bai-orange);
  transition: height 0.6s var(--bai-ease);
}
.row {
  position: absolute;
  left: 0;
  right: 0;
  height: 44px;
  display: flex;
  align-items: center;
  gap: 12px;
  opacity: 0;
  transform: translateX(-14px);
  transition: opacity 0.4s, transform 0.55s var(--bai-spring);
}
.row.on {
  opacity: 1;
  transform: none;
}
.tile {
  z-index: 1;
  flex: none;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 6px;
  background: var(--bai-orange);
  color: var(--bai-white);
}
.rowname {
  flex: none;
  width: 172px;
  font-size: 13.5px;
  font-weight: 800;
  letter-spacing: -0.01em;
}
.chip {
  height: 34px;
  padding: 0 12px;
  border: 1.5px solid var(--bai-rule);
  border-radius: 7px;
  background: var(--bai-white);
  color: var(--bai-ink);
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s, opacity 0.25s, transform 0.3s var(--bai-spring);
}
.chip:hover {
  border-color: var(--bai-ink);
  transform: translateY(-2px);
}
.chip.hit {
  background: var(--bai-orange);
  border-color: var(--bai-orange);
  color: var(--bai-white);
  transform: scale(1.06);
}
.chip.fade {
  opacity: 0.32;
}
.foot {
  margin-top: 4px;
  min-height: 40px;
}
.read-enter-active {
  transition: opacity 0.2s, transform 0.3s var(--bai-ease);
}
.read-leave-active {
  transition: opacity 0.08s;
}
.read-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.read-leave-to {
  opacity: 0;
}
</style>
