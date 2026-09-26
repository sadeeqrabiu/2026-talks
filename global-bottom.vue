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

    <!-- QR popup for latecomers - opened from the nav bar QR button (custom-nav-controls.vue), hidden on the join slides -->
    <div
      v-if="reactionsEnabled && isQrExpanded && !isDedicatedQRSlide"
      class="fixed top-4 right-4 z-[10000] pointer-events-auto select-none"
    >
      <!-- Expanded Mono Card (Talk 02) -->
      <div
        v-if="isMono"
        @click.stop
        class="w-64 p-4 bg-[#000] border border-white text-white font-mono flex flex-col"
      >
        <div class="flex items-center justify-between mb-3 text-[11px] tracking-[0.12em] uppercase">
          <span>Live reactions</span>
          <button
            @click.stop="isQrExpanded = false"
            class="px-1.5 bg-transparent border border-white/40 hover:border-white text-white text-[11px] cursor-pointer"
            title="Close"
          >
            ×
          </button>
        </div>
        <div class="bg-[#fff] p-2.5">
          <img src="/images/audience-qr.svg" alt="Audience Live Interaction QR Code" class="block w-full aspect-square" />
        </div>
        <a
          :href="AUDIENCE_URL"
          target="_blank"
          rel="noopener"
          @click.stop
          class="mt-3 text-[10px] text-[#8a8a8a] hover:text-white break-all"
        >
          &gt; slidev-audience-client.pages.dev
        </a>
        <button
          @click.stop="goToQRSlide"
          class="mt-3 w-full py-1.5 bg-transparent border border-white text-white hover:bg-[#fff] hover:text-black text-[11px] tracking-[0.12em] uppercase transition-colors duration-200 cursor-pointer"
        >
          [ Open join slide → ]
        </button>
      </div>

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
          <span>Open Full Join Slide</span>
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

const frontmatter = computed(() => nav.currentSlideRoute.value?.meta?.slide?.frontmatter ?? {})

// Hide the QR popup on the selector and on each talk's dedicated QR (join) slide
const isDedicatedQRSlide = computed(() => ['join', 'join-mono', 'index'].includes(frontmatter.value.routeAlias))

// Talk 02 uses the black & white cyber-mono system - no green, no ping
const isMono = computed(() => frontmatter.value.talk === 'first-commit')

function goToQRSlide() {
  isQrExpanded.value = false
  nav.go(isMono.value ? 'join-mono' : 'join')
}
</script>
