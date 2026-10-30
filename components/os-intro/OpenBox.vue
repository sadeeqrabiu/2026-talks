<script setup lang="ts">
/* A locked box (closed source) opens; code flies out along branches to the four freedoms. */
withDefaults(defineProps<{ step?: number }>(), { step: 0 })

const freedoms = [
  { label: 'Use', y: 46 },
  { label: 'Study', y: 122 },
  { label: 'Change', y: 198 },
  { label: 'Share', y: 274 },
]
const path = (y: number) => `M150,160 C230,160 230,${y} 330,${y}`
const glyphs = ['</>', '{ }', '01', 'fn']
</script>

<template>
  <div class="relative w-[440px] h-[320px]">
    <svg viewBox="0 0 440 320" class="absolute inset-0 overflow-visible">
      <!-- branches -->
      <path
        v-for="f in freedoms"
        :key="f.label"
        :d="path(f.y)"
        pathLength="1"
        class="br"
        :class="{ on: step >= 2 }"
      />
      <!-- box -->
      <g class="box" :class="{ open: step >= 1 }">
        <rect x="40" y="110" width="110" height="100" rx="10" fill="#000" stroke="#fff" stroke-width="2" />
        <g class="lid">
          <rect x="34" y="96" width="122" height="22" rx="6" fill="#000" stroke="#fff" stroke-width="2" />
        </g>
        <g class="lock">
          <path d="M85 150v-10a10 10 0 0 1 20 0v10" fill="none" stroke="#fff" stroke-width="2.5" />
          <rect x="79" y="150" width="32" height="26" rx="4" fill="#fff" />
          <circle cx="95" cy="162" r="3" fill="#000" />
        </g>
        <text x="95" y="232" class="cap">{{ step >= 1 ? 'open source' : 'closed source' }}</text>
      </g>
      <!-- freedom nodes -->
      <g v-for="(f, i) in freedoms" :key="`n${f.label}`" class="fn" :class="{ on: step >= 2 }" :style="{ transitionDelay: `${0.7 + i * 0.12}s`, transformOrigin: `338px ${f.y}px` }">
        <circle cx="338" :cy="f.y" r="8" fill="#000" stroke="#00FF00" stroke-width="2.5" />
        <text x="358" :y="f.y + 6" class="lbl">{{ f.label }}</text>
      </g>
    </svg>

    <!-- code glyphs riding the branches -->
    <template v-if="step >= 2">
      <span
        v-for="(f, i) in freedoms"
        :key="`g${f.label}`"
        class="glyph"
        :style="{ offsetPath: `path('${path(f.y)}')`, animationDelay: `${i * 0.12}s` }"
      >{{ glyphs[i] }}</span>
    </template>
    <!-- glyphs escaping the opened box -->
    <template v-if="step === 1">
      <span v-for="(g, i) in glyphs" :key="`u${g}`" class="pop" :style="{ left: `${60 + i * 22}px`, animationDelay: `${0.3 + i * 0.1}s` }">{{ g }}</span>
    </template>
  </div>
</template>

<style scoped>
.br {
  fill: none;
  stroke: #01d758;
  stroke-width: 2;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: stroke-dashoffset 0.8s var(--os-ease);
}
.br.on { stroke-dashoffset: 0; }
.lid,
.lock {
  transform-box: fill-box;
  transition: transform 0.8s var(--os-spring), opacity 0.4s;
}
.lid { transform-origin: 0% 100%; }
.box.open .lid { transform: rotate(-28deg) translate(-6px, -12px); }
.lock { transform-origin: center; }
.box.open .lock { transform: translateY(70px) rotate(25deg); opacity: 0; }
.cap {
  font-size: 11px;
  fill: rgba(255, 255, 255, 0.55);
  text-anchor: middle;
  letter-spacing: 0.1em;
}
.fn {
  transform: scale(0);
  transition: transform 0.5s var(--os-spring);
}
.fn.on { transform: scale(1); }
.lbl {
  font-size: 22px;
  font-weight: 700;
  fill: #fff;
}
.glyph {
  position: absolute;
  left: 0;
  top: 0;
  font-size: 12px;
  font-weight: 700;
  color: #00ff00;
  text-shadow: 0 0 8px #00ff00;
  offset-rotate: 0deg;
  offset-distance: 0%;
  opacity: 0;
  animation: ride 0.9s var(--os-ease) forwards;
}
@keyframes ride {
  0% { offset-distance: 0%; opacity: 0; }
  15% { opacity: 1; }
  90% { opacity: 1; }
  100% { offset-distance: 100%; opacity: 0; }
}
.pop {
  position: absolute;
  top: 100px;
  font-size: 12px;
  font-weight: 700;
  color: #00ff00;
  opacity: 0;
  animation: up 1.4s var(--os-ease) forwards;
}
@keyframes up {
  0% { transform: translateY(20px); opacity: 0; }
  30% { opacity: 1; }
  100% { transform: translateY(-50px); opacity: 0.9; }
}
</style>
