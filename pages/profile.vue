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
})
</script>
<template>
  <div class="wrapper">
    <div class="">
      <p class="font-bold text-3xl">{{ user?.user_metadata.username }}</p>
      <p class="text-grey">{{ user?.email }}</p>

      <CustomButton @click="logout" theme="btn-flat" class="text-red-500" :text="$t('logout')" />
    </div>
    <div>
      <h3>{{ $t('bookmarks') }}</h3>
      <div>
        <div v-for="bookmark in bookmarks" :key="bookmark.id">
          {{ bookmark.surahName }}
          {{ bookmark.surahNumber }}:{{ bookmark.ayahNumber }}
        </div>
      </div>
    </div>
  </div>
</template>