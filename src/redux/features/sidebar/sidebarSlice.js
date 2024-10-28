import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen:
    localStorage.getItem("isSidebarOpen") === "false" ? false : true,
};

export const sidebarSlice = createSlice({
  name: "sidebarSlice",
  initialState,
  reducers: {
    setIsSidebarOpen: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
      localStorage.setItem("themeMode", state.themeMode);
    },
  },
});

export const { setIsSidebarOpen } = sidebarSlice.actions;

export default sidebarSlice.reducer;
