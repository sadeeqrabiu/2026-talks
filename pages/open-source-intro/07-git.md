---
layout: none
transition: fade
talk: open-source-intro
index: 7
clicks: 4
---

<OsFrame kicker="03 · Git" :index="7">
  <div class="flex flex-col h-full justify-center gap-2">
    <h2 class="os-title">Git is a <em>time machine</em><br>with parallel universes.</h2>
    <GitGraph :step="$clicks" class="mt-2" />
  </div>
</OsFrame>

<!--
[init] git init — the folder now remembers everything.
[click] Every commit is a snapshot you can return to, forever.
[click] A branch is a safe parallel universe. Break things there, not on main.
[click] Meanwhile other people keep working on main. Nobody waits for anyone.
[click] Merge brings your universe home. (And yes, the merge wears a hat tonight.)

This is why thousands of strangers can work on one codebase.
-->
