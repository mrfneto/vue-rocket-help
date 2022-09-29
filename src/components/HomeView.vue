<script setup>
import { ref, computed, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useOrderStore } from "../stores/order";
import { logoutUser } from "../firebase/useFirebase";
import Logo from "./shared/Logo.vue";
import IconLogout from "./icons/IconLogout.vue";
import Loading from "./shared/Loading.vue";
import List from "./shared/List.vue";
import Button from "./shared/Button.vue";

const router = useRouter();
const orderStore = useOrderStore();
const status = ref(false);
const limit = ref(4);

watchEffect(() => {
  orderStore.getOrders(status.value, limit.value);
});

const handleLimit = () => {
  limit.value = limit.value + 4;
  console.log(limit.value);
};

const logout = async () => {
  try {
    await logoutUser();
    router.replace({ name: "login" });
  } catch (error) {
    alert(error.message);
  }
};
</script>

<template>
  <div class="container min-h-screen flex flex-col">
    <header class="bg-base-800 flex items-center justify-between h-16 px-4">
      <Logo inline />
      <Button @click="logout" class="hover:bg-base-900">
        <IconLogout class="w-5 h-5" />
      </Button>
    </header>
    <main class="flex-1 py-4 px-4 overflow-y-auto">
      <div class="flex items-center justify-between mb-6">
        <h2>Solicitações</h2>
        <p class="text-sm text-zinc-400">
          {{ orderStore.orders.length }}
        </p>
      </div>

      <div class="flex items-center space-x-2 mb-4">
        <Button
          @click="status = false"
          :class="
            status
              ? 'bg-base-800 hover:bg-base-700'
              : 'border border-secondary-700 text-secondary-700 hover:bg-base-800'
          "
          class="w-full text-base-500 hover:bg-base-700"
        >
          Em andamento
        </Button>
        <Button
          @click="status = true"
          :class="
            status
              ? 'border border-primary-700 text-primary-700 hover:bg-base-800'
              : 'bg-base-800 hover:bg-base-700'
          "
          class="w-full text-base-500 hover:bg-base-700"
        >
          Finalizado
        </Button>
      </div>

      <div class="flex justify-center py-4" v-if="orderStore.loading">
        <Loading />
      </div>
      <div v-else>
        <List v-if="!orderStore.loading" :orders="orderStore.orders" />

        <div class="flex items-center justify-center">
          <Button
            v-if="orderStore.orders.length >= limit"
            @click="handleLimit"
            class="bg-base-800 px-6"
            >Mais</Button
          >
        </div>
      </div>
    </main>
    <footer class="py-2 px-4">
      <Button
        :to="{ name: 'create' }"
        class="w-full bg-primary-500 hover:bg-primary-600"
      >
        Nova Solicitação
      </Button>
    </footer>
  </div>
</template>
