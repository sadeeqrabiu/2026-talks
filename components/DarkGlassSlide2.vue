<script setup lang="ts">
import DarkGlassSplitSlide from './DarkGlassSplitSlide.vue'

const points = [
  {
    num: '01',
    title: 'Developers Contributing Code',
    desc: 'Viewing open source strictly as PRs, commits, and bug fixes.',
  },
  {
    num: '02',
    title: 'Learning From Developers',
    desc: 'Reading production codebases to improve syntax and skills.',
  },
  {
    num: '03',
    title: 'Building Your Portfolio',
    desc: 'Accumulating green contribution squares on GitHub.',
  },
  {
    num: '04',
    title: 'Getting Better at Programming',
    desc: 'A career advancement tool to level up & get hired.',
  },
]
</script>

<template>
  <DarkGlassSplitSlide
    slideNum="02"
    title="My Old Definition of Open Source"
    subtitle="What I originally believed open source was all about:"
  >
    <!-- 4 Glass Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
      <div
        v-for="point in points"
        :key="point.num"
        class="p-5 rounded-2xl bg-zinc-950/80 border border-white/15 backdrop-blur-2xl shadow-xl flex items-start gap-4.5 hover:border-white/30 transition-all"
      >
        <div class="size-9 rounded-xl bg-[#22c55e]/15 border border-[#22c55e]/30 flex items-center justify-center text-[#4ade80] font-mono font-bold text-xs shrink-0">
          {{ point.num }}
        </div>
        <div>
          <h3 class="text-base font-bold text-white mb-1 leading-snug">
            {{ point.title }}
          </h3>
          <p class="text-xs text-zinc-400 leading-normal">
            {{ point.desc }}
          </p>
        </div>
      </div>
    </div>
  </DarkGlassSplitSlide>
</template>
