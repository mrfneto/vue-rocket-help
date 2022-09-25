import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { ref, onMounted, onUnmounted, computed } from "vue";
import { auth, db } from "./index";

// AUTH

export const getUserState = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, resolve, reject);
  });
};
export const useAuthState = () => {
  const user = ref(null);
  const error = ref(null);

  let unsubscribe;
  onMounted(async () => {
    unsubscribe = onAuthStateChanged(
      auth,
      (u) => (user.value = u),
      (e) => (user.value = e)
    );
  });
  onUnmounted(() => unsubscribe());

  const loggedIn = computed(() => user.value != null);

  return { user, error, loggedIn };
};

export const loginWithEmailAndPassword = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = async () => {
  return await signOut(auth);
};
