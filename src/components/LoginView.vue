<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { loginWithEmailAndPassword } from "../firebase/useFirebase";

import Logo from "./shared/Logo.vue";
import Button from "./shared/Button.vue";

const router = useRouter();

const email = ref("mrfneto@gmail.com");
const password = ref("password");
const error = ref(null);
const loading = ref(false);

const handleSubmit = async () => {
  error.value = null;
  loading.value = true;
  try {
    await loginWithEmailAndPassword(email.value, password.value);
    router.replace({ name: "home" });
  } catch (e) {
    console.log(e);
    error.value = "E-mail ou senha invalida.";
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <main class="bg-zinc-800 h-screen container  px-4 pt-24">
    <Logo class="mb-16" />
    <p class="font-bolt mb-6 text-center">Acesse sua conta</p>

    <form @submit.prevent="handleSubmit">
      <input
        id="email"
        type="email"
        v-model="email"
        placeholder="E-mail"
        :error="error"
        class="form__control bg-base-900 mb-4"
      />
      <input
        id="password"
        type="password"
        v-model="password"
        placeholder="Senha"
        class="form__control bg-base-900 mb-4"
      />
      <Button
        type="submit"
        :loading="loading"
        class="bg-primary-500 hover:bg-primary-600 uppercase w-full"
      >
        Entrar
      </Button>
    </form>
  </main>
</template>
