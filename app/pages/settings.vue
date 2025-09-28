<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

// ссылки для навигации в настройках
const links = [[{
  label: 'General', // общие
  icon: 'i-lucide-user',
  to: '/settings',
  exact: true
}, {
  label: 'Members', // пользователи
  icon: 'i-lucide-users',
  to: '/settings/members'
}, {
  label: 'Notifications', // уведомления
  icon: 'i-lucide-bell',
  to: '/settings/notifications'
}, {
  label: 'Security', // безопасность
  icon: 'i-lucide-shield',
  to: '/settings/security'
}], [{
  label: 'Documentation', // внешняя ссылка
  icon: 'i-lucide-book-open',
  to: 'https://ui.nuxt.com/docs/getting-started/installation/nuxt',
  target: '_blank'
}]] satisfies NavigationMenuItem[][]
</script>

<template>
  <!-- панель настроек -->
  <UDashboardPanel id="settings" :ui="{ body: 'lg:py-12' }">
    <template #header>
      <!-- верхняя панель -->
      <UDashboardNavbar title="Settings">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>

      <!-- тулбар с навигацией -->
      <UDashboardToolbar>
        <UNavigationMenu :items="links" highlight class="-mx-1 flex-1" />
      </UDashboardToolbar>
    </template>

    <template #body>
      <!-- область для вложенных страниц -->
      <div class="flex flex-col gap-4 sm:gap-6 lg:gap-12 w-full lg:max-w-2xl mx-auto">
        <NuxtPage />
      </div>
    </template>
  </UDashboardPanel>
</template>
