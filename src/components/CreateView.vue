<script setup>
import { reactive } from "vue";
import { useOrderStore } from "../stores/order";
import BaseButton from "./shared/BaseButton.vue";
import IconChevronLeft from "./icons/IconChevronLeft.vue";
import BaseInput from "./shared/BaseInput.vue";
import LoadingButton from "./shared/LoadingButton.vue";

const orderStore = useOrderStore();

const error = reactive({
  number: "",
  problems: "",
});

const order = reactive({
  number: "",
  problems: "",
  soluction: "",
  status: false,
  created_at: new Date(),
  updated_at: "",
});

const handleSubmit = async () => {
  if (order.number === "") {
    error.number = "Preencha este campo";
    return;
  }
  if (order.problems === "") {
    error.problems = "Preencha este campo";
    return;
  }
  await orderStore.createOrder(order);
};
</script>
<template>
  <div class="min-h-screen bg-zinc-800 p-4 flex flex-col">
    <header class="relative mb-2 flex items-center h-16">
      <BaseButton :to="{ name: 'home' }" class="absolute">
        <IconChevronLeft class="w-4 h-4" />
      </BaseButton>
      <h1 class="text-center w-full">Solicitação</h1>
    </header>
    <main class="flex flex-col grow">
      <form @submit.prevent="handleSubmit" class="flex flex-col grow">
        <BaseInput
          v-model="order.number"
          placeholder="Número do patrimônio"
          :error="error.number"
        />
        <BaseInput
          v-model="order.problems"
          type="textarea"
          placeholder="Descrição do problema"
          class="flex-1"
          :error="error.problems"
        />
        <LoadingButton :loading="orderStore.loading" color="green">
          Cadastrar
        </LoadingButton>
      </form>
    </main>
  </div>
</template>
