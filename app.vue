<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Quran Online` : 'Quran Online';
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
</template>
<style>
@import '@unocss/reset/tailwind-compat.css';
</style>