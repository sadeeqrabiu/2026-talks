---
layout: none
transition: fade
talk: ai-bitcoin
index: 9
scene: uses
clicks: 2
---

<BaiFrame kicker="Part 2 · Where it helps" :index="9">
  <BaiUses :step="$clicks" />
</BaiFrame>

<!--
(~5 minutes)

Three concrete jobs. Click a tile to jump to any of them.

Tests: AI is good at listing edge cases. These are the CompactSize boundaries, 252 to 253, 65,535 to 65,536.
The bytes on screen come from a real encoder running in this slide. Click a row to see how it breaks down.
AI drafts the cases, but you still decide what's worth asserting.

[click] Navigating Bitcoin Core: a new contributor asks where a transaction gets validated and gets a path to follow.
Click any stop. Notice CheckTransaction is consensus and IsStandardTx is only policy. That difference matters.
And check the map: git grep shows whether each stop is real.

[click] Summarizing BIPs: hover a claim to see which part of the spec it came from.
A summary tells you where to start reading. It doesn't replace reading the spec.
-->
