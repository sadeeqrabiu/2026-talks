<script setup lang="ts">
import { HALLOWEEN } from './deck'
import WitchHat from './halloween/WitchHat.vue'

/* `whoami` — each role lands as a commit on a short branch, one per click. */
const props = withDefaults(defineProps<{ step?: number; github?: string }>(), { step: 0, github: 'Sadeeqrabiu' })

const roles = [
  { title: 'Bitcoin open source contributor', hash: 'b1tc01n' },
  { title: 'Founder · OSGuild', hash: '05gu1ld' },
  { title: 'Founder · BitDevs Mauritius', hash: 'b17d3v5' },
]
</script>

<template>
  <div class="flex items-center gap-14 h-full">
    <!-- avatar -->
    <div class="relative shrink-0">
      <div class="avatar">
        <img :src="`https://github.com/${props.github}.png`" alt="Sadiq" class="size-full rounded-full object-cover">
      </div>
      <div v-if="HALLOWEEN" class="hat"><WitchHat :size="70" /></div>
      <a
        :href="`https://github.com/${props.github}`"
        target="_blank"
        rel="noopener"
        class="handle"
        @click.stop
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" /></svg>
        github.com/{{ props.github }}
      </a>
    </div>

    <!-- roles -->
    <div class="flex flex-col gap-6">
      <div>
        <p class="os-kicker !text-white/50 m-0 mb-3">$ whoami</p>
        <h2 class="os-title !text-[56px]">Sadiq <em>Rabiu</em></h2>
      </div>
      <div class="relative pl-8">
        <div class="rail" :style="{ transform: `scaleY(${Math.min(step, roles.length) / roles.length})` }" />
        <div class="absolute left-0 top-0 bottom-0 w-[2px] bg-white/10" />
        <div v-for="(r, i) in roles" :key="r.hash" class="relative py-3 os-rise" :class="{ on: step > i }" :style="{ transitionDelay: step === i + 1 ? '0.35s' : '0s' }">
          <span class="dot os-pop" :class="{ on: step > i, now: step === i + 1 }" :style="{ transitionDelay: step === i + 1 ? '0.3s' : '0s' }" />
          <div class="text-[22px] font-700 text-white leading-tight">{{ r.title }}</div>
          <div class="text-[10px] text-white/40 mt-1">commit {{ r.hash }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.avatar {
  width: 210px;
  height: 210px;
  padding: 6px;
  border-radius: 999px;
  border: 2px solid #00ff00;
  box-shadow: 0 0 0 6px rgba(0, 255, 0, 0.1), 0 0 50px rgba(0, 255, 0, 0.35);
  background: #000;
}
.hat {
  position: absolute;
  top: -44px;
  right: 6px;
  transform: rotate(14deg);
  animation: perch 1s var(--os-spring) 0.4s both;
}
@keyframes perch {
  from { transform: translateY(-80px) rotate(-20deg); opacity: 0; }
  to { transform: rotate(14deg); opacity: 1; }
}
.handle {
  position: absolute;
  left: 50%;
  bottom: -46px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  padding: 6px 12px;
  border: 1px solid rgba(1, 215, 88, 0.5);
  border-radius: 99px;
  font-size: 12px;
  color: #fff !important;
  text-decoration: none !important;
  background: rgba(1, 215, 88, 0.08);
}
.rail {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(#01d758, #00ff00);
  box-shadow: 0 0 8px rgba(0, 255, 0, 0.6);
  transform-origin: top;
  transition: transform 0.6s var(--os-ease);
  z-index: 1;
}
.dot {
  position: absolute;
  left: -39px;
  top: 19px;
  width: 16px;
  height: 16px;
  border-radius: 99px;
  border: 2.5px solid #fff;
  background: #000;
  z-index: 2;
}
.dot.now {
  border-color: #00ff00;
  box-shadow: 0 0 14px rgba(0, 255, 0, 0.7);
}
</style>
