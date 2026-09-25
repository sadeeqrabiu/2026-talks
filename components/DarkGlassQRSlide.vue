<script setup lang="ts">
import QRCode from './QRCode.vue'
import DarkGlassSlide from './DarkGlassSlide.vue'

const sampleEmojis = ['🎉', '🚀', '🔥', '❤️', '👏', '💡', '⚡']
</script>

<template>
  <DarkGlassSlide
    slideNum="02"
    totalSlides="9"
    category="INTERACTION"
    topic="AUDIENCE LIVE SESSION"
    title="Scan & Connect Live"
    subtitle="Scan the QR code below to connect your phone to the presentation deck"
  >
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      <!-- LEFT SECTION (7 Cols): Instructions & Live Reaction Preview -->
      <div class="lg:col-span-7 space-y-6">
        <p class="text-base lg:text-lg text-zinc-300 leading-relaxed font-medium">
          Participate in real-time throughout the talk. Send instant emoji reactions, pulse effects, and interact directly with the presentation screen.
        </p>

        <!-- 3-Step Process Cards -->
        <div class="space-y-3 font-mono text-xs">
          <div class="p-3.5 rounded-2xl bg-zinc-950/80 border border-white/10 flex items-center justify-between backdrop-blur-xl hover:border-white/20 transition-colors">
            <div class="flex items-center gap-3">
              <span class="size-6 rounded-lg bg-white/10 flex items-center justify-center font-bold text-white text-[11px]">1</span>
              <span class="text-zinc-300">Open Camera on your smartphone</span>
            </div>
            <span class="text-[#22c55e] font-semibold text-[11px] px-2 py-0.5 rounded bg-[#22c55e]/10 border border-[#22c55e]/20">iOS / Android</span>
          </div>

          <div class="p-3.5 rounded-2xl bg-zinc-950/80 border border-white/10 flex items-center justify-between backdrop-blur-xl hover:border-white/20 transition-colors">
            <div class="flex items-center gap-3">
              <span class="size-6 rounded-lg bg-white/10 flex items-center justify-center font-bold text-white text-[11px]">2</span>
              <span class="text-zinc-300">Tap the browser notification banner</span>
            </div>
            <span class="text-[#22c55e] font-semibold text-[11px] px-2 py-0.5 rounded bg-[#22c55e]/10 border border-[#22c55e]/20">No App Needed</span>
          </div>

          <div class="p-3.5 rounded-2xl bg-zinc-950/80 border border-white/10 flex items-center justify-between backdrop-blur-xl hover:border-white/20 transition-colors">
            <div class="flex items-center gap-3">
              <span class="size-6 rounded-lg bg-white/10 flex items-center justify-center font-bold text-white text-[11px]">3</span>
              <span class="text-zinc-300">Tap emojis to react live on screen</span>
            </div>
            <span class="text-[#22c55e] font-semibold text-[11px] px-2 py-0.5 rounded bg-[#22c55e]/10 border border-[#22c55e]/20">Instant Sync</span>
          </div>
        </div>

        <!-- Live Reaction Emojis Preview Pill -->
        <div class="p-4 rounded-2xl bg-zinc-950/70 border border-[#22c55e]/30 backdrop-blur-xl flex flex-wrap items-center justify-between gap-3 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
          <div class="flex items-center gap-2">
            <span class="size-2 rounded-full bg-[#22c55e] animate-ping" />
            <span class="text-xs font-mono text-zinc-400 uppercase tracking-wider">Tap to React:</span>
          </div>
          <div class="flex items-center gap-2.5">
            <span
              v-for="(emoji, idx) in sampleEmojis"
              :key="idx"
              class="text-xl hover:scale-125 transition-transform duration-200 select-none cursor-default"
            >
              {{ emoji }}
            </span>
          </div>
        </div>
      </div>

      <!-- RIGHT SECTION (5 Cols): Glowing QR Code Card -->
      <div class="lg:col-span-5 flex justify-center">
        <div
          @click.stop
          class="p-6 rounded-[32px] bg-zinc-950/90 border border-[#22c55e]/40 backdrop-blur-2xl shadow-[0_24px_70px_rgba(0,0,0,0.8),0_0_50px_rgba(34,197,94,0.25)] flex flex-col items-center"
        >
          <!-- .OS Green Pill Logo Badge -->
          <div class="size-10 rounded-2xl bg-gradient-to-b from-[#22c55e] to-zinc-900 border border-[#4ade80]/40 flex items-center justify-center font-mono font-black text-xs text-white shadow-lg mb-3">
            .OS
          </div>

          <QRCode
            url="https://slidev-audience-client.pages.dev/"
            title="Audience Portal"
            instruction="Point smartphone camera at screen"
            :size="210"
          />
        </div>
      </div>
    </div>
  </DarkGlassSlide>
</template>
