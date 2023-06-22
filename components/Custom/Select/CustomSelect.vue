<script setup lang="ts">
import { onClickOutside, useToggle } from "@vueuse/core"
type Props = {
  modelValue?: string
  icon?: string
  options: string[]
  reversed?: boolean
}

type Emits = {
  (e: "update:modelValue", v: Props["modelValue"]): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const list = ref<HTMLUListElement>()
const [status, toggleStatus] = useToggle()

const selectOption = (option: string) => {
  emit('update:modelValue', option)
}

onClickOutside(list, () => status.value = false)
</script>
<template>
  <div @click="toggleStatus()"
    class="cursor-pointer relative py-1 px-2 gap-1 border dark:border-white border-dark rounded flex items-center hover:brightness-110">
    <CustomSelectList :reversed="reversed" :status="status" :options="options" @select-option="selectOption" />
    <div v-show="props.icon" :class="icon" class=" text-lg" />
    <span v-if="modelValue">{{ toCapitalLetter(modelValue) }}</span>
    <div class="i-mdi-unfold-more-horizontal" />
  </div>
</template>