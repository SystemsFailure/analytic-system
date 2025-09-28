// конфигурация Nuxt
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // подключаемые модули
  modules: [
    '@nuxt/eslint', // проверка кода на ESLint
    '@nuxt/ui', // UI-библиотека Nuxt
    '@vueuse/nuxt' // VueUse composables
  ],

  // devtools включены для разработки
  devtools: {
    enabled: true
  },

  // глобальные стили
  css: ['~/assets/css/main.css'],

  // правила маршрутов
  routeRules: {
    '/api/**': {
      cors: true // включаем CORS для API
    }
  },

  // версия совместимости Nuxt
  compatibilityDate: '2024-07-11',

  // ESLint конфигурация
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never', // не ставим запятую в конце
        braceStyle: '1tbs' // стиль скобок 1TBS
      }
    }
  }
})
