---
layout: none
transition: fade
talk: open-source-intro
index: 17
clicks: 5
---

<OsFrame kicker="12 · Btrust" :index="17">
  <div class="flex flex-col h-full justify-center gap-12">
    <div class="flex items-center justify-between gap-8">
      <div>
        <h2 class="os-title">Find. Train. <em>Fund.</em></h2>
        <p class="os-sub mt-3">500 BTC trust · 2021 · developers across Africa & the Global South</p>
      </div>
      <img src="/logos/btrust-logo.png" alt="Btrust" class="btrust-logo h-[84px] w-auto shrink-0 mr-4" />
    </div>
    <FlowPipe
      :step="Math.min($clicks, 3)"
      :stages="[
        { label: 'locate', sub: 'find developers', icon: '⌕' },
        { label: 'educate', sub: 'Btrust Builders', icon: '{ }' },
        { label: 'fund', sub: 'grants in BTC', icon: '₿' },
        { label: 'contribute', sub: 'Bitcoin FOSS', icon: '⑂' },
      ]"
      :verbs="['BitDevs', 'cohorts', 'ship']"
    />
    <div class="flex gap-12 os-rise" :class="{ on: $clicks >= 4 }">
      <div v-for="s in [{ n: 431, l: 'commits' }, { n: 222, l: 'merged PRs' }, { n: 475, l: 'code reviews' }]" :key="s.l">
        <div class="text-[34px] font-800 os-neon leading-none"><CountUp :to="s.n" :on="$clicks >= 4" /></div>
        <div class="os-label mt-2">{{ s.l }}</div>
      </div>
      <div class="os-rise self-end text-[12px] text-white/50" :class="{ on: $clicks >= 5 }">— by 18 Btrust grantees, in 2025</div>
    </div>
  </div>
</OsFrame>

<!--
Btrust: a blind, irrevocable trust funded in 2021 with 500 BTC from Jack Dorsey and Jay-Z.

[click] Locate — find developers, supported by BitDevs meetups (13 locations, 9 countries in Africa).
[click] Educate — Btrust Builders trains experienced devs for Bitcoin & Lightning (1,800+ applications in 2025).
[click] Fund — developer, education and event grants, paid in BTC.
[click] Contribute — and it works:
[click] 18 grantees, 15 projects, 431 commits, 222 merged PRs, 475 reviews — in one year.

Source: https://blog.btrust.tech/btrust-2025-year-in-review/ · https://www.btrust.tech
-->
