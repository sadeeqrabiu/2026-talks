---
layout: none
talk: first-commit
---

<CmPipeline
  section="ECONOMY"
  :index="8"
  title="AI moved the bottleneck"
  :rows="[
    { label: 'BEFORE', stages: ['Understand', 'Design', 'Code', 'Test'], markAt: 2, markLabel: 'bottleneck' },
    { label: 'NOW', stages: ['Understand', 'Design', 'Generate', 'Test', 'Review', 'Explain'], markAt: 0, markLabel: 'judgment' },
  ]"
  conclusion="When everyone can generate, judgment is the scarce part."
  note="More generated code also means more noise. Nobody wants AI slop in their codebase, least of all the person who has to maintain it."
/>

<!--
Writing the code used to be the expensive step. That's where the hours went.

Now the pipeline is longer, not shorter — generate, test, review, explain — and the
expensive step moved to the front.

The advantage is no longer who produces the most code. It's who can use the tools to
understand larger systems, iterate faster, test more, and still keep quality up.
-->
