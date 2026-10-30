---
layout: none
talk: open-source-intro
index: 12
clicks: 2
---

<OsFrame kicker="07 · Linux" :index="12">
  <div class="flex h-full items-center justify-between">
    <div class="w-[540px]">
      <Bloom
        center="linux"
        center-img="/logos/linux.webp"
        :step="$clicks"
        :sats="['servers', 'android', 'cloud', 'cars', 'TVs', 'supercomputers']"
        :rx="210"
        :ry="120"
      />
    </div>
    <div class="flex flex-col gap-5 w-[240px]">
      <div class="os-rise" :class="{ on: $clicks >= 2 }">
        <div class="text-[52px] font-800 os-neon leading-none">
          <CountUp :to="500" :on="$clicks >= 2" />/500
        </div>
        <div class="text-[12px] text-white/55 mt-2">of the world's top supercomputers run Linux</div>
      </div>
      <div class="os-rise text-[20px] font-700" :class="{ on: $clicks >= 2 }" style="transition-delay: .6s">
        Rivals build it <em class="not-italic os-green">together.</em>
      </div>
    </div>
  </div>
</OsFrame>

<!--
[centre] One kernel, started by a student in 1991.

[click] It now runs most servers, every Android phone, the cloud, cars, TVs.

[click] Every one of the TOP500 supercomputers has run Linux since November 2017
(TOP500 statistics, via en.wikipedia.org/wiki/TOP500).

The twist: competitors — Intel, AMD, Google, Microsoft, Red Hat — all contribute
to the same kernel. Sharing the foundation is cheaper than everyone building their own.
-->
