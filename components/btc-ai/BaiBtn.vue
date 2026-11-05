<template>
  <!-- mousedown.prevent keeps focus off the button, so Space still advances the deck -->
  <button class="bai-btn" @mousedown.prevent>
    <slot />
  </button>
</template>
