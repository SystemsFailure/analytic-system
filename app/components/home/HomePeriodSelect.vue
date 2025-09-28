<script setup lang="ts">
import { eachDayOfInterval } from 'date-fns'
import type { Period, Range } from '~/types'

// выбранный период (daily / weekly / monthly)
const model = defineModel<Period>({ required: true })

// входной пропс — диапазон дат
const props = defineProps<{
  range: Range
}>()

// массив всех дней внутри диапазона
const days = computed(() => eachDayOfInterval(props.range))

// список доступных периодов в зависимости от длины диапазона
const periods = computed<Period[]>(() => {
  if (days.value.length <= 8) {
    return ['daily']
  }

  if (days.value.length <= 31) {
    return ['daily', 'weekly']
  }

  return ['weekly', 'monthly']
})

// следим за списком доступных периодов
// если выбранный невалидный — сбрасываем на первый
watch(periods, () => {
  if (!periods.value.includes(model.value)) {
    model.value = periods.value[0]!
  }
})
</script>

<template>
  <!-- селект для выбора периода -->
  <USelect
    v-model="model"
    :items="periods"
    variant="ghost"
    class="data-[state=open]:bg-elevated"
    :ui="{
      value: 'capitalize',
      itemLabel: 'capitalize',
      trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
    }"
  />
</template>
