<script setup lang="ts">
/*
  Stages in a row joined by pipes. On each click the next pipe fills and a
  commit-packet travels along it, lighting the stage it lands on.
*/
const props = withDefaults(
  defineProps<{ stages: { label: string; sub?: string; icon?: string }[]; step?: number; verbs?: string[] }>(),
  { step: 0, verbs: () => [] },
)
</script>

<template>
  <div class="flex items-center w-full">
    <template v-for="(s, i) in stages" :key="s.label">
      <div class="stage" :class="{ on: step >= i, now: step === i }">
        <div class="ring">
          <span class="text-[22px]">{{ s.icon }}</span>
        </div>
        <div class="mt-3 text-[14px] font-700 text-white text-center whitespace-nowrap">{{ s.label }}</div>
        <div v-if="s.sub" class="text-[10px] text-white/45 text-center mt-1 whitespace-nowrap">{{ s.sub }}</div>
      </div>
      <div v-if="i < stages.length - 1" class="pipe" :class="{ on: step > i }">
        <div class="pipe-fill" />
        <div v-if="step > i" :key="`p${i}-${step > i}`" class="packet" />
        <div class="verb" :class="{ on: step > i }">{{ props.verbs[i] }}</div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 110px;
  flex-shrink: 0;
  opacity: 0.28;
  transition: opacity 0.5s var(--os-ease) 0.55s;
}
.stage.on { opacity: 1; }
.ring {
  width: 64px;
  height: 64px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  border: 1.5px solid rgba(255, 255, 255, 0.35);
  background: #000;
  transition: border-color 0.4s 0.55s, box-shadow 0.4s 0.55s, transform 0.6s var(--os-spring) 0.55s;
}
.stage.on .ring { border-color: #01d758; }
.stage.now .ring {
  border-color: #00ff00;
  box-shadow: 0 0 0 4px rgba(0, 255, 0, 0.12), 0 0 22px rgba(0, 255, 0, 0.45);
  transform: scale(1.08);
}
.pipe {
  position: relative;
  flex: 1;
  height: 2px;
  margin-top: -40px;
  background: rgba(255, 255, 255, 0.12);
}
.pipe-fill {
  position: absolute;
  inset: 0;
  background: #01d758;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.6s var(--os-ease);
}
.pipe.on .pipe-fill { transform: scaleX(1); }
.packet {
  position: absolute;
  top: -5px;
  left: 0;
  width: 12px;
  height: 12px;
  border-radius: 3px;
  background: #00ff00;
  box-shadow: 0 0 12px #00ff00;
  animation: travel 0.6s var(--os-ease) forwards;
}
@keyframes travel {
  0% { left: 0; opacity: 1; }
  85% { opacity: 1; }
  100% { left: calc(100% - 12px); opacity: 0; }
}
.verb {
  position: absolute;
  left: 50%;
  top: 10px;
  transform: translateX(-50%);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #01d758;
  opacity: 0;
  transition: opacity 0.4s 0.3s;
  white-space: nowrap;
}
.verb.on { opacity: 1; }
</style>
