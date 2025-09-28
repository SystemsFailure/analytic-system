<script setup lang="ts">
import { eachDayOfInterval, eachWeekOfInterval, eachMonthOfInterval, format } from 'date-fns'
import { VisXYContainer, VisLine, VisAxis, VisArea, VisCrosshair, VisTooltip } from '@unovis/vue'
import type { Period, Range } from '~/types'

const cardRef = useTemplateRef<HTMLElement | null>('cardRef')

const props = defineProps<{
  period: Period
  range: Range
}>()

type DataRecord = {
  date: Date
  amount: number
}

const { width } = useElementSize(cardRef)

const data = ref<DataRecord[]>([])

// пересчитываем данные при смене периода или диапазона
watch([() => props.period, () => props.range], () => {
  // выбираем генератор дат в зависимости от периода
  const dates = ({
    daily: eachDayOfInterval,
    weekly: eachWeekOfInterval,
    monthly: eachMonthOfInterval
  } as Record<Period, typeof eachDayOfInterval>)[props.period](props.range)

  // моковые значения (рандомные суммы)
  const min = 1000
  const max = 10000

  data.value = dates.map(date => ({ date, amount: Math.floor(Math.random() * (max - min + 1)) + min }))
}, { immediate: true })

// ось X — индекс точки
const x = (_: DataRecord, i: number) => i
// ось Y — значение amount
const y = (d: DataRecord) => d.amount

// сумма всех значений (для отображения сверху)
const total = computed(() => data.value.reduce((acc: number, { amount }) => acc + amount, 0))

// форматирование валюты
const formatNumber = new Intl.NumberFormat('en', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format

// форматирование дат в зависимости от выбранного периода
const formatDate = (date: Date): string => {
  return ({
    daily: format(date, 'd MMM'),
    weekly: format(date, 'd MMM'),
    monthly: format(date, 'MMM yyy')
  })[props.period]
}

// подписи для оси X (показываем только крайние и промежуточные даты)
const xTicks = (i: number) => {
  if (i === 0 || i === data.value.length - 1 || !data.value[i]) {
    return ''
  }
  return formatDate(data.value[i].date)
}

// шаблон текста для тултипа/крестика
const template = (d: DataRecord) => `${formatDate(d.date)}: ${formatNumber(d.amount)}`
</script>

<template>
  <UCard ref="cardRef" :ui="{ root: 'overflow-visible', body: '!px-0 !pt-0 !pb-3' }">
    <template #header>
      <div>
        <p class="text-xs text-muted uppercase mb-1.5">
          Revenue
        </p>
        <!-- итоговая сумма по всем данным -->
        <p class="text-3xl text-highlighted font-semibold">
          {{ formatNumber(total) }}
        </p>
      </div>
    </template>

    <!-- контейнер для графика -->
    <VisXYContainer
      :data="data"
      :padding="{ top: 40 }"
      class="h-96"
      :width="width"
    >
      <!-- линия графика -->
      <VisLine
        :x="x"
        :y="y"
        color="var(--ui-primary)"
      />
      <!-- подложка под линией -->
      <VisArea
        :x="x"
        :y="y"
        color="var(--ui-primary)"
        :opacity="0.1"
      />

      <!-- ось X с кастомными подписями -->
      <VisAxis
        type="x"
        :x="x"
        :tick-format="xTicks"
      />

      <!-- вертикальная линия + тултип при наведении -->
      <VisCrosshair
        color="var(--ui-primary)"
        :template="template"
      />

      <VisTooltip />
    </VisXYContainer>
  </UCard>
</template>

<style scoped>
.unovis-xy-container {
  /* кастомизация цветов для осей, крестика и тултипа */
  --vis-crosshair-line-stroke-color: var(--ui-primary);
  --vis-crosshair-circle-stroke-color: var(--ui-bg);

  --vis-axis-grid-color: var(--ui-border);
  --vis-axis-tick-color: var(--ui-border);
  --vis-axis-tick-label-color: var(--ui-text-dimmed);

  --vis-tooltip-background-color: var(--ui-bg);
  --vis-tooltip-border-color: var(--ui-border);
  --vis-tooltip-text-color: var(--ui-text-highlighted);
}
</style>
