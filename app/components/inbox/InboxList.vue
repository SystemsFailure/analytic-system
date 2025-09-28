<script setup lang="ts">
import { format, isToday } from 'date-fns'
import type { Mail } from '~/types'

// список писем как пропс
const props = defineProps<{
  mails: Mail[]
}>()

// ссылки на DOM-элементы писем (для скролла)
const mailsRefs = ref<Element[]>([])

// выбранное письмо
const selectedMail = defineModel<Mail | null>()

// при смене выбранного письма — скроллим к нему
watch(selectedMail, () => {
  if (!selectedMail.value) return
  const ref = mailsRefs.value[selectedMail.value.id]
  if (ref) {
    ref.scrollIntoView({ block: 'nearest' })
  }
})

// горячие клавиши для навигации по письмам
defineShortcuts({
  arrowdown: () => {
    const index = props.mails.findIndex(mail => mail.id === selectedMail.value?.id)

    if (index === -1) {
      selectedMail.value = props.mails[0] // если ничего не выбрано — берём первое
    } else if (index < props.mails.length - 1) {
      selectedMail.value = props.mails[index + 1]
    }
  },
  arrowup: () => {
    const index = props.mails.findIndex(mail => mail.id === selectedMail.value?.id)

    if (index === -1) {
      selectedMail.value = props.mails[props.mails.length - 1] // если ничего не выбрано — берём последнее
    } else if (index > 0) {
      selectedMail.value = props.mails[index - 1]
    }
  }
})
</script>

<template>
  <!-- список писем -->
  <div class="overflow-y-auto divide-y divide-default">
    <div
      v-for="(mail, index) in mails"
      :key="index"
      :ref="el => { mailsRefs[mail.id] = el as Element }"
    >
      <!-- карточка письма -->
      <div
        class="p-4 sm:px-6 text-sm cursor-pointer border-l-2 transition-colors"
        :class="[
          mail.unread ? 'text-highlighted' : 'text-toned)',
          selectedMail && selectedMail.id === mail.id
            ? 'border-primary bg-primary/10'
            : 'border-(--ui-bg) hover:border-primary hover:bg-primary/5'
        ]"
        @click="selectedMail = mail"
      >
        <!-- шапка письма -->
        <div class="flex items-center justify-between" :class="[mail.unread && 'font-semibold']">
          <div class="flex items-center gap-3">
            {{ mail.from.name }}

            <!-- индикатор непрочитанного -->
            <UChip v-if="mail.unread" />
          </div>

          <!-- дата: если сегодня — показываем время, иначе дату -->
          <span>
            {{ isToday(new Date(mail.date))
              ? format(new Date(mail.date), 'HH:mm')
              : format(new Date(mail.date), 'dd MMM') }}
          </span>
        </div>

        <!-- тема письма -->
        <p class="truncate" :class="[mail.unread && 'font-semibold']">
          {{ mail.subject }}
        </p>

        <!-- тело письма (одна строка) -->
        <p class="text-dimmed line-clamp-1">
          {{ mail.body }}
        </p>
      </div>
    </div>
  </div>
</template>
