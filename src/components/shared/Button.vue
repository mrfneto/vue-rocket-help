<script setup>
import Loading from "./Loading.vue";

defineProps({
  to: [String, Object],
  loading: Boolean,
});
</script>
<template>
  <RouterLink v-if="to" :to="to" class="btn">
    <slot />
  </RouterLink>
  <button
    v-else
    class="btn"
    :disabled="loading"
    :class="{ 'opacity-70': loading, 'cursor-not-allowed': loading }"
  >
    <Loading v-if="loading" />
    <slot v-else />
  </button>
</template>
<style>
.btn {
  @apply items-center justify-center inline-flex font-medium rounded-md transition-colors duration-200 p-2;
}
</style>
Footer
