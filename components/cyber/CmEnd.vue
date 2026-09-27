<script setup lang="ts">
import { useNav } from '@slidev/client'
import CmFrame from './CmFrame.vue'
import { CM_TOTAL } from './deck'

interface Props {
  index?: number
  total?: number
  /* Dim setup lines shown above the CTA, e.g. the things you can do instead. */
  before?: string[]
  lines?: string[]
  sub?: string
  links?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  index: 1,
  total: CM_TOTAL,
  before: () => [],
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
        <p class="text-[13px] m-0 mb-4"><span class="cm-dim">$</span> exit 0</p>

        <ul v-if="props.before.length" class="list-none p-0 m-0 mb-6 space-y-1">
          <li v-for="item in props.before" :key="item" class="cm-label !text-[var(--cm-dim)]">
            {{ item }}
          </li>
        </ul>

        <!-- The setup lines eat vertical room, so the CTA steps down when they are present -->
        <h2 class="cm-display m-0" :class="props.before.length ? 'text-[44px]' : 'text-[60px]'">
          <span v-for="(line, i) in props.lines" :key="i" class="block">
            <span :class="{ 'cm-invert px-2 -mx-2': i === props.lines.length - 1 }">{{ line }}</span>
          </span>
        </h2>
        <p v-if="props.sub" class="mt-4 text-lg m-0"><span class="cm-dim">&gt;</span> {{ props.sub }}<span class="ml-1">█</span></p>
      </div>

      <div class="col-span-4 flex flex-col justify-between border-l border-[var(--cm-line)] pl-6">
        <ul class="list-none p-0 m-0 space-y-3">
          <li v-for="link in props.links" :key="link" class="text-[13px]">
            <span class="cm-dim">→</span> {{ link }}
          </li>
        </ul>
        <button
          class="self-start border border-[var(--cm-fg)] bg-transparent text-[var(--cm-fg)] px-4 py-2 cm-label !text-[var(--cm-fg)] cursor-pointer transition-colors duration-200 hover:bg-[#fff] hover:!text-black"
          @click.stop="nav.go('index')"
        >
          [ ← INDEX ]
        </button>
      </div>
    </div>
  </CmFrame>
</template>
