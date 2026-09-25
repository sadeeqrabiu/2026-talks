<script setup lang="ts">
import { useNav } from '@slidev/client'
import CmFrame from './CmFrame.vue'

interface Props {
  index?: number
  total?: number
  lines?: string[]
  sub?: string
  links?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  index: 11,
  total: 11,
  lines: () => [],
  sub: '',
  links: () => [],
})

const nav = useNav()
</script>

<template>
  <CmFrame section="EXIT" :index="props.index" :total="props.total" scan>
    <div class="grid grid-cols-12 gap-6 h-full">
      <div class="col-span-8 flex flex-col justify-end pb-2">
        <p class="text-[13px] m-0 mb-6"><span class="cm-dim">$</span> exit 0</p>
        <h2 class="cm-display text-[60px] m-0">
          <span v-for="(line, i) in props.lines" :key="i" class="block">
            <span :class="{ 'cm-invert px-2 -mx-2': i === props.lines.length - 1 }">{{ line }}</span>
          </span>
        </h2>
        <p v-if="props.sub" class="mt-6 text-lg m-0"><span class="cm-dim">&gt;</span> {{ props.sub }}<span class="ml-1">█</span></p>
      </div>

      <div class="col-span-4 flex flex-col justify-between border-l border-[var(--cm-line)] pl-6">
        <ul class="list-none p-0 m-0 space-y-3">
          <li v-for="link in props.links" :key="link" class="text-[13px]">
            <span class="cm-dim">→</span> {{ link }}
          </li>
        </ul>
        <button
          class="self-start border border-[var(--cm-fg)] bg-transparent text-[var(--cm-fg)] px-4 py-2 cm-label !text-[var(--cm-fg)] cursor-pointer transition-colors duration-200 hover:bg-white hover:!text-black"
          @click.stop="nav.go('index')"
        >
          [ ← INDEX ]
        </button>
      </div>
    </div>
  </CmFrame>
</template>
