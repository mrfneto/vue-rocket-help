import { defineStore } from "pinia";
import {
  createDocument,
  getCollection,
  getDocument,
  updateDocument,
} from "../firebase/useFirebase";
import router from "../router";

export const useOrderStore = defineStore("order", {
  state: () => {
    return {
      loading: false,
      error: null,
      orders: [],
    };
  },

  getters: {
    getOrdersByStatus: (state) => {
      return (active) =>
        state.orders.filter((order) => order.status === active);
    },
  },

  actions: {
    async createOrder(document) {
      this.loading = true;
      try {
        await createDocument("orders", document);
        router.push({ name: "home" });
      } catch (error) {
        console.log(error.message);
      } finally {
        this.loading = false;
      }
    },

    async getOrders(status, limit) {
      this.loading = true;
      try {
        this.orders = await getCollection("orders", status, limit);
      } catch (error) {
        console.log(error.message);
      } finally {
        this.loading = false;
      }
    },

    async getOrder(id) {
      this.loading = true;
      try {
        return await getDocument("orders", id);
      } catch (error) {
        console.log(error.message);
      } finally {
        this.loading = false;
      }
    },

    async updateOrder(document, id) {
      this.loading = true;
      try {
        await updateDocument("orders", document, id);
        router.push({ name: "home" });
      } catch (error) {
        console.log(error.message);
      } finally {
        this.loading = false;
      }
    },
  },
});
