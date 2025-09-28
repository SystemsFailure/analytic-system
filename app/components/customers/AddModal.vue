<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

// схема валидации формы
const schema = z.object({
  name: z.string().min(2, 'Too short'),
  email: z.string().email('Invalid email')
})

// состояние модалки
const open = ref(false)

type Schema = z.output<typeof schema>

// реактивное состояние формы
const state = reactive<Partial<Schema>>({
  name: undefined,
  email: undefined
})

const toast = useToast()

// обработчик отправки формы
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({
    title: 'Success',
    description: `New customer ${event.data.name} added`,
    color: 'success'
  })
  open.value = false
}
</script>

<template>
  <!-- модалка добавления нового клиента -->
  <UModal
    v-model:open="open"
    title="New customer"
    description="Add a new customer to the database"
  >
    <!-- кнопка открытия модалки -->
    <UButton label="New customer" icon="i-lucide-plus" />

    <template #body>
      <!-- форма добавления клиента -->
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <!-- поле имя -->
        <UFormField label="Name" placeholder="John Doe" name="name">
          <UInput v-model="state.name" class="w-full" />
        </UFormField>

        <!-- поле email -->
        <UFormField label="Email" placeholder="john.doe@example.com" name="email">
          <UInput v-model="state.email" class="w-full" />
        </UFormField>

        <!-- кнопки управления -->
        <div class="flex justify-end gap-2">
          <UButton
            label="Cancel"
            color="neutral"
            variant="subtle"
            @click="open = false"
          />
          <UButton
            label="Create"
            color="primary"
            variant="solid"
            type="submit"
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
