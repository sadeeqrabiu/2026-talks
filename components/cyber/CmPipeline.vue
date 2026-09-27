<script setup lang="ts">
import CmFrame from './CmFrame.vue'
import CmPipelineRow from './CmPipelineRow.vue'
import { CM_TOTAL } from './deck'

interface Row {
  label: string
  stages: string[]
  markAt?: number
  markLabel?: string
}

interface Props {
  section?: string
  index?: number
  total?: number
  title?: string
  rows?: Row[]
  conclusion?: string
  note?: string
}

const props = withDefaults(defineProps<Props>(), {
  section: '',
  index: 1,
  total: CM_TOTAL,
  title: '',
  rows: () => [],
  conclusion: '',
  note: '',
})
</script>

<template>
  <CmFrame :section="props.section" :index="props.index" :total="props.total">
    <h2 v-if="props.title" class="cm-display text-[40px] m-0">{{ props.title }}</h2>

    <div class="flex-1 flex flex-col justify-center gap-10">
      <!-- First row is always visible; the rest reveal on click, as CmCompare does -->
      <CmPipelineRow v-if="props.rows[0]" v-bind="props.rows[0]" />
      <CmPipelineRow
        v-for="row in props.rows.slice(1)"
        :key="row.label"
        v-click
        v-bind="row"
      />
    </div>

    <div v-if="props.conclusion || props.note" class="border-t border-[var(--cm-line)] pt-6">
      <h3 v-if="props.conclusion" class="cm-display text-[28px] m-0 max-w-4xl">{{ props.conclusion }}</h3>
      <div v-if="props.note" class="mt-4 flex gap-4 items-start max-w-3xl">
        <span class="cm-dim text-sm pt-[2px]">//</span>
        <p class="text-[14px] cm-dim leading-relaxed m-0">{{ props.note }}</p>
      </div>
    </div>
  </CmFrame>
</template>
