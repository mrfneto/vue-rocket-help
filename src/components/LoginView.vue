<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { loginWithEmailAndPassword } from "../firebase/useFirebase";

import Logo from "./shared/Logo.vue";
import BaseButton from "./shared/BaseButton.vue";
import BaseInput from "./shared/BaseInput.vue";

const router = useRouter();

const email = ref("mrfneto@gmail.com");
const password = ref("password");
const error = ref(null);

const handleSubmit = async () => {
  error.value = null;
  try {
    await loginWithEmailAndPassword(email.value, password.value);
    router.replace({ name: "home" });
  } catch (e) {
    console.log(e);
    error.value = "E-mail ou senha invalida.";
  }
};
</script>
<template>
  <main class="bg-zinc-800 h-screen w-full max-w-screen-sm mx-auto px-4 pt-24">
    <Logo class="mb-16" />
    <p class="font-bolt mb-6 text-center">Acesse sua conta</p>

    <form @submit.prevent="handleSubmit">
      <BaseInput
        id="email"
        type="email"
        v-model="email"
        placeholder="E-mail"
        :error="error"
      />
      <BaseInput
        id="password"
        type="password"
        v-model="password"
        placeholder="Senha"
      />
      <BaseButton color="green" class="uppercase w-full"> Entrar </BaseButton>
    </form>
  </main>
</template>
