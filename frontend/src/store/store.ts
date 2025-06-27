import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import themeReducer from "../features/theme/themeSlice";


export const store = configureStore({
    reducer:{
      [apiSlice.reducerPath]: apiSlice.reducer,
      theme: themeReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;