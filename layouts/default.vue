<script setup lang="ts">
import { useLocalStorage, useToggle, useDark } from '@vueuse/core'

const { locale } = useI18n()
const themeOptions = ref(['light', 'dark', 'system'])
const localeOptions = ref(['en', 'ru'])
const isDark = useDark()

useLocalStorage('locale', locale)
const [localeStatus, toggleLocale] = useToggle()

const toggleDark = useToggle(isDark)

const changeLocale = (option: string) => locale.value = option
</script>
<template>
  <div class="bg-white text-dark dark:text-white dark:bg-dark flex flex-col justify-between min-h-screen">
    <header class="px-10 py-3 text-xl flex items-center justify-between">
      <NuxtLink to="/" class="font-bold">Quran Online</NuxtLink>
      <div class="flex gap-2">
        <NuxtLink to="/profile" @click="">
          <div class="i-mdi-account" />
        </NuxtLink>
        <button type="button" @click="toggleLocale()" class="relative bg-transparent">
          <div class="i-mdi-web" />
          <CustomSelectList class="text-sm min-w-50px" :options="localeOptions" :status="localeStatus"
            @select-option="changeLocale" />
        </button>
        <button type="button" @click="toggleDark()" class="bg-transparent">
          <div class="i-mdi-brightness-6" />
        </button>
        <!-- <div class="i-mdi-magnify" /> -->
      </div>
    </header>
    <div class="flex-1">
      <slot />
    </div>
    <ClientOnly>
      <footer class="flex items-center justify-between py-12 wrapper">
        <div class="font-bold text-sm sm:text-base">
          <h1>Quran Online</h1>
          <p>{{ $t('caption') }}</p>
        </div>
        <div class="text-center">
          <a href="https://alquran.cloud/api" class="mr-4">API</a>
          <a href="https://github.com/knull-a">Github</a>
          <p>© 2023</p>
        </div>
        <div class="items-center gap-6 display-none sm:flex">
          <CustomSelect reversed icon="i-mdi-brightness-6" v-model="$colorMode.preference" :options="themeOptions" />
          <CustomSelect reversed icon="i-mdi-web" v-model="locale" :options="localeOptions" />
        </div>
      </footer>
    </ClientOnly>
  </div>
</template>