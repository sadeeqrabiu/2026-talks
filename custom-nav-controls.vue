<template>
  <div class="flex items-center gap-0.5">
    <button 
      class="slidev-icon-btn" 
      :class="{ 'text-green-400': reactionsEnabled, 'opacity-50': !reactionsEnabled }"
      :title="reactionsEnabled ? 'Disable audience reactions' : 'Enable audience reactions'" 
      @click="toggleReactions"
    >
      <div v-if="reactionsEnabled" class="i-carbon-face-satisfied" />
      <div v-else class="i-carbon-face-neutral" />
    </button>
    <button 
      class="slidev-icon-btn"
      :class="{ 'text-green-400': isQrExpanded, 'opacity-70 hover:opacity-100': !isQrExpanded }"
      title="Toggle Audience Interaction QR Code"
      @click="toggleQR"
    >
      <div class="i-carbon-qr-code" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useStorage } from '@vueuse/core'

// Use localStorage to persist the toggle state
const reactionsEnabled = useStorage('slidev-reactions-enabled', true)
const isQrExpanded = useStorage('slidev-audience-qr-open', false)

function toggleReactions() {
  reactionsEnabled.value = !reactionsEnabled.value
}

function toggleQR() {
  isQrExpanded.value = !isQrExpanded.value
}
</script>

