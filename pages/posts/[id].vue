<script setup lang="ts">
const { data } = await useFetch('/api/test')
const route = useRoute()
useHead({
  title: route.params.id as string
})
</script>
<template>
<div class="text-lg">{{ route.params.id }} {{ data }}</div>
</template>