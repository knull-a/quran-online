<script setup lang="ts">
import * as yup from "yup";
import { setLocale } from "yup";
import { configure, defineRule } from "vee-validate";
import { localize } from "@vee-validate/i18n";
import { required } from "@vee-validate/rules";
import en from "@vee-validate/i18n/dist/locale/en.json";
import ru from "@vee-validate/i18n/dist/locale/ru.json";
import { ToastStatus, useToastStore } from "~/stores/toastStore";

type Credentials = {
  username?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

setLocale({
  // use constant translation keys for messages without values
  mixed: {
    default: "field_invalid",
  },
  // use functions to generate an error object that includes the value from the schema
  number: {
    min: ({ min }) => ({ key: "field_too_short", values: { min } }),
    max: ({ max }) => ({ key: "field_too_big", values: { max } }),
  },
});

definePageMeta({
  middleware: ["auth"],
});

const client = useSupabaseClient();
const { t } = useI18n();
const { createToast } = useToastStore();

const isSignUp = ref(false);
const isLoadingSubmit = ref(false);
const isLoadingGoogle = ref(false);

const isSignUpState = <T>(firstCondition: T, secondCondition: T) =>
  isSignUp.value ? firstCondition : secondCondition;
const oppositeLoginState = computed(() =>
  !isSignUp.value ? t("signUp") : t("signIn")
);

const loginSchema = computed(() =>
  yup.object().shape({
    Email: yup
      .string()
      .email(() => t("invalid_email"))
      .required(() => t("field_required")),
    Password: yup
      .string()
      .required(() => t("field_required"))
      .min(6, () => t("field_too_short")),
  })
);
const signUpSchema = computed(() =>
  yup.object().shape({
    loginSchema: loginSchema.value,
    Username: yup.string().required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], t("passwordsDoNotMatch")),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema: isSignUp.value ? signUpSchema.value : loginSchema.value,
});

const onSubmit = handleSubmit(async (values) => {
  try {
    isLoadingSubmit.value = true
    if (isSignUp.value) {
      const { error } = await client.auth.signUp({
        email: values.Email,
        password: values.Password,
        options: {
          data: {
            username: values.username,
          },
        },
      });
      if (error) throw error;
      else navigateTo("/profile");
      return;
    }
    const { error } = await client.auth.signInWithPassword({
      email: values.Email,
      password: values.Password,
    });
    if (error) createToast(error.message, ToastStatus.Error);
    else navigateTo("/profile");
  } catch (error) {
    console.error(error);
  }
  finally {
    isLoadingSubmit.value = false
  }
  console.log(values);
});

const signInWithGoogle = async () => {
  try {
    isLoadingGoogle.value = true
    await client.auth.signInWithOAuth({
      provider: "google",
    })
  } catch (error) {
    console.error(error)
  } finally {
    isLoadingGoogle.value = false
  }
};
</script>
<template>
  <ToastMain />
  <div class="h-screen w-full grid content-center justify-center">
    <form class="flex flex-col gap-2 wrapper m-auto" @submit.prevent="onSubmit">
      <h3 class="font-bold text-3xl text-center mb-4">
        {{ isSignUpState(t("signUp"), t("signIn")) }}
      </h3>
      <CustomInput v-show="isSignUp" name="Username" placeholder="Username" />
      <CustomInput name="Email" placeholder="Email" />
      <CustomInput name="Password" type="password" placeholder="Password" />
      <div class="flex items-center gap-2">
        <span>{{ isSignUpState(t("signInCheck"), t("signUpCheck")) }}</span>
        <CustomButton @click="isSignUp = !isSignUp" theme="btn-flat" :text="oppositeLoginState" />
      </div>
      <CustomButton class="m-auto" :loading="isLoadingSubmit" text="Confirm" type="submit" />
      <p class="m-auto">OR</p>
      <CustomButton icon="i-mdi-google" @click="signInWithGoogle" theme="btn-transparent" class="m-auto"
        text="Sign In With Google" :loading="isLoadingGoogle" />
    </form>
  </div>
</template>
