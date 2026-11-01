<script setup lang="ts">
import { computed } from 'vue'
import { HALLOWEEN } from './deck'
import { podium, others, avatar } from './leaderboard'
import WitchHat from './halloween/WitchHat.vue'

/*
  Three pedestals in 2 · 1 · 3 order. Clicks reveal 3rd → 2nd → 1st (spotlight
  + hat on the winner), then the rest of the people who shipped.
*/
const props = withDefaults(defineProps<{ step?: number }>(), { step: 0 })

const places = computed(() => [
  { rank: 2, c: podium[1], h: 64, size: 64, on: props.step >= 2 },
  { rank: 1, c: podium[0], h: 100, size: 84, on: props.step >= 3 },
  { rank: 3, c: podium[2], h: 42, size: 64, on: props.step >= 1 },
])
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="stage relative flex-1 flex items-end justify-center gap-4">
      <!-- spotlight on the winner -->
      <div class="beam" :class="{ on: step >= 3 }" />

      <div v-for="p in places" :key="p.rank" class="place relative flex flex-col items-center w-[178px]" :class="[{ on: p.on }, `r${p.rank}`]">
        <div class="who flex flex-col items-center">
          <div class="relative">
            <WitchHat v-if="HALLOWEEN && p.rank === 1" class="hat absolute left-1/2 -top-[26px] z-10" :size="40" />
            <img :src="avatar(p.c.login)" :alt="p.c.login" class="pic block rounded-full" :style="{ width: `${p.size}px`, height: `${p.size}px` }" />
            <span class="badge">{{ p.rank }}</span>
          </div>
          <div class="mt-4 text-[12px] font-700 max-w-[176px] truncate" :class="p.rank === 1 ? 'os-neon' : 'text-white'">@{{ p.c.login }}</div>
          <div class="mt-1 text-[9.5px] text-white/45 max-w-[176px] truncate">{{ p.c.work }}</div>
          <div class="mt-2 flex flex-wrap justify-center gap-1">
            <span class="chip">{{ p.c.prs }} PR</span>
            <span class="chip hot">{{ p.c.merged }} merged</span>
            <span v-if="p.c.issuesClosed" class="chip">{{ p.c.issuesClosed }} issue closed</span>
          </div>
          <div class="mt-1 text-[10px] tabular-nums">
            <span class="os-green">+{{ p.c.add }}</span>
            <span class="text-white/40 ml-1">−{{ p.c.del }}</span>
          </div>
        </div>

        <!-- pedestal -->
        <div class="ped relative w-full mt-3" :style="{ height: `${p.h}px` }">
          <div class="ring" />
          <span v-if="p.rank === 1" class="plate">WINNER</span>
        </div>
      </div>
    </div>

    <!-- everyone else who shipped -->
    <div class="os-rise flex items-center justify-center gap-3 mt-4 h-[30px] whitespace-nowrap" :class="{ on: step >= 4 }">
      <span class="os-label !text-white/40">also shipped</span>
      <span v-for="(o, i) in others" :key="o.login" class="os-rise flex items-center gap-1.5 text-[10px]" :class="{ on: step >= 4 }" :style="{ transitionDelay: `${0.15 + i * 0.12}s` }">
        <img :src="avatar(o.login)" :alt="o.login" class="size-5 rounded-full border border-solid border-[#01d758]/50" />
        <span class="text-white/80">@{{ o.login }}</span>
        <span class="chip" :class="{ hot: o.merged }">{{ o.merged ? `${o.merged} merged` : `${o.prs} PR` }}</span>
      </span>
    </div>
  </div>
</template>

<style scoped>
/* ── winner spotlight ── */
.beam {
  position: absolute;
  left: 50%;
  top: -40px;
  bottom: 30px;
  width: 300px;
  margin-left: -150px;
  background: linear-gradient(to bottom, rgba(0, 255, 0, 0) 0%, rgba(0, 255, 0, 0.1) 55%, rgba(0, 255, 0, 0.24) 100%);
  clip-path: polygon(42% 0, 58% 0, 100% 100%, 0 100%);
  filter: blur(6px);
  opacity: 0;
  transform-origin: top;
  transform: scaleY(0.4);
  transition: opacity 0.8s var(--os-ease) 0.35s, transform 1s var(--os-ease) 0.35s;
  pointer-events: none;
}
.beam.on {
  opacity: 1;
  transform: none;
}

