<script setup lang="ts">
import { ref } from 'vue'
import Pumpkin from './halloween/Pumpkin.vue'

/* Drop an image at public/<src> and it replaces the placeholder automatically. */
const props = withDefaults(defineProps<{ src: string; label?: string }>(), { label: 'meme' })
const ok = ref(false)
</script>

<template>
  <div class="slot">
    <img v-show="ok" :src="props.src" alt="" class="absolute inset-0 size-full object-contain" @load="ok = true" @error="ok = false">
    <div v-if="!ok" class="flex flex-col items-center gap-2 text-center px-4">
      <Pumpkin :size="28" />
      <span class="os-label !text-white/55">{{ label }}</span>
      <code class="text-[10px] text-[var(--os-green)]">public{{ props.src }}</code>
    </div>
  </div>
</template>

<style scoped>
.slot {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed rgba(1, 215, 88, 0.5);
  border-radius: 10px;
  background:
    linear-gradient(135deg, rgba(1, 215, 88, 0.06), transparent 60%),
    repeating-linear-gradient(45deg, transparent 0 10px, rgba(255, 255, 255, 0.025) 10px 11px);
  overflow: hidden;
}
</style>
