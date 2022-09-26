<script setup>
defineProps({
  to: String,
});
</script>

<template>
  <div>
    <RouterLink v-if="to" :to="to" class="btn btn--primary">
      <slot />
    </RouterLink>
    <button else type="submit" class="btn btn--primary">
      <slot />
    </button>
  </div>
</template>
