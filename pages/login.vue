<script setup lang="ts">
type Credentials = {
  email: string
  password: string
  confirmPassword?: string
}

const client = useSupabaseClient()
const { handleSubmit } = useForm()
const { t } = useI18n()

const isSignUp = ref(false)
const isSignUpState = <T>(firstCondition: T, secondCondition: T) => isSignUp.value ? firstCondition : secondCondition
const oppositeLoginState = computed(() => !isSignUp.value ? t('signUp') : t('signIn'))

const formAction = async (values: Credentials) => {
  try {
    if (isSignUp.value) {
      const { data, error } = await client.auth.signUp({
        email: values.email,
        password: values.password
      })
      if (error) throw error
      else console.log(data)
      return
    }
    const { data, error } = await client.auth.signInWithPassword({
      email: values.email,
      password: values.password
    })
    if (error) throw error
    else navigateTo('/profile')
  } catch (error) {
    console.error(error)
  }
}

const onSubmit = handleSubmit((values) => {
  formAction(values)
  console.log(values)
})

</script>
<template>
  <form class="wrapper m-auto" @submit.prevent="onSubmit">
    <CustomInput name="email" placeholder="Email" />
    <CustomInput name="password" type="password" placeholder="Password" />
    <CustomButton :text="isSignUpState(t('signUp'), t('signIn'))" />
    <div>
      <span>{{ isSignUpState(t('signInCheck'), t('signUpCheck')) }}</span>
      <CustomButton @click="isSignUp = !isSignUp" theme="btn-flat" :text="oppositeLoginState" />
    </div>
  </form>
</template>