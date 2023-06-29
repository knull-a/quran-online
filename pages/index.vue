<script setup lang="ts">
import MainIcon from '~/assets/icons/MainIcon.vue';
definePageMeta({
  layout: "default",
});
</script>
<template>
  <div>
    <div class="relative">
      <div
        class="bg-[url(/img/background.jpg)] min-h-96 dark:saturate-10 dark:brightness-30 dark:contrast-110 absolute top-0 left-0 w-full">
      </div>
      <div class="relative flex flex-col gap-8 items-center py-20 ">
        <MainIcon class="" />
        <ModalSearch />
      </div>
    </div>
    <div class="wrapper text-">
      <TabsSurah />
    </div>
  </div>
</template>
<style scoped>
.bg {}
</style>