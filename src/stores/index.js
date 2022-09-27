import { defineStore } from "pinia";

export const useStore = defineStore("main", {
  state: () => {
    return {
      orders: [
        {
          id: 1,
          number: 963258,
          problems:
            " Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
          soluction: "",
          status: false,
          created_at: "20/09/2022 às 15:00 h",
          updated_at: "",
        },
        {
          id: 2,
          number: 863214,
          problems: " Repellat totam vitae, quisquam, accusamus",
          soluction: "",
          status: false,
          created_at: "21/09/2022 às 10:00 h",
          updated_at: "",
        },
        {
          id: 1,
          number: 321852,
          problems:
            " Blanditiis ex neque sequi illum quos minima quae nobis eligendi rerum corrupti iste omnis fuga! Voluptatem, dignissimos!",
          soluction:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat totam vitae, quisquam, accusamus",
          status: true,
          created_at: "22/09/2022 às 13:30 h",
          updated_at: "25/09/2022 às 16:00 h",
        },
      ],
    };
  },

  getters: {
    getOrdersByStatus: (state) => {
      return (active) =>
        state.orders.filter((order) => order.status === active);
    },
  },
});

// const active = ref(false);
// const orders = ref([
//   {
//     id: 1,
//     number: 963258,
//     problems: " Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
//     soluction: "",
//     status: false,
//     created_at: "20/09/2022 às 15:00 h",
//     updated_at: "",
//   },
//   {
//     id: 2,
//     number: 863214,
//     problems: " Repellat totam vitae, quisquam, accusamus",
//     soluction: "",
//     status: false,
//     created_at: "21/09/2022 às 10:00 h",
//     updated_at: "",
//   },
//   {
//     id: 1,
//     number: 321852,
//     problems:
//       " Blanditiis ex neque sequi illum quos minima quae nobis eligendi rerum corrupti iste omnis fuga! Voluptatem, dignissimos!",
//     soluction:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat totam vitae, quisquam, accusamus",
//     status: true,
//     created_at: "22/09/2022 às 13:30 h",
//     updated_at: "25/09/2022 às 16:00 h",
//   },
// ]);

// const filterResult = computed(() => {
//   return orders.value.filter((order) => order.status === active.value);
// });

// return { orders, active, filterResult };
