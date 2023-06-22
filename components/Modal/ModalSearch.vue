<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import QuranIcon from "~/assets/icons/QuranIcon.vue"
import { watchDebounced } from '@vueuse/core'
import type { Data, Edition, Surah } from "~/types/global"

type Search = {
  data: {
    matches: SearchItem[]
  }
} & Data

type SearchItem = {
  number: number
  text: string
  edition: Edition
  surah: Surah
  numberInSurah: string
}

const searchField = ref('')
const searchData = ref<Search | null>(null)
const isPending = ref(false)

const runtimeConfig = useRuntimeConfig()

watchDebounced(searchField, async () => {
  if (searchField) {
    try {
      isPending.value = true
      const { data } = await useFetch<Search>(runtimeConfig.public.apiBase + `search/${searchField.value}/all/en.arberry`)
      searchData.value = data.value
      // isPending.value = pending.value
    } catch (error) {
      console.error(error)
    } finally {
      isPending.value = false
    }
  }
}, { debounce: 500 })

const [modalStatus, toggleModal] = useToggle()
</script>
<template>
  <button class="flex items-center gap-2 max-w-3xl rounded-[50px] shadow-sm w-full h-16 bg-white px-5"
    @click="toggleModal()">
    <div class="i-mdi-magnify text-grey text-3xl" />
    <p class="text-grey">{{ $t('searchPlaceholder') }}</p>
  </button>
  <ModalMain @close-modal="toggleModal()" :status="modalStatus" height="600px">
    <div>
      <div class="flex items-center gap-2 text-grey">
        <div class="i-mdi-magnify text-2xl" />
        <input v-model="searchField" type="text" class="border-b-1 focus:outline-0 pb-1 text-lg w-500px dark-bg-dark"
          :placeholder="$t('searchPlaceholder')">
      </div>
      <div v-if="isPending">
        <div v-for="item in 5" class="flex flex-col gap-2 py-2 w-full animate-pulse">
          <div class="bg-grey w-200px h-16px rounded" />
          <div class="bg-grey w-full h-16px rounded" />
          <div class="bg-grey w-80% h-16px rounded" />
          <div class="bg-grey w-90% h-16px rounded" />
        </div>
      </div>
      <div v-else-if="!searchData">
        <QuranIcon class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />
      </div>
      <div v-else class="max-w-500px dark:text-white">
        <div v-for="item in searchData.data.matches" class="border-b-1 py-2">
          <NuxtLink :to="`/surahs/${item.surah.number}/`" class="text-primary">
            {{ item.surah.englishName }}
            {{ item.surah.number }}:{{ item.numberInSurah }}
          </NuxtLink>
          <div>
            {{ item.text }}
          </div>
        </div>
      </div>
    </div>
  </ModalMain>
</template>