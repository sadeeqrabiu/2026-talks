<script setup lang="ts">
interface Props {
  category?: string
  year?: string
  techDomain?: string
  title?: string
  subtitle?: string
  metric?: string
  metricLabel?: string
  logoText?: string
  speakerAvatar?: string
  speakerName?: string
  speakerRole?: string
  quoteText?: string
}

const props = withDefaults(defineProps<Props>(), {
  category: '',
  year: '',
  techDomain: '',
  title: 'Open Source: Beyond the Code',
  subtitle: '',
  metric: '',
  metricLabel: '',
  logoText: '',
  speakerAvatar: '',
  speakerName: '',
  speakerRole: '',
  quoteText: '',
})
</script>

<template>
  <div
    class="relative flex size-full overflow-hidden bg-black text-white font-sans select-none"
  >
    <!-- Background Ambient Neon Green Glow -->
    <div
      class="absolute top-1/2 right-12 -translate-y-1/2 w-[480px] h-[480px] bg-[#22c55e]/25 blur-[120px] rounded-full pointer-events-none"
    />

    <!-- GRID LAYOUT: LEFT CONTENT (60%) & RIGHT GLASS SLATS (40%) -->
    <div class="relative z-10 flex size-full">
      
      <!-- LEFT SECTION (Main Title, Subtitle, Quote / Speaker Widget, Metrics, Timeline) -->
      <div class="flex w-3/5 flex-col justify-between p-10 lg:p-14">
        
        <!-- Main Title & Subtitle Section -->
        <div class="my-auto py-6 space-y-4">
          <h1 class="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-white">
            {{ props.title }}
          </h1>

          <p v-if="props.subtitle" class="text-lg lg:text-xl font-medium text-zinc-300">
            {{ props.subtitle }}
          </p>

          <!-- Quote Widget Frame (replaces speaker avatar/name when quoteText is passed) -->
          <div
            v-if="props.quoteText"
            class="inline-flex items-center gap-4 mt-6 p-5 rounded-2xl bg-zinc-950/85 border border-[#22c55e]/40 backdrop-blur-2xl shadow-[0_0_35px_rgba(34,197,94,0.15)] max-w-xl"
          >
            <div class="size-8 rounded-xl bg-[#22c55e]/15 border border-[#22c55e]/30 flex items-center justify-center text-[#4ade80] font-mono font-bold text-sm shrink-0">
              ?
            </div>
            <p class="text-sm lg:text-base font-bold text-white leading-relaxed">
              “{{ props.quoteText }}”
            </p>
          </div>

          <!-- Speaker Profile Glass Card (rendered when quoteText is empty) -->
          <div
            v-else-if="props.speakerName"
            class="inline-flex items-center gap-4 mt-6 p-3 pr-6 rounded-2xl bg-zinc-950/80 border border-white/15 backdrop-blur-2xl shadow-xl"
          >
            <img
              v-if="props.speakerAvatar"
              :src="props.speakerAvatar"
              :alt="props.speakerName"
              class="size-12 rounded-xl object-cover border border-white/20 shadow-md"
            />
            <div class="flex flex-col">
              <span class="text-sm font-bold text-white leading-snug">{{ props.speakerName }}</span>
              <span class="text-xs font-mono text-[#4ade80]">{{ props.speakerRole }}</span>
            </div>
          </div>
        </div>

        <!-- Bottom Metric & Progress Timeline -->
        <div class="space-y-4">
          <div v-if="props.metricLabel || props.metric" class="flex items-end justify-between">
            <div>
              <p class="text-xs uppercase tracking-widest text-zinc-400 font-mono">
                {{ props.metricLabel }}
              </p>
            </div>
            <div class="text-3xl lg:text-5xl font-light tracking-tight text-white font-mono">
              {{ props.metric }}
            </div>
          </div>

          <!-- Progress Line with Neon Green Active Bar -->
          <div class="relative w-full h-[2px] bg-zinc-800 rounded-full overflow-hidden">
            <div class="absolute left-0 top-0 h-full w-2/3 bg-[#22c55e] shadow-[0_0_12px_#22c55e]" />
            <div class="absolute left-1/3 top-0 h-full w-[2px] bg-white opacity-60" />
            <div class="absolute left-2/3 top-0 h-full w-[2px] bg-white opacity-60" />
          </div>
        </div>
      </div>

      <!-- RIGHT SECTION: VERTICAL RIBBED GLASS SLATS & NEON GREEN TORUS RING -->
      <div class="relative flex w-2/5 overflow-hidden border-l border-white/10">
        
        <!-- Glowing Neon Green Ring Object -->
        <div
          class="absolute top-1/2 right-12 -translate-y-1/2 w-[340px] h-[340px] rounded-full border-[36px] border-[#4ade80] shadow-[0_0_90px_#22c55e,inset_0_0_60px_#22c55e] pointer-events-none opacity-80"
        />

        <!-- Vertical Frosted Glass Slats (Ribbed Glass Distortion Columns) -->
        <div class="relative z-10 flex size-full">
          <div
            v-for="i in 7"
            :key="i"
            class="flex-1 backdrop-blur-2xl bg-white/[0.02] border-r border-white/10 shadow-inner"
          />
        </div>

        <!-- Top Right Logo -->
        <div v-if="props.logoText" class="absolute top-12 left-8 z-20 font-mono text-xl tracking-[0.4em] font-light text-white uppercase">
          {{ props.logoText }}
        </div>

      </div>

    </div>
  </div>
</template>
