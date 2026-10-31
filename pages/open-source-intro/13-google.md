---
layout: none
transition: fade
talk: open-source-intro
index: 13
clicks: 3
---

<OsFrame kicker="08 · Google" :index="13">
  <div class="flex h-full items-center justify-between">
    <div class="w-[540px]">
      <Bloom
        center="google"
        center-img="/logos/google.webp"
        center-fit="slice"
        :center-zoom="124"
        :step="$clicks"
        :sats="['Android', 'Chromium', 'Kubernetes', 'Go']"
        :bloom="9"
        :rx="190"
        :ry="110"
      />
    </div>
    <div class="w-[240px] flex flex-col gap-3">
      <div class="os-rise text-[26px] font-800 leading-tight" :class="{ on: $clicks >= 3 }">Open the platform.</div>
      <div class="os-rise text-[26px] font-800 leading-tight os-neon" :class="{ on: $clicks >= 3 }" style="transition-delay: .4s">Own the ecosystem.</div>
    </div>
  </div>
</OsFrame>

<!--
[click] Google open-sourced Android, Chromium, Kubernetes, the Go language.

[click] And the world built on top: phone makers, browser vendors (Edge, Brave,
Opera are Chromium), every cloud runs Kubernetes, thousands of contributors.

[click] Give away the platform, and the ecosystem — talent, tools, standards —
grows around you. Strategy, not charity.
-->
