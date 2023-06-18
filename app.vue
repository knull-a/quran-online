<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Nuxt Test` : 'Nuxt Test';
  },
  bodyAttrs: {
    class: useColorMode().preference,
  }
})
</script>
<template>
  <NuxtLayout>
    <NuxtPage class="font-sansSerif" />
  </NuxtLayout>
  <div id="modal-container" />
</template>
<style>
@import '@unocss/reset/tailwind.css';

.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>