---
layout: none
transition: fade
talk: ai-bitcoin
index: 6
scene: change
clicks: 4
---

<BaiFrame kicker="Part 1 · How change happens" :index="6">
  <BaiChange :step="$clicks" />
</BaiFrame>

<!--
(~3 minutes)

Here's how one real change landed: Taproot.

January 2018: Greg Maxwell posts the idea to the bitcoin-dev mailing list.
[click] January 2020: BIPs 340, 341 and 342 are published.
[click] October 2020: the code merges into Bitcoin Core, PR 19953.
[click] June 2021: miners signal and it locks in.
[click] November 2021: active at block 709,632. That's 46 months from idea to activation.

Merging code didn't turn the rules on. People had to choose to run it.

Look at the review vocabulary at the bottom. This is the language you'll see on every PR, and it comes up again in the second half.
-->
