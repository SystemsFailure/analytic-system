<template>
  <!-- карточка для блока Revenue -->
  <UCard class="shrink-0" :ui="{ body: '!px-0 !pt-0 !pb-3' }">
    <!-- шапка карточки -->
    <template #header>
      <div>
        <!-- заголовок -->
        <p class="text-xs text-muted uppercase mb-1.5">
          Revenue
        </p>
        <!-- сумма (пока заглушка) -->
        <p class="text-3xl text-highlighted font-semibold">
          ---
        </p>
      </div>
    </template>

    <!-- заглушка под график -->
    <div class="h-96" />
  </UCard>
</template>
