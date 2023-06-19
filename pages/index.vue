<script setup lang="ts">
import MainIcon from '~/assets/icons/MainIcon.vue';


// const { data } = await useFetch('/api/test', {
//   lazy: true,
//   pick: ['list']
// })

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
        <ModalSearch />
        <CustomButton @click="counter++" class="font-sans" text="Button" />
      </div>
    </div>
    {{ counter }}
    <NuxtLink to="/about">
      <img class="w-100px" src="/img/monke.png" alt="Monke">
    </NuxtLink>
  </div>
</template>
<style scoped>
.bg {}
</style>