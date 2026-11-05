<script setup lang="ts">
import BaiCat from './BaiCat.vue'
import { useBaiActive } from './deck'

/* Audience join slide: a scan line sweeps the QR like a phone camera. */
const URL = 'https://slidev-audience-client.pages.dev/'
const HOST = 'slidev-audience-client.pages.dev'

const active = useBaiActive()
const STEPS = ['Open your camera', 'Scan the code', 'React. It lands on this screen']
const EMOJIS = ['🔥', '🚀', '⚡', '👏']
</script>

<template>
  <div class="absolute inset-0">
    <h2 class="big">
      <span v-for="(w, i) in ['Scan.', 'React.', 'Live.']" :key="w" class="block">
        <span class="bai-wipe" :class="{ play: active }" :style="{ '--d': `${0.2 + i * 0.14}s` }">{{ w }}</span>
      </span>
    </h2>

    <ol class="steps">
      <li
        v-for="(s, i) in STEPS"
        :key="s"
        class="bai-rise"
        :class="{ on: active }"
        :style="{ transitionDelay: `${0.8 + i * 0.16}s` }"
      >
        <span class="num">{{ i + 1 }}</span>{{ s }}
      </li>
    </ol>

    <div class="card bai-paper bai-rise" :class="{ on: active }">
      <BaiCat :x="210" />
      <span
        v-for="(e, i) in EMOJIS"
        :key="e"
        class="float"
        :style="{ left: `${-34 + (i % 2) * 412}px`, animationDelay: `${i * 0.9}s` }"
      >{{ e }}</span>

      <div class="frame" @click.stop>
        <i class="c tl" /><i class="c tr" /><i class="c bl" /><i class="c br" />
        <div class="bg-[#fff] p-3 rounded-lg relative overflow-hidden">
          <img src="/audience-qr.svg" :alt="`QR code for ${URL}`" class="block size-[250px]">
          <div class="scan" />
        </div>
      </div>
      <a :href="URL" target="_blank" rel="noopener" class="host" @click.stop>{{ HOST }}</a>
    </div>
  </div>
</template>

<style scoped>
.big,
.slidev-layout .big {
  position: absolute;
  left: 36px;
  top: 76px;
  margin: 0;
  font-size: 68px;
  font-weight: 900;
  line-height: 1.04;
  letter-spacing: -0.05em;
  color: var(--bai-white);
}
.steps {
  position: absolute;
  left: 38px;
  top: 312px;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 16px;
  font-weight: 700;
}
.steps li {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}
.num {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 4px;
  background: var(--bai-white);
  color: var(--bai-orange);
  font-size: 13px;
  font-weight: 800;
}
.card {
  position: absolute;
  right: 56px;
  top: 76px;
  width: 366px;
  padding: 18px 18px 14px;
  text-align: center;
}
.frame {
  position: relative;
  padding: 20px;
}
.c {
  position: absolute;
  width: 26px;
  height: 26px;
  border: 0 solid var(--bai-orange);
}
.c.tl { top: 0; left: 0; border-top-width: 4px; border-left-width: 4px; }
.c.tr { top: 0; right: 0; border-top-width: 4px; border-right-width: 4px; }
.c.bl { bottom: 0; left: 0; border-bottom-width: 4px; border-left-width: 4px; }
.c.br { bottom: 0; right: 0; border-bottom-width: 4px; border-right-width: 4px; }
.scan {
  position: absolute;
  left: 0;
  right: 0;
  height: 36px;
  top: -36px;
  background: linear-gradient(to bottom, transparent, rgba(255, 92, 10, 0.3) 80%, var(--bai-orange));
  animation: sweep 2.6s ease-in-out infinite;
}
@keyframes sweep {
  0% { top: -36px; }
  60%, 100% { top: 100%; }
}
.host {
  display: block;
  margin-top: 10px;
  font-size: 12px;
  font-weight: 700;
  color: var(--bai-ink) !important;
  text-decoration: none !important;
}
.float {
  position: absolute;
  bottom: 40px;
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
