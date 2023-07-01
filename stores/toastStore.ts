import { defineStore } from "pinia";
export enum ToastStatus {
  Warn = "warn",
  Error = "error",
  Success = "success",
}

export type Toast = {
  title: string;
  id: string;
  type: ToastStatus;
};

const generateRandomId = () => {
  const timestamp = Date.now().toString(36);
  const randomChars = Math.random().toString(36).replace(".", "");

  return timestamp + randomChars;
};

export const useToastStore = defineStore("toast", () => {
  const toasts = ref<Toast[]>([]);
  const createToast = (title: string, type: ToastStatus) => {
    const newToast = {
      title,
      id: generateRandomId(),
      type,
    };
    console.log('before unshift', toasts.value)
    toasts.value.unshift(newToast);
    console.log('after unshift', toasts.value)
    console.log('newToast', newToast)

    setTimeout(() => {
      const index = toasts.value.findIndex((toast) => toast.id === newToast.id);
      toasts.value.splice(index, 1);
    }, 40000);
  };

  const removeToast = (id: string) => {
    const index = toasts.value.findIndex((notify) => notify.id === id);
    toasts.value.splice(index, 1);
  };

  return { toasts, createToast, removeToast };
});
