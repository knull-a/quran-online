<script setup lang="ts">
import MainIcon from '~/assets/icons/MainIcon.vue';
import { useToggle } from '@vueuse/core'

const [modalStatus, toggleModal] = useToggle()

const { data } = await useFetch('/api/test', {
  lazy: true,
  pick: ['list']
})

const counter = useCounter()

useHead({
  title: 'My App',
})
</script>
<template>
  <div>
    <div class="relative">
      <div
        class="bg-[url(/img/background.jpg)] min-h-96 dark:saturate-10 dark:brightness-30 dark:contrast-110 absolute top-0 left-0 w-full">
      </div>
      <div class="relative flex flex-col gap-8 items-center py-12 ">
        <MainIcon class="" />
        <button class="flex items-center gap-2 max-w-3xl rounded-[50px] shadow-sm w-full h-16 bg-white px-5"
          @click="toggleModal()">
          <div class="i-mdi-magnify text-grey text-3xl" />
          <p class="text-grey">{{ $t('searchPlaceholder') }}</p>
        </button>
        {{ modalStatus }}
        <ModalMain @close-modal="toggleModal()" :status="modalStatus">
          asdasd
        </ModalMain>
        <CustomButton @click="counter++" class="font-sans" text="Button" />
      </div>
    </div>
    {{ counter }}
    <NuxtLink to="/about">
      <img class="w-100px" src="/img/monke.png" alt="Monke">
    </NuxtLink>
    <ul>
      <li v-for="item in data?.list">
        <NuxtLink :to="`/posts/${item}`">
          Post {{ item }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.bg {}
</style>