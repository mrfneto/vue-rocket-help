<script setup>
import { ref } from "vue";
import Symbol from "./icons/symbol.vue";

const email = ref("");
const password = ref("");

const handleSubmit = () => {
  console.log(email.value, password.value);
};
</script>
<template>
  <main
    class="bg-zinc-800 h-screen w-full max-w-screen-sm mx-auto px-4 text-center pt-24"
  >
    <div class="flex flex-col items-center space-y-2 mb-16">
      <Symbol class="w-12 h-12" />
      <h1 class="text-2xl text-violet-600 tracking-wider">
        Rocket<span class="text-emerald-600">Help</span>
      </h1>
    </div>
    <p class="font-bolt mb-6">Acesse sua conta</p>

    <form @submit.prevent="handleSubmit">
      <input
        type="email"
        placeholder="E-mail"
        class="bg-zinc-900 rounded-md w-full mb-4 border-zinc-900 focus:border-emerald-300 focus:ring-emerald-300"
        required
        v-model.trim="email"
      />
      <input
        type="password"
        placeholder="Senha"
        class="bg-zinc-900 rounded-md w-full mb-4 border-zinc-900 focus:border-emerald-300 focus:ring-emerald-300"
        required
        v-model.trim="password"
      />
      <button
        type="submit"
        class="block w-full bg-emerald-500 text-zinc-100 font bold py-2.5 rounded-md uppercase hover:bg-emerald-600 transition-colors duration-200"
      >
        entrar
      </button>
    </form>
  </main>
</template>
