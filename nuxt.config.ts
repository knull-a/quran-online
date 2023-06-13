import UnoCSS from 'unocss/vite'
export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
  ],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
})