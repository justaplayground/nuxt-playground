// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false, // For localStorage compatibility
  css: ['~/assets/css/main.css'],
  modules: ['@vueuse/nuxt', '@pinia/nuxt', '@nuxt/eslint'],
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {},
    },
  },
})