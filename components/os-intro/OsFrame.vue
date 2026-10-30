<script setup lang="ts">
import { computed } from 'vue'
import { useNav, useSlideContext } from '@slidev/client'
import { OS_TOTAL } from './deck'
import './os-intro.css'

interface Props {
  kicker?: string
  index?: number
  total?: number
}

const props = withDefaults(defineProps<Props>(), {
  kicker: '',
  index: undefined,
  total: OS_TOTAL,
})

const { $page } = useSlideContext()
const nav = useNav()
const frontmatter = computed<Record<string, any>>(() => nav.currentSlideRoute.value?.meta?.slide?.frontmatter ?? {})

const currentIndex = computed(() => props.index ?? frontmatter.value.index ?? $page.value)
const currentTotal = computed(() => props.total ?? OS_TOTAL)
const pad = (n: number) => String(n).padStart(2, '0')
</script>

<template>
  <div class="os-layout absolute inset-0 text-white select-none">
    <header class="absolute top-7 left-24 right-10 flex items-center justify-between">
      <span class="os-kicker">{{ kicker }}</span>
      <span class="os-label relative z-10 bg-black px-1">{{ pad(currentIndex) }} / {{ pad(currentTotal) }}</span>
    </header>
    <main class="absolute top-16 bottom-10 left-24 right-10">
      <slot />
    </main>
    <footer class="absolute bottom-4 left-24 right-10 flex justify-between os-label !text-[9px] !text-white/25">
      <span>open source · intro</span>
      <span>main ← you</span>
    </footer>
  </div>
</template>
