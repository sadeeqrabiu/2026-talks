<script setup lang="ts">
/* Six big contribution cells — one per week — fill like a streak. */
withDefaults(defineProps<{ step?: number; weeks?: number }>(), { step: 0, weeks: 6 })
</script>

<template>
  <div class="flex items-end gap-3">
    <div v-for="w in weeks" :key="w" class="flex flex-col items-center gap-2">
      <div class="wk" :class="{ on: step >= 1, last: w === weeks }" :style="{ transitionDelay: `${(w - 1) * 0.22}s`, '--lv': 0.35 + (w / weeks) * 0.65 }">
        <span v-if="w === weeks" class="flag" :class="{ on: step >= 1 }">⎇</span>
      </div>
      <span class="os-label !text-[9px]">W{{ w }}</span>
    </div>
  </div>
</template>

<style scoped>
.wk {
  position: relative;
  width: 46px;
  height: 46px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
  transition: background-color 0.4s, transform 0.5s var(--os-spring), box-shadow 0.4s;
}
.wk.on {
  background: rgba(1, 215, 88, var(--lv));
  transform: scale(1.06);
}
.wk.on.last {
  background: #00ff00;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.6);
}
.flag {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: #000;
  font-weight: 800;
  font-size: 20px;
  opacity: 0;
  transition: opacity 0.3s 1.4s;
}
.flag.on { opacity: 1; }
</style>
