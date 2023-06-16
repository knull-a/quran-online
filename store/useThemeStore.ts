import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const useThemeStore = defineStore("theme", () => {
  const theme = ref("dark");
  if (process.client) {
    const savedState = localStorage.getItem("theme");

    if (savedState !== null) {
      theme.value = JSON.parse(savedState);
    }

    watch(
      theme,
      (state) => {
        localStorage.setItem("theme", JSON.stringify(state));
      },
      { deep: true }
    );
  }
  const changeTheme = (arg: string) => (theme.value = arg);
  return { theme, changeTheme };
});
