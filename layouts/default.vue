<script setup lang="ts">
const { locale, locales } = useI18n()
const themeOptions = ref(['light', 'dark', 'system'])
const localeOptions = ref(['en', 'ru'])

</script>
<template>
  <div class="bg-white text-dark dark:text-white dark:bg-dark flex flex-col justify-between h-screen">
    <header class="px-10 py-3 text-xl flex items-center justify-between">
      <h1 class="font-bold">Quran Online</h1>
      <div class="flex gap-2">
        <div class="i-mdi-account" />
        <div class="i-mdi-web" />
        <div class="i-mdi-cog" />
        <div class="i-mdi-magnify" />
      </div>
    </header>
    <div class=" flex-1">
      <slot />
    </div>
    <footer class="flex items-center justify-between py-12 wrapper">
      <div class="font-bold">
        <h1>Quran Online</h1>
        <p>{{$t('caption')}}</p>
      </div>
      <div class="text-center">
        <a href="/" class="mr-4">API</a>
        <a href="/">Github</a>
        <p>© 2023 knull-a</p>
      </div>
      <div class="flex items-center gap-6">
        <CustomSelect icon="i-mdi-brightness-6" v-model="$colorMode.preference" :options="themeOptions" />
        <CustomSelect icon="i-mdi-web" v-model="locale" :options="localeOptions" />
      </div>
    </footer>
  </div>
</template>