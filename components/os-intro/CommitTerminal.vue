<script setup lang="ts">
/* Bad commit → rewritten good commit → a checklist that ticks itself. */
const props = withDefaults(defineProps<{ step?: number; rules?: string[] }>(), {
  step: 0,
  rules: () => ['small, focused commits', 'one branch per change', 'explain the why in your PR'],
})
const good = 'git commit -m "fix: stop login retry loop"'
</script>

<template>
  <div class="flex flex-col gap-7">
    <div class="term">
      <div class="bar"><i /><i /><i /><span>~/project</span></div>
      <div class="p-5 flex flex-col gap-3 text-[13px] whitespace-nowrap">
        <div class="flex items-center gap-3 transition-all duration-500" :class="step >= 1 ? 'text-white/30' : 'text-white'">
          <span class="os-green">$</span>
          <span :class="{ strike: step >= 1 }">git commit -m "fix stuff"</span>
          <span class="ml-auto text-[12px] transition-opacity duration-500" :class="step >= 1 ? 'opacity-100' : 'opacity-0'">✗ fix what?</span>
        </div>
        <div v-if="step >= 1" class="flex items-center gap-3">
          <span class="os-green">$</span>
          <span class="type" :style="{ '--n': good.length }">{{ good }}</span>
          <span class="ml-auto os-neon text-[12px] ok">✓ clear</span>
        </div>
      </div>
    </div>

    <ul class="list-none m-0 p-0 flex flex-col gap-4">
      <li v-for="(r, i) in props.rules" :key="r" class="flex items-center gap-4 os-rise" :class="{ on: step >= i + 2 }">
        <svg width="22" height="22" viewBox="0 0 22 22">
          <rect x="1" y="1" width="20" height="20" rx="5" fill="none" stroke="#01D758" stroke-width="1.6" />
          <path d="M6 11.5l3.5 3.5L16 7.5" pathLength="1" class="tick" :class="{ on: step >= i + 2 }" />
        </svg>
        <span class="text-[19px] text-white">{{ r }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.term {
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.85);
  overflow: hidden;
}
.bar {
  display: flex;
  gap: 6px;
  align-items: center;
  padding: 8px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 10px;
  color: rgba(255, 255, 255, 0.4);
}
.bar i {
  width: 9px;
  height: 9px;
  border-radius: 9px;
  border: 1px solid rgba(255, 255, 255, 0.35);
}
.bar span { margin-left: 8px; }
.strike {
  background: linear-gradient(currentColor, currentColor) no-repeat 0 55% / 100% 1.5px;
  animation: strike 0.5s var(--os-ease);
}
@keyframes strike {
  from { background-size: 0 1.5px; }
}
.type {
  display: inline-block;
  flex-shrink: 0;
  overflow: hidden;
  white-space: nowrap;
  width: 0;
  color: #fff;
  border-right: 2px solid #00ff00;
  animation: type 1.6s steps(var(--n)) 0.5s forwards, caret 0.4s 2.2s forwards;
}
@keyframes type { to { width: calc(var(--n) * 1ch); } }
@keyframes caret { to { border-color: transparent; } }
.ok { opacity: 0; animation: fade 0.4s 2.2s forwards; }
@keyframes fade { to { opacity: 1; } }
.tick {
  fill: none;
  stroke: #00ff00;
  stroke-width: 2.4;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: stroke-dashoffset 0.5s var(--os-ease) 0.3s;
}
.tick.on { stroke-dashoffset: 0; }
</style>
