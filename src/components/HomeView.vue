<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../stores";
import { logoutUser } from "../firebase/useFirebase";
import Logo from "./shared/Logo.vue";
import LogoutIcon from "./icons/LogoutIcon.vue";
import Symbol from "./icons/symbol.vue";
import IconClock from "./icons/IconClock.vue";
import IconHourGlass from "./icons/IconHourGlass.vue";
import IconCheckBadge from "./icons/IconCheckBadge.vue";

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
      <button @click="logout" class="btn btn--base">
        <LogoutIcon class="w-5 h-5" />
      </button>
    </header>
    <main class="flex-1 py-8 px-4 overflow-y-auto">
      <div class="flex items-center justify-between mb-6">
        <h2>Solicitações</h2>
        <p class="text-sm text-zinc-400">0</p>
      </div>
      <div class="flex items-center space-x-2 mb-8">
        <button
          class="btn w-full text-sm btn--secondary"
          :class="active ? '' : 'btn__outline--secondary'"
          @click="active = false"
        >
          Em andamento
        </button>
        <button
          class="btn btn--secondary w-full text-sm"
          :class="active ? 'btn__outline--primary' : ''"
          @click="active = true"
        >
          Finalizado
        </button>
      </div>
      <div v-if="store.orders.length === 0" class="text-center">
        <Symbol class="w-12 h-12 opacity-40 mx-auto mb-4" />
        <p class="text-zinc-400 text-lg font-semibold tracking-wider">
          Você ainda não tem <br />
          chamados criados
        </p>
      </div>

      <div
        v-else
        v-for="order in store.orders"
        :key="order.id"
        class="flex items-center justify-between bg-zinc-800 rounded-md p-4 mb-2 border-l-4"
        :class="!order.status ? ' border-yellow-500' : 'border-emerald-500'"
      >
        <div>
          <p class="font-semibold tracking-wider">
            Patrimônio: {{ order.number }}
          </p>
          <div class="flex items-center text-sm space-x-2 text-zinc-500">
            <IconClock class="w-4 h-4" />
            <span>{{ order.created_at }}</span>
          </div>
        </div>
        <div class="bg-zinc-900 rounded-full p-2">
          <IconHourGlass v-if="!order.status" class="w-5 h-5 text-yellow-500" />
          <IconCheckBadge v-else class="w-5 h-5 text-emerald-500" />
        </div>
      </div>
    </main>
    <footer class="py-2 px-4">
      <button to="#" class="btn btn--primary w-full">Nova Solicitação</button>
    </footer>
  </div>
</template>
