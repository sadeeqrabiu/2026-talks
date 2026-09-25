<script setup lang="ts">
import CmFrame from './CmFrame.vue'

interface Step {
  title: string
  body?: string
}

interface Props {
  section?: string
  index?: number
  total?: number
  title?: string
  prompt?: string
  steps?: Step[]
  terminal?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  section: '',
  index: 1,
  total: 11,
  title: '',
  prompt: '',
  steps: () => [],
  terminal: false,
})

const pad = (n: number) => String(n).padStart(2, '0')
</script>

<template>
  <CmFrame :section="props.section" :index="props.index" :total="props.total">
    <div class="grid grid-cols-12 gap-8 h-full">
      <!-- Title column -->
      <div class="col-span-4 flex flex-col justify-between">
        <h2 class="cm-display text-[34px] m-0">{{ props.title }}</h2>
        <p v-if="props.prompt" class="text-[13px] m-0">
          <span class="cm-dim">$</span> {{ props.prompt }}
        </p>
      </div>

      <!-- Steps column -->
      <ol
        class="col-span-8 list-none p-0 m-0 flex flex-col justify-center border-t border-[var(--cm-fg)]"
        :class="{ 'border border-[var(--cm-line)] px-6 py-1': props.terminal }"
      >
        <li
          v-for="(step, i) in props.steps"
          :key="step.title"
          v-click
          class="grid grid-cols-[56px_1fr] gap-4 py-2.5 border-b border-[var(--cm-line)] last:border-b-0"
        >
          <span class="text-[13px] cm-dim pt-[3px]">{{ props.terminal ? '[ ]' : `[${pad(i + 1)}]` }}</span>
          <div>
            <p class="text-[18px] font-bold m-0 leading-snug">{{ step.title }}</p>
            <p v-if="step.body" class="text-[13px] cm-dim m-0 mt-1 leading-relaxed">{{ step.body }}</p>
          </div>
        </li>
      </ol>
    </div>
  </CmFrame>
</template>
