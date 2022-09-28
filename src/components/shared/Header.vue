<script setup>
import Button from "./Button.vue";
import IconChevronLeft from "../icons/IconChevronLeft.vue";
</script>
<template>
  <header class="relative mb-2 flex items-center h-16">
    <Button :to="{ name: 'home' }" class="absolute hover:bg-base-800">
      <IconChevronLeft class="w-4 h-4" />
    </Button>
    <h1 class="text-center w-full">Solicitação</h1>
  </header>
</template>
