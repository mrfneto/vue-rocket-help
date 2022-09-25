<script setup>
import LogoutIcon from "./icons/LogoutIcon.vue";
import { logoutUser } from "../firebase/useFirebase";
import { useRouter } from "vue-router";

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
  <main>
    <h1 class="text-3xl font-bold underline mb-4">Home Page</h1>
    <button @click="logout">
      <LogoutIcon class="w-6 h-6" />
    </button>
  </main>
</template>
