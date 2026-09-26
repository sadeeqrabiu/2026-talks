<script setup lang="ts">
import CmFrame from './CmFrame.vue'
import CmCompareSide from './CmCompareSide.vue'

interface Side {
  label: string
  heading: string
  items: string[]
}

interface Props {
  section?: string
  index?: number
  total?: number
  title?: string
  left: Side
  right: Side
  invert?: 'left' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  section: '',
  index: 1,
  total: 12,
  title: '',
  invert: 'right',
})
</script>

<template>
  <CmFrame :section="props.section" :index="props.index" :total="props.total">
    <h2 v-if="props.title" class="cm-display text-[40px] m-0 mb-8">{{ props.title }}</h2>

    <div class="grid grid-cols-2 flex-1 border border-[var(--cm-fg)]">
      <CmCompareSide
        v-bind="props.left"
        :inverted="props.invert === 'left'"
        class="border-r border-[var(--cm-fg)]"
      />
      <CmCompareSide v-click v-bind="props.right" :inverted="props.invert === 'right'" />
    </div>
  </CmFrame>
</template>
