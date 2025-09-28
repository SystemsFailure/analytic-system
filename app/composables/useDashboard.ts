import { createSharedComposable } from '@vueuse/core'

// общий composable для дашборда
const _useDashboard = () => {
  const route = useRoute() // текущий роут
  const router = useRouter() // роутер для навигации
  const isNotificationsSlideoverOpen = ref(false) // состояние слидовера уведомлений

  // горячие клавиши для навигации и открытия уведомлений
  defineShortcuts({
    'g-h': () => router.push('/'), // перейти на главную
    'g-i': () => router.push('/inbox'), // перейти в почту
    'g-c': () => router.push('/customers'), // перейти к клиентам
    'g-s': () => router.push('/settings'), // перейти в настройки
    'n': () => isNotificationsSlideoverOpen.value = !isNotificationsSlideoverOpen.value // переключить слайдовое окно уведомлений
  })

  // закрытие слидовера при смене роута
  watch(() => route.fullPath, () => {
    isNotificationsSlideoverOpen.value = false
  })

  return {
    isNotificationsSlideoverOpen
  }
}

// создаём shared composable, доступный везде
export const useDashboard = createSharedComposable(_useDashboard)
