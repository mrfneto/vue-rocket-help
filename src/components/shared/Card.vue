<script setup>
import { useSlots } from "vue";

const slots = useSlots();
</script>
<template>
  <div class="p-4 rounded-md shadow-md">
    <div
      class="flex items-center space-x-2 text-xs uppercase text-base-500 mb-2"
    >
      <slot name="header" />
    </div>
    <div class="text-sm text-base-300 font-medium tracking-wide mb-2">
      <slot name="content" />
    </div>
    <div
      class="flex items-center space-x-2 text-xs text-base-500 border-t border-base-600 pt-2"
      v-if="slots.footer"
    >
      <slot name="footer" />
    </div>
  </div>
</template>
