import { defineStore } from "pinia";
import { createDocument, getCollection } from "../firebase/useFirebase";
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

    async getOrders() {
      this.loading = true;
      try {
        this.orders = await getCollection("orders");
        console.log(this.orders);
      } catch (error) {
        console.log(error.message);
      } finally {
        this.loading = false;
      }
    },
  },
});
