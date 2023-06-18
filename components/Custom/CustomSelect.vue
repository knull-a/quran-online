<script setup lang="ts">
type Props = {
  modelValue?: string
  icon?: string
  options?: string[]
}

type Emits = {
  (e: "update:modelValue", v: Props["modelValue"]): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const status = ref(false)
const toggleStatus = () => status.value = !status.value

const selectOption = (option: string) => {
  emit('update:modelValue', option)
}
const toUpperCase = (item: string) => item.charAt(0).toUpperCase() + item.substring(1)

</script>
<template>
  <div @click="toggleStatus"
    class="cursor-pointer relative py-1 px-2 gap-1 border dark:border-white border-dark rounded flex items-center hover:brightness-110">
    <ul v-show="status" class="absolute -top-20">
      <li class="hover" @click="selectOption(option)" v-for="(option, idx) in options" :key="idx">
        {{ toUpperCase(option) }}
      </li>
    </ul>
    <div v-show="props.icon" :class="icon" class=" text-lg" />
    <span v-if="modelValue">{{ toUpperCase(modelValue) }}</span>
    <div class="i-mdi-unfold-more-horizontal" />
  </div>
</template>