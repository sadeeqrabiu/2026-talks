<template>
  <div class="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
    <!-- Live Audience Emoji Reactions Layer -->
    <AudienceReactions 
      v-if="reactionsEnabled"
      :host="REACTIONS_HOST"
      :show-controls="false"
      :show-status="false"
      :show-animation-selector="false"
      default-animation="random"
      class="size-full"
    />

    <!-- Subtle Floating Corner QR Badge & Modal for Latecomers (hidden on dedicated QR slide) -->
    <div 
      v-if="reactionsEnabled && !isDedicatedQRSlide" 
      class="fixed top-4 right-4 z-[10000] pointer-events-auto select-none"
    >
      <!-- Collapsed Glass Pill Badge -->
      <button
        v-if="!isQrExpanded"
        @click.stop="isQrExpanded = true"
        class="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-950/80 hover:bg-zinc-900/90 border border-white/15 hover:border-[#22c55e]/50 backdrop-blur-xl shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] cursor-pointer"
        title="Show Audience Interaction QR Code"
      >
        <span class="relative flex size-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
          <span class="relative inline-flex rounded-full size-2 bg-[#22c55e]"></span>
        </span>
        <span class="text-xs font-mono font-medium text-zinc-300 group-hover:text-white transition-colors">
          React Live
        </span>
        <div class="i-carbon-qr-code text-sm text-[#4ade80] group-hover:scale-110 transition-transform" />
      </button>

      <!-- Expanded Floating Glass Modal Card -->
      <div
        v-else
        @click.stop
        class="w-72 p-5 rounded-3xl bg-zinc-950/95 border border-[#22c55e]/40 backdrop-blur-3xl shadow-[0_24px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(34,197,94,0.25)] flex flex-col items-center animate-fade-in"
      >
        <!-- Modal Header -->
        <div class="flex items-center justify-between w-full mb-3">
          <div class="flex items-center gap-2">
            <span class="size-2 rounded-full bg-[#22c55e] animate-pulse" />
            <span class="text-xs font-mono font-bold uppercase tracking-wider text-white">Live Reactions</span>
          </div>
          <button
            @click.stop="isQrExpanded = false"
            class="size-6 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-400 hover:text-white transition-colors text-xs cursor-pointer"
            title="Close"
          >
            ✕
          </button>
        </div>

        <!-- High contrast QR Frame -->
        <div class="p-3 bg-white rounded-2xl shadow-xl mb-3 border border-white/20">
          <img
            src="/images/audience-qr.svg"
            alt="Audience Live Interaction QR Code"
            class="size-44 object-contain rounded-lg"
          />
        </div>

        <!-- Prompt & Info -->
        <p class="text-xs text-zinc-300 font-medium text-center">
          Scan with your phone to send live emoji reactions
        </p>

        <a
          :href="AUDIENCE_URL"
          target="_blank"
          rel="noopener"
          @click.stop
          class="mt-2 text-[10px] font-mono text-[#4ade80] hover:underline break-all text-center"
        >
          slidev-audience-client.pages.dev
        </a>

        <!-- Jump to Slide 2 Button -->
        <button
          @click.stop="goToQRSlide"
          class="mt-3 w-full py-1.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-[11px] font-mono text-zinc-400 hover:text-white transition-all text-center cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>Open Full Join Slide (02)</span>
          <span class="text-[#22c55e]">→</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useStorage } from '@vueuse/core'
import { useNav } from '@slidev/client'
import AudienceReactions from './components/audience/AudienceReactions.vue'
import { registerDeckTools } from './composables/deckTools'

const REACTIONS_HOST = 'slidev-audience.s4ndeep1203.workers.dev'
const AUDIENCE_URL = 'https://slidev-audience-client.pages.dev/'

// Use localStorage to sync state
const reactionsEnabled = useStorage('slidev-reactions-enabled', true)
const isQrExpanded = useStorage('slidev-audience-qr-open', false)

// Expose the deck itself as WebMCP tools (next_slide, go_to_slide, …)
const nav = useNav()
onMounted(() => registerDeckTools(nav))

// Hide floating badge when on the dedicated QR slide (Slide 2)
const isDedicatedQRSlide = computed(() => nav.currentPage.value === 2)

function goToQRSlide() {
  isQrExpanded.value = false
  nav.go(2)
}
</script>
