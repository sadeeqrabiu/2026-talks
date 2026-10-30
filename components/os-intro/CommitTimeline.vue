<script setup lang="ts">
/* A horizontal `git log`: each click lands the next commit in history. */
const props = withDefaults(
  defineProps<{ items: { year: string; label: string; hot?: boolean }[]; step?: number }>(),
  { step: 0 },
)
const pct = (i: number) => (i / (props.items.length - 1)) * 100
</script>

<template>
  <div class="relative h-[300px] mx-4">
    <!-- rail -->
    <div class="absolute left-0 right-0 top-1/2 h-[2px] bg-white/10" />
    <div class="absolute left-0 top-1/2 h-[2px] fill" :style="{ width: `${pct(Math.min(step, items.length - 1))}%` }" />

    <div
      v-for="(it, i) in items"
      :key="it.year + it.label"
      class="absolute top-1/2 -translate-x-1/2"
      :style="{ left: `${pct(i)}%` }"
    >
      <div class="os-pop node" :class="{ on: step >= i, hot: it.hot }" :style="{ transitionDelay: step === i ? '0.35s' : '0s' }" />
      <div class="absolute left-1/2 -translate-x-1/2 w-[120px] text-center" :class="i % 2 ? 'top-6' : 'bottom-6'">
        <div class="os-rise" :class="{ on: step >= i }" :style="{ transitionDelay: step === i ? '0.5s' : '0s' }">
          <div class="text-[22px] font-800" :class="it.hot ? 'os-neon' : 'text-white'">{{ it.year }}</div>
          <div class="text-[11px] text-white/55 leading-tight mt-1">{{ it.label }}</div>
        </div>
      </div>
      <!-- stem -->
      <div
        class="absolute left-1/2 w-px bg-white/20 os-rise"
        :class="[{ on: step >= i }, i % 2 ? 'top-2 h-4' : 'bottom-2 h-4']"
      />
    </div>
  </div>
</template>

<style scoped>
.fill {
  background: linear-gradient(90deg, #01d758, #00ff00);
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.6);
  transform: translateY(0);
  transition: width 0.7s var(--os-ease);
}
.node {
  width: 16px;
  height: 16px;
  margin-top: -8px;
  border-radius: 99px;
  background: #000;
  border: 2.5px solid #fff;
  box-shadow: 0 0 0 3px rgba(0, 255, 0, 0.15), 0 0 14px rgba(0, 255, 0, 0.5);
}
.node.hot { border-color: #00ff00; }
</style>
