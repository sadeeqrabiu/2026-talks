<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  url?: string
  title?: string
  instruction?: string
  size?: number
}

const props = withDefaults(defineProps<Props>(), {
  url: 'https://slidev-audience-client.pages.dev/',
  title: 'Join the Live Session',
  instruction: 'Scan with smartphone camera to participate',
  size: 260,
})

const qrUrl = computed(() => {
  if (props.url === 'https://slidev-audience-client.pages.dev/' || !props.url) {
    return '/images/audience-qr.svg'
  }
  return `https://api.qrserver.com/v1/create-qr-code/?size=${props.size}x${props.size}&data=${encodeURIComponent(props.url)}`
})
</script>

<template>
  <div class="flex flex-col items-center justify-center space-y-4">
    <!-- QR Code Glass Frame -->
    <div class="p-4 rounded-3xl bg-white shadow-[0_0_50px_rgba(34,197,94,0.35)] border border-white/30 transition-transform duration-300 hover:scale-[1.02]">
      <img
        :src="qrUrl"
        :alt="`QR Code for ${props.url}`"
        :width="props.size"
        :height="props.size"
        class="block rounded-xl object-contain"
      />
    </div>

    <!-- Instructions & Link -->
    <div class="text-center space-y-1">
      <p class="text-base font-bold text-white tracking-tight">{{ props.title }}</p>
      <p class="text-xs font-mono text-zinc-400">{{ props.instruction }}</p>
      <a
        :href="props.url"
        target="_blank"
        rel="noopener"
        @click.stop
        class="inline-block text-xs font-mono text-[#4ade80] hover:underline underline-offset-4 mt-2 transition-colors"
      >
        {{ props.url }}
      </a>
    </div>
  </div>
</template>

