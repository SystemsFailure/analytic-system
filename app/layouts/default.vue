<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const toast = useToast()

const open = ref(false)

//* Список ссылок на сайдбаре */
const links = [[{
  label: 'Home', // ссылка на главную
  icon: 'i-lucide-house',
  to: '/',
  onSelect: () => {
    open.value = false // закрыть сайдбар при выборе
  }
}, {
  label: 'Chats', // входящие
  icon: 'i-lucide-message-circle',
  to: '/chats',
  badge: '24', // бейдж с количеством
  onSelect: () => {
    open.value = false
  }
}, {
  label: 'Inbox', // входящие
  icon: 'i-lucide-inbox',
  to: '/inbox',
  badge: '4', // бейдж с количеством
  onSelect: () => {
    open.value = false
  }
}, {
  label: 'Customers', // клиенты
  icon: 'i-lucide-users',
  to: '/customers',
  onSelect: () => {
    open.value = false
  }
}, {
  label: 'Settings', // группа с подпунктами
  to: '/settings',
  icon: 'i-lucide-settings',
  defaultOpen: true, // по умолчанию открыта
  type: 'trigger', // раскрывающийся элемент
  children: [{
    label: 'General', // общие настройки
    to: '/settings',
    exact: true,
    onSelect: () => {
      open.value = false
    }
  }, {
    label: 'Members', // пользователи
    to: '/settings/members',
    onSelect: () => {
      open.value = false
    }
  }, {
    label: 'Notifications', // уведомления
    to: '/settings/notifications',
    onSelect: () => {
      open.value = false
    }
  }, {
    label: 'Security', // безопасность
    to: '/settings/security',
    onSelect: () => {
      open.value = false
    }
  }]
}]
// , [{
//   label: 'Feedback', // фидбек
//   icon: 'i-lucide-message-circle',
//   to: 'https://github.com/nuxt-ui-templates/dashboard',
//   target: '_blank' // открыть в новой вкладке
// }, {
//   label: 'Help & Support', // помощь
//   icon: 'i-lucide-info',
//   to: 'https://github.com/nuxt-ui-templates/dashboard',
//   target: '_blank'
// }]
] satisfies NavigationMenuItem[][]

//* Группы для меню (например, быстрый доступ + ссылка на код) */
const groups = computed(() => [{
  id: 'links',
  label: 'Go to', // навигация
  items: links.flat() // разворачиваем вложенные массивы
}, {
  id: 'code',
  label: 'Code', // секция для ссылки на исходник
  items: [{
    id: 'source',
    label: 'View page source',
    icon: 'i-simple-icons-github',
    to: `https://github.com/nuxt-ui-templates/dashboard/blob/main/app/pages${route.path === '/' ? '/index' : route.path}.vue`,
    target: '_blank'
  }]
}])

onMounted(async () => {
  // читаем куку согласия
  const cookie = useCookie('cookie-consent')

  // если уже принял - ничего не делаем
  if (cookie.value === 'accepted') {
    return
  }

  // показываем тост с уведомлением про куки
  toast.add({
    title: 'We use first-party cookies to enhance your experience on our website.',
    duration: 0, // висит пока не нажмут
    close: false, // нельзя просто закрыть
    actions: [{
      label: 'Accept',
      color: 'neutral',
      variant: 'outline',
      onClick: () => {
        cookie.value = 'accepted' // сохраняем согласие
      }
    }, {
      label: 'Opt out',
      color: 'neutral',
      variant: 'ghost'
      // тут просто закрытие без записи
    }]
  })
})
</script>

<template>
  <!-- Основная обертка для дашборда -->
  <UDashboardGroup unit="rem">
    <!-- Сайдбар: можно скрывать/сворачивать/ресайзить -->
    <UDashboardSidebar
      id="default"
      v-model:open="open"
      collapsible
      resizable
      class="bg-elevated/25"
      :ui="{ footer: 'lg:border-t lg:border-default' }"
    >
      <!-- Хедер сайдбара (меню команд) -->
      <template #header="{ collapsed }">
        <TeamsMenu :collapsed="collapsed" />
      </template>

      <!-- Основная часть сайдбара -->
      <template #default="{ collapsed }">
        <!-- Поиск -->
        <UDashboardSearchButton :collapsed="collapsed" class="bg-transparent ring-default" />

        <!-- Первая группа ссылок -->
        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[0]"
          orientation="vertical"
          tooltip
          popover
        />

        <!-- Вторая группа ссылок (внизу) -->
        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[1]"
          orientation="vertical"
          tooltip
          class="mt-auto"
        />
      </template>

      <!-- Футер сайдбара (меню пользователя) -->
      <template #footer="{ collapsed }">
        <UserMenu :collapsed="collapsed" />
      </template>
    </UDashboardSidebar>

    <!-- Глобальный поиск -->
    <UDashboardSearch :groups="groups" />

    <!-- Слот для контента страницы -->
    <slot />

    <!-- Панель уведомлений -->
    <NotificationsSlideover />
  </UDashboardGroup>
</template>
