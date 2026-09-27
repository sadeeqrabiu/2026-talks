<script setup lang="ts">
import CmFrame from './CmFrame.vue'
import { CM_TOTAL } from './deck'

interface Node {
  title: string
  body?: string
}

interface Props {
  section?: string
  index?: number
  total?: number
  title?: string
  prompt?: string
  center?: string
  nodes?: Node[]
}

const props = withDefaults(defineProps<Props>(), {
  section: '',
  index: 1,
  total: CM_TOTAL,
  title: '',
  prompt: '',
  center: '',
  nodes: () => [],
})

/* The ring box is aspect-square and the viewBox is 400x400, so one viewBox
   unit is 0.25% of the box on both axes. Markers sit on the ring itself,
   labels on a wider radius so display type clears the hairline. */
const VB = 400
const C = VB / 2
const R_RING = 108
const R_LABEL = 136

const pad = (n: number) => String(n).padStart(2, '0')

/* -90deg is the top; increasing angle runs clockwise in screen coords. */
const angleAt = (i: number) => -90 + (360 / Math.max(props.nodes.length, 1)) * i

const onRing = (deg: number, r: number) => {
  const rad = (deg * Math.PI) / 180
  return { x: C + r * Math.cos(rad), y: C + r * Math.sin(rad) }
}

const markers = () =>
  props.nodes.map((_, i) => onRing(angleAt(i), R_RING))

/* Midpoint of each arc, rotated onto the clockwise tangent (angle + 90). */
const arrows = () =>
  props.nodes.map((_, i) => {
    const deg = angleAt(i) + 360 / Math.max(props.nodes.length, 1) / 2
    return { ...onRing(deg, R_RING), rotate: deg + 90 }
  })

/* Anchor each label just outside the ring, then shift it by half its own size
   along the outward normal so the block grows away from the circle instead of
   sitting on top of the hairline and its marker. */
const labels = () =>
  props.nodes.map((node, i) => {
    const deg = angleAt(i)
    const rad = (deg * Math.PI) / 180
    const { x, y } = onRing(deg, R_LABEL)
    const tx = -50 + 50 * Math.cos(rad)
    const ty = -50 + 50 * Math.sin(rad)
    return {
      ...node,
      n: pad(i + 1),
      left: `${(x / VB) * 100}%`,
      top: `${(y / VB) * 100}%`,
      transform: `translate(${tx.toFixed(2)}%, ${ty.toFixed(2)}%)`,
    }
  })
</script>

<template>
  <CmFrame :section="props.section" :index="props.index" :total="props.total">
    <div class="grid grid-cols-12 gap-8 h-full">
      <!-- Title column: matches CmSteps so the METHOD slides rhyme -->
      <div class="col-span-4 flex flex-col justify-between">
        <h2 class="cm-display text-[34px] m-0">{{ props.title }}</h2>
        <p v-if="props.prompt" class="text-[13px] m-0">
          <span class="cm-dim">$</span> {{ props.prompt }}
        </p>
      </div>

      <!-- Ring -->
      <div class="col-span-8 flex items-center justify-center">
        <div class="relative h-full aspect-square">
          <svg class="absolute inset-0 w-full h-full" :viewBox="`0 0 ${VB} ${VB}`">
            <circle :cx="C" :cy="C" :r="R_RING" fill="none" stroke="var(--cm-line)" stroke-width="1" />
            <!-- Direction of travel -->
            <path
              v-for="(a, i) in arrows()"
              :key="`a${i}`"
              d="M -5 -4 L 5 0 L -5 4 Z"
              fill="var(--cm-dim)"
              :transform="`translate(${a.x} ${a.y}) rotate(${a.rotate})`"
            />
            <!-- Square markers: radius 0 is the idiom, and border-radius does not reach SVG -->
            <rect
              v-for="(m, i) in markers()"
              :key="`m${i}`"
              :x="m.x - 4"
              :y="m.y - 4"
              width="8"
              height="8"
              fill="var(--cm-fg)"
            />
          </svg>

          <p
            v-if="props.center"
            class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 m-0 text-[12px] cm-dim whitespace-nowrap"
          >
            {{ props.center }}
          </p>

          <div
            v-for="node in labels()"
            :key="node.title"
            v-click
            class="absolute w-[132px] text-center"
            :style="{ left: node.left, top: node.top, transform: node.transform }"
          >
            <p class="m-0 text-[10px] cm-dim">[{{ node.n }}]</p>
            <p class="cm-display text-[19px] m-0 mt-0.5">{{ node.title }}</p>
            <p v-if="node.body" class="m-0 mt-1 text-[10px] cm-dim leading-snug">{{ node.body }}</p>
          </div>
        </div>
      </div>
    </div>
  </CmFrame>
</template>
