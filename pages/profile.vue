<script setup lang="ts">
const user = useSupabaseUser()
const client = useSupabaseAuthClient()
definePageMeta({
  middleware: ['auth']
})
const logout = async () => {
  try {
    const {error} = await client.auth.signOut()
    if (error) throw error
    else navigateTo('/')
  } catch (error) {
    console.log(error)
  }
}
</script>
<template>
  Profile {{ user?.email }}
  {{ user?.user_metadata.username }}
  <CustomButton @click="logout" :text="$t('logout')" />
</template>