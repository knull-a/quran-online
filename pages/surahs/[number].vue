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

definePageMeta({
  layout: "default",
});

const { locale } = useI18n()
const { copy, copied } = useClipboard()
const { createToast } = useToastStore()

const client = useSupabaseAuthClient()
const user = useSupabaseUser()
const runtimeConfig = useRuntimeConfig()
// const { bookmarks } = await useUsersStore()
const route = useRoute()

const localedData = ref<Ayah[]>([])
const newBookmarks = ref<Bookmark[]>([])
const bookmarks = ref([])

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

const addTooBookmark = async (ayah: Ayah, surah: SurahItem['data']) => {
  newBookmarks.value.push({ surahName: surah.englishNameTranslation, ayahNumber: ayah.numberInSurah, surahNumber: surah.number, id: ayah.number })
  const { data, error } = await client
    .from('user_bookmarks')
    .insert({
      user: user.value?.id,
      bookmarks: newBookmarks.value
    },
    )

  console.log(bookmarks, surah.englishNameTranslation, surah.number, ayah.numberInSurah)
}

const bookmarkStatus = (ayah: Ayah) =>
  bookmarks.value?.some((bookmark) => bookmark.id === ayah.number)



watchEffect(async () => {
  const { data } = await useLazyFetch<SurahItem>(`${runtimeConfig.public.apiBase}surah/${route.params.number}/${edition.value}`)
  if (data.value?.data.ayahs) localedData.value = data.value?.data.ayahs
  console.log(localedData.value)
})
onMounted(async () => {
  const { data, error } = await client
    .from("user_bookmarks")
    .select("bookmarks")
    .eq("user", user.value?.id);
  bookmarks.value = data
  console.log(data, bookmarks.value)
})
</script>
<template>
  <div>
    <div v-if="surah" class="wrapper">
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
                <div class="i-mdi-bookmark-outline hover:bg-primary cursor-pointer mb-2"
                  :class="{ 'bg-primary': bookmarkStatus(localedAyah) }"
                  @click="addTooBookmark(localedAyah, surah.data)" />
                {{ bookmarkStatus(localedAyah) }}
                {{ localedAyah.number }}
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