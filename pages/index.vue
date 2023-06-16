<script setup lang="ts">
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
    <CustomButton @click="counter++" class="font-sans" text="Button" />
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