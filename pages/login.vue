<script setup lang="ts">
const client = useSupabaseClient()


const isSignUp = ref(false)
const login = () => {
  console.log('login')
}

const signUp = () => {
  const {user, error} = client.auth.signUp()
  console.log('sign up');
}

const formAction = () => isSignUp.value ? signUp() : login()
</script>
<template>
  <form class="wrapper m-auto" @submit.prevent="formAction">
    <input class="bg-transparent" type="text" placeholder="Email">
    <input class="bg-transparent" type="text" placeholder="Password">
    <CustomButton text="Login" />
  </form>
</template>