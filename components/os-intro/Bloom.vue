<script setup lang="ts">
import { computed } from 'vue'
import { seeded } from './deck'

/*
  One centre node radiates to satellites (step >= satsAt); each satellite can
  then bloom into a cluster of small community nodes (step >= bloomAt).
*/
const props = withDefaults(
  defineProps<{
    center: string
    centerImg?: string
    /** image box size inside the 124px card; > 124 crops a logo's built-in margin */
    centerZoom?: number
    /** 'slice' fills the card (for logos on a coloured, non-square background) */
    centerFit?: 'meet' | 'slice'
    sats: string[]
    step?: number
    satsAt?: number
    bloomAt?: number
    bloom?: number
    rx?: number
    ry?: number
  }>(),
  { step: 0, satsAt: 1, bloomAt: 2, bloom: 0, rx: 230, ry: 125, centerZoom: 140, centerFit: 'meet' },
)

const W = 640
const H = 340
const CX = W / 2
const CY = H / 2

const sats = computed(() =>
  props.sats.map((label, i) => {
    const t = (i / props.sats.length) * Math.PI * 2 - Math.PI / 2 + 0.35
    const x = CX + Math.cos(t) * props.rx
    const y = CY + Math.sin(t) * props.ry
    const rand = seeded(i + 11)
    const kids = Array.from({ length: props.bloom }, (_, k) => {
      const a = t + (rand() - 0.5) * 2.4
      const r = 26 + rand() * 40
      return { x: x + Math.cos(a) * r, y: y + Math.sin(a) * r * 0.8, d: k * 0.05 + i * 0.08 }
    })
    return { label, x, y, t, kids, d: i * 0.1 }
  }),
)
</script>

<template>
  <svg :viewBox="`0 0 ${W} ${H}`" class="w-full overflow-visible">
    <!-- spokes -->
    <line
      v-for="s in sats"
      :key="`l${s.label}`"
      :x1="CX" :y1="CY" :x2="s.x" :y2="s.y"
      pathLength="1"
      class="spoke"
      :class="{ on: step >= satsAt }"
      :style="{ transitionDelay: `${s.d}s` }"
    />
    <!-- community -->
    <g v-for="s in sats" :key="`k${s.label}`">
      <g v-for="(k, j) in s.kids" :key="j" class="kid" :class="{ on: step >= bloomAt }" :style="{ transitionDelay: `${k.d}s`, transformOrigin: `${s.x}px ${s.y}px` }">
        <line :x1="s.x" :y1="s.y" :x2="k.x" :y2="k.y" stroke="#01D758" stroke-opacity="0.35" stroke-width="1" />
        <circle :cx="k.x" :cy="k.y" r="3" fill="#01D758" />
      </g>
    </g>
    <!-- satellites -->
    <g
      v-for="s in sats"
      :key="`s${s.label}`"
      class="sat"
      :class="{ on: step >= satsAt }"
      :style="{ transitionDelay: `${0.4 + s.d}s`, transformOrigin: `${s.x}px ${s.y}px` }"
    >
      <circle :cx="s.x" :cy="s.y" r="7" fill="#000" stroke="#fff" stroke-width="2" />
      <text :x="s.x" :y="s.y + (Math.sin(s.t) < -0.3 ? -16 : 24)" class="lbl">{{ s.label }}</text>
    </g>
    <!-- centre -->
    <circle :cx="CX" :cy="CY" :r="centerImg ? 78 : 44" fill="#00FF00" opacity="0.08" class="halo" :class="{ on: step >= satsAt }" />
    <!-- logo card (white, since most logos ship on white) -->
    <g v-if="centerImg">
      <rect :x="CX - 62" :y="CY - 62" width="124" height="124" rx="22" fill="#fff" stroke="#00FF00" stroke-width="2.5" class="card" />
      <clipPath :id="`clip-${center}`">
        <rect :x="CX - 62" :y="CY - 62" width="124" height="124" rx="22" />
      </clipPath>
      <!-- oversized + clipped: crops the logo's built-in white margin -->
      <image :href="centerImg" :x="CX - centerZoom / 2" :y="CY - centerZoom / 2" :width="centerZoom" :height="centerZoom" :preserveAspectRatio="`xMidYMid ${centerFit}`" :clip-path="`url(#clip-${center})`" :aria-label="center" />
    </g>
    <template v-else>
      <circle :cx="CX" :cy="CY" r="30" fill="#000" stroke="#00FF00" stroke-width="2.5" />
      <text :x="CX" :y="CY + 5" class="ctr">{{ center }}</text>
    </template>
  </svg>
</template>

<style scoped>
.spoke {
  stroke: #01d758;
  stroke-width: 1.5;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: stroke-dashoffset 0.7s var(--os-ease);
}
.spoke.on { stroke-dashoffset: 0; }
.sat,
.kid {
  transform: scale(0);
  opacity: 0;
  transition: transform 0.6s var(--os-spring), opacity 0.3s;
}
.sat.on,
.kid.on {
  transform: scale(1);
  opacity: 1;
}
.lbl {
  font-size: 13px;
  fill: #fff;
  text-anchor: middle;
}
.card {
  filter: drop-shadow(0 0 14px rgba(0, 255, 0, 0.45));
}
.ctr {
  font-size: 12px;
  font-weight: 700;
  fill: #fff;
  text-anchor: middle;
}
.halo {
  transform-box: fill-box;
  transform-origin: center;
  transition: transform 1s var(--os-spring);
  transform: scale(0.6);
}
.halo.on { transform: scale(1.4); }
</style>
