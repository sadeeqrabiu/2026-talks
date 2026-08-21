<script setup lang="ts">
const steps = [
  { num: '01', title: 'Finds a problem', desc: 'Discovering bugs or missing features in real production systems.' },
  { num: '02', title: 'Reports & logs issue', desc: 'Documenting steps to reproduce and system behavior.' },
  { num: '03', title: 'Investigates root cause', desc: 'Tracing stack traces and debugging underlying code paths.' },
  { num: '04', title: 'Proposes solution', desc: 'Designing architectural fixes and opening pull requests.' },
  { num: '05', title: 'Peer reviews code', desc: 'Engaging in technical dialogue and code review feedback.' },
  { num: '06', title: 'Tests edge cases', desc: 'Writing regression tests and validating edge scenarios.' },
  { num: '07', title: 'Writes documentation', desc: 'Updating API references, guides, and changelogs.' },
  { num: '08', title: 'Maintains codebase', desc: 'Triaging issues, managing releases, and updating dependencies.' },
  { num: '09', title: 'Mentors contributors', desc: 'Guiding new developers and fostering open collaboration.' },
]
</script>

<template>
  <div class="absolute inset-0 size-full flex flex-col justify-between bg-black text-white font-sans p-8 lg:p-14 overflow-y-auto select-none">
    
    <!-- Ambient Green Glow -->
    <div
      class="absolute top-1/2 right-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-[#22c55e]/15 blur-[160px] pointer-events-none rounded-full"
    />

    <!-- TOP HEADER -->
    <div class="relative z-10 space-y-1 pt-2">
      <h1 class="text-3xl lg:text-5xl font-black tracking-tight text-white leading-tight">
        The Code Is Only the Beginning
      </h1>
      <p class="text-sm lg:text-base text-zinc-400 font-medium">
        Look at how much actually happens around an open-source project:
      </p>
    </div>

    <!-- 9 GLASS CARDS GRID (3 Columns x 3 Rows) -->
    <div class="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-3.5 my-auto py-4">
      <div
        v-for="step in steps"
        :key="step.num"
        class="p-4 rounded-2xl bg-zinc-950/80 border border-white/12 backdrop-blur-2xl shadow-xl flex items-start gap-3.5 hover:border-[#4ade80]/40 transition-all group"
      >
        <div class="size-8 rounded-xl bg-[#22c55e]/15 border border-[#22c55e]/30 flex items-center justify-center text-[#4ade80] font-mono font-bold text-xs shrink-0 group-hover:scale-105 transition-transform">
          {{ step.num }}
        </div>
        <div>
          <h3 class="text-sm font-bold text-white mb-0.5 leading-snug">
            {{ step.title }}
          </h3>
          <p class="text-[11px] text-zinc-400 leading-tight">
            {{ step.desc }}
          </p>
        </div>
      </div>
    </div>

    <!-- BOTTOM TAKEAWAY BANNER & PROGRESS LINE -->
    <div class="relative z-10 space-y-3 pt-2">
      <div class="p-3.5 rounded-2xl bg-zinc-950/90 border border-[#22c55e]/30 backdrop-blur-xl text-center shadow-[0_0_24px_rgba(34,197,94,0.12)]">
        <p class="text-xs lg:text-sm font-semibold text-white">
          Open source is an entire ecosystem of <span class="text-[#4ade80]">collaboration, engineering rigor, and human relationships</span>.
        </p>
      </div>

      <div class="flex items-center justify-between text-[11px] font-mono text-zinc-500">
        <span>PROJECT LIFECYCLE</span>
        <span class="text-white font-bold tracking-widest">Open Source Guild</span>
      </div>

      <div class="relative w-full h-[2px] bg-zinc-900 rounded-full overflow-hidden">
        <div class="h-full w-[29.4%] bg-[#4ade80] shadow-[0_0_12px_#22c55e]" />
      </div>
    </div>

  </div>
</template>
