<script setup lang="ts">
type Theme = 'btn-primary' | 'btn-flat'

type Props = {
  text: string
  icon?: string
  theme?: Theme
}

const props = withDefaults(defineProps<Props>(), {
  theme: 'btn-primary'
})
</script>
<template>
  <button
    :class="`border-0 rounded cursor-pointer flex items-center gap-1 text-xl font-sansSerif ${theme}`">
    <div v-show="props.icon" class="icon" />
    <span>{{ props.text }}</span>
  </button>
</template>