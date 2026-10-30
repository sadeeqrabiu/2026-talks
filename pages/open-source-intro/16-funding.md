---
layout: none
talk: open-source-intro
index: 16
clicks: 3
---

<OsFrame kicker="11 · Who funds Bitcoin open source?" :index="16">
  <div class="flex flex-col h-full justify-center gap-10">
    <h2 class="os-title">Writing open source<br>can be a <em>paid job.</em></h2>
    <div class="flex gap-10">
      <FundStack :on="$clicks >= 1" :to="1" :decimals="1" prefix="~$" suffix="M/mo" who="OpenSats" what="to devs in 40+ countries (last 18 months)" hot />
      <FundStack :on="$clicks >= 2" :to="21.6" :decimals="1" prefix="$" suffix="M+" who="OpenSats, since 2023" what="252 grantees · 40 countries" :cells="18" />
      <FundStack :on="$clicks >= 3" :to="2" :decimals="1" prefix="$" suffix="M+" who="Btrust, in 2025" what="grants — 39.7% straight to developers" :cells="8" />
    </div>
    <div class="os-rise flex items-center gap-3 os-label" :class="{ on: $clicks >= 3 }" style="transition-delay: .8s">
      <span class="!text-white/40">also:</span>
      <span v-for="f in ['HRF Bitcoin Dev Fund', 'Brink', 'Spiral', 'Vinteum', 'Bitshala']" :key="f" class="px-2 py-1 border border-solid border-white/15 rounded text-white/70">{{ f }}</span>
    </div>
  </div>
</OsFrame>

<!--
Bitcoin open source has a real funding ecosystem — people are paid to contribute.

[click] OpenSats: roughly $1M worth of sats every month to grantees, over the last 18 months.
[click] In total $21.6M+ to 252 grantees in 40 countries (OpenSats General Fund, since 2023).
[click] Btrust: over $2M in grants in 2025, 39.7% directly to developers.

Plus HRF's Bitcoin Development Fund, Brink (Bitcoin Core fellowships), Spiral,
Vinteum in Brazil, Bitshala in India.

Sources:
- https://opensats.org/blog/2025-year-in-review
- https://blog.btrust.tech/btrust-2025-year-in-review/
-->
