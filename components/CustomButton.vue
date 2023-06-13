<script setup lang="ts">
type Props = {
  text: string
  isWithIcon?: boolean
}

const props = defineProps<Props>()
</script>
<template>
  <button class="bg-amber text-white border-0 rounded cursor-pointer flex items-center gap-1 text-xl">
    <div v-show="props.isWithIcon" class=" i-mdi-clock bg-white text-xl" />
    {{ props.text }}
  </button>
</template>