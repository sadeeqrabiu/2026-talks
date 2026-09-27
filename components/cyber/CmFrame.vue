<script setup lang="ts">
import './cyber-mono.css'
import { CM_TOTAL } from './deck'

interface Props {
  section?: string
  index?: number
  total?: number
  slug?: string
  scan?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  section: '',
  index: 1,
  total: CM_TOTAL,
  slug: 'FIRST_COMMIT → CONFIDENT_CONTRIBUTOR',
  scan: false,
})

const pad = (n: number) => String(n).padStart(2, '0')
</script>

<template>
  <div class="cm absolute inset-0 overflow-hidden select-none" :class="{ 'cm-scan': props.scan }">
    <!-- Hairline frame -->
    <div class="absolute inset-6 border border-[var(--cm-line)] pointer-events-none" />

    <!-- Registration marks -->
    <span class="cm-mark top-6 left-6 -translate-x-1/2 -translate-y-1/2">+</span>
    <span class="cm-mark top-6 right-6 translate-x-1/2 -translate-y-1/2">+</span>
    <span class="cm-mark bottom-6 left-6 -translate-x-1/2 translate-y-1/2">+</span>
    <span class="cm-mark bottom-6 right-6 translate-x-1/2 translate-y-1/2">+</span>

    <!-- Header -->
    <!-- Counter sits left: the right corner is where the nav-bar QR popup opens -->
    <header class="absolute top-6 inset-x-6 h-10 px-5 flex items-center gap-6 border-b border-[var(--cm-line)]">
      <span class="cm-label !text-[var(--cm-fg)]">{{ pad(props.index) }}<span class="cm-dim">/{{ pad(props.total) }}</span></span>
      <span class="cm-label">
        TALK_02<template v-if="props.section"> // {{ props.section }}</template>
      </span>
    </header>

    <!-- Content -->
    <main class="absolute top-16 bottom-16 inset-x-6 px-12 py-8 flex flex-col">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="absolute bottom-6 inset-x-6 h-10 px-5 flex items-center justify-between border-t border-[var(--cm-line)]">
      <span class="cm-label">{{ props.slug }}</span>
      <span class="cm-label">.2026</span>
    </footer>
  </div>
</template>

<style scoped>
.cm-mark {
  position: absolute;
  font-family: var(--cm-mono);
  font-size: 14px;
  line-height: 1;
  color: var(--cm-fg);
  pointer-events: none;
}
</style>
