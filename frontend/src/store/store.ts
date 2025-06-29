import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import themeReducer from "../features/theme/themeSlice";
import cartReducer from '../features/cart/cartSlice'

export const store = configureStore({
    reducer:{
      [apiSlice.reducerPath]: apiSlice.reducer,
      theme: themeReducer,
      cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;