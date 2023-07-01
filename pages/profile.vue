<script setup lang="ts">
type Bookmark = {
  surahName: string;
  surahNumber: number;
  ayahNumber: number;
  id: number
};

const bookmarks = ref<Bookmark[]>([])
const user = useSupabaseUser()
const client = useSupabaseAuthClient()

const logout = async () => {
  try {
    const { error } = await client.auth.signOut()
    if (error) throw error
    else navigateTo('/')
  } catch (error) {
    console.log(error)
  }
}

const lastRequest = () => {
  client.auth.getSession()
}

definePageMeta({
  middleware: ['auth']
})

onMounted(async () => {
  const { data } = await client
    .from("user_bookmarks")
    .select("bookmarks")
    .eq("user", user.value?.id);
  if (data) bookmarks.value = data[0].bookmarks
  console.info('onmounted', data, bookmarks.value)
  console.log(lastRequest())
})
</script>
<template>
  <div class="wrapper">
    <div>
      <div class="font-bold text-3xl">
        <span>{{ user?.user_metadata.username }}</span>
      </div>
      <div class="flex gap-3 items-center">
        <span class="text-grey">{{ user?.email }}</span>
        <button @click="logout" class="i-mdi-logout text-red-500" />
      </div>
    </div>
    <div>
      <h3>{{ $t('bookmarks') }}</h3>
      <div class="flex gap-3 pt-2 pb-6 hidden w-full overflow-auto">
        <div class="flex gap-1 py-1 px-2 whitespace-nowrap text-ellipsis bg-primary text-white rounded-20" v-for="bookmark in bookmarks" :key="bookmark.id">
          <span>{{ bookmark.surahName }}</span>
          <span>{{ bookmark.surahNumber }}:{{ bookmark.ayahNumber }}</span>
        </div>
      </div>
    </div>
  </div>
</template>