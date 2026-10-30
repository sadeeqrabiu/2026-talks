<script setup lang="ts">
/*
  Blocks link one-by-one like commits (each points at its parent's hash),
  then a ring of independent nodes checks the chain: verify, don't trust.
*/
withDefaults(defineProps<{ step?: number }>(), { step: 0 })

const blocks = [
  { h: '#0', sub: 'genesis · 2009', hash: '000…e26f', parent: '0000…0000' },
  { h: '#1', sub: '', hash: '000…6048', parent: '000…e26f' },
  { h: '#2', sub: '', hash: '000…ddbd', parent: '000…6048' },
  { h: '…', sub: '', hash: '', parent: '' },
  { h: 'today', sub: 'still open source', hash: '000…????', parent: '000…' },
]
const nodes = Array.from({ length: 9 }, (_, i) => i)
</script>

<template>
  <div class="flex flex-col items-center gap-10 w-full">
    <div class="flex items-center">
      <template v-for="(b, i) in blocks" :key="b.h">
        <div class="blk os-pop" :class="{ on: step >= 1, gap: b.h === '…', last: i === blocks.length - 1 }" :style="{ transitionDelay: `${i * 0.28}s` }">
          <template v-if="b.h !== '…'">
            <div class="flex justify-between items-baseline">
              <span class="text-[16px] font-800" :class="i === blocks.length - 1 ? 'os-neon' : 'text-white'">{{ b.h }}</span>
              <span class="text-[8px] text-white/40">commit</span>
            </div>
            <div class="text-[9px] text-white/45 mt-2">parent {{ b.parent }}</div>
            <div class="text-[9px] text-[var(--os-green)]">hash&nbsp;&nbsp; {{ b.hash }}</div>
            <div v-if="b.sub" class="text-[9px] text-white/70 mt-1">{{ b.sub }}</div>
          </template>
          <span v-else class="text-[22px] text-white/50">···</span>
        </div>
        <div v-if="i < blocks.length - 1" class="link" :class="{ on: step >= 1 }" :style="{ transitionDelay: `${i * 0.28 + 0.2}s` }" />
      </template>
    </div>

    <!-- verifying nodes -->
    <div class="relative w-[560px] h-[64px]">
      <div
        v-for="n in nodes"
        :key="n"
        class="absolute flex flex-col items-center"
        :style="{ left: `${(n / (nodes.length - 1)) * 100}%`, transform: 'translateX(-50%)' }"
      >
        <div class="beam" :class="{ on: step >= 2 }" :style="{ transitionDelay: `${n * 0.08}s` }" />
        <div class="vn os-pop" :class="{ on: step >= 2 }" :style="{ transitionDelay: `${n * 0.08}s` }">
          <span class="ok" :class="{ on: step >= 2 }" :style="{ transitionDelay: `${0.6 + n * 0.08}s` }">✓</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blk {
  width: 118px;
  height: 104px;
  padding: 10px 12px;
  border: 1.5px solid rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  background: #000;
  display: flex;
  flex-direction: column;
}
.blk.gap {
  width: 56px;
  border-style: dashed;
  border-color: rgba(255, 255, 255, 0.25);
  align-items: center;
  justify-content: center;
}
.blk.last {
  border-color: #00ff00;
  box-shadow: 0 0 18px rgba(0, 255, 0, 0.35);
}
.link {
  width: 26px;
  height: 2px;
  background: #01d758;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s var(--os-ease);
}
.link.on { transform: scaleX(1); }
.beam {
  position: absolute;
  bottom: 30px;
  width: 1px;
  height: 46px;
  background: linear-gradient(to top, #01d758, transparent);
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.6s var(--os-ease);
}
.beam.on { transform: scaleY(1); }
.vn {
  margin-top: 34px;
  width: 22px;
  height: 22px;
  border-radius: 99px;
  border: 2px solid #fff;
  background: #000;
  display: grid;
  place-items: center;
}
.ok {
  font-size: 11px;
  color: #00ff00;
  opacity: 0;
  transition: opacity 0.3s;
}
.ok.on { opacity: 1; }
</style>
