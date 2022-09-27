<script setup>
import BaseButton from "./BaseButton.vue";
import Loading from "./Loading.vue";
defineProps({
  loading: Boolean,
  color: String,
});
</script>
<template>
  <BaseButton
    :color="color"
    :disabled="loading"
    type="submit"
    :class="{ 'opacity-70': loading, 'cursor-not-allowed': loading }"
  >
    <Loading v-if="loading" />
    <slot />
  </BaseButton>
</template>
