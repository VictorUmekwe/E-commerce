import { createSlice } from '@reduxjs/toolkit'

const getInitialMode = (): string =>
  localStorage.getItem('mode') ||
  (window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light')

const initialState = {
  mode: getInitialMode(),
}

const modeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    switchMode: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark'
      localStorage.setItem('mode', state.mode)
    },
  },
})

export const { switchMode } = modeSlice.actions
export default modeSlice.reducer
