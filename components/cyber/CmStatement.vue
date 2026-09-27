<script setup lang="ts">
import CmFrame from './CmFrame.vue'
import { CM_TOTAL } from './deck'

interface Props {
  section?: string
  index?: number
  total?: number
  lines?: string[]
  note?: string
  tag?: string
  /* Overheard-thought column, e.g. a new contributor's inner monologue. */
  voices?: string[]
  /* Display size in px. Raise it for a single-line slide that has to land. */
  size?: number
  scan?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  section: '',
  index: 1,
  total: CM_TOTAL,
  lines: () => [],
  note: '',
  tag: '',
  voices: () => [],
  size: 52,
  scan: false,
})
</script>

<template>
  <CmFrame :section="props.section" :index="props.index" :total="props.total" :scan="props.scan">
    <div class="grid grid-cols-12 gap-6 h-full">
      <div class="col-span-1 pt-1">
        <span class="cm-label text-[var(--cm-fg)]">[{{ String(props.index).padStart(2, '0') }}]</span>
      </div>
      <div
        class="flex flex-col justify-center"
        :class="props.voices.length ? 'col-span-7' : 'col-span-10'"
      >
        <p v-if="props.tag" class="cm-label mb-6">{{ props.tag }}</p>
        <h2 class="cm-display m-0" :style="{ fontSize: `${props.size}px` }">
          <span v-for="(line, i) in props.lines" :key="i" class="block" :class="{ 'cm-dim': i % 2 === 1 }">
            {{ line }}
          </span>
        </h2>
        <div v-if="props.note" v-click class="mt-10 max-w-2xl flex gap-4 items-start">
          <span class="cm-dim text-sm pt-[2px]">//</span>
          <p class="text-[15px] leading-relaxed m-0">{{ props.note }}</p>
        </div>
      </div>

      <div
        v-if="props.voices.length"
        v-click
        class="col-span-4 flex flex-col justify-center gap-5 border-l border-[var(--cm-line)] pl-8"
      >
        <p v-for="(voice, i) in props.voices" :key="i" class="m-0 text-[15px] cm-dim leading-snug">
          &ldquo;{{ voice }}&rdquo;
        </p>
      </div>
    </div>
  </CmFrame>
</template>
