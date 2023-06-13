<script setup lang="ts">
const route = useRoute()
useHead({
  title: route.params.id as string
})
</script>
<template>
<div class="text-lg">{{ route.params.id }}</div>
</template>