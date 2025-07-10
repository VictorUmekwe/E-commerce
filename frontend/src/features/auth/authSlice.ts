import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../types/User";
import type { PayloadAction } from "@reduxjs/toolkit";

type Authstate = {
  user: User | null;
};

const initialState: Authstate = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action:PayloadAction<User>) => {
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
    },
    logout: (state) => {
          state.user = null;
          localStorage.removeItem('user');
    }
  },
});

export const {setCredentials, logout} = authSlice.actions

export default authSlice.reducer;