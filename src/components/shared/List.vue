<script setup>
import IconClock from "../icons/IconClock.vue";
import IconHourGlass from "../icons/IconHourGlass.vue";
import IconCheckBadge from "../icons/IconCheckBadge.vue";
import Symbol from "../icons/symbol.vue";
defineProps({
  orders: { type: Array, default: () => [] },
});
</script>
<template>
  <div v-if="orders.length === 0" class="text-center">
    <Symbol class="w-12 h-12 opacity-40 mx-auto mb-4" />
    <p class="text-base-400 text-lg font-semibold tracking-wider">
      Você ainda não tem <br />
      chamados criados
    </p>
  </div>

  <RouterLink
    v-else
    :to="{ name: 'update', params: { id: order.id } }"
    v-for="order in orders"
    :key="order.id"
    class="flex items-center justify-between bg-base-800 rounded-md py-2 px-4 mb-2 border-l-4 hover:bg-base-700 transition-colors duration-200"
    :class="!order.status ? ' border-secondary-500' : 'border-primary-500'"
  >
    <div>
      <p class="font-semibold tracking-wider">Patrimônio: {{ order.number }}</p>
      <div class="flex items-center text-sm space-x-2 text-base-500">
        <IconClock class="w-4 h-4" />
        <span>{{ order.created_at.toDate().toLocaleString() }}</span>
      </div>
    </div>
    <div class="bg-base-900 rounded-full p-2">
      <IconHourGlass v-if="!order.status" class="w-4 h-4 text-secondary-500" />
      <IconCheckBadge v-else class="w-4 h-4 text-primary-500" />
    </div>
  </RouterLink>
</template>
