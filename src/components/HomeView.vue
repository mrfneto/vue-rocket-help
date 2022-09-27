<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../stores";
import { logoutUser } from "../firebase/useFirebase";
import Logo from "./shared/Logo.vue";
import BaseButton from "./shared/BaseButton.vue";
import BaseList from "./shared/BaseList.vue";
import IconLogout from "./icons/IconLogout.vue";

const router = useRouter();
const store = useStore();

const active = ref(true);

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
  <div class="min-h-screen flex flex-col">
    <header class="bg-zinc-800 flex items-center justify-between h-16 px-4">
      <Logo inline />
      <BaseButton @click="logout">
        <IconLogout class="w-5 h-5" />
      </BaseButton>
    </header>
    <main class="flex-1 py-8 px-4 overflow-y-auto">
      <div class="flex items-center justify-between mb-6">
        <h2>Solicitações</h2>
        <p class="text-sm text-zinc-400">{{store.orders.length}}</p>
      </div>
      <div class="flex items-center space-x-2 mb-8">
        <BaseButton
          @click="active = false"
          :outline="!active"
          :color="active ? 'base' : 'yellow'"
          class="w-full text-zinc-500"
        >
          Em andamento
        </BaseButton>
        <BaseButton
          @click="active = true"
          :outline="active"
          :color="active ? 'green' : 'base'"
          class="w-full text-zinc-500"
        >
          Finalizado
        </BaseButton>
      </div>

      <BaseList :orders="store.orders" />
    </main>
    <footer class="py-2 px-4">
      <BaseButton to="#" color="green" class="w-full">
        Nova Solicitação
      </BaseButton>
    </footer>
  </div>
</template>
