<script setup lang="ts">
import BaiCat from './BaiCat.vue'
import BaiPixel from './BaiPixel.vue'

/* Same intro as Talk 03: each role lands as a commit, one per click. */
const props = withDefaults(defineProps<{ step?: number, github?: string }>(), { step: 0, github: 'Sadeeqrabiu' })

const ROLES = [
  { title: 'Bitcoin open source contributor', hash: 'b1tc01n', icon: 'btc' },
  { title: 'Founder · OSGuild', hash: '05gu1ld', icon: 'person' },
  { title: 'Founder · BitDevs Mauritius', hash: 'b17d3v5', icon: 'chat' },
]
</script>

<template>
  <div class="absolute inset-0">
    <div class="avatar">
      <img :src="`https://github.com/${props.github}.png`" alt="Sadiq Rabiu" class="size-full rounded-full object-cover">
    </div>
    <a
      :href="`https://github.com/${props.github}`"
      target="_blank"
      rel="noopener"
      class="handle"
      @click.stop
    >github.com/{{ props.github }}</a>

    <h2 class="name">Sadiq Rabiu</h2>

    <div class="card bai-paper">
      <BaiCat :x="30 + Math.min(step, 3) * 150" />
      <div class="spine" />
      <div class="spine fill" :style="{ transform: `scaleY(${Math.min(step, 3) / 3})` }" />
      <div
        v-for="(r, i) in ROLES"
        :key="r.hash"
        class="role bai-rise"
        :class="{ on: step > i }"
      >
        <span class="tile"><BaiPixel :name="r.icon" :px="2" /></span>
        <span>
          <span class="block text-[19px] font-800 leading-tight tracking-tight">{{ r.title }}</span>
          <span class="block text-[10.5px] font-600 mt-1 text-[var(--bai-mute)]">commit {{ r.hash }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.avatar {
  position: absolute;
  left: 44px;
  top: 112px;
  width: 232px;
  height: 232px;
  padding: 7px;
  border-radius: 50%;
  background: var(--bai-white);
  box-shadow: 0 18px 50px rgba(120, 35, 0, 0.28);
}
.handle {
  position: absolute;
  left: 44px;
  top: 362px;
  width: 232px;
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  color: var(--bai-white) !important;
  text-decoration: none !important;
}
.name,
.slidev-layout .name {
  position: absolute;
  left: 320px;
  top: 82px;
  margin: 0;
  font-size: 58px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.05em;
  color: var(--bai-white);
}
.card {
  position: absolute;
  left: 320px;
  right: 40px;
  top: 178px;
  height: 256px;
  padding: 14px 20px 14px 52px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.spine {
  position: absolute;
  left: 28px;
  top: 30px;
  bottom: 30px;
  width: 2px;
  background: var(--bai-rule);
}
.spine.fill {
  background: var(--bai-orange);
  transform-origin: top;
  transition: transform 0.6s var(--bai-ease);
}
.role {
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
}
.tile {
  flex: none;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 6px;
  background: var(--bai-orange);
  color: var(--bai-white);
}
</style>
