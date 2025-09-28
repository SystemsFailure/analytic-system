<script setup lang="ts">
// управление темой (светлая/тёмная)
const colorMode = useColorMode()

// вычисляем цвет для мета-тега theme-color
const color = computed(() => colorMode.value === 'dark' ? '#1b1718' : 'white')

// настройка head: meta, favicon, язык
useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color } // динамический цвет темы
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' } // фавикон
  ],
  htmlAttrs: {
    lang: 'en' // язык страницы
  }
})

// SEO данные
const title = 'Nuxt Dashboard Template'
const description = 'A professional dashboard template built with Nuxt UI, featuring multiple pages, data visualization, and comprehensive management capabilities for creating powerful admin interfaces.'

useSeoMeta({
  title, // заголовок страницы
  description, // описание страницы
  ogTitle: title, // Open Graph заголовок
  ogDescription: description, // Open Graph описание
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/dashboard-light.png', // OG изображение
  twitterImage: 'https://ui.nuxt.com/assets/templates/nuxt/dashboard-light.png', // картинка для Twitter
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <!-- глобальный индикатор загрузки -->
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <!-- рендер текущей страницы -->
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
