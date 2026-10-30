---
layout: none
talk: open-source-intro
index: 8
clicks: 4
---

<OsFrame kicker="04 · GitHub & GitLab" :index="8">
  <div class="flex flex-col h-full justify-center gap-14">
    <h2 class="os-title">Where code <em>meets people.</em></h2>
    <FlowPipe
      :step="$clicks"
      :stages="[
        { label: 'your laptop', sub: 'local repo', icon: '⌂' },
        { label: 'GitHub / GitLab', sub: 'remote', icon: '☁' },
        { label: 'your fork', sub: 'your copy', icon: '⑂' },
        { label: 'pull request', sub: 'propose', icon: '⇄' },
        { label: 'main', sub: 'merged', icon: '✓' },
      ]"
      :verbs="['push', 'fork', 'open PR', 'review + merge']"
    />
  </div>
</OsFrame>

<!--
Git lives on your machine. GitHub and GitLab put it online — and add the social layer.

[click] push — your commits go up to the remote.
[click] fork — anyone can copy any public project.
[click] pull request — "here's a change, would you like it?"
[click] review + merge — a maintainer reads it, asks questions, accepts it.

GitHub is the biggest; GitLab is open-core and you can self-host it. Same Git underneath.
-->
