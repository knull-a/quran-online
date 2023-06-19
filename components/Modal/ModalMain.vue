<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
type Props = {
  status: boolean
  headerTitle?: string
  height?: string
}

type Emits = {
  (e: 'closeModal'): void
}

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

const closeModal = () => emit('closeModal')

const showModalHeader = computed(() => props.headerTitle ? props.headerTitle : '')

const modalElement = ref<HTMLDivElement>()

onClickOutside(modalElement, () => {
  if (props.status) closeModal()
})
</script>
<template>
  <Teleport to="#modal-container">
    <Transition name="fade">
      <div
        class="fixed overflow-hidden overscroll-contain top-0 left-0 z-[9999] h-screen w-screen bg-[#00000055] backdrop-blur-3"
        v-if="props.status">
        <div ref="modalElement"
          class="z-[99999] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 max-w-4xl bg-white dark:bg-dark rounded-xl overflow-auto h-600px">
          <div>
            <div class="flex justify-between gap-10">
              <h3 class="text-center text-lg mb-2">{{ showModalHeader }}</h3>
              <button class="absolute top-4 right-4 i-mdi-close" @click="closeModal" />
            </div>
            <div>
              <slot />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s cubic-bezier(.16, 1, .3, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>