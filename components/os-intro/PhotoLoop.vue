<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useIsSlideActive } from '@slidev/client'

/*
  Infinite photo carousel: the centre photo is large and in colour, its
  neighbours peek in dimmed, and the strip slides left every `ms` while the
  slide is active.
*/
const props = withDefaults(defineProps<{ photos: { src: string; pos?: string }[]; ms?: number }>(), { ms: 3200 })

const W = 510 // centre photo width (3:2)
const H = 340
const GAP = 26
const SIDE = 0.68 // neighbour scale

const cur = ref(0)
const n = computed(() => props.photos.length)
const isActive = useIsSlideActive()
let timer: ReturnType<typeof setInterval> | undefined

watch(isActive, (on) => {
  clearInterval(timer)
  if (on) timer = setInterval(() => (cur.value = (cur.value + 1) % n.value), props.ms)
}, { immediate: true })
onBeforeUnmount(() => clearInterval(timer))

// Offset of each photo from the centre, wrapped into [-floor(n/2), ceil(n/2) - 1]
const items = computed(() =>
  props.photos.map((p, i) => {
    let o = (((i - cur.value) % n.value) + n.value) % n.value
    if (o >= Math.ceil(n.value / 2)) o -= n.value
    const dist = Math.abs(o)
    const x = o === 0 ? 0 : Math.sign(o) * (W / 2 + (W * SIDE) / 2 + GAP + (dist - 1) * (W * SIDE + GAP))
    return {
      ...p,
      i,
      o,
      x,
      s: o === 0 ? 1 : SIDE,
      // the photo that wraps from far-left to far-right jumps off-screen without animating
      wrap: o === Math.ceil(n.value / 2) - 1,
    }
  }),
)
</script>

<template>
  <div class="w-full">
    <div class="stage" :style="{ height: `${H}px` }">
      <div
        v-for="p in items"
        :key="p.src"
        class="ph"
        :class="{ center: p.o === 0, wrap: p.wrap }"
        :style="{
          width: `${W}px`,
          height: `${H}px`,
          marginLeft: `${-W / 2}px`,
          transform: `translateX(${p.x}px) scale(${p.s})`,
          zIndex: 10 - Math.abs(p.o),
        }"
      >
        <img :src="p.src" alt="" :style="{ objectPosition: p.pos ?? 'center' }">
      </div>
    </div>
  </div>
</template>

<style scoped>
.stage {
  position: relative;
  width: 100%;
  overflow: hidden;
  /* soft fade at both edges so the peeking photos dissolve into the slide */
  mask-image: linear-gradient(to right, transparent 0, #000 9%, #000 91%, transparent 100%);
}
.ph {
  position: absolute;
  left: 50%;
  top: 0;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.9s cubic-bezier(0.65, 0, 0.25, 1), filter 0.9s ease, opacity 0.9s ease;
  filter: grayscale(1) brightness(0.45);
  box-shadow: inset 0 0 0 1px rgba(1, 215, 88, 0.35);
}
.ph.wrap {
  transition: none;
}
.ph.center {
  filter: none;
  box-shadow: 0 0 0 1.5px #01d758, 0 0 40px rgba(0, 255, 0, 0.25);
}
.ph img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
/* slow push-in on the photo in focus */
.ph.center img {
  animation: push 3.4s ease-out both;
}
@keyframes push {
  from { transform: scale(1.08); }
  to { transform: scale(1); }
}
</style>
