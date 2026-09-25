<script setup lang="ts">
import CmFrame from './CmFrame.vue'

interface Props {
  section?: string
  index?: number
  total?: number
  lines?: string[]
  note?: string
  tag?: string
}

const props = withDefaults(defineProps<Props>(), {
  section: '',
  index: 1,
  total: 11,
  lines: () => [],
  note: '',
  tag: '',
})
</script>

<template>
  <CmFrame :section="props.section" :index="props.index" :total="props.total">
    <div class="grid grid-cols-12 gap-6 h-full">
      <div class="col-span-1 pt-1">
        <span class="cm-label text-[var(--cm-fg)]">[{{ String(props.index).padStart(2, '0') }}]</span>
      </div>
      <div class="col-span-10 flex flex-col justify-center">
        <p v-if="props.tag" class="cm-label mb-6">{{ props.tag }}</p>
        <h2 class="cm-display text-[52px] m-0">
          <span v-for="(line, i) in props.lines" :key="i" class="block" :class="{ 'cm-dim': i % 2 === 1 }">
            {{ line }}
          </span>
        </h2>
        <div v-if="props.note" v-click class="mt-10 max-w-2xl flex gap-4 items-start">
          <span class="cm-dim text-sm pt-[2px]">//</span>
          <p class="text-[15px] leading-relaxed m-0">{{ props.note }}</p>
        </div>
      </div>
    </div>
  </CmFrame>
</template>
