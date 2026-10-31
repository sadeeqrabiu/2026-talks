---
layout: none
transition: fade
talk: open-source-intro
index: 5
clicks: 2
---

<OsFrame kicker="01 · What is open source?" :index="5">
  <div class="flex h-full items-center justify-between gap-6">
    <div class="flex flex-col gap-6">
      <h2 class="os-title">Code you can<br><em>open.</em></h2>
      <OpenBox :step="$clicks" />
    </div>
    <MemeSlot src="/memes/01.jpg" label="meme #1" class="w-[352px] h-[264px] shrink-0" />
  </div>
</OsFrame>

<!--
[closed] Most software is a sealed box. You can use it — you can't look inside.

[click] Open source removes the lock. The source code is published.

[click] And the licence gives everyone four freedoms: to USE it for anything,
STUDY how it works, CHANGE it, and SHARE it — including your changes.

That's the whole definition. Everything else is consequence.
-->
