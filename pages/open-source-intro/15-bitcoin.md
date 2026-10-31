---
layout: none
transition: fade
talk: open-source-intro
index: 15
clicks: 2
---

<OsFrame kicker="10 · Bitcoin is open source" :index="15">
  <Web class="absolute -right-10 -top-16" :size="140" />
  <div class="flex flex-col h-full justify-center gap-8">
    <h2 class="os-title">Money that's a <em>git log.</em></h2>
    <BlockChain :step="$clicks" />
    <div class="os-rise self-center text-[20px] font-700" :class="{ on: $clicks >= 2 }" style="transition-delay: .9s">
      verify, <span class="os-neon">don't trust.</span>
    </div>
  </div>
</OsFrame>

<!--
Bitcoin is an open-source project first: github.com/bitcoin/bitcoin.

[click] Each block points at its parent's hash — exactly like a commit.
Genesis, block 1, block 2… all the way to today. Change history and every hash breaks.

[click] And anyone can run a node that checks every rule themselves. No company
to trust — just open code that thousands of people verify.

So who pays the people who write that code?
-->
