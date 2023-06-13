<script setup lang="ts">
useHead({
  title: 'My App',
})
</script>
<template>
  <div>
    <CustomButton class="font-sans" is-with-icon text="Button" />
    <NuxtLink to="/about">
      <img class="w-100px" src="/img/monke.png" alt="Monke">
    </NuxtLink>
    <ul>
      <li>
        <NuxtLink to="/posts/1">
          Post 1
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/posts/2">
          Post 2
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>