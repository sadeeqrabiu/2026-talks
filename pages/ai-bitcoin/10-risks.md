---
layout: none
transition: fade
talk: ai-bitcoin
index: 10
scene: risks
clicks: 2
---

<BaiFrame kicker="Part 2 · Where it hurts" :index="10">
  <BaiRisks :step="$clicks" />
</BaiFrame>

<!--
(~5 minutes)

Now the risk side.

Hallucinations: this answer reads perfectly, and the function doesn't exist. Press "git grep it" and watch the name fall apart.

[click] False confidence: ask the room which statement is wrong, then click one. Both flip.
The dust limit is relay policy, so a block with dust outputs is still valid.
Both answers sounded equally sure, and that's the problem.

[click] Autopilot on consensus: this is the real sigop check from ConnectBlock, with > changed to >=.
Press merge. A block with exactly 80,000 sigop cost is now valid for old nodes and rejected by patched ones, so the chain splits.
This has happened without AI too. BIP 50 is the post-mortem of the unplanned fork in March 2013.
So every line of a consensus change needs a person who can explain it.
-->
