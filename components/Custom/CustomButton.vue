<script setup lang="ts">
type Props = {
  text: string
  icon?: string
}

const props = defineProps<Props>()
</script>
<template>
  <button class="bg-amber text-white border-0 rounded cursor-pointer flex items-center gap-1 text-xl font-sansSerif">
    <div v-show="props.icon" class="icon" />
    <span>{{ props.text }}</span>
  </button>
</template>