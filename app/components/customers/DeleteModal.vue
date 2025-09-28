<script setup lang="ts">
// принимаем пропс с количеством элементов (по умолчанию 0)
withDefaults(defineProps<{
  count?: number
}>(), {
  count: 0
})

// состояние открытия/закрытия модалки
const open = ref(false)

// обработчик удаления (эмулируем асинхронный процесс)
async function onSubmit() {
  await new Promise(resolve => setTimeout(resolve, 1000))
  open.value = false
}
</script>

<template>
  <!-- модалка подтверждения удаления -->
  <UModal
    v-model:open="open"
    :title="`Delete ${count} customer${count > 1 ? 's' : ''}`"
    :description="`Are you sure, this action cannot be undone.`"
  >
    <!-- сюда можно прокинуть контент через слот -->
    <slot />

    <template #body>
      <div class="flex justify-end gap-2">
        <!-- кнопка отмены -->
        <UButton
          label="Cancel"
          color="neutral"
          variant="subtle"
          @click="open = false"
        />
        <!-- кнопка подтверждения -->
        <UButton
          label="Delete"
          color="error"
          variant="solid"
          loading-auto
          @click="onSubmit"
        />
      </div>
    </template>
  </UModal>
</template>
