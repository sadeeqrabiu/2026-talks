<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import BaiPixel from './BaiPixel.vue'
import { CAT } from './deck'

/* Sits on the top edge of whatever panel it's placed in and walks to `x` when it changes. */
const props = withDefaults(defineProps<{ x?: number, px?: number }>(), { x: 40, px: 3 })

const WALK_MS = 1000
const rows = ref(CAT.sit)
const flip = ref(false)
const hop = ref(0)
const hearts = ref<number[]>([])
let frame: ReturnType<typeof setInterval> | undefined
let stop: ReturnType<typeof setTimeout> | undefined
let heartId = 0

watch(() => props.x, (to, from) => {
  flip.value = to < from
  clearInterval(frame)
  clearTimeout(stop)
  let a = true
  rows.value = CAT.walkA
  frame = setInterval(() => {
    a = !a
    rows.value = a ? CAT.walkA : CAT.walkB
  }, 120)
  stop = setTimeout(() => {
    clearInterval(frame)
    rows.value = CAT.sit
  }, WALK_MS)
})

function pet() {
  hop.value++
  const id = ++heartId
  hearts.value.push(id)
  setTimeout(() => (hearts.value = hearts.value.filter(h => h !== id)), 900)
}

onBeforeUnmount(() => {
  clearInterval(frame)
  clearTimeout(stop)
})
</script>

<template>
  <div class="cat" :style="{ transform: `translateX(${x}px)`, color: 'var(--bai-ink)' }" @click.stop="pet">
    <span v-for="h in hearts" :key="h" class="heart">♥</span>
    <div :key="hop" :class="{ hop: hop > 0 }">
      <div :style="{ transform: flip ? 'scaleX(-1)' : undefined }">
        <BaiPixel :rows="rows" :px="px" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.cat {
  position: absolute;
  left: 0;
  bottom: 100%;
  margin-bottom: -2px;
  z-index: 5;
  cursor: pointer;
  transition: transform 1s cubic-bezier(0.45, 0.05, 0.55, 0.95);
}
.hop {
  animation: hop 0.45s var(--bai-ease);
}
@keyframes hop {
  40% {
    transform: translateY(-16px);
  }
}
.heart {
  position: absolute;
  top: -8px;
  right: 2px;
  color: var(--bai-white);
  font-size: 14px;
  animation: float 0.9s var(--bai-ease) both;
}
@keyframes float {
  to {
    transform: translateY(-26px);
    opacity: 0;
  }
}
</style>
