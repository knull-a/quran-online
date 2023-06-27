<script setup lang="ts">
const user = useSupabaseUser()
const client = useSupabaseAuthClient()
definePageMeta({
  middleware: ['auth']
})
const logout = async () => {
  try {
    const { error } = await client.auth.signOut()
    if (error) throw error
    else navigateTo('/')
  } catch (error) {
    console.log(error)
  }
}
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
    </div>
  </div>
</template>