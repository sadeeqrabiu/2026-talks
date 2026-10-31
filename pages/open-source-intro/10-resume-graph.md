---
layout: none
transition: fade
talk: open-source-intro
index: 10
clicks: 3
---

<OsFrame kicker="06 · Your graph is your résumé" :index="10">
  <div class="flex flex-col h-full justify-center items-start gap-8">
    <h2 class="os-title">Show up. <em>Every week.</em></h2>
    <ContribGraph :step="$clicks" word="HIRE ME" labels :cell="12" :gap="3" />
  </div>
</OsFrame>

<!--
[empty] A blank year. Everyone starts here.

[click] Consistency compounds. Small contributions, week after week.

[click] Recruiters and maintainers read this graph. Public work is a résumé
nobody can fake.

[click] …and some days are spookier than others. Happy Halloween.
-->
