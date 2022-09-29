<script setup>
import { reactive } from "vue";
import { useOrderStore } from "../stores/order";
import Header from "./shared/Header.vue";
import Button from "./shared/Button.vue";

const orderStore = useOrderStore();

const error = reactive({
  number: "",
  problems: "",
});

const order = reactive({
  number: "",
  problems: "",
  solution: "",
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
  <div class="container min-h-screen bg-base-800 p-4 flex flex-col">
    <Header />

    <main class="flex flex-col grow">
      <form @submit.prevent="handleSubmit" class="flex flex-col grow">
        <input
          v-model="order.number"
          type="text"
          class="form__control mb-4 bg-base-900"
          placeholder="Número do patrimônio"
          :error="error.number"
        />
        <div v-if="error.number" class="form__error">
          {{ error.number }}
        </div>
        <textarea
          v-model="order.problems"
          type="textarea"
          placeholder="Descrição do problema"
          class="form__control bg-base-900 flex-1"
          :error="error.problems"
        />
        <div v-if="error.problems" class="form__error">
          {{ error.problems }}
        </div>
        <Button
          type="submit"
          :loading="orderStore.loading"
          class="bg-primary-500 hover:bg-primary-600"
        >
          Cadastrar
        </Button>
      </form>
    </main>
  </div>
</template>
