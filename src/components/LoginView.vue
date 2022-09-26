<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { loginWithEmailAndPassword } from "../firebase/useFirebase";

import Logo from "./shared/Logo.vue";
import Button from "./shared/Button.vue";
import Input from "./shared/Input.vue";

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
  <main
    class="bg-zinc-800 h-screen w-full max-w-screen-sm mx-auto px-4 text-center pt-24"
  >
    <Logo class="mb-16" />
    <p class="font-bolt mb-6">Acesse sua conta</p>

    <form @submit.prevent="handleSubmit">
      <Input
        id="email"
        type="email"
        v-model="email"
        placeholder="E-mail"
        :error="error"
      />
      <Input
        id="password"
        type="password"
        v-model="password"
        placeholder="Senha"
      />
      <Button>Entrar</Button>
    </form>
  </main>
</template>
