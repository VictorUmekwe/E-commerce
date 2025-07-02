import { createSlice } from "@reduxjs/toolkit";
import type { Cart, CartItem, ShippingAddress } from "../../types/Cart";
import { type PayloadAction } from "@reduxjs/toolkit";

const initialState: Cart = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems")!)
    : [],
  shippingAddress: localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress")!)
    : {
        fullName: "",
        address: "",
        city: "",
        country: "",
        postalCode: "",
      },
  paymentMethod: localStorage.getItem("paymentMethod") || "PayPal",
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item._id === newItem._id
      );

      state.cartItems = existingItem
        ? state.cartItems.map((item) =>
            item._id === newItem._id ? newItem : item
          )
        : [...state.cartItems, newItem];

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      
    
    },

    removeItem: (state, action: PayloadAction<CartItem>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      
      
    },

    clearCart: (state) => {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify([]));
    
    },

    saveShippingAddress: (state, action: PayloadAction<ShippingAddress>) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
    },

    savePaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("paymentMethod", action.payload);
    },

    calculatePrices: (state) => {
      state.itemsPrice = Number(
        state.cartItems
          .reduce((sum, item) => sum + item.price * item.quantity, 0)
          .toFixed(2)
      );

      state.shippingPrice = state.itemsPrice > 100 ? 0 : 10;
      state.taxPrice = Number((0.15 * state.itemsPrice).toFixed(2));
      state.totalPrice = Number(
        (state.itemsPrice + state.shippingPrice + state.taxPrice).toFixed(2)
      );
    },
  },
});

export const {
  addItem,
  removeItem,
  clearCart,
  saveShippingAddress,
  savePaymentMethod,
  calculatePrices,
} = cartSlice.actions;

export default cartSlice.reducer;
