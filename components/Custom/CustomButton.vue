<script setup lang="ts">
import { ButtonHTMLAttributes } from 'nuxt/dist/app/compat/capi';

type Theme = 'btn-primary' | 'btn-flat' | 'btn-transparent'

type Props = {
  text: string
  icon?: string
  theme?: Theme
  type?: ButtonHTMLAttributes['type'];
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  theme: 'btn-primary',
  type: 'button'
})
</script>
<template>
  <button :class="`rounded-1 cursor-pointer flex items-center gap-1 text-xl font-sansSerif disabled:grayscale ${theme}`"
    :type="props.type" :disabled="props.disabled">
    <div v-show="props.icon" class="icon" />
    <span>{{ props.text }}</span>
  </button>
</template>