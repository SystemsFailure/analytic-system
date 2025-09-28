<script setup lang="ts">
// пропс ошибки Nuxt
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()

// SEO для страницы 404
useSeoMeta({
  title: 'Page not found', // заголовок
  description: 'We are sorry but this page could not be found.' // описание
})

// установка языка страницы
useHead({
  htmlAttrs: {
    lang: 'en'
  }
})
</script>

<template>
  <UApp>
    <!-- стандартный компонент отображения ошибки -->
    <UError :error="error" />
  </UApp>
</template>
