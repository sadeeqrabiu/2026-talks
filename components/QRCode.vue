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
  if (!props.url) return ''
  return `https://api.qrserver.com/v1/create-qr-code/?size=${props.size}x${props.size}&data=${encodeURIComponent(props.url)}`
})
</script>

<template>
  <div class="flex flex-col items-center justify-center space-y-4">
    <!-- QR Code Glass Frame -->
    <div class="p-4 rounded-2xl bg-white shadow-[0_0_40px_rgba(0,255,136,0.3)] border border-white/20">
      <img
        :src="qrUrl"
        :alt="`QR Code for ${props.url}`"
        :width="props.size"
        :height="props.size"
        class="block rounded-lg"
      />
    </div>

    <!-- Instructions -->
    <div class="text-center">
      <p class="text-sm font-semibold text-white">{{ props.title }}</p>
      <p class="text-xs font-mono text-zinc-400 mt-1">{{ props.instruction }}</p>
      <p class="text-[10px] font-mono text-[#4ade80] mt-2 underline break-all max-w-xs">{{ props.url }}</p>
    </div>
  </div>
</template>
