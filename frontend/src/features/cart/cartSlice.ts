import { createSlice } from "@reduxjs/toolkit";
import type { Cart, CartItem, ShippingAddress } from "../../types/Cart";
import { type PayloadAction } from "@reduxjs/toolkit";

// math helper function to calculate all the totals
const calculateTotals = (items: CartItem[]) => {
  const itemsPrice = Number(
    items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));

  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};


const cartItemsFromStorage: CartItem[] = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems")!)
  : [];


const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
  calculateTotals(cartItemsFromStorage);


const initialState: Cart = {
  cartItems: cartItemsFromStorage,
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
  itemsPrice,
  shippingPrice,
  taxPrice,
  totalPrice,
}

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

      const totals = calculateTotals(state.cartItems);
      Object.assign(state, totals);
    },

    removeItem: (state, action: PayloadAction<CartItem>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      const totals = calculateTotals(state.cartItems);
      Object.assign(state, totals);
    },

    clearCart: (state) => {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify([]));

      const totals = calculateTotals(state.cartItems);
      Object.assign(state, totals);
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
      const totals = calculateTotals(state.cartItems);
      Object.assign(state, totals);
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
