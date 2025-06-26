import { apiSlice } from "../../store/apiSlice";
import {type Product } from "../../types/Product";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
