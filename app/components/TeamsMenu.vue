<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

// пропс для коллапса кнопки
defineProps<{
  collapsed?: boolean
}>()

// список команд
const teams = ref([
  { label: 'Nuxt', avatar: { src: 'https://github.com/nuxt.png', alt: 'Nuxt' } },
  { label: 'NuxtHub', avatar: { src: 'https://github.com/nuxt-hub.png', alt: 'NuxtHub' } },
  { label: 'NuxtLabs', avatar: { src: 'https://github.com/nuxtlabs.png', alt: 'NuxtLabs' } }
])

// выбранная команда
const selectedTeam = ref(teams.value[0])

// элементы дропдауна: команды + дополнительные действия
const items = computed<DropdownMenuItem[][]>(() => {
  return [
    teams.value.map(team => ({
      ...team,
      onSelect() { selectedTeam.value = team } // выбор команды
    })),
    [
      { label: 'Create team', icon: 'i-lucide-circle-plus' },
      { label: 'Manage teams', icon: 'i-lucide-cog' }
    ]
  ]
})
</script>

<template>
  <!-- дропдаун выбора команды -->
  <UDropdownMenu
    :items="items"
    :content="{ align: 'center', collisionPadding: 12 }"
    :ui="{ content: collapsed ? 'w-40' : 'w-(--reka-dropdown-menu-trigger-width)' }"
  >
    <!-- кнопка триггер дропдауна -->
    <UButton
      v-bind="{
        ...selectedTeam,
        label: collapsed ? undefined : selectedTeam?.label,
        trailingIcon: collapsed ? undefined : 'i-lucide-chevrons-up-down'
      }"
      color="neutral"
      variant="ghost"
      block
      :square="collapsed"
      class="data-[state=open]:bg-elevated"
      :class="[!collapsed && 'py-2']"
      :ui="{ trailingIcon: 'text-dimmed' }"
    />
  </UDropdownMenu>
</template>
