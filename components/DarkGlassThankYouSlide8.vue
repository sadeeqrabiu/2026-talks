<script setup lang="ts">
</script>

<template>
  <div
    class="relative flex size-full overflow-hidden bg-black text-white font-sans select-none"
  >
    <!-- Background Ambient Neon Green Glow -->
    <div
      class="absolute top-1/2 left-1/4 -translate-y-1/2 w-[520px] h-[520px] bg-[#22c55e]/20 blur-[150px] pointer-events-none rounded-full"
    />

    <!-- GRID LAYOUT: LEFT CONTENT (55%) & RIGHT WHATSAPP QR CARD (45%) -->
    <div class="relative z-10 flex size-full">
      
      <!-- LEFT SECTION (55% Width): Thank You Headline, Speaker Info & Call to Action -->
      <div class="flex w-[55%] flex-col justify-between p-10 lg:p-14">
        
        <!-- Main Content Area -->
        <div class="my-auto py-4 space-y-6 max-w-xl">
      

          <!-- Slide Title -->
          <h1 class="text-5xl lg:text-7xl font-black tracking-tight leading-[1.05] text-white">
            Thank You!
          </h1>

          <!-- Subtitle / Call to Action -->
          <p class="text-lg lg:text-xl font-medium text-zinc-300 leading-relaxed">
            Join the <span class="text-white font-bold underline decoration-[#4ade80]">Open Source Guild</span> WhatsApp community to collaborate, build, and shape the future of open technology.
          </p>


        </div>

      </div>

      <!-- RIGHT SECTION (45% Width): WHATSAPP QR CODE CARD -->
      <div class="relative flex w-[45%] items-center justify-center p-8 border-l border-white/10">
        
        <!-- Glowing Ambient Behind Card -->
        <div class="absolute inset-0 bg-gradient-to-br from-[#22c55e]/10 to-transparent pointer-events-none" />

        <!-- Open Source Guild WhatsApp QR Card Container (Matches reference image style) -->
        <div class="relative z-10 w-full max-w-sm rounded-[32px] bg-zinc-950/90 border border-white/20 backdrop-blur-3xl p-6 flex flex-col items-center text-center shadow-[0_24px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(34,197,94,0.2)]">
          
          <!-- .OS Green Pill Logo Badge (Top of card) -->
          <div class="size-11 rounded-2xl bg-gradient-to-b from-[#22c55e] to-zinc-900 border border-[#4ade80]/40 flex items-center justify-center font-mono font-black text-sm text-white shadow-lg mb-3">
            .OS
          </div>

          <!-- Card Header Title & Subtitle -->
          <h3 class="text-lg font-bold text-white tracking-tight">
            Open source Guild
          </h3>
          <p class="text-xs font-mono text-zinc-400 mb-4">
            WhatsApp community
          </p>

          <!-- QR Code Image Container -->
          <div class="w-full rounded-2xl overflow-hidden bg-white p-2 shadow-2xl">
            <img
              src="/images/osguild-qr.png"
              alt="Open Source Guild WhatsApp Community QR Code"
              class="w-full h-auto object-contain rounded-xl"
            />
          </div>

          <!-- Scan Prompt -->
          <div class="mt-4 inline-flex items-center gap-2 text-xs font-mono text-[#4ade80] font-semibold">
            <span class="size-1.5 rounded-full bg-[#4ade80]" />
            <span>Scan to join the community</span>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>
