<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import BaiBtn from './BaiBtn.vue'

/*
  An AI answer that reads perfectly and names a function Bitcoin Core doesn't have.
  Grep it and the name falls apart. (Checked: no match anywhere in bitcoin/bitcoin src/ on 5 Nov 2026.)
*/
const props = defineProps<{ active: boolean }>()

const FN = 'VerifyTaprootConsensusRules()'
const CHARS = [...FN]

const shown = ref(false)
const stage = ref<'answer' | 'grep' | 'gone'>('answer')
let timer: ReturnType<typeof setTimeout> | undefined

function clear() {
  clearTimeout(timer)
}
function reset() {
  clear()
  stage.value = 'answer'
  shown.value = false
  timer = setTimeout(() => (shown.value = true), 250)
}
function grep() {
  stage.value = 'grep'
  clear()
  timer = setTimeout(() => (stage.value = 'gone'), 900)
}

watch(() => props.active, on => (on ? reset() : clear()), { immediate: true })
onBeforeUnmount(clear)
</script>

<template>
  <div class="absolute inset-0 p-6 flex gap-6">
    <div class="flex-1 min-w-0 flex flex-col">
      <span class="bai-label">AI answer · sounds right</span>
      <p class="answer bai-rise" :class="{ on: shown }">
        To enforce this rule, call
        <span class="fn" :class="{ gone: stage === 'gone' }">
          <span
            v-for="(c, i) in CHARS"
            :key="i"
            class="ch"
            :style="{ '--i': i, '--r': ((i * 37) % 11) - 5 }"
          >{{ c }}</span>
        </span>
        in <span class="font-800">validation.cpp</span>.
        It was added with the Taproot soft fork.
      </p>

      <div class="mt-auto">
        <div class="verdict" :class="{ on: stage === 'gone' }">
          Fluent. Specific. <span class="text-[var(--bai-orange)]">Invented.</span>
        </div>
      </div>
    </div>

    <div class="w-[340px] shrink-0 flex flex-col">
      <span class="bai-label">Your terminal</span>
      <div class="term">
        <div v-if="stage !== 'answer'" class="bai-pop origin-left">
          <span class="text-[var(--bai-orange)]">$</span> git grep -c "VerifyTaproot<wbr>ConsensusRules" src/
        </div>
        <div v-if="stage === 'gone'" class="mt-3 bai-pop origin-left">
          <span class="text-[var(--bai-mute)]">(no matches)</span><br>
          <span class="text-[var(--bai-orange)] font-800">exit 1</span>
        </div>
        <div v-if="stage === 'answer'" class="text-[var(--bai-mute)]">waiting for you to check</div>
      </div>
      <div class="flex gap-2 mt-3">
        <BaiBtn class="hot" :disabled="stage !== 'answer'" @click="grep">git grep it</BaiBtn>
        <BaiBtn class="ghost" :disabled="stage === 'answer'" @click="reset">Reset</BaiBtn>
      </div>
    </div>
  </div>
</template>

<style scoped>
.answer {
  margin: 12px 0 0;
  font-size: 21px;
  font-weight: 600;
  line-height: 1.5;
}
.fn {
  position: relative;
  display: inline-block;
  padding: 0 4px;
  border-radius: 4px;
  background: #fff0e4;
  font-weight: 800;
  white-space: nowrap;
  font-size: 18px;
  transition: background 0.3s, outline-color 0.3s;
  outline: 1.5px dashed transparent;
}
.fn.gone {
  background: transparent;
  outline-color: var(--bai-orange);
}
.ch {
  display: inline-block;
  white-space: pre;
}
.fn.gone .ch {
  animation: fall 0.9s cubic-bezier(0.55, 0, 0.85, 0.35) both;
  animation-delay: calc(var(--i) * 22ms);
}
@keyframes fall {
  15% {
    color: var(--bai-orange);
    transform: translateY(-4px);
  }
  100% {
    color: var(--bai-orange);
    transform: translate(calc(var(--r) * 7px), 150px) rotate(calc(var(--r) * 40deg));
    opacity: 0;
  }
}
.verdict {
  font-size: 34px;
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1.05;
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.4s 0.5s, transform 0.6s var(--bai-spring) 0.5s;
}
.verdict.on {
  opacity: 1;
  transform: none;
}
.term {
  flex: 1;
  margin-top: 12px;
  padding: 14px;
  border: 1.5px solid var(--bai-rule);
  border-radius: 8px;
  background: var(--bai-white);
  font-size: 12.5px;
  font-weight: 500;
  line-height: 1.5;
  word-break: break-word;
}
.origin-left {
  transform-origin: left top;
}
</style>
