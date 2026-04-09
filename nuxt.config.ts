// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/devtools', 'nuxt-gtag'],
  gtag: {
    id: process.env.NUXT_PUBLIC_GTAG_ID,
  },
})