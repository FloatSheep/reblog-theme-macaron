// https://nuxt.com/docs/api/configuration/nuxt-config
import { mainConfig } from "./master.configuration";

export default defineNuxtConfig({
  app: {
    head: {
      title: mainConfig.siteName,
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  build: {
    transpile: ["primevue", "marked"],
  },
  compatibilityDate: "2024-04-03",
  css: ['@/assets/css/index.css'],
  devtools: { enabled: false },
  modules: ["@primevue/nuxt-module"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
/*   site: {
    url: mainConfig.siteUrl,
  }, */
  primevue: {
    autoImport: true,
    importTheme: { from: "@/themes/noir.js" },
    options: {
      ripple: true,
      theme: {
        options: {
          prefix: "p",
          darkModeSelector: ".app-dark",
          cssLayer: false,
        },
      },
    },
  },
  ssr: true,
});
