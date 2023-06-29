<script setup lang="ts">
import { useToastStore, ToastStatus } from "~/stores/toastStore"
import { storeToRefs } from "pinia"

const toastStore = useToastStore()
const { removeToast } = toastStore
const { toasts } = storeToRefs(toastStore)
</script>
<template>
  <Teleport to="body">
    <TransitionGroup name="toast">
      <div v-for="toast in toasts" :key="toast.id" v-show="toast.title"
        :class="{ success: toast.type === ToastStatus.Success, error: toast.type === ToastStatus.Error, warn: toast.type === ToastStatus.Warn }">
        <div id="toast-success"
          class="fixed left-1/2 bottom-0 -translate-x-1/2 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
          role="alert">
          <div
            class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <div class="i-mdi-check" />
            <span class="sr-only">Check icon</span>
          </div>
          <div class="ml-3 text-sm font-normal">{{ toast.title }}</div>
          <button type="button" @click="removeToast(toast.id)"
            class="ml-auto -mx-1.5 -my-1.5 text-gray-400 hover:text-gray-9000 p-1.5 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800"
            data-dismiss-target="#toast-success" aria-label="Close">
            <div class="i-mdi-close" />
          </button>
        </div>
      </div>
    </TransitionGroup>
  </Teleport>
</template>
<style scoped>
.toast-move,
.toast-enter-active,
.toast-leave-active {
  transition: all 0.35s ease;
}

.toast-enter-from,
.toast-leave-to {
  transform: translateY(30px);
  opacity: 0;
}
</style>