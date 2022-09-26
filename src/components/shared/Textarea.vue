<script setup>
inheritAttrs: false;
defineProps({
  id: String,
  label: String,
  modelValue: { String, Number },
  error: String,
});
</script>
<template>
  <div :class="$attrs.class">
    <label v-if="label" :for="id" class="form__label">{{ label }}</label>
    <textarea
      :class="['form__input', { error: error }]"
      v-bind="{ ...$attrs, class: null }"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <div v-if="error" class="form__error">{{ error }}</div>
  </div>
</template>
