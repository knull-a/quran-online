import UnoCSS from 'unocss/vite'
export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode'
  ],
  colorMode: {
    classSuffix: ''
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
})