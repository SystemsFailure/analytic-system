<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { breakpointsTailwind } from '@vueuse/core'
import type { Mail } from '~/types'

// табы для списка писем
const tabItems = [{
  label: 'All',
  value: 'all'
}, {
  label: 'Unread',
  value: 'unread'
}]
const selectedTab = ref('all')

// загрузка писем
const { data: mails } = await useFetch<Mail[]>('/api/mails', { default: () => [] })

// фильтр по выбранному табу
const filteredMails = computed(() => {
  if (selectedTab.value === 'unread') {
    return mails.value.filter(mail => !!mail.unread)
  }
  return mails.value
})

// текущее выбранное письмо
const selectedMail = ref<Mail | null>()

// состояние панели письма (открыта/закрыта)
const isMailPanelOpen = computed({
  get() {
    return !!selectedMail.value
  },
  set(value: boolean) {
    if (!value) {
      selectedMail.value = null
    }
  }
})

// сбрасываем выбранное письмо, если его нет в отфильтрованных
watch(filteredMails, () => {
  if (!filteredMails.value.find(mail => mail.id === selectedMail.value?.id)) {
    selectedMail.value = null
  }
})

// брейкпоинты для адаптива
const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakpoints.smaller('lg')
</script>

<template>
  <!-- панель "Inbox" со списком -->
  <UDashboardPanel
    id="inbox-1"
    :default-size="25"
    :min-size="20"
    :max-size="30"
    resizable
  >
    <UDashboardNavbar title="Inbox">
      <!-- кнопка сворачивания сайдбара -->
      <template #leading>
        <UDashboardSidebarCollapse />
      </template>

      <!-- бейдж с количеством писем -->
      <template #trailing>
        <UBadge :label="filteredMails.length" variant="subtle" />
      </template>

      <!-- табы: все / непрочитанные -->
      <template #right>
        <UTabs
          v-model="selectedTab"
          :items="tabItems"
          :content="false"
          size="xs"
        />
      </template>
    </UDashboardNavbar>

    <!-- список писем -->
    <InboxList v-model="selectedMail" :mails="filteredMails" />
  </UDashboardPanel>

  <!-- открытое письмо (desktop) -->
  <InboxMail v-if="selectedMail" :mail="selectedMail" @close="selectedMail = null" />
  <div v-else class="hidden lg:flex flex-1 items-center justify-center">
    <UIcon name="i-lucide-inbox" class="size-32 text-dimmed" />
  </div>

  <!-- открытое письмо (mobile, через слайдовер) -->
  <ClientOnly>
    <USlideover v-if="isMobile" v-model:open="isMailPanelOpen">
      <template #content>
        <InboxMail v-if="selectedMail" :mail="selectedMail" @close="selectedMail = null" />
      </template>
    </USlideover>
  </ClientOnly>
</template>
