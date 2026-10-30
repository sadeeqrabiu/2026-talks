---
layout: none
talk: open-source-intro
index: 6
clicks: 7
---

<OsFrame kicker="02 · A short git log of history" :index="6">
  <div class="flex flex-col h-full justify-center">
    <h2 class="os-title mb-2">40 years of <em>commits</em></h2>
    <CommitTimeline
      :step="$clicks"
      :items="[
        { year: '1983', label: 'GNU: free software begins' },
        { year: '1991', label: 'Linux: “just a hobby”' },
        { year: '1998', label: '“open source” is coined' },
        { year: '2005', label: 'Linus writes Git' },
        { year: '2008', label: 'GitHub launches' },
        { year: '2009', label: 'Bitcoin genesis block', hot: true },
        { year: '2011', label: 'GitLab launches' },
        { year: '2023+', label: 'open-weight AI models', hot: true },
      ]"
    />
  </div>
</OsFrame>

<!--
1983 — Richard Stallman announces GNU: software users can freely run, study, share.
1991 — a Finnish student posts a kernel "just a hobby, won't be big". That's Linux.
1998 — the term "open source" is coined, a business-friendly name for the idea.
2005 — Linus Torvalds writes Git after losing the tool the kernel used.
2008 — GitHub puts Git on the web and makes it social.
2009 — Satoshi mines Bitcoin's genesis block and publishes the code.
2011 — GitLab arrives, open source itself, and self-hostable.
2023+ — open-weight AI models: the same idea, applied to intelligence.
-->
