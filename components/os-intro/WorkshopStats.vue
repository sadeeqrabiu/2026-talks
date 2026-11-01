<script setup lang="ts">
import { repo } from './leaderboard'
import CountUp from './CountUp.vue'
import { useIsSlideActive } from '@slidev/client'

const active = useIsSlideActive()

/* Repo totals as counters, each on a row of commit cells (one cell = one item) that fill in on arrival. */
const rows = [
  { label: 'forks', n: repo.forks },
  { label: 'pull requests', n: repo.prs },
  { label: 'merged PRs', n: repo.merged, hot: true },
  { label: 'open issues', n: repo.openIssues },
  { label: 'closed issues', n: repo.closedIssues },
]
</script>

<template>
  <div class="flex flex-col gap-3">
    <div v-for="(r, i) in rows" :key="r.label" class="flex flex-col gap-1">
      <div class="flex items-baseline justify-between">
        <span class="os-label">{{ r.label }}</span>
        <span class="text-[22px] font-800 leading-none" :class="r.hot ? 'os-neon' : 'text-white'">
          <CountUp :to="r.n" :ms="1200 + i * 150" />
        </span>
      </div>
      <div class="flex gap-[3px]">
        <i
          v-for="c in r.n"
          :key="c"
          class="cell"
          :class="{ hot: r.hot, on: active }"
          :style="{ transitionDelay: active ? `${0.2 + i * 0.12 + c * 0.04}s` : '0s' }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.cell {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  background: #01d758;
  opacity: 0;
  transform: scale(0.2);
  transition: transform 0.45s var(--os-spring), opacity 0.3s var(--os-ease);
}
.cell.on {
  opacity: 1;
  transform: none;
}
.cell.hot {
  background: #00ff00;
  box-shadow: 0 0 6px rgba(0, 255, 0, 0.6);
}
</style>
