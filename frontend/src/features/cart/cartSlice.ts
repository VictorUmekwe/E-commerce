import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  type CartItem,
  type ShippingAddress,
  type Cart,
} from "../../types/Cart";

const initialState: Cart = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems")!)
    : [],
  shippingAddress: localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress")!)
    : {
        fullName: "",
        address: "",
        postalCode: "",
        city: "",
        country: "",
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
      const existingItem = state.cartItems.find((i) => i._id === newItem._id);
      state.cartItems = existingItem
        ? state.cartItems.map((i) => (i._id === newItem._id ? newItem : i))
        : [...state.cartItems, newItem];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
        removeItem: (state, action: PayloadAction<CartItem>) => {
      state.cartItems = state.cartItems.filter(i => i._id !== action.payload._id)
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    clearCart: (state) => {
      state.cartItems = []
    },
    saveShippingAddress: (state, action: PayloadAction<ShippingAddress>) => {
      state.shippingAddress = action.payload
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload))
    },
    savePaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload
      localStorage.setItem('paymentMethod', action.payload)
    },
  },
});

export const {
  addItem,
  removeItem,
  clearCart,
  saveShippingAddress,
  savePaymentMethod,
} = cartSlice.actions
export default cartSlice.reducer