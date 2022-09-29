<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { useOrderStore } from "../stores/order";
import Header from "./shared/Header.vue";
import Button from "./shared/Button.vue";
import Loading from "./shared/Loading.vue";
import Card from "./shared/Card.vue";
import IconDesktop from "./icons/IconDesktop.vue";
import IconDocument from "./icons/IconDocument.vue";
import IconCheckBadge from "./icons/IconCheckBadge.vue";

const route = useRoute();
const orderStore = useOrderStore();

const error = reactive({
  solution: "",
});

const order = ref({});

const orderId = computed(() => {
  return route.params.id;
});

onMounted(async () => {
  order.value = await orderStore.getOrder(orderId.value);
});

const handleSubmit = async () => {
  if (order.value.solution === "") {
    error.solution = "Preencha este campo";
    return;
  }
  order.value.updated_at = new Date();
  order.value.status = true;
  await orderStore.updateOrder(order.value, orderId.value);
};
</script>
<template>
  <div class="container min-h-screen p-4 flex flex-col">
    <Header />

    <main class="flex flex-col grow">
      <div class="flex justify-center py-4" v-if="orderStore.loading">
        <Loading />
      </div>
      <form v-else @submit.prevent="handleSubmit" class="flex flex-col grow">
        <Card class="bg-base-800 mb-4">
          <template #header>
            <IconDesktop class="w-4 h-4 text-brend-500" />
            <span>Equipamento</span>
          </template>
          <template #content>
            <p class="font-medium text-sm">Patrimônio: {{ order.number }}</p>
          </template>
        </Card>
        <Card class="bg-base-800 mb-4">
          <template #header>
            <IconDocument class="w-4 h-4 text-brend-500" />
            <span>Descrição do Problema</span>
          </template>
          <template #content>
            <p class="font-medium text-sm">{{ order.problems }}</p>
          </template>
          <template #footer>
            <p>Registrado em: {{ order.created_at }}</p>
          </template>
        </Card>
        <Card class="bg-base-800 mb-4">
          <template #header>
            <IconCheckBadge class="w-4 h-4 text-brend-500" />
            <span>Solução</span>
          </template>
          <template #content>
            <textarea
              rows="5"
              v-model="order.solution"
              type="textarea"
              placeholder="Descrição da solução"
              class="form__control bg-base-800 border-none focus:outline-none focus:ring-0"
              :error="error.solution"
            />
            <div v-if="error.solution" class="form__error">
              {{ error.solution }}
            </div>
          </template>
          <template #footer v-if="order.updated_at">
            <p>Registrado em: {{ order.updated_at }}</p>
          </template>
        </Card>

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
