import { apiSlice } from "../../store/apiSlice";
import { type Product } from "../../types/Product";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ slug }) => ({
                type: "Product" as const,
                id: slug,
              })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),
    getProduct: builder.query<Product, string>({
      query: (slug) => ({
        url: `/products/${slug}`,
        method: "GET",
      }),
      providesTags: (_result, _error, slug) => [{ type: "Product", id: slug }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetProductsQuery, useGetProductQuery } = productApi;
