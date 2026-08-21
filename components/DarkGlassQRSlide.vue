<script setup lang="ts">
import QRCode from './QRCode.vue'
import DarkGlassSlide from './DarkGlassSlide.vue'
</script>

<template>
  <DarkGlassSlide
    slideNum="09"
    category="INTERACTION"
    topic="AUDIENCE LIVE SESSION"
    title="Scan and Connect Live"
    subtitle="Scan the QR code below to connect your phone to the presentation deck"
  >
    <div class="flex flex-col md:flex-row items-center justify-between gap-10">
      <div class="flex-1 space-y-6">
        <p class="text-lg text-zinc-300 leading-relaxed">
          Join the live session to participate, send real-time reactions, and interact directly with the presentation.
        </p>

        <div class="space-y-3 font-mono text-xs">
          <div class="p-4 rounded-xl bg-zinc-950/80 border border-white/10 flex items-center justify-between backdrop-blur-xl">
            <span class="text-zinc-400">1. Open Camera on your Phone</span>
            <span class="text-[#22c55e]">iOS / Android</span>
          </div>
          <div class="p-4 rounded-xl bg-zinc-950/80 border border-white/10 flex items-center justify-between backdrop-blur-xl">
            <span class="text-zinc-400">2. Tap the link popup</span>
            <span class="text-[#22c55e]">Live Web Socket</span>
          </div>
          <div class="p-4 rounded-xl bg-zinc-950/80 border border-white/10 flex items-center justify-between backdrop-blur-xl">
            <span class="text-zinc-400">3. Send reactions and emojis</span>
            <span class="text-[#22c55e]">Instant Sync</span>
          </div>
        </div>
      </div>

      <div class="p-6 rounded-3xl bg-zinc-950/90 border border-white/20 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,255,136,0.2)]">
        <QRCode
          url="https://slidev-audience-client.pages.dev/"
          title="Audience Portal"
          instruction="Point phone camera at screen"
          :size="240"
        />
      </div>
    </div>
  </DarkGlassSlide>
</template>
