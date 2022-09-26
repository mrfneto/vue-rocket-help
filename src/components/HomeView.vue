<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { logoutUser } from "../firebase/useFirebase";
import Logo from "./shared/Logo.vue";
import LogoutIcon from "./icons/LogoutIcon.vue";

const router = useRouter();

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
    <main class="flex-1 py-8 px-4">
      <section class="flex items-center justify-between mb-6">
        <h2>Solicitações</h2>
        <p class="text-sm text-zinc-400">0</p>
      </section>
      <section class="flex items-center space-x-2">
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
      </section>
    </main>
    <footer>footer</footer>
  </div>
</template>
