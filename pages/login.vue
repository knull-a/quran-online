<script setup lang="ts">
type Credentials = {
  username?: string
  email: string
  password: string
  confirmPassword?: string
}

definePageMeta({
  middleware: ['auth']
})

const client = useSupabaseClient()
const { handleSubmit } = useForm()
const { t } = useI18n()

const isSignUp = ref(false)
const isSignUpState = <T>(firstCondition: T, secondCondition: T) => isSignUp.value ? firstCondition : secondCondition
const oppositeLoginState = computed(() => !isSignUp.value ? t('signUp') : t('signIn'))

const onSubmit = handleSubmit(async (values) => {
  try {
    if (isSignUp.value) {
      const { error } = await client.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            username: values.username
          }
        }
      })
      if (error) throw error
      else navigateTo('/profile')
      return
    }
    const { error } = await client.auth.signInWithPassword({
      email: values.email,
      password: values.password
    })
    if (error) throw error
    else navigateTo('/profile')
  } catch (error) {
    console.error(error)
  }
  console.log(values)
})

const signInWithGoogle = async () => {
  const {data, error} = await client.auth.signInWithOAuth({
    provider: 'google'
  })
  console.log(data, error)
}
</script>
<template>
  <div class="h-screen w-full grid content-center justify-center">
    <form class="flex flex-col gap-2 wrapper m-auto" @submit.prevent="onSubmit">
      <h3 class="font-bold text-3xl text-center mb-4">{{ isSignUpState(t('signUp'), t('signIn')) }}</h3>
      <CustomInput v-show="isSignUp" name="username" placeholder="Username" />
      <CustomInput name="email" placeholder="Email" />
      <CustomInput name="password" type="password" placeholder="Password" />
      <div class="flex items-center gap-2">
        <span>{{ isSignUpState(t('signInCheck'), t('signUpCheck')) }}</span>
        <CustomButton @click="isSignUp = !isSignUp" theme="btn-flat" :text="oppositeLoginState" />
      </div>
      <CustomButton class="m-auto" text="Confirm" type="submit" />
      <p class="m-auto">OR</p>
      <CustomButton @click="signInWithGoogle" theme="btn-transparent" class="m-auto" text="Sign In With Google" />
    </form>
  </div>
</template>