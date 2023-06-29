<script setup lang="ts">
type Props = {
  status: boolean
  options: string[]
  reversed?: boolean
}

type Emits = {
  (e: "selectOption", v: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
</script>
<template>
  <ul ref="list" v-show="props.status"
    class="absolute z-1000 rounded shadow-sm bg-light dark:bg-darkSecondary w-full text-center"
    :class="props.reversed ? 'bottom-10 left-0' : 'top-10 -left-4'">
    <li class="dark:hover:bg-grey hover:bg-primary hover:text-white p-2" @click="emit('selectOption', option)" v-for="(option, idx) in options" :key="idx">
      {{ toCapitalLetter(option) }}
    </li>
  </ul>
</template>