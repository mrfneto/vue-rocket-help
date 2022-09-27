<script setup>
import { computed } from "vue";

const props = defineProps({
  to: [String, Object],
  color: String,
  outline: Boolean,
});

const classes = computed(() => {
  let cls = [
    "items-center",
    "justify-center",
    "inline-flex",
    "font-medium",
    "rounded-md",
    "transition-colors",
    "duration-200",
    "hover:bg-zinc-700 p-2",
  ];
  if (props.outline) {
    if (props.color === "green") {
      return [...cls, "border", "border-emerald-500", "text-emerald-300"];
    }
    if (props.color === "yellow") {
      return [...cls, "border", "border-yellow-500", "text-yellow-300"];
    }
    if (props.color === "base") {
      return [...cls, "border", "border-zinc-500", "text-zinc-300"];
    }
  } else {
    if (props.color === "green") {
      return [...cls, "bg-emerald-500", " hover:bg-emerald-600"];
    } else if (props.color === "base") {
      return [...cls, "bg-zinc-800", " hover:bg-zinc-700"];
    } else {
      return cls;
    }
  }
});
</script>
<template>
  <RouterLink v-if="to" :to="to" :class="classes">
    <slot />
  </RouterLink>
  <button v-else :class="classes">
    <slot />
  </button>
</template>
