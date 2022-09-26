<script setup>
import LogoutIcon from "./icons/LogoutIcon.vue";
import { logoutUser } from "../firebase/useFirebase";
import { useRouter } from "vue-router";
import Logo from "./shared/Logo.vue";

const router = useRouter();

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
      <h1 class="text-3xl font-bold underline mb-4">Home Page</h1>
    </main>
    <footer>footer</footer>
  </div>
</template>
