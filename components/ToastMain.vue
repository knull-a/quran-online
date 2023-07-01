<script setup lang="ts">
import { useToastStore, ToastStatus, type Toast } from "~/stores/toastStore";
import { storeToRefs } from "pinia";

const toastStore = useToastStore();
const { removeToast } = toastStore;
const { toasts } = storeToRefs(toastStore);

const toastIcon = (toast: Toast) => {
  switch (toast.type) {
    case ToastStatus.Success:
      return "i-mdi-check";
    case ToastStatus.Warn:
      return "i-mdi-exclamation";
    default:
      return "i-mdi-alert";
  }
};

const toastColor = (toast: Toast) => {
  switch (toast.type) {
    case ToastStatus.Success:
      return "green";
    case ToastStatus.Warn:
      return "yellow";
    default:
      return "red";
  }
};
</script>
<template>
  <Teleport to="body">
    <TransitionGroup name="toast">
      <div v-for="toast in toasts" :key="toast.id" v-show="toast.title" :class="{
        success: toast.type === ToastStatus.Success,
        error: toast.type === ToastStatus.Error,
        warn: toast.type === ToastStatus.Warn,
      }">
        <div id="toast-success" :class="`fixed left-1/2 bottom-0 -translate-x-1/2 flex items-center w-full max-w-xs p-4 mb-4 bg-white rounded-lg shadow border dark:border-grey dark:text-white dark:bg-dark`" role="alert">
          <div :class="`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-${toastColor(
            toast
          )}-500 bg-${toastColor(toast)}-100 rounded-lg dark:bg-${toastColor(
            toast
          )}-800 dark:text-${toastColor(toast)}-200`">
            <div :class="toastIcon(toast)" />
          </div>
          <div class="ml-3 text-sm font-normal flex-1">{{ toast.title }}</div>
          <div class="i-mdi-close text-dark dark:text-white cursor-pointer" @click="removeToast(toast.id)" />
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
