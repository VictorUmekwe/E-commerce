import { apiSlice } from "../../store/apiSlice";
import type { Order } from "../../types/Order";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<Order, Partial<Order>>({
      query: (order) => ({
        url: "/order/",
        method: "POST",
        body: order,
      }),
    }),
  }),
});


export const {useCreateOrderMutation} = orderApi;