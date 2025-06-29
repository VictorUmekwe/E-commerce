import { createSlice,type PayloadAction } from "@reduxjs/toolkit";

type ThemeMode = "light" | "dark";

type ThemeState = {
  mode: ThemeMode;
};

const getInitialMode = (): ThemeMode => {
  const storedMode = localStorage.getItem("mode") as ThemeMode | null;
  if (storedMode) return storedMode;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const initialState: ThemeState = {
  mode: getInitialMode(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("mode", state.mode);
    },
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      localStorage.setItem("mode", action.payload);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
