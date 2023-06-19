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
const searchData = ref<Search | null>({
  data: {
    matches: []
  },
  code: 0,
  status: ''
})
const isPending = ref(false)

const runtimeConfig = useRuntimeConfig()

watchDebounced(searchField, async () => {
  if (searchField) {
    try {
      isPending.value = true
      const { data } = await useFetch<Search>(runtimeConfig.public.apiBase + `search/${searchField.value}/all/en.arberry`)
      searchData.value = data.value
    } catch (error) {
      console.error(error)
    } finally {
      isPending.value = false
    }
  }
}, { debounce: 1500 })

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
      ispending {{ isPending }}
      <div v-if="isPending">
        Loading
      </div>
      <div v-else>
        <div v-for="item in searchData?.data.matches" class="border-b-1 py-2">
          <RouterLink to="/" class="text-primary">
            {{ item.surah.englishName }}
            {{ item.surah.number }}:{{ item.numberInSurah }}
          </RouterLink>
          <div>
            {{ item.text }}
          </div>
        </div>
      </div>
      <QuranIcon class="m-auto mt-10 opacity-20" />
    </div>
  </ModalMain>
</template>