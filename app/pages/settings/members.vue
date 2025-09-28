<script setup lang="ts">
import type { Member } from '~/types'

// загружаем список участников
const { data: members } = await useFetch<Member[]>('/api/members', { default: () => [] })

// поисковая строка
const q = ref('')

// фильтрация участников по имени или username
const filteredMembers = computed(() => {
  return members.value.filter((member) => {
    return (
      member.name.search(new RegExp(q.value, 'i')) !== -1
      || member.username.search(new RegExp(q.value, 'i')) !== -1
    )
  })
})
</script>

<template>
  <div>
    <!-- заголовок страницы с кнопкой приглашения -->
    <UPageCard
      title="Members"
      description="Invite new members by email address."
      variant="naked"
      orientation="horizontal"
      class="mb-4"
    >
      <UButton
        label="Invite people"
        color="neutral"
        class="w-fit lg:ms-auto"
      />
    </UPageCard>

    <!-- карточка со строкой поиска и списком участников -->
    <UPageCard
      variant="subtle"
      :ui="{
        container: 'p-0 sm:p-0 gap-y-0',
        wrapper: 'items-stretch',
        header: 'p-4 mb-0 border-b border-default'
      }"
    >
      <template #header>
        <!-- поиск участников -->
        <UInput
          v-model="q"
          icon="i-lucide-search"
          placeholder="Search members"
          autofocus
          class="w-full"
        />
      </template>

      <!-- список участников -->
      <SettingsMembersList :members="filteredMembers" />
    </UPageCard>
  </div>
</template>
