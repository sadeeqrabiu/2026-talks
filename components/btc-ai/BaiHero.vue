<script setup lang="ts">
import { useBaiActive } from './deck'

const active = useBaiActive()

const LINES = ['Use of AI in', 'Bitcoin', 'Development']
</script>

<template>
  <div class="absolute inset-0">
    <h1 class="title">
      <span v-for="(line, i) in LINES" :key="line" class="block">
        <span class="bai-wipe" :class="{ play: active }" :style="{ '--d': `${0.25 + i * 0.16}s` }">{{ line }}</span>
      </span>
    </h1>

    <p class="sub bai-rise" :class="{ on: active }">Open source, the Bitcoin ecosystem, and where AI fits.</p>

    <div class="who bai-rise" :class="{ on: active }">
      <img src="https://github.com/sadeeqrabiu.png" alt="Sadiq Rabiu" class="pfp">
      <div>
        <div class="text-[15px] font-800 leading-tight">Sadiq Rabiu</div>
        <div class="text-[11px] font-600 mt-0.5">Founder, Open Source Guild</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title,
.slidev-layout .title {
  position: absolute;
  left: 36px;
  top: 96px;
  margin: 0;
  font-size: 74px;
  font-weight: 900;
  line-height: 1.04;
  letter-spacing: -0.05em;
  color: var(--bai-white);
}
.sub {
  position: absolute;
  left: 38px;
  top: 342px;
  width: 520px;
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  transition-delay: 1s;
}
.who {
  position: absolute;
  left: 38px;
  bottom: 34px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition-delay: 1.2s;
}
.pfp {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 3px solid var(--bai-white);
  object-fit: cover;
}
</style>
