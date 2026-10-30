---
layout: none
talk: open-source-intro
index: 9
clicks: 4
---

<OsFrame kicker="05 · Git best practices" :index="9">
  <div class="flex h-full items-center justify-between gap-8">
    <div class="w-[470px]">
      <CommitTerminal :step="$clicks" />
    </div>
    <MemeSlot src="/memes/02.jpg" label="meme #2" class="w-[336px] h-[252px] shrink-0" />
  </div>
</OsFrame>

<!--
"fix stuff" — every repo has one. Six months later, nobody knows what it fixed.

[click] Say what changed and where. Reviewers and future-you will thank you.
[click] Small commits — one idea each. Easy to review, easy to revert.
[click] One branch per change. Never work straight on main.
[click] Your PR description explains WHY. The code already shows what.
-->
