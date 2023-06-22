<script setup lang="ts">
import type { Data, Surah } from "~/types/global"
type SurahList = {
  data: Surah[]
} & Data
const runtimeConfig = useRuntimeConfig()
const { data: surahs } = useFetch<SurahList>(`${runtimeConfig.public.apiBase}surah`)
</script>
<template>
  <div class="grid grid-cols-3 gap-3">
    <NuxtLink :to="`/surahs/${surah.number}/`" v-for="surah in surahs?.data"
      class="flex gap-4 justify-between border-rounded border border-light dark:border-darkSecondary p-3 items-center bold">
      <div class="flex items-center justify-center rounded-50% w-10 h-10 bg-light dark:bg-darkSecondary text-xs">
        {{ surah.number }}
      </div>
      <div class="flex flex-col flex-1">
        <h3>
          {{ surah.englishName }}
        </h3>
        <p class="text-grey">{{ surah.englishNameTranslation }}</p>
      </div>
      <div class="text-center">
        <p>{{ surah.name }}</p>
        <p class="text-grey">{{ surah.numberOfAyahs }} {{ $t('ayahs') }}</p>
      </div>
    </NuxtLink>
  </div>
</template>