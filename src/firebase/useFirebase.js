import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
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

export const createDocument = async (_collection, _document) => {
  return await addDoc(collection(db, _collection), _document);
};

export const getCollection = async (_collection, _limit = 4) => {
  const q = query(
    collection(db, _collection),
    orderBy("created_at"),
    limit(_limit)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getDocument = async (_collection, _id) => {
  const result = await getDoc(doc(db, _collection, _id));
  return result.exists() ? result.data() : null;
};

export const updateDocument = async (_collection, _document, _id) => {
  return await setDoc(doc(db, _collection, _id), _document);
};
