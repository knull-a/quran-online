export default defineNuxtConfig({
  modules: [
    "@unocss/nuxt",
    "@pinia/nuxt",
    "@nuxtjs/color-mode",
    "@nuxtjs/i18n",
    "@vueuse/nuxt",
    "@nuxtjs/supabase",
    [
      "@vee-validate/nuxt",
      {
        autoImports: true,
      },
    ],
  ],
  runtimeConfig: {
    // The private keys which are only available within server-side
    // Keys within public, will be also exposed to the client-side
    public: {
      apiBase: "https://api.alquran.cloud/v1/",
    },
  },
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
