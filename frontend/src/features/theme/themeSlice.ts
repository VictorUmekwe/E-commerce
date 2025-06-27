import { createSlice } from "@reduxjs/toolkit";

type ThemeState = {
  mode: "light" | "dark";
};

const initialState: ThemeState = {
  mode:
    (localStorage.getItem("mode") as "light" | "dark") ??
    (window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("mode", state.mode);
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
      localStorage.setItem("mode", action.payload);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