/* ── pedestal grows from the floor, then the person lands on it ── */
.ped {
  border-radius: 4px 4px 0 0;
  background: linear-gradient(to bottom, rgba(1, 215, 88, 0.22), rgba(1, 215, 88, 0.04));
  border: 1px solid rgba(1, 215, 88, 0.45);
  border-bottom: 0;
  transform-origin: bottom;
  transform: scaleY(0);
  transition: transform 0.6s var(--os-spring);
}
.r1 .ped {
  background: linear-gradient(to bottom, rgba(0, 255, 0, 0.35), rgba(1, 215, 88, 0.05));
  border-color: #00ff00;
  box-shadow: 0 0 30px rgba(0, 255, 0, 0.25);
}
.place.on .ped {
  transform: none;
}

/* holographic disc on top of each pedestal */
.ring {
  position: absolute;
  left: -6px;
  right: -6px;
  top: -9px;
  height: 18px;
  border-radius: 50%;
  border: 1.5px solid rgba(1, 215, 88, 0.7);
  background: radial-gradient(closest-side, rgba(1, 215, 88, 0.3), transparent);
}
.r1 .ring {
  border-color: #00ff00;
  box-shadow: 0 0 18px rgba(0, 255, 0, 0.6), inset 0 0 10px rgba(0, 255, 0, 0.5);
}
.r1.on .ring::after {
  content: '';
  position: absolute;
  inset: -1.5px;
  border-radius: 50%;
  border: 1.5px solid #00ff00;
  animation: ripple 2.4s var(--os-ease) 1s infinite;
}
@keyframes ripple {
  from { transform: scale(1); opacity: 0.8; }
  to { transform: scale(1.35, 2.2) translateY(-6px); opacity: 0; }
}

.plate {
  position: absolute;
  left: 50%;
  top: 22px;
  transform: translateX(-50%);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.3em;
  color: #000;
  background: #00ff00;
  padding: 2px 8px 2px 12px;
  border-radius: 3px;
}

.who {
  opacity: 0;
  transform: translateY(-40px) scale(0.85);
  transition: transform 0.7s var(--os-spring) 0.35s, opacity 0.4s var(--os-ease) 0.35s;
}
.place.on .who {
  opacity: 1;
  transform: none;
}

.pic {
  border: 2px solid rgba(1, 215, 88, 0.8);
  box-shadow: 0 0 0 3px #000, 0 0 16px rgba(1, 215, 88, 0.35);
}
.r1 .pic {
  border-color: #fff;
  box-shadow: 0 0 0 3px #000, 0 0 0 5px #00ff00, 0 0 34px rgba(0, 255, 0, 0.6);
}
.badge {
  position: absolute;
  left: 50%;
  bottom: -11px;
  transform: translateX(-50%);
  width: 24px;
  height: 24px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  font-size: 13px;
  font-weight: 800;
  background: #000;
  color: #01d758;
  border: 1.5px solid #01d758;
}
.r1 .badge {
  width: 28px;
  height: 28px;
  bottom: -13px;
  font-size: 15px;
  color: #000;
  background: #00ff00;
  border-color: #00ff00;
  box-shadow: 0 0 14px rgba(0, 255, 0, 0.8);
}

/* the hat drops onto the winner a beat after they land */
.hat {
  transform: translate(-50%, -60px) rotate(-25deg);
  opacity: 0;
  transition: transform 0.6s cubic-bezier(0.5, 1.8, 0.6, 1) 1s, opacity 0.2s 1s;
}
.place.on .hat {
  transform: translate(-50%, 0) rotate(-12deg);
  opacity: 1;
}

.chip {
  font-size: 9px;
  letter-spacing: 0.06em;
  padding: 1px 5px;
  border-radius: 3px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: rgba(255, 255, 255, 0.7);
  white-space: nowrap;
}
.chip.hot {
  border-color: rgba(0, 255, 0, 0.6);
  color: #00ff00;
}
</style>
