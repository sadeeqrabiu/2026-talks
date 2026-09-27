<script setup lang="ts">
defineProps<{
  label: string
  stages: string[]
  /* Index of the stage the bottleneck marker points at. Omit for none. */
  markAt?: number
  markLabel?: string
}>()
</script>

<template>
  <div class="flex items-start gap-6">
    <span class="cm-label w-[72px] shrink-0 pt-4">{{ label }}</span>

    <div class="flex items-start">
      <template v-for="(stage, i) in stages" :key="stage">
        <span v-if="i > 0" class="h-12 flex items-center px-2 cm-dim text-[13px]">&rarr;</span>
        <div class="flex flex-col">
          <div
            class="h-12 px-3 flex items-center justify-center border text-[13px] whitespace-nowrap"
            :class="i === markAt ? 'border-[var(--cm-fg)]' : 'border-[var(--cm-line)] cm-dim'"
          >
            {{ stage }}
          </div>
          <p
            v-if="i === markAt && markLabel"
            class="h-6 pt-1 m-0 text-[11px] text-center whitespace-nowrap"
          >
            <span class="cm-dim">&#9650;</span> {{ markLabel }}
          </p>
          <span v-else class="h-6" />
        </div>
      </template>
    </div>
  </div>
</template>
