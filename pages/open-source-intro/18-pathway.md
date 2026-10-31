---
layout: none
transition: fade
talk: open-source-intro
index: 18
clicks: 3
---

<OsFrame kicker="13 · Your pathway" :index="18">
  <div class="flex h-full items-center justify-between gap-8">
    <div class="flex flex-col gap-8">
      <div>
        <h2 class="os-title !text-[40px]">6 weeks to your<br><em>first Bitcoin commit.</em></h2>
      </div>
      <WeekTrack :step="$clicks" />
      <div class="flex gap-6">
        <span v-for="(p, i) in ['Claude subscription', 'mentors', 'real OSS projects']" :key="p" class="os-pop flex items-center gap-2 text-[14px]" :class="{ on: $clicks >= 2 }" :style="{ transitionDelay: `${i * 0.15}s` }">
          <i class="size-2.5 rounded-full bg-[var(--os-neon)] shadow-[0_0_8px_#00FF00]" />{{ p }}
        </span>
      </div>
    </div>
    <div class="relative shrink-0 w-[270px] pb-[110px]">
      <img src="/logos/osguild.webp" alt="OSGuild" class="osguild-logo block w-full" />
      <div class="stamp !right-[50px] !bottom-[10px]" :class="{ on: $clicks >= 3 }">FREE</div>
    </div>
  </div>
</OsFrame>

<!--
This is where OSGuild — Open Source Guild — comes in.

[click] Six weeks. Free. From "never contributed" to a real contribution.

[click] You get a Claude subscription for the programme, mentors who've done it,
and actual open-source Bitcoin projects to contribute to — not toy exercises.

[click] And it costs you nothing but the time and the curiosity.
-->
