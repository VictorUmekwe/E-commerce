import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type UserInfo } from "../../types/UserInfo";

type UserState = {
  userInfo: UserInfo | null;
};

const initialState: UserState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action:PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("cartItems");
      localStorage.removeItem("shippingAddress");
      localStorage.removeItem("paymentMethod");
    },
  },
});

export  const { login, logout } = userSlice.actions;
export default userSlice.reducer;
