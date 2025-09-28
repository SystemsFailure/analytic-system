<script setup lang="ts">
import { sub } from 'date-fns'
import type { DropdownMenuItem } from '@nuxt/ui'
import type { Period, Range } from '~/types'

// состояние дашборда (слайдовер уведомлений)
const { isNotificationsSlideoverOpen } = useDashboard()

// элементы для выпадающего меню (создание нового)
const items = [[{
  label: 'New mail',
  icon: 'i-lucide-send',
  to: '/inbox'
}, {
  label: 'New customer',
  icon: 'i-lucide-user-plus',
  to: '/customers'
}]] satisfies DropdownMenuItem[][]

// выбранный диапазон дат
const range = shallowRef<Range>({
  start: sub(new Date(), { days: 14 }), // 14 дней назад
  end: new Date()
})

// выбранный период (день / неделя / месяц и т.д.)
const period = ref<Period>('daily')
</script>

<template>
  <!-- Основная панель "Home" -->
  <UDashboardPanel id="home">
    <template #header>
      <!-- Верхняя навигация -->
      <UDashboardNavbar title="Home" :ui="{ right: 'gap-3' }">
        <!-- Кнопка сворачивания сайдбара -->
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <!-- Иконки справа (уведомления, меню) -->
        <template #right>
          <!-- Уведомления -->
          <UTooltip text="Notifications" :shortcuts="['N']">
            <UButton
              color="neutral"
              variant="ghost"
              square
              @click="isNotificationsSlideoverOpen = true"
            >
              <UChip color="error" inset>
                <UIcon name="i-lucide-bell" class="size-5 shrink-0" />
              </UChip>
            </UButton>
          </UTooltip>

          <!-- Дропдаун с действиями -->
          <UDropdownMenu :items="items">
            <UButton icon="i-lucide-plus" size="md" class="rounded-full" />
          </UDropdownMenu>
        </template>
      </UDashboardNavbar>

      <!-- Панель фильтров -->
      <UDashboardToolbar>
        <template #left>
          <!-- выбор диапазона дат -->
          <HomeDateRangePicker v-model="range" class="-ms-1" />

          <!-- выбор периода (daily, weekly, ...) -->
          <HomePeriodSelect v-model="period" :range="range" />
        </template>
      </UDashboardToolbar>
    </template>

    <template #body>
      <!-- Основные виджеты/секции дашборда -->
      <HomeStats :period="period" :range="range" />
      <HomeChart :period="period" :range="range" />
      <HomeSales :period="period" :range="range" />
    </template>
  </UDashboardPanel>
</template>
