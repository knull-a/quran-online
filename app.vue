<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useThemeStore } from '@/store/useThemeStore';
const { theme } = storeToRefs(useThemeStore())

// const storageTheme = ref(localStorage.getItem('theme'))
console.log(process.client ? localStorage.getItem('theme') : '')

const storageItem = computed(() => process.client ? localStorage.getItem('theme') : '')

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Nuxt Test` : 'Nuxt Test';
  },
  bodyAttrs: {
    class: theme
  }
})

</script>
<template>
  <NuxtLayout class="dark">
    <NuxtPage class="font-sansSerif" />
  </NuxtLayout>
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