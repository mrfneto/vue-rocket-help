<script setup>
import Symbol from "../icons/symbol.vue";
defineProps({
  inline: Boolean,
});
</script>
<template>
  <div
    :class="[
      'flex items-center space-x-2',
      inline ? 'flex-row ' : ' flex-col  space-y-2',
    ]"
  >
    <Symbol :class="inline ? 'w-6 h-6' : 'w-12 h-12'" />
    <h1
      :class="[
        inline ? 'text-xl' : 'text-2xl',
        'text-brend-600 tracking-wider',
      ]"
    >
      Rocket<span class="text-primary-600">Help</span>
    </h1>
  </div>
</template>
