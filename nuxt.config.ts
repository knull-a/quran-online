import UnoCSS from "unocss/vite";
export default defineNuxtConfig({
  modules: [
    "@unocss/nuxt",
    "@pinia/nuxt",
    "@nuxtjs/color-mode",
    "@nuxtjs/i18n",
  ],
  i18n: {
    vueI18n: "./i18n.config.ts",
    locales: [
      {
        code: "en",
        name: "English",
      },
      {
        code: "ru",
        name: "Russian",
      },
    ],
    defaultLocale: "en",
  },
  colorMode: {
    classSuffix: "",
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },

  devtools: {
    enabled: true,
  },
});
