<script setup lang="ts">
/* Audience join slide — a scan line sweeps the QR like a phone camera. */
const props = withDefaults(defineProps<{ url?: string; qr?: string }>(), {
  url: 'https://slidev-audience-client.pages.dev/',
  qr: '/audience-qr.svg',
})
const host = props.url.replace(/^https?:\/\//, '').replace(/\/$/, '')
const steps = ['open your camera', 'scan the code', 'react — it lands on this screen']
const emojis = ['🎃', '👻', '🔥', '🚀']
</script>

<template>
  <div class="flex h-full items-center justify-between">
    <div class="flex flex-col gap-8">
      <div>
        <p class="os-kicker !text-white/50 m-0 mb-3">$ curl {{ host }}</p>
        <h2 class="os-title !text-[56px]">Scan.<br>React.<br><em>Live.</em></h2>
      </div>
      <ol class="list-none m-0 p-0 flex flex-col gap-3">
        <li v-for="(s, i) in steps" :key="s" class="flex items-center gap-4 text-[16px] step" :style="{ animationDelay: `${0.4 + i * 0.25}s` }">
          <span class="text-[11px] os-green">[{{ String(i + 1).padStart(2, '0') }}]</span>{{ s }}
        </li>
      </ol>
    </div>

    <div class="relative mr-4">
      <!-- emoji preview floating up beside the code -->
      <span
        v-for="(e, i) in emojis"
        :key="e"
        class="float"
        :style="{ left: `${-34 + (i % 2) * 300}px`, animationDelay: `${i * 0.9}s` }"
      >{{ e }}</span>

      <div class="frame" @click.stop>
        <i class="c tl" /><i class="c tr" /><i class="c bl" /><i class="c br" />
        <div class="bg-white p-3 rounded-lg relative overflow-hidden">
          <img :src="props.qr" :alt="`QR code for ${props.url}`" class="block size-[230px]">
          <div class="scan" />
        </div>
      </div>
      <a :href="props.url" target="_blank" rel="noopener" class="block text-center mt-4 text-[12px] !text-white/60 !no-underline" @click.stop>{{ host }}</a>
    </div>
  </div>
</template>

<style scoped>
.frame {
  position: relative;
  padding: 18px;
}
.c {
  position: absolute;
  width: 26px;
  height: 26px;
  border: 0 solid #00ff00;
  filter: drop-shadow(0 0 6px rgba(0, 255, 0, 0.8));
}
.c.tl { top: 0; left: 0; border-top-width: 3px; border-left-width: 3px; border-top-left-radius: 8px; }
.c.tr { top: 0; right: 0; border-top-width: 3px; border-right-width: 3px; border-top-right-radius: 8px; }
.c.bl { bottom: 0; left: 0; border-bottom-width: 3px; border-left-width: 3px; border-bottom-left-radius: 8px; }
.c.br { bottom: 0; right: 0; border-bottom-width: 3px; border-right-width: 3px; border-bottom-right-radius: 8px; }
.scan {
  position: absolute;
  left: 0;
  right: 0;
  height: 36px;
  top: -36px;
  background: linear-gradient(to bottom, transparent, rgba(0, 255, 0, 0.35) 80%, #00ff00);
  animation: sweep 2.6s ease-in-out infinite;
}
@keyframes sweep {
  0% { top: -36px; }
  60%, 100% { top: 100%; }
}
.step {
  opacity: 0;
  animation: in 0.6s var(--os-ease) forwards;
}
@keyframes in {
  from { opacity: 0; transform: translateX(-12px); }
  to { opacity: 1; transform: none; }
}
.float {
  position: absolute;
  bottom: 20px;
  font-size: 22px;
  opacity: 0;
  animation: rise 4.5s ease-out infinite;
}
@keyframes rise {
  0% { transform: translateY(0) scale(0.6); opacity: 0; }
  15% { opacity: 1; }
  80% { opacity: 0.8; }
  100% { transform: translateY(-260px) scale(1.1); opacity: 0; }
}
</style>
