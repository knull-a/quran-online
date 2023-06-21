<script setup lang="ts">
import type { Data, Surah, Ayah } from "~/types/global"

import { useClipboard } from "@vueuse/core"
import { useToastStore, ToastStatus } from "~/stores/toastStore"

type SurahItem = {
  data: Surah & {
    ayahs: Ayah[]
  }
} & Data

const { locale } = useI18n()
const { copy, copied } = useClipboard()
const { createToast } = useToastStore()

const runtimeConfig = useRuntimeConfig()
const route = useRoute()

const localedData = ref<Ayah[]>([])

useHead({
  title: route.params.number as string
})

const edition = computed(() => locale.value === "en" ? "en.arberry" : "ru.kuliev")
const { data: surah } = await useLazyFetch<SurahItem>(`${runtimeConfig.public.apiBase}surah/${route.params.number}`)

const surahNumber = (localedAyah: Ayah) => `${surah?.value?.data.number}:${localedAyah.numberInSurah}`

const getSurahAyahText = (index: number) => surah.value ? surah.value.data.ayahs[index].text : '';

const copyAyah = (index: number) => {
  copy(getSurahAyahText(index))
  createToast('Успешно скопировано!', ToastStatus.Success)
}

watchEffect(async () => {
  const { data } = await useFetch<SurahItem>(`${runtimeConfig.public.apiBase}surah/${route.params.number}/${edition.value}`)
  if (data.value?.data.ayahs) localedData.value = data.value?.data.ayahs
  console.log(data.value, runtimeConfig.public.apiBase, route.params.number, edition.value)
})
</script>
<template>
  <div v-if="surah && localedData" class="wrapper">
    <div class="text-center m-auto">
      <h2 class="text-5xl">{{ surah.data.name }}</h2>
      <p>{{ $t('length') }}: {{ surah.data.numberOfAyahs }} {{ $t('ayahs') }}</p>
      <p>{{ $t('revelation') }}: <span class="text-grey">{{ surah.data.revelationType }}</span></p>
    </div>
    <div>
      <div class="flex flex-col gap-3 w-full">
        <div v-for="(localedAyah, index) in localedData" :key="index"
          class="flex items-center gap-10 border-gray border-b py-8">
          <div class="flex flex-col gap-1 items-center">
            <p>{{ surahNumber(localedAyah) }}</p>
            <div class="text-xl">
              <div class="i-mdi-bookmark hover:bg-primary cursor-pointer mb-2" />
              <div class="i-mdi-content-copy hover:bg-primary cursor-pointer" @click="copyAyah(index)" />
            </div>
          </div>
          <div class="w-full">
            <!-- <p class="text-right text-2xl float-right">{{ getSurahAyahText(index) }}</p> -->
            <p class="w-full mt-10">{{ localedAyah.text }}</p>
          </div>
        </div>
        <ToastMain />
      </div>
    </div>
  </div>
</template>