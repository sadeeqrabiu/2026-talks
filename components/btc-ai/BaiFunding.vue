<script setup lang="ts">
import { computed, ref } from 'vue'

/*
  Same reported figures as Talk 03 slide 16 (OpenSats and Btrust 2025 year-in-review posts).
  One square per OpenSats grantee; one bar per kind of Btrust grantee output.
*/
const props = defineProps<{ step: number }>()

const GRANTEES = 252
const BARS = [
  { key: 'commits', label: 'commits', n: 431 },
  { key: 'prs', label: 'merged PRs', n: 222 },
  { key: 'reviews', label: 'code reviews', n: 475, hot: true },
]
const MAX = 475

const tip = ref<string | null>(null)
const showFunds = computed(() => props.step >= 1)
const showBars = computed(() => props.step >= 2)
</script>

<template>
  <div class="absolute inset-0">
    <h2 class="bai-heading absolute left-9 top-11">Who keeps it running</h2>

    <div class="panel bai-paper">
      <!-- OpenSats -->
      <section class="side">
        <span class="bai-label">OpenSats · since 2023</span>
        <div class="hero" :class="{ on: showFunds }">$21.6M+</div>
        <div class="text-[13px] font-700 mt-1">252 grantees · 40 countries</div>
        <div class="units" role="img" aria-label="252 squares, one per OpenSats grantee">
          <i
            v-for="i in GRANTEES"
            :key="i"
            :class="{ on: showFunds }"
            :style="{ transitionDelay: showFunds ? `${i * 5}ms` : '0ms' }"
          />
        </div>
        <span class="text-[11px] font-600 text-[var(--bai-mute)] mt-2">One square per grantee</span>
      </section>

      <div class="w-px bg-[var(--bai-rule)]" />

      <!-- Btrust -->
      <section class="side">
        <span class="bai-label">Btrust · 18 grantees · 2025</span>
        <div class="bars">
          <div
            v-for="b in BARS"
            :key="b.key"
            class="bar-row"
            @mouseenter="tip = `${b.n} ${b.label} by 18 Btrust grantees in 2025`"
            @mouseleave="tip = null"
          >
            <div class="flex items-baseline justify-between mb-1">
              <span class="text-[13px] font-700">{{ b.label }}</span>
              <span class="text-[22px] font-900 tracking-tight">{{ b.n }}</span>
            </div>
            <div class="track">
              <i
                :class="{ hot: b.hot }"
                :style="{ width: showBars ? `${(b.n / MAX) * 100}%` : '0%' }"
              />
            </div>
          </div>
        </div>
        <div class="text-[11px] font-600 text-[var(--bai-mute)] h-4">{{ tip ?? 'Hover a bar for details' }}</div>
        <div class="takeaway bai-rise" :class="{ on: showBars }">
          Reviews outnumber merged PRs <span class="text-[var(--bai-orange)]">more than two to one.</span>
        </div>
      </section>
    </div>

    <div class="also">
      <span>Also funding this work:</span> HRF Bitcoin Development Fund · Brink · Spiral · Vinteum · Bitshala
    </div>
  </div>
</template>

<style scoped>
.panel {
  position: absolute;
  left: 30px;
  right: 30px;
  top: 96px;
  bottom: 62px;
  padding: 18px 22px;
  display: flex;
  gap: 24px;
}
.side {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
.hero {
  margin-top: 6px;
  font-size: 44px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.05em;
  color: var(--bai-orange);
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.4s, transform 0.6s var(--bai-spring);
}
.hero.on {
  opacity: 1;
  transform: none;
}
.units {
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  gap: 2px;
  margin-top: 12px;
}
.units i {
  display: block;
  aspect-ratio: 1;
  border-radius: 1px;
  background: var(--bai-rule);
  transition: background 0.2s;
}
.units i.on {
  background: var(--bai-orange);
}
.bars {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 10px;
  margin-bottom: 8px;
}
.bar-row {
  padding: 2px 0;
  cursor: default;
}
.track {
  height: 12px;
  background: var(--bai-rule);
  border-radius: 0 4px 4px 0;
}
.track i {
  display: block;
  height: 100%;
  border-radius: 0 4px 4px 0;
  background: var(--bai-ink);
  transition: width 1s var(--bai-ease);
}
.track i.hot {
  background: var(--bai-orange);
}
.takeaway {
  margin-top: auto;
  font-size: 15px;
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: -0.02em;
}
.also {
  position: absolute;
  left: 36px;
  right: 36px;
  bottom: 28px;
  font-size: 12px;
  font-weight: 600;
}
.also span {
  font-weight: 800;
}
</style>
