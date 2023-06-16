<script setup lang="ts">
type Props = {
  text: string
  icon?: string
  options?: string[]
}
const props = defineProps<Props>()

const status = ref(false)
</script>
<template>
  <div @click="status = !status" class="cursor-pointer relative py-1 px-2 gap-1 border border-black rounded flex items-center hover:brightness-110">
    <ul v-if="status" class="absolute -top-10">
      <li v-for="option in options">
        {{ option }}
      </li>
    </ul>
    <div v-show="props.icon" :class="icon" class=" text-lg" />
    <span class="">{{ text }}</span>
    <div class="i-mdi-unfold-more-horizontal" />
  </div>
</template>