<script setup lang="ts">
const points = [
  { num: '01', title: 'Developers contributing code', desc: 'Viewing open source strictly as PRs, commits, and bug fixes.' },
  { num: '02', title: 'Learning from other developers', desc: 'Reading production codebases to improve syntax and skills.' },
  { num: '03', title: 'Building your portfolio', desc: 'Accumulating green contribution squares on GitHub.' },
  { num: '04', title: 'Getting better at programming', desc: 'A career advancement tool to level up & get hired.' },
]
</script>

<template>
  <div class="absolute inset-0 size-full flex flex-col justify-between bg-black text-white font-sans select-none p-10 lg:p-14 overflow-hidden">
    
    <!-- REFINED COMPACT HEADLINE -->
    <div class="relative z-10 max-w-2xl pt-2">
      <p class="text-base lg:text-lg font-medium text-zinc-300 leading-snug">
        What I originally believed open source was all about:
      </p>
    </div>

    <!-- MAIN CONTENT GRID: 4 GLASS POINT CARDS (LEFT 6 COLS) & IMAGE (RIGHT 6 COLS) -->
    <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto items-center">
      
      <!-- LEFT COLUMN (6 COLS): 4 GLASS POINT CARDS -->
      <div class="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          v-for="point in points"
          :key="point.num"
          class="p-5 rounded-2xl bg-zinc-950/80 border border-white/12 backdrop-blur-2xl shadow-xl flex items-start gap-4 hover:border-[#4ade80]/40 transition-all group"
        >
          <div class="size-9 rounded-xl bg-[#22c55e]/15 border border-[#22c55e]/30 flex items-center justify-center text-[#4ade80] font-mono font-bold text-xs shrink-0 group-hover:scale-105 transition-transform">
            {{ point.num }}
          </div>
          <div>
            <h3 class="text-xs lg:text-sm font-bold text-white mb-0.5 leading-snug">
              {{ point.title }}
            </h3>
            <p class="text-[11px] text-zinc-400 leading-tight">
              {{ point.desc }}
            </p>
          </div>
        </div>
      </div>

      <!-- RIGHT COLUMN (6 COLS): UNCROPPED FULL IMAGE -->
      <div class="lg:col-span-6 relative flex justify-center items-center">
        <img
          src="/images/open-source.jpg"
          alt="Open Source Concept"
          class="max-w-md lg:max-w-lg max-h-64 lg:max-h-72 w-auto h-auto object-contain rounded-2xl shadow-2xl border border-white/10"
        />
      </div>

    </div>

    <!-- MINIMALIST NEON GREEN PROGRESS LINE -->
    <div class="relative z-10 space-y-2 pt-2">
      <div class="flex items-center justify-between text-[11px] font-mono text-zinc-500">
        <span>PERSPECTIVE PIVOT</span>
      </div>

      <div class="relative w-full h-[2px] bg-zinc-900 rounded-full overflow-hidden">
        <div class="h-full w-[11.7%] bg-[#4ade80] shadow-[0_0_12px_#22c55e]" />
      </div>
    </div>

  </div>
</template>
