<script setup lang="ts">
const route = useRoute()
</script>
<template>
<div class="text-lg">{{ route.params.id }}</div>
</template>