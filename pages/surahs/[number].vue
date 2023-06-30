<script setup lang="ts">
import type { Data, Surah, Ayah } from "~/types/global"
import { useUsersStore } from "~/stores/userStore";

import { useClipboard } from "@vueuse/core"
import { useToastStore, ToastStatus } from "~/stores/toastStore"

type SurahItem = {
  data: Surah & {
    ayahs: Ayah[]
  }
} & Data

type Bookmark = {
  surahName: string;
  surahNumber: number;
  ayahNumber: number;
  id: number
};

const { locale } = useI18n()
const { copy } = useClipboard()
const { createToast } = useToastStore()
const { t } = useI18n()

const client = useSupabaseAuthClient<Bookmark>()
const user = useSupabaseUser()
const runtimeConfig = useRuntimeConfig()
const route = useRoute()

const localedData = ref<Ayah[]>([])
const bookmarks = ref<Bookmark[]>([])
const edition = computed(() => locale.value === "en" ? "en.arberry" : "ru.kuliev")

const { data: surah } = await useLazyFetch<SurahItem>(`${runtimeConfig.public.apiBase}surah/${route.params.number}`)

const surahNumber = (localedAyah: Ayah) => `${surah?.value?.data.number}:${localedAyah.numberInSurah}`
const getSurahAyahText = (index: number) => surah.value ? surah.value.data.ayahs[index].text : '';

const copyAyah = (index: number) => {
  copy(getSurahAyahText(index))
  createToast(t('successCopy'), ToastStatus.Success)
}

const updateBookmark = async (status: 'add' | 'delete') => {
  const { data, error } = await client
    .from('user_bookmarks')
    .update({
      user: user.value?.id,
      bookmarks: bookmarks.value
    },
    ).eq("user", user.value?.id)
  if (error) createToast(t('errorUnknown'), ToastStatus.Error)
  else status === 'add' ? createToast(t('successBookmarks'), ToastStatus.Success) : createToast(t('successDelete'), ToastStatus.Success)
}

const addToBookmark = async (ayah: Ayah, surah: SurahItem['data']) => {
  if (user.value) {
    if (bookmarks.value.length) {
      bookmarks.value.push({ surahName: surah.englishNameTranslation, ayahNumber: ayah.numberInSurah, surahNumber: surah.number, id: ayah.number })
      await updateBookmark('add')
    } else {
      bookmarks.value.push({ surahName: surah.englishNameTranslation, ayahNumber: ayah.numberInSurah, surahNumber: surah.number, id: ayah.number })
      const { error } = await client
        .from('user_bookmarks')
        .insert({
          user: user.value?.id,
          bookmarks: bookmarks.value
        },
        )
      if (error) createToast(t('errorUnknown'), ToastStatus.Error)
      else createToast(t('successBookmarks'), ToastStatus.Success)
    }
  }
  else {
    navigateTo("/login")
  }

}

const deleteBookmark = async (ayah: Ayah) => {
  console.log('before', bookmarks.value)
  bookmarks.value = bookmarks.value.filter((bookmark) =>
    bookmark.id !== ayah.number
  )
  await updateBookmark('delete')
}

const bookmarkStatus = (ayah: Ayah) => {
  if (bookmarks.value.length) {
    return bookmarks.value.some((bookmark) => bookmark.id === ayah.number)
  }
}

definePageMeta({
  layout: "default",
});

useHead({
  title: route.params.number as string
})

watchEffect(async () => {
  const { data } = await useLazyFetch<SurahItem>(`${runtimeConfig.public.apiBase}surah/${route.params.number}/${edition.value}`)
  if (data.value?.data.ayahs) localedData.value = data.value?.data.ayahs
  console.log(localedData.value)
})

onMounted(async () => {
  const { data } = await client
    .from("user_bookmarks")
    .select("bookmarks")
    .eq("user", user.value?.id);
  if (data && localedData.value.length) bookmarks.value = data[0].bookmarks
  console.info('onmounted', data, bookmarks.value)
})
</script>
<template>
  <div>
    <div v-if="surah && localedData.length" class="wrapper">
      <div class="text-center m-auto">
        <h2 class="text-5xl">{{ surah.data.name }}</h2>
        <p>{{ $t('length') }}: {{ surah.data.numberOfAyahs }} {{ $t('ayahs') }}</p>
        <p>{{ $t('revelation') }}: <span class="text-grey">{{ surah.data.revelationType }}</span></p>
      </div>
      <div>
        <div class="flex flex-col gap-3 w-full">
          <div v-for="(localedAyah, index) in localedData" :key="localedAyah.numberInSurah" :id="surahNumber(localedAyah)"
            class="flex items-center gap-10 border-gray border-b py-8">
            <div class="flex flex-col gap-1 items-center">
              <p>{{ surahNumber(localedAyah) }}</p>
              <div class="text-xl">
                <div class="cursor-pointer mb-2">
                  <div v-if="!bookmarkStatus(localedAyah)" class="i-mdi-bookmark-outline hover:bg-primary"
                    @click="addToBookmark(localedAyah, surah.data)" />
                  <div v-else class="i-mdi-bookmark bg-primary" @click="deleteBookmark(localedAyah)" />
                </div>
                <div class="i-mdi-content-copy hover:bg-primary cursor-pointer" @click="copyAyah(index)" />
              </div>
            </div>
            <div class="w-full">
              <p class="text-right text-2xl float-right">{{ getSurahAyahText(index) }}</p>
              <p class="w-full mt-10">{{ localedAyah.text }}</p>
            </div>
          </div>
          <ToastMain />
        </div>
      </div>
    </div>
  </div>
</template>