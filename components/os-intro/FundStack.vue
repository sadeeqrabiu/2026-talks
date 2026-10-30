<script setup lang="ts">
import CountUp from './CountUp.vue'

/* A counter sitting on a stack of sats-cells that builds itself. */
withDefaults(
  defineProps<{ on?: boolean; to: number; prefix?: string; suffix?: string; decimals?: number; who: string; what: string; cells?: number; hot?: boolean }>(),
  { on: false, prefix: '', suffix: '', decimals: 0, cells: 12, hot: false },
)
</script>

<template>
  <div class="flex flex-col gap-3 w-[200px] os-rise" :class="{ on }">
    <div class="stack">
      <i v-for="c in cells" :key="c" :class="{ on }" :style="{ transitionDelay: `${c * 0.05}s` }" />
    </div>
    <div class="text-[34px] font-800 leading-none" :class="hot ? 'os-neon' : 'text-white'">
      <CountUp :to="to" :on="on" :prefix="prefix" :suffix="suffix" :decimals="decimals" />
    </div>
    <div>
      <div class="text-[13px] text-white font-700">{{ who }}</div>
      <div class="text-[10px] text-white/45 mt-1 leading-snug">{{ what }}</div>
    </div>
  </div>
</template>

<style scoped>
.stack {
  display: grid;
  grid-template-columns: repeat(6, 14px);
  gap: 3px;
  align-content: end;
  height: 66px;
  direction: rtl;
}
.stack i {
  width: 14px;
  height: 14px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.06);
  transform: translateY(-30px);
  opacity: 0;
  transition: transform 0.5s var(--os-spring), opacity 0.3s, background-color 0.3s;
}
.stack i.on {
  transform: none;
  opacity: 1;
  background: #01d758;
}
</style>
