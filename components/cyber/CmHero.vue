<script setup lang="ts">
import CmFrame from './CmFrame.vue'
import { CM_TOTAL } from './deck'

interface Props {
  kicker?: string
  lines?: string[]
  subtitle?: string
  hook?: string
  speaker?: string
  role?: string
  prompt?: string
  index?: number
  total?: number
}

const props = withDefaults(defineProps<Props>(), {
  kicker: '',
  lines: () => [],
  subtitle: '',
  hook: '',
  speaker: '',
  role: '',
  prompt: '',
  index: 1,
  total: CM_TOTAL,
})
</script>

<template>
  <CmFrame section="INIT" :index="props.index" :total="props.total" scan>
    <div class="grid grid-cols-12 gap-6 h-full">
      <!-- Left rail: metadata -->
      <div class="col-span-3 flex flex-col justify-between pt-2 border-r border-[var(--cm-line)] pr-6">
        <div class="space-y-3">
          <p class="cm-label">{{ props.kicker }}</p>
          <div class="cm-rule" />
          <p v-if="props.prompt" class="text-[13px] leading-relaxed">
            <span class="cm-dim">$</span> {{ props.prompt }}
          </p>
        </div>
        <div v-if="props.speaker" class="space-y-1">
          <p class="cm-label">SPEAKER</p>
          <p class="text-sm font-medium">{{ props.speaker }}</p>
          <p class="text-[12px] cm-dim">{{ props.role }}</p>
        </div>
      </div>

      <!-- Title block, anchored bottom-left -->
      <div class="col-span-9 flex flex-col justify-end pb-2">
        <h1 class="cm-display text-[64px] m-0">
          <span v-for="(line, i) in props.lines" :key="i" class="block">
            <span :class="{ 'cm-invert px-2 -mx-2': i === props.lines.length - 1 }">{{ line }}</span>
          </span>
        </h1>
        <p v-if="props.subtitle" class="mt-6 text-lg">
          <span class="cm-dim">&gt;</span> {{ props.subtitle }}<span class="ml-1">█</span>
        </p>
        <p v-if="props.hook" class="mt-4 max-w-xl text-[15px] cm-dim leading-relaxed m-0">
          {{ props.hook }}
        </p>
      </div>
    </div>
  </CmFrame>
</template>
