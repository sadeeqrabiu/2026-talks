<script setup lang="ts">
import { ref } from 'vue'
import BaiBtn from './BaiBtn.vue'

/* Ask the room to pick the wrong one. Both come in the same voice, which is the point. */
const CARDS = [
  {
    text: 'Coinbase outputs need 100 confirmations before they can be spent.',
    wrong: false,
    title: 'True',
    proof: 'COINBASE_MATURITY = 100 in src/consensus/consensus.h',
  },
  {
    text: 'The dust limit is a consensus rule. A block containing dust is invalid.',
    wrong: true,
    title: 'Wrong',
    proof: 'Dust is relay policy (IsDust in src/policy/policy.cpp). A block with dust outputs is still valid.',
  },
]

const picked = ref<number | null>(null)
</script>

<template>
  <div class="absolute inset-0 p-6 flex flex-col">
    <div class="flex items-baseline justify-between">
      <span class="text-[19px] font-800 tracking-tight">One of these is wrong. Which one?</span>
      <BaiBtn v-if="picked !== null" class="ghost" @click="picked = null">Reset</BaiBtn>
    </div>

    <div class="grid grid-cols-2 gap-5 flex-1 mt-4 min-h-0">
      <button
        v-for="(c, i) in CARDS"
        :key="i"
        class="card"
        :class="{ flip: picked !== null }"
        :style="{ transitionDelay: picked === i ? '0s' : '0.28s' }"
        @mousedown.prevent
        @click="picked = i"
      >
        <span class="face front">
          <span class="flex items-center justify-between w-full">
            <span class="bai-label">AI answer</span>
            <span class="bai-label">certain</span>
          </span>
          <span class="meter"><i /></span>
          <span class="text-[17px] font-700 leading-snug mt-auto mb-auto">{{ c.text }}</span>
        </span>
        <span class="face back" :class="{ wrong: c.wrong }">
          <span class="text-[34px] font-900 tracking-tighter leading-none">{{ c.title }}</span>
          <span class="text-[13px] font-600 leading-snug mt-3">{{ c.proof }}</span>
          <span v-if="picked === i" class="you">{{ c.wrong ? 'Good catch.' : 'It fooled you. It sounded just as sure.' }}</span>
        </span>
      </button>
    </div>

    <div class="text-[15px] font-800 tracking-tight mt-4">
      Tone is not evidence. <span class="text-[var(--bai-orange)]">Being sure and being right sound the same.</span>
    </div>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: transform 0.75s var(--bai-spring);
}
.card:hover:not(.flip) {
  transform: translateY(-4px);
}
.card.flip {
  transform: rotateY(180deg);
}
.face {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 10px;
  backface-visibility: hidden;
}
.front {
  border: 1.5px solid var(--bai-rule);
  background: var(--bai-white);
}
.back {
  transform: rotateY(180deg);
  border: 1.5px solid var(--bai-ink);
  background: var(--bai-white);
  color: var(--bai-ink);
}
.back.wrong {
  border-color: var(--bai-orange);
  background: var(--bai-orange);
  color: var(--bai-white);
}
.meter {
  display: block;
  height: 8px;
  margin-top: 8px;
  background: var(--bai-rule);
}
.meter i {
  display: block;
  width: 100%;
  height: 100%;
  background: var(--bai-orange);
  transform-origin: left;
  animation: fill 1.1s var(--bai-ease) 0.25s both;
}
@keyframes fill {
  from {
    transform: scaleX(0);
  }
}
.you {
  margin-top: auto;
  font-size: 12px;
  font-weight: 800;
}
</style>
