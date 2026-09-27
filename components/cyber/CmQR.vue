<script setup lang="ts">
import CmFrame from './CmFrame.vue'
import { CM_TOTAL } from './deck'

interface Props {
  index?: number
  total?: number
  url?: string
  qr?: string
}

const props = withDefaults(defineProps<Props>(), {
  index: 1,
  total: CM_TOTAL,
  url: 'https://slidev-audience-client.pages.dev/',
  qr: '/images/audience-qr.svg',
})

const steps = [
  { title: 'Open your camera', body: 'iOS or Android. No app to install.' },
  { title: 'Scan the code', body: 'Tap the link your phone shows you.' },
  { title: 'React live', body: 'Your reactions show up on this screen in real time.' },
]

const host = props.url.replace(/^https?:\/\//, '').replace(/\/$/, '')
</script>

<template>
  <CmFrame section="JOIN" :index="props.index" :total="props.total">
    <div class="grid grid-cols-12 gap-8 h-full">
      <!-- Instructions -->
      <div class="col-span-7 flex flex-col justify-between">
        <div>
          <p class="text-[13px] m-0 mb-5"><span class="cm-dim">$</span> curl {{ host }}</p>
          <h2 class="cm-display text-[48px] m-0">
            <span class="block">Scan.</span>
            <span class="block">React.</span>
            <span class="block"><span class="cm-invert px-2 -mx-2">Live.</span></span>
          </h2>
        </div>

        <ol class="list-none p-0 m-0 border-t border-[var(--cm-fg)]">
          <li
            v-for="(step, i) in steps"
            :key="step.title"
            class="grid grid-cols-[56px_1fr] gap-4 py-2.5 border-b border-[var(--cm-line)] last:border-b-0"
          >
            <span class="text-[13px] cm-dim pt-[3px]">[{{ String(i + 1).padStart(2, '0') }}]</span>
            <div>
              <p class="text-[16px] font-bold m-0 leading-snug">{{ step.title }}</p>
              <p class="text-[12px] cm-dim m-0 mt-0.5">{{ step.body }}</p>
            </div>
          </li>
        </ol>
      </div>

      <!-- QR target -->
      <div class="col-span-5 flex flex-col items-center justify-center">
        <div class="relative p-5 border border-[var(--cm-fg)]" @click.stop>
          <span class="cm-qr-mark -top-[9px] -left-[5px]">+</span>
          <span class="cm-qr-mark -top-[9px] -right-[5px]">+</span>
          <span class="cm-qr-mark -bottom-[9px] -left-[5px]">+</span>
          <span class="cm-qr-mark -bottom-[9px] -right-[5px]">+</span>
          <div class="bg-[#fff] p-3">
            <img :src="props.qr" :alt="`QR code for ${props.url}`" width="220" height="220" class="block">
          </div>
        </div>
        <p class="cm-label mt-5 mb-1">TARGET</p>
        <a
          :href="props.url"
          target="_blank"
          rel="noopener"
          class="text-[13px] !text-[var(--cm-fg)] !no-underline border-b border-[var(--cm-dim)] hover:border-[var(--cm-fg)]"
          @click.stop
        >{{ host }}</a>
      </div>
    </div>
  </CmFrame>
</template>

<style scoped>
.cm-qr-mark {
  position: absolute;
  font-family: var(--cm-mono);
  font-size: 14px;
  line-height: 1;
  color: var(--cm-fg);
}
</style>
